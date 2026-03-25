import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'gerador discriminação visual',
    secondaryKeywords: [
      "criador de fichas de associação de sombras para vendedores",
      "criar fichas de siluetas para vender uso comercial",
      "gerador de fichas de sombras imprimíveis para KDP e Etsy",
      "ferramenta de associação de sombras com gabarito automático",
    ],
    lsiKeywords: [
      "gerador de fichas de siluetas e imagem dividida dois modos",
      "criador de siluetas a nível de píxel com algoritmo de derangement",
      "gabarito automático gerador de fichas de sombras",
    ],
    titleTag: "Gerador Discriminação Visual | Criar e Vender",
    metaDescription: "Crie fichas de associação de sombras com siluetas a nível de píxel e modo Complete a Imagem, gabaritos automáticos e 104 temas. Teste grátis com marca d'água.",
  },

  hero: {
    title: "Gerador de Discriminação Visual",
    tagline: "Gerador de fichas de associação de sombras com dois modos: criação de siluetas a nível de píxel e Complete a Imagem com divisão horizontal e vertical, algoritmo de derangement Fisher-Yates que garante zero correspondências triviais, gabaritos autogerados com etiquetas letra-número, identificadores A/B/C/D e 1/2/3/4 ativáveis/desativáveis e 104 coleções temáticas de imagens para fichas de discriminação visual que se vendem em todo o mundo",
    description: "Crie fichas profissionais de associação de sombras com dois modos de exercício distintos num só gerador. O modo Associação de Sombras coloca 4 imagens a cores etiquetadas A, B, C, D na linha superior e 4 siluetas negras autogeradas etiquetadas 1, 2, 3, 4 na linha inferior — as siluetas são criadas mediante processamento de imagem a nível de píxel que converte cada píxel com alfa > 10 em preto puro (R=0, G=0, B=0, A=255), produzindo contornos precisos que preservam o perfil de transparência exato de cada imagem. Isto é processamento real de píxeis, não filtros CSS nem recursos de sombra pré-fabricados. O modo Complete a Imagem divide 4 imagens em metades — escolha a direção de corte horizontal (metades cima/baixo) ou a direção de corte vertical (metades esquerda/direita) — etiqueta as primeiras metades A–D e as segundas metades 1–4, e os usuários reconectam as peças para completar cada imagem. Ambos os modos usam um algoritmo de derangement Fisher-Yates que garante que nenhum elemento aparece na sua posição original, eliminando correspondências triviais e assegurando que cada ficha apresenta um verdadeiro desafio de correspondência. O derangement recalcula-se em cada geração, produzindo disposições diferentes do mesmo conjunto de imagens. Ative ou desative as etiquetas dos identificadores A/B/C/D e 1/2/3/4 — etiquetas ativas proporcionam apoio letra-número para usuários mais novos, etiquetas desativas criam um desafio de correspondência puramente visual ideal para cadernos de puzzles e atividades avançadas. Adicione campos opcionais de nome e data para responsabilidade online. O sistema de canvas duplo gera simultaneamente um separador de ficha e um separador de gabarito — o gabarito mostra cada emparelhamento correto letra-número (A → 2, B → 4, etc.) junto às imagens originais e às suas siluetas ou imagens completas, eliminando a criação manual de gabaritos. O layout adapta-se automaticamente: páginas horizontais dispõem os elementos em 2 linhas × 4 elementos, páginas verticais usam 2 colunas × 4 elementos. Um cabeçalho estilizado aparece com fundo âmbar (#FFC107), contentor branco em forma de cápsula e borda âmbar de 3 px mostrando «Associação de Sombras» e instruções no idioma selecionado. A Associação de Sombras NÃO é sensível ao idioma — a saída do puzzle é puramente visual sem conteúdo textual localizado na ficha, tornando cada ficha universalmente vendível em todos os mercados sem tradução. Explore 104 coleções temáticas com mais de 3100 ilustrações ou carregue as suas próprias imagens PNG, JPG ou GIF. Aplique fundos temáticos e bordas temáticas com controlos de opacidade independentes (0–1, passo 0,05). Adicione texto personalizado com 7 opções de fontes (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) e contorno de texto 0–10. Exporte quatro ficheiros por sessão: ficha JPEG, ficha PDF, gabarito JPEG e gabarito PDF — tudo a 300 DPI (multiplicador 6×, qualidade JPEG 1,0). Escolha Carta, A4, Quadrado (1200×1200) ou tamanhos personalizados com opção de escala de cinzentos para saída económica em tinta. Edite tudo no canvas de Fabric.js com ferramentas de alinhamento, camadas, bloquear/desbloquear, zoom 25 %–300 % e desfazer/refazer 20 estados. O teste grátis inclui todas as funcionalidades com uma marca d'água nos downloads. Adquira uma licença para remover a marca d'água e vender com uso comercial.",
  },

  tutorial: {
    title: "Como Criar Fichas de Associação de Sombras em 8 Passos",
    steps: [
      {
        title: "Abra o Gerador de Discriminação Visual",
        description: "Clique em «Testar Grátis» para abrir o gerador de fichas de associação de sombras no seu navegador. A ferramenta abre instantaneamente com uma barra lateral de definições à esquerda e um canvas de separador duplo à direita — um separador para a ficha e outro para o gabarito. Sem criar conta, sem descarregar software, sem instalação — comece a criar fichas de associação de sombras imediatamente.",
      },
      {
        title: 'Escolha o Modo de Exercício',
        description: "Abra o painel de Configuração do Exercício e selecione o seu modo. O modo Associação de Sombras gera siluetas negras a partir das suas imagens selecionadas usando processamento a nível de píxel — cada píxel com alfa > 10 é convertido em preto puro, produzindo contornos precisos que preservam detalhes finos como orelhas de animais, formas de veículos e contornos de objetos. O modo Complete a Imagem divide as imagens em metades — escolha a direção de corte horizontal (metades cima/baixo) ou a direção de corte vertical (metades esquerda/direita) usando os botões de rádio que aparecem neste modo. Cada modo cria uma atividade de correspondência fundamentalmente diferente a partir do mesmo conjunto de imagens.",
      },
      {
        title: "Configure Etiquetas e Campos de Nome/Data",
        description: "Ative ou desative a caixa «Mostrar Etiquetas» (ativa por predefinição) para exibir os identificadores A, B, C, D nas imagens ou primeiras metades e os identificadores 1, 2, 3, 4 nas siluetas ou segundas metades. Com etiquetas ativas, os usuários escrevem pares letra-número como respostas — apoio estruturado para usuários mais novos. Com etiquetas desativas, a ficha torna-se um desafio de correspondência puramente visual sem apoio alfanumérico — ideal para cadernos de puzzles ou atividades avançadas onde as respostas escritas não são necessárias. Marque «Incluir Campos Nome/Data» para adicionar linhas de nome e data do usuário ao rodapé da ficha para responsabilidade online.",
      },
      {
        title: "Selecione 4 Imagens da Biblioteca ou Carregue as Suas",
        description: "Abra o painel de Biblioteca de Imagens e explore 104 coleções temáticas com mais de 3100 ilustrações a cores — animais, alimentos, veículos, natureza, festividades, profissões e dezenas mais. Filtre por tema usando o menu suspenso ou pesquise por palavra-chave. Clique nas imagens para selecioná-las — o contador mostra o seu progresso em direção às 4 imagens necessárias. Ambos os modos usam sempre exatamente 4 imagens por ficha. A pré-visualização das imagens selecionadas confirma as suas escolhas antes de gerar. Alternativamente, use o painel de Carregar Imagens Personalizadas para enviar os seus próprios ficheiros PNG, JPG ou GIF para fichas de associação de sombras personalizadas — fotos de família, ilustrações próprias, imagens de marca ou conteúdo específico da loja.",
      },
      {
        title: "Configure o Layout de Página e as Decorações",
        description: "Na secção Configuração de Página, selecione o tamanho: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou introduza uma dimensão personalizada. Escolha uma cor de fundo de página. Selecione um fundo decorativo temático e uma borda decorativa temática da biblioteca integrada, cada um com um controlo de opacidade independente (0–1, passo 0,05). Os fundos e bordas temáticas funcionam de forma independente, permitindo-lhe combinar um fundo subtil com uma borda decorativa pronunciada ou qualquer combinação que se ajuste ao seu estilo de produto.",
      },
      {
        title: "Gere a Ficha de Associação de Sombras",
        description: "Clique em Gerar para criar a ficha de correspondência. No modo Associação de Sombras, a aplicação processa cada imagem a nível de píxel — carrega-a num canvas, extrai os dados de píxeis via getImageData e converte cada píxel com alfa > 10 em preto puro para produzir siluetas precisas. No modo Complete a Imagem, as imagens são divididas conforme a direção de corte selecionada em metades etiquetadas. Ambos os modos aplicam o derangement Fisher-Yates para garantir que nenhum elemento aparece na sua posição original — nenhuma silueta fica diretamente abaixo da sua imagem correspondente, nenhuma segunda metade fica adjacente à sua primeira metade correspondente. Um cabeçalho estilizado aparece com fundo âmbar (#FFC107), contentor branco em forma de cápsula e borda âmbar de 3 px mostrando «Associação de Sombras» e instruções. O layout adapta-se automaticamente: páginas horizontais usam 2 linhas × 4 elementos, páginas verticais usam 2 colunas × 4 elementos.",
      },
      {
        title: 'Reveja o Gabarito Autogerado',
        description: "Clique no separador Gabarito para ver a solução gerada automaticamente. No modo Associação de Sombras, cada célula mostra a imagem original junto à sua silueta com uma etiqueta como «A → 2» indicando a correspondência correta. No modo Complete a Imagem, cada célula mostra a imagem original completa com a sua etiqueta de correspondência. A grelha usa 4 colunas com espaçamento consistente. Alterne entre os separadores de Ficha e Gabarito para comparar. O gabarito é gerado simultaneamente com a ficha — sem criação manual, sem processo de design separado, sem possibilidade de respostas incorretas. Este sistema de canvas duplo é a sua maior poupança de tempo ao criar pacotes de fichas de associação de sombras.",
      },
      {
        title: "Descarregue os Quatro Ficheiros",
        description: "Ative a escala de cinzentos para versões económicas em tinta ideais para impressão online e interiores de KDP. Descarregue os quatro ficheiros a partir de uma única sessão: ficha JPEG, ficha PDF, gabarito JPEG e gabarito PDF — tudo renderizado a 300 DPI (multiplicador 6×, qualidade JPEG 1,0). Cada separador tem o seu próprio par de botões de descarga. Os ficheiros estão prontos para produção em listagens da Etsy, interiores da Amazon KDP e ficheiros de produtos do Gumroad sem necessidade de pós-processamento. Clique em Gerar novamente com as mesmas imagens para produzir uma nova ficha com diferentes disposições de derangement, ou mude de imagens e modos para criação rápida de variedade em 104 coleções temáticas.",
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: "Pacotes Temáticos de Associação de Sombras por Modo",
      description: "Crie pacotes de atividades de associação de sombras organizados por modo e tema usando as 104 coleções de imagens. Um só tema de animais produz três tipos distintos de ficha: fichas de Associação de Sombras para reconhecimento de siluetas, fichas de Complete a Imagem com cortes horizontais para recomposição cima/baixo e fichas de Complete a Imagem com cortes verticais para recomposição esquerda/direita. Agrupe 15–20 fichas de associação de sombras por pacote com gabaritos autogerados incluídos. O derangement Fisher-Yates recalcula-se em cada geração, pelo que pode criar múltiplas fichas únicas das mesmas 4 imagens simplesmente regenerando — diferentes disposições de derangement produzem diferentes desafios de correspondência sem necessitar de imagens fonte diferentes.",
    },
    {
      title: "Cadernos de Perceção Visual para KDP",
      description: "Compile 50–80 fichas de associação de sombras em cadernos impressos para Amazon KDP. Estruture capítulos por tipo de atividade: o Capítulo 1 usa o modo Associação de Sombras para reconhecimento de siluetas, o Capítulo 2 usa Complete a Imagem com cortes horizontais para raciocínio espacial cima/baixo e o Capítulo 3 usa Complete a Imagem com cortes verticais para raciocínio espacial esquerda/direita. Inclua páginas de gabarito no final de cada capítulo mostrando os emparelhamentos corretos letra-número junto às imagens originais. Ative a escala de cinzentos para saída económica em tinta que se imprime perfeitamente a preto e branco. O formato puramente visual não requer tradução, pelo que um único interior serve para todos os mercados internacionais do KDP.",
    },
    {
      title: "Atividades Rápidas de Puzzles de Sombras para a loja",
      description: "Crie fichas de associação de sombras prontas para a loja para trabalho matinal, usuários que terminam mais cedo e centros de enriquecimento com campos de nome/data e gabaritos impressos. Construa conjuntos alinhados com o catálogo de produtos: puzzles de sombras de animais para unidades de ciências, siluetas de veículos para temas de transporte, associação de sombras de alimentos para lições de nutrição. A opção de etiquetas permite-lhe criar versões com apoio (com etiquetas A/B/C/D e 1/2/3/4) para instrução guiada e versões de desafio (etiquetas ocultas) para trabalho independente — ambas as versões das mesmas imagens na mesma sessão de geração. Cada ficha é exportada com o seu gabarito autogerado, eliminando o tempo de preparação do vendedor.",
    },
    {
      title: "Produtos de Associação de Sombras com Fotos Personalizadas",
      description: "Use a função de Carregar Imagens Personalizadas para criar fichas de associação de sombras a partir de qualquer foto ou ilustração. Os puzzles de siluetas com fotos de família são presentes personalizados únicos — os usuários associam membros da família às suas siluetas negras. Puzzles de sombras com fotos de animais de estimação, siluetas de equipas desportivas e atividades de sombras com fotos da turma tornam-se produtos irrepetíveis. A geração de siluetas a nível de píxel funciona com qualquer imagem carregada, convertendo o canal alfa em contornos negros precisos. O modo Complete a Imagem com fotos personalizadas acrescenta variedade de imagem dividida aos produtos de puzzles personalizados.",
    },
    {
      title: "Coleções Sazonais de Associação de Sombras",
      description: "Construa coleções sazonais rotativas usando temas de festividades e natureza da biblioteca de 104 temas. As fichas de associação de sombras de Halloween são naturalmente populares — as atividades de siluetas complementam perfeitamente os temas de sombras e mistério da temporada. Natal, Páscoa, Dia dos Namorados, regresso às aulas e verão suportam pacotes dedicados de puzzles de sombras. Inclua fichas tanto de Associação de Sombras como de Complete a Imagem em cada conjunto sazonal para máxima variedade. Publique cada coleção 4–6 semanas antes da festividade para máxima visibilidade no mercado. O algoritmo de derangement assegura que não existem duas fichas idênticas mesmo dentro do mesmo tema sazonal.",
    },
    {
      title: "Pacotes de Aprendizagem Visual Multi-Formato",
      description: "Combine fichas de associação de sombras com puzzles de quadrícula, fichas de associação, atividades de peças faltantes e fichas de classificação de imagens usando temas coordenados em múltiplos geradores. A Associação de Sombras desenvolve reconhecimento de siluetas e discriminação visual. O modo Complete a Imagem desenvolve raciocínio espacial e perceção parte-todo. O Puzzle de Quadrícula desafia a colocação espacial de peças. As fichas de associação exercitam competências de correspondência traçar-uma-linha. Cada formato exercita uma competência cognitiva diferente mantendo a consistência temática. Os pacotes multi-formato vendem-se a preços premium e proporcionam aos usuários prática variada de perceção visual através de um tema unificado.",
    },
  ],

  businessIdeas: [
    {
      title: "Loja Etsy de Puzzles de Sombras Temáticos",
      description: "Abra uma loja na Etsy especializada em pacotes de puzzles de associação de sombras organizados por tema usando as 104 coleções de imagens. Animais, veículos, natureza, alimentos, festividades e profissões convertem-se em listagens separadas com fichas de Associação de Sombras (siluetas) e fichas de Complete a Imagem (metades divididas). Cada puzzle inclui o gabarito autogerado com etiquetas letra-número — um ponto de venda crítico que diferencia as suas listagens de concorrentes que vendem puzzles sem soluções. A geração de siluetas a nível de píxel produz sombras de qualidade profissional que preservam detalhes finos das imagens. Defina o preço de pacotes individuais por tema entre $3–$5 para 15–20 fichas com gabaritos e pacotes premium de modo misto entre $7–$12.",
      platform: 'Etsy',
    },
    {
      title: "Série de Cadernos de Perceção Visual na Amazon KDP",
      description: "Compile 50–80 fichas de associação de sombras em cadernos temáticos para Amazon KDP. Estruture uma série por tipo de atividade: «Puzzles de Associação de Sombras» para reconhecimento de siluetas, «Puzzles Complete a Imagem» para recomposição de imagem dividida e «Associação Visual Completa» combinando ambos os modos. Inclua páginas de gabarito no final com as etiquetas corretas de correspondência letra-número. Ative a escala de cinzentos para saída económica em tinta que se imprime perfeitamente a preto e branco. O formato puramente visual publica-se identicamente em todos os mercados internacionais do KDP sem tradução — um único interior serve para todos os países. Os cadernos de puzzles de perceção visual vendem-se bem durante todo o ano na categoria de livros de atividades.",
      platform: 'Amazon KDP',
    },
    {
      title: "Pacotes de Atividades de Associação de Sombras para o Gumroad",
      description: "Carregue pacotes de atividades de associação de sombras no Gumroad com campos de nome/data, etiquetas ativáveis/desativáveis e gabaritos autogerados como pontos de venda principais. Os vendedores que procuram atividades de discriminação visual valorizam fichas que incluem versões com apoio e de desafio. Crie conjuntos alinhados com o catálogo de produtos: associação de sombras de animais para unidades de ciências, siluetas de profissões para estudos sociais, puzzles de sombras de alimentos para temas de nutrição. Cada pacote inclui versões com etiquetas para instrução guiada e versões sem etiquetas para trabalho independente, para que os vendedores atribuam conforme o nível do usuário. O gabarito autogerado elimina o tempo de preparação do vendedor.",
      platform: 'Gumroad',
    },
    {
      title: "Funil de Tráfego com Puzzles de Sombras no Pinterest",
      description: "As fichas de associação de sombras criam pins visualmente impactantes no Pinterest — o contraste entre imagens a cores e as suas siluetas negras cria um formato imediatamente chamativo. Publique fichas de amostra mostrando o modo Associação de Sombras com siluetas de animais distintivas e o modo Complete a Imagem com metades de imagem divididas. Crie séries de pins separadas para «puzzles de sombras de animais», «associação de siluetas de festividades» e «atividades de perceção visual». As atividades de sombras de Halloween funcionam especialmente bem no Pinterest durante a temporada de outono. O formato puramente visual atrai pais e vendedores em todos os países. Faça ligação de cada pin às suas listagens de produtos na Etsy ou no Gumroad.",
      platform: 'Pinterest',
    },
    {
      title: "Kit Completo de Associação de Sombras no Gumroad",
      description: "Agrupe fichas de associação de sombras dos 104 temas e ambos os modos de exercício num kit integral no Gumroad. Inclua mais de 300 fichas abrangendo puzzles de siluetas de Associação de Sombras, puzzles de corte horizontal de Complete a Imagem e puzzles de corte vertical de Complete a Imagem — três tipos de atividade por tema. Cada ficha inclui o seu gabarito autogerado, duplicando o total de ficheiros para mais de 600. A variedade de três modos (silueta, divisão horizontal, divisão vertical) proporciona enorme diversidade a partir de cada conjunto temático de imagens. O formato de kit justifica preços premium porque os compradores obtêm uma biblioteca completa de puzzles de sombras em vez de pacotes individuais.",
      platform: 'Gumroad',
    },
    {
      title: "Linha de Produtos de Puzzles Visuais Globais",
      description: "A Associação de Sombras produz puzzles puramente visuais — imagens, siluetas e metades divididas são universais sem texto específico de idioma na saída da ficha. Os mesmos ficheiros de produto funcionam em todos os países sem tradução nem modificação. Uma sessão de criação produz um catálogo vendível globalmente. Venda ficheiros idênticos em lojas Etsy dirigidas a diferentes países, publique os mesmos interiores de KDP em todos os mercados internacionais da Amazon e liste no Gumroad para vendedores internacionais. Sem versões separadas por idioma, sem custos de tradução, sem manutenção por região. A função de carregar imagens personalizadas também permite serviços de personalização localizados sem alterar o formato básico do produto.",
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: "Escolha Imagens com Siluetas Distintivas para o Modo Associação de Sombras",
      description: "A qualidade das fichas de Associação de Sombras depende de quão reconhecível é cada silueta. Selecione imagens com contornos distintivos — animais com formas corporais únicas (girafa, elefante, polvo), veículos com perfis claros (avião, bicicleta, barco) e objetos com contornos identificáveis (guitarra, guarda-chuva, coroa). Evite imagens com formas retangulares semelhantes que produzam siluetas quase idênticas. O processamento a nível de píxel preserva detalhes finos como orelhas, caudas e pegas, pelo que imagens com características distintivas produzem os puzzles de sombras mais apelativos.",
    },
    {
      title: "Use Ambas as Direções de Corte em Complete a Imagem para Máxima Variedade",
      description: "O modo Complete a Imagem oferece direções de corte horizontal (cima/baixo) e vertical (esquerda/direita). Inclua ambas nos seus pacotes de produtos — os cortes horizontais criam desafios de correspondência diferentes dos cortes verticais porque se revelam diferentes detalhes em cada metade. Um animal dividido horizontalmente mostra cabeça e corpo em separado; o mesmo animal dividido verticalmente mostra perfis esquerdo e direito. Usar ambas as direções de corte duplica o número de fichas únicas do mesmo conjunto de imagens sem qualquer seleção de imagens adicional.",
    },
    {
      title: "Desative as Etiquetas para Produtos Premium de Cadernos de Puzzles",
      description: "Quando a opção Mostrar Etiquetas está desativa, a ficha torna-se um desafio de correspondência puramente visual sem identificadores A/B/C/D e 1/2/3/4. Isto cria uma página de puzzle mais limpa e de aspeto mais profissional, ideal para cadernos de puzzles impressos e downloads digitais premium. Sem etiquetas, os usuários devem confiar inteiramente na correspondência visual — identificando siluetas apenas pela forma ou reconectando metades divididas por continuidade visual. As fichas sem etiquetas são percebidas como de maior valor em produtos de cadernos de puzzles porque parecem mais polidas e apresentam um verdadeiro desafio.",
    },
    {
      title: "Aproveite o Algoritmo de Derangement para Criação Rápida de Pacotes",
      description: "O derangement Fisher-Yates recalcula-se em cada geração, produzindo disposições diferentes das mesmas 4 imagens. Isto significa que clicar em Gerar repetidamente com configurações idênticas cria múltiplas fichas únicas onde as siluetas ou metades aparecem em posições diferentes. Use isto para preencher rapidamente pacotes grandes sem necessitar de imagens fonte diferentes para cada página. Gere 5–10 fichas únicas por conjunto de imagens, depois multiplique por 104 temas para catálogos de produtos massivos com esforço mínimo.",
    },
    {
      title: "Explore o Formato Puramente Visual para Vendas Globais",
      description: "As fichas de Associação de Sombras contêm apenas imagens, siluetas e metades divididas — sem texto específico de idioma na saída da ficha. Cada puzzle que cria é instantaneamente vendível a nível mundial sem tradução nem localização. Um conjunto de puzzles de sombras serve para todas as lojas Etsy internacionais, todos os mercados do KDP e todos os compradores do Gumroad independentemente do idioma. Enquanto os concorrentes criam versões separadas por idioma de fichas com muito texto, os seus puzzles de sombras funcionam em toda a parte a partir de um único conjunto de ficheiros.",
    },
    {
      title: "Aproveite a Temporada de Halloween para Produtos Temáticos de Sombras",
      description: "As atividades de sombras e siluetas têm um apelo sazonal especial durante o Halloween quando o mistério, as sombras e os contornos escuros são tematicamente relevantes. Crie coleções dedicadas de associação de sombras de Halloween usando imagens de temas assustadores da biblioteca e publique-as 4–6 semanas antes do 31 de outubro para máxima visibilidade no mercado. O modo Associação de Sombras com as suas siluetas negras complementa naturalmente a estética de Halloween. Esta vantagem de sazonalidade é única para produtos temáticos de sombras e gera taxas de conversão mais elevadas durante a janela de compras de outono.",
    },
    {
      title: "Use Fundos e Bordas Temáticas para Branding Coeso de Produto",
      description: "O sistema independente de fundos e bordas temáticas com controlos de opacidade separados permite-lhe criar uma identidade visual consistente nos seus pacotes de fichas de associação de sombras. Configure um fundo temático subtil a 15–25 % de opacidade para calor visual sem distrair do conteúdo de associação de sombras. Sobreponha uma borda decorativa a 80–100 % de opacidade para uma moldura polida. Aplique a mesma combinação de fundo e borda em cada ficha de um pacote para um aspeto de produto coeso que os compradores associam com qualidade e profissionalismo.",
    },
  ],

  faq: [
    {
      question: 'Existe um teste grátis?',
      answer: "Sim. A ferramenta oferece um teste grátis com todas as funcionalidades — ambos os modos de exercício (Associação de Sombras e Complete a Imagem), geração de siluetas a nível de píxel, direções de corte horizontal e vertical, o gabarito autogerado com etiquetas letra-número, identificadores A/B/C/D e 1/2/3/4 ativáveis/desativáveis, as 104 coleções temáticas de imagens com mais de 3100 ilustrações, carregamento de imagens personalizadas, fundos e bordas temáticas com opacidade independente, campos de nome/data, opção de escala de cinzentos e todos os formatos de descarga. Sem registo, sem cartão de crédito. Os downloads do teste grátis incluem uma marca d'água. Adquira uma licença comercial para remover a marca d'água e desbloquear os direitos de venda.",
    },
    {
      question: "Quais são os dois modos de exercício?",
      answer: "O gerador oferece dois modos distintos numa só ferramenta. O modo Associação de Sombras coloca 4 imagens a cores etiquetadas A–D na linha superior e 4 siluetas negras autogeradas etiquetadas 1–4 na linha inferior — os usuários associam cada imagem à sua sombra emparelhando letras com números. As siluetas são criadas mediante processamento a nível de píxel (alfa > 10 → preto puro), não filtros CSS. O modo Complete a Imagem divide 4 imagens em metades — primeiras metades etiquetadas A–D, segundas metades etiquetadas 1–4 — e os usuários reconectam as peças para completar cada imagem. Escolha a direção de corte horizontal (cima/baixo) ou vertical (esquerda/direita) no modo Complete a Imagem.",
    },
    {
      question: "Como funciona a geração de siluetas a nível de píxel?",
      answer: "No modo Associação de Sombras, a aplicação carrega cada imagem selecionada num canvas, extrai cada píxel usando getImageData e converte todos os píxeis com um valor alfa superior a 10 em preto puro (R=0, G=0, B=0, A=255). Isto preserva o perfil de transparência exato de cada imagem fonte, produzindo siluetas negras precisas que refletem detalhes finos como orelhas, caudas, pegas e contornos distintivos. Isto é processamento real de píxeis — não filtros CSS, não recursos de sombra pré-fabricados, não sobreposições de imagem. A gestão CORS assegura que as imagens da biblioteca cross-origin são processadas corretamente.",
    },
    {
      question: "Como funciona o algoritmo de derangement Fisher-Yates?",
      answer: "Ambos os modos de exercício usam um algoritmo de derangement baseado na aleatorização Fisher-Yates que garante que nenhum elemento aparece na sua posição original. No modo Associação de Sombras, nenhuma silueta fica diretamente abaixo da sua imagem correspondente. No modo Complete a Imagem, nenhuma segunda metade aparece adjacente à sua primeira metade correspondente. Isto elimina a possibilidade de adivinhar corretamente apenas pela posição e assegura que cada ficha apresenta um verdadeiro desafio de correspondência. O derangement recalcula-se em cada geração, produzindo disposições diferentes do mesmo conjunto de imagens.",
    },
    {
      question: "Quais são as opções de direção de corte no modo Complete a Imagem?",
      answer: "O modo Complete a Imagem oferece duas opções de direção de corte mediante botões de rádio no painel de Configuração do Exercício. Os cortes horizontais dividem as imagens em metades cima e baixo, enquanto os cortes verticais dividem as imagens em metades esquerda e direita. A direção de corte aplica-se às 4 imagens da ficha. Diferentes direções de corte produzem diferentes desafios de correspondência a partir das mesmas imagens — um animal dividido horizontalmente revela cabeça e corpo em separado, enquanto o mesmo animal dividido verticalmente mostra perfis esquerdo e direito. Inclua ambas as direções de corte nos seus pacotes de produtos para máxima variedade.",
    },
    {
      question: "Como funciona o gabarito autogerado?",
      answer: "O sistema de canvas duplo gera simultaneamente um separador de ficha e um separador de gabarito. No modo Associação de Sombras, o gabarito mostra uma grelha onde cada célula apresenta a imagem original junto à sua silueta com uma etiqueta como «A → 2» indicando a correspondência correta. No modo Complete a Imagem, cada célula mostra a imagem original completa com a sua etiqueta de correspondência. A grelha usa 4 colunas com espaçamento consistente. Descarregue cada versão de forma independente — ficha JPEG, ficha PDF, gabarito JPEG e gabarito PDF — obtendo quatro ficheiros prontos para produção a partir de uma única geração.",
    },
    {
      question: "Posso ativar e desativar as etiquetas A/B/C/D e 1/2/3/4?",
      answer: "Sim. A caixa «Mostrar Etiquetas» no painel de Configuração do Exercício (ativa por predefinição) controla se as etiquetas A, B, C, D aparecem nas imagens ou primeiras metades e as etiquetas 1, 2, 3, 4 aparecem nas siluetas ou segundas metades. Com etiquetas ativas, os usuários escrevem pares letra-número como respostas — apoio estruturado para instrução guiada. Com etiquetas desativas, a ficha torna-se um desafio de correspondência puramente visual sem apoio alfanumérico — ideal para cadernos de puzzles, atividades avançadas ou produtos onde se deseja uma apresentação visual mais limpa.",
    },
    {
      question: "Por que há sempre exatamente 4 elementos por ficha?",
      answer: "Ambos os modos de exercício usam um número fixo de 4 elementos de correspondência por ficha. Isto proporciona o equilíbrio ótimo para a associação de sombras e imagens divididas: variedade suficiente para criar um verdadeiro desafio de correspondência com o algoritmo de derangement, mantendo cada imagem suficientemente grande para que os usuários estudem os detalhes finos das siluetas e das metades divididas. O formato consistente de 4 elementos também funciona bem para produtos em pacote onde cada página tem densidade de conteúdo e equilíbrio visual previsíveis.",
    },
    {
      question: "O gerador é sensível ao idioma?",
      answer: "Não. A Associação de Sombras é puramente visual — a saída da ficha contém apenas imagens, siluetas e metades divididas sem conteúdo textual localizado na ficha. A interface da aplicação (menus, botões, texto do cabeçalho) suporta os 11 idiomas, mas a ficha gerada funciona de forma idêntica independentemente da seleção de idioma. Isto torna as fichas de associação de sombras universalmente vendáveis em todos os mercados sem tradução. Um conjunto de puzzles de sombras serve para todas as lojas Etsy internacionais, mercados do KDP e compradores do Gumroad.",
    },
    {
      question: "Que tamanhos de página e formatos de exportação estão disponíveis?",
      answer: "Os tamanhos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) e dimensões personalizadas. Exporte como JPEG de alta resolução ou PDF pronto para impressão a 300 DPI (multiplicador 6×, qualidade JPEG 1,0). Ative a escala de cinzentos para saída económica em tinta. Cada geração produz quatro ficheiros de descarga: ficha JPEG, ficha PDF, gabarito JPEG e gabarito PDF. Todas as exportações estão prontas para produção em downloads digitais, cadernos impressos e materiais de loja.",
    },
    {
      question: "Posso vender fichas de associação de sombras criadas com esta ferramenta para fins comerciais?",
      answer: "Sim. Com uma licença comercial, tem todos os direitos para vender fichas de associação de sombras como downloads digitais na Etsy, cadernos impressos de perceção visual na Amazon KDP, recursos para a loja no Gumroad ou através de qualquer outro canal de venda. Os dois modos de exercício, a geração de siluetas a nível de píxel, o derangement Fisher-Yates, os gabaritos autogerados, as etiquetas ativáveis/desativáveis, o carregamento de imagens personalizadas e as 104 coleções temáticas de imagens dão-lhe tudo o necessário para criar produtos profissionais que competem em categorias de associação visual em todos os principais mercados.",
    },
    {
      question: "Qual é a política de reembolso?",
      answer: "Teste antes de comprar com o nosso teste grátis — todas as funcionalidades estão disponíveis para que possa avaliar completamente a ferramenta antes da compra. Como o teste grátis lhe dá acesso completo a ambos os modos de exercício, geração de siluetas a nível de píxel, opções de direção de corte, o gabarito autogerado, os 104 temas, o carregamento de imagens personalizadas, fundos e bordas temáticas, opção de etiquetas, campos de nome/data, exportação em escala de cinzentos e todos os formatos de descarga, não oferecemos reembolsos em compras de licenças. Certifique-se de que a ferramenta se adequa às suas necessidades usando o teste grátis antes de comprar.",
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'combinar-sombras-fichas', anchorText: "Fichas de Associação de Sombras — Detalhes Completos do Produto" },
    { pageType: 'tool', slug: 'gerador-fichas-associacao', anchorText: "Gerador de Fichas de Associação" },
    { pageType: 'tool', slug: 'gerador-puzzle-quadricula', anchorText: "Gerador de Puzzle de Quadrícula" },
    { pageType: 'tool', slug: 'gerador-cartelas-bingo', anchorText: 'Gerador de Cartelas de Bingo' },
    { pageType: 'tool', slug: 'gerador-pecas-faltantes', anchorText: 'Gerador de Peças Faltantes' },
    { pageType: 'tool', slug: 'gerador-fichas-intruso', anchorText: 'Gerador de Fichas do Intruso' },
    { pageType: 'tool', slug: 'gerador-classificacao-imagens', anchorText: "Gerador de Classificação de Imagens" },
    { pageType: 'tool', slug: 'gerador-paginas-colorir', anchorText: "Gerador de Páginas para Colorir" },
  ],

  visuals: {
    heroImages: {
      primary: "/samples/portuguese/shadow match/Combine as Sombras 1.webp",
      primaryAlt: "Ficha de associação de sombras com imagens a cores na linha superior e siluetas negras autogeradas na linha inferior com cabeçalho âmbar e etiquetas letra-número para atividade de correspondência",
    },
    sampleGallery: [
      {
        src: "/samples/portuguese/shadow match/Combine as Sombras 2.webp",
        alt: "Ficha de associação de sombras com quatro imagens a cores associadas a quatro siluetas negras geradas a nível de píxel com etiquetas A B C D e 1 2 3 4",
        caption: "Modo Associação de Sombras — os usuários associam imagens às suas siluetas autogeradas a nível de píxel",
      },
      {
        src: "/samples/portuguese/shadow match/Combine as Sombras 3.webp",
        alt: "Ficha Complete a Imagem com metades de imagens divididas que os usuários reconectam associando primeiras e segundas metades etiquetadas A a D e 1 a 4",
        caption: "Modo Complete a Imagem — os usuários associam metades de imagens divididas para completar as ilustrações com cortes horizontais ou verticais",
      },
      {
        src: "/samples/portuguese/shadow match/Combine as Sombras 4.webp",
        alt: "Gabarito de associação de sombras mostrando imagens originais junto a siluetas com etiquetas de correspondência correta letra-número como A a 2",
        caption: "Gabarito autogerado — etiquetas letra-número mostram as correspondências corretas para ambos os modos de exercício",
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: "Como Criar Fichas de Associação de Sombras com Siluetas a Nível de Píxel, Metades de Imagens Divididas e Gabaritos Automáticos — Tutorial Passo a Passo",
  },
};

export default content;
