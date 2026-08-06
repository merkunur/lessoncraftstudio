/**
 * Portuguese SEO Rewrite — Guide Content: Product Creation Guides (25 files)
 */
const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/guide-content/pt';

const guides = {
  'create-addition-worksheets.ts': {
    pk: 'criar atividades de adição para vender', title: 'Criar atividades de adição para vender | LCS',
    meta: 'Guia passo a passo para criar atividades de adição para vender na Hotmart, Etsy e KDP. Temas, dificuldade, pacotes e preços.',
    h1: 'Como criar atividades de adição para vender — guia completo',
    desc: 'Aprenda a criar atividades de adição profissionais para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia passo a passo cobre cada etapa: escolher o grupo etário alvo, configurar a dificuldade, selecionar temas visuais que aumentam vendas, gerar gabaritos automáticos e exportar PDFs prontos para impressão. Atividades de adição são um dos imprimíveis mais vendidos — demanda o ano inteiro, múltiplos grupos etários e infinitas variações temáticas. Com o gerador do LessonCraftStudio, você cria produtos profissionais em minutos com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-subtraction-worksheets.ts': {
    pk: 'criar atividades de subtração para vender', title: 'Atividades de subtração para vender | LCS',
    meta: 'Guia para criar atividades de subtração para vender. Modo riscar visual, temas, dificuldade e estratégias de pacotes.',
    h1: 'Como criar atividades de subtração para vender online',
    desc: 'Aprenda a criar atividades de subtração para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: o exclusivo modo riscar visual que torna a subtração intuitiva, como configurar dificuldade por grupo etário, escolher temas que vendem e criar pacotes combinados de adição e subtração que aumentam o valor médio. Vendedores relatam vendas significativamente maiores com pacotes matemáticos combinados. Com o gerador do LessonCraftStudio, cada atividade inclui gabarito automático e exportação a 300 DPI com licença comercial. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-word-search-puzzles.ts': {
    pk: 'criar caça-palavras com imagens para vender', title: 'Caça-palavras com imagens para vender | LCS',
    meta: 'Guia para criar caça-palavras com imagens para vender. Grades, temas, dificuldade e estratégias para Hotmart, Etsy e KDP.',
    h1: 'Como criar caça-palavras com imagens para vender online',
    desc: 'Aprenda a criar caça-palavras com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Caça-palavras" é um dos termos mais buscados em português — e este guia ensina a criar produtos que capturam essa demanda. Cobre: configurar grades de 5×5 a 30×30, usar imagens como pistas visuais, ajustar dificuldade com diagonais e invertidas, criar livros de caça-palavras para KDP e montar pacotes temáticos para Etsy. O diferencial: 11 idiomas com letras nativas. Com o LessonCraftStudio, gabarito colorido automático e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-crossword-puzzles.ts': {
    pk: 'criar palavras cruzadas para vender online', title: 'Palavras cruzadas para vender online | LCS',
    meta: 'Guia para criar palavras cruzadas com imagens para vender. Pistas visuais, 11 idiomas e estratégias para Hotmart e KDP.',
    h1: 'Como criar palavras cruzadas para vender online',
    desc: 'Aprenda a criar palavras cruzadas com pistas visuais para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Cruzadinha" e "palavras cruzadas" são termos de altíssima busca no Brasil. Este guia cobre: como usar imagens como pistas em vez de texto, criar grades em 11 idiomas, montar livros de passatempos para KDP e precificar pacotes temáticos. Palavras cruzadas com imagens são um formato único que se destaca da concorrência. Com o LessonCraftStudio, cada puzzle inclui gabarito automático e exportação a 300 DPI com licença comercial. Teste grátis com marca d\\\'água.',
  },
  'create-math-puzzle-worksheets.ts': {
    pk: 'criar quebra-cabeças de matemática para vender', title: 'Quebra-cabeças de matemática para vender | LCS',
    meta: 'Guia para criar quebra-cabeças de matemática com imagens para vender. Raciocínio lógico, grades visuais e estratégias.',
    h1: 'Como criar quebra-cabeças de matemática para vender',
    desc: 'Aprenda a criar quebra-cabeças de matemática com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como funciona o formato de puzzle algébrico visual, configurar intervalos de dificuldade, escolher temas que atraem compradores e criar séries progressivas. Quebra-cabeças de matemática são um nicho de alta margem — combinam raciocínio lógico com fluência matemática num formato que crianças adoram. Competição mínima em português. Com o LessonCraftStudio, gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-handwriting-sheets.ts': {
    pk: 'criar atividades de caligrafia para vender', title: 'Atividades de caligrafia para vender | LCS',
    meta: 'Guia para criar atividades de caligrafia e traçado de letras para vender. 5 modos, 11 idiomas, coordenação motora.',
    h1: 'Como criar atividades de caligrafia para vender online',
    desc: 'Aprenda a criar atividades de caligrafia e traçado de letras para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Coordenação motora" e "alfabetização" estão entre os termos educativos mais buscados no Brasil — e este guia ensina a criar produtos que atendem essa demanda massiva. Cobre: cinco modos de escrita, como configurar para diferentes faixas etárias, escolher fontes adequadas, criar apostilas de alfabetização para KDP e kits de coordenação motora para Hotmart. Com o LessonCraftStudio, suporte a 11 idiomas e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-coloring-pages.ts': {
    pk: 'criar desenhos para colorir para Etsy e KDP', title: 'Desenhos para colorir para Etsy e KDP | LCS',
    meta: 'Guia para criar desenhos para colorir para vender no Etsy e KDP. Temas, escala de cinza, livros de colorir e preços.',
    h1: 'Como criar desenhos para colorir para Etsy e Amazon KDP',
    desc: 'Aprenda a criar desenhos para colorir para vender no Etsy e Amazon KDP — um dos nichos mais lucrativos de imprimíveis. Este guia cobre: como usar o modo escala de cinza para interiores de livros KDP, escolher temas que vendem o ano inteiro, criar pacotes temáticos para Etsy, adicionar linhas de caligrafia para atividades multicompetências e precificar livros de colorir. Livros de colorir são o produto de menor esforço e maior retorno no KDP. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-bingo-cards.ts': {
    pk: 'criar cartelas de bingo com imagens para vender', title: 'Cartelas de bingo para vender online | LCS',
    meta: 'Guia para criar cartelas de bingo com imagens para vender. Lote, exportação ZIP, folha de chamada e estratégias.',
    h1: 'Como criar cartelas de bingo com imagens para vender',
    desc: 'Aprenda a criar cartelas de bingo com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como gerar lotes de até 10 cartelas únicas, configurar grades de 3×3 a 5×5, usar a exportação ZIP para pacotes completos, criar folhas de chamada e precificar jogos de bingo temáticos. Bingo educativo tem demanda altíssima: professores, festas infantis e atividades em família. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e 11 idiomas com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-matching-worksheets.ts': {
    pk: 'criar atividades de associação para vender', title: 'Atividades de associação para vender | LCS',
    meta: 'Guia para criar atividades de ligar e associar para vender. Temas, formatos e estratégias para Hotmart, Etsy e KDP.',
    h1: 'Como criar atividades de associação para vender online',
    desc: 'Aprenda a criar atividades de ligar e associar para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar diferentes formatos de associação (imagem-imagem, imagem-palavra, imagem-número), escolher temas atrativos, criar pacotes por faixa etária e montar apostilas de associação para KDP. Atividades de associação são universais — funcionam para qualquer idioma e faixa etária, tornando-as um produto básico essencial. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-pattern-worksheets.ts': {
    pk: 'criar atividades de padrões para vender', title: 'Atividades de padrões para vender online | LCS',
    meta: 'Guia para criar atividades de reconhecimento de padrões para vender. Sequências visuais, raciocínio lógico e estratégias.',
    h1: 'Como criar atividades de padrões para vender online',
    desc: 'Aprenda a criar atividades de reconhecimento de padrões para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como criar sequências visuais com dificuldade progressiva, usar temas temáticos para variação, montar pacotes de raciocínio lógico e criar apostilas de padrões para KDP. Atividades de padrões são essenciais na BNCC e exigidas em todas as séries iniciais — demanda constante garantida. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-picture-sudoku.ts': {
    pk: 'criar sudoku com imagens para vender', title: 'Sudoku com imagens para vender online | LCS',
    meta: 'Guia para criar sudoku com imagens para vender. Grades visuais para crianças, livros KDP e estratégias de nicho.',
    h1: 'Como criar sudoku com imagens para vender online',
    desc: 'Aprenda a criar sudoku com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Sudoku visual substitui números por imagens temáticas, tornando o jogo acessível para crianças. Este guia cobre: como configurar grades, criar progressão de dificuldade, montar livros de sudoku para KDP (um dos nichos mais lucrativos), e precificar pacotes temáticos. Competição mínima em português para sudoku com imagens. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-maze-worksheets.ts': {
    pk: 'criar labirintos para vender no Etsy', title: 'Labirintos para vender no Etsy — guia | LCS',
    meta: 'Guia para criar labirintos ilustrados para vender. Caminhos temáticos, coordenação motora e estratégias para Etsy e KDP.',
    h1: 'Como criar labirintos ilustrados para vender no Etsy',
    desc: 'Aprenda a criar labirintos ilustrados para vender no Etsy, Hotmart ou Amazon KDP. "Labirinto para imprimir" é um dos termos de atividades mais buscados no Brasil. Este guia cobre: como criar percursos temáticos com imagens, ajustar complexidade por faixa etária, montar livros de labirintos para KDP e precificar pacotes. Labirintos desenvolvem coordenação motora e são adorados por crianças de todas as idades. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-hidden-object-worksheets.ts': {
    pk: 'criar ache e encontre para vender', title: 'Ache e encontre para vender online | LCS',
    meta: 'Guia para criar atividades de ache e encontre para vender. Cenas visuais, temas e estratégias para Hotmart e KDP.',
    h1: 'Como criar atividades de ache e encontre para vender',
    desc: 'Aprenda a criar atividades de ache e encontre para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como compor cenas visuais envolventes, escolher temas que atraem compradores, criar variações de dificuldade e montar livros de ache e encontre para KDP. Atividades de objetos escondidos são extremamente populares e não dependem de idioma — perfeitas para mercados globais. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-size-comparison-worksheets.ts': {
    pk: 'criar atividades de comparação para vender', title: 'Atividades de comparação para vender | LCS',
    meta: 'Guia para criar atividades de comparação de tamanhos para vender. Grande e pequeno, educação infantil e estratégias.',
    h1: 'Como criar atividades de comparação de tamanhos para vender',
    desc: 'Aprenda a criar atividades de comparação de tamanhos para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar exercícios de grande, médio e pequeno, usar temas visuais atrativos, criar pacotes para educação infantil e montar apostilas de conceitos matemáticos para KDP. Atividades de comparação são básicas no currículo de educação infantil e têm demanda constante. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-counting-worksheets.ts': {
    pk: 'criar atividades de contagem para vender no Etsy', title: 'Atividades de contagem para vender | LCS',
    meta: 'Guia para criar atividades de contagem e gráficos para vender. Pictogramas, estatística infantil e estratégias.',
    h1: 'Como criar atividades de contagem para vender online',
    desc: 'Aprenda a criar atividades de contagem e gráficos para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como criar exercícios de pictogramas e gráficos de barras, configurar para diferentes faixas etárias, alinhar com a BNCC e montar pacotes de estatística infantil. Atividades de contagem e interpretação de dados são cada vez mais exigidas nas escolas brasileiras. Com o LessonCraftStudio, gabarito automático com células destacadas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-drawing-worksheets.ts': {
    pk: 'criar atividades de desenho para vender', title: 'Atividades de desenho para vender online | LCS',
    meta: 'Guia para criar atividades de desenho e pintura para vender. Canvas livre, temas e estratégias para Hotmart e KDP.',
    h1: 'Como criar atividades de desenho para vender online',
    desc: 'Aprenda a criar atividades de desenho e pintura para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como usar o canvas livre para criar propostas artísticas, combinar desenho com colorir, adicionar elementos educativos e montar kits de arte temáticos. Atividades de desenho desenvolvem coordenação motora, criatividade e expressão — habilidades valorizadas por pais e professores. Com o LessonCraftStudio, mais de 3.000 imagens de inspiração em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-sorting-worksheets.ts': {
    pk: 'criar atividades de classificação para vender', title: 'Atividades de classificação para vender | LCS',
    meta: 'Guia para criar atividades de classificação e categorização para vender. Raciocínio lógico e estratégias.',
    h1: 'Como criar atividades de classificação para vender',
    desc: 'Aprenda a criar atividades de classificação e categorização para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como criar exercícios de ordenar e agrupar por categorias, usar temas visuais para variação, criar pacotes por faixa etária e montar apostilas de raciocínio lógico para KDP. Classificação é uma habilidade cognitiva fundamental exigida pela BNCC desde a educação infantil. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-shadow-matching-worksheets.ts': {
    pk: 'criar atividades de sombras para vender', title: 'Atividades de sombras para vender online | LCS',
    meta: 'Guia para criar atividades de associar sombras para vender. Percepção visual, temas e estratégias de mercado.',
    h1: 'Como criar atividades de sombras para vender online',
    desc: 'Aprenda a criar atividades de associar sombras para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar exercícios de associação imagem-silhueta, escolher temas atrativos, criar variações de dificuldade e montar pacotes temáticos. Atividades de sombras são um formato visual universal que não depende de idioma — ampliando seu mercado para o mundo inteiro. Perfeitas para educação infantil e desenvolvimento de percepção visual. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-odd-one-out-puzzles.ts': {
    pk: 'criar encontre o intruso para vender', title: 'Encontre o intruso para vender online | LCS',
    meta: 'Guia para criar atividades de encontre o intruso para vender. Raciocínio lógico, categorização e estratégias.',
    h1: 'Como criar atividades de encontre o intruso para vender',
    desc: 'Aprenda a criar atividades de encontre o intruso para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar exercícios com diferentes níveis de dificuldade, escolher temas que atraem compradores, criar pacotes de raciocínio lógico e montar livros de passatempos para KDP. "Encontre o diferente" é um dos formatos mais populares entre crianças — desenvolve categorização, atenção e raciocínio lógico. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-missing-pieces-puzzles.ts': {
    pk: 'criar quebra-cabeça peças faltantes para vender', title: 'Peças faltantes para vender online | LCS',
    meta: 'Guia para criar quebra-cabeças de peças faltantes para vender. Puzzles visuais, apostilas KDP e estratégias.',
    h1: 'Como criar quebra-cabeças de peças faltantes para vender',
    desc: 'Aprenda a criar quebra-cabeças de peças faltantes para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar puzzles onde as crianças identificam a peça correta, criar variações de dificuldade, escolher temas atrativos e montar apostilas de puzzles visuais para KDP. Formato visual que não depende de idioma — ideal para mercados globais. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-treasure-hunt-worksheets.ts': {
    pk: 'criar caça ao tesouro para vender', title: 'Caça ao tesouro para vender online | LCS',
    meta: 'Guia para criar atividades de caça ao tesouro para vender. Jogos de pistas, temas e estratégias para Hotmart e KDP.',
    h1: 'Como criar atividades de caça ao tesouro para vender',
    desc: 'Aprenda a criar atividades de caça ao tesouro para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar jogos de pistas visuais, escolher temas que encantam crianças, criar variações de dificuldade e montar pacotes temáticos. Caça ao tesouro é um formato adorado por crianças e extremamente popular em festas infantis e atividades escolares. Com o LessonCraftStudio, mais de 3.000 imagens em 104 temas e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-alphabet-worksheets.ts': {
    pk: 'criar atividades de alfabeto para vender no Etsy', title: 'Atividades de alfabeto para vender | LCS',
    meta: 'Guia para criar atividades de alfabeto e reconhecimento de letras para vender. Alfabetização, 11 idiomas e estratégias.',
    h1: 'Como criar atividades de alfabeto para vender online',
    desc: 'Aprenda a criar atividades de alfabeto para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Alfabetização" é um dos termos educativos mais buscados no Brasil — e este guia ensina a criar produtos que atendem essa demanda. Cobre: como usar o trem do alfabeto com associação letra-imagem, configurar para diferentes faixas etárias, aproveitar os 11 idiomas para multiplicar produtos e montar kits de alfabetização. Com o LessonCraftStudio, mais de 3.000 imagens e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-preposition-worksheets.ts': {
    pk: 'criar atividades de preposições PLE para vender', title: 'Atividades de preposições PLE para vender | LCS',
    meta: 'Guia para criar atividades de preposições para PLE e vender. Mega-nicho global, 11 idiomas e estratégias.',
    h1: 'Como criar atividades de preposições PLE para vender',
    desc: 'Aprenda a criar atividades de preposições para vender na Hotmart, Kiwify, Etsy ou Amazon KDP — com foco no mega-nicho de PLE (Português como Língua Estrangeira). O português é a 6ª língua mais falada do mundo e o Celpe-Bras é aplicado em mais de 100 países. Este guia cobre: como criar exercícios de relações espaciais com imagens, usar os 11 idiomas para alcançar professores de PLE no mundo inteiro e montar kits de vocabulário. Com o LessonCraftStudio, licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-cryptogram-puzzles.ts': {
    pk: 'criar criptogramas para vender', title: 'Criptogramas para vender online | LCS',
    meta: 'Guia para criar criptogramas com imagens para vender. Puzzles de decifrar, 11 idiomas e estratégias de nicho.',
    h1: 'Como criar criptogramas para vender online',
    desc: 'Aprenda a criar criptogramas com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como configurar puzzles de substituição de letras, usar imagens como símbolos, criar progressão de dificuldade e montar livros de criptogramas para KDP. Criptogramas são um nicho de alta margem com competição mínima em português — adultos e crianças adoram desafios de decifração. Com o LessonCraftStudio, 11 alfabetos nativos e mais de 3.000 imagens com licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
  'create-chart-count-worksheets.ts': {
    pk: 'criar atividades de gráficos para vender', title: 'Atividades de gráficos para vender | LCS',
    meta: 'Guia para criar atividades de gráficos e pictogramas para vender. Estatística infantil, BNCC e estratégias.',
    h1: 'Como criar atividades de gráficos para vender online',
    desc: 'Aprenda a criar atividades de gráficos pictóricos para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este guia cobre: como criar exercícios de contagem e gráficos de barras, alinhar com as competências de estatística da BNCC, montar pacotes temáticos e precificar para diferentes plataformas. Atividades de interpretação de dados são cada vez mais exigidas nas escolas brasileiras e pouco exploradas por vendedores de imprimíveis. Com o LessonCraftStudio, gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água.',
  },
};

// Generic secondary keywords and LSI for create guides
function getSK(pk) {
  const base = pk.replace('criar ', '').replace(' para vender', '').replace(' no Etsy', '').replace(' PLE', '');
  return [
    `como criar ${base} para Hotmart`,
    `${base} para vender na Etsy`,
    `guia ${base} para Amazon KDP`,
    `${base} com licença comercial para vender`,
  ];
}
function getLSI(topic) {
  return ['licença comercial', '300 DPI', 'pronto para impressão', 'download digital', 'gabarito incluso',
    'Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'educação infantil'];
}

let modified = 0;
for (const [file, data] of Object.entries(guides)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`  SKIP ${file} — not found`); continue; }
  let content = fs.readFileSync(fp, 'utf8');

  const sk = getSK(data.pk);
  const lsi = getLSI(data.pk);
  const skStr = sk.map(k => `      '${k}',`).join('\n');
  const lsiStr = lsi.map(k => `      '${k}',`).join('\n');
  const newSeo = `  seo: {\n    primaryKeyword: '${data.pk}',\n    secondaryKeywords: [\n${skStr}\n    ],\n    lsiKeywords: [\n${lsiStr}\n    ],\n    titleTag: '${data.title}',\n    metaDescription:\n      '${data.meta}',\n  },`;

  const seoRegex = /  seo: \{[\s\S]*?\r?\n  \},/;
  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, newSeo);
  } else { console.log(`  WARN ${file} — seo block`); continue; }

  const heroIdx = content.indexOf('hero: {');
  if (heroIdx !== -1) {
    const tp = "title: '";
    const ts = content.indexOf(tp, heroIdx);
    if (ts !== -1) {
      const vs = ts + tp.length;
      let ve = -1;
      for (let i = vs; i < content.length; i++) { if (content[i]==='\\' && i+1<content.length){i++;continue;} if (content[i]==="'"){ve=i;break;} }
      if (ve !== -1) content = content.substring(0, vs) + data.h1 + content.substring(ve);
    }
    const markers = ['description:\r\n      \'', 'description:\n      \'', 'description: \''];
    let ds = -1, pl = 0;
    for (const m of markers) { ds = content.indexOf(m, heroIdx); if (ds !== -1) { pl = m.length; break; } }
    if (ds !== -1) {
      const dvs = ds + pl;
      let dve = -1;
      for (let i = dvs; i < content.length; i++) { if (content[i]==='\\' && i+1<content.length){i++;continue;} if (content[i]==="'"){dve=i;break;} }
      if (dve !== -1) content = content.substring(0, dvs) + data.desc + content.substring(dve);
    }
  }

  fs.writeFileSync(fp, content, 'utf8');
  modified++;
  const tl = data.title.replace(/\\'/g,"'").length;
  const ml = data.meta.replace(/\\'/g,"'").length;
  const hl = data.h1.length;
  const w = [];
  if (tl>60) w.push('title='+tl);
  if (ml>155) w.push('meta='+ml);
  if (hl>70) w.push('H1='+hl);
  console.log(`  ✓ ${file}${w.length?' ⚠ '+w.join(', '):''}`);
}
console.log(`\nModified: ${modified}/${Object.keys(guides).length} files`);
