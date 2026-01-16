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
 */

export const patternTrainPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'trem-padroes-fichas',
    appId: 'pattern-train',
    title: 'Gerador de Atividades de Sequência Lógica - Atividades para Imprimir de Padrões com Trenzinho para Educação Infantil',
    description: 'Crie atividades de sequência lógica com tema de trenzinho em poucos cliques. O gerador de atividades de padrões faz parte da assinatura Acesso Completo. Com sua assinatura, você cria atividades para imprimir ilimitadas sem custos adicionais. Pronto em menos de 3 minutos.',
    keywords: 'atividades de sequência lógica, atividades para imprimir, atividades educação infantil, coordenação motora, raciocínio lógico, padrões, trenzinho de padrões, atividades matemática, atividades alfabetização, atividades vogais, tabuada, desenhos para colorir, letra cursiva, pontilhado, 1º ano, 2º ano',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/trem-padroes-fichas',
  },

  // Hero Section - FULL text from pattern-train.md
  hero: {
    title: 'Gerador de Atividades de Sequência Lógica',
    subtitle: 'Atividades para Imprimir de Padrões com Trenzinho para Educação Infantil',
    description: `Crie atividades de sequência lógica com tema de trenzinho em poucos cliques. O gerador de atividades de padrões faz parte da assinatura Acesso Completo do LessonCraft Studio. Com sua assinatura, você cria atividades para imprimir ilimitadas sem custos adicionais por folha. Suas atividades de educação infantil ficam prontas em menos de 3 minutos.

O Trenzinho de Padrões desenvolve habilidades de reconhecimento de sequências em crianças. Cada vagão do trenzinho mostra uma imagem que faz parte de um padrão. A criança identifica qual imagem completa a sequência. É uma atividade perfeita para coordenação motora e raciocínio lógico.

Este gerador oferece 5 tipos de padrões diferentes. Você escolhe entre padrões AB, AAB, ABB, ABC e AABB. Cada tipo representa um nível de dificuldade. Crianças da educação infantil começam com padrões AB simples. Alunos do 1º ano e 2º ano avançam para padrões mais complexos como AABB.`,
    previewImageSrc: '/samples/english/pattern train/pattern_train portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/pattern train/
  samples: {
    sectionTitle: 'Exemplos de Atividades do Trenzinho de Padrões',
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
        worksheetSrc: '/samples/english/pattern train/pattern_train portrait.jpeg',
        answerKeySrc: '/samples/english/pattern train/pattern_train portrait answer_key.jpeg',
        altText: 'Atividade trenzinho de padrões formato retrato para educação infantil',
        pdfDownloadUrl: '/samples/english/pattern train/pattern_train portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/pattern train/pattern_train landscape.jpeg',
        answerKeySrc: '/samples/english/pattern train/pattern_train landscape answer_key.jpeg',
        altText: 'Atividade trenzinho de padrões formato paisagem para 1º ano',
        pdfDownloadUrl: '/samples/english/pattern train/pattern_train landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from pattern-train.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Atividades para Imprimir',
    sectionDescription: 'O gerador de Trenzinho de Padrões oferece recursos profissionais completos. Cada funcionalidade foi pensada para economizar tempo de professores. Crie atividades de matemática, atividades de alfabetização e muito mais. Todos os recursos estão incluídos na sua assinatura Acesso Completo.',
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
        title: 'Crie Atividades de Coordenação Motora e Padrões em 3 Cliques',
        description: `Criar atividades nunca foi tão simples. Primeiro, escolha o tipo de padrão desejado. Segundo, selecione as imagens para a sequência. Terceiro, clique em gerar. Sua atividade de coordenação motora está pronta para imprimir.

O processo leva menos de 3 minutos do início ao fim. Professores de educação infantil ganham tempo para outras tarefas. Não precisa de habilidades de design ou programas complexos. O gerador faz todo o trabalho pesado automaticamente.

Escolha entre 5 tipos de padrões diferentes. Padrões AB são ideais para iniciantes. Padrões AABB desafiam alunos mais avançados. Cada worksheet pode ter de 4 a 10 exercícios. Personalize a quantidade conforme a necessidade da sua turma.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edição Completa de Atividades de Matemática e Alfabetização no Canvas',
        description: `Tudo na tela pode ser editado livremente. Arraste elementos para reposicionar. Gire imagens para criar variações. Redimensione objetos conforme necessário. Delete elementos que não deseja incluir.

A barra de ferramentas contextual aparece ao selecionar objetos. Controle camadas com opções de trazer para frente ou enviar para trás. Alinhe múltiplos elementos com precisão. Centralize objetos na página automaticamente.

O recurso de desfazer e refazer salva até 20 passos. Erros são facilmente corrigidos. Experimente diferentes layouts sem medo. O histórico de edições protege seu trabalho.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload de Imagens Próprias para Atividades de Educação Infantil',
        description: `Personalize suas atividades com fotos da turma. Faça upload de múltiplos arquivos de uma vez. O gerador aceita formatos JPEG, PNG e GIF. Combine imagens próprias com a biblioteca do sistema.

Crie atividades temáticas para datas comemorativas. Use fotos de passeios escolares. Inclua mascotes ou símbolos da escola. Imagens personalizadas aumentam o engajamento dos alunos.

Suas imagens ficam disponíveis durante toda a sessão. Organize uma pasta com imagens favoritas. Reutilize em diferentes atividades de alfabetização e matemática. A flexibilidade é total.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades para Imprimir em 11 Idiomas - Desenhos para Colorir Multilíngues',
        description: `O gerador suporta 11 idiomas completos. Português brasileiro é totalmente integrado. Também disponível em inglês, alemão, francês e espanhol. Italiano, holandês, sueco, dinamarquês, norueguês e finlandês completam a lista.

Professores de escolas bilíngues aproveitam todos os idiomas. Ensine padrões em inglês ou espanhol. A interface muda completamente para o idioma escolhido. Nomes de imagens também são traduzidos.

Use este recurso para atividades de língua estrangeira. Combine aprendizado de padrões com vocabulário novo. É perfeito para programas de imersão linguística. Desenhos para colorir multilíngues expandem possibilidades.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licença Comercial POD Incluída - Venda Atividades de Matemática e Tabuada',
        description: `Sua assinatura Acesso Completo inclui licença comercial completa. Venda suas atividades no Teachers Pay Teachers. Comercialize no Etsy ou Amazon KDP. Não há custos extras de licenciamento.

Professores empreendedores monetizam seu trabalho criativo. Crie pacotes de atividades de matemática para vender. Desenvolva coleções de tabuada temáticas. O formato 300 DPI é perfeito para impressão comercial.

Não precisa dar créditos ou atribuição. A licença cobre uso comercial ilimitado. Muitos professores ganham renda extra significativa. Transforme preparação de aula em fonte de receita.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens para Atividades Vogais e Alfabeto',
        description: `Acesse mais de 3000 imagens infantis de alta qualidade. Todas organizadas por temas específicos. Encontre facilmente animais, frutas, veículos e formas. Letras do alfabeto e vogais também disponíveis.

A busca por texto acelera a localização. Digite o nome da imagem desejada. Resultados aparecem instantaneamente. Navegue por categorias quando preferir explorar.

Fundos decorativos estão incluídos na biblioteca. Bordas temáticas emolduram suas atividades. Tudo sem custo adicional além da assinatura. Materiais visuais completos para atividades vogais e alfabeto.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI para Atividades 1º Ano e 2º Ano',
        description: `Exporte em resolução profissional de 300 DPI. Perfeito para impressão em qualquer equipamento. Ideal para venda em plataformas digitais. Qualidade comercial garantida.

Escolha entre formatos JPEG ou PDF. JPEG é ótimo para visualização rápida. PDF mantém vetores e escalabilidade. Ambos disponíveis para worksheet e gabarito.

A opção escala de cinza economiza tinta. Atividades ficam prontas para fotocópia. Mantenha qualidade mesmo em preto e branco. Perfeito para atividades de 1º ano e 2º ano em grande volume.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔧',
        title: 'Atividades de Letra Cursiva e Pontilhado Complementares com Padrões',
        description: `Combine o Trenzinho de Padrões com outros geradores. Use junto com atividades de letra cursiva. Complete com exercícios de pontilhado e tracejado. Crie pacotes de aprendizagem completos.

Professores de educação infantil montam sequências didáticas. Primeiro, a criança faz o padrão do trenzinho. Depois, pratica letra cursiva relacionada. Finalize com pontilhado para coordenação motora.

Todos os 33 geradores estão na assinatura Acesso Completo. Acesse por R$240 ao ano ou R$25 ao mês. Crie atividades ilimitadas em todas as ferramentas. Valor incomparável para educadores.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from pattern-train.md step sections
  howTo: {
    sectionTitle: 'Como Criar Atividades para Imprimir de Padrões em 5 Passos Fáceis',
    sectionDescription: 'Criar atividades de sequência lógica nunca foi tão simples. O processo completo leva menos de 3 minutos. Siga estes 5 passos e tenha suas atividades de matemática prontas. Professores de educação infantil economizam horas de trabalho manual.',
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
        title: 'Escolha o Tipo de Padrão para Atividades de Coordenação Motora',
        description: `O primeiro passo é selecionar o tipo de padrão desejado. O gerador oferece 5 opções de complexidade crescente. Cada padrão desenvolve coordenação motora e raciocínio lógico de forma diferente.

**Padrão AB** é o mais simples. Alterna entre duas imagens: maçã, banana, maçã, banana. Ideal para crianças da educação infantil iniciando em padrões. Desenvolve reconhecimento básico de sequências.

**Padrão AAB** adiciona repetição. Duas imagens iguais seguidas de uma diferente. Exemplo: maçã, maçã, banana, maçã, maçã, banana. Aumenta levemente a dificuldade para alunos intermediários.

**Padrão ABC** usa três elementos diferentes. Exemplo: maçã, banana, uva, maçã, banana, uva. Exige mais memória de trabalho. Indicado para alunos do 1º ano e 2º ano.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Atividades de Matemática e Alfabetização - Quantidade e Formato',
        description: `Depois de escolher o padrão, defina as configurações do worksheet. Cada opção personaliza suas atividades de matemática conforme a necessidade.

**Número de exercícios**: Escolha entre 4 e 10 trenzinhos por página. Menos exercícios para crianças menores. Mais exercícios para alunos avançados. Ajuste conforme o tempo de aula disponível.

**Tamanho do papel**: Selecione Letter ou A4. Versões retrato ou paisagem disponíveis. Formato quadrado para atividades especiais. Dimensões personalizadas também são possíveis.

**Campos de nome e data**: Marque a opção para incluir. Espaços aparecem no topo da página. Facilita organização de atividades dos alunos. Útil para arquivamento em portfólios.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Selecione Imagens para Atividades Vogais e Alfabeto',
        description: `A seleção de imagens define o conteúdo visual da atividade. Você tem três opções para criar atividades vogais e alfabeto personalizadas.

**Opção 1 - Seleção por tema**: Escolha um tema como "Animais da Fazenda". O gerador seleciona imagens aleatoriamente do tema. Rápido e fácil para atividades variadas.

**Opção 2 - Seleção manual**: Navegue pela biblioteca de 3000+ imagens. Clique nas imagens desejadas para selecionar. Crie combinações específicas para seus objetivos. Ideal para atividades de alfabetização temáticas.

**Opção 3 - Upload de imagens**: Faça upload de suas próprias imagens. Fotos da turma, mascotes ou símbolos. Combine com imagens da biblioteca. Máxima personalização para atividades únicas.`,
        icon: '🖼️',
      },
      {
        id: '4',
        number: 4,
        title: 'Gere e Edite Atividades para Imprimir no Canvas Completo',
        description: `Com configurações definidas, clique em "Criar". O worksheet aparece instantaneamente na tela. Agora você pode editar livremente no canvas.

**Movimentação de elementos**: Arraste qualquer objeto para reposicionar. Mova o trenzinho para cima ou para baixo. Ajuste espaçamento entre exercícios. Tudo com cliques simples do mouse.

**Redimensionamento**: Clique e arraste os cantos para redimensionar. Aumente imagens para destaque. Diminua para caber mais conteúdo. Proporções são mantidas automaticamente.

**Adição de texto**: Inclua instruções personalizadas. Adicione nome do professor ou escola. Insira títulos criativos. Escolha fontes, cores e tamanhos.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe Atividades de Desenhos para Colorir e Tabuada em PDF',
        description: `O passo final é exportar sua criação. Escolha o formato ideal para suas atividades de desenhos para colorir e matemática.

**Formato JPEG**: Ideal para visualização rápida. Compartilhe por WhatsApp ou email. Poste em grupos de professores. Arquivo leve e universal.

**Formato PDF**: Perfeito para impressão profissional. Mantém qualidade em qualquer escala. Ideal para venda em plataformas. Padrão para atividades de tabuada comerciais.

**Worksheet e Gabarito**: Baixe a atividade do aluno separadamente. Baixe também o gabarito com respostas. Use o gabarito para correção rápida. Ou envie para pais verificarem em casa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from pattern-train.md use case sections
  useCases: {
    sectionTitle: 'Ideias de Uso do Trenzinho de Padrões',
    sectionDescription: 'O gerador de Trenzinho de Padrões se adapta a diversos contextos educacionais. Professores de diferentes níveis encontram aplicações práticas. Veja como usar esta ferramenta para atividades de alfabetização, tabuada e muito mais.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades de Alfabetização com Padrões de Letras',
        description: `Use o Trenzinho de Padrões para ensinar letras do alfabeto. Crie sequências usando vogais e consoantes. A criança identifica qual letra completa o padrão. É uma forma lúdica de trabalhar atividades de alfabetização.

Exemplo prático: Padrão AB com letras A e B. O trenzinho mostra A-B-A-B-?. A criança identifica que falta a letra A. Simples e eficaz para atividades de educação infantil.

Avance com padrões AAB usando vogais. Sequência A-A-E-A-A-?. A criança pratica reconhecimento de vogais. Combine com atividades vogais tradicionais para reforço.`,
        quote: 'Meus alunos adoram completar os vagões do trenzinho!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do 1º e 2º Ano',
        subtitle: 'Atividades de Tabuada Visual com Padrões Numéricos',
        description: `Adapte o conceito de padrões para introduzir tabuada. Use imagens que representam quantidades. Três maçãs seguidas de duas bananas formam padrões visuais. A criança começa a perceber relações numéricas.

Para tabuada do 2, crie padrões com pares de objetos. Dois carros, dois aviões, dois carros, dois aviões. A repetição visual prepara para multiplicação. Atividades de tabuada ficam mais concretas.

Professores do 1º ano e 2º ano usam esta estratégia frequentemente. Padrões visuais antecedem cálculos abstratos. A criança desenvolve senso numérico naturalmente. Base sólida para atividades de matemática futuras.`,
        quote: 'A progressão de dificuldade acompanha o desenvolvimento dos alunos.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais Educadores Domiciliares',
        subtitle: 'Coordenação Motora e Letra Cursiva - Atividades Integradas',
        description: `Combine o Trenzinho de Padrões com exercícios de coordenação motora. Depois de completar a sequência, a criança traça letras. Use letra cursiva relacionada ao tema do padrão.

Se o padrão usa animais, pratique letra cursiva de "gato" ou "cão". Se usa frutas, escreva "maçã" ou "uva". Integração natural entre reconhecimento de padrões e coordenação motora fina.

Adicione pontilhado para crianças iniciantes. O contorno do trenzinho em pontilhado desenvolve traço. Letra cursiva e pontilhado trabalham habilidades motoras complementares. Atividades de letra cursiva ficam contextualizadas.`,
        quote: 'Uma ferramenta atende todos os níveis dos meus filhos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Idiomas',
        subtitle: 'Atividades Vogais e Alfabeto para Pré-Escola e 1º Ano',
        description: `Foque em atividades vogais para turmas de pré-escola. Use apenas A, E, I, O, U nos padrões. Crianças memorizam vogais enquanto identificam sequências. Duas habilidades em uma atividade.

Para o 1º ano e 2º ano, expanda para o alfabeto completo. Padrões ABC com diferentes letras cada vez. B-C-D-B-C-?. A criança revisa o alfabeto enquanto raciocina. Atividades vogais e alfabeto se complementam.

Crie cadernos semanais de vogais. Segunda-feira foca na letra A. Terça-feira na letra E. Cada dia uma vogal diferente nos padrões. Atividades de alfabetização estruturadas e progressivas.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Desenhos para Colorir como Recompensa após Atividades de Matemática',
        description: `Use desenhos para colorir como atividade de encerramento. Após completar os padrões, a criança colore o trenzinho. É um momento de relaxamento após esforço cognitivo. Equilíbrio entre atividades de matemática e arte.

Professores relatam maior engajamento com esta estratégia. Crianças se esforçam sabendo que podem colorir depois. Desenhos para colorir funcionam como incentivo natural. Motivação intrínseca para completar atividades.

Combine com temas sazonais. Trenzinho de Páscoa com ovos coloridos. Trenzinho de Natal com presentes. Desenhos para colorir temáticos aumentam interesse. Atividades de educação infantil ficam mais festivas.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Atividades para Imprimir de Reforço Escolar em Casa',
        description: `Envie atividades de padrões para prática em casa. Pais apreciam materiais prontos para usar. Atividades para imprimir facilitam o reforço escolar. A criança pratica reconhecimento de padrões com a família.

Inclua instruções simples para os pais. Explique como verificar as respostas. Forneça o gabarito separadamente. Comunicação escola-família melhora com atividades para imprimir estruturadas.

Crie pacotes semanais de 5 atividades. Uma para cada dia útil. Variedade de padrões mantém interesse. Progressão de dificuldade gradual. Atividades de matemática organizadas para rotina familiar.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - FULL text from pattern-train.md FAQ sections
  faq: {
    sectionTitle: 'Perguntas Frequentes sobre Atividades Vogais e Alfabeto com o Trenzinho de Padrões',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre o gerador de Trenzinho de Padrões. Encontre respostas sobre atividades vogais e alfabeto, coordenação motora, tabuada e muito mais.',
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
        question: 'O gerador de atividades de sequência lógica é gratuito para usar?',
        answer: 'O gerador de Trenzinho de Padrões requer assinatura Acesso Completo. O custo é R$240 por ano ou R$25 por mês. Sua assinatura permite criação ilimitada de atividades de sequência lógica. Não há taxas extras por ficha gerada. O Acesso Completo inclui todos os 33 geradores de atividades para imprimir. O Pacote Essencial custa R$144 por ano e inclui 10 geradores populares. Ambas as assinaturas incluem licença comercial e suporte a 11 idiomas. Exportação em 300 DPI qualidade profissional está incluída.',
      },
      {
        id: '2',
        question: 'Posso imprimir atividades de educação infantil em casa na impressora comum?',
        answer: 'Sim. Atividades de educação infantil do trenzinho imprimem perfeitamente em impressoras domésticas. O formato PDF funciona em qualquer impressora. A resolução de 300 DPI garante qualidade mesmo em equipamentos simples. Use papel sulfite comum para uso diário. Escolha papel mais grosso para atividades especiais. A opção de escala de cinza economiza tinta colorida. Imprima quantas cópias precisar para sua turma.',
      },
      {
        id: '3',
        question: 'Preciso de habilidades de design para criar atividades de coordenação motora?',
        answer: 'Não precisa de nenhuma habilidade de design. Atividades de coordenação motora são geradas automaticamente. O sistema faz todo o trabalho visual. Você apenas escolhe padrões e imagens. O modo automático é perfeito para iniciantes. Clique em gerar e receba fichas prontas. O modo manual oferece mais controle. Arraste e solte elementos como quiser no canvas.',
      },
      {
        id: '4',
        question: 'Posso usar atividades para imprimir do trenzinho na sala de aula?',
        answer: 'A assinatura Acesso Completo inclui uso ilimitado em sala de aula. Imprima atividades para imprimir para todos os alunos. Distribua para quantas turmas precisar. Não há limite de cópias ou distribuição educacional. Use em escolas públicas ou particulares livremente. Compartilhe com colegas professoras da mesma escola. Inclua em portfólios e reuniões de pais. Todo uso educacional está coberto pela assinatura.',
      },
      {
        id: '5',
        question: 'Em quais idiomas estão disponíveis as atividades de alfabetização?',
        answer: 'Atividades de alfabetização estão disponíveis em 11 idiomas completos. Português brasileiro com vocabulário nativo. Inglês, alemão, francês, espanhol e italiano incluídos. Holandês, sueco, dinamarquês, norueguês e finlandês também. Cada idioma usa nomes de imagens na língua correta. Alfabetos especiais funcionam perfeitamente. Ideal para escolas bilíngues e internacionais. Perfeito para professores de línguas estrangeiras.',
      },
      {
        id: '6',
        question: 'Posso vender atividades de matemática e tabuada criadas com o gerador?',
        answer: 'Sim. A assinatura Acesso Completo inclui licença comercial completa. Venda atividades de matemática e tabuada sem taxas extras. Publique no Teachers Pay Teachers, Hotmart ou Eduzz. Liste na Amazon KDP para livros de atividades. Crie apostilas completas para comercialização. Monte pacotes temáticos para datas comemorativas. Desenvolva coleções por série escolar. Construa renda passiva com produtos digitais educacionais.',
      },
      {
        id: '7',
        question: 'Como personalizo atividades de educação infantil com coordenação motora?',
        answer: 'Personalize atividades de educação infantil no canvas interativo. Adicione exercícios de coordenação motora manualmente. Inclua linhas tracejadas para treino motor. Combine alfabetização com desenvolvimento de habilidades. Use as ferramentas de texto para instruções personalizadas. Adicione seu nome ou logo da escola. Inclua campos de nome e data para alunos. Ajuste cores, fontes e tamanhos livremente.',
      },
      {
        id: '8',
        question: 'Qual faixa etária funciona melhor com atividades vogais e alfabeto do trenzinho?',
        answer: 'Atividades vogais e alfabeto do trenzinho funcionam para 3 a 8 anos. Crianças de 3-5 anos na educação infantil adoram o formato. Alunos de 6-7 anos no 1º ano reforçam aprendizados. Estudantes de 7-8 anos no 2º ano praticam revisão. Adapte a complexidade para cada idade. Menos elementos e padrões simples para os menores. Mais desafios e padrões complexos para os maiores. O mesmo gerador atende múltiplas faixas etárias.',
      },
      {
        id: '9',
        question: 'Posso fazer upload de imagens próprias para atividades com desenhos para colorir?',
        answer: 'Sim. Faça upload de imagens próprias para atividades com desenhos para colorir personalizados. Aceita formatos JPEG, PNG e GIF. Carregue múltiplos arquivos de uma vez. Combine com imagens da biblioteca. Use fotos dos alunos para engajamento especial. Inclua mascotes e símbolos da escola. Adicione imagens de projetos temáticos. Personalize completamente suas atividades para imprimir.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar atividades de sequência lógica completas?',
        answer: 'Criar atividades de sequência lógica completas leva menos de 3 minutos. O modo automático gera fichas em segundos. O modo manual permite personalização detalhada. Mesmo com edições, raramente passa de 5 minutos. Compare com 30-60 minutos do método tradicional. Economize até 90% do tempo de preparação. Use o tempo extra para planejar outras atividades. Foque em ensinar, não em criar materiais.',
      },
      {
        id: '11',
        question: 'Atividades do trenzinho incluem gabarito com letra cursiva e pontilhado?',
        answer: 'O trenzinho gera gabarito separado com respostas. Mostra as associações corretas entre padrões e imagens. Você pode adicionar letra cursiva e pontilhado manualmente no canvas. Combine exercícios de escrita com o gabarito. Baixe ficha e gabarito em arquivos separados. Distribua apenas a ficha para alunos. Guarde o gabarito para correção. Imprima ambos quando precisar de materiais completos.',
      },
      {
        id: '12',
        question: 'Posso criar atividades de matemática e tabuada com o trenzinho de padrões?',
        answer: 'O Trenzinho de Padrões prepara crianças para conceitos matemáticos. Padrões visuais desenvolvem raciocínio lógico pré-numérico. Use grupos de objetos para introduzir conceitos de tabuada. Para atividades de matemática específicas, use outros geradores da plataforma. O Acesso Completo inclui geradores de matemática dedicados. Combine diferentes apps para pacotes completos. O trenzinho complementa atividades de matemática tematicamente.',
      },
    ],
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
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando o trenzinho de padrões com estes geradores complementares.',
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
        slug: 'coloring',
        name: 'Desenhos para Colorir',
        category: 'Criativo',
        icon: '🎨',
        description: 'Combine atividades de padrões com desenhos para colorir temáticos para desenvolvimento de coordenação motora completo.',
      },
      {
        id: '2',
        slug: 'alphabet-train',
        name: 'Trenzinho do Alfabeto',
        category: 'Alfabetização',
        icon: '🚂',
        description: 'Expanda o aprendizado de padrões com atividades de alfabetização que usam o mesmo formato de trenzinho.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Encontre e Conte',
        category: 'Matemática',
        icon: '🔢',
        description: 'Adicione conceitos matemáticos às atividades de padrões com exercícios de contagem visual.',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Traçar Linhas',
        category: 'Motor',
        icon: '✏️',
        description: 'Desenvolva coordenação motora fina com atividades de traçar linhas que complementam o trenzinho de padrões.',
      },
    ],
  },
};

export default patternTrainPtContent;
