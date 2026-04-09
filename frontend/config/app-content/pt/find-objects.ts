import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'encontre os objetos para imprimir',
    secondaryKeywords: [
      'jogo de encontrar objetos',
      'objetos escondidos para imprimir',
      'jogo de observação atividade',
      'encontre e circule',
    ],
    lsiKeywords: [
      'observação',
      'concentração',
      'atenção visual',
      'encontrar',
      'procurar',
    ],
    titleTag: 'Encontre os objetos para imprimir | Gerador de observação',
    metaDescription: 'Crie atividades de "encontre os objetos" com imagens temáticas. Gabarito automático, PDF 300 DPI. Teste grátis — venda no Etsy e KDP.',
  },

  hero: {
    title: 'Crie atividades de ache e encontre para vender na Hotmart e Etsy',
    tagline: 'Dois modos de atividade num só gerador — cenas Eu Vejo com posicionamento sem sobreposição e imagens dispersas e atividades Encontra o Diferente com imagens emparelhadas — com gabaritos autogerados, tamanho de imagem adaptativo, campos de nome e data, e legenda que mostra os objetos a encontrar.',
    description:
      'Crie atividades de ache e encontre com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz cenas visuais repletas de imagens temáticas onde as crianças procuram objetos específicos — desenvolvendo atenção visual, concentração e vocabulário. Com mais de 3.000 ilustrações em 104 temas, você cria cenas únicas para cada produto. Atividades de objetos escondidos são extremamente populares: funcionam para todas as idades e não dependem de idioma, ampliando seu mercado globalmente. Perfeito para livros de passatempos no Amazon KDP e kits de atividades na Hotmart. Exporte PDFs a 300 DPI com licença comercial inclusa. Teste grátis com marca d\'água — sem cadastro.',
  },

  howItWorks: {
    title: 'Como Criar Atividades de Objetos Ocultos em 5 Passos',
    steps: [
      {
        title: 'Configure o Layout de Página',
        description:
          'Abra o painel Página e Cena e escolha um tamanho de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal ou qualquer dimensão personalizada. Selecione uma cor de fundo com o seletor de cor, escolha um tema de fundo e ajuste a opacidade, e depois selecione um tema de moldura com o seu próprio controlo de opacidade independente. Estas opções de layout enquadram a sua atividade de objetos ocultos antes de configurar qualquer conteúdo.',
      },
      {
        title: 'Escolha o Modo de Atividade',
        description:
          'Selecione entre dois modos no painel de Seleção de Objetos. O modo Eu Vejo (predefinido) cria cenas de objetos ocultos em forma livre onde os objetos se dispersam pela página usando um algoritmo de posicionamento sem sobreposição — sem grelha, apenas uma cena visual de aspecto natural. O modo Encontra o Diferente organiza imagens emparelhadas em linhas com elementos sem par misturados para atividades de discriminação visual. Cada modo produz um tipo diferente de atividade de busca e encontra a partir da mesma biblioteca de imagens.',
      },
      {
        title: 'Selecione Imagens e Configure a Quantidade de Objetos',
        description:
          'Explore 104 coleções temáticas de imagens com mais de 3100 ilustrações coloridas no painel Biblioteca de Imagens. Filtre por tema ou pesquise por palavra-chave. No modo Eu Vejo, configure de 1 a 5 objetos ocultos a encontrar e de 8 a 12 objetos distratores que preenchem a cena. No modo Encontra o Diferente, estabeleça de 8 a 12 imagens emparelhadas e de 1 a 5 elementos sem par. Também pode carregar imagens personalizadas em formato PNG, JPG ou GIF para usar junto ao conteúdo da biblioteca.',
      },
      {
        title: 'Gere a Cena de Objetos Ocultos',
        description:
          'Clique em Gerar para criar a atividade. No modo Eu Vejo, o algoritmo sem sobreposição coloca cada imagem testando 50 posições aleatórias e selecionando a que tem menor sobreposição, reduzindo adaptativamente o tamanho da imagem quando o espaço é limitado. Uma legenda aparece na parte inferior mostrando aos usuários que objetos devem encontrar. No modo Encontra o Diferente, as imagens organizam-se em linhas com elementos emparelhados e sem par. O cabeçalho autoajustável mostra o seu título na fonte Fredoka com contentores decorativos tipo pílula — o tamanho de fonte ajusta-se automaticamente conforme a extensão do texto.',
      },
      {
        title: 'Gere o Gabarito e Baixe',
        description:
          'Mude para o aba Gabarito para ver as anotações autogeradas: círculos vermelhos desenhados à volta dos objetos ocultos (modo Eu Vejo) ou dos elementos sem par (modo Encontra o Diferente), de 3 a 5 px maiores que o objeto para maior visibilidade. Baixe ambas as versões usando quatro botões dedicados no menu suspenso: JPEG de Atividade, JPEG de Gabarito, PDF de Atividade e PDF de Gabarito a 300 DPI. Ative a escala de cinzentos para versões que poupam tinta. Cada exportação está pronta para produção em listagens da Etsy, interiores de Amazon KDP e arquivos de produtos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Características Principais do Gerador de Atividades de Objetos Ocultos',
    features: [
      {
        title: 'Dois Modos de Atividade: Eu Vejo e Encontra o Diferente',
        description:
          'Um só gerador cobre dois formatos de atividade distintos. O modo Eu Vejo cria cenas de objetos ocultos em forma livre onde de 1 a 5 objetos-alvo se ocultam entre 8 a 12 distratores numa cena visual dispersa — os usuários procuram na página e circulam o que encontram. O modo Encontra o Diferente organiza de 8 a 12 imagens emparelhadas em linhas com 1 a 5 elementos sem par misturados — os usuários identificam as imagens sem um par correspondente. As imagens no modo Encontra o Diferente são exibidas 50% maiores do que no modo Eu Vejo para uma comparação visual mais clara. Cada modo produz um desafio cognitivo diferente a partir da mesma biblioteca de imagens.',
      },
      {
        title: 'Geração de Cenas sem Sobreposição com Tamanho de Imagem Adaptativo',
        description:
          'O modo Eu Vejo usa um algoritmo de posicionamento sofisticado em vez de uma grelha fixa. A função findBestPosition() testa 50 posições aleatórias por imagem e seleciona a localização com menor sobreposição. Quando o espaço é limitado, o algoritmo reduz adaptativamente o tamanho da imagem para encaixar mais objetos sem saturar a cena. Isto cria cenas de objetos ocultos de aspecto natural onde as imagens se dispersam organicamente pela página — muito mais atrativas do que as alternativas baseadas em grelha onde os objetos se posicionam em linhas e colunas previsíveis.',
      },
      {
        title: 'Gabarito Autogerado com Anotações de Círculos',
        description:
          'Cada atividade de objetos ocultos gera automaticamente um gabarito complementar num aba de canvas separado. O gabarito reproduz exatamente o layout da atividade e desenha círculos vermelhos à volta dos objetos corretos — alvos ocultos no modo Eu Vejo e elementos sem par no modo Encontra o Diferente. Os círculos são de 3 a 5 px maiores que o objeto para maior visibilidade. Sem marcação manual, sem criação de arquivos separados — o gabarito está sempre sincronizado com a atividade. Esta abordagem de duplo canvas poupa tempo significativo de produção para vendedores que criam packs de objetos ocultos.',
      },
      {
        title: 'Legenda que Mostra os Objetos a Encontrar no Modo Eu Vejo',
        description:
          'No modo Eu Vejo, uma legenda na margem inferior de 120 px mostra os objetos-alvo que os usuários precisam de encontrar. Esta referência visual indica aos usuários exatamente o que procurar sem instruções escritas — tornando as atividades acessíveis para pré-leitores e salas de aula multilingues. A legenda é gerada automaticamente com base nos objetos ocultos selecionados. O modo Encontra o Diferente usa uma margem inferior compacta de 50 px, pois os usuários descobrem os elementos sem par através de comparação visual em vez de uma lista de referência.',
      },
      {
        title: 'Campos de Nome e Data com Controlo de Ativação',
        description:
          'Uma caixa de verificação no painel Texto e Conteúdo adiciona campos de \"Nome:\" e \"Data:\" à atividade. Estas linhas de identificação do usuário asseguram a responsabilidade para uso online e conferem às atividades um aspecto profissional para listagens em marketplaces. Ative-os para produtos prontos para loja ou desative-os para páginas de cadernos de atividades onde a informação do usuário aparece na capa. Os campos integram-se de forma limpa com o cabeçalho autogerado e a legenda.',
      },
      {
        title: 'Biblioteca de Imagens com 104 Coleções Temáticas e Mais de 3100 Ilustrações',
        description:
          'Explore 104 coleções temáticas que cobrem animais, comida, veículos, natureza, profissões, festividades, desportos, estações e dezenas mais. Cada tema fornece um conjunto coordenado de ilustrações coloridas que funcionam como objetos ocultos e distratores em cenas Eu Vejo, ou como elementos emparelhados e sem par em atividades Encontra o Diferente. Filtre por tema usando o menu suspenso ou pesquise imagens específicas por palavra-chave. O nível Comercial inclui 10 temas coloridos (~300 imagens); o Acesso Completo desbloqueia os 104 temas com mais de 3100 ilustrações.',
      },
      {
        title: 'Exportação PDF e JPEG Pronta para Impressão a 300 DPI com Escala de Cinzentos',
        description:
          'Baixe atividades de objetos ocultos e gabaritos como imagens JPEG de alta resolução ou documentos PDF prontos para impressão a 300 DPI (multiplicador 6×). Quatro botões de download no menu suspenso exportam JPEG de Atividade, JPEG de Gabarito, PDF de Atividade e PDF de Gabarito separadamente. Os tamanhos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal e dimensões totalmente personalizadas. Ative a escala de cinzentos para versões que poupam tinta. Cada exportação está pronta para produção em downloads digitais, cadernos impressos e material para loja.',
      },
      {
        title: 'Edição Completa do Canvas com Ferramentas de Texto, Temas de Fundo e Temas de Moldura',
        description:
          'O canvas Fabric.js proporciona controlo total sobre cada elemento da sua atividade de objetos ocultos. Arraste, redimensione, rode e reposicione imagens, texto e conteúdo gerado livremente. Os controlos de camada gerem a ordem de empilhamento. Adicione texto personalizado com seis opções de fonte (Fredoka, Lexend Deca, Baloo 2, Nunito, Quicksand, Arial), tamanho e cor ajustáveis, e largura de contorno de texto de 0 a 10 com granularidade de 0,5. Os temas de fundo e de moldura têm controlos de opacidade independentes. Zoom de 25% a 300% usando controlos de botão (Aproximar +25%, Afastar −25%, Repor 100%). Desfazer e refazer até 20 estados do histórico com Ctrl+Z e Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Como Vender Atividades de Objetos Ocultos Online',
    cases: [
      {
        title: 'Packs Temáticos de Atividades de Objetos Ocultos na Etsy',
        description:
          'Crie packs temáticos de atividades Eu Vejo usando as 104 coleções de imagens — objetos ocultos de animais, Eu Vejo de festividades, busca de criaturas marinhas, encontra dinossauros e dezenas mais. Cada tema fornece ilustrações suficientes para múltiplas cenas únicas de objetos ocultos com dificuldade variada. Empacote 10 a 20 atividades de objetos ocultos por tema com gabaritos incluídos, e venda a $3–$7 por pack. Aumente a dificuldade ao longo do pack adicionando mais objetos ocultos (1 → 5) e mais distratores (8 → 12) conforme as páginas avançam.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cadernos de Atividades de Objetos Ocultos na Amazon KDP',
        description:
          'Compile de 40 a 80 atividades de objetos ocultos num caderno impresso formatado para Amazon KDP. Estruture o seu livro por dificuldade progressiva: os primeiros capítulos ocultam 1–2 objetos entre 8 distratores para iniciantes, os capítulos intermédios aumentam para 3–4 objetos ocultos com 10 distratores, e os capítulos avançados usam 5 objetos ocultos entre 12 distratores. Inclua gabaritos no final do livro. A escala de cinzentos produz páginas que poupam tinta, prontas para interiores a preto e branco. O design puramente visual significa que um único caderno funciona para qualquer mercado linguístico.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Atividades de Discriminação Visual Encontra o Diferente para Hotmart',
        description:
          'Crie atividades prontas para usar de Encontra o Diferente onde os usuários identificam elementos sem par entre conjuntos emparelhados. Os vendedores que procuram atividades de discriminação visual na Hotmart valorizam atividades que desenvolvem competências de observação e raciocínio lógico. Crie conjuntos alinhados com o catálogo de produtos: encontra o diferente de animais da quinta, reconhecimento de formas, classificação sazonal e classificação por habitats. Inclua campos de nome e data para responsabilidade do usuário, e forneça gabaritos que mostram que elementos não tinham par. Cada conjunto exporta-se em formato PDF e JPEG.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Coleções Sazonais de Atividades de Objetos Ocultos',
        description:
          'As 104 coleções temáticas cobrem cada ocasião sazonal e festiva — Natal, Halloween, Páscoa, Dia dos Namorados, regresso às aulas, férias de verão e mais. Crie coleções de atividades de objetos ocultos por época que se alinhem com os períodos de maior procura. Publique packs de Eu Vejo de Halloween em setembro, coleções de objetos ocultos de Natal em outubro, e packs de busca e encontra de Dia dos Namorados em janeiro. Inclua atividades tanto de Eu Vejo como de Encontra o Diferente em cada conjunto sazonal para máximo valor.',
        platform: 'Etsy / Amazon KDP / Hotmart (sazonal)',
      },
      {
        title: 'Packs Mistos de Eu Vejo e Encontra o Diferente',
        description:
          'Combine ambos os modos de atividade em packs variados premium. Cada pack inclui cenas de Eu Vejo onde os usuários encontram objetos específicos numa cena dispersa, mais atividades de Encontra o Diferente onde os usuários identificam elementos sem par entre conjuntos emparelhados. Esta combinação trabalha duas competências cognitivas diferentes — busca visual e discriminação visual — num único produto. Os packs mistos têm preços mais altos porque oferecem mais variedade de atividades e cobrem mais objetivos de aprendizagem do que os produtos de um só modo.',
        platform: 'Etsy / Hotmart (packs variados)',
      },
    ],
  },

  faq: [
    {
      question: 'Quais são os dois modos de atividade e como se diferenciam?',
      answer:
        'O gerador oferece dois modos distintos. O modo Eu Vejo (predefinido) cria cenas de objetos ocultos em forma livre onde de 1 a 5 objetos-alvo se dispersam entre 8 a 12 distratores usando um algoritmo de posicionamento sem sobreposição — os usuários procuram na página e circulam o que encontram, guiados por uma legenda na parte inferior que mostra os objetos a localizar. O modo Encontra o Diferente organiza de 8 a 12 imagens emparelhadas em linhas com 1 a 5 elementos sem par misturados — os usuários identificam as imagens que não têm um par correspondente. As imagens no modo Encontra o Diferente são 50% maiores do que no modo Eu Vejo para uma comparação visual mais clara.',
    },
    {
      question: 'Como funciona o algoritmo de posicionamento sem sobreposição no modo Eu Vejo?',
      answer:
        'Em vez de colocar imagens numa grelha fixa, o modo Eu Vejo usa um algoritmo findBestPosition() que testa 50 posições aleatórias para cada imagem e seleciona a localização com menor sobreposição. Quando o espaço é limitado, o algoritmo reduz adaptativamente o tamanho da imagem para encaixar mais objetos sem saturar a cena. Isto cria cenas de objetos ocultos de aspecto natural onde as imagens se dispersam organicamente pela página, tornando a experiência de busca mais envolvente do que os layouts previsíveis baseados em grelha.',
    },
    {
      question: 'Quantos objetos ocultos e distratores posso usar no modo Eu Vejo?',
      answer:
        'No modo Eu Vejo, pode configurar de 1 a 5 objetos ocultos (os alvos que os usuários precisam de encontrar) e de 8 a 12 objetos distratores (as imagens circundantes que preenchem a cena). Comece com 1–2 objetos ocultos e 8 distratores para atividades mais fáceis, e aumente para 5 objetos ocultos entre 12 distratores para cenas desafiantes. A legenda na parte inferior da atividade mostra aos usuários que objetos devem encontrar.',
    },
    {
      question: 'Como funciona o modo Encontra o Diferente?',
      answer:
        'O modo Encontra o Diferente organiza imagens em linhas com elementos emparelhados e sem par. Configure de 8 a 12 imagens emparelhadas (cada uma aparece duas vezes no layout) e de 1 a 5 elementos sem par que aparecem apenas uma vez. Os usuários examinam cada linha e identificam a imagem que não tem um par correspondente. As imagens são exibidas 50% maiores do que no modo Eu Vejo para uma comparação visual mais clara. Não há legenda na parte inferior, pois os usuários descobrem os elementos sem par através de análise visual em vez de uma lista de referência.',
    },
    {
      question: 'O que mostra a legenda na parte inferior da atividade?',
      answer:
        'No modo Eu Vejo, uma legenda na margem inferior de 120 px mostra os objetos-alvo que os usuários precisam de encontrar. Esta referência visual indica a cada usuário exatamente o que procurar — tornando as atividades acessíveis para pré-leitores e salas de aula multilingues sem necessidade de instruções escritas. O modo Encontra o Diferente não inclui legenda, pois a atividade é autoexplicativa: encontrar a imagem sem um par correspondente.',
    },
    {
      question: 'Como funciona o gabarito autogerado?',
      answer:
        'O gerador usa um sistema de duplo canvas com um aba de Atividade e um aba de Gabarito. A atividade mostra a cena de objetos ocultos sem marcas — os usuários procuram e circulam os objetos por si próprios. O gabarito reproduz o layout idêntico e desenha círculos vermelhos à volta dos objetos corretos: alvos ocultos no modo Eu Vejo e elementos sem par no modo Encontra o Diferente. Os círculos são de 3 a 5 px maiores que o objeto para maior visibilidade. Ambas as versões exportam-se separadamente usando quatro botões de download: JPEG de Atividade, JPEG de Gabarito, PDF de Atividade e PDF de Gabarito.',
    },
    {
      question: 'Posso adicionar campos de nome e data à atividade?',
      answer:
        'Sim. Uma caixa de verificação no painel Texto e Conteúdo adiciona campos de \"Nome:\" e \"Data:\" à atividade. Estas linhas de identificação do usuário asseguram a responsabilidade para uso online e conferem às suas atividades um aspecto profissional para listagens em marketplaces. Ative-os para produtos prontos para loja ou desative-os para páginas de cadernos de atividades.',
    },
    {
      question: 'Como funciona o cabeçalho autogerado?',
      answer:
        'Cada atividade inclui um título autoajustável na fonte Fredoka (#4A4A4A cinzento escuro) com contentores decorativos brancos tipo pílula animados e sombras. O tamanho de fonte do título ajusta-se automaticamente conforme a extensão do texto: 32 px para títulos curtos (menos de 12 caracteres), reduzindo-se até 18 px para títulos mais longos (mais de 22 caracteres). Também pode adicionar um campo de descrição abaixo do título. O sistema de cabeçalho assegura atividades de aspecto profissional independentemente da extensão do título.',
    },
    {
      question: 'Existe um teste grátis?',
      answer:
        'Sim. Pode aceder a todas as funcionalidades — ambos os modos de atividade, quantidades configuráveis de objetos ocultos e distratores, o algoritmo de posicionamento sem sobreposição, o gabarito autogerado, a biblioteca completa de imagens, temas de fundo e de moldura, campos de nome e data, e todos os formatos de download — sem criar uma conta, inserir cartão de crédito ou instalar qualquer software. Os downloads do teste grátis incluem uma pequena marca d\'água. Uma licença comercial remove a marca d\'água e concede direitos completos de venda.',
    },
    {
      question: 'O gerador de objetos ocultos depende do idioma?',
      answer:
        'Não. O gerador de objetos ocultos é puramente visual — não carrega nomes de imagem localizados nem usa o sistema de Vocabulário de Imagens. A configuração de idioma afeta apenas as etiquetas da interface (botões, títulos de painéis, tooltips), NÃO o conteúdo das atividades em si. Isto significa que cada atividade gerada funciona universalmente em todos os idiomas sem qualquer texto localizado na página, tornando os seus produtos vendáveis em qualquer mercado sem modificações.',
    },
    {
      question: 'Posso vender atividades de objetos ocultos criadas com esta ferramenta na Etsy e Amazon KDP?',
      answer:
        'Sim. Com uma licença comercial, tem todos os direitos para vender as suas atividades de objetos ocultos como downloads digitais na Etsy, como cadernos impressos na Amazon KDP, como recursos para loja na Hotmart, ou através de qualquer outro canal de venda. Os dois modos de atividade, a geração de cenas sem sobreposição e as 104 coleções temáticas de imagens dão-lhe as ferramentas criativas para produzir produtos de objetos ocultos originais e vendáveis.',
    },
    {
      question: 'Qual é a política de reembolso?',
      answer:
        'Como o teste grátis lhe dá acesso a todas as funcionalidades, não oferecemos reembolsos em compras de licença comercial. Pode testar ambos os modos de atividade, o algoritmo de posicionamento sem sobreposição, as quantidades configuráveis de objetos, o gabarito autogerado, a biblioteca completa de imagens, temas de fundo e de moldura, campos de nome e data, e todos os formatos de download antes de comprar. O teste grátis é a política de reembolso — certifique-se de que a ferramenta se adapta às suas necessidades antes de adquirir uma licença.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'encontre-conte-atividades',
      anchorText: 'Gerador de Atividades Encontra e Conta',
    },
    {
      pageType: 'app',
      slug: 'palavras-cruzadas-imagens-atividades',
      anchorText: 'Gerador de Palavras Cruzadas com Imagens',
    },
    {
      pageType: 'app',
      slug: 'caca-ao-tesouro-atividades',
      anchorText: 'Gerador de Atividades de Caça ao Tesouro',
    },
    {
      pageType: 'app',
      slug: 'classificacao-imagens-atividades',
      anchorText: 'Gerador de Atividades de Classificação de Imagens',
    },
    {
      pageType: 'app',
      slug: 'ligar-atividades',
      anchorText: 'Gerador de Atividades de Ligar',
    },
    {
      pageType: 'app',
      slug: 'encontre-diferente-atividades',
      anchorText: 'Gerador de Atividades de Encontre o Diferente',
    },
    {
      pageType: 'bundle',
      slug: 'pacote-procura-encontra',
      anchorText: 'Pacote Busca e Descobre — Todas as Apps de Busca num Só Pacote',
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
      pageType: 'guide',
      slug: 'criar-atividades-objetos-ocultos',
      anchorText: 'Criar atividades de objetos ocultos',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/portuguese/find objects/encontra-os-objetos-escondidos-1.webp',
      primaryAlt: 'Atividade de objetos ocultos Eu Vejo com imagens dispersas usando algoritmo sem sobreposição, legenda inferior mostrando objetos a encontrar e cabeçalho decorativo',
    },
    sampleGallery: [
      {
        src: '/samples/portuguese/find objects/encontra-os-objetos-escondidos-1.webp',
        alt: 'Cena de objetos ocultos Eu Vejo com imagens dispersas e legenda mostrando objetos-alvo na parte inferior',
        caption: 'Modo Eu Vejo — cena de objetos ocultos em forma livre com legenda',
      },
      {
        src: '/samples/portuguese/find objects/encontra-o-diferente-1.webp',
        alt: 'Atividade Encontra o Diferente com imagens emparelhadas em linhas e elementos sem par a identificar',
        caption: 'Modo Encontra o Diferente — imagens emparelhadas com elementos sem par para discriminação visual',
      },
      {
        src: '/samples/portuguese/find objects/encontra-os-objetos-escondidos-1-answer-key.webp',
        alt: 'Gabarito de atividade de objetos ocultos com círculos vermelhos desenhados à volta dos objetos-alvo',
        caption: 'Gabarito autogerado — círculos vermelhos marcam objetos ocultos e sem par',
      },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'Como Criar Atividades de Objetos Ocultos com Modos Eu Vejo e Encontra o Diferente — Tutorial Passo a Passo',
  },
};

export default content;
