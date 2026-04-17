import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'quebra-cabeça para imprimir',
    secondaryKeywords: [
      'peças faltando atividade',
      'complete o puzzle exercício',
      'observação visual atividade',
      'lógica visual para imprimir',
    ],
    lsiKeywords: [
      'quebra-cabeça',
      'completar',
      'observar',
      'raciocínio visual',
    ],
    titleTag: 'Gerador de peças faltantes | LessonCraftStudio',
    metaDescription: 'Crie atividades de "peças faltando" com imagens temáticas e gabarito automático. PDF 300 DPI imprimíveis. Teste grátis.',
  },

  hero: {
    title: 'Gerador de peças faltantes — Crie imprimíveis para vender na Hotmart, Etsy e KDP',
    tagline: 'Gere quebra-cabeças estilo puzzle onde se recortam peças de imagens e os usuários identificam a opção numerada correta — com 6 formas de peça, 1–5 peças faltantes, 2–6 opções de solução com peças distratoras, gabaritos automáticos e design puramente visual que funciona em qualquer idioma.',
    description:
      'Crie quebra-cabeças de peças faltantes para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz puzzles visuais onde uma parte da imagem é removida e as crianças devem identificar a peça correta entre várias opções — desenvolvendo atenção visual, raciocínio lógico e habilidades de observação. Com mais de 3.000 ilustrações em 104 temas, você cria variações temáticas ilimitadas. Quebra-cabeças de peças faltantes são perfeitos para apostilas no Amazon KDP e kits de atividades na Hotmart — formato visual que funciona sem texto, ideal para qualquer idioma. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\'água — sem cadastro.',
  },

  ctaHeading: 'Crie enigmas de peças faltantes',

  howItWorks: {
    title: 'Como Criar Puzzles de Peças Faltantes em 5 Passos',
    steps: [
      {
        title: 'Configure o layout da página',
        description:
          'Abra o painel de Configuração de Página e escolha um formato: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou qualquer dimensão personalizada. Selecione uma cor de página com o seletor de cores como fundo alternativo. Escolha um tema de fundo e ajuste a sua opacidade (0–1 em passos de 0,05), depois selecione um tema de borda com o seu próprio controlo de opacidade independente. Estas opções de design emolduram o seu puzzle de peças faltantes antes de configurar qualquer conteúdo.',
      },
      {
        title: 'Configure o puzzle',
        description:
          'Abra o painel de Configuração do Puzzle e defina o número de peças faltantes de 1 a 5 — isto controla quantas lacunas se recortam da imagem. Defina o número de opções de solução de 2 a 6, que inclui as peças corretas mais peças distratoras que aumentam a dificuldade. Selecione uma forma de peça entre 6 opções: quadrado (predefinido), círculo, retângulo vertical, retângulo horizontal, elipse vertical ou elipse horizontal. Cada forma cria um desafio visual diferente.',
      },
      {
        title: 'Selecione uma imagem da biblioteca ou carregue a sua',
        description:
          'Abra o painel de Biblioteca de Imagens e explore 104 coleções temáticas com mais de 3100 ilustrações coloridas — animais, alimentos, veículos, natureza, festividades e dezenas mais. Filtre por tema usando o menu suspenso ou pesquise por palavra-chave com atraso de 300ms. Clique numa imagem para a selecionar como fonte do seu puzzle. Também pode carregar imagens personalizadas em formato PNG, JPG ou GIF usando o painel de Carregar Imagens Personalizadas para total liberdade criativa nos seus designs de puzzles.',
      },
      {
        title: 'Gere o puzzle',
        description:
          'A aplicação recorta automaticamente lacunas da imagem selecionada usando extração inteligente de peças. O algoritmo tenta até 150 colocações para encontrar peças com suficiente variância de cor (variância de luminosidade mínima de 15) e pelo menos 250 píxeis de distância entre peças para evitar sobreposição. Lacunas brancas com traço preto (2px) aparecem nas localizações originais. As opções de solução numeradas — peças corretas mais distratoras — exibem-se com etiquetas numéricas realçadas em amarelo. Os layouts verticais colocam a imagem do puzzle em cima com as opções em baixo; os layouts horizontais dividem a vista 50/50.',
      },
      {
        title: 'Gere o gabarito e baixe',
        description:
          'Mude para o aba Gabarito para ver o gabarito gerado automaticamente. A mesma imagem do puzzle aparece com as lacunas, e etiquetas numéricas realçadas em amarelo (rgba(255,255,0,0.7)) dentro de cada lacuna mostram o índice da opção correta. Baixe ambas as versões usando quatro botões dedicados: JPEG da Atividade, JPEG do Gabarito, PDF da Atividade e PDF do Gabarito — todos renderizados a 300 DPI com qualidade JPEG 1.0. Ative a escala de cinzentos para versões económicas em tinta. Cada exportação está pronta para publicação em lojas Etsy, interiores Amazon KDP e arquivos de produtos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Características Principais do Gerador de Puzzles de Peças Faltantes',
    features: [
      {
        title: 'Puzzles Estilo Quebra-Cabeças com Dificuldade Configurável',
        description:
          'Crie puzzles onde uma imagem tem lacunas recortadas e os usuários identificam que opção numerada preenche cada espaço. Configure a dificuldade com dois controlos independentes: defina 1–5 peças faltantes para controlar a complexidade do puzzle, e defina 2–6 opções de solução para controlar quantas opções avaliam os usuários. Mais peças faltantes significa mais raciocínio espacial; mais opções de solução (incluindo distratoras) significa discriminação visual mais apurada. Este sistema de dificuldade em dois eixos permite-lhe criar puzzles que vão desde identificação simples de uma peça até desafios complexos de múltiplas peças.',
      },
      {
        title: 'Seis Formas de Peça: Quadrado, Círculo, Retângulo e Variantes de Elipse',
        description:
          'Escolha entre 6 formas de peça distintas que alteram o carácter visual de cada puzzle. As formas quadrado (predefinido) e círculo oferecem cortes geométricos limpos. As formas retângulo vertical e retângulo horizontal criam lacunas alongadas com diferentes orientações — vertical usa 80% da largura e 100% da altura, horizontal usa 100% da largura e 80% da altura. As formas elipse vertical e elipse horizontal oferecem cortes curvos mais suaves com as mesmas proporções dimensionais. Cada forma interage de maneira diferente com a imagem fonte, criando desafios de identificação únicos mesmo usando a mesma ilustração.',
      },
      {
        title: 'Extração Inteligente de Peças com Deteção de Variância de Cor',
        description:
          'O algoritmo de extração de peças garante que cada puzzle seja visualmente resolúvel e atrativo. Tenta até 150 colocações para encontrar peças com um limiar mínimo de variância de luminosidade de 15 — garantindo que cada peça extraída contenha suficiente detalhe visual para ser identificável. As peças mantêm pelo menos 250 píxeis de distância entre si para evitar sobreposição. As peças distratoras geram-se com até 200 tentativas cada, assegurando que provêm de áreas não sobrepostas da imagem. Esta extração inteligente produz puzzles consistentemente de alta qualidade a partir de qualquer imagem fonte.',
      },
      {
        title: 'Gabarito Automático com Etiquetas Numéricas Realçadas em Amarelo',
        description:
          'Cada puzzle de peças faltantes gera automaticamente um gabarito complementar num aba de canvas separado. O gabarito exibe a mesma imagem do puzzle com as lacunas e coloca etiquetas numéricas realçadas em amarelo (rgba(255,255,0,0.7)) dentro de cada lacuna mostrando o índice de opção correto baseado em 1. O tamanho da fonte escala-se a 60% do tamanho da peça para legibilidade clara. Não precisa de criar respostas manualmente — o gabarito mantém-se perfeitamente sincronizado com o puzzle. Baixe o gabarito como answer_key.jpeg ou answer_key.pdf juntamente com a atividade do usuário.',
      },
      {
        title: 'Opções de Solução Numeradas com Peças Distratoras',
        description:
          'As opções de solução exibem-se em contentores numerados (1–N) com etiquetas numéricas realçadas em amarelo para identificação clara. Quando as opções de solução excedem o número de peças faltantes, as opções extra são peças distratoras — extraídas de diferentes áreas da mesma imagem que não coincidem com nenhuma lacuna. As distratoras obrigam os usuários a comparar cuidadosamente os detalhes visuais em vez de simplesmente resolver por eliminação. As atividades verticais organizam as opções numa fila horizontal abaixo do puzzle (75% do tamanho máximo); as atividades horizontais colocam-nas no lado direito (50% da largura) numa fila horizontal.',
      },
      {
        title: 'Biblioteca de Imagens com 104 Coleções Temáticas e Mais de 3100 Ilustrações',
        description:
          'Explore 104 coleções de imagens temáticas que cobrem animais, alimentos, veículos, natureza, profissões, festividades, desportos, estações e dezenas mais. Cada tema fornece ilustrações coloridas que funcionam como fontes de puzzles — as imagens com cores variadas e regiões distintas produzem os puzzles de peças faltantes mais atrativos. Filtre por tema usando o menu suspenso ou pesquise imagens específicas por palavra-chave. A Licença Comercial inclui 10 temas coloridos para começar; o Acesso Completo desbloqueia os 104 temas para máxima variedade criativa em todos os seus designs de puzzles.',
      },
      {
        title: 'Exportação PDF e JPEG Pronta para Impressão a 300 DPI com Escala de Cinzentos',
        description:
          'Baixe puzzles de peças faltantes e gabaritos como imagens JPEG de alta resolução ou documentos PDF prontos para impressão renderizados a 300 DPI (multiplicador 6×) com qualidade JPEG 1.0. Quatro botões de download dedicados exportam a atividade e o gabarito separadamente. Os formatos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) e dimensões completamente personalizadas. Ative a escala de cinzentos para versões económicas em tinta. Cada exportação está pronta para publicação em downloads digitais, cadernos impressos e atividades para a loja.',
      },
      {
        title: 'Edição Completa do Canvas com Ferramentas de Texto, Alinhamento e Camadas',
        description:
          'O canvas Fabric.js oferece controlo total sobre cada elemento da sua atividade de puzzle. Arraste, redimensione, rode e reposicione imagens, texto e conteúdo gerado livremente. Os controlos de camadas gerem a ordem de empilhamento — traga elementos para a frente ou envie-os para trás. Bloqueie elementos terminados enquanto edita outros. Adicione texto personalizado com sete opções de fontes (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamanho e cor ajustáveis, e largura de contorno de texto de 0 a 10 com granularidade de 0,5. Seis opções de alinhamento mais centramento na página mantêm os designs precisos. Ampliação de 25% a 300% em incrementos de 25% para trabalho de detalhe. Anule e refaça até 50 estados do histórico com Ctrl+Z e Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Como Vender Puzzles de Peças Faltantes Online',
    cases: [
      {
        title: 'Pacotes Temáticos de Puzzles de Peças Faltantes na Etsy',
        description:
          'Crie pacotes de puzzles temáticos a partir das 104 coleções de imagens — puzzles de animais, veículos, alimentos, natureza e dezenas mais. Cada tema fornece ilustrações coloridas que produzem desafios atrativos de peças faltantes. Agrupe 15–25 puzzles por tema com gabaritos incluídos, variando a dificuldade desde 1 peça faltante com 2 opções (fácil) até 5 peças faltantes com 6 opções (difícil). Misture formas de peça dentro de um pacote para variedade visual: peças quadradas nalguns puzzles, circulares noutros, variantes de elipse para desafios avançados. O gabarito automático elimina o maior consumo de tempo na produção de puzzles.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Livros de Puzzles Visuais na Amazon KDP',
        description:
          'Compile 50–100 puzzles de peças faltantes num caderno impresso formatado para Amazon KDP. Estruture o seu livro com dificuldade progressiva: o Capítulo 1 usa 1 peça faltante com 2 opções para principiantes, o Capítulo 2 usa 3 peças faltantes com 4 opções para nível intermédio, e o Capítulo 3 usa 5 peças faltantes com 6 opções incluindo distratoras para resolvedores avançados. Inclua gabaritos no final do livro usando a função de gabarito automático. A opção de escala de cinzentos produz páginas otimizadas para tinta, prontas para interiores a preto e branco. Os puzzles puramente visuais não requerem tradução, tornando um único livro vendível em todos os mercados.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Atividades de Puzzles para a loja na Hotmart',
        description:
          'Crie atividades prontas para usar de discriminação visual e pensamento crítico para Hotmart. Os puzzles de peças faltantes fortalecem o raciocínio espacial, a análise visual e a atenção ao detalhe — competências valorizadas nos catálogos de produtos de educação infantil e primária. Crie conjuntos alinhados com o catálogo de produtos: puzzles de habitats de animais, puzzles de cenas sazonais, puzzles de ajudantes da comunidade e puzzles de grupos de alimentos. Cada conjunto inclui atividades para usuários e gabaritos nos formatos PDF e JPEG. A dificuldade configurável permite-lhe criar versões diferenciadas do mesmo puzzle para salas com níveis mistos.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Coleções de Puzzles Sazonais e de Festividades',
        description:
          'As 104 coleções de imagens temáticas cobrem cada ocasião sazonal e festiva — Natal, Halloween, Páscoa, Dia dos Namorados, regresso às aulas, férias de verão e mais. Crie coleções de puzzles de época limitada que se alinhem com os períodos de maior procura comercial. Lance pacotes de puzzles de Halloween em setembro, coleções de Natal em outubro e pacotes do Dia dos Namorados em janeiro. Varie as formas de peça e os níveis de dificuldade dentro de cada conjunto sazonal para máximo valor. Os produtos sazonais alcançam preços mais altos durante as janelas de pico e criam razões naturais para compras recorrentes da sua base de clientes.',
        platform: 'Etsy / Amazon KDP / Hotmart (sazonal)',
      },
      {
        title: 'Alcance Global — Os Puzzles Visuais Não Precisam de Tradução',
        description:
          'Os puzzles de Peças Faltantes são puramente visuais sem conteúdo de texto na atividade — sem palavras, sem letras, sem elementos dependentes do idioma. Um puzzle criado em inglês funciona identicamente para clientes na Alemanha, França, Japão ou Brasil. Isto torna os seus produtos de puzzles instantaneamente vendíveis em todos os mercados internacionais sem criar versões em diferentes idiomas. Publique o mesmo pacote de puzzles na Etsy com títulos e descrições multilingues para captar tráfego de pesquisa global. Um produto, todos os mercados — máximo alcance sem trabalho de produção adicional.',
        platform: 'Mercados globais (todas as plataformas)',
      },
    ],
  },

  faq: [
    {
      question: 'Como funciona o mecanismo do puzzle de peças faltantes?',
      answer:
        'O gerador toma uma imagem da biblioteca (ou a sua imagem carregada) e recorta 1–5 peças, deixando lacunas brancas com contornos de traço preto nas localizações originais. Depois exibe 2–6 opções de solução numeradas abaixo ou ao lado do puzzle — as peças corretas mais peças distratoras extraídas de outras áreas da mesma imagem. Os usuários examinam as lacunas e as opções numeradas, depois identificam que opção preenche cada espaço com base na cor, padrão e detalhe visual.',
    },
    {
      question: 'Quais são as 6 formas de peça disponíveis?',
      answer:
        'Pode escolher entre quadrado (predefinido), círculo, retângulo vertical (80% largura, 100% altura), retângulo horizontal (100% largura, 80% altura), elipse vertical (80% rx, 100% ry) e elipse horizontal (100% rx, 80% ry). Cada forma cria um desafio visual diferente. Quadrado e círculo oferecem cortes geométricos limpos, enquanto as variantes de retângulo e elipse criam formas alongadas ou curvas que interagem de maneira diferente com a imagem fonte.',
    },
    {
      question: 'Como funcionam os ajustes de dificuldade?',
      answer:
        'A dificuldade controla-se com duas configurações independentes. O número de peças faltantes (1–5) determina quantas lacunas se recortam da imagem — mais peças significa mais raciocínio espacial. O número de opções de solução (2–6) determina quantas opções numeradas avaliam os usuários — quando as opções excedem as peças faltantes, as extras são distratoras que requerem comparação visual cuidadosa. Um puzzle com 1 peça faltante e 2 opções é fácil; 5 peças faltantes com 6 opções é desafiante.',
    },
    {
      question: 'O que são peças distratoras e como se geram?',
      answer:
        'As peças distratoras são opções de solução adicionais que não coincidem com nenhuma lacuna do puzzle. Extraem-se de diferentes áreas da mesma imagem fonte usando até 200 tentativas de colocação cada, assegurando que não se sobrepõem com as peças corretas. As distratoras impedem que os usuários resolvam apenas por eliminação — devem comparar cuidadosamente cores, padrões e detalhes visuais para distinguir as opções corretas de alternativas de aparência semelhante.',
    },
    {
      question: 'Como funciona o algoritmo inteligente de extração de peças?',
      answer:
        'O algoritmo utiliza até 150 tentativas para encontrar peças com suficiente detalhe visual. Cada peça candidata analisa-se por variância de luminosidade (limiar mínimo de 15) para assegurar que contenha suficiente informação de cor para ser identificável. As peças mantêm pelo menos 250 píxeis de distância entre si para evitar sobreposição. O tamanho da peça calcula-se como 12% da largura da imagem com um mínimo de 50 píxeis. Este processo automatizado garante que cada puzzle seja visualmente resolúvel independentemente da imagem fonte.',
    },
    {
      question: 'Como funciona o gabarito gerado automaticamente?',
      answer:
        'O gerador usa um sistema de canvas duplo com um aba de Atividade e um aba de Gabarito. O gabarito exibe a mesma imagem do puzzle com as lacunas mas omite as opções de solução. Em seu lugar, etiquetas numéricas realçadas em amarelo (rgba(255,255,0,0.7)) colocam-se dentro de cada lacuna mostrando o índice de opção correto baseado em 1. O tamanho da fonte escala-se a 60% do tamanho da peça para legibilidade clara. Baixe o gabarito separadamente usando os botões dedicados de JPEG do Gabarito e PDF do Gabarito.',
    },
    {
      question: 'Os puzzles de peças faltantes dependem do idioma?',
      answer:
        'Não. Peças Faltantes é um formato de puzzle puramente visual sem conteúdo de texto na atividade — sem palavras, sem letras, sem elementos dependentes do idioma. O único elemento dependente do idioma é o texto do cabeçalho gerado automaticamente (\"Peças em Falta\" / \"Encontra e coloca as peças em falta!\"), que está localizado nos 11 idiomas suportados. O puzzle em si funciona identicamente em qualquer idioma, tornando-o ideal para mercados globais.',
    },
    {
      question: 'Como funciona o sistema de dupla borda?',
      answer:
        'Cada puzzle gerado apresenta duas bordas decorativas. A borda exterior usa verde-azulado brilhante (#14B8A6) com um traço de 8px, margens de 34px e raio de borda de 12px. A borda interior usa rosa intenso (#EC4899) com um traço de 3px, margens de 46,5px, raio de borda de 8px e um ligeiro desfasamento de 2px à direita e 3px para baixo. Juntas criam uma moldura polida e profissional que aumenta a qualidade visual das suas atividades de puzzles para lojas online.',
    },
    {
      question: 'Existe um teste grátis?',
      answer:
        'Sim. Pode aceder a todas as funcionalidades — as 6 formas de peça, peças faltantes e opções de solução configuráveis, o gabarito automático, a biblioteca completa de imagens, temas de fundo e de borda, e todos os formatos de download — sem criar uma conta, inserir cartão de crédito ou instalar qualquer software. Os downloads do teste grátis incluem uma pequena marca d\'água. Uma licença comercial remove a marca d\'água e concede direitos completos de venda.',
    },
    {
      question: 'Posso adicionar temas de fundo e temas de borda aos puzzles?',
      answer:
        'Sim. O painel de Configuração de Página inclui um seletor de tema de fundo com um controlo deslizante de opacidade (0–1 em passos de 0,05) e um seletor de tema de borda com o seu próprio controlo deslizante de opacidade independente. Os temas de fundo adicionam padrões decorativos atrás do conteúdo do puzzle, enquanto os temas de borda emolduram a página. Ambos têm controlos de opacidade separados para que possa criar fundos subtis com bordas proeminentes, ou qualquer combinação que se ajuste ao seu design.',
    },
    {
      question: 'Posso vender puzzles de peças faltantes criados com esta ferramenta na Etsy e Amazon KDP?',
      answer:
        'Sim. Com uma licença comercial, tem todos os direitos para vender os seus puzzles de peças faltantes como downloads digitais na Etsy, como cadernos impressos na Amazon KDP, como recursos educativos na Hotmart ou através de qualquer outro canal de venda. As 6 formas de peça, a dificuldade configurável, os gabaritos automáticos e as 104 coleções de imagens temáticas dão-lhe as ferramentas criativas para produzir produtos de puzzles originais e vendíveis.',
    },
    {
      question: 'Qual é a política de reembolso?',
      answer:
        'Como o teste grátis lhe dá acesso a todas as funcionalidades, não oferecemos reembolsos em compras de licenças comerciais. Pode testar as 6 formas de peça, os ajustes de dificuldade configuráveis, o gabarito automático, a biblioteca completa de imagens, os temas de fundo e de borda, e todos os formatos de download antes de comprar. O teste grátis é a política de reembolso — certifique-se de que a ferramenta se adequa às suas necessidades antes de adquirir uma licença.',
    },
    {
      question: 'Qual é a diferença entre a Licença Comercial e o Acesso Completo?',
      answer:
        'A Licença Comercial inclui 10 temas de imagens coloridos com o idioma de interface apenas em inglês — ideal para começar a vender puzzles de peças faltantes rapidamente. O Acesso Completo desbloqueia os 104 temas com mais de 3100 ilustrações e os 11 idiomas de interface (inglês, alemão, francês, espanhol, português, italiano, neerlandês, sueco, dinamarquês, norueguês e finlandês) — perfeito para maximizar a variedade de produtos e o alcance em mercados internacionais.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'encontre-diferente-atividades',
      anchorText: 'Gerador de Atividades Encontra o Diferente',
    },
    {
      pageType: 'app',
      slug: 'sudoku-criancas-atividades',
      anchorText: 'Gerador de Atividades de Sudoku com Imagens',
    },
    {
      pageType: 'app',
      slug: 'labirinto-caminhos-atividades',
      anchorText: 'Gerador de Atividades de Labirintos com Imagens',
    },
    {
      pageType: 'app',
      slug: 'encontre-conte-atividades',
      anchorText: 'Gerador de Atividades Encontra e Conta',
    },
    {
      pageType: 'app',
      slug: 'combinar-sombras-atividades',
      anchorText: 'Gerador de Atividades de Combinação de Sombras',
    },
    {
      pageType: 'bundle',
      slug: 'pacote-puzzles-logica',
      anchorText: 'Pacote de Puzzles e Lógica — Todas as Apps de Puzzles',
    },
    {
      pageType: 'guide',
      slug: 'criar-puzzles-pecas-faltantes',
      anchorText: 'Como Criar e Vender Atividades de Puzzles Online',
    },
    {
      pageType: 'idea',
      slug: 'primeiro-ano-ideias-imprimiveis',
      anchorText: 'Ideias de imprimíveis para primeiro ano',
    },
    {
      pageType: 'idea',
      slug: 'segundo-ano-ideias-imprimiveis',
      anchorText: 'Ideias de imprimíveis para segundo ano',
    },
    {
      pageType: 'start',
      slug: 'livros-atividades-amazon-kdp',
      anchorText: 'Publicar livros de atividades na Amazon KDP',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/portuguese/missing%20pieces/peças-em-falta-1.webp',
      primaryAlt: 'Atividade de puzzle de peças faltantes com lacunas recortadas de uma imagem e opções de solução numeradas incluindo distratoras',
    },
    sampleGallery: [
      {
        src: '/samples/portuguese/missing%20pieces/peças-em-falta-2.webp',
        alt: 'Puzzle de peças faltantes com lacunas quadradas recortadas de uma ilustração colorida',
        caption: 'Forma de peça quadrada — cortes geométricos limpos para identificação visual clara',
      },
      {
        src: '/samples/portuguese/missing%20pieces/peças-em-falta-3.webp',
        alt: 'Puzzle de peças faltantes com lacunas circulares e opções de solução numeradas',
        caption: 'Forma de peça circular — cortes arredondados com opções distratoras para maior desafio',
      },
      {
        src: '/samples/portuguese/missing%20pieces/peças-em-falta-1-answer-key.webp',
        alt: 'Gabarito do puzzle de peças faltantes com números realçados em amarelo dentro de cada lacuna',
        caption: 'Gabarito automático — etiquetas amarelas mostram a opção correta para cada lacuna',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Como Criar Puzzles de Peças Faltantes com 6 Formas e Gabaritos Automáticos — Tutorial Passo a Passo',
  },
};

export default content;
