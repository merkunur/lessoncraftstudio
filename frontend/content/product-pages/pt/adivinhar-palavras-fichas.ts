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
    previewImageSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
        answerKeySrc: '/samples/english/word guess/clue-grid_answer-key.jpeg',
        altText: 'Atividade de adivinhar palavras com grade de pistas para educação infantil',
        pdfDownloadUrl: '/samples/english/word guess/clue-grid_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word guess/landscape.jpeg',
        answerKeySrc: '/samples/english/word guess/landscape answer-key.jpeg',
        altText: 'Atividade de adivinhar palavras formato paisagem para 1º ano',
        pdfDownloadUrl: '/samples/english/word guess/landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word guess/custom word list.jpeg',
        answerKeySrc: '/samples/english/word guess/custom word list answer-key.jpeg',
        altText: 'Atividade de adivinhar palavras com lista personalizada para atividades de alfabetização',
        pdfDownloadUrl: '/samples/english/word guess/custom word list.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Recursos do Gerador de Atividades para Imprimir',
    sectionDescription: 'O gerador de adivinhar palavras oferece recursos completos para educadores. Cada função foi projetada pensando em professores ocupados. Crie atividades para imprimir personalizadas sem conhecimento técnico. A interface intuitiva permite gerar fichas profissionais em minutos.',
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
        title: 'Criação Fácil em 3 Cliques',
        description: `Criar atividades educação infantil nunca foi tão simples. Primeiro, selecione um tema de imagens da biblioteca. Segundo, ajuste o número de exercícios e nível de dificuldade. Terceiro, clique em gerar. Suas atividades para imprimir aparecem instantaneamente na tela. O processo completo leva menos de 3 minutos. Professores economizam horas de preparação toda semana.

O gerador calcula automaticamente o melhor layout. Exercícios se ajustam ao tamanho da página escolhido. Orientação retrato ou paisagem funciona perfeitamente. O sistema organiza puzzles em uma ou duas colunas conforme necessário. Nenhum trabalho manual de formatação é necessário.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edição Completa no Canvas',
        description: `Após gerar suas atividades de alfabetização, tudo permanece editável. Arraste qualquer elemento para nova posição. Redimensione imagens com o mouse. Gire elementos conforme necessário. Delete itens indesejados com um clique. O canvas oferece liberdade criativa total.

Ferramentas de camadas organizam elementos sobrepostos. Traga objetos para frente ou envie para trás. Alinhe múltiplos elementos automaticamente. Centralize na página horizontal ou verticalmente. Bloqueie elementos finalizados para evitar movimentos acidentais. Desfazer e refazer permitem experimentação sem medo.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload de Imagens Personalizadas',
        description: `Professores de 1º ano e 2º ano frequentemente precisam de imagens específicas. O upload de imagens personalizadas resolve isso. Carregue fotos de projetos da turma. Adicione imagens de eventos escolares. Use fotografias de objetos estudados em sala.

O gerador aceita formatos comuns como JPEG, PNG e GIF. Upload múltiplo economiza tempo. Imagens carregadas ficam disponíveis durante toda a sessão. Combine imagens personalizadas com a biblioteca existente. As atividades educação infantil ficam ainda mais relevantes quando usam contexto familiar aos alunos.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades para Imprimir em 11 Idiomas',
        description: `O gerador suporta 11 idiomas completos para atividades para imprimir. Português brasileiro é totalmente suportado na interface e conteúdo. Alemão, francês, espanhol e italiano expandem possibilidades. Holandês, sueco, dinamarquês, norueguês e finlandês completam as opções.

Para atividades de alfabetização bilíngues, isso é transformador. Escolas internacionais criam materiais em múltiplos idiomas. Professores de línguas estrangeiras geram vocabulário visual. Programas de imersão linguística encontram recursos adequados. Os nomes das imagens são extraídos automaticamente no idioma selecionado.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licença Comercial POD Incluída',
        description: `Sua assinatura Acesso Completo inclui licença comercial completa. Venda atividades educação infantil criadas no gerador. Publique na Teachers Pay Teachers sem restrições. Crie loja no Etsy com fichas personalizadas. Lance livros de atividades no Amazon KDP.

A qualidade de 300 DPI atende exigências profissionais. Nenhuma atribuição é necessária nos materiais vendidos. A licença cobre uso print-on-demand ilimitado. Professores empreendedores monetizam sua expertise pedagógica. Uma única assinatura de R$1.200 por ano substitui múltiplas licenças separadas.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens',
        description: `Acesse mais de 3.000 imagens adequadas para crianças. Cada imagem foi selecionada para contexto educacional. Temas organizam o acervo para fácil navegação. Encontre imagens para atividades de matemática rapidamente. Localize vocabulário para atividades vogais e alfabeto em segundos.

A busca por texto acelera ainda mais. Digite "maçã" e veja resultados instantâneos. Filtre por categoria ou tema específico. Animais, alimentos, objetos, transportes e mais. Cada tema contém dezenas de imagens relacionadas. Professores nunca ficam sem opções visuais.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI',
        description: `Exporte atividades para imprimir em qualidade profissional. Resolução de 300 DPI garante impressão nítida. Formatos PDF e JPEG disponíveis. O PDF mantém qualidade vetorial máxima. JPEG funciona para compartilhamento digital rápido.

A opção escala de cinza economiza tinta colorida. Imagens se transformam em exercícios de coordenação motora através do colorir. Uma única atividade trabalha vocabulário e habilidades motoras. Alunos completam palavras e depois colorem as imagens. Professores maximizam valor pedagógico de cada ficha.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Como Criar Atividades para Imprimir de Adivinhar Palavras em 5 Passos',
    sectionDescription: 'Criar atividades para imprimir profissionais leva menos de 3 minutos. Este guia mostra cada etapa do processo. Siga os passos e produza fichas pedagógicas de qualidade. Nenhuma experiência em design é necessária.',
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
        description: `O primeiro passo define o conteúdo das suas atividades educação infantil. Você tem três opções principais para escolher palavras e imagens.

Opção A - Seleção por Tema: Acesse a biblioteca de imagens no painel lateral. Escolha um tema como animais, frutas ou objetos. O gerador mostra todas as imagens disponíveis naquele tema. Clique nas imagens desejadas para selecioná-las. Selecione até 10 imagens por worksheet.

Opção B - Busca por Palavra: Use o campo de busca para encontrar imagens específicas. Digite "maçã" e veja resultados instantâneos. Combine imagens de diferentes temas. Crie coleções personalizadas de vocabulário.

Opção C - Lista de Palavras Personalizadas: Ative a opção de lista personalizada. Digite até 8 palavras de sua escolha. O gerador cria exercícios apenas com texto. Perfeito para vocabulário técnico.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure as Opções',
        description: `O segundo passo ajusta dificuldade e formato das atividades. Personalize cada aspecto conforme sua turma.

Número de Exercícios: Escolha de 1 a 10 puzzles por página. Atividades 1º ano e 2º ano geralmente usam 6 a 8 exercícios. Turmas de educação infantil podem preferir 4 a 6 com imagens maiores.

Nível de Dificuldade: Quatro opções controlam quantas letras aparecem como pistas. Sem pistas coloca caixas completamente vazias. Fácil mostra metade das letras já preenchidas. Normal revela um quarto das letras. Difícil mostra apenas uma ou duas letras.

Exclusão de Letras: Configure letras que nunca aparecem como pistas. Digite "AEIOU" para nunca mostrar vogais. Isso força prática intensiva de vogais específicas.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere Sua Atividade',
        description: `Clique no botão "Gerar" e suas atividades para imprimir aparecem instantaneamente. O processo leva segundos. Visualize o resultado imediatamente na tela.

Layout Automático: O gerador calcula o melhor arranjo automaticamente. Páginas em retrato organizam puzzles em coluna única. Páginas em paisagem podem usar duas colunas. Exercícios de coordenação motora ficam bem distribuídos.

Prévia em Tempo Real: Veja exatamente como sua ficha ficará impressa. Alterne entre aba de worksheet e gabarito. O gabarito mostra todas as respostas preenchidas.

Regeneração Rápida: Não gostou do resultado? Clique em gerar novamente. Novas imagens são selecionadas aleatoriamente do seu conjunto. Letras-pista aparecem em posições diferentes.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite no Canvas',
        description: `Após gerar, personalize cada elemento das atividades de alfabetização. O canvas oferece edição completa e flexível.

Movimentação Livre: Arraste qualquer elemento para nova posição. Redimensione imagens arrastando os cantos. Gire elementos usando a alça de rotação. Posicione cada puzzle exatamente onde preferir.

Adicione Elementos Extras: Insira texto personalizado como instruções ou títulos. Escolha fontes adequadas para crianças. Adicione campo de nome e data se necessário.

Organize Camadas: Traga elementos para frente quando sobrepostos. Envie decorações para trás do conteúdo principal. Alinhe múltiplos objetos automaticamente.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe e Imprima',
        description: `O passo final exporta suas atividades educação infantil em alta qualidade. Múltiplos formatos atendem diferentes necessidades.

Formato PDF: Escolha PDF para máxima qualidade de impressão. Resolução de 300 DPI garante nitidez profissional. Ideal para impressão em papel ou envio para gráfica.

Formato JPEG: Escolha JPEG para compartilhamento digital rápido. Envie por WhatsApp ou e-mail facilmente. Publique em plataformas de ensino online.

Worksheet e Gabarito Separados: Baixe a ficha do aluno sem respostas. Baixe o gabarito com todas as letras preenchidas. Use o gabarito para correção rápida.

Opção Escala de Cinza: Ative para converter imagens coloridas em preto e branco. Economize tinta colorida nas impressões.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Atividades de Alfabetização',
    sectionDescription: 'O gerador de adivinhar palavras atende educadores diversos. Cada perfil encontra recursos específicos para suas necessidades. Descubra como diferentes profissionais aproveitam a ferramenta.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades Educação Infantil com Coordenação Motora',
        description: `Professores de educação infantil enfrentam desafios únicos. Crianças de 4 a 6 anos precisam de materiais altamente visuais. O gerador resolve isso perfeitamente.

Atividades educação infantil com imagens grandes capturam atenção. Temas coloridos como animais e frutas engajam turmas inteiras. O modo de 4 a 6 puzzles por página funciona idealmente para essa faixa etária. Letras maiúsculas grandes facilitam reconhecimento inicial.

A prática de coordenação motora acontece naturalmente. Crianças seguram o lápis e preenchem caixas definidas. Cada letra exige controle e precisão. Atividades vogais e alfabeto introduzem conceitos fundamentais.`,
        quote: 'Meus alunos adoram descobrir as palavras escondidas!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores de 1º Ano e 2º Ano',
        subtitle: 'Atividades de Alfabetização e Letra Cursiva',
        description: `Professores de 1º ano e 2º ano do Ensino Fundamental focam em alfabetização formal. O gerador oferece recursos específicos para essa etapa crucial.

Atividades 1º ano e 2º ano usam vocabulário progressivamente mais complexo. Palavras de 4 a 6 letras desafiam sem frustrar. Níveis de dificuldade adaptam exercícios ao progresso individual. Alunos avançados recebem menos pistas.

Atividades de alfabetização ganham contexto significativo. Cada imagem conecta palavra escrita ao objeto real. A consciência fonológica se desenvolve naturalmente. Professores criam séries temáticas alinhadas ao currículo.`,
        quote: 'O adivinhar palavras transforma a prática de ortografia em diversão.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais que Fazem Educação Domiciliar',
        subtitle: 'Atividades para Imprimir em Casa com Tabuada',
        description: `Famílias que praticam educação domiciliar encontram recursos valiosos. O gerador simplifica preparação de materiais pedagógicos.

Atividades para imprimir profissionais economizam tempo precioso. Pais criam fichas em minutos ao invés de horas. A biblioteca de 3.000 imagens elimina necessidade de buscar recursos externos. Temas organizados facilitam planejamento curricular.

Atividades educação infantil adaptam-se ao ritmo individual da criança. Sem pressão de turma, cada exercício pode ser personalizado. Níveis de dificuldade ajustam conforme progresso observado.`,
        quote: 'Uma ferramenta atende todos os níveis dos meus filhos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Inglês e Idiomas',
        subtitle: 'Atividades de Alfabetização Bilíngue',
        description: `Professores de inglês, espanhol ou outras línguas descobrem ferramenta poderosa. O suporte a 11 idiomas transforma ensino de vocabulário.

Atividades de alfabetização em língua estrangeira ganham componente visual. Imagens comunicam significado sem tradução. Alunos conectam palavra estrangeira diretamente ao objeto. A memória visual reforça aquisição de vocabulário.

Atividades vogais e alfabeto em novo idioma ficam acessíveis. Sons diferentes ganham representação escrita clara. Professores de escolas bilíngues criam materiais paralelos. Mesmas imagens com palavras em português e inglês.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Atividades Educação Infantil Adaptadas com Pontilhado',
        description: `Professores de educação especial precisam de diferenciação constante. O gerador oferece flexibilidade essencial para atender necessidades diversas.

Atividades educação infantil adaptam-se a diferentes ritmos de aprendizagem. Menos puzzles por página reduzem sobrecarga visual. Imagens maiores facilitam foco e atenção. Dificuldade ajustável permite progressão individualizada.

Exercícios de tabuada visual apoiam alunos com dificuldades matemáticas. Vocabulário numérico ganha representação concreta. A atividade de escrever e descobrir engaja múltiplos canais de aprendizagem.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Venda Atividades para Imprimir no Hotmart',
        description: `Professores que vendem materiais online descobrem fonte de renda. A licença comercial inclusa abre portas para empreendedorismo.

Atividades para imprimir criadas no gerador podem ser vendidas legalmente. Hotmart, Teachers Pay Teachers, Etsy e Amazon KDP são destinos populares. A qualidade de 300 DPI atende padrões profissionais de marketplaces. Nenhuma atribuição é necessária nos produtos vendidos.

Atividades de alfabetização com vocabulário específico atendem nichos lucrativos. Pacotes temáticos de letra cursiva e pontilhado têm alta demanda. Professores empreendedores relatam faturamento de R$2.500 a R$25.000 mensais vendendo fichas pedagógicas.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Perguntas Frequentes sobre Atividades para Imprimir de Adivinhar Palavras',
    sectionDescription: 'Professores têm dúvidas comuns sobre o gerador. Esta seção responde às perguntas mais frequentes.',
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
        question: 'O Gerador de Atividades para Imprimir de Adivinhar Palavras É Gratuito?',
        answer: 'O gerador de adivinhar palavras requer assinatura Acesso Completo custando R$1.200 anuais ou R$125 mensais. Sua assinatura permite criação ilimitada de atividades para imprimir sem taxas por ficha. Gere quantas atividades de alfabetização precisar sem cobranças adicionais. O Pacote Essencial inclui 10 geradores populares por R$720 anuais. Acesso Completo custa R$1.200 anuais e inclui todos os 33 tipos de geradores, incluindo adivinhar palavras.',
      },
      {
        id: '2',
        question: 'Posso Imprimir Atividades de Matemática e Tabuada em Casa com Impressora Comum?',
        answer: 'Sim, absolutamente. Atividades de matemática e tabuada criadas no gerador imprimem perfeitamente em qualquer impressora doméstica. Formatos PDF e JPEG funcionam com impressoras jato de tinta ou laser. Papel sulfite comum produz resultados excelentes. A opção escala de cinza economiza tinta colorida. Qualidade permanece nítida mesmo em impressões econômicas.',
      },
      {
        id: '3',
        question: 'Preciso de Habilidades de Design para Criar Atividades Educação Infantil?',
        answer: 'Nenhuma habilidade de design é necessária. Atividades educação infantil surgem automaticamente após configurar opções simples. Selecione tema, número de exercícios e dificuldade. Clique em gerar. Pronto. Exercícios de coordenação motora aparecem formatados profissionalmente. O gerador calcula layout ideal automaticamente.',
      },
      {
        id: '4',
        question: 'Posso Usar Atividades de Alfabetização na Sala de Aula?',
        answer: 'Sua assinatura Acesso Completo inclui uso em sala de aula ilimitado. Atividades de alfabetização podem ser impressas e distribuídas para todos os alunos. Atividades 1º ano e 2º ano funcionam perfeitamente para turmas inteiras. Nenhuma restrição de quantidade de cópias. Professores criam fichas personalizadas para cada unidade curricular.',
      },
      {
        id: '5',
        question: 'Em Quais Idiomas as Atividades Estão Disponíveis?',
        answer: 'O gerador suporta 11 idiomas completos. Atividades vogais e alfabeto funcionam em português brasileiro, inglês, alemão, francês, espanhol e italiano. Holandês, sueco, dinamarquês, norueguês e finlandês completam as opções. A interface do usuário traduz-se automaticamente. Nomes das imagens são extraídos no idioma selecionado.',
      },
      {
        id: '6',
        question: 'Posso Vender Atividades para Imprimir Criadas no Gerador?',
        answer: 'Sim. Sua assinatura Acesso Completo inclui licença comercial print-on-demand completa. Atividades para imprimir podem ser vendidas em Hotmart, Teachers Pay Teachers, Etsy e Amazon KDP. Nenhuma atribuição é necessária nos produtos vendidos. Você mantém 100% dos direitos sobre suas criações. Qualidade de 300 DPI atende padrões profissionais.',
      },
      {
        id: '7',
        question: 'Como Personalizo Atividades de Matemática com Tabuada para Meus Alunos?',
        answer: 'A personalização acontece em múltiplos níveis. Atividades de matemática podem usar vocabulário numérico específico. Digite palavras como "cinco", "dezena", "multiplicação" na lista personalizada. Níveis de dificuldade adaptam quantidade de pistas. Alunos avançados recebem menos letras visíveis. Alunos em desenvolvimento recebem mais suporte.',
      },
      {
        id: '8',
        question: 'Qual Faixa Etária Funciona Melhor com Atividades de Adivinhar Palavras?',
        answer: 'O gerador atende crianças de 4 a 10 anos perfeitamente. Atividades educação infantil funcionam para pré-escola e jardim. Imagens grandes e palavras curtas engajam os menores. Atividades 1º ano e 2º ano usam vocabulário progressivamente complexo. Alunos de 3º ano trabalham palavras mais longas e difíceis. Níveis de dificuldade ajustam para qualquer faixa etária.',
      },
      {
        id: '9',
        question: 'Posso Fazer Upload de Imagens Próprias para Atividades de Alfabetização?',
        answer: 'Sim, upload de imagens personalizadas é totalmente suportado. Atividades de alfabetização ganham contexto familiar quando usam fotos da turma. Imagens de projetos escolares viram exercícios de vocabulário. Formatos JPEG, PNG e GIF são aceitos. Upload múltiplo economiza tempo. Combine fotos próprias com biblioteca de 3.000+ imagens.',
      },
      {
        id: '10',
        question: 'Quanto Tempo Leva para Criar Atividades de Adivinhar Palavras?',
        answer: 'O processo completo leva menos de 3 minutos. Atividades vogais e alfabeto surgem após três cliques básicos. Selecione tema, configure opções, clique em gerar. Visualização instantânea aparece na tela. Edições adicionais no canvas levam minutos extras se desejado. Professores produzem séries semanais completas em uma única sessão.',
      },
      {
        id: '11',
        question: 'As Atividades para Imprimir de Adivinhar Palavras Incluem Gabarito?',
        answer: 'Sim, gabarito automático é gerado junto com cada worksheet. Atividades para imprimir sempre têm versão com respostas. Alterne entre aba de worksheet e aba de gabarito. Baixe ambas separadamente em PDF ou JPEG. O gabarito mostra todas as letras preenchidas. Correção de exercícios fica rápida e objetiva.',
      },
      {
        id: '12',
        question: 'Posso Criar Atividades Específicas com Tabuada e Coordenação Motora?',
        answer: 'Absolutamente. A lista de palavras personalizadas permite qualquer vocabulário. Atividades de matemática usam termos como "adição", "subtração", "dezena", "centena". Vocabulário de tabuada inclui números por extenso como exercícios de soletração. A função de exclusão de letras força prática específica. Coordenação motora desenvolve-se ao preencher caixas de letras.',
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
      '11 idiomas suportados',
      '3000+ imagens temáticas',
      'Qualidade de impressão 300 DPI',
      'Gabaritos incluídos',
      'Todos os 33 geradores',
    ],
    ctaText: 'Comece Agora',
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
    items: [
      {
        id: '1',
        slug: 'word-search',
        name: 'Caça-Palavras',
        category: 'Língua e Leitura',
        icon: '🔍',
        description: 'Combine adivinhar palavras com caça-palavras para prática completa de vocabulário e reconhecimento de letras.',
      },
      {
        id: '2',
        slug: 'crossword',
        name: 'Palavras Cruzadas',
        category: 'Língua e Leitura',
        icon: '📝',
        description: 'Complete suas atividades de vocabulário com palavras cruzadas usando os mesmos temas.',
      },
      {
        id: '3',
        slug: 'word-scramble',
        name: 'Palavras Embaralhadas',
        category: 'Língua e Leitura',
        icon: '🔤',
        description: 'Combine com puzzles de palavras embaralhadas para reforçar ortografia e vocabulário.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Criptogramas',
        category: 'Lógica',
        icon: '🔐',
        description: 'Desafie os alunos com puzzles de decodificação que desenvolvem pensamento lógico.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Desenhos para Colorir',
        category: 'Arte e Criatividade',
        icon: '🎨',
        description: 'Recompense atividades completadas com páginas para colorir temáticas.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Trem do Alfabeto',
        category: 'Aprendizagem Inicial',
        icon: '🚂',
        description: 'Equilibre a prática de adivinhar palavras com atividades de reconhecimento de letras.',
      },
    ],
  },
};

export default wordGuessPtContent;
