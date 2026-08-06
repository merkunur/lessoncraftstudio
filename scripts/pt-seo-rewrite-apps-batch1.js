/**
 * Portuguese SEO Rewrite — App Content Batch 1 (Apps 1-17)
 * Rewrites seo block + hero.title + hero.description per SEO prompt specs
 */
const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/app-content/pt';

const apps = {
  'addition.ts': {
    seo: {
      primaryKeyword: 'criar atividades de adição para vender na Hotmart e Etsy',
      secondaryKeywords: [
        'gerador de atividades de soma para vendedores Etsy',
        'atividades de matemática para Amazon KDP',
        'exercícios de adição para imprimir com licença comercial',
        'criar apostila de atividades de soma para KDP',
        'atividades de matemática para vender como renda extra',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'imagens temáticas', 'renda passiva', 'download digital',
        'gabarito incluso', 'atividades de cálculo', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', 'PIX',
      ],
      titleTag: 'Atividades de adição para vender online | LCS',
      metaDescription: 'Crie atividades de adição profissionais para vender na Hotmart, Etsy e KDP. Licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
    },
    heroTitle: 'Crie e venda atividades de adição profissionais na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de adição para vender na Hotmart, Kiwify, Etsy ou Amazon KDP — e gere cada uma em menos de 3 minutos. Este gerador cria exercícios de soma com imagens temáticas de mais de 3.000 ilustrações que encantam as crianças e convencem pais e professores a comprar. Exporte PDFs prontos para impressão em 300 DPI com gabarito automático e venda com a licença comercial inclusa — sem necessidade de atribuição. O mercado brasileiro de atividades educativas para imprimir é gigante: mais de 215 milhões de pessoas buscam materiais em português, e a cultura de "renda extra" no Brasil faz do mercado de infoprodutos educativos uma das maiores oportunidades para empreendedores digitais. Na Hotmart, kits de atividades já vendem milhares de cópias — e com este gerador, você cria produtos profissionais sem precisar de nenhum conhecimento de design. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'subtraction.ts': {
    seo: {
      primaryKeyword: 'gerador de atividades de subtração para vender na Etsy',
      secondaryKeywords: [
        'criar atividades de subtração para Hotmart',
        'exercícios de subtração para Amazon KDP',
        'atividades de contas de menos com licença comercial',
        'atividades de matemática para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'imagens temáticas', 'renda passiva', 'download digital',
        'gabarito incluso', 'subtração visual', 'riscar imagens',
        'educação infantil', 'ensino fundamental', 'negócio de imprimíveis',
        'renda extra', 'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de subtração para vender | LCS',
      metaDescription: 'Crie atividades de subtração para vender na Hotmart, Etsy e KDP. Imagens temáticas, gabarito, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Gere atividades de subtração para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Transforme a subtração em um produto vendável com um gerador feito para empreendedores de imprimíveis. Crie atividades de subtração ilustradas com imagens temáticas de mais de 100 categorias — animais, veículos, alimentos, natureza — que tornam a matemática envolvente e seus anúncios irresistíveis. Cada atividade é exportada em PDF 300 DPI pronto para impressão com gabarito automático, pronta para subir na Hotmart, Kiwify, Etsy, compilar em uma apostila Amazon KDP, ou vender no Tá Pronto. A licença comercial está inclusa em cada atividade. Dica rentável: combine adição e subtração em pacotes — vendedores relatam vendas médias significativamente maiores com pacotes matemáticos combinados. O mercado brasileiro oferece potencial enorme com competição mínima. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'code-addition.ts': {
    seo: {
      primaryKeyword: 'criar enigmas matemáticos com código para vender na Hotmart',
      secondaryKeywords: [
        'gerador de atividades de adição codificada para Etsy',
        'puzzles matemáticos de decifrar código para KDP',
        'atividades de criptaritmética com licença comercial',
        'enigmas de matemática para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'palavra revelada',
        'criptaritmética', 'raciocínio lógico', 'download digital',
        'gabarito incluso', 'negócio de imprimíveis', 'renda extra',
        'educação infantil', 'ensino fundamental', 'Hotmart', 'Kiwify',
      ],
      titleTag: 'Enigmas de adição codificada para vender | LCS',
      metaDescription: 'Crie puzzles de adição codificada para vender na Hotmart, Etsy e KDP. Modo Palavra Revelada, 11 idiomas, gabarito incluso. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie enigmas de adição codificada para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de adição do tipo criptaritmético para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Cada imagem na atividade esconde um número secreto — os usuários resolvem equações de soma para decifrar o código, combinando fluência matemática com raciocínio lógico. O modo Palavra Revelada transforma cada exercício em uma caça ao tesouro linguística: escreva uma palavra secreta e cada equação correta revela uma letra. O gerador suporta 11 alfabetos nativos, incluindo português com ã, õ, ç e acentos — nenhum outro gerador oferece isso. Escolha entre mais de 3.000 imagens em 104 temas, configure intervalos numéricos e exporte PDFs prontos para impressão a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'math-worksheet.ts': {
    seo: {
      primaryKeyword: 'gerador de atividades de matemática para vendedores Hotmart e KDP',
      secondaryKeywords: [
        'criar atividades de cálculo numérico para vender na Etsy',
        'gerador de exercícios de matemática com licença comercial',
        'atividades de operações matemáticas para Amazon KDP',
        'atividades de matemática para renda extra',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'cálculo numérico', 'operações básicas', 'download digital',
        'gabarito incluso', 'tabuada', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de matemática para vender | LCS',
      metaDescription: 'Crie atividades de matemática com cálculos numéricos para vender na Hotmart, Etsy e KDP. Licença comercial, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Gere atividades de matemática para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de cálculo numérico para vender na Hotmart, Kiwify, Etsy ou Amazon KDP — exercícios de matemática pura sem imagens temáticas, focados em operações básicas. Este gerador produz atividades de soma, subtração, multiplicação e divisão com intervalos numéricos configuráveis. Perfeito para apostilas de tabuada e cadernos de exercícios no Amazon KDP. Cada atividade é exportada em PDF 300 DPI com gabarito automático e licença comercial inclusa. O mercado de atividades de matemática em português é enorme: "atividades de matemática" e "tabuada" estão entre os termos educativos mais buscados no Brasil. Vendedores da Hotmart e Kiwify já faturam vendendo kits de exercícios — com este gerador, você cria conteúdo profissional em minutos. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'math-puzzle.ts': {
    seo: {
      primaryKeyword: 'gerador de quebra-cabeças de matemática para vender na Etsy',
      secondaryKeywords: [
        'criar puzzles de matemática para Hotmart',
        'quebra-cabeças de imagens com cálculos para KDP',
        'atividades de puzzle matemático com licença comercial',
        'jogos de raciocínio matemático para vender online',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'quebra-cabeça', 'raciocínio lógico', 'download digital',
        'gabarito incluso', 'jogo de matemática', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Quebra-cabeças de matemática para vender | LCS',
      metaDescription: 'Crie quebra-cabeças de matemática com imagens para vender na Hotmart, Etsy e KDP. Grade de imagens, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie quebra-cabeças de matemática para vender na Hotmart e Etsy',
    heroDescription: 'Crie quebra-cabeças de matemática com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz puzzles onde cada imagem representa um valor numérico oculto — os usuários resolvem equações para descobrir os números, depois montam a imagem completa combinando as respostas numa grade. Combina raciocínio lógico com fluência matemática, criando atividades que se destacam nos marketplaces. Escolha entre mais de 3.000 imagens em 104 temas, configure intervalos numéricos e exporte PDFs prontos para impressão a 300 DPI com gabarito automático. A licença comercial inclusa permite vender sem atribuição. Quebra-cabeças são um nicho de alta demanda com baixa competição em português. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'chart-count.ts': {
    seo: {
      primaryKeyword: 'atividades de contagem e gráficos para vender online',
      secondaryKeywords: [
        'gerador de atividades de gráficos para Hotmart',
        'atividades de contagem com gráficos para Etsy',
        'exercícios de gráficos de barras para Amazon KDP',
        'atividades de estatística infantil com licença comercial',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'gráfico de barras', 'contagem', 'download digital',
        'gabarito incluso', 'estatística infantil', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', 'BNCC',
      ],
      titleTag: 'Atividades de contagem e gráficos para vender | LCS',
      metaDescription: 'Crie atividades de contagem e gráficos de barras para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Gere atividades de contagem e gráficos para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de contagem e gráficos de barras para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças contam imagens temáticas e preenchem gráficos de barras — combinando matemática, interpretação de dados e raciocínio visual. As atividades de estatística e gráficos estão alinhadas com a BNCC e são cada vez mais exigidas nas escolas brasileiras. Escolha entre mais de 3.000 imagens em 104 temas, configure o número de categorias e exporte PDFs prontos para impressão a 300 DPI com gabarito automático e licença comercial inclusa. Um nicho pouco explorado em português com alta demanda crescente. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'wordsearch.ts': {
    seo: {
      primaryKeyword: 'gerador de caça-palavras para vender na Etsy e KDP',
      secondaryKeywords: [
        'criar caça-palavras com imagens para Hotmart',
        'gerador de sopa de letras para Amazon KDP',
        'atividades de caça-palavras com licença comercial',
        'caça-palavras em português para vender online',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'caça-palavras', 'sopa de letras', 'download digital',
        'gabarito incluso', 'vocabulário', 'alfabetização',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', '11 idiomas',
      ],
      titleTag: 'Gerador de caça-palavras para vender | LCS',
      metaDescription: 'Crie caça-palavras com imagens para vender na Hotmart, Etsy e KDP. Grades 5x5 a 30x30, 11 idiomas, gabarito colorido. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie caça-palavras profissionais para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie caça-palavras com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP — o formato de puzzle mais popular do mundo. Este gerador produz grades de 5×5 a 30×30 com palavras ocultas, pistas visuais de mais de 3.000 imagens e gabarito com código de cores. "Caça-palavras" é um dos termos mais buscados em português, com demanda constante o ano inteiro. O diferencial: grades em 11 idiomas com letras nativas (português com ã, õ, ç e acentos). Perfeito para livros de caça-palavras no Amazon KDP — um dos nichos mais lucrativos de baixo conteúdo. Exporte PDFs a 300 DPI com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'crossword.ts': {
    seo: {
      primaryKeyword: 'criador de palavras cruzadas para vender na Etsy e KDP',
      secondaryKeywords: [
        'gerador de cruzadinhas com imagens para Hotmart',
        'criar palavras cruzadas para Amazon KDP',
        'atividades de palavras cruzadas com licença comercial',
        'cruzadinhas em português para vender online',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'palavras cruzadas', 'cruzadinha', 'download digital',
        'gabarito incluso', 'vocabulário', 'alfabetização',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify', '11 idiomas',
      ],
      titleTag: 'Palavras cruzadas para vender online | LCS',
      metaDescription: 'Crie palavras cruzadas com imagens para vender na Hotmart, Etsy e KDP. Pistas visuais, 11 idiomas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie palavras cruzadas para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie palavras cruzadas com pistas visuais para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador cria cruzadinhas onde as pistas são imagens — os usuários identificam o que veem e preenchem as letras na grade. Com mais de 3.000 imagens em 104 temas e suporte a 11 idiomas com caracteres nativos, você cria produtos únicos em minutos. "Cruzadinha" e "palavras cruzadas" são termos de altíssima busca no Brasil. Cada atividade inclui gabarito automático e exportação em PDF 300 DPI. Perfeito para livros de passatempos no Amazon KDP e kits de atividades na Hotmart. Licença comercial inclusa — venda sem atribuição. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'cryptogram.ts': {
    seo: {
      primaryKeyword: 'gerador de criptogramas para vender na Etsy',
      secondaryKeywords: [
        'criar criptogramas com imagens para Hotmart',
        'atividades de decifrar código para Amazon KDP',
        'gerador de criptogramas com licença comercial',
        'puzzles de substituição de letras para vender online',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'criptograma', 'código secreto', 'download digital',
        'gabarito incluso', 'raciocínio lógico', 'alfabetização',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Gerador de criptogramas para vender | LCS',
      metaDescription: 'Crie criptogramas com imagens para vender na Hotmart, Etsy e KDP. Substituição de letras, 11 idiomas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie criptogramas para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie criptogramas com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz puzzles de substituição de letras onde cada símbolo visual representa uma letra do alfabeto — os usuários decifram o código para revelar palavras. Com mais de 3.000 imagens em 104 temas e suporte a 11 alfabetos nativos incluindo português, você cria produtos exclusivos que nenhum concorrente oferece. Criptogramas são um nicho de alta margem: adultos e crianças adoram desafios de decifração, e a competição em português é mínima. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'word-scramble.ts': {
    seo: {
      primaryKeyword: 'criar embaralha palavras para vender na Hotmart',
      secondaryKeywords: [
        'gerador de palavras embaralhadas para Etsy',
        'atividades de desembaralhar palavras para KDP',
        'embaralha palavras com imagens licença comercial',
        'jogos de letras para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'palavras embaralhadas', 'anagrama', 'download digital',
        'gabarito incluso', 'vocabulário', 'alfabetização',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Embaralha palavras para vender online | LCS',
      metaDescription: 'Crie atividades de embaralha palavras para vender na Hotmart, Etsy e KDP. Imagens como pistas, 11 idiomas, gabarito incluso. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de embaralha palavras para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de embaralha palavras para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador embaralha letras de palavras e usa imagens como pistas visuais — os usuários olham a imagem, identificam o que é e reorganizam as letras para formar a palavra correta. Com mais de 3.000 imagens em 104 temas e 11 idiomas com caracteres nativos, você cria jogos de vocabulário que funcionam para qualquer idade. Atividades de embaralha palavras são ótimas para apostilas de alfabetização e livros de passatempos no Amazon KDP. Cada atividade vem com gabarito automático e exportação em PDF 300 DPI. Licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'word-guess.ts': {
    seo: {
      primaryKeyword: 'jogo de adivinhar palavras para vender na Etsy',
      secondaryKeywords: [
        'gerador de adivinhar palavras com imagens para Hotmart',
        'atividades de forca educativa para Amazon KDP',
        'jogo de palavras com pistas visuais licença comercial',
        'adivinhar palavras para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'adivinhar palavras', 'forca', 'download digital',
        'gabarito incluso', 'vocabulário', 'alfabetização',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Jogo de adivinhar palavras para vender | LCS',
      metaDescription: 'Crie jogos de adivinhar palavras para vender na Hotmart, Etsy e KDP. Pistas visuais, 11 idiomas, gabarito automático. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie jogos de adivinhar palavras para vender na Hotmart e Etsy',
    heroDescription: 'Crie jogos de adivinhar palavras com pistas visuais para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz atividades no estilo forca onde os usuários veem imagens e devem adivinhar a palavra correspondente, preenchendo as letras em caselas. Com mais de 3.000 imagens em 104 temas e 11 idiomas com caracteres nativos, você cria jogos de vocabulário que engajam crianças de todas as idades. Perfeito para kits de alfabetização na Hotmart e livros de atividades no Amazon KDP. Cada atividade vem com gabarito automático e exportação em PDF 300 DPI. Licença comercial inclusa — venda sem restrições. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'writing.ts': {
    seo: {
      primaryKeyword: 'gerador de atividades de caligrafia para vender online',
      secondaryKeywords: [
        'criar atividades de caligrafia para Hotmart',
        'atividades de escrita e traçado para Amazon KDP',
        'atividades de coordenação motora com licença comercial',
        'atividades de alfabetização para vender na Etsy',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'caligrafia', 'coordenação motora', 'download digital',
        'gabarito incluso', 'alfabetização', 'traçado de letras',
        'educação infantil', 'ensino fundamental', 'negócio de imprimíveis',
        'renda extra', 'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de caligrafia para vender | LCS',
      metaDescription: 'Crie atividades de caligrafia e traçado de letras para vender na Hotmart, Etsy e KDP. 5 modos de escrita, 11 idiomas. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de caligrafia para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de caligrafia e traçado de letras para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Coordenação motora" e "alfabetização" são termos de altíssimo volume de busca no Brasil — e este gerador cria exatamente os produtos que pais e professores procuram. Cinco modos de escrita: traçar letras, copiar palavras, escrever por extenso, pontilhado e forma livre. Suporte a 11 idiomas com alfabetos nativos incluindo português com todos os acentos. Escolha entre 7 famílias tipográficas e exporte PDFs prontos para impressão a 300 DPI. Perfeito para kits de alfabetização na Hotmart e apostilas de coordenação motora no Amazon KDP. Licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'matching.ts': {
    seo: {
      primaryKeyword: 'atividades de ligar e associar para vender na Etsy',
      secondaryKeywords: [
        'gerador de atividades de associação para Hotmart',
        'criar atividades de ligar para Amazon KDP',
        'atividades de correspondência com licença comercial',
        'jogos de associação para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'ligar', 'associar', 'correspondência', 'download digital',
        'gabarito incluso', 'raciocínio visual', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de ligar e associar para vender | LCS',
      metaDescription: 'Crie atividades de ligar e associar para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de associação para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de ligar e associar com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz exercícios onde as crianças traçam linhas para conectar elementos correspondentes — imagem com imagem, imagem com palavra, ou imagem com número. Com mais de 3.000 ilustrações em 104 temas, você cria pacotes temáticos variados. Atividades de associação são universais: funcionam para qualquer idioma e faixa etária, desde educação infantil até ensino fundamental. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Um produto básico que todo vendedor de imprimíveis precisa no catálogo. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'drawing-lines.ts': {
    seo: {
      primaryKeyword: 'atividades de traçado e coordenação motora para vender',
      secondaryKeywords: [
        'gerador de atividades de coordenação motora para Hotmart',
        'atividades de traçado para vender na Etsy',
        'exercícios de pregrafismo para Amazon KDP',
        'atividades de coordenação motora fina licença comercial',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'coordenação motora', 'traçado', 'pregrafismo', 'download digital',
        'gabarito incluso', 'habilidade motora fina', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Atividades de coordenação motora para vender | LCS',
      metaDescription: 'Crie atividades de traçado e coordenação motora para vender na Hotmart, Etsy e KDP. 104 temas, caminhos configuráveis. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de traçado para vender na Hotmart, Etsy e KDP',
    heroDescription: 'Crie atividades de traçado e coordenação motora para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. "Coordenação motora" é um dos termos educativos MAIS buscados no Brasil — e este gerador cria exatamente os produtos que têm demanda gigante. As crianças traçam linhas entre imagens temáticas, desenvolvendo habilidades motoras finas essenciais para a escrita. Com mais de 3.000 imagens em 104 temas, você cria pacotes temáticos ilimitados. Atividades de traçado vendem extremamente bem na Hotmart como kits de coordenação motora e no Amazon KDP como apostilas de pregrafismo. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'find-objects.ts': {
    seo: {
      primaryKeyword: 'criar ache e encontre para vender na Etsy e KDP',
      secondaryKeywords: [
        'gerador de ache e encontre com imagens para Hotmart',
        'atividades de objetos escondidos para Amazon KDP',
        'hidden object worksheets em português licença comercial',
        'ache e encontre para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'ache e encontre', 'objetos escondidos', 'download digital',
        'gabarito incluso', 'atenção visual', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Ache e encontre para vender online | LCS',
      metaDescription: 'Crie atividades de ache e encontre para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de ache e encontre para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de ache e encontre com imagens para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz cenas visuais repletas de imagens temáticas onde as crianças procuram objetos específicos — desenvolvendo atenção visual, concentração e vocabulário. Com mais de 3.000 ilustrações em 104 temas, você cria cenas únicas para cada produto. Atividades de objetos escondidos são extremamente populares: funcionam para todas as idades e não dependem de idioma, ampliando seu mercado globalmente. Perfeito para livros de passatempos no Amazon KDP e kits de atividades na Hotmart. Exporte PDFs a 300 DPI com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'grid-match.ts': {
    seo: {
      primaryKeyword: 'quebra-cabeça de associação em grade para negócio digital',
      secondaryKeywords: [
        'gerador de grade de associação para Hotmart',
        'atividades de associação em grelha para Etsy',
        'quebra-cabeça visual em grade para Amazon KDP',
        'atividades de grade para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'associação em grade', 'grelha', 'download digital',
        'gabarito incluso', 'raciocínio lógico', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Associação em grade para vender online | LCS',
      metaDescription: 'Crie quebra-cabeças de associação em grade para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático. Teste grátis com marca d\\\'água — sem cadastro.',
    },
    heroTitle: 'Crie quebra-cabeças de associação em grade para vender na Hotmart',
    heroDescription: 'Crie atividades de associação em grade para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz quebra-cabeças onde as crianças associam imagens em uma grelha visual, desenvolvendo raciocínio lógico e atenção aos detalhes. Com mais de 3.000 ilustrações em 104 temas, você cria variações temáticas ilimitadas. Atividades de grade são um formato visualmente atraente que se destaca nas miniaturas de anúncios — compradores clicam mais em produtos com layout organizado e colorido. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Um formato exclusivo que diferencia seu catálogo da concorrência. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'find-and-count.ts': {
    seo: {
      primaryKeyword: 'atividades de procurar e contar para vender na Etsy',
      secondaryKeywords: [
        'gerador de procure e conte para Hotmart',
        'atividades de encontre e conte para Amazon KDP',
        'atividades de contagem visual com licença comercial',
        'procure e conte para vender na Kiwify',
      ],
      lsiKeywords: [
        'licença comercial', '300 DPI', 'pronto para impressão',
        'procurar e contar', 'encontrar e contar', 'download digital',
        'gabarito incluso', 'contagem', 'educação infantil',
        'ensino fundamental', 'negócio de imprimíveis', 'renda extra',
        'Hotmart', 'Kiwify',
      ],
      titleTag: 'Procure e conte para vender online | LCS',
      metaDescription: 'Crie atividades de procurar e contar para vender na Hotmart, Etsy e KDP. 104 temas, gabarito automático, licença comercial. Teste grátis com marca d\\\'água.',
    },
    heroTitle: 'Crie atividades de procurar e contar para vender na Hotmart e Etsy',
    heroDescription: 'Crie atividades de procurar e contar para vender na Hotmart, Kiwify, Etsy ou Amazon KDP. Este gerador produz cenas visuais com imagens temáticas espalhadas pela página — as crianças encontram e contam cada tipo de imagem, registrando os totais. Combina atenção visual com habilidades de contagem, perfeito para educação infantil e ensino fundamental. Com mais de 3.000 ilustrações em 104 temas, você cria variações temáticas ilimitadas. Um formato extremamente popular entre pais e professores: simples de entender, divertido de resolver e eficaz para aprender. Exporte PDFs a 300 DPI com gabarito automático e licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
};

// Apply SEO rewrites
let modified = 0;
for (const [file, data] of Object.entries(apps)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`  SKIP ${file} — not found`); continue; }
  let content = fs.readFileSync(fp, 'utf8');

  // Build new SEO block
  const secondaryStr = data.seo.secondaryKeywords.map(k => `      '${k}',`).join('\n');
  const lsiStr = data.seo.lsiKeywords.map(k => `      '${k}',`).join('\n');

  const newSeo = `  seo: {
    primaryKeyword: '${data.seo.primaryKeyword}',
    secondaryKeywords: [
${secondaryStr}
    ],
    lsiKeywords: [
${lsiStr}
    ],
    titleTag: '${data.seo.titleTag}',
    metaDescription:
      '${data.seo.metaDescription}',
  },`;

  // Replace seo block
  const seoRegex = /  seo: \{[\s\S]*?\n  \},/;
  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, newSeo);
  } else {
    console.log(`  WARN ${file} — could not match seo block`);
    continue;
  }

  // Replace hero.title - find the title string in the hero block
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

    // Replace hero.description
    const descPrefix = "description:\n      '";
    const descAlt = "description: '";
    let descStart = content.indexOf(descPrefix, heroIdx);
    let prefixLen = descPrefix.length;
    if (descStart === -1) {
      descStart = content.indexOf(descAlt, heroIdx);
      prefixLen = descAlt.length;
    }
    if (descStart !== -1) {
      const dValStart = descStart + prefixLen;
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

  // Validate title length
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
