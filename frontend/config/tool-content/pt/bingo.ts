import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'gerador de cartelas de bingo com imagens',
    secondaryKeywords: [
      'criador de cartelas de bingo para vendedores uso comercial',
      'criar cartelas de bingo para vender na Etsy e KDP',
      'gerador de fichas de bingo imprimíveis uso comercial',
      'ferramenta de bingo com geração em lote e exportação ZIP',
    ],
    lsiKeywords: [
      'gerador de bingo em lote com exportação ZIP e JSZip',
      'criador de bingo duplo modo preenchimento imagem e palavra',
      'folha de chamada bingo com grelha dinâmica de palavras',
    ],
    titleTag: 'Gerador Cartelas de Bingo | Criar e Vender',
    metaDescription: 'Crie cartelas de bingo com grelhas de 3×3 a 5×5, lotes de 10 cartelas únicas, exportação ZIP, folhas de chamada e 104 temas. Teste grátis com marca d\'água.',
  },

  hero: {
    title: 'Gerador de Cartelas de Bingo',
    tagline: 'Gerador de cartelas de bingo com imagens com grelhas configuráveis de 3×3 a 5×5, geração em lote de 1–10 cartelas únicas por conjunto, exportação ZIP de todas as cartelas numa só descarga, duplo modo de preenchimento para células e fichas circulares de forma independente, folha de chamada dedicada com grelha dinâmica de palavras, seleção personalizada de chamada com contador em tempo real e 104 coleções temáticas de imagens para cartelas de bingo que se vendem em todo o mundo',
    description: 'Crie cartelas de bingo profissionais com imagens onde cada jogador recebe uma cartela única com diferentes imagens em diferentes posições — essencial para que o bingo funcione como jogo. Configure linhas de 3 a 5 e colunas de 3 a 5 de forma independente, criando grelhas desde 3×3 (9 células) até 5×5 (25 células) com um valor predefinido de 4×4 (16 células). Gere de 1 a 10 cartelas de bingo únicas por lote, cada uma extraindo uma seleção aleatória diferente do banco de imagens para que nenhuma cartela partilhe o mesmo design. Exporte todas as cartelas geradas como JPEGs individuais num único ficheiro bingo_cards.zip usando compressão JSZip — um clique descarrega um conjunto completo de cartelas de bingo pronto para empacotar em produtos de mercado. Escolha preenchimento de Imagem ou Palavra de forma independente para as células da cartela e as fichas circulares, criando quatro estilos distintos de cartela de bingo a partir de um só gerador. O preenchimento de Imagem mostra ilustrações temáticas; o preenchimento de Palavra mostra nomes localizados das imagens da Biblioteca de Imagens, tornando o Gerador de Cartelas de Bingo sensível ao idioma — ao mudar de idioma atualizam-se as palavras nas cartelas, fichas e folha de chamada. As fichas circulares apresentam bordas tracejadas (#666, strokeDashArray [5,5]) e são embaralhadas usando o algoritmo Fisher-Yates para que nunca reflitam a disposição da grelha da cartela, assegurando um jogo de bingo autêntico onde as fichas servem como referência de associação em vez de revelarem posições. Uma folha de chamada dedicada num separador à parte mostra uma grelha dinâmica de palavras para o chamador — as colunas são calculadas com base no comprimento da palavra mais longa (2–6 colunas) com tamanho de fonte uniforme em todas as entradas para legibilidade clara. Ative a seleção personalizada de chamada para escolher imagens específicas para o banco de chamada com um contador em tempo real que mostra o número de seleções, dando-lhe controlo preciso de alinhamento curricular sobre quais elementos aparecem no jogo. Explore 104 coleções temáticas com mais de 3100 ilustrações ou carregue as suas próprias imagens PNG, JPG ou GIF. Aplique fundos temáticos e bordas temáticas com controlos de opacidade independentes (0–1, passo 0,05). Adicione texto personalizado com 7 opções de fontes (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) e contorno de texto 0–10. Exporte ficha JPEG, folha de chamada JPEG, ficha PDF e folha de chamada PDF a 300 DPI (multiplicador 6×, qualidade JPEG 1,0), mais a exportação ZIP em lote para todas as cartelas. Escolha Carta, A4, Quadrado (1200×1200) ou tamanhos personalizados com opção de escala de cinzentos para saída económica em tinta. A área da grelha usa 60% da altura disponível do canvas (limite de 500px) para proporções ótimas de cartela. Edite tudo no canvas de Fabric.js com ferramentas de alinhamento, camadas, bloquear/desbloquear, zoom 50%–200% em incrementos de 10% e desfazer/refazer 20 estados. O teste grátis inclui todas as funcionalidades com uma marca d\'água nos downloads. Adquira uma licença para remover a marca d\'água e vender com uso comercial.',
  },

  tutorial: {
    title: 'Como Criar Cartelas de Bingo com Imagens em 8 Passos',
    steps: [
      {
        title: 'Abra o Gerador de Cartelas de Bingo',
        description: 'Clique em «Testar Grátis» para abrir o gerador de cartelas de bingo no seu navegador. A ferramenta abre instantaneamente com uma barra lateral de definições à esquerda e um canvas de separador duplo à direita — um separador para a cartela de bingo com fichas e outro para a folha de chamada. Sem criar conta, sem descarregar software, sem instalação — comece a criar cartelas de bingo imediatamente.',
      },
      {
        title: 'Configure o Tamanho da Grelha e a Quantidade de Cartelas',
        description: 'Abra o painel de Definições da Cartela de Bingo e defina as linhas (3–5) e as colunas (3–5) de forma independente para determinar o tamanho da sua grelha — o valor predefinido é 4×4 com 16 células. Uma grelha de 3×3 é ideal para partidas rápidas de bingo com menos elementos a seguir, enquanto uma grelha de 5×5 oferece a experiência clássica de bingo com 25 células. Defina a quantidade de cartelas de 1 a 10 para gerar em lote múltiplas cartelas de bingo únicas. Cada cartela extrai uma seleção aleatória diferente do banco de imagens, garantindo que cada cartela do lote seja única — essencial para o bingo onde cada jogador precisa de uma cartela diferente.',
      },
      {
        title: 'Escolha os Modos de Preenchimento para Células e Fichas',
        description: 'Selecione o preenchimento das células (Imagem ou Palavra) e o preenchimento das fichas (Imagem ou Palavra) de forma independente no painel de Definições da Cartela de Bingo. O preenchimento de Imagem mostra ilustrações temáticas nas células da grelha ou nas fichas circulares. O preenchimento de Palavra mostra nomes localizados das imagens como texto — ao mudar o idioma da aplicação atualizam-se todas as palavras nas cartelas, fichas e folha de chamada. Misture modos para variedade criativa: cartelas com imagens e fichas com palavras criam um desafio de associação visual-textual, cartelas com palavras e fichas com imagens invertem a dinâmica, e combinar ambos iguais cria uma experiência de bingo puramente visual ou puramente textual. Quatro estilos distintos de cartela de bingo a partir de um só gerador.',
      },
      {
        title: 'Selecione Imagens da Biblioteca',
        description: 'Abra o painel de Biblioteca de Imagens e explore 104 coleções temáticas com mais de 3100 ilustrações a cores — animais, alimentos, veículos, natureza, festividades, profissões e dezenas mais. Filtre por tema usando o menu suspenso ou pesquise por palavra-chave. Clique nas imagens para selecioná-las para as suas cartelas de bingo. Ative a caixa «Usar seleção personalizada» para escolher imagens específicas para o banco de chamada — um contador em tempo real mostra o número de seleções enquanto escolhe. A seleção personalizada de chamada dá-lhe controlo preciso sobre quais elementos aparecem no jogo de bingo, útil para atividades alinhadas com o currículo ou eventos temáticos.',
      },
      {
        title: 'Configure o Layout de Página e as Decorações',
        description: 'Na secção Configuração de Página, selecione o seu tamanho de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou introduza uma dimensão personalizada. Escolha uma cor de fundo de página. Selecione um fundo decorativo temático e uma borda decorativa temática da biblioteca integrada, cada um com um controlo de opacidade independente (0–1, passo 0,05). Os fundos e bordas temáticas funcionam de forma independente, permitindo-lhe combinar um fundo subtil com uma borda decorativa pronunciada ou qualquer combinação que se ajuste ao seu estilo de produto. A folha de chamada herda as bordas e o fundo da página do canvas principal.',
      },
      {
        title: 'Gere as Cartelas de Bingo',
        description: 'Clique em Gerar para criar as suas cartelas de bingo. A aplicação preenche a grelha configurada com imagens ou palavras do tema selecionado e cria fichas circulares com bordas tracejadas (#666, strokeDashArray [5,5]) abaixo da cartela. As fichas são embaralhadas usando o algoritmo Fisher-Yates para que nunca reflitam a disposição da grelha da cartela, assegurando um jogo de bingo autêntico. Se solicitou múltiplas cartelas, cada uma extrai uma seleção aleatória diferente do banco de imagens. A primeira cartela aparece no canvas imediatamente para pré-visualização. A área da grelha usa 60% da altura disponível do canvas (limite de 500px) para proporções ótimas.',
      },
      {
        title: 'Reveja a Folha de Chamada',
        description: 'Clique no separador de Folha de Chamada para ver o acompanhamento para o chamador do bingo. A folha de chamada mostra uma grelha dinâmica de palavras com todos os elementos únicos do banco de imagens — o chamador lê-os em voz alta enquanto os jogadores marcam as suas cartelas. As colunas são calculadas com base no comprimento da palavra mais longa (2–6 colunas) com tamanho de fonte uniforme em todas as entradas. A grelha é centrada na página e herda as bordas e o fundo da página do canvas principal. Isto não é um gabarito — o bingo não tem uma única resposta correta pois cada cartela é diferente. A folha de chamada é o documento de referência para a pessoa que dirige o jogo.',
      },
      {
        title: 'Descarregue Cartelas, Folha de Chamada e Lote ZIP',
        description: 'Ative a escala de cinzentos para versões económicas em tinta ideais para impressão na sala de aula e interiores de KDP. Descarregue ficheiros individuais usando os quatro botões dedicados: ficha JPEG, folha de chamada JPEG, ficha PDF e folha de chamada PDF — tudo renderizado a 300 DPI (multiplicador 6×, qualidade JPEG 1,0). Para exportação em lote, clique no botão de descarga ZIP para receber todas as cartelas de bingo geradas como JPEGs individuais num único ficheiro bingo_cards.zip. A exportação ZIP em lote é essencial para vendedores que criam conjuntos de bingo com múltiplas cartelas — gere 10 cartelas únicas e empacote-as numa única descarga. Os ficheiros estão prontos para produção em listagens da Etsy, interiores da Amazon KDP e ficheiros de produtos do TPT.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Conjuntos Temáticos de Cartelas de Bingo por Tamanho de Grelha',
      description: 'Crie pacotes de cartelas de bingo organizados por tema e tamanho de grelha usando as 104 coleções de imagens. Cada tema suporta múltiplas configurações de grelha: cartelas rápidas de 3×3 com 9 células para partidas curtas, cartelas padrão de 4×4 com 16 células para jogo equilibrado e cartelas clássicas de 5×5 com 25 células para sessões prolongadas. Gere em lote 10 cartelas únicas por tamanho de grelha e depois combine os três tamanhos num único pacote de produto com folhas de chamada incluídas. A exportação ZIP em lote empacota cada conjunto para entrega imediata. O embaralhamento Fisher-Yates das fichas assegura que cada cartela apresenta um desafio genuíno de bingo onde as fichas nunca refletem a disposição da grelha.',
    },
    {
      title: 'Produtos de Bingo de Vocabulário Multilingue',
      description: 'O Gerador de Cartelas de Bingo é sensível ao idioma — o modo de preenchimento de Palavra mostra nomes localizados das imagens da Biblioteca de Imagens, pelo que mudar de idioma atualiza as palavras nas cartelas, fichas e folha de chamada. Crie conjuntos de bingo em inglês, alemão, francês, espanhol, português, italiano, holandês, sueco, dinamarquês, norueguês e finlandês a partir das mesmas imagens sem reconstruir nada. Uma imagem de gato mostra «Gato» em português, «Katze» em alemão e «Chat» em francês. Venda produtos de bingo de vocabulário em mercados internacionais gerando cada versão de idioma em minutos. As cartelas com palavras e fichas com imagens são ferramentas de revisão de vocabulário especialmente eficazes.',
    },
    {
      title: 'Cadernos de Atividades de Bingo para KDP com Folhas de Chamada',
      description: 'Compile 40–80 cartelas de bingo em cadernos de atividades impressos para Amazon KDP. Estruture capítulos por tema: bingo de animais, bingo de alimentos, bingo de veículos, bingo de festividades. Inclua folhas de chamada após cada conjunto para que o livro seja autossuficiente para jogar — os leitores podem fotocopiar a página de chamada enquanto os jogadores usam as páginas de cartelas de bingo diretamente. Misture tamanhos de grelha dentro dos capítulos para dificuldade progressiva. Ative a escala de cinzentos para saída económica em tinta que mantém baixos os custos de impressão do KDP. A função de geração em lote produz 10 cartelas únicas por conjunto em segundos, tornando eficientes as compilações grandes de cadernos.',
    },
    {
      title: 'Kits de Jogo de Bingo Prontos para a Sala de Aula',
      description: 'Construa kits completos de jogo de bingo para uso na sala de aula com 10 cartelas únicas de jogador e uma folha de chamada por conjunto. Os professores que procuram atividades de bingo valorizam produtos que chegam prontos para jogar — imprima as cartelas, distribua e comece o jogo imediatamente. Use o modo de preenchimento de Palavra com vocabulário curricular para revisão de língua, preenchimento de Imagem para exercícios de reconhecimento visual ou modos mistos para instrução diferenciada. A função de seleção personalizada de chamada permite-lhe escolher exatamente quais elementos de vocabulário aparecem no jogo para alinhamento curricular preciso.',
    },
    {
      title: 'Coleções de Bingo Sazonais e de Festividades',
      description: 'Construa coleções sazonais rotativas usando temas de festividades e natureza da biblioteca de 104 temas. Bingo de Natal, bingo de Halloween, bingo de Páscoa, bingo de Dia dos Namorados, bingo de regresso às aulas e bingo de verão suportam pacotes de produtos dedicados. O bingo é um jogo naturalmente social que atinge o seu pico durante festividades quando famílias e salas de aula procuram atividades em grupo. Inclua múltiplos tamanhos de grelha e variantes de preenchimento tanto de imagem como de palavra em cada conjunto sazonal para máximo valor. Publique cada coleção 4–6 semanas antes da festividade para máxima visibilidade no mercado.',
    },
    {
      title: 'Conjuntos de Cartelas de Bingo para Eventos e Festas',
      description: 'Crie conjuntos de cartelas de bingo para festas, chás de bebé, despedidas de solteira, eventos de equipa e workshops educativos. Os tamanhos de grelha configuráveis e a biblioteca de imagens temáticas produzem jogos de bingo específicos para cada ocasião rapidamente — bingo de artigos de bebé para chás de bebé, bingo de alimentos para aulas de culinária, bingo de animais para visitas ao jardim zoológico. Gere em lote 10 cartelas únicas por conjunto de evento com uma folha de chamada, empacote como um ficheiro ZIP de descarga instantânea e venda na Etsy onde os organizadores de eventos procuram ativamente jogos imprimíveis para festas. A seleção personalizada de chamada permite-lhe escolher os elementos exatos para cada ocasião.',
    },
  ],

  businessIdeas: [
    {
      title: 'Loja Etsy de Cartelas de Bingo Temáticas',
      description: 'Abra uma loja na Etsy especializada em pacotes de cartelas de bingo organizados por tema usando as 104 coleções de imagens. Animais, alimentos, veículos, festividades, natureza e profissões convertem-se em listagens separadas com 10–30 cartelas únicas por conjunto e folhas de chamada incluídas. A função de geração em lote cria 10 cartelas únicas por clique e a exportação ZIP empacota-as instantaneamente para entrega digital. Misture tamanhos de grelha dentro dos pacotes: cartelas rápidas de 3×3, cartelas padrão de 4×4 e cartelas clássicas de 5×5 para variedade. Defina o preço de pacotes individuais por tema entre $3–$5 para 10–15 cartelas com folhas de chamada e pacotes premium multi-tema entre $8–$15.',
      platform: 'Etsy',
    },
    {
      title: 'Série de Cadernos de Atividades de Bingo na Amazon KDP',
      description: 'Compile 40–80 cartelas de bingo em cadernos temáticos de atividades para Amazon KDP. Estruture uma série por tema: «Bingo de Animais», «Bingo de Festividades», «Bingo de Alimentos» e «Bingo de Objetos do Quotidiano». Inclua folhas de chamada após cada conjunto de cartelas para que o livro seja autossuficiente para jogar. Misture tamanhos de grelha para dificuldade progressiva dentro de cada livro — comece com cartelas de 3×3 e avance até 5×5. Ative a escala de cinzentos para saída económica em tinta que se imprime perfeitamente a preto e branco. Os cadernos de atividades de bingo vendem-se durante todo o ano e aumentam durante as temporadas de festividades quando as famílias procuram atividades em grupo.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Pacotes de Atividades de Bingo para o TPT',
      description: 'Carregue pacotes de atividades de bingo para a sala de aula no TPT com cartelas únicas de jogador e folhas de chamada para o professor como pontos de venda principais. Os professores que procuram atividades de bingo valorizam produtos que chegam prontos para jogar — imprima, distribua e comece o jogo. Crie conjuntos alinhados com o currículo: bingo de vocabulário usando o modo de preenchimento de Palavra, bingo de reconhecimento visual usando preenchimento de Imagem e bingo de modos mistos para instrução diferenciada. Inclua 10 cartelas únicas por conjunto com uma folha de chamada. O modo de preenchimento de Palavra com nomes localizados de imagens transforma o bingo numa atividade de revisão de vocabulário que os professores podem usar em língua, vocabulário de ciências e unidades temáticas.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Funil de Tráfego com Cartelas de Bingo no Pinterest',
      description: 'As cartelas de bingo criam pins visualmente impactantes no Pinterest — a grelha colorida com imagens temáticas e fichas circulares cria um formato de jogo imediatamente reconhecível que pais e professores adoram. Publique cartelas de bingo de amostra mostrando diferentes temas: bingo de animais para quadros de pré-escolar, bingo de festividades para quadros sazonais e bingo de vocabulário para quadros educativos. Crie séries de pins separadas para «bingo imprimível com imagens», «jogos de bingo para a sala de aula» e «atividades de bingo para festividades». O bingo é um jogo universalmente reconhecido, pelo que os pins atraem audiências de todos os países e idiomas. Ligue cada pin às suas listagens de produtos na Etsy ou no TPT.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Completo de Cartelas de Bingo no Gumroad',
      description: 'Agrupe cartelas de bingo dos 104 temas, todos os tamanhos de grelha e ambos os modos de preenchimento num kit integral no Gumroad. Inclua mais de 500 cartelas de bingo únicas abrangendo grelhas de 3×3, 4×4 e 5×5 com variantes de preenchimento de imagem e de palavra, mais folhas de chamada para cada tema. A geração em lote e a exportação ZIP tornam eficiente a produção em larga escala. O sistema de duplo preenchimento produz quatro estilos distintos de cartela por tema (imagem/imagem, imagem/palavra, palavra/imagem, palavra/palavra), multiplicando a variedade de cada conjunto de imagens. O formato de kit justifica preços premium porque os compradores obtêm uma biblioteca completa de jogos de bingo em vez de pacotes individuais.',
      platform: 'Gumroad',
    },
    {
      title: 'Produtos de Bingo Multilingue para Mercados Globais',
      description: 'O Gerador de Cartelas de Bingo é sensível ao idioma — o modo de preenchimento de Palavra usa nomes localizados de imagens em 11 idiomas, facilitando a produção de cartelas de bingo em inglês, alemão, francês, espanhol, português, italiano, holandês, sueco, dinamarquês, norueguês e finlandês a partir das mesmas imagens. Crie produtos de bingo de vocabulário dirigidos a lojas Etsy internacionais, compradores multilingues do TPT e estudantes de idiomas em todo o mundo. Venda o mesmo conjunto temático de bingo em múltiplas versões de idioma sem redesenho — simplesmente mude o idioma e regenere. Os pacotes multilingues conseguem preços premium e alcançam compradores que os concorrentes monolingues não conseguem atingir.',
      platform: 'Etsy / TPT',
    },
  ],

  proTips: [
    {
      title: 'Use a Geração em Lote e a Exportação ZIP para Criação Eficiente de Produtos',
      description: 'Defina a quantidade de cartelas em 10 e gere um conjunto completo de cartelas de bingo únicas num só clique. Cada cartela extrai uma seleção aleatória diferente de imagens do banco, garantindo que nenhuma cartela partilhe o mesmo design. Depois use a exportação ZIP em lote para descarregar as 10 cartelas como JPEGs individuais num único ficheiro bingo_cards.zip. Este fluxo de trabalho produz um conjunto completo de cartelas de bingo pronto para vender em segundos em vez de gerar e guardar cartelas uma por uma. Para pacotes maiores, gere múltiplos lotes com diferentes tamanhos de grelha e temas.',
    },
    {
      title: 'Misture Modos de Preenchimento para Quatro Estilos Distintos de Produto',
      description: 'As células da cartela e as fichas têm seleção de modo de preenchimento independente — Imagem ou Palavra. Isto cria quatro estilos distintos de cartela de bingo a partir de um só gerador: cartelas com imagens e fichas com imagens (completamente visual), cartelas com imagens e fichas com palavras (associação visual-textual), cartelas com palavras e fichas com imagens (associação texto-visual) e cartelas com palavras e fichas com palavras (completamente textual). Inclua os quatro estilos em pacotes premium para máxima variedade e valor. Cada estilo serve um propósito educativo diferente — reconhecimento visual, associação de vocabulário, prática de leitura ou aprendizagem combinada.',
    },
    {
      title: 'Aproveite a Seleção Personalizada de Chamada para Alinhamento Curricular',
      description: 'Ative a caixa «Usar seleção personalizada» para escolher exatamente quais imagens aparecem no banco de chamada. O contador em tempo real mostra o número de seleções enquanto escolhe da Biblioteca de Imagens. Esta função é fundamental para criar jogos de bingo alinhados com o currículo — selecione apenas as palavras de vocabulário que a sua lição cobre, apenas os animais de um habitat específico ou apenas os alimentos de uma unidade de nutrição. A seleção personalizada de chamada transforma o bingo de um jogo aleatório numa ferramenta de ensino dirigida, que é o ponto de venda principal para produtos de sala de aula no TPT.',
    },
    {
      title: 'Explore o Preenchimento de Palavra Sensível ao Idioma para Produtos Multilingues',
      description: 'O modo de preenchimento de Palavra mostra nomes localizados de imagens da Biblioteca de Imagens — ao mudar o idioma da aplicação atualizam-se todas as palavras nas cartelas, fichas e folha de chamada. Gere um conjunto temático de bingo em português, depois mude para alemão, francês, espanhol ou qualquer um dos 11 idiomas suportados e regenere o mesmo conjunto com vocabulário localizado. Isto produz produtos de bingo multilingue a partir de imagens idênticas sem esforço de redesenho. Os pacotes de bingo de vocabulário multilingue estão subexplorados na maioria dos mercados, dando-lhe uma vantagem competitiva.',
    },
    {
      title: 'Inclua Folhas de Chamada em Cada Listagem de Produto',
      description: 'A folha de chamada dedicada com a sua grelha dinâmica de palavras é o que transforma as suas cartelas de bingo num jogo completo e jogável em vez de apenas imprimíveis bonitos. Inclua sempre folhas de chamada nos seus pacotes de produtos e mostre-as nas imagens de pré-visualização da listagem. A folha de chamada mostra todos os elementos únicos numa grelha limpa com tamanho de fonte uniforme e colunas calculadas — o chamador lê os elementos em voz alta enquanto os jogadores marcam as suas cartelas. Os produtos que incluem materiais para o chamador consistentemente superam em vendas as listagens de apenas cartelas porque os compradores querem uma experiência completa e pronta para jogar.',
    },
    {
      title: 'Use Fundos e Bordas Temáticas para Branding Coeso de Produto',
      description: 'O sistema independente de fundos e bordas temáticas com controlos de opacidade separados permite-lhe criar uma identidade visual consistente nos seus pacotes de cartelas de bingo. Configure um fundo temático subtil a 15–25% de opacidade para calor visual sem distrair do conteúdo da grelha de bingo. Sobreponha uma borda decorativa a 80–100% de opacidade para uma moldura polida. Aplique a mesma combinação de fundo e borda em cada cartela de um pacote para um aspeto de produto coeso que os compradores associam com qualidade e profissionalismo. A folha de chamada herda estas definições automaticamente.',
    },
    {
      title: 'Aponte a Múltiplos Tamanhos de Grelha para Máxima Cobertura de Mercado',
      description: 'Diferentes tamanhos de grelha servem diferentes audiências. As grelhas de 3×3 (9 células) funcionam melhor para bingo de pré-escolar e jardim de infância com partidas rápidas e menos elementos a seguir. As grelhas de 4×4 (16 células) são ideais para salas de aula do ensino primário com jogo equilibrado. As grelhas de 5×5 (25 células) proporcionam a experiência clássica de bingo para alunos mais velhos e noites de jogos em família. Inclua os três tamanhos nos seus pacotes de produtos e crie listagens separadas dirigidas a cada grupo etário. A função de geração em lote significa que mudar tamanhos de grelha e regenerar leva segundos.',
    },
  ],

  faq: [
    {
      question: 'Existe um teste grátis?',
      answer: 'Sim. A ferramenta oferece um teste grátis com todas as funcionalidades — todos os tamanhos de grelha de 3×3 a 5×5, geração em lote de até 10 cartelas únicas, exportação ZIP em lote, ambos os modos de preenchimento de imagem e palavra para células e fichas de forma independente, a folha de chamada dedicada com grelha dinâmica de palavras, seleção personalizada de chamada com contador em tempo real, as 104 coleções temáticas de imagens com mais de 3100 ilustrações, carregamento de imagens personalizadas, fundos e bordas temáticas com opacidade independente, opção de escala de cinzentos e todos os formatos de descarga. Sem registo, sem cartão de crédito. Os downloads do teste grátis incluem uma marca d\'água. Adquira uma licença comercial para remover a marca d\'água e desbloquear os direitos de venda.',
    },
    {
      question: 'Como funciona a geração em lote de cartelas de bingo?',
      answer: 'Defina a quantidade de cartelas de 1 a 10 no painel de Definições da Cartela de Bingo. Cada cartela extrai uma seleção aleatória diferente do banco de imagens, garantindo que cada cartela do lote seja única — essencial para o bingo onde cada jogador precisa de uma cartela diferente. A primeira cartela aparece no canvas imediatamente para pré-visualização. Todas as cartelas geradas estão disponíveis através da exportação ZIP em lote para descarga como ficheiros JPEG individuais num único ficheiro bingo_cards.zip. Gere um conjunto completo de 10 cartelas de bingo únicas com um só clique, prontas para empacotar em produtos de mercado.',
    },
    {
      question: 'Quais tamanhos de grelha estão disponíveis para as cartelas de bingo?',
      answer: 'As linhas e colunas configuram-se de forma independente de 3 a 5, criando grelhas desde 3×3 (9 células) até 5×5 (25 células). O valor predefinido é 4×4 com 16 células. Também pode criar grelhas não quadradas como 3×5 (15 células) ou 5×3 (15 células) para formatos únicos de cartela de bingo. As grelhas mais pequenas funcionam bem para partidas rápidas de pré-escolar com menos elementos a seguir, enquanto as grelhas de 5×5 proporcionam a experiência clássica de bingo para jogos mais longos e audiências mais velhas.',
    },
    {
      question: 'Qual é a diferença entre o preenchimento das células e o preenchimento das fichas?',
      answer: 'As células da cartela e as fichas têm um modo de preenchimento independente: Imagem ou Palavra. O preenchimento das células determina o que aparece em cada célula da grelha de bingo na cartela. O preenchimento das fichas determina o que aparece nas fichas circulares com bordas tracejadas abaixo da cartela. Pode misturar modos livremente — cartelas com imagens e fichas com palavras criam um desafio de associação visual-textual, cartelas com palavras e fichas com imagens invertem a dinâmica, e combinar ambos iguais cria uma experiência de bingo completamente visual ou completamente textual. Este sistema de duplo preenchimento produz quatro estilos distintos de cartela de bingo a partir de um só gerador.',
    },
    {
      question: 'Como funcionam as fichas circulares?',
      answer: 'As fichas circulares aparecem abaixo da grelha da cartela de bingo com bordas tracejadas (#666, strokeDashArray [5,5]). Mostram imagens ou palavras conforme a sua seleção de modo de preenchimento de fichas. As fichas são embaralhadas usando o algoritmo Fisher-Yates para que nunca reflitam a disposição da grelha da cartela — isto assegura um jogo de bingo autêntico onde as fichas servem como referência de associação em vez de revelarem respostas por posição. Os jogadores usam as fichas para identificar quais elementos estão a ser chamados durante o jogo.',
    },
    {
      question: 'O que é a folha de chamada e como funciona?',
      answer: 'A folha de chamada é uma página separada acessível através do separador de Folha de Chamada que mostra uma grelha dinâmica de palavras com todos os elementos únicos do banco de imagens. O chamador lê estas palavras em voz alta enquanto os jogadores marcam os elementos correspondentes nas suas cartelas de bingo. As colunas são calculadas com base no comprimento da palavra mais longa (2–6 colunas) com tamanho de fonte uniforme em todas as entradas para legibilidade clara. A grelha é centrada na página e herda as bordas e o fundo do canvas principal. Isto não é um gabarito — o bingo não tem uma única resposta correta pois cada cartela é diferente.',
    },
    {
      question: 'O que é a seleção personalizada de chamada?',
      answer: 'Ative a caixa «Usar seleção personalizada» no painel de Definições da Cartela de Bingo para escolher quais imagens específicas aparecem no banco de chamada. Quando ativa, clique nas imagens da Biblioteca de Imagens para adicioná-las à sua seleção personalizada de chamada — um contador em tempo real mostra o número de seleções enquanto escolhe. Isto dá-lhe controlo preciso sobre quais elementos aparecem no jogo de bingo, útil para atividades de vocabulário alinhadas com o currículo, eventos temáticos ou qualquer situação onde queira escolher os elementos exatos que os jogadores encontrarão durante o jogo.',
    },
    {
      question: 'O Gerador de Cartelas de Bingo é sensível ao idioma?',
      answer: 'Sim. Quando usa o modo de preenchimento de Palavra para células ou fichas, as palavras apresentadas são nomes localizados de imagens da Biblioteca de Imagens. Ao mudar o idioma nas Definições da Ficha atualizam-se as palavras nas cartelas, fichas e folha de chamada. Por exemplo, uma imagem de gato mostra «Gato» em português mas «Katze» em alemão e «Chat» em francês. Isto facilita a criação de produtos de bingo de vocabulário multilingue a partir das mesmas imagens. O modo de preenchimento de Imagem não é sensível ao idioma pois mostra ilustrações em vez de palavras.',
    },
    {
      question: 'Como funciona a exportação ZIP em lote?',
      answer: 'Após gerar múltiplas cartelas de bingo, clique no botão de exportação em lote para descarregar todas as cartelas como ficheiros JPEG individuais de alta resolução empacotados num único ficheiro bingo_cards.zip usando compressão JSZip. Cada cartela é nomeada sequencialmente dentro do ZIP para organização fácil. Isto elimina descarregar cartelas uma por uma — gere um conjunto completo de 10 cartelas únicas e exporte-as todas num só clique. A exportação ZIP funciona em conjunto com os botões padrão de descarga individual JPEG e PDF para a cartela atualmente mostrada e a folha de chamada.',
    },
    {
      question: 'Que tamanhos de página e formatos de exportação estão disponíveis?',
      answer: 'Os tamanhos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) e dimensões personalizadas. Exporte como JPEG de alta resolução ou PDF pronto para impressão a 300 DPI (multiplicador 6×, qualidade JPEG 1,0). Ative a escala de cinzentos para saída económica em tinta. Cinco opções de descarga: ficha JPEG, folha de chamada JPEG, ficha PDF, folha de chamada PDF e exportação ZIP em lote de todas as cartelas geradas. Todas as exportações estão prontas para produção em descargas digitais, cadernos de atividades impressos e fichas para a sala de aula.',
    },
    {
      question: 'Posso vender cartelas de bingo criadas com esta ferramenta para fins comerciais?',
      answer: 'Sim. Com uma licença comercial, tem todos os direitos para vender cartelas de bingo como descargas digitais na Etsy, cadernos de atividades impressos na Amazon KDP, recursos para a sala de aula no TPT ou através de qualquer outro canal de venda. Os tamanhos de grelha configuráveis, a geração em lote, a exportação ZIP, os modos de preenchimento duais, as folhas de chamada dedicadas, a seleção personalizada de chamada, o preenchimento de palavras multilingue e as 104 coleções temáticas de imagens dão-lhe tudo o necessário para criar produtos profissionais de bingo que competem em categorias de jogos imprimíveis em todos os principais mercados.',
    },
    {
      question: 'Qual é a política de reembolso?',
      answer: 'Teste antes de comprar com o nosso teste grátis — todas as funcionalidades estão disponíveis para que possa avaliar completamente a ferramenta antes de comprar. Como o teste grátis lhe dá acesso completo a todos os tamanhos de grelha, geração em lote de até 10 cartelas, exportação ZIP, ambos os modos de preenchimento para células e fichas, a folha de chamada, seleção personalizada de chamada, os 104 temas, carregamento de imagens personalizadas, fundos e bordas temáticas, exportação em escala de cinzentos e todos os formatos de descarga, não oferecemos reembolsos em compras de licenças. Certifique-se de que a ferramenta se adequa às suas necessidades usando o teste grátis antes de comprar.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'bingo-ilustrado-fichas', anchorText: 'Cartelas de Bingo com Imagens — Detalhes Completos do Produto' },
    { pageType: 'tool', slug: 'gerador-fichas-associacao', anchorText: 'Gerador de Fichas de Associação' },
    { pageType: 'tool', slug: 'gerador-puzzle-quadricula', anchorText: 'Gerador de Puzzle de Quadrícula' },
    { pageType: 'tool', slug: 'gerador-discriminacao-visual', anchorText: 'Gerador de Discriminação Visual' },
    { pageType: 'tool', slug: 'gerador-classificacao-imagens', anchorText: 'Gerador de Classificação de Imagens' },
    { pageType: 'tool', slug: 'gerador-caca-palavras', anchorText: 'Gerador de Caça-Palavras' },
    { pageType: 'tool', slug: 'gerador-fichas-intruso', anchorText: 'Gerador de Fichas do Intruso' },
    { pageType: 'tool', slug: 'gerador-paginas-colorir', anchorText: 'Gerador de Páginas para Colorir' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/portuguese/bingo/Bingo de Imagenes 1.webp',
      primaryAlt: 'Cartela de bingo com imagens temáticas numa grelha configurável e fichas circulares com bordas tracejadas abaixo para associação durante o jogo de bingo',
    },
    sampleGallery: [
      {
        src: '/samples/portuguese/bingo/Bingo de Imagenes 2.webp',
        alt: 'Cartela de bingo com preenchimento de imagem mostrando ilustrações temáticas a cores nas células da grelha e fichas circulares com imagens e bordas tracejadas',
        caption: 'Modo de preenchimento de imagem — ilustrações a cores nas células da cartela e fichas circulares para bingo visual',
      },
      {
        src: '/samples/portuguese/bingo/Bingo de Imagenes 3.webp',
        alt: 'Cartela de bingo com preenchimento de palavra mostrando nomes localizados de imagens nas células da grelha e fichas com palavras para bingo de vocabulário',
        caption: 'Modo de preenchimento de palavra — nomes localizados de imagens para produtos de bingo de vocabulário multilingue',
      },
      {
        src: '/samples/portuguese/bingo/Bingo de Imagenes 4.webp',
        alt: 'Folha de chamada de bingo com grelha dinâmica de palavras mostrando todos os elementos do jogo organizados em colunas para o chamador',
        caption: 'Folha de chamada — grelha dinâmica de palavras com colunas calculadas e tamanho de fonte uniforme para o chamador',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Como Criar Cartelas de Bingo com Imagens com Geração em Lote, Exportação ZIP, Duplo Modo de Preenchimento e Folhas de Chamada — Tutorial Passo a Passo',
  },
};

export default content;
