/**
 * Portuguese SEO Rewrite — App Content Batch 2 (Apps 18-33)
 * Rewrites seo block + hero.title + hero.description
 */
const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/app-content/pt';

const apps = {
  'missing-pieces.ts': {
    seo: {
      primaryKeyword: 'quebra-cabeça peças faltantes para apostilas KDP',
      secondaryKeywords: [
        'gerador de peças faltantes para vender na Hotmart',
        'atividades de puzzle visual para Etsy',
        'quebra-cabeça de completar imagens para Amazon KDP',
        'atividades de peças faltantes com licença comercial',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'peças faltantes', 'puzzle visual', 'download digital',
        'gabarito incluso', 'raciocínio lógico', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Peças faltantes para vender online | LCS',
      metaDescription: 'Crie quebra-cabeças de peças faltantes para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie quebra-cabeças de peças faltantes para vender na Hotmart e KDP',
    heroDescription: 'Crie quebra-cabeças de peças faltantes para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz puzzles visuais onde uma parte da imagem é removida e as crianças devem identificar a peça correta entre várias opções — desenvolvendo atenção visual, raciocínio lógico e habilidades de observação. Com mais de 3.000 ilustrações em 104 temas, você cria variações temáticas ilimitadas. Quebra-cabeças de peças faltantes são perfeitos para apostilas no Amazon KDP e kits de atividades na Hotmart — formato visual que funciona sem texto, ideal para qualquer idioma. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'shadow-match.ts': {
    seo: {
      primaryKeyword: 'atividades de sombras para vender na Etsy',
      secondaryKeywords: [
        'gerador de atividades de sombras para Hotmart',
        'atividades de associar sombras para Amazon KDP',
        'shadow matching com licença comercial',
        'atividades de silhuetas para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'sombras', 'silhuetas', 'associação visual', 'download digital',
        'gabarito incluso', 'percepção visual', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de sombras para vender online | LCS',
      metaDescription: 'Crie atividades de associar sombras para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de sombras para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de associar sombras para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças associam imagens coloridas às suas silhuetas correspondentes — desenvolvendo percepção visual, atenção aos detalhes e habilidades de discriminação de formas. Com mais de 3.000 ilustrações em 104 temas, você cria pacotes temáticos variados. Atividades de sombras são um formato visual universal que não depende de idioma — ampliando seu mercado para o mundo inteiro. Perfeito para kits de atividades na Hotmart e apostilas de habilidades visuais no Amazon KDP. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'picture-path.ts': {
    seo: {
      primaryKeyword: 'labirintos ilustrados para vender na Etsy',
      secondaryKeywords: [
        'gerador de labirintos com imagens para Hotmart',
        'atividades de caminho ilustrado para Amazon KDP',
        'labirintos para crianças com licença comercial',
        'atividades de percurso para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'labirinto', 'percurso', 'caminho', 'download digital',
        'gabarito incluso', 'coordenação motora', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Labirintos ilustrados para vender online | LCS',
      metaDescription: 'Crie labirintos ilustrados para vender na Hotmart, Etsy e KDP. Caminhos temáticos, 104 temas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie labirintos ilustrados para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie labirintos ilustrados para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz atividades de percurso onde as crianças traçam caminhos entre imagens temáticas — combinando coordenação motora com diversão visual. Com mais de 3.000 ilustrações em 104 temas, você cria labirintos únicos para cada produto. "Labirinto para imprimir" é um dos termos de atividades mais buscados no Brasil, com demanda constante o ano inteiro. Perfeito para livros de passatempos no Amazon KDP e kits de coordenação motora na Hotmart. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'picture-sort.ts': {
    seo: {
      primaryKeyword: 'atividades de classificação para negócio na Hotmart',
      secondaryKeywords: [
        'gerador de atividades de classificação para Etsy',
        'atividades de ordenar e agrupar para Amazon KDP',
        'exercícios de categorização com licença comercial',
        'atividades de classificação para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'classificação', 'categorização', 'agrupar', 'download digital',
        'gabarito incluso', 'raciocínio lógico', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de classificação para vender | LCS',
      metaDescription: 'Crie atividades de classificação e categorização para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de classificação para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de classificação e categorização para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças ordenam, agrupam e classificam imagens temáticas por categorias — desenvolvendo raciocínio lógico, pensamento crítico e habilidades de organização. Com mais de 3.000 ilustrações em 104 temas, você cria pacotes temáticos variados para todas as idades. Atividades de classificação são essenciais na educação infantil e ensino fundamental, com demanda alta e constante. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Um formato educativo que vendedores da Hotmart e Kiwify procuram ativamente. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'prepositions.ts': {
    seo: {
      primaryKeyword: 'atividades de preposições para PLE vendedores Etsy',
      secondaryKeywords: [
        'gerador de atividades de preposições para Hotmart',
        'atividades de PLE português língua estrangeira para KDP',
        'exercícios de preposições com imagens licença comercial',
        'atividades de vocabulário PLE para vender online',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'preposições', 'PLE', 'português língua estrangeira', 'download digital',
        'gabarito incluso', 'vocabulário', 'Celpe-Bras',
        'ensino de idiomas', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de preposições PLE para vender | LCS',
      metaDescription: 'Crie atividades de preposições em 11 idiomas para vender na Hotmart, Etsy e KDP. Mega-nicho PLE, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de preposições para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de preposições com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios visuais onde as crianças identificam relações espaciais — em cima, embaixo, dentro, fora, ao lado — usando imagens temáticas como contexto. O mega-nicho: PLE (Português como Língua Estrangeira) é um mercado global em explosão. O português é a 6ª língua mais falada do mundo e o Celpe-Bras é aplicado em mais de 100 países. Atividades de preposições em português se vendem para escolas de idiomas e professores no mundo inteiro. Com 11 idiomas e mais de 3.000 imagens, exporte PDFs a 300 DPI com gabarito e licença comercial. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'coloring.ts': {
    seo: {
      primaryKeyword: 'gerador de desenhos para colorir para vender na Etsy e KDP',
      secondaryKeywords: [
        'criar páginas para colorir para Hotmart',
        'gerador de atividades de colorir para Amazon KDP',
        'desenhos para colorir com licença comercial',
        'livros de colorir para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'desenho para colorir', 'página para colorir', 'download digital',
        'livro de colorir', 'coordenação motora', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', 'Amazon KDP',
      ],
      titleTag: 'Desenhos para colorir para vender online | LCS',
      metaDescription: 'Crie desenhos para colorir para vender na Hotmart, Etsy e KDP. 104 temas, modo escala de cinza, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie desenhos para colorir para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie desenhos para colorir para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz páginas para colorir com imagens temáticas de mais de 3.000 ilustrações em 104 temas — animais, veículos, alimentos, natureza e muito mais. O modo escala de cinza produz páginas econômicas em tinta, perfeitas para interiores de livros na Amazon KDP. Livros de colorir são um dos nichos MAIS lucrativos no KDP: baixo investimento, alta demanda, produção rápida. Na Hotmart e Kiwify, kits de desenhos para colorir temáticos vendem extremamente bem para pais e professores. Adicione linhas de caligrafia e campo de nome para criar atividades multicompetências. Exporte PDFs a 300 DPI com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'draw-and-color.ts': {
    seo: {
      primaryKeyword: 'atividades de desenho e pintura para vender online',
      secondaryKeywords: [
        'gerador de atividades de desenhar e colorir para Hotmart',
        'atividades de arte para crianças para Etsy',
        'exercícios de desenho com licença comercial para KDP',
        'atividades de desenho para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'desenhar e colorir', 'arte', 'criatividade', 'download digital',
        'coordenação motora', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de desenho e pintura para vender | LCS',
      metaDescription: 'Crie atividades de desenho e pintura para vender na Hotmart, Etsy e KDP. 104 temas, canvas livre, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de desenho e pintura para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de desenho e pintura para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz páginas de atividades artísticas onde as crianças desenham, pintam e completam cenas visuais usando imagens temáticas como inspiração. Com mais de 3.000 ilustrações em 104 temas e ferramentas de canvas livre, você cria atividades de arte únicas. Atividades de desenho e pintura são extremamente populares entre pais e professores — desenvolvem coordenação motora fina, criatividade e expressão artística. Perfeito para kits de arte na Hotmart e livros de atividades artísticas no Amazon KDP. Exporte PDFs a 300 DPI com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'alphabet-train.ts': {
    seo: {
      primaryKeyword: 'atividades de alfabeto para vender na Etsy e KDP',
      secondaryKeywords: [
        'gerador de trem do alfabeto para Hotmart',
        'atividades de reconhecimento de letras para Amazon KDP',
        'atividades de alfabetização com licença comercial',
        'trem do alfabeto para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'alfabeto', 'trem de letras', 'alfabetização', 'download digital',
        'gabarito incluso', 'reconhecimento de letras', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', '11 idiomas',
      ],
      titleTag: 'Atividades de alfabeto para vender online | LCS',
      metaDescription: 'Crie atividades de trem do alfabeto para vender na Hotmart, Etsy e KDP. 11 idiomas, associação letra-imagem. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de alfabeto para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de trem do alfabeto para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Alfabetização" é um dos termos educativos MAIS buscados no Brasil — e este gerador cria atividades de reconhecimento de letras únicas no mercado. Onze vagões coloridos percorrem a página, cada um com uma letra e uma ilustração correspondente. A verdadeira potência: suporte a 11 alfabetos nativos. A mesma imagem associa-se com letras diferentes em cada idioma — "cão" associa-se com C em português mas com D em inglês e H em alemão. Um único modelo gera 11 produtos únicos. Com mais de 3.000 imagens em 104 temas, exporte PDFs a 300 DPI com gabarito e licença comercial. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'bingo.ts': {
    seo: {
      primaryKeyword: 'criador de cartelas de bingo para vender na Etsy',
      secondaryKeywords: [
        'gerador de bingo com imagens para Hotmart',
        'cartelas de bingo para vender na Amazon KDP',
        'bingo educativo com licença comercial',
        'cartelas de bingo para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'bingo', 'cartelas de bingo', 'jogo educativo', 'download digital',
        'folha de chamada', 'exportação ZIP', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Cartelas de bingo para vender online | LCS',
      metaDescription: 'Crie cartelas de bingo com imagens para vender na Hotmart, Etsy e KDP. Lote até 10 cartelas, exportação ZIP. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie cartelas de bingo para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie cartelas de bingo com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz de 1 a 10 cartelas únicas por lote — cada uma com diferentes imagens em diferentes posições, essencial para que o bingo funcione como jogo. Grelhas configuráveis de 3×3 a 5×5, modo de preenchimento com imagens ou palavras, e exportação ZIP de todas as cartelas num único clique. Bingo educativo é um nicho de altíssima demanda: professores, pais e festas infantis precisam de cartelas constantemente. Com mais de 3.000 imagens em 104 temas e 11 idiomas, você cria jogos únicos para qualquer ocasião. Exporte PDFs a 300 DPI com folha de chamada e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'pattern-train.ts': {
    seo: {
      primaryKeyword: 'atividades de sequências para negócio de imprimíveis',
      secondaryKeywords: [
        'gerador de atividades de padrões para Hotmart',
        'atividades de sequência lógica para vender na Etsy',
        'exercícios de completar sequências para Amazon KDP',
        'atividades de trem de padrões com licença comercial',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'sequências', 'padrões', 'raciocínio lógico', 'download digital',
        'gabarito incluso', 'matemática visual', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de sequências para vender online | LCS',
      metaDescription: 'Crie atividades de sequências e padrões para vender na Hotmart, Etsy e KDP. Trem de padrões visual, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de sequências para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de sequências e padrões para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios de trem de padrões onde as crianças identificam e completam sequências visuais — vagões com imagens temáticas seguem um padrão e o último vagão está vazio para ser preenchido. Desenvolve raciocínio lógico, reconhecimento de padrões e pensamento matemático. Com mais de 3.000 imagens em 104 temas, você cria variações ilimitadas. Atividades de sequências são fundamentais na educação infantil e ensino fundamental — um produto essencial para qualquer catálogo de imprimíveis. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'pattern-worksheet.ts': {
    seo: {
      primaryKeyword: 'atividades de reconhecimento de padrões para vendedores Etsy',
      secondaryKeywords: [
        'gerador de atividades de padrões para Hotmart',
        'exercícios de padrões visuais para Amazon KDP',
        'atividades de reconhecimento de padrões com licença comercial',
        'atividades de padrões para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'padrões', 'reconhecimento visual', 'raciocínio lógico', 'download digital',
        'gabarito incluso', 'matemática visual', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de padrões para vender online | LCS',
      metaDescription: 'Crie atividades de reconhecimento de padrões para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de padrões para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de reconhecimento de padrões para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças identificam, continuam e completam padrões visuais usando imagens temáticas — uma habilidade fundamental em matemática e raciocínio lógico. Com mais de 3.000 ilustrações em 104 temas, você cria exercícios com dificuldade progressiva. Atividades de padrões são essenciais na BNCC e exigidas em todas as séries iniciais do ensino fundamental. Perfeito para kits de matemática na Hotmart e apostilas de raciocínio lógico no Amazon KDP. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'treasure-hunt.ts': {
    seo: {
      primaryKeyword: 'gerador de caça ao tesouro para Etsy e KDP',
      secondaryKeywords: [
        'criar atividades de caça ao tesouro para Hotmart',
        'jogo de caça ao tesouro imprimível para Amazon KDP',
        'atividades de caça ao tesouro com licença comercial',
        'caça ao tesouro para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'caça ao tesouro', 'jogo de pistas', 'download digital',
        'gabarito incluso', 'atenção visual', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Caça ao tesouro para vender online | LCS',
      metaDescription: 'Crie atividades de caça ao tesouro para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de caça ao tesouro para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de caça ao tesouro para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz jogos de pistas visuais onde as crianças seguem um caminho de imagens temáticas para encontrar o tesouro — combinando atenção visual, contagem e diversão. Com mais de 3.000 ilustrações em 104 temas, você cria aventuras únicas para cada produto. Caça ao tesouro é um formato adorado por crianças e extremamente popular em festas infantis e atividades escolares. Perfeito para kits de jogos na Hotmart e livros de atividades no Amazon KDP. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'sudoku.ts': {
    seo: {
      primaryKeyword: 'gerador de sudoku com imagens para livros KDP',
      secondaryKeywords: [
        'criar sudoku para crianças para Hotmart',
        'gerador de sudoku visual para vender na Etsy',
        'livros de sudoku com imagens para Amazon KDP',
        'sudoku infantil com licença comercial',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'sudoku', 'sudoku visual', 'raciocínio lógico', 'download digital',
        'gabarito incluso', 'jogos de lógica', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', 'Amazon KDP',
      ],
      titleTag: 'Sudoku com imagens para vender no KDP | LCS',
      metaDescription: 'Crie sudoku com imagens para vender na Hotmart, Etsy e KDP. Grades visuais para crianças, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie sudoku com imagens para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie sudoku com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz puzzles de sudoku onde os números são substituídos por imagens temáticas — tornando o jogo acessível para crianças que ainda não dominam números. Com mais de 3.000 ilustrações em 104 temas, você cria livros inteiros de sudoku visual. Livros de sudoku são um dos nichos MAIS lucrativos no Amazon KDP, e a versão com imagens para crianças tem competição mínima em português. Perfeito para livros de raciocínio lógico no KDP e kits de jogos educativos na Hotmart. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'big-small.ts': {
    seo: {
      primaryKeyword: 'atividades de grande e pequeno para vender online',
      secondaryKeywords: [
        'gerador de atividades de tamanhos para Hotmart',
        'atividades de comparação de tamanho para Etsy',
        'exercícios de grande e pequeno para Amazon KDP',
        'atividades de tamanhos com licença comercial',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'grande e pequeno', 'comparação de tamanhos', 'download digital',
        'gabarito incluso', 'conceitos matemáticos', 'educação infantil',
        'pré-escola', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades grande e pequeno para vender | LCS',
      metaDescription: 'Crie atividades de grande e pequeno para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de grande e pequeno para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de comparação de tamanhos para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças identificam e comparam grande, médio e pequeno usando imagens temáticas — uma habilidade fundamental na educação infantil e pré-escola. Com mais de 3.000 ilustrações em 104 temas, você cria pacotes temáticos variados. Atividades de comparação de tamanhos são básicas no currículo de educação infantil e têm demanda constante entre pais e professores brasileiros. Perfeito para kits de educação infantil na Hotmart e apostilas de conceitos matemáticos no Amazon KDP. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'more-less.ts': {
    seo: {
      primaryKeyword: 'atividades de maior e menor para vender na Etsy',
      secondaryKeywords: [
        'gerador de atividades de comparação para Hotmart',
        'exercícios de mais e menos para Amazon KDP',
        'atividades de maior menor igual com licença comercial',
        'atividades de comparação numérica para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'maior e menor', 'comparação', 'mais e menos', 'download digital',
        'gabarito incluso', 'conceitos matemáticos', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades maior e menor para vender | LCS',
      metaDescription: 'Crie atividades de maior e menor para vender na Hotmart, Etsy e KDP. Comparação visual, 104 temas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de maior e menor para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de maior e menor para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios de comparação visual onde as crianças determinam qual grupo tem mais ou menos imagens — desenvolvendo conceitos fundamentais de quantidade, comparação e pré-numeracia. Com mais de 3.000 ilustrações em 104 temas, você cria pacotes temáticos ilimitados. Atividades de "mais e menos" são essenciais no currículo de educação infantil e ensino fundamental, com demanda constante o ano inteiro. Perfeito para kits de matemática na Hotmart e apostilas de conceitos numéricos no Amazon KDP. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'odd-one-out.ts': {
    seo: {
      primaryKeyword: 'atividades de encontre o intruso para vender na Etsy e KDP',
      secondaryKeywords: [
        'gerador de encontre o diferente para Hotmart',
        'atividades de intruso para vender na Amazon KDP',
        'exercícios de encontrar o diferente com licença comercial',
        'encontre o intruso para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'encontre o intruso', 'encontre o diferente', 'download digital',
        'gabarito incluso', 'raciocínio lógico', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Encontre o intruso para vender online | LCS',
      metaDescription: 'Crie atividades de encontre o intruso para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático. Teste grátis com marca d\\\'água — sem cadastro.',
    },
    heroTitle: 'Crie atividades de encontre o intruso para vender na Hotmart e KDP',
    heroDescription: 'Crie atividades de encontre o intruso para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças observam um grupo de imagens e identificam qual não pertence ao conjunto — desenvolvendo raciocínio lógico, categorização e atenção aos detalhes. Com mais de 3.000 ilustrações em 104 temas, você cria variações ilimitadas com diferentes níveis de dificuldade. "Encontre o diferente" é um dos formatos de atividades mais populares entre crianças e pais. Perfeito para livros de passatempos no Amazon KDP e kits de raciocínio lógico na Hotmart. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
};

// Apply SEO rewrites (same logic as batch 1)
let modified = 0;
for (const [file, data] of Object.entries(apps)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`  SKIP ${file} — not found`); continue; }
  let content = fs.readFileSync(fp, 'utf8');

  // Build new SEO block
  const secondaryStr = data.seo.secondaryKeywords.map(k => `      '${k}',`).join('\n');
  const lsiStr = data.seo.lsiKeywords.map(k => `      '${k}',`).join('\n');

  const newSeo = `  seo: {\n    primaryKeyword: '${data.seo.primaryKeyword}',\n    secondaryKeywords: [\n${secondaryStr}\n    ],\n    lsiKeywords: [\n${lsiStr}\n    ],\n    titleTag: '${data.seo.titleTag}',\n    metaDescription:\n      '${data.seo.metaDescription}',\n  },`;

  // Handle both CRLF and LF in the seo block regex
  const seoRegex = /  seo: \{[\s\S]*?\r?\n  \},/;
  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, newSeo);
  } else {
    console.log(`  WARN ${file} — could not match seo block`);
    continue;
  }

  // Replace hero.title
  const heroIdx = content.indexOf('hero: {');
  if (heroIdx !== -1) {
    const titlePrefix = "title: '";
    const titleStart = content.indexOf(titlePrefix, heroIdx);
    if (titleStart !== -1) {
      const valStart = titleStart + titlePrefix.length;
      let valEnd = -1;
      for (let i = valStart; i < content.length; i++) {
        if (content[i] === '\\' && i + 1 < content.length) { i++; continue; }
        if (content[i] === "'") { valEnd = i; break; }
      }
      if (valEnd !== -1) {
        content = content.substring(0, valStart) + data.heroTitle + content.substring(valEnd);
      }
    }

    // Replace hero.description (handle CRLF)
    const descMarkers = ['description:\r\n      \'', 'description:\n      \'', 'description: \''];
    let descStart = -1, prefLen = 0;
    for (const marker of descMarkers) {
      descStart = content.indexOf(marker, heroIdx);
      if (descStart !== -1) { prefLen = marker.length; break; }
    }
    if (descStart !== -1) {
      const dValStart = descStart + prefLen;
      let dValEnd = -1;
      for (let i = dValStart; i < content.length; i++) {
        if (content[i] === '\\' && i + 1 < content.length) { i++; continue; }
        if (content[i] === "'") { dValEnd = i; break; }
      }
      if (dValEnd !== -1) {
        content = content.substring(0, dValStart) + data.heroDescription + content.substring(dValEnd);
      }
    }
  }

  fs.writeFileSync(fp, content, 'utf8');
  modified++;

  // Validate lengths
  const titleLen = data.seo.titleTag.replace(/\\'/g, "'").length;
  const metaLen = data.seo.metaDescription.replace(/\\'/g, "'").length;
  const h1Len = data.heroTitle.length;
  const warnings = [];
  if (titleLen > 60) warnings.push(`title=${titleLen}`);
  if (metaLen > 155) warnings.push(`meta=${metaLen}`);
  if (h1Len > 70) warnings.push(`H1=${h1Len}`);
  const warn = warnings.length ? ` ⚠ ${warnings.join(', ')}` : '';
  console.log(`  ✓ ${file}${warn}`);
}
console.log(`\nModified: ${modified}/${Object.keys(apps).length} files`);
