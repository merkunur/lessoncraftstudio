import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'criar cartelas de bingo',
    secondaryKeywords: [
      'gerador de bingo',
      'bingo com imagens para imprimir',
      'bingo educativo para imprimir',
      'criar bingo personalizado',
    ],
    lsiKeywords: [
      'bingo',
      'jogo de mesa',
      'cartelas',
      'sorteio',
      'sala de aula',
      'festa',
    ],
    titleTag: 'Gerador de cartelas de bingo | LessonCraftStudio',
    metaDescription: 'Crie cartelas de bingo com 3.000+ imagens temáticas. Cartelas únicas por jogo, PDF imprimíveis. Teste grátis — licença comercial.',
  },

  hero: {
    title: 'Gerador de cartelas de bingo — Crie imprimíveis para vender na Hotmart, Etsy e KDP',
    tagline: 'Gere de 1 a 10 cartelas de bingo únicas por lote com grades configuráveis de 3×3 a 5×5 — preenchimento de imagens ou palavras para as células e as atividades circulares, uma folha de chamada dedicada para o chamador, exportação ZIP em lote de todas as cartelas, e 104 coleções de imagens temáticas.',
    description:
      'Crie cartelas de bingo com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz de 1 a 10 cartelas únicas por lote — cada uma com diferentes imagens em diferentes posições, essencial para que o bingo funcione como jogo. Grelhas configuráveis de 3×3 a 5×5, modo de preenchimento com imagens ou palavras, e exportação ZIP de todas as cartelas num único clique. Bingo educativo é um nicho de altíssima demanda: professores, pais e festas infantis precisam de cartelas constantemente. Com mais de 3.000 imagens em 104 temas e 11 idiomas, você cria jogos únicos para qualquer ocasião. Exporte PDFs a 300 DPI com folha de chamada e licença comercial inclusa. Teste grátis com marca d\'água — sem cadastro.',
  },

  ctaHeading: 'Crie cartelas de bingo',

  howItWorks: {
    title: 'Como Criar Cartelas de Bingo com Imagens em 5 Passos',
    steps: [
      {
        title: 'Configure o Layout da Página',
        description:
          'Abra o painel Configuração de Página e escolha um formato: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou qualquer dimensão personalizada. Selecione uma cor de fundo com o seletor de cores. Escolha um tema de fundo decorativo e ajuste a sua opacidade (de 0 a 1 em passos de 0,05), depois selecione um tema de borda com o seu próprio controlo de opacidade independente. Estas opções de layout emolduram a sua cartela de bingo antes de configurar o conteúdo.',
      },
      {
        title: 'Configure as Definições da Cartela de Bingo',
        description:
          'Abra o painel Definições da Cartela de Bingo e defina as linhas (3 a 5) e as colunas (3 a 5) para determinar o tamanho da grade — o valor predefinido é 4×4 com 16 células. Ajuste o número de cartelas de 1 a 10 para gerar em lote múltiplas cartelas de bingo únicas. Escolha o preenchimento das células (Imagem ou Palavra) e o preenchimento das atividades (Imagem ou Palavra) de forma independente — misture cartelas com imagens e atividades com palavras, cartelas com palavras e atividades com imagens, ou combine ambos. Ative a caixa \"Usar seleção personalizada\" para escolher manualmente as imagens específicas para a chamada em vez da seleção automática.',
      },
      {
        title: 'Selecione Imagens da Biblioteca',
        description:
          'Abra o painel Biblioteca de Imagens e explore 104 coleções temáticas com mais de 3100 ilustrações coloridas — animais, alimentos, veículos, natureza, festividades e dezenas mais. Filtre por tema usando o menu suspenso ou pesquise por palavra-chave. Clique nas imagens para selecioná-las para as suas cartelas de bingo. Quando a seleção personalizada de chamada está ativa, as imagens escolhidas aparecem no banco de chamada com um contador em tempo real que mostra o número de seleções. Também pode carregar imagens personalizadas PNG, JPG ou GIF através do painel Carregar Imagens.',
      },
      {
        title: 'Gere as Cartelas de Bingo',
        description:
          'Clique em Gerar para criar as suas cartelas de bingo. A aplicação preenche a grade configurada com imagens ou palavras do tema selecionado, depois cria atividades circulares com bordas tracejadas abaixo da cartela — as atividades são embaralhadas pelo algoritmo Fisher-Yates para que nunca correspondam diretamente ao layout da cartela. Se solicitou múltiplas cartelas, cada uma obtém uma seleção aleatória diferente do banco de imagens, garantindo que cada cartela do lote seja única. A primeira cartela aparece imediatamente no canvas; todas as cartelas são incluídas na exportação ZIP em lote.',
      },
      {
        title: 'Baixe Cartelas e Folha de Chamada',
        description:
          'Alterne entre o aba Cartelas + Atividades e o aba Chamada para pré-visualizar ambas as saídas. A folha de chamada apresenta uma grade dinâmica de palavras com tamanho de fonte uniforme e colunas calculadas com base no comprimento da palavra mais longa. Baixe cartelas individuais como JPEG ou PDF com os botões dedicados, ou exporte em lote todas as cartelas geradas como arquivos JPEG individuais num único arquivo bingo_cards.zip. Ative a escala de cinzentos para versões económicas em tinta. Cada exportação é renderizada a 300 DPI e está pronta para produção: listagens da Etsy, interiores da Amazon KDP e arquivos de produtos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Características Principais do Gerador de Cartelas de Bingo com Imagens',
    features: [
      {
        title: 'Grade de Bingo Configurável de 3×3 a 5×5 com Controlos Independentes de Linhas e Colunas',
        description:
          'Defina as linhas e as colunas de forma independente de 3 a 5, criando grades de 3×3 (9 células) até 5×5 (25 células). O valor predefinido é 4×4 (16 células), ideal para cartelas de bingo padrão. Uma grade 3×3 é perfeita para partidas rápidas com menos elementos a seguir, enquanto uma grade 5×5 oferece a experiência clássica de bingo com 25 células para partidas mais longas. A área da grade utiliza 60 % da altura disponível do canvas (máximo 500 px) para proporções ótimas da cartela. Os controlos independentes de linhas e colunas permitem criar grades não quadradas como 3×5 ou 5×3 para formatos de cartelas de bingo únicos que se destacam nas listagens dos marketplaces.',
      },
      {
        title: 'Geração em Lote de 1 a 10 Cartelas de Bingo Únicas por Atividade',
        description:
          'Gere de 1 a 10 cartelas de bingo únicas num único lote. Cada cartela obtém uma seleção aleatória diferente do banco de imagens, garantindo que duas cartelas do mesmo lote nunca tenham o mesmo layout. Isto é essencial para o bingo: cada jogador precisa de uma cartela diferente para o jogo funcionar. A primeira cartela aparece no canvas para pré-visualização imediata. Todas as cartelas geradas estão disponíveis para exportação em lote. Esta abordagem em lote significa que pode produzir um conjunto completo de 10 cartelas de bingo únicas com um único clique em vez de gerá-las e guardá-las uma por uma.',
      },
      {
        title: 'Exportação ZIP em Lote de Todas as Cartelas Geradas como Arquivos JPEG Individuais',
        description:
          'Exporte todas as cartelas de bingo geradas numa única download bingo_cards.zip. Cada cartela é guardada como um arquivo JPEG individual de alta resolução dentro do arquivo ZIP, nomeado sequencialmente para organização fácil. Esta exportação em lote elimina o processo tedioso de baixar cartelas uma por uma — gere 10 cartelas únicas, clique num botão e receba um conjunto completo de cartelas de bingo pronto para empacotar no seu produto do marketplace. A exportação ZIP utiliza JSZip para compressão fiável em todos os navegadores e funciona junto com os botões padrão de download individual em JPEG e PDF.',
      },
      {
        title: 'Duplo Modo de Preenchimento: Imagem ou Palavra para as Células e as Atividades Circulares',
        description:
          'As células da cartela e as atividades têm cada uma uma seleção de modo de preenchimento independente — Imagem ou Palavra. O preenchimento de imagens apresenta ilustrações temáticas nas células ou como padrões de atividades circulares. O preenchimento de palavras apresenta os nomes localizados das imagens como texto. Misture os modos para variedade criativa: cartelas com imagens e atividades com palavras criam um desafio de associação visual-textual, enquanto cartelas com palavras e atividades com imagens invertem a dinâmica. As atividades circulares apresentam bordas tracejadas (#666, strokeDashArray [5,5]) e são embaralhadas pelo algoritmo Fisher-Yates, garantindo que nunca espelhem o layout da grade. Este sistema de duplo preenchimento produz quatro estilos de cartelas de bingo distintos a partir de um só gerador.',
      },
      {
        title: 'Folha de Chamada Dedicada com Grade Dinâmica de Palavras para o Chamador',
        description:
          'Cada conjunto de cartelas de bingo inclui uma folha de chamada complementar num aba à parte. A folha de chamada apresenta uma grade dinâmica de todas as palavras únicas do banco de imagens — o chamador lê-as em voz alta enquanto os jogadores marcam as suas cartelas. As colunas são calculadas com base no comprimento da palavra mais longa (2 a 6 colunas) com um tamanho de fonte uniforme em todas as entradas para legibilidade clara. A grade é centrada na página e herda as bordas e o fundo do canvas. Ative a seleção personalizada de chamada para escolher manualmente as imagens específicas para o banco de chamada, com um contador em tempo real que mostra o número de elementos selecionados.',
      },
      {
        title: 'Biblioteca de Imagens com 104 Coleções Temáticas e Mais de 3100 Ilustrações',
        description:
          'Explore 104 coleções de imagens temáticas que cobrem animais, alimentos, veículos, natureza, profissões, festividades, desportos, estações e dezenas mais. Cada tema fornece um conjunto coordenado de ilustrações coloridas que funcionam bem em atividades de bingo — cartelas de bingo temáticas estão entre os produtos imprimíveis mais populares na Etsy e na Hotmart. Filtre por tema usando o menu suspenso ou pesquise imagens específicas por palavra-chave. A Licença Comercial inclui 10 temas coloridos para começar; o Acesso Completo desbloqueia os 104 temas para máxima variedade criativa em todos os tamanhos de grade e modos de preenchimento.',
      },
      {
        title: 'Exportação PDF e JPEG Pronta para Impressão a 300 DPI com Modo Escala de Cinzentos',
        description:
          'Baixe cartelas de bingo e folhas de chamada como imagens JPEG de alta resolução ou documentos PDF prontos para impressão renderizados a 300 DPI (multiplicador 6×, qualidade JPEG 1.0). Quatro botões dedicados exportam separadamente o JPEG da Atividade, o JPEG da Chamada, o PDF da Atividade e o PDF da Chamada. Os formatos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) e dimensões totalmente personalizadas. A orientação do PDF é detetada automaticamente. Ative a escala de cinzentos para versões económicas em tinta. Cada exportação está pronta para produção: downloads digitais, conjuntos de jogos impressos e materiais de loja.',
      },
      {
        title: 'Edição Completa do Canvas com Ferramentas de Texto, Alinhamento e Controlos de Camadas',
        description:
          'O canvas Fabric.js oferece controlo total sobre cada elemento da sua cartela de bingo. Arraste, redimensione, rode e reposicione imagens, texto e conteúdo gerado livremente. Os controlos de camadas gerem a ordem de empilhamento — traga elementos para a frente ou envie-os para trás. Bloqueie os elementos terminados enquanto edita outros. Adicione texto personalizado com sete opções de fontes (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamanho e cor ajustáveis, e largura de contorno de texto de 0 a 10 com granularidade de 0,5. Seis opções de alinhamento mais centrar na página mantêm os layouts precisos. Amplie de 50 % a 200 % em incrementos de 10 % para trabalho de detalhe. Anule e refaça até 20 estados do histórico com Ctrl+Z e Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Como Vender Cartelas de Bingo com Imagens Online',
    cases: [
      {
        title: 'Pacotes Temáticos de Cartelas de Bingo na Etsy',
        description:
          'Crie pacotes temáticos de cartelas de bingo usando as 104 coleções de imagens — bingo de animais, bingo de alimentos, bingo de veículos, bingo de festividades e dezenas mais. Cada tema fornece ilustrações suficientes para cartelas únicas em diferentes tamanhos de grade. Agrupe 10–30 cartelas de bingo únicas por tema com folhas de chamada incluídas e venda entre $3 e $8 por pacote. Utilize a geração em lote para criar 10 cartelas únicas por conjunto em segundos, depois misture tamanhos de grade num único pacote: cartelas 3×3 para partidas rápidas, cartelas 4×4 padrão e cartelas 5×5 para partidas longas. A exportação ZIP em lote agiliza a produção para vendedores de alto volume.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cadernos de Atividades de Bingo na Amazon KDP',
        description:
          'Compile 40 a 80 cartelas de bingo num caderno de atividades impresso formatado para a Amazon KDP. Estruture o seu livro por capítulos temáticos: animais, alimentos, veículos, festividades e mais. Inclua as folhas de chamada após cada série de cartelas para que o livro seja autónomo e pronto para jogar. Utilize a escala de cinzentos para interiores económicos em tinta que mantêm os custos de impressão baixos. Misture tamanhos de grade para oferecer dificuldade progressiva — comece com cartelas 3×3 para partidas rápidas e avance para 5×5 para partidas mais longas. Os cadernos de atividades de bingo vendem-se bem durante todo o ano e têm picos durante as festividades quando as famílias procuram atividades em grupo.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Atividades de Bingo para a loja na Hotmart',
        description:
          'Crie conjuntos de bingo prontos para jogar com cartelas únicas para cada jogador e folhas de chamada para o vendedor. Os vendedores que procuram atividades de bingo na Hotmart valorizam produtos prontos para usar — imprima as cartelas, distribua e comece a jogar imediatamente. Crie conjuntos alinhados com o catálogo de produtos: bingo de vocabulário com o modo preenchimento de palavras, bingo de reconhecimento de imagens com o modo preenchimento de imagens, e bingo em modo misto para pacotes escalonados por nível. Inclua 10 cartelas únicas por conjunto (suficiente para um grupo pequeno) com uma folha de chamada. O modo preenchimento de palavras com os nomes localizados das imagens transforma o bingo numa atividade de revisão de vocabulário.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Coleções de Bingo Sazonais e de Festividades',
        description:
          'As 104 coleções de imagens temáticas cobrem cada ocasião sazonal e festiva — Natal, Halloween, Páscoa, Dia dos Namorados, regresso às aulas, férias de verão e mais. O bingo é um jogo naturalmente social que tem picos durante as festividades quando as famílias e as salas de aula procuram atividades em grupo. Publique conjuntos de bingo de Halloween em setembro, coleções de Natal em outubro e pacotes do Dia dos Namorados em janeiro. Cada conjunto sazonal inclui múltiplos tamanhos de grade, variantes de preenchimento de imagens e de palavras, e folhas de chamada. Os produtos de bingo sazonais alcançam preços mais altos durante as suas janelas de maior procura.',
        platform: 'Etsy / Amazon KDP / Hotmart (sazonal)',
      },
      {
        title: 'Cartelas de Bingo para Eventos, Festas e Ocasiões Especiais',
        description:
          'Crie conjuntos de cartelas de bingo para festas, chás de bebé, despedidas de solteira, atividades de equipa e workshops educativos. Os tamanhos de grade configuráveis e a biblioteca de imagens temáticas facilitam a produção de jogos de bingo específicos para cada ocasião — bingo de artigos de bebé para chás de bebé, bingo de alimentos para aulas de culinária, bingo de animais para visitas ao jardim zoológico. Gere em lote 10 cartelas únicas por evento com uma folha de chamada, empacote como download instantâneo em PDF e venda na Etsy onde os organizadores de eventos procuram ativamente jogos imprimíveis. A seleção personalizada de chamada permite-lhe escolher exatamente quais elementos aparecem no jogo.',
        platform: 'Etsy (etsy.com / organizadores de eventos)',
      },
    ],
  },

  faq: [
    {
      question: 'Quais tamanhos de grade estão disponíveis para as cartelas de bingo?',
      answer:
        'As linhas e as colunas são configuráveis de forma independente de 3 a 5, criando grades de 3×3 (9 células) até 5×5 (25 células). O valor predefinido é 4×4 com 16 células. Também pode criar grades não quadradas como 3×5 (15 células) ou 5×3 (15 células) para formatos de cartelas de bingo únicos. As grades mais pequenas são ideais para partidas rápidas, enquanto as grades 5×5 oferecem a experiência clássica de bingo com mais elementos a seguir.',
    },
    {
      question: 'Como funciona a geração em lote para múltiplas cartelas de bingo?',
      answer:
        'Ajuste o número de cartelas de 1 a 10 no painel Definições da Cartela de Bingo. Cada cartela obtém uma seleção aleatória diferente do banco de imagens, garantindo que cada cartela do lote seja única — essencial para o bingo onde cada jogador precisa de uma cartela diferente. A primeira cartela aparece imediatamente no canvas para pré-visualização. Todas as cartelas geradas estão disponíveis através da exportação ZIP em lote para download como arquivos JPEG individuais.',
    },
    {
      question: 'Como funciona a exportação ZIP em lote?',
      answer:
        'Após gerar múltiplas cartelas de bingo, clique no botão de exportação em lote para baixar todas as cartelas como arquivos JPEG individuais de alta resolução empacotados num único arquivo bingo_cards.zip. Cada cartela é nomeada sequencialmente dentro do ZIP para organização fácil. Isto elimina a necessidade de baixar cartelas uma por uma — gere um conjunto completo de 10 cartelas únicas e exporte-as todas com um único clique usando a compressão JSZip.',
    },
    {
      question: 'Qual é a diferença entre o preenchimento das células e o preenchimento das atividades?',
      answer:
        'As células da cartela e as atividades têm cada uma um modo de preenchimento independente: Imagem ou Palavra. O preenchimento das células determina o que aparece em cada célula da grade de bingo. O preenchimento das atividades determina o que aparece nas atividades circulares abaixo da cartela que os jogadores usam para a associação. Pode misturar os modos — cartelas com imagens e atividades com palavras, cartelas com palavras e atividades com imagens, ou combinar ambos — criando quatro estilos de cartelas de bingo distintos a partir de um mesmo conjunto de imagens.',
    },
    {
      question: 'O que é a folha de chamada e como funciona?',
      answer:
        'A folha de chamada é uma página separada (acessível através do aba Chamada) que apresenta uma grade dinâmica de todos os elementos únicos do banco de imagens. O chamador lê estas palavras em voz alta enquanto os jogadores marcam as suas cartelas de bingo. As colunas são calculadas com base no comprimento da palavra mais longa (2 a 6 colunas) com um tamanho de fonte uniforme. A grade é centrada na página e herda as bordas e o fundo do canvas. Isto NÃO é um gabarito — é uma folha de referência para a pessoa que dirige o jogo de bingo.',
    },
    {
      question: 'O que é a seleção personalizada de chamada?',
      answer:
        'Ative a caixa \"Usar seleção personalizada\" no painel Definições da Cartela de Bingo para escolher manualmente quais imagens específicas aparecem no banco de chamada. Quando ativa, clique nas imagens na Biblioteca de Imagens para adicioná-las à sua seleção personalizada — um contador em tempo real mostra \"Selecionados para chamada personalizada: X\" à medida que escolhe. Isto dá-lhe controlo preciso sobre quais elementos aparecem no jogo de bingo, útil para atividades alinhadas com o catálogo de produtos ou eventos temáticos que requerem vocabulário específico.',
    },
    {
      question: 'O Gerador de Cartelas de Bingo com Imagens é sensível ao idioma?',
      answer:
        'Sim. No modo preenchimento de palavras para as células ou as atividades, as palavras apresentadas são os nomes localizados das imagens da Biblioteca de Imagens. Mudar o idioma nas Definições da Atividade altera as palavras nas cartelas, nas atividades e na folha de chamada. Por exemplo, uma imagem de gato mostra \"Gato\" em português mas \"Katze\" em alemão e \"Cat\" em inglês. A Licença Comercial inclui 10 temas coloridos com inglês apenas; o Acesso Completo desbloqueia os 104 temas e os 11 idiomas para conteúdo textual localizado.',
    },
    {
      question: 'Por que não há gabarito para as cartelas de bingo?',
      answer:
        'As cartelas de bingo utilizam uma folha de chamada em vez de um gabarito. No bingo, o chamador lê os elementos da folha de chamada enquanto os jogadores marcam os elementos correspondentes nas suas cartelas únicas — não existe uma única \"resposta correta\" pois a cartela de cada jogador tem elementos diferentes em posições diferentes. A folha de chamada serve como documento de referência do jogo, listando todos os elementos possíveis que o chamador pode anunciar durante a partida.',
    },
    {
      question: 'Existe um teste grátis?',
      answer:
        'Sim. Pode aceder a todas as funcionalidades — todos os tamanhos de grade, a geração em lote de até 10 cartelas, a exportação ZIP em lote, os modos de preenchimento de imagens e de palavras, a folha de chamada, a biblioteca de imagens completa, a seleção personalizada de chamada, os temas de fundo e de borda, as ferramentas de texto e todos os formatos de download — sem criar uma conta, inserir cartão de crédito ou instalar qualquer software. Os downloads do teste grátis incluem uma pequena marca d\'água. Uma licença comercial remove a marca d\'água e concede direitos completos de venda.',
    },
    {
      question: 'Podem-se adicionar temas de fundo e de borda às cartelas de bingo?',
      answer:
        'Sim. O painel Configuração de Página inclui um seletor de tema de fundo com um controlo deslizante de opacidade (de 0 a 1 em passos de 0,05) e um seletor de tema de borda com o seu próprio controlo deslizante de opacidade independente. Os temas de fundo adicionam padrões decorativos atrás da grade de bingo, enquanto os temas de borda emolduram a página. A folha de chamada herda as bordas e o fundo do canvas principal. Ambos têm controlos de opacidade separados para criar fundos subtis com bordas proeminentes, ou qualquer combinação que se adapte ao seu design.',
    },
    {
      question: 'Qual é a política de reembolso?',
      answer:
        'Como o teste grátis lhe dá acesso a todas as funcionalidades, não oferecemos reembolsos em compras de licenças comerciais. Pode testar todos os tamanhos de grade, a geração em lote, a exportação ZIP, os modos de preenchimento de imagens e de palavras, a folha de chamada, a biblioteca de imagens completa, a seleção personalizada de chamada, os temas de fundo e de borda, as ferramentas de texto e todos os formatos de download antes de comprar. O teste grátis é a política de reembolso — certifique-se de que a ferramenta se adequa às suas necessidades antes de adquirir uma licença.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'ligar-atividades',
      anchorText: 'Gerador de Atividades de Associação',
    },
    {
      pageType: 'app',
      slug: 'quebra-cabeca-grade-atividades',
      anchorText: 'Gerador de Puzzles de Quadrícula',
    },
    {
      pageType: 'app',
      slug: 'combinar-sombras-atividades',
      anchorText: 'Gerador de Atividades de Associação de Sombras',
    },
    {
      pageType: 'app',
      slug: 'classificacao-imagens-atividades',
      anchorText: 'Gerador de Atividades de Classificação de Imagens',
    },
    {
      pageType: 'app',
      slug: 'encontrar-objetos-atividades',
      anchorText: 'Gerador de Atividades de Encontrar Objetos',
    },
    {
      pageType: 'app',
      slug: 'caca-palavras-atividades',
      anchorText: 'Gerador de Caça-Palavras',
    },
    {
      pageType: 'bundle',
      slug: 'pacote-associacao-classificacao',
      anchorText: 'Pacote Associação e Classificação — Todas as Aplicações de Associação num Pacote',
    },
    {
      pageType: 'guide',
      slug: 'criar-cartelas-bingo',
      anchorText: 'Como Criar e Vender Cartelas de Bingo Online',
    },
    {
      pageType: 'idea',
      slug: 'campismo-ideias-imprimiveis',
      anchorText: 'Ideias de imprimíveis de camping e ar livre',
    },
    {
      pageType: 'idea',
      slug: 'animais-marinhos-ideias-imprimiveis',
      anchorText: 'Ideias de imprimíveis de animais marinhos',
    },
    {
      pageType: 'start',
      slug: 'marketing-negocio-imprimiveis',
      anchorText: 'Marketing para seu negócio de imprimíveis',
    },
    {
      pageType: 'tool',
      slug: 'bingo-worksheet-maker',
      anchorText: 'Looking for the free browser version? Try the free maker tool.',
    },
    {
      pageType: 'tool',
      slug: 'kdp-royalty-calculator',
      anchorText: 'Calculate KDP royalties for your activity books',
    },
    {
      pageType: 'tool',
      slug: 'kdp-size-calculator',
      anchorText: 'Pick the right KDP book size & margins',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/portuguese/bingo/bingo-de-imagenes-1.webp',
      primaryAlt: 'Cartela de bingo com imagens temáticas numa grade e atividades circulares com bordas tracejadas abaixo',
    },
    sampleGallery: [
      {
        src: '/samples/portuguese/bingo/bingo-de-imagenes-2.webp',
        alt: 'Cartela de bingo com preenchimento de imagens mostrando ilustrações temáticas coloridas nas células e atividades circulares com imagens',
        caption: 'Modo preenchimento de imagens — ilustrações coloridas nas células e nas atividades circulares',
      },
      {
        src: '/samples/portuguese/bingo/bingo-de-imagenes-3.webp',
        alt: 'Cartela de bingo com preenchimento de palavras mostrando nomes localizados de imagens nas células e atividades com palavras',
        caption: 'Modo preenchimento de palavras — nomes localizados de imagens para bingo baseado em vocabulário',
      },
      {
        src: '/samples/portuguese/bingo/bingo-de-imagenes-4.webp',
        alt: 'Folha de chamada de bingo com grade dinâmica de palavras mostrando todos os elementos do jogo para o chamador',
        caption: 'Folha de chamada — grade dinâmica de palavras para a pessoa que dirige o jogo de bingo',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Como Criar Cartelas de Bingo com Imagens com Geração em Lote e Folhas de Chamada — Tutorial Passo a Passo',
  },
};

export default content;
