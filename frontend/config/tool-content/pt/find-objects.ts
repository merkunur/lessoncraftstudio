import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'gerador fichas objetos ocultos para vendedores',
    secondaryKeywords: [
      'criador fichas eu vejo busca objetos uso comercial',
      'gerador fichas encontra o diferente para Etsy e KDP',
      'ferramenta fichas objetos ocultos sem sobreposição licença comercial',
      'criar fichas busca e encontra visuais para vender online',
    ],
    lsiKeywords: [
      'modo eu vejo e encontra o diferente dupla atividade visual',
      'algoritmo sem sobreposição 50 posições tamanho adaptativo cena dispersa',
      'gabarito autogerado círculos vermelhos anotações objetos ocultos',
    ],
    titleTag: 'Gerador Fichas Objetos Ocultos — Eu Vejo para Vender',
    metaDescription: 'Crie fichas de objetos ocultos com modos Eu Vejo e Encontra o Diferente, cenas sem sobreposição, gabaritos com círculos vermelhos, 104 temas. Teste grátis.',
  },

  hero: {
    title: 'Gerador de Fichas de Objetos Ocultos',
    tagline: 'Gerador de fichas de objetos ocultos com dois modos — Eu Vejo (cenas dispersas sem sobreposição com 1–5 objetos ocultos entre 8–12 distratores e legenda inferior) e Encontra o Diferente (8–12 imagens emparelhadas com 1–5 elementos sem par apresentados 50% maiores), algoritmo de tamanho de imagem adaptativo que testa 50 posições por imagem, gabaritos autogerados com anotações de círculos vermelhos, e fichas puramente visuais que se vendem em todo o mundo sem tradução',
    description: 'Crie fichas profissionais de objetos ocultos onde os alunos procuram numa cena visual para encontrar e circular objetos específicos. O gerador oferece dois modos de atividade que produzem desafios cognitivos fundamentalmente diferentes. O modo Eu Vejo usa um algoritmo de posicionamento sem sobreposição para dispersar de 1 a 5 objetos ocultos entre 8 a 12 distratores por toda a página — sem grelha, sem linhas nem colunas, apenas uma cena visual coesa. O algoritmo findBestPosition() testa 50 posições aleatórias por imagem e seleciona a localização com menor sobreposição, reduzindo adaptativamente o tamanho da imagem quando o espaço é limitado. Uma legenda na parte inferior da ficha (margem de 120 px) mostra aos alunos exatamente que objetos devem encontrar, tornando as fichas acessíveis para pré-leitores sem instruções escritas. O modo Encontra o Diferente organiza de 8 a 12 imagens emparelhadas com 1 a 5 elementos sem par misturados — os alunos identificam as imagens que não têm um par correspondente. As imagens no modo Encontra o Diferente são apresentadas 50% maiores do que no modo Eu Vejo para uma comparação visual clara. O sistema de duplo canvas gera tanto um separador de ficha como um separador de gabarito simultaneamente. O gabarito reproduz o layout exato da ficha e desenha círculos vermelhos à volta dos objetos ocultos (Eu Vejo) ou dos elementos sem par (Encontra o Diferente), de 3 a 5 px maiores que o objeto para maior visibilidade. Um cabeçalho autogerado mostra o seu título na fonte Fredoka com autoajuste — 32 px para títulos curtos reduzindo-se a 18 px para textos mais longos — com contentores decorativos brancos tipo pílula e sombras. Ative ou desative os campos de nome e data para identificação do aluno. O Gerador de Objetos Ocultos NÃO depende do idioma: as fichas são puramente visuais sem nomes de imagem localizados no conteúdo da ficha, pelo que cada ficha se vende universalmente em todos os mercados sem tradução. Explore 104 coleções temáticas com mais de 3100 ilustrações ou carregue imagens personalizadas em formato PNG, JPG ou GIF. Aplique temas de fundo e de moldura com controlos de opacidade independentes. Adicione texto personalizado com 7 opções de fonte (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) e contorno de texto de 0 a 10. Exporte PDF e JPEG prontos para impressão a 300 DPI (multiplicador 6×) em Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou dimensões personalizadas. Ative escala de cinzentos para impressão que poupa tinta. Edite tudo no canvas Fabric.js com arrastar, redimensionar, rodar, camadas, bloquear/desbloquear, 6 opções de alinhamento mais centrar na página, zoom de 25% a 300%, e 20 estados de desfazer/refazer. O teste grátis inclui todas as funcionalidades com uma marca d\'água nos downloads. Adquira uma licença para remover a marca d\'água e vender comercialmente.',
  },

  tutorial: {
    title: 'Como Criar Fichas de Objetos Ocultos em 8 Passos',
    steps: [
      {
        title: 'Abra o Gerador de Objetos Ocultos',
        description: 'Clique em «Teste Grátis Agora» para abrir o gerador de fichas de objetos ocultos no seu navegador. A ferramenta carrega instantaneamente com uma barra lateral de configuração à esquerda e um canvas de duplo separador à direita — um separador para a ficha e outro para o gabarito. Sem criar conta, sem descarregar software, sem instalação necessária — comece a criar fichas de objetos ocultos de imediato.',
      },
      {
        title: 'Configure o Layout de Página',
        description: 'Abra o painel Configuração de Página e escolha um tamanho de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) ou introduza uma dimensão personalizada. Escolha uma cor de fundo de página com o seletor de cor. Selecione um tema de fundo e ajuste a sua opacidade, depois escolha um tema de moldura com o seu próprio controlo de opacidade independente. Estas opções de layout enquadram a sua ficha de objetos ocultos antes de configurar qualquer modo de atividade ou conteúdo.',
      },
      {
        title: 'Escolha o Seu Modo de Atividade',
        description: 'Selecione entre dois modos no painel de Seleção de Objetos. O modo Eu Vejo (predefinido) cria cenas de objetos ocultos em forma livre onde as imagens se dispersam pela página usando um algoritmo de posicionamento sem sobreposição — sem grelha, apenas uma cena visual de aspeto natural onde os alunos procuram objetos específicos guiados por uma legenda inferior. O modo Encontra o Diferente organiza imagens emparelhadas em linhas com elementos sem par misturados para atividades de discriminação visual onde os alunos identificam imagens sem um par correspondente. Cada modo produz um tipo diferente de ficha de busca e encontra a partir da mesma biblioteca de imagens.',
      },
      {
        title: 'Configure a Quantidade de Objetos para Controlar a Dificuldade',
        description: 'No modo Eu Vejo, configure de 1 a 5 objetos ocultos (os alvos que os alunos precisam de encontrar) e de 8 a 12 objetos distratores (imagens circundantes que preenchem a cena). Comece com 1–2 objetos ocultos e 8 distratores para fichas mais fáceis para alunos mais novos, e aumente para 5 objetos ocultos entre 12 distratores para cenas desafiantes para alunos avançados. No modo Encontra o Diferente, estabeleça de 8 a 12 imagens emparelhadas e de 1 a 5 elementos sem par. A quantidade de objetos é o seu controlo principal de dificuldade — menos alvos para produtos simples, mais alvos para coleções premium de desafios.',
      },
      {
        title: 'Selecione Imagens da Biblioteca Temática',
        description: 'Abra o painel Biblioteca de Imagens e explore 104 coleções temáticas com mais de 3100 ilustrações coloridas — animais, comida, veículos, natureza, profissões, festividades, desportos, estações e dezenas mais. Filtre por tema com o menu suspenso ou pesquise por palavra-chave. Cada tema fornece um conjunto coordenado de ilustrações que funcionam tanto como objetos ocultos e distratores em cenas Eu Vejo, como elementos emparelhados e sem par em fichas Encontra o Diferente. Também pode carregar imagens personalizadas em formato PNG, JPG ou GIF para usar junto ao conteúdo da biblioteca em produtos únicos e com a sua marca.',
      },
      {
        title: 'Gere a Cena de Objetos Ocultos',
        description: 'Clique em Gerar para criar a ficha. No modo Eu Vejo, o algoritmo sem sobreposição coloca cada imagem testando 50 posições aleatórias e selecionando a que tem menor sobreposição, reduzindo adaptativamente o tamanho da imagem quando o espaço é limitado. Uma legenda aparece na parte inferior da ficha (margem de 120 px) mostrando aos alunos que objetos devem encontrar. No modo Encontra o Diferente, as imagens organizam-se em linhas com elementos emparelhados e sem par, apresentados 50% maiores para uma comparação visual clara. O cabeçalho autoajustável mostra o seu título na fonte Fredoka — 32 px para títulos curtos reduzindo-se a 18 px para textos mais longos. Ative ou desative os campos de nome e data para fichas de sala de aula. Clique em Gerar novamente para reconstruir com uma distribuição aleatória diferente — mesmas imagens, mesma configuração, um layout de objetos ocultos completamente distinto.',
      },
      {
        title: 'Reveja o Gabarito Autogerado',
        description: 'Clique no separador Gabarito para ver as anotações autogeradas. O gabarito reproduz o layout exato da ficha e desenha círculos vermelhos à volta dos objetos corretos — alvos ocultos no modo Eu Vejo e elementos sem par no modo Encontra o Diferente. Os círculos são de 3 a 5 px maiores que o objeto para maior visibilidade. Alterne entre os separadores Ficha e Gabarito para comparar. O gabarito é gerado simultaneamente com a ficha — sem marcação manual, sem criar ficheiros separados, sem possibilidade de respostas dessincronizadas. Este sistema de duplo canvas poupa um tempo de produção significativo ao criar packs de objetos ocultos.',
      },
      {
        title: 'Descarregue os Quatro Ficheiros',
        description: 'Ative a escala de cinzentos para versões que poupam tinta, ideais para impressão em sala de aula e interiores de KDP. Descarregue os quatro ficheiros a partir de uma única sessão: JPEG de ficha, PDF de ficha, JPEG de gabarito e PDF de gabarito — todos renderizados a 300 DPI (multiplicador 6×). Cada separador tem o seu próprio par de botões de descarga. Todas as exportações estão prontas para produção em listagens da Etsy, interiores de Amazon KDP e ficheiros de produtos de TPT sem necessidade de pós-produção. Mude de tema, ajuste a quantidade de objetos, mude o modo de atividade e gere novamente para criar variedade rápida nas 104 coleções temáticas.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Packs Temáticos de Atividades Eu Vejo de Objetos Ocultos',
      description: 'Crie packs de fichas Eu Vejo organizados por tema usando as 104 coleções de imagens — objetos ocultos de animais, busca de criaturas marinhas, encontra dinossauros, Eu Vejo de festividades e dezenas mais. Cada tema fornece ilustrações suficientes para múltiplas cenas únicas de objetos ocultos com dificuldade variada. Empacote de 15 a 20 fichas Eu Vejo por tema com gabaritos autogerados incluídos. Aumente a dificuldade ao longo do pack adicionando mais objetos ocultos (de 1 a 5) e mais distratores (de 8 a 12) conforme as páginas avançam. O algoritmo sem sobreposição produz um layout disperso diferente em cada geração, pelo que criar múltiplas fichas únicas do mesmo tema leva apenas segundos.',
    },
    {
      title: 'Packs Variados Mistos de Eu Vejo e Encontra o Diferente',
      description: 'Combine ambos os modos de atividade em packs variados premium. Cada pack inclui cenas Eu Vejo de objetos ocultos onde os alunos encontram objetos específicos numa cena dispersa guiados pela legenda inferior, mais fichas Encontra o Diferente onde os alunos identificam elementos sem par entre conjuntos emparelhados. Esta combinação trabalha duas competências cognitivas diferentes — busca visual e discriminação visual — num único produto. Os packs de modo misto têm preços mais altos porque oferecem mais variedade de atividades e cobrem mais objetivos de aprendizagem do que os produtos de um só modo.',
    },
    {
      title: 'Cadernos de Atividades de Objetos Ocultos para KDP com Dificuldade Progressiva',
      description: 'Compile de 50 a 80 fichas de objetos ocultos em cadernos impressos para Amazon KDP. Estruture os capítulos por dificuldade progressiva: os primeiros capítulos ocultam 1–2 objetos entre 8 distratores para iniciantes, os capítulos intermédios aumentam para 3–4 objetos ocultos com 10 distratores, e os capítulos avançados usam 5 objetos ocultos entre 12 distratores. Inclua páginas de gabarito no final com anotações de círculos vermelhos. Ative a escala de cinzentos para impressão que poupa tinta otimizada para interiores a preto e branco. O formato puramente visual significa que um único caderno funciona para qualquer mercado internacional de KDP sem tradução.',
    },
    {
      title: 'Coleções de Fichas Encontra o Diferente para Discriminação Visual',
      description: 'Crie conjuntos dedicados de fichas Encontra o Diferente onde os alunos identificam imagens sem par entre conjuntos emparelhados. Configure de 8 a 12 imagens emparelhadas e de 1 a 5 elementos sem par por ficha, com imagens apresentadas 50% maiores para uma comparação visual clara. Crie conjuntos alinhados com o currículo: encontra o diferente de animais da quinta para ciências, classificação de grupos alimentares para nutrição, identificação de profissões para estudos sociais, e reconhecimento de formas para preparação matemática. Cada ficha exporta-se com o seu gabarito autogerado mostrando círculos vermelhos à volta de cada elemento sem par, eliminando o tempo de preparação do professor para criar páginas de soluções separadas.',
    },
    {
      title: 'Coleções Sazonais de Atividades de Objetos Ocultos',
      description: 'Crie coleções sazonais rotativas usando os temas de festividades e natureza da biblioteca de 104 temas. Cenas de objetos ocultos de Natal, atividades Eu Vejo de Halloween, fichas de busca e encontra de Páscoa, desafios de regresso às aulas, e conjuntos temáticos de verão, cada um suporta packs sazonais dedicados. Inclua fichas tanto de Eu Vejo como de Encontra o Diferente em cada coleção sazonal para máxima variedade. Publique cada coleção 4–6 semanas antes da festividade para visibilidade máxima no marketplace. O formato puramente visual torna os conjuntos sazonais vendáveis em todos os países sem localização.',
    },
    {
      title: 'Mega Packs de Busca e Encontra Multiformato',
      description: 'Combine fichas de objetos ocultos com atividades de sopa de letras, fichas de encontra e conta, palavras cruzadas com imagens, e fichas de caça ao tesouro usando temas coordenados em múltiplos geradores. As cenas de objetos ocultos desenvolvem a varredura visual e a identificação de objetos. A sopa de letras trabalha o reconhecimento de letras e vocabulário. Encontra e conta adiciona prática numérica. Cada formato trabalha uma competência cognitiva diferente mantendo a coerência temática. Os packs multiformato de busca e encontra têm preços premium porque pais e professores pagam mais por coleções integrais do que por packs de uma só atividade.',
    },
  ],

  businessIdeas: [
    {
      title: 'Loja Temática de Atividades de Objetos Ocultos na Etsy',
      description: 'Abra uma loja na Etsy especializada em packs de atividades de objetos ocultos organizados por tema usando as 104 coleções de imagens. Objetos ocultos de animais, Eu Vejo de festividades, busca de criaturas marinhas, encontra dinossauros — cada tema torna-se num listagem separada com dificuldade progressiva de 1 a 5 objetos ocultos. Cada pack inclui gabaritos autogerados com anotações de círculos vermelhos — um ponto de venda crítico que diferencia as suas listagens de concorrentes que vendem fichas sem soluções. O algoritmo sem sobreposição gera layouts dispersos únicos em cada clique, tornando a produção em lote rápida. Defina o preço de packs temáticos individuais de 15–20 fichas com gabaritos entre $3–$5 e packs multi-tema premium entre $7–$12.',
      platform: 'Etsy',
    },
    {
      title: 'Série de Cadernos de Atividades de Objetos Ocultos na Amazon KDP',
      description: 'Compile de 50 a 80 fichas de objetos ocultos em cadernos temáticos para Amazon KDP. Estruture uma série por dificuldade e modo: «Eu Vejo Fácil para Iniciantes» com 1–2 objetos ocultos e 8 distratores, «Aventuras de Busca Eu Vejo» aumentando para 3–4 objetos ocultos com 10 distratores, «Desafios Avançados de Objetos Ocultos» com 5 objetos ocultos entre 12 distratores, e «Fichas Visuais de Encontra o Diferente» usando o modo de imagens emparelhadas. Inclua gabaritos no final com anotações de círculos vermelhos. Ative escala de cinzentos para impressão que poupa tinta. O formato puramente visual publica-se de forma idêntica em todos os mercados internacionais de KDP sem tradução — um único interior serve para todos os países.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Packs de Atividades de Objetos Ocultos para a Sala de Aula no TPT',
      description: 'Carregue packs de atividades de objetos ocultos no TPT com campos de nome e data e gabaritos autogerados como pontos de venda principais. Os professores que procuram atividades de busca visual e observação valorizam fichas que chegam prontas para a sala de aula com soluções incluídas. Crie conjuntos alinhados com o currículo: objetos ocultos de animais da quinta para ciências, Eu Vejo de profissões para estudos sociais, busca de grupos alimentares para nutrição, e cenas de objetos ocultos sazonais para unidades de festividades. Inclua fichas tanto de Eu Vejo como de Encontra o Diferente para instrução diferenciada — Eu Vejo para prática de busca visual e Encontra o Diferente para desenvolvimento de discriminação visual.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Funil de Tráfego no Pinterest com Fichas de Objetos Ocultos',
      description: 'As fichas de objetos ocultos criam pins visualmente impactantes no Pinterest — cenas coloridas de imagens dispersas com objetos para encontrar criam conteúdo educativo imediatamente atrativo que pais e professores clicam. Publique fichas de amostra mostrando ambos os modos: Eu Vejo com objetos ocultos dispersos e a legenda inferior, e Encontra o Diferente com imagens emparelhadas em linhas. Crie séries de pins separadas para «fichas de objetos ocultos para crianças», «atividades imprimíveis eu vejo» e «fichas visuais encontra o diferente». As imagens de pré-visualização do gabarito com anotações de círculos vermelhos demonstram qualidade profissional. Ligue cada pin às suas listagens da Etsy ou TPT para conversão direta.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Completo de Atividades de Objetos Ocultos no Gumroad',
      description: 'Empacote fichas de objetos ocultos dos 104 temas e ambos os modos de atividade num kit completo no Gumroad. Inclua mais de 300 fichas abrangendo o modo Eu Vejo com níveis de dificuldade progressiva (1–5 objetos ocultos, 8–12 distratores) e o modo Encontra o Diferente com quantidades variáveis de imagens emparelhadas. Cada ficha inclui o seu gabarito autogerado com anotações de círculos vermelhos, duplicando a sua contagem de ficheiros para mais de 600 ficheiros no total. O algoritmo sem sobreposição e os dois modos de atividade produzem mais variedade do que qualquer concorrente que ofereça fichas simples de objetos ocultos baseadas em grelha. O formato kit justifica preços premium porque os compradores obtêm uma biblioteca completa de fichas de objetos ocultos.',
      platform: 'Gumroad',
    },
    {
      title: 'Linha de Produtos de Fichas Visuais Globais',
      description: 'O Gerador de Objetos Ocultos produz fichas puramente visuais — nenhum texto específico de idioma aparece no conteúdo da ficha. A legenda de Eu Vejo usa imagens, não palavras, e Encontra o Diferente é inteiramente visual. Os mesmos ficheiros de produto funcionam em todos os países sem tradução nem modificação. Uma única sessão de criação produz um catálogo vendável globalmente. Venda ficheiros idênticos em lojas da Etsy dirigidas a diferentes países, publique os mesmos interiores de KDP em todos os mercados internacionais da Amazon, e liste no TPT para professores internacionais. Sem versões separadas por idioma, sem custos de tradução, sem manutenção por cada país — o formato puramente visual é a sua maior vantagem de venda global.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Aproveite o Algoritmo sem Sobreposição para Cenas de Aspeto Natural',
      description: 'O algoritmo findBestPosition() testa 50 posições aleatórias por imagem e seleciona a localização com menor sobreposição, reduzindo adaptativamente o tamanho da imagem quando o espaço é limitado. Isto significa que cada geração produz uma cena de aspeto natural diferente mesmo com as mesmas imagens e configuração. Clique em Gerar repetidamente para produzir múltiplas fichas únicas a partir do mesmo conteúdo — cada clique cria um layout disperso completamente diferente. Produza em lote mais de 10 fichas únicas por tema em minutos sem alterar nenhuma configuração.',
    },
    {
      title: 'Controle a Dificuldade Através da Quantidade de Objetos Ocultos e Distratores',
      description: 'A quantidade de objetos controla diretamente a dificuldade dos objetos ocultos. Eu Vejo com 1 objeto oculto entre 8 distratores cria fichas fáceis para produtos de pré-escola. Aumentar para 3 objetos ocultos entre 10 distratores produz desafios moderados para alunos do ensino primário. A dificuldade máxima (5 objetos ocultos entre 12 distratores) cria cenas densas onde encontrar cada alvo requer um esforço genuíno. Crie packs de dificuldade progressiva com secções claramente etiquetadas de fácil, médio e difícil — os compradores pagam preços premium por produtos que crescem com o aluno.',
    },
    {
      title: 'Aproveite o Formato Puramente Visual para Vendas Mundiais sem Tradução',
      description: 'As fichas de objetos ocultos contêm apenas imagens — sem texto específico de idioma no conteúdo da ficha. A legenda de Eu Vejo mostra os objetos-alvo visualmente, e Encontra o Diferente é puramente baseado em imagens. Cada ficha que cria é vendável instantaneamente em todo o mundo sem tradução nem localização. Um único conjunto de fichas de objetos ocultos serve para cada loja internacional da Etsy, cada mercado de KDP e cada comprador de TPT independentemente do idioma. Enquanto os concorrentes criam versões separadas por idioma de fichas com muito texto, as suas fichas visuais funcionam em toda a parte a partir de um único conjunto de ficheiros.',
    },
    {
      title: 'Inclua Ambos os Modos de Atividade em Cada Pack para Máximo Valor Percebido',
      description: 'Os packs que incluem fichas tanto de Eu Vejo como de Encontra o Diferente oferecem mais variedade do que os produtos de um só modo. O modo Eu Vejo desenvolve competências de busca visual e identificação de objetos com as suas cenas dispersas e legenda inferior. O modo Encontra o Diferente trabalha a discriminação visual e o reconhecimento de padrões com o seu formato de imagens emparelhadas. Incluir ambos os modos em cada pack duplica a variedade de fichas das mesmas seleções de temas, cobre duas áreas de competências cognitivas diferentes, e justifica preços mais altos porque os compradores obtêm dois tipos de atividade distintos numa única compra.',
    },
    {
      title: 'Aproveite a Legenda Inferior para Acessibilidade de Pré-Leitores',
      description: 'A legenda Eu Vejo na parte inferior da ficha (margem de 120 px) mostra os objetos-alvo visualmente — sem necessidade de leitura. Isto torna as suas fichas de objetos ocultos acessíveis para pré-leitores, crianças pequenas e salas de aula multilingues onde as instruções escritas excluiriam alguns alunos. Destaque esta acessibilidade nas listagens do seu marketplace para alcançar o mercado de pré-escola e primeira infância. Os pais de pré-leitores procuram ativamente atividades puramente visuais, e a função de legenda faz com que os seus produtos se destaquem face a concorrentes com muito texto.',
    },
    {
      title: 'Use Escala de Cinzentos para Produtos Económicos para a Sala de Aula e KDP',
      description: 'Ative a escala de cinzentos para criar fichas de objetos ocultos que poupam tinta especificamente para o mercado escolar e de educação em casa. Muitos professores imprimem fichas em impressoras a preto e branco e valorizam produtos otimizados para saída em escala de cinzentos. Crie packs de duplo formato que incluam versões a cores e em escala de cinzentos das mesmas fichas — os compradores percecionam isto como o dobro do valor. Os interiores de impressão a pedido de KDP também beneficiam da otimização em escala de cinzentos, já que a impressão a cores custa significativamente mais.',
    },
    {
      title: 'Inclua Gabaritos em Cada Pré-Visualização de Listagem para Superar a Concorrência',
      description: 'O gabarito autogerado com anotações de círculos vermelhos à volta dos objetos ocultos e sem par é o seu diferenciador de venda mais forte. Inclua sempre imagens de pré-visualização do gabarito nas suas listagens de marketplace — mostre os círculos vermelhos claramente nas fotografias do produto. Os produtos que incluem gabaritos superam consistentemente em vendas as listagens de apenas fichas porque professores e pais querem materiais de autocorreção que poupem tempo de avaliação. O sistema de duplo canvas gera ambas as versões simultaneamente, pelo que incluir o gabarito não lhe custa nada extra em tempo de produção.',
    },
  ],

  faq: [
    {
      question: 'Existe um teste grátis?',
      answer: 'Sim. A ferramenta oferece um teste grátis com todas as funcionalidades desbloqueadas — ambos os modos de atividade (Eu Vejo e Encontra o Diferente), quantidades configuráveis de objetos ocultos e distratores, o algoritmo de posicionamento sem sobreposição, o gabarito autogerado com anotações de círculos vermelhos, a legenda no modo Eu Vejo, as 104 coleções temáticas de imagens com mais de 3100 ilustrações, carregamento de imagens personalizadas, temas de fundo e de moldura com opacidade independente, campos de nome e data, escala de cinzentos, e todos os formatos de descarga. Sem registo, sem cartão de crédito. Os downloads do teste grátis incluem uma marca d\'água. Adquira uma licença comercial para remover a marca d\'água e desbloquear direitos de venda.',
    },
    {
      question: 'Quais são os dois modos de atividade e como se diferenciam?',
      answer: 'O gerador oferece dois modos distintos numa única ferramenta. O modo Eu Vejo (predefinido) cria cenas de objetos ocultos em forma livre onde de 1 a 5 objetos-alvo se dispersam entre 8 a 12 distratores usando um algoritmo de posicionamento sem sobreposição — os alunos procuram na página e circulam o que encontram, guiados por uma legenda na parte inferior que mostra os objetos a localizar. O modo Encontra o Diferente organiza de 8 a 12 imagens emparelhadas com 1 a 5 elementos sem par misturados — os alunos identificam as imagens que não têm um par correspondente. As imagens no modo Encontra o Diferente são apresentadas 50% maiores do que no modo Eu Vejo para uma comparação visual mais clara. Cada modo produz um desafio cognitivo fundamentalmente diferente a partir da mesma biblioteca de imagens.',
    },
    {
      question: 'Como funciona o algoritmo de posicionamento sem sobreposição?',
      answer: 'Em vez de colocar imagens numa grelha fixa, o modo Eu Vejo usa um algoritmo findBestPosition() que testa 50 posições aleatórias para cada imagem e seleciona a localização com menor sobreposição. Quando o espaço é limitado, o algoritmo reduz adaptativamente o tamanho da imagem para encaixar mais objetos sem saturar a cena. Isto cria cenas de objetos ocultos de aspeto natural onde as imagens se dispersam organicamente pela página — muito mais atrativas do que as alternativas baseadas em grelha onde os objetos se posicionam em linhas e colunas previsíveis. Clique em Gerar múltiplas vezes para produzir layouts únicos a partir da mesma configuração.',
    },
    {
      question: 'Como funciona a legenda no modo Eu Vejo?',
      answer: 'No modo Eu Vejo, uma legenda na parte inferior da ficha (margem inferior de 120 px) mostra os objetos-alvo que os alunos precisam de encontrar. Esta referência visual indica aos alunos exatamente o que procurar — tornando as fichas acessíveis para pré-leitores e salas de aula multilingues sem necessidade de instruções escritas. A legenda é gerada automaticamente com base nos objetos ocultos selecionados. O modo Encontra o Diferente usa uma margem inferior compacta de 50 px, pois os alunos descobrem os elementos sem par através de comparação visual em vez de uma lista de referência.',
    },
    {
      question: 'Quantos objetos ocultos e distratores posso configurar?',
      answer: 'No modo Eu Vejo, configure de 1 a 5 objetos ocultos (os alvos que os alunos precisam de encontrar) e de 8 a 12 objetos distratores (imagens circundantes que preenchem a cena). Comece com 1–2 objetos ocultos e 8 distratores para fichas mais fáceis para alunos mais novos, e aumente para 5 objetos ocultos entre 12 distratores para cenas desafiantes. No modo Encontra o Diferente, configure de 8 a 12 imagens emparelhadas (cada uma aparece com o seu par correspondente) e de 1 a 5 elementos sem par que os alunos devem identificar. A quantidade de objetos é o seu controlo principal de dificuldade.',
    },
    {
      question: 'Como funciona o gabarito autogerado?',
      answer: 'O gerador usa um sistema de duplo canvas com um separador de Ficha e um separador de Gabarito. A ficha mostra a cena de objetos ocultos sem marcas — os alunos procuram e circulam os objetos por si próprios. O gabarito reproduz o layout idêntico e desenha círculos vermelhos à volta dos objetos corretos: alvos ocultos no modo Eu Vejo e elementos sem par no modo Encontra o Diferente. Os círculos são de 3 a 5 px maiores que o objeto para maior visibilidade. Descarregue cada versão independentemente usando quatro botões dedicados: JPEG de ficha, PDF de ficha, JPEG de gabarito e PDF de gabarito.',
    },
    {
      question: 'Como funciona o cabeçalho autogerado?',
      answer: 'Cada ficha inclui um título autoajustável renderizado na fonte Fredoka com contentores decorativos brancos tipo pílula e sombras. O tamanho de fonte do título ajusta-se automaticamente conforme a extensão do texto: 32 px para títulos curtos (menos de 12 caracteres), reduzindo-se a 18 px para títulos mais longos (mais de 22 caracteres). Também pode adicionar um campo de descrição abaixo do título. O sistema de cabeçalho assegura fichas de aspeto profissional independentemente da extensão do título.',
    },
    {
      question: 'O Gerador de Objetos Ocultos depende do idioma?',
      answer: 'Não. O Gerador de Objetos Ocultos é um formato de fichas puramente visual — não aparecem nomes de imagem localizados no conteúdo da ficha. A legenda de Eu Vejo mostra os objetos-alvo como imagens, não como texto. A configuração de idioma afeta apenas as etiquetas da interface (botões, títulos de painéis, tooltips), NÃO o conteúdo das fichas. Isto torna cada ficha gerada universalmente vendável em todos os mercados sem tradução nem modificação — um único conjunto de fichas de objetos ocultos serve para qualquer marketplace internacional.',
    },
    {
      question: 'Que tamanhos de página e formatos de exportação estão disponíveis?',
      answer: 'Os tamanhos de página incluem Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Quadrado (1200×1200) e dimensões personalizadas. Exporte como JPEG de alta resolução ou PDF pronto para impressão a 300 DPI (multiplicador 6×). Ative a escala de cinzentos para impressão que poupa tinta. Cada geração produz quatro ficheiros de descarga: JPEG de ficha, PDF de ficha, JPEG de gabarito e PDF de gabarito. Todas as exportações estão prontas para produção em downloads digitais, cadernos impressos e materiais para sala de aula.',
    },
    {
      question: 'Que ferramentas de edição do canvas estão disponíveis?',
      answer: 'O canvas Fabric.js proporciona controlo total sobre cada elemento. Arraste, redimensione, rode e reposicione imagens, texto e conteúdo gerado livremente. Os controlos de camada gerem a ordem de empilhamento com bloquear/desbloquear em objetos individuais. Adicione texto personalizado com 7 opções de fonte (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamanho e cor ajustáveis, e largura de contorno de texto de 0 a 10. Seis opções de alinhamento mais centrar na página posicionam elementos com precisão. Zoom de 25% a 300% e desfazer/refazer até 20 estados do histórico.',
    },
    {
      question: 'Posso vender fichas de objetos ocultos criadas com esta ferramenta comercialmente?',
      answer: 'Sim. Com uma licença comercial, tem todos os direitos para vender fichas de objetos ocultos como downloads digitais na Etsy, cadernos de atividades impressos na Amazon KDP, recursos para sala de aula no TPT, ou através de qualquer outro canal de vendas. Os dois modos de atividade, a geração de cenas sem sobreposição, o tamanho de imagem adaptativo, os gabaritos autogerados com anotações de círculos vermelhos, a legenda de Eu Vejo, carregamento de imagens personalizadas, e as 104 coleções temáticas de imagens dão-lhe tudo o que precisa para criar produtos profissionais de objetos ocultos que competem em categorias de busca e encontra em qualquer marketplace importante.',
    },
    {
      question: 'Qual é a política de reembolso?',
      answer: 'Teste antes de comprar com o nosso teste grátis — todas as funcionalidades estão disponíveis para que avalie a ferramenta completamente antes de comprar. Dado que o teste grátis lhe dá acesso total a ambos os modos de atividade, quantidades configuráveis de objetos, o algoritmo sem sobreposição, o gabarito autogerado com anotações de círculos vermelhos, a legenda de Eu Vejo, os 104 temas, carregamento de imagens personalizadas, temas de fundo e de moldura, campos de nome e data, exportação em escala de cinzentos, e todos os formatos de descarga, não oferecemos reembolsos em compras de licenças. Certifique-se de que a ferramenta se adapta às suas necessidades usando o teste grátis antes de comprar.',
    },
    {
      question: 'Qual é a diferença entre a licença Comercial e o Acesso Completo?',
      answer: 'A licença Comercial inclui 10 temas coloridos (~300 imagens) e remove a marca d\'água para venda comercial. O Acesso Completo desbloqueia todos os 104 temas com mais de 3100 ilustrações e todos os 11 idiomas de interface. Ambas as licenças dão direitos comerciais completos para vender as fichas que cria. Para vendedores que precisam de máxima variedade de conteúdo nas 104 coleções temáticas, o Acesso Completo oferece mais de 10 vezes o conteúdo da licença Comercial.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'encontrar-objetos-fichas', anchorText: 'Atividades de Objetos Ocultos — Detalhes Completos do Produto' },
    { pageType: 'tool', slug: 'gerador-procura-conta', anchorText: 'Gerador de Fichas Encontra e Conta' },
    { pageType: 'tool', slug: 'gerador-palavras-cruzadas', anchorText: 'Gerador de Palavras Cruzadas com Imagens' },
    { pageType: 'tool', slug: 'gerador-caca-tesouro', anchorText: 'Gerador de Fichas de Caça ao Tesouro' },
    { pageType: 'tool', slug: 'gerador-caca-palavras', anchorText: 'Gerador de Caça-Palavras' },
    { pageType: 'tool', slug: 'gerador-discriminacao-visual', anchorText: 'Gerador de Fichas de Discriminação Visual' },
    { pageType: 'tool', slug: 'gerador-fichas-associacao', anchorText: 'Gerador de Fichas de Associação' },
    { pageType: 'tool', slug: 'gerador-paginas-colorir', anchorText: 'Gerador de Páginas para Colorir' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/portuguese/find objects/Encontra o Diferente (1).webp',
      primaryAlt: 'Ficha de objetos ocultos Eu Vejo com imagens dispersas usando algoritmo sem sobreposição, legenda inferior mostrando objetos a encontrar e cabeçalho decorativo na fonte Fredoka',
    },
    sampleGallery: [
      {
        src: '/samples/portuguese/find objects/Encontra o Diferente (2).webp',
        alt: 'Cena de objetos ocultos Eu Vejo com imagens dispersas e legenda mostrando objetos-alvo na parte inferior da ficha',
        caption: 'Modo Eu Vejo — cena de objetos ocultos em forma livre com posicionamento sem sobreposição e legenda inferior',
      },
      {
        src: '/samples/portuguese/find objects/Encontra o Diferente (3).webp',
        alt: 'Ficha Encontra o Diferente com imagens emparelhadas em linhas e elementos sem par a identificar apresentados 50 por cento maiores',
        caption: 'Modo Encontra o Diferente — imagens emparelhadas com elementos sem par para atividades de discriminação visual',
      },
      {
        src: '/samples/portuguese/find objects/Encontra o Diferente (4).webp',
        alt: 'Gabarito de ficha de objetos ocultos com círculos vermelhos desenhados à volta dos objetos-alvo de 3 a 5 píxeis maiores que cada objeto',
        caption: 'Gabarito autogerado — anotações de círculos vermelhos marcam objetos ocultos e sem par para autocorreção',
      },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'Como Criar Fichas de Objetos Ocultos com Modos Eu Vejo e Encontra o Diferente, Posicionamento sem Sobreposição e Gabaritos Automáticos — Tutorial Passo a Passo',
  },
};

export default content;
