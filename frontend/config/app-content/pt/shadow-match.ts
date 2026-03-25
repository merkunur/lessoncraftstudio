import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: "gerador fichas associação sombras",
    secondaryKeywords: [
      "gerador de fichas de associação de sombras para vendedores Etsy",
      "criador de puzzles de siluetas imprimíveis para editores Amazon KDP",
      "gerador de fichas de discriminação visual com licença comercial",
      "vender fichas de associação de sombras no Gumroad",
    ],
    lsiKeywords: [
      "produtos digitais de discriminação visual para empreendedores",
      "gerador de puzzles de siluetas uso comercial",
      "atividades de perceção visual imprimíveis para negócio online",
    ],
    titleTag: "Gerador Fichas Associação Sombras | Siluetas",
    metaDescription:
      "Crie fichas de associação de sombras para Etsy, KDP e Gumroad. Modos Sombra e Complete a Imagem, siluetas auto, 104 temas em PDF. Teste grátis com marca d'água.",
  },

  hero: {
    title: "Gerador de Fichas de Associação de Sombras para Atividades de Correspondência de Siluetas e Imagens Divididas",
    tagline: "Dois modos de correspondência num só gerador — Associação de Sombras cria siluetas negras geradas automaticamente a partir de qualquer imagem, Complete a Imagem divide as imagens em metades — ambos com algoritmo de derangement Fisher-Yates que garante zero correspondências triviais, gabaritos autogerados e 104 coleções de imagens temáticas.",
    description:
      "Crie fichas profissionais de associação de sombras onde os usuários associam imagens coloridas às suas siluetas ou reconectam metades de imagens separadas. O modo Associação de Sombras coloca 4 imagens coloridas etiquetadas A, B, C, D na linha superior e 4 siluetas negras autogeradas etiquetadas 1, 2, 3, 4 na linha inferior — as siluetas são criadas através de processamento de imagens a nível de píxel que converte cada píxel com alpha > 10 em preto puro, produzindo contornos precisos que preservam o perfil de transparência exato de cada imagem. O modo Complete a Imagem divide as imagens em metades com direção de corte horizontal ou vertical, etiqueta as primeiras metades A–D e as segundas metades 1–4, e adapta o layout conforme a orientação. Ambos os modos utilizam um algoritmo de derangement Fisher-Yates para garantir que nenhum elemento aparece na sua posição original, criando verdadeiros desafios de correspondência em cada geração. Ative ou desative a visualização das etiquetas A/B/C/D e 1/2/3/4, adicione campos opcionais de nome e data para uso online, e gere gabaritos automáticos que mostram cada emparelhamento correto letra-número. O Gerador de Associação de Sombras NÃO é sensível ao idioma: o resultado é puramente visual, sem conteúdo textual localizado na ficha. O Acesso Completo desbloqueia os 104 temas com mais de 3100 ilustrações e os 11 idiomas de interface. Adicione temas de fundo e de borda com controlos de opacidade independentes, inclua texto personalizado com sete opções de fontes, e exporte PDFs e JPEGs prontos para impressão a 300 DPI nos formatos Carta, A4, Quadrado (1200×1200) ou dimensões personalizadas. Quer venda pacotes de puzzles de siluetas na Etsy, compile cadernos de perceção visual para a Amazon KDP ou crie atividades rápidas de fim de aula para o Gumroad, este gerador produz fichas prontas para produção em minutos — teste grátis com todas as funcionalidades, sem registo, sem cartão de crédito. Os downloads incluem uma marca d'água; adquira uma licença para removê-la.",
  },

  howItWorks: {
    title: "Como Criar Fichas de Associação de Sombras em 5 Passos",
    steps: [
      {
        title: 'Configure o Layout da Página',
        description:
          "Abra o painel Configuração de Página e escolha um formato: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou qualquer dimensão personalizada. Selecione uma cor de fundo com o seletor de cores. Escolha um tema de fundo e ajuste a sua opacidade (de 0 a 1 em passos de 0,05), depois selecione um tema de borda com o seu próprio controlo de opacidade independente. Estas opções de layout emolduram a sua ficha de associação de sombras antes de configurar qualquer conteúdo.",
      },
      {
        title: "Escolha o Modo de Exercício e Configure as Opções",
        description:
          "Abra o painel Configuração do Exercício e selecione o seu modo: Associação de Sombras ou Complete a Imagem. O modo Associação de Sombras gera siluetas negras a partir das suas imagens selecionadas mediante processamento a nível de píxel. O modo Complete a Imagem divide as imagens em metades — escolha a direção de corte horizontal (cima/baixo) ou vertical (esquerda/direita) com os botões de rádio que aparecem neste modo. Ative ou desative a caixa «Mostrar Etiquetas» (ativa por predefinição) para mostrar os identificadores A/B/C/D e 1/2/3/4 na ficha. Ative «Incluir Campos Nome/Data» para adicionar linhas de nome e data para os usuários.",
      },
      {
        title: "Selecione 4 Imagens da Biblioteca",
        description:
          "Abra o painel Biblioteca de Imagens e explore 104 coleções temáticas com mais de 3100 ilustrações coloridas — animais, alimentos, veículos, natureza, festividades e dezenas mais. Filtre por tema usando o menu suspenso ou pesquise por palavra-chave com atraso de 300 ms. Clique nas imagens para selecioná-las — o contador mostra o seu progresso em direção às 4 imagens necessárias. A pré-visualização das imagens selecionadas confirma as suas escolhas antes de gerar. Também pode carregar imagens personalizadas PNG, JPG ou GIF através do painel Carregar Imagens Personalizadas.",
      },
      {
        title: "Gere a Ficha de Associação de Sombras",
        description:
          "Clique em Gerar para criar a ficha de correspondência. No modo Associação de Sombras, a aplicação processa cada imagem a nível de píxel — carrega-a num canvas, extrai os dados de píxeis via getImageData e converte cada píxel com alpha > 10 em preto puro (R=0, G=0, B=0, A=255) para produzir siluetas precisas. No modo Complete a Imagem, as imagens são divididas conforme a direção de corte escolhida. Ambos os modos aplicam um derangement Fisher-Yates para garantir que nenhum elemento aparece na sua posição original. Um cabeçalho estilizado aparece com fundo âmbar (#FFC107), contentor branco em forma de cápsula e borda âmbar de 3 px mostrando «Associação de Sombras» e instruções no idioma selecionado.",
      },
      {
        title: 'Gere o Gabarito e Descarregue',
        description:
          "Mude para o separador Gabarito para ver o gabarito autogerado. No modo Associação de Sombras, cada célula mostra a imagem original junto à sua silueta com uma etiqueta como «A → 2» indicando a correspondência correta. No modo Complete a Imagem, cada célula mostra a imagem original completa com a sua etiqueta de correspondência. Descarregue ambas as versões com os quatro botões dedicados: Ficha JPEG, Gabarito JPEG, Ficha PDF e Gabarito PDF a 300 DPI. Ative a escala de cinzentos para versões económicas em tinta. Cada exportação está pronta para produção: listagens da Etsy, interiores da Amazon KDP e ficheiros de produtos Gumroad.",
      },
    ],
  },

  keyFeatures: {
    title: "Características Principais do Gerador de Fichas de Associação de Sombras",
    features: [
      {
        title: "Siluetas Autogeradas via Processamento de Imagens a Nível de Píxel",
        description:
          "O modo Associação de Sombras cria siluetas negras através de verdadeira manipulação a nível de píxel — sem filtros CSS nem recursos pré-fabricados. A aplicação carrega cada imagem num canvas, extrai os dados de píxeis via getImageData e converte cada píxel cujo valor alpha é superior a 10 em preto puro (R=0, G=0, B=0, A=255). Isto preserva o perfil de transparência exato de cada imagem, produzindo contornos de siluetas precisos que refletem detalhes finos como orelhas de animais, formas de veículos e contornos de objetos. A gestão CORS garante o processamento correto de imagens cross-origin, com um recurso de reserva a um retângulo preto sólido se o canvas estiver contaminado.",
      },
      {
        title: "Dois Modos de Exercício: Associação de Sombras e Complete a Imagem com Opções de Direção de Corte",
        description:
          "Um só gerador oferece duas atividades de correspondência visual distintas. O modo Associação de Sombras coloca 4 imagens coloridas na linha superior e 4 siluetas autogeradas na linha inferior — os usuários identificam cada imagem apenas pela forma do seu contorno. O modo Complete a Imagem divide 4 imagens em metades e apresenta as primeiras e segundas metades separadamente — os usuários reconectam as peças para completar cada imagem. No modo Complete a Imagem, escolha a direção de corte horizontal (metades cima/baixo) ou vertical (metades esquerda/direita). O layout adapta-se automaticamente: as páginas horizontais usam 2 linhas × 4 elementos, as páginas verticais usam 2 colunas × 4 elementos.",
      },
      {
        title: "Algoritmo de Derangement que Garante Zero Correspondências Triviais",
        description:
          "Ambos os modos de exercício utilizam um algoritmo de derangement Fisher-Yates que garante que nenhum elemento aparece na sua posição original. No modo Associação de Sombras, nenhuma silueta se situa diretamente abaixo da sua imagem correspondente. No modo Complete a Imagem, nenhuma segunda metade aparece adjacente à sua primeira metade correspondente. Isto elimina a possibilidade de adivinhar corretamente apenas pela posição e garante que cada ficha apresenta um verdadeiro desafio de correspondência. O derangement recalcula-se em cada geração, produzindo disposições diferentes a partir do mesmo conjunto de imagens.",
      },
      {
        title: "Gabarito Autogerado com Etiquetas de Correspondência Letra-Número",
        description:
          "Cada ficha de associação de sombras gera automaticamente um gabarito complementar num separador de canvas separado. O gabarito usa um layout de grelha onde cada célula mostra a imagem original junto à sua silueta ou imagem completa, etiquetada com a correspondência correta como «A → 2». A grelha usa 4 colunas com um espaço de 50 px antes da segunda linha e 15 px de espaçamento vertical entre elementos. Sem criação manual de gabarito — o gabarito mantém-se sincronizado com a ficha. Descarregue-o separadamente como answer_key.jpeg ou answer_key.pdf junto à ficha do usuário.",
      },
      {
        title: "Biblioteca de Imagens com 104 Coleções Temáticas e Mais de 3100 Ilustrações",
        description:
          "Explore 104 coleções de imagens temáticas que cobrem animais, alimentos, veículos, natureza, profissões, festividades, desportos, estações e dezenas mais. Cada tema fornece ilustrações coloridas que produzem siluetas distintivas com contornos reconhecíveis — formas de animais, perfis de veículos e contornos de objetos que estimulam a perceção visual. Filtre por tema usando o menu suspenso ou pesquise imagens específicas por palavra-chave. A Licença Comercial inclui 10 temas coloridos para começar; o Acesso Completo desbloqueia os 104 temas para máxima variedade criativa em ambos os modos de exercício.",
      },
      {
        title: "Etiquetas Opcionais e Campos Nome/Data para usuários",
        description:
          "Ative ou desative a caixa «Mostrar Etiquetas» (ativa por predefinição) para mostrar os identificadores A, B, C, D nas imagens ou primeiras metades e 1, 2, 3, 4 nas siluetas ou segundas metades. Quando as etiquetas estão ocultas, a ficha torna-se um desafio de correspondência puramente visual sem apoio alfanumérico — ideal para atividades avançadas ou cadernos de puzzles onde não são necessárias respostas escritas. A caixa «Incluir Campos Nome/Data» adiciona linhas de nome e data na parte inferior da página para responsabilidade e organização online.",
      },
      {
        title: "Exportação PDF e JPEG Pronta para Impressão a 300 DPI com Modo Escala de Cinzentos",
        description:
          "Descarregue fichas de associação de sombras e gabaritos como imagens JPEG de alta resolução ou documentos PDF prontos para impressão renderizados a 300 DPI (multiplicador 6×, qualidade JPEG 1.0). Quatro botões de descarga dedicados exportam os ficheiros de ficha de trabalho e gabarito separadamente. Os formatos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) e dimensões totalmente personalizadas. A orientação do PDF é detetada automaticamente. Ative a escala de cinzentos para versões económicas em tinta. Cada exportação está pronta para produção: downloads digitais, cadernos impressos e materiais de loja.",
      },
      {
        title: "Edição Completa do Canvas com Ferramentas de Texto, Alinhamento e Controlos de Camadas",
        description:
          "O canvas Fabric.js oferece controlo total sobre cada elemento da sua ficha de associação de sombras. Arraste, redimensione, rode e reposicione imagens, texto e conteúdo gerado livremente. Os controlos de camadas gerem a ordem de empilhamento — traga elementos para a frente ou envie-os para trás. Bloqueie os elementos terminados enquanto edita outros. Adicione texto personalizado com sete opções de fontes (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamanho e cor ajustáveis, e largura de contorno de texto de 0 a 10 com granularidade de 0,5. Seis opções de alinhamento mais centrar na página mantêm os layouts precisos. Amplie de 25 % a 300 % para trabalho de detalhe. Anule e refaça com histórico ilimitado usando Ctrl+Z e Ctrl+Y.",
      },
    ],
  },

  businessUseCases: {
    title: "Como Vender Fichas de Associação de Sombras Online",
    cases: [
      {
        title: "Pacotes Temáticos de Associação de Sombras na Etsy",
        description:
          "Crie pacotes temáticos de associação de sombras usando as 104 coleções de imagens — puzzles de sombras de animais, correspondência de siluetas de veículos, desafios de sombras de alimentos e dezenas mais. Cada tema fornece ilustrações com contornos distintivos que criam atividades de siluetas envolventes. Agrupe 15–20 fichas de associação de sombras por tema com gabaritos incluídos e venda entre $3 e $7 por pacote. Misture ambos os modos num único pacote: fichas de Associação de Sombras para reconhecimento de siluetas e fichas de Complete a Imagem para raciocínio espacial. As siluetas autogeradas e os gabaritos eliminam as partes mais trabalhosas da produção.",
        platform: 'Etsy (etsy.com)',
      },
      {
        title: "Cadernos de Perceção Visual na Amazon KDP",
        description:
          "Compile 50–80 fichas de associação de sombras num caderno impresso formatado para a Amazon KDP. Estruture o seu livro com capítulos alternados: os capítulos de Associação de Sombras desenvolvem o reconhecimento de siluetas enquanto os capítulos de Complete a Imagem desenvolvem a consciência espacial e o raciocínio parte-todo. Inclua as direções de corte horizontal e vertical nas secções de Complete a Imagem para variedade. Coloque os gabaritos no final do livro usando a função de gabarito autogerado. O modo escala de cinzentos produz páginas económicas em tinta prontas para interiores de livros a preto e branco. Os cadernos de puzzles de perceção visual vendem-se bem durante todo o ano na categoria de livros de atividades.",
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: "Atividades Rápidas de Fim de Aula para o Gumroad",
        description:
          "Crie atividades de associação de sombras prontas para usar com campos de nome/data e gabaritos impressos para uso online. Os vendedores que procuram exercícios de discriminação visual valorizam fichas que chegam prontas para imprimir. Crie conjuntos vinculados ao catálogo de produtos: correspondência de sombras de animais para ciências, siluetas de profissões para estudos sociais, puzzles de sombras de alimentos para nutrição. A opção de etiquetas permite-lhe criar versões guiadas (com etiquetas A/B/C/D e 1/2/3/4) e versões desafio (etiquetas ocultas) no mesmo produto para pacotes escalonados por nível.",
        platform: "Gumroad (teacherspayteachers.com)",
      },
      {
        title: "Coleções de Associação de Sombras Sazonais",
        description:
          "As 104 coleções de imagens temáticas cobrem cada ocasião sazonal e festiva — Natal, Halloween, Páscoa, Dia dos Namorados, regresso às aulas, férias de verão e mais. As atividades de siluetas têm um apelo especial durante o Halloween quando os temas de sombras e mistério são naturalmente populares. Crie coleções de associação de sombras por época alinhadas com os picos de compra. Inclua fichas de Associação de Sombras e Complete a Imagem em cada conjunto sazonal para máximo valor e variedade. Os produtos sazonais alcançam preços mais altos durante as suas janelas de máxima procura.",
        platform: "Etsy / Amazon KDP / Gumroad (sazonal)",
      },
      {
        title: "Pacotes de Puzzles Multi-Modo como Produtos Premium",
        description:
          "Combine ambos os modos de exercício em pacotes de puzzles multi-modo premium que demonstram a versatilidade do gerador. Cada pacote inclui fichas de Associação de Sombras (reconhecimento de siluetas), fichas de Complete a Imagem com cortes horizontais (reagrupamento cima/baixo) e fichas de Complete a Imagem com cortes verticais (reagrupamento esquerda/direita) — três tipos de atividades distintos a partir de um mesmo conjunto de imagens temáticas. Esta abordagem três-em-um justifica preços premium de $7–$12 por pacote. Os gabaritos para cada ficha são incluídos automaticamente, conferindo um acabamento profissional que aumenta o valor percebido.",
        platform: "Etsy / Amazon KDP (pacotes premium)",
      },
    ],
  },

  faq: [
    {
      question: "Quais são os dois modos de exercício e em que diferem?",
      answer:
        "O gerador oferece dois modos distintos. O modo Associação de Sombras coloca 4 imagens coloridas na linha superior e 4 siluetas negras autogeradas na linha inferior — os usuários associam cada imagem à sua sombra emparelhando letras (A–D) com números (1–4). O modo Complete a Imagem divide 4 imagens em metades e apresenta as primeiras metades (A–D) e as segundas metades (1–4) separadamente — os usuários associam as metades para completar cada imagem. Associação de Sombras avalia o reconhecimento de siluetas enquanto Complete a Imagem desenvolve a consciência espacial e o raciocínio parte-todo.",
    },
    {
      question: 'Como são geradas as siluetas?',
      answer:
        "As siluetas são criadas através de verdadeiro processamento de imagens a nível de píxel, não com filtros CSS nem recursos de sombras pré-fabricados. A aplicação carrega cada imagem num canvas, extrai cada píxel via getImageData e converte todos os píxeis cujo valor alpha é superior a 10 em preto puro (R=0, G=0, B=0, A=255). Isto preserva o perfil de transparência exato de cada imagem fonte, produzindo siluetas negras precisas que refletem detalhes finos como orelhas, caudas, pegas e outros contornos distintivos.",
    },
    {
      question: "Quais são as opções de direção de corte no modo Complete a Imagem?",
      answer:
        "O modo Complete a Imagem oferece duas opções de direção de corte via botões de rádio: o corte horizontal divide as imagens em metades superior e inferior, enquanto o corte vertical divide as imagens em metades esquerda e direita. A direção de corte aplica-se às 4 imagens da ficha. O layout adapta-se automaticamente conforme a orientação da página — as páginas horizontais dispõem os elementos em 2 linhas × 4 elementos, enquanto as páginas verticais usam 2 colunas × 4 elementos para um equilíbrio visual ótimo.",
    },
    {
      question: "Como funciona o algoritmo de derangement?",
      answer:
        "Ambos os modos utilizam um algoritmo de derangement Fisher-Yates que garante que nenhum elemento aparece na sua posição original. No modo Associação de Sombras, nenhuma silueta se situa diretamente abaixo da sua imagem correspondente. No modo Complete a Imagem, nenhuma segunda metade aparece adjacente à sua primeira metade correspondente. Isto garante que cada ficha apresenta um verdadeiro desafio de correspondência — os usuários não podem adivinhar corretamente apenas pela posição. O derangement recalcula-se em cada geração, produzindo disposições diferentes a partir das mesmas imagens.",
    },
    {
      question: "Posso ativar ou desativar as etiquetas A/B/C/D e 1/2/3/4?",
      answer:
        "Sim. A caixa «Mostrar Etiquetas» no painel Configuração do Exercício (ativa por predefinição) controla se as etiquetas A, B, C, D aparecem nas imagens ou primeiras metades e se as etiquetas 1, 2, 3, 4 aparecem nas siluetas ou segundas metades. Quando as etiquetas estão ativas, os usuários escrevem pares letra-número como respostas. Quando as etiquetas estão desativas, a ficha torna-se um desafio de correspondência puramente visual sem apoio alfanumérico — útil para cadernos de puzzles ou atividades avançadas.",
    },
    {
      question: "Por que há sempre exatamente 4 problemas por ficha?",
      answer:
        "A ficha usa um número fixo de 4 problemas de correspondência (SELECT_COUNT = 4). Isto não é configurável. Quatro elementos oferecem o equilíbrio ótimo para a correspondência de siluetas e imagens divididas: variedade suficiente para criar um verdadeiro desafio de correspondência com o derangement, mantendo cada imagem suficientemente grande para que os usuários estudem os detalhes finos das siluetas e das metades divididas. O formato constante de 4 elementos também funciona bem para produtos em pacote onde cada página tem uma densidade de conteúdo previsível.",
    },
    {
      question: "Como funcionam os campos de nome e data?",
      answer:
        "Ative a caixa «Incluir Campos Nome/Data» no painel Configuração do Exercício para adicionar linhas de nome e data na parte inferior da ficha. Quando ativa, os usuários podem escrever o seu nome e a data diretamente na página impressa — essencial para a responsabilidade online e a organização das avaliações. Quando desativa, a ficha utiliza toda a área da página para o conteúdo de correspondência. Esta opção funciona com ambos os modos, Associação de Sombras e Complete a Imagem.",
    },
    {
      question: "Como funciona o gabarito autogerado?",
      answer:
        "O gerador usa um sistema de canvas duplo com um separador de Ficha de Trabalho e um separador de Gabarito. No modo Associação de Sombras, o gabarito mostra uma grelha onde cada célula apresenta a imagem original junto à sua silueta com uma etiqueta como «A → 2». No modo Complete a Imagem, cada célula mostra a imagem original completa com a sua etiqueta de correspondência. A grelha usa 4 colunas com espaçamento consistente. Ambas as versões exportam-se separadamente com os quatro botões de descarga dedicados: ficha JPEG, ficha PDF, gabarito JPEG e gabarito PDF.",
    },
    {
      question: 'Existe um teste grátis?',
      answer:
        "Sim. Pode aceder a todas as funcionalidades — os dois modos de exercício, as siluetas autogeradas, as opções de direção de corte, o gabarito, a biblioteca de imagens completa, os temas de fundo e de borda, a opção de etiquetas, os campos de nome/data, as ferramentas de texto e todos os formatos de descarga — sem criar uma conta, inserir cartão de crédito ou instalar qualquer software. Os downloads do teste grátis incluem uma pequena marca d'água. Uma licença comercial remove a marca d'água e concede direitos completos de venda.",
    },
    {
      question: "O Gerador de Associação de Sombras é sensível ao idioma?",
      answer:
        "Não. A Associação de Sombras é puramente visual — o resultado da ficha contém apenas imagens, siluetas e metades divididas, sem conteúdo textual localizado. A interface da aplicação (menus, botões, texto do cabeçalho) suporta os 11 idiomas, mas a ficha gerada funciona de forma idêntica independentemente da seleção de idioma. Isto torna as fichas de associação de sombras universalmente vendáveis em todos os mercados sem tradução. A Licença Comercial inclui 10 temas coloridos; o Acesso Completo desbloqueia os 104 temas e os 11 idiomas de interface.",
    },
    {
      question: "Posso vender fichas de associação de sombras criadas com esta ferramenta na Etsy e Amazon KDP?",
      answer:
        "Sim. Com uma licença comercial, tem todos os direitos para vender as suas fichas de associação de sombras como downloads digitais na Etsy, como cadernos impressos na Amazon KDP, como recursos educativos no Gumroad ou através de qualquer outro canal de venda. Os dois modos de exercício, as siluetas autogeradas, o algoritmo de derangement, os gabaritos automáticos e as 104 coleções de imagens temáticas dão-lhe as ferramentas criativas para produzir produtos de correspondência visual originais e vendáveis.",
    },
    {
      question: "Qual é a política de reembolso?",
      answer:
        "Como o teste grátis lhe dá acesso a todas as funcionalidades, não oferecemos reembolsos em compras de licenças comerciais. Pode testar os dois modos de exercício, as siluetas autogeradas, as opções de direção de corte, o gabarito, a biblioteca de imagens completa, os temas de fundo e de borda, a opção de etiquetas, os campos de nome/data, as ferramentas de texto e todos os formatos de descarga antes de comprar. O teste grátis é a política de reembolso — certifique-se de que a ferramenta se adequa às suas necessidades antes de adquirir uma licença.",
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'ligar-fichas',
      anchorText: "Gerador de Fichas de Associação",
    },
    {
      pageType: 'app',
      slug: 'quebra-cabeca-grade-fichas',
      anchorText: "Gerador de Puzzles de Quadrícula",
    },
    {
      pageType: 'app',
      slug: 'bingo-ilustrado-fichas',
      anchorText: "Gerador de Fichas de Bingo Ilustrado",
    },
    {
      pageType: 'app',
      slug: 'classificacao-imagens-fichas',
      anchorText: "Gerador de Fichas de Classificação de Imagens",
    },
    {
      pageType: 'app',
      slug: 'desenhos-colorir-fichas',
      anchorText: "Gerador de Fichas para Colorir",
    },
    {
      pageType: 'app',
      slug: 'encontrar-objetos-fichas',
      anchorText: "Gerador de Fichas de Encontrar Objetos",
    },
    {
      pageType: 'bundle',
      slug: "pacote-associacao-classificacao",
      anchorText: "Pacote Associação e Classificação — Todas as Aplicações de Associação num Pacote",
    },
    {
      pageType: 'idea',
      slug: "pre-escolar-ideias-imprimiveis",
      anchorText: "Ideias de imprimíveis para pré-escolar",
    },
    {
      pageType: 'idea',
      slug: "jardim-infancia-ideias-imprimiveis",
      anchorText: "Ideias de imprimíveis para jardim de infância",
    },
    {
      pageType: 'start',
      slug: 'plano-negocio-imprimiveis',
      anchorText: "Plano de negócio de imprimíveis",
    },
    {
      pageType: 'guide',
      slug: "criar-fichas-discriminacao-visual",
      anchorText: "Criar fichas de discriminação visual",
    },
  ],

  visuals: {
    heroImages: {
      primary: "/samples/portuguese/shadow match/Combine as Sombras 1.webp",
      primaryAlt: "Ficha de associação de sombras com imagens coloridas na linha superior e siluetas negras autogeradas na linha inferior com cabeçalho âmbar",
    },
    sampleGallery: [
      {
        src: "/samples/portuguese/shadow match/Combine as Sombras 2.webp",
        alt: "Ficha de associação de sombras mostrando quatro imagens coloridas associadas a quatro siluetas negras com etiquetas de letras e números",
        caption: "Modo Associação de Sombras — os usuários associam imagens às suas siluetas autogeradas",
      },
      {
        src: "/samples/portuguese/shadow match/Combine as Sombras 3.webp",
        alt: "Ficha Complete a Imagem com metades de imagens divididas que os usuários reconectam associando primeiras e segundas metades",
        caption: "Modo Complete a Imagem — os usuários associam metades de imagens para completar as ilustrações",
      },
      {
        src: "/samples/portuguese/shadow match/Combine as Sombras 4.webp",
        alt: "Gabarito de associação de sombras mostrando as imagens originais com siluetas e etiquetas de correspondência letra-número corretas",
        caption: "Gabarito autogerado — as etiquetas letra-número mostram as correspondências corretas",
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: "Como Criar Fichas de Associação de Sombras com Siluetas e Imagens Divididas — Tutorial Passo a Passo",
  },
};

export default content;
