import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Atividades de Ligar (Matching/MatchUp Maker) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/ligar-fichas.ts
 * URL: /pt/apps/ligar-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'ligar-fichas',
    appId: 'matching-app',
    title: 'Atividades de Ligar para Imprimir - Gerador de Atividades de Alfabetização para Educação Infantil',
    description: 'Crie atividades de ligar profissionais em menos de 3 minutos. Com sua assinatura Pacote Essencial, você tem acesso ilimitado ao gerador de atividades para imprimir. Produza fichas educativas personalizadas sem taxas por atividade.',
    keywords: 'atividades de ligar, atividades para imprimir, atividades de alfabetização, educação infantil, coordenação motora, associação, atividades vogais, 1º ano, 2º ano, desenhos para colorir, letra cursiva, pontilhado',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/ligar-fichas',
  },

  // Hero Section - FULL text from matching.md paragraphs 1-3
  hero: {
    title: 'Atividades de Ligar para Imprimir',
    subtitle: 'Gerador de Atividades de Alfabetização para Educação Infantil',
    description: `Crie atividades de ligar profissionais em menos de 3 minutos. Com sua assinatura Pacote Essencial, você tem acesso ilimitado ao gerador de atividades para imprimir. Produza fichas educativas personalizadas sem taxas por atividade. Baixe em PDF de alta qualidade prontas para usar em sala de aula.

O gerador de atividades de ligar é a solução completa para professores de educação infantil e ensino fundamental. Crie exercícios onde os alunos conectam imagens com letras iniciais, palavras ou outras imagens. Perfeito para atividades de alfabetização e desenvolvimento da coordenação motora.

Desenvolva materiais didáticos que associam imagens a letras iniciais. Ideal para crianças em fase de alfabetização. O sistema oferece biblioteca com mais de 3000 imagens educativas organizadas por temas.`,
    previewImageSrc: '/samples/english/matching/matching portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Exemplos de Atividades de Ligar',
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
        worksheetSrc: '/samples/english/matching/matching portrait.jpeg',
        answerKeySrc: '/samples/english/matching/matching portrait answer_key.jpeg',
        altText: 'Atividade de ligar formato retrato para educação infantil',
        pdfDownloadUrl: '/samples/english/matching/matching portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/matching/image and word.jpeg',
        answerKeySrc: '/samples/english/matching/image and word answer_key.jpeg',
        altText: 'Atividade de ligar imagem e palavra para alfabetização',
        pdfDownloadUrl: '/samples/english/matching/image and word.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/matching/image and custom word.jpeg',
        answerKeySrc: '/samples/english/matching/image and custom word answer_key.jpeg',
        altText: 'Atividade de ligar com palavras personalizadas',
        pdfDownloadUrl: '/samples/english/matching/image and custom word.pdf',
      },
    ],
  },

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Atividades para Imprimir',
    sectionDescription: 'O gerador de atividades de ligar oferece recursos profissionais para criar materiais educativos. Sua assinatura Pacote Essencial desbloqueia todas as funcionalidades sem custos adicionais. Produza atividades para imprimir personalizadas em minutos. Cada recurso foi desenvolvido pensando nas necessidades de professores brasileiros.',
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
        title: 'Criação Rápida de Atividades Educação Infantil',
        description: `Criar atividades de ligar nunca foi tão simples. Selecione um tema da biblioteca de imagens. Escolha o modo de associação desejado. Clique em gerar e sua atividade está pronta. O sistema cria automaticamente pares aleatorizados para cada folha.

Você pode escolher entre quatro modos de associação. O modo imagem-letra inicial é perfeito para atividades de alfabetização. O modo imagem-palavra combina figura com nome escrito. O modo imagem-imagem trabalha associação visual. O modo personalizado permite inserir suas próprias palavras.

Configure de 4 a 6 pares por atividade. Ative campos para nome e data do aluno. Inclua numeração nos itens automaticamente. Mostre ou oculte os pontos de conexão conforme preferir.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edição Completa de Atividades para Imprimir',
        description: `Após gerar a atividade, você tem controle total sobre cada elemento. Arraste imagens para reposicionar livremente. Redimensione qualquer objeto com o mouse. Gire elementos para criar layouts criativos. Delete itens que não deseja manter.

O sistema de camadas permite organizar elementos. Traga objetos para frente ou envie para trás. Alinhe múltiplos elementos com precisão. Centralize conteúdo horizontal e verticalmente na página.

Adicione textos personalizados em suas atividades para imprimir. Escolha entre fontes educativas como Lexend Deca e Nunito. Ajuste tamanho, cor e contorno das letras. Crie títulos atrativos para suas fichas de atividades de alfabetização.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload de Imagens para Atividades de Matemática e Alfabetização',
        description: `Envie suas próprias imagens para criar atividades personalizadas. O sistema aceita formatos JPEG, PNG e GIF. Faça upload de múltiplos arquivos simultaneamente. Combine imagens próprias com a biblioteca do sistema.

Personalize atividades de matemática com fotos de objetos da sala. Crie exercícios de associação com rostos dos alunos. Use imagens temáticas de datas comemorativas. Produza materiais únicos para sua turma específica.

Imagens enviadas ficam disponíveis durante toda a sessão. Selecione quais usar em cada atividade gerada. Misture fotos próprias com ilustrações da biblioteca.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades Vogais e Alfabeto em 11 Idiomas',
        description: `O gerador suporta 11 idiomas na interface e biblioteca de imagens. Português brasileiro está totalmente traduzido. Todos os nomes de imagens aparecem corretamente em português. Ideal para criar atividades de alfabetização com vocabulário correto.

Use em programas de educação bilíngue. Crie atividades vogais e alfabeto em inglês para aulas de língua estrangeira. Produza materiais em espanhol para escolas de fronteira. Atenda comunidades imigrantes com atividades em seus idiomas nativos.

A troca de idioma afeta toda a biblioteca de imagens. Pesquise objetos usando termos em português. Filtre por temas traduzidos corretamente.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licença Comercial para Atividades 1º Ano e 2º Ano',
        description: `Sua assinatura Pacote Essencial inclui licença comercial completa. Venda suas atividades para imprimir em plataformas digitais. Comercialize no Hotmart, Educa Market ou seu próprio site. Nenhuma taxa adicional por licenciamento.

Crie pacotes de atividades 1º ano para venda. Desenvolva coleções de atividades 2º ano temáticas. Produza apostilas de atividades de alfabetização comercializáveis. Monetize seu trabalho como professor empreendedor.

A licença cobre uso comercial print-on-demand. Venda arquivos digitais para download. Imprima e comercialize versões físicas.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens para Desenhos para Colorir e Atividades',
        description: `Acesse mais de 3000 imagens educativas organizadas por temas. Encontre ilustrações de animais, alimentos, transportes e muito mais. Todas as imagens são adequadas para crianças. Qualidade profissional em cada ilustração.

Use a biblioteca para criar desenhos para colorir combinados com atividades de ligar. Selecione imagens de um tema específico. Pesquise por nome do objeto em português. Filtre resultados para encontrar exatamente o que precisa.

Temas incluem escola, casa, natureza, corpo humano e profissões. Encontre imagens sazonais para datas comemorativas.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI para Coordenação Motora',
        description: `Exporte suas atividades em resolução profissional de 300 DPI. Ideal para impressão em gráficas ou em casa. Linhas nítidas para exercícios de coordenação motora. Detalhes preservados em atividades de letra cursiva e pontilhado.

Escolha entre formatos PDF ou JPEG para download. PDF mantém qualidade vetorial dos textos. JPEG é compatível com qualquer impressora. Ambos os formatos suportam alta resolução.

Ative o modo escala de cinza para economia de tinta. Perfeito para atividades de coordenação motora em preto e branco.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '📋',
        title: 'Gabarito Automático para Correção Rápida',
        description: `O sistema gera automaticamente folha de respostas. Mostre as conexões corretas para correção rápida. Imprima gabarito separadamente para o professor. Facilite a avaliação de atividades de pontilhado e associação.

Tamanhos de página incluem Carta, A4 e formatos personalizados. Escolha orientação retrato ou paisagem. Configure dimensões exatas em pixels. Adapte para qualquer necessidade de impressão.

Recursos de desfazer e refazer salvam seu trabalho. Volte passos anteriores se cometer erros.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Como Criar Atividades de Ligar em 5 Passos',
    sectionDescription: 'Aprenda a criar atividades de ligar profissionais em menos de 3 minutos. Este guia passo a passo mostra cada etapa do processo. Sua assinatura Pacote Essencial permite criar atividades para imprimir ilimitadas.',
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
        title: 'Escolha o Conteúdo para Atividades Educação Infantil',
        description: `O primeiro passo é selecionar o conteúdo da sua atividade de ligar. Você tem três opções principais para escolher. Cada opção atende diferentes necessidades pedagógicas.

A primeira opção é usar temas aleatórios da biblioteca. O sistema seleciona imagens automaticamente de todos os temas disponíveis. Ideal para atividades educação infantil variadas.

A segunda opção é escolher um tema específico. Selecione animais, alimentos, escola ou outros temas. Todas as imagens virão desse tema escolhido. Perfeito para atividades temáticas de datas comemorativas.

A terceira opção é selecionar imagens específicas manualmente. Navegue pela biblioteca e clique nas imagens desejadas. Combine diferentes temas em uma única atividade.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure as Opções de Associação e Quantidade',
        description: `Após selecionar o conteúdo, configure as opções da atividade. O modo de associação define como os pares serão formados. A quantidade de pares determina a dificuldade.

O modo imagem-letra inicial é ideal para atividades de alfabetização. Os alunos conectam figuras à letra que inicia o nome. O modo imagem-palavra mostra figura e nome escrito nos dois lados.

O modo imagem-imagem trabalha associação visual pura. Alunos conectam pares de figuras relacionadas. O modo personalizado permite inserir suas próprias palavras.

Configure de 4 a 6 pares por folha. Menos pares são adequados para crianças menores.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere Atividades Vogais e Alfabeto Instantaneamente',
        description: `Com conteúdo e configurações definidos, clique no botão Gerar. A atividade aparece instantaneamente na tela principal. O sistema randomiza a ordem dos itens automaticamente. Cada clique em gerar produz uma versão diferente.

A visualização mostra exatamente como a atividade ficará impressa. Veja as imagens posicionadas nos dois lados da folha. Confira as letras ou palavras correspondentes.

Se não gostar do resultado, clique em gerar novamente. O sistema criará nova combinação aleatória. Continue gerando até encontrar a versão ideal.

O botão de gerar folha de respostas fica disponível após criar a atividade.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite Atividades de Coordenação Motora',
        description: `Após gerar a atividade, personalize cada elemento na tela. Esta etapa transforma atividades genéricas em materiais únicos. Use as ferramentas de edição para ajustes finos.

Clique em qualquer elemento para selecioná-lo. Arraste para reposicionar na página. Use as alças de canto para redimensionar. Gire usando o controle superior do objeto selecionado.

Adicione textos personalizados usando a seção Ferramentas de Texto. Digite instruções específicas para sua atividade. Escolha fontes educativas adequadas para crianças.

Aplique bordas decorativas da biblioteca de molduras. Escolha entre dezenas de opções temáticas.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe Atividades 1º Ano e 2º Ano em PDF',
        description: `Com a atividade finalizada, baixe o arquivo para impressão. Escolha entre formatos PDF ou JPEG. Ambos exportam em qualidade profissional 300 DPI. Perfeito para atividades 1º ano e 2º ano.

Clique no botão Download para abrir as opções. Selecione Atividade PDF para documento vetorial. Escolha Atividade JPEG para imagem de alta resolução. Baixe também a folha de respostas separadamente.

Ative a opção escala de cinza antes de baixar. Economize tinta em impressões de grande volume. Mantenha qualidade mesmo em preto e branco.

Salve os arquivos em pasta organizada no computador. Imprima em papel sulfite comum ou papel especial.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa Atividades de Ligar',
    sectionDescription: 'O gerador de atividades de ligar atende diversos perfis de educadores. Professores de escola, pais e profissionais encontram valor nesta ferramenta. Cada grupo utiliza as atividades para imprimir de formas diferentes.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades Educação Infantil para Pré-Escola e Creche',
        description: `Professores de educação infantil usam atividades de ligar diariamente. Crianças de 4 a 6 anos adoram conectar imagens coloridas. O formato visual funciona antes mesmo da alfabetização formal. Desenvolve habilidades fundamentais para aprendizagem futura.

Crie atividades educação infantil com temas do interesse das crianças. Use animais, brinquedos e objetos familiares. Configure apenas 4 pares para turmas iniciantes. Aumente gradualmente conforme a turma avança.

O modo imagem-imagem é ideal para pré-escola. Alunos associam pares sem precisar ler. Trabalha reconhecimento visual e raciocínio lógico. Prepara para atividades de alfabetização futuras.`,
        quote: 'Meus alunos adoram conectar as imagens coloridas!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do Ensino Fundamental',
        subtitle: 'Atividades 1º Ano e 2º Ano para Anos Iniciais',
        description: `Professores de 1º ao 3º ano usam atividades de ligar para reforço. O modo imagem-letra inicial complementa aulas de alfabetização. Alunos praticam reconhecimento de letras iniciais. Conectam figura à letra correspondente de forma divertida.

Crie atividades 1º ano focadas em vogais e consoantes simples. Use imagens com nomes curtos e familiares. Configure 5 ou 6 pares para desafio adequado. Inclua numeração para facilitar correção em turmas grandes.

Atividades 2º ano podem usar palavras completas. O modo imagem-palavra reforça leitura global. Alunos conectam figura ao nome escrito.`,
        quote: 'A progressão de dificuldade acompanha o desenvolvimento dos alunos.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais em Educação Domiciliar',
        subtitle: 'Atividades de Alfabetização para Homeschool',
        description: `Famílias que praticam educação domiciliar valorizam materiais personalizados. O gerador permite criar atividades de alfabetização sob medida. Adapte o ritmo ao desenvolvimento individual da criança. Produza materiais alinhados ao currículo familiar escolhido.

Use fotos da própria família nas atividades. Faça upload de imagens de objetos da casa. Crie conexões entre aprendizado e vida real. Torne as atividades para imprimir significativas e pessoais.

Pais podem criar sequências progressivas de dificuldade. Comece com 4 pares e imagens simples. Avance para 6 pares com palavras mais complexas.`,
        quote: 'Uma ferramenta perfeita para educação domiciliar.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Idiomas',
        subtitle: 'Atividades Vogais e Alfabeto para Ensino Bilíngue',
        description: `Professores de inglês usam atividades de ligar para vocabulário. O suporte a 11 idiomas facilita criação de materiais. Troque o idioma da biblioteca para inglês. Gere atividades vogais e alfabeto em língua estrangeira.

Escolas bilíngues criam materiais em dois idiomas. Produza a mesma atividade em português e inglês. Compare vocabulário entre as línguas. Reforce aprendizado através de associação visual.

O modo imagem-palavra é perfeito para ensino de idiomas. Alunos conectam figura ao nome em língua estrangeira.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Coordenação Motora e Desenhos para Colorir Adaptados',
        description: `Educadores especiais adaptam atividades para necessidades individuais. Configure apenas 4 pares para reduzir sobrecarga visual. Use imagens grandes e espaçamento generoso. Simplifique para garantir sucesso do aluno.

Atividades de coordenação motora beneficiam alunos com dificuldades. Traçar linhas retas desenvolve controle motor fino. Progresso gradual constrói confiança e habilidade. Combine com desenhos para colorir para atividade completa.

O modo imagem-imagem funciona para alunos não-alfabetizados. Trabalhe associação visual sem exigir leitura.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Atividades de Matemática e Tabuada para Venda Online',
        description: `Professores que vendem materiais digitais encontram oportunidade. A licença comercial do Pacote Essencial permite venda sem taxas extras. Crie pacotes de atividades de matemática para comercialização. Monetize seu conhecimento pedagógico.

Desenvolva coleções temáticas de atividades de tabuada. Produza pacotes para cada número da tabuada. Venda individualmente ou em conjunto completo. Ofereça materiais únicos que você mesmo criou.

Plataformas como Hotmart e Educa Market aceitam arquivos PDF. Exporte em 300 DPI qualidade profissional.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from matching.md
  faq: {
    sectionTitle: 'Perguntas Frequentes',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre o gerador de atividades de ligar. Encontre respostas claras para suas dúvidas.',
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
        question: 'O gerador de atividades de ligar é gratuito?',
        answer: 'O gerador de atividades de ligar requer assinatura Pacote Essencial. O custo é R$720 por ano ou R$72 por mês. Sua assinatura permite criação ilimitada de atividades educação infantil. Não há taxas por atividade gerada ou baixada. O Pacote Essencial inclui 10 geradores populares de atividades. Além do MatchUp Maker, você acessa Math Worksheets, Alphabet Train e outros.',
      },
      {
        id: '2',
        question: 'Posso imprimir as atividades em casa?',
        answer: 'Sim, todas as atividades exportam em formato compatível com impressoras domésticas. Escolha PDF ou JPEG de alta resolução. Ambos funcionam perfeitamente em impressoras jato de tinta ou laser. A resolução de 300 DPI garante qualidade profissional. Use papel sulfite comum gramatura 75g para resultados excelentes. A opção escala de cinza economiza tinta colorida.',
      },
      {
        id: '3',
        question: 'Preciso de habilidades de design para criar atividades?',
        answer: 'Não é necessária nenhuma habilidade técnica ou artística. O sistema gera atividades de coordenação motora automaticamente. Você apenas seleciona tema e configurações básicas. O gerador faz todo o trabalho visual. Se desejar personalizar, as ferramentas são intuitivas. Arraste elementos com o mouse para reposicionar. Qualquer pessoa consegue usar em minutos.',
      },
      {
        id: '4',
        question: 'Posso usar as atividades com meus alunos em sala?',
        answer: 'A assinatura Pacote Essencial inclui uso ilimitado em sala de aula. Imprima quantas cópias precisar para seus alunos. Distribua atividades vogais e alfabeto livremente. Nenhuma restrição de quantidade ou frequência. Use com turmas de qualquer tamanho. Gere versões diferentes para evitar cópias entre alunos.',
      },
      {
        id: '5',
        question: 'Quais idiomas estão disponíveis?',
        answer: 'O gerador suporta 11 idiomas completos. Português brasileiro está totalmente traduzido na interface e biblioteca. Outros idiomas incluem inglês, espanhol, alemão e francês. Italiano, holandês, sueco, dinamarquês, norueguês e finlandês também estão disponíveis. Todos os nomes de imagens aparecem traduzidos corretamente. Perfeito para professores de línguas estrangeiras e escolas bilíngues.',
      },
      {
        id: '6',
        question: 'Posso vender as atividades que eu criar?',
        answer: 'Sim, a assinatura Pacote Essencial inclui licença comercial completa. Venda atividades 1º ano em plataformas digitais sem taxas extras. Comercialize atividades 2º ano no Hotmart, Educa Market ou site próprio. A licença cobre uso print-on-demand comercial. Venda arquivos digitais para download imediato. Imprima e comercialize versões físicas também.',
      },
      {
        id: '7',
        question: 'Como personalizar as atividades de ligar?',
        answer: 'Após gerar a atividade, personalize cada elemento na tela. Arraste imagens para reposicionar livremente. Redimensione qualquer objeto com o mouse. Adicione textos personalizados em suas atividades para imprimir. Escolha entre fontes educativas. Aplique bordas decorativas da biblioteca. Combine com desenhos para colorir nas margens.',
      },
      {
        id: '8',
        question: 'Para quais idades as atividades funcionam?',
        answer: 'Atividades de letra cursiva são indicadas para crianças de 5 a 8 anos. O modo de associação imagem-letra trabalha reconhecimento visual. Crianças menores de 5 anos usam modo imagem-imagem. Não exige leitura, apenas associação visual. Alunos mais velhos usam modo imagem-palavra completa. Adapte a dificuldade conforme o desenvolvimento individual.',
      },
      {
        id: '9',
        question: 'Posso enviar minhas próprias imagens?',
        answer: 'Sim, o upload de imagens personalizadas é suportado. Clique na seção de upload no painel lateral. Selecione arquivos JPEG, PNG ou GIF do seu computador. Faça upload de múltiplas imagens simultaneamente. Combine fotos próprias com ilustrações da biblioteca. Use fotos de objetos da sala de aula ou rostos dos alunos.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar uma atividade?',
        answer: 'Criar uma atividade educação infantil leva menos de 3 minutos. Selecione tema ou imagens desejadas. Configure opções de pares e formato. Clique em gerar e baixe imediatamente. Personalização adicional pode levar mais alguns minutos. A maioria dos professores completa atividades em 5 minutos total. Compare com 30-60 minutos para criar manualmente.',
      },
      {
        id: '11',
        question: 'As atividades incluem gabarito?',
        answer: 'Sim, o sistema gera folha de respostas automaticamente. Após criar atividades, clique em Gerar Gabarito. O sistema produz versão com todas as conexões corretas visíveis. Baixe gabarito separadamente da atividade do aluno. Imprima apenas para uso do professor. Corrija rapidamente comparando com as respostas corretas.',
      },
      {
        id: '12',
        question: 'Posso criar atividades sobre temas específicos?',
        answer: 'Sim, use a biblioteca temática ou upload de imagens próprias. Crie atividades de matemática com tema de animais, alimentos ou transportes. O modo personalizado permite inserir textos específicos. Combine com outros geradores do Pacote Essencial para pacotes completos. Use Math Worksheets para operações e MatchUp Maker para associação visual.',
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Maximize o valor do seu Pacote Essencial combinando geradores. Crie pacotes completos de atividades para imprimir usando múltiplos apps.',
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
        slug: 'atividades-matematica-fichas',
        name: 'Atividades de Matemática',
        category: 'Matemática',
        icon: '🔢',
        description: 'Combine atividades de ligar com fichas de operações matemáticas para pacotes completos.',
      },
      {
        id: '2',
        slug: 'trem-alfabeto-fichas',
        name: 'Trenzinho do Alfabeto',
        category: 'Alfabetização',
        icon: '🚂',
        description: 'O Alphabet Train gera atividades de treino de letras que complementam perfeitamente as atividades de ligar.',
      },
      {
        id: '3',
        slug: 'caca-palavras-fichas',
        name: 'Caça-Palavras',
        category: 'Linguagem',
        icon: '🔍',
        description: 'Caça-palavras complementa atividades de ligar para vocabulário e reconhecimento de palavras.',
      },
      {
        id: '4',
        slug: 'desenhos-colorir-fichas',
        name: 'Desenhos para Colorir',
        category: 'Criativo',
        icon: '🎨',
        description: 'Combine atividades de ligar com desenhos para colorir para atividades multifuncionais.',
      },
    ],
  },
};

export default matchingPtContent;
