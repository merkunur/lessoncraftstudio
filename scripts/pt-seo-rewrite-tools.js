/**
 * Portuguese SEO Rewrite — Tool Content (34 files)
 * Free tool pages: "grátis online", link to /pt/apps/ for commercial
 */
const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/tool-content/pt';

const tools = {
  'image-addition.ts': {
    pk: 'gerador de atividades de adição grátis online',
    sk: ['atividades de adição para imprimir grátis', 'criar atividades de soma online sem cadastro', 'gerador de exercícios de adição com imagens grátis', 'atividades de matemática para imprimir grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'imagens temáticas', '104 temas', 'educação infantil', 'ensino fundamental', 'teste grátis', 'licença comercial'],
    title: 'Atividades de adição grátis online | LCS',
    meta: 'Crie atividades de adição grátis com imagens temáticas. 104 temas, gabarito automático, exportação PDF. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de adição — teste grátis online',
    desc: 'Crie atividades de adição com imagens temáticas diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz exercícios de soma com ilustrações de mais de 3.000 imagens em 104 temas. Escolha entre quatro modos de exercício, ajuste a dificuldade e exporte PDFs prontos para imprimir com gabarito automático. Perfeito para pais que buscam atividades de matemática para imprimir, professores que preparam material de reforço e vendedores que querem testar antes de comprar. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para remover a marca d\\\'água e vender com licença comercial, conheça a versão completa.',
  },
  'image-subtraction.ts': {
    pk: 'gerador de atividades de subtração grátis',
    sk: ['atividades de subtração para imprimir grátis', 'criar exercícios de subtração online sem cadastro', 'gerador de atividades de contas de menos grátis', 'atividades de subtração com imagens grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'riscar imagens', '104 temas', 'educação infantil', 'ensino fundamental', 'teste grátis', 'licença comercial'],
    title: 'Atividades de subtração grátis online | LCS',
    meta: 'Crie atividades de subtração grátis com imagens temáticas. Riscar visual, gabarito automático, exportação PDF. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de subtração — teste grátis online',
    desc: 'Crie atividades de subtração com imagens temáticas diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz exercícios com visualização de riscar: as crianças veem imagens riscadas para entender o conceito de "tirar". Quatro modos de exercício, dificuldade ajustável e mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. Ideal para pais e professores que buscam atividades de matemática para imprimir rapidamente. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'code-addition.ts': {
    pk: 'criar enigmas matemáticos codificados grátis',
    sk: ['puzzles de adição codificada grátis online', 'enigmas de matemática para imprimir grátis', 'criptaritmética grátis para crianças', 'palavra revelada grátis online'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'palavra revelada', 'criptaritmética', '11 idiomas', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Enigmas matemáticos grátis online | LCS',
    meta: 'Crie enigmas de adição codificada grátis. Modo Palavra Revelada, 11 idiomas, gabarito automático. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de enigmas matemáticos codificados — teste grátis',
    desc: 'Crie puzzles de adição codificada diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz enigmas onde cada imagem esconde um número secreto e o modo Palavra Revelada transforma exercícios em caça ao tesouro linguística. Suporte a 11 alfabetos nativos incluindo português com acentos. Exporte PDFs prontos para imprimir com gabarito automático. Ideal para pais e professores que buscam atividades de raciocínio lógico. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial e remoção da marca, conheça a versão completa.',
  },
  'math-worksheet.ts': {
    pk: 'gerador de atividades de matemática grátis',
    sk: ['atividades de matemática para imprimir grátis', 'criar exercícios de cálculo online grátis', 'gerador de tabuada grátis', 'atividades de operações matemáticas grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'tabuada', 'operações básicas', 'cálculo', 'ensino fundamental', 'teste grátis', 'licença comercial'],
    title: 'Atividades de matemática grátis online | LCS',
    meta: 'Crie atividades de matemática grátis com cálculos numéricos. Soma, subtração, multiplicação, divisão. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de matemática — teste grátis online',
    desc: 'Crie atividades de cálculo numérico diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz exercícios de soma, subtração, multiplicação e divisão com intervalos configuráveis. Perfeito para praticar tabuada, reforço escolar e preparação de provas. Exporte PDFs prontos para imprimir com gabarito automático. "Atividades de matemática para imprimir" é um dos termos mais buscados por pais e professores brasileiros. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial e remoção da marca, conheça a versão com licença.',
  },
  'math-puzzle.ts': {
    pk: 'criar quebra-cabeças de matemática grátis',
    sk: ['puzzles de matemática para imprimir grátis', 'quebra-cabeça de imagens com cálculos grátis', 'jogos de raciocínio matemático grátis online', 'puzzle de matemática para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'quebra-cabeça', 'raciocínio lógico', '104 temas', 'ensino fundamental', 'teste grátis', 'licença comercial'],
    title: 'Quebra-cabeças de matemática grátis | LCS',
    meta: 'Crie quebra-cabeças de matemática grátis com imagens. Grade de imagens, gabarito automático, exportação PDF. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de quebra-cabeças de matemática — teste grátis',
    desc: 'Crie quebra-cabeças de matemática com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz puzzles onde cada imagem representa um valor numérico oculto — os usuários resolvem equações para descobrir os números e montar a imagem. Combina raciocínio lógico com fluência matemática. Mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. Ideal para reforço escolar e atividades de raciocínio. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão completa.',
  },
  'chart-count.ts': {
    pk: 'atividades de contagem e gráficos grátis',
    sk: ['gráficos pictóricos para imprimir grátis', 'atividades de contagem para educação infantil grátis', 'exercícios de gráficos de barras grátis', 'atividades de estatística para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'gráfico de barras', 'contagem', 'BNCC', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Atividades de contagem grátis online | LCS',
    meta: 'Crie atividades de contagem e gráficos de barras grátis. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de contagem e gráficos — teste grátis',
    desc: 'Crie atividades de contagem e gráficos de barras diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz exercícios onde as crianças contam imagens temáticas e preenchem gráficos de barras — combinando matemática com interpretação de dados. Alinhado com a BNCC. Mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para professores e pais que buscam atividades de estatística para educação infantil. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'wordsearch.ts': {
    pk: 'gerador de caça-palavras grátis com imagens',
    sk: ['caça-palavras para imprimir grátis', 'criar sopa de letras online grátis', 'gerador de caça-palavras em português grátis', 'caça-palavras com imagens grátis para crianças'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'caça-palavras', 'sopa de letras', '11 idiomas', 'vocabulário', 'teste grátis', 'licença comercial'],
    title: 'Gerador de caça-palavras grátis online | LCS',
    meta: 'Crie caça-palavras grátis com imagens. Grades 5x5 a 30x30, 11 idiomas, gabarito colorido, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de caça-palavras — teste grátis online',
    desc: 'Crie caça-palavras com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz grades de 5×5 a 30×30 com palavras ocultas, pistas visuais e gabarito com código de cores. "Caça-palavras para imprimir" é um dos termos mais buscados em português. Suporte a 11 idiomas com letras nativas — grades em português incluem ã, õ, ç e acentos. Exporte PDFs prontos para imprimir. Perfeito para professores, pais e qualquer pessoa que adora caça-palavras. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'word-search.ts': {
    pk: 'gerador de caça-palavras grátis com imagens',
    sk: ['caça-palavras para imprimir grátis', 'criar sopa de letras online grátis', 'gerador de caça-palavras em português grátis', 'caça-palavras grátis para crianças'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'caça-palavras', 'sopa de letras', '11 idiomas', 'vocabulário', 'teste grátis', 'licença comercial'],
    title: 'Gerador de caça-palavras grátis | LCS',
    meta: 'Crie caça-palavras grátis com imagens e pistas visuais. Grades configuráveis, 11 idiomas, gabarito colorido. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Caça-palavras grátis — crie e imprima online',
    desc: 'Crie caça-palavras com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Grades de 5×5 a 30×30, palavras em diagonal e invertidas, pistas visuais de mais de 3.000 imagens em 104 temas e gabarito com código de cores. Suporte a 11 idiomas com letras nativas. Exporte PDFs prontos para imprimir. O termo "caça-palavras para imprimir" é um dos mais buscados em português — e esta ferramenta entrega exatamente isso. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial e remoção da marca, conheça a versão com licença.',
  },
  'crossword.ts': {
    pk: 'gerador de palavras cruzadas grátis com imagens',
    sk: ['cruzadinha para imprimir grátis', 'criar palavras cruzadas online grátis', 'gerador de cruzadinhas com imagens grátis', 'palavras cruzadas para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'palavras cruzadas', 'cruzadinha', '11 idiomas', 'vocabulário', 'teste grátis', 'licença comercial'],
    title: 'Gerador de palavras cruzadas grátis | LCS',
    meta: 'Crie palavras cruzadas grátis com imagens como pistas. 11 idiomas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de palavras cruzadas — teste grátis online',
    desc: 'Crie palavras cruzadas com pistas visuais diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz cruzadinhas onde as pistas são imagens — os usuários identificam o que veem e preenchem as letras. Mais de 3.000 imagens em 104 temas e suporte a 11 idiomas com caracteres nativos. "Cruzadinha para imprimir" é um termo de altíssima busca no Brasil. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'cryptogram.ts': {
    pk: 'gerador de criptogramas grátis',
    sk: ['criptograma para imprimir grátis', 'criar criptograma online grátis', 'puzzles de decifrar código grátis', 'criptograma com imagens grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'criptograma', 'código secreto', '11 idiomas', 'raciocínio lógico', 'teste grátis', 'licença comercial'],
    title: 'Gerador de criptogramas grátis online | LCS',
    meta: 'Crie criptogramas grátis com imagens. Substituição de letras, 11 idiomas, gabarito automático. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de criptogramas — teste grátis online',
    desc: 'Crie criptogramas com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz puzzles de substituição de letras onde cada símbolo visual representa uma letra do alfabeto. Suporte a 11 alfabetos nativos incluindo português com todos os acentos. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para quem adora desafios de decifração. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial e remoção da marca, conheça a versão com licença.',
  },
  'word-scramble.ts': {
    pk: 'gerador de embaralha palavras grátis',
    sk: ['palavras embaralhadas para imprimir grátis', 'criar embaralha palavras online grátis', 'anagrama para crianças grátis', 'desembaralhar palavras grátis online'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'embaralha palavras', 'anagrama', '11 idiomas', 'vocabulário', 'teste grátis', 'licença comercial'],
    title: 'Embaralha palavras grátis online | LCS',
    meta: 'Crie atividades de embaralha palavras grátis com imagens. 11 idiomas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de embaralha palavras — teste grátis online',
    desc: 'Crie atividades de embaralha palavras diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online embaralha letras e usa imagens como pistas visuais — os usuários reorganizam as letras para formar a palavra correta. Mais de 3.000 imagens em 104 temas e 11 idiomas com caracteres nativos. Exporte PDFs prontos para imprimir com gabarito automático. Ótimo para reforço de vocabulário e alfabetização. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'word-guess.ts': {
    pk: 'criar jogo de adivinhar palavras grátis',
    sk: ['jogo de adivinhar palavras para imprimir grátis', 'forca educativa online grátis', 'adivinhar palavras com imagens grátis', 'jogo de letras para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'adivinhar palavras', 'forca', '11 idiomas', 'vocabulário', 'teste grátis', 'licença comercial'],
    title: 'Adivinhar palavras grátis online | LCS',
    meta: 'Crie jogos de adivinhar palavras grátis com imagens. Estilo forca, 11 idiomas, gabarito automático. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Jogo de adivinhar palavras — teste grátis online',
    desc: 'Crie jogos de adivinhar palavras diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz atividades estilo forca onde os usuários veem imagens e preenchem letras em caselas. Mais de 3.000 imagens em 104 temas e 11 idiomas com caracteres nativos. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para atividades de vocabulário e alfabetização. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'writing.ts': {
    pk: 'gerador de atividades de caligrafia grátis',
    sk: ['atividades de caligrafia para imprimir grátis', 'criar atividades de traçado de letras grátis', 'atividades de coordenação motora grátis', 'atividades de alfabetização para imprimir grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'caligrafia', 'coordenação motora', 'traçado de letras', 'alfabetização', '11 idiomas', 'teste grátis', 'licença comercial'],
    title: 'Atividades de caligrafia grátis online | LCS',
    meta: 'Crie atividades de caligrafia e traçado de letras grátis. 5 modos de escrita, 11 idiomas, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de caligrafia — teste grátis online',
    desc: 'Crie atividades de caligrafia e traçado de letras diretamente no navegador — sem cadastro, sem instalação, sem custo. Cinco modos de escrita: traçar letras, copiar palavras, escrever por extenso, pontilhado e forma livre. Suporte a 11 idiomas com alfabetos nativos. "Coordenação motora" e "alfabetização" são termos de altíssimo volume de busca no Brasil — e esta ferramenta cria exatamente o que pais e professores procuram. Exporte PDFs prontos para imprimir. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'matching.ts': {
    pk: 'gerador de atividades de associação grátis',
    sk: ['atividades de ligar para imprimir grátis', 'criar atividades de associação online grátis', 'exercícios de correspondência grátis', 'atividades de ligar para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'ligar', 'associar', '104 temas', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Atividades de associação grátis online | LCS',
    meta: 'Crie atividades de ligar e associar grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de associação — teste grátis online',
    desc: 'Crie atividades de ligar e associar diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador online produz exercícios onde as crianças traçam linhas para conectar elementos correspondentes. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para educação infantil e ensino fundamental. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'drawing-lines.ts': {
    pk: 'gerador de atividades de traçado grátis',
    sk: ['atividades de coordenação motora para imprimir grátis', 'criar atividades de traçado online grátis', 'exercícios de pregrafismo grátis', 'atividades de traçar linhas grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'coordenação motora', 'traçado', 'pregrafismo', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Atividades de traçado grátis online | LCS',
    meta: 'Crie atividades de traçado e coordenação motora grátis. 104 temas, caminhos configuráveis, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de traçado — teste grátis online',
    desc: 'Crie atividades de traçado e coordenação motora diretamente no navegador — sem cadastro, sem instalação, sem custo. As crianças traçam linhas entre imagens temáticas, desenvolvendo habilidades motoras finas essenciais para a escrita. "Coordenação motora" é um dos termos mais buscados no Brasil. Mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'find-objects.ts': {
    pk: 'gerador de ache e encontre grátis',
    sk: ['ache e encontre para imprimir grátis', 'atividades de objetos escondidos grátis', 'criar ache e encontre online grátis', 'hidden object para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'ache e encontre', 'objetos escondidos', '104 temas', 'atenção visual', 'teste grátis', 'licença comercial'],
    title: 'Ache e encontre grátis online | LCS',
    meta: 'Crie atividades de ache e encontre grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de ache e encontre — teste grátis online',
    desc: 'Crie atividades de ache e encontre diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz cenas visuais onde as crianças procuram objetos específicos entre imagens temáticas. Mais de 3.000 ilustrações em 104 temas. Desenvolve atenção visual, concentração e vocabulário. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para pais e professores. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'grid-match.ts': {
    pk: 'criar grades de associação grátis',
    sk: ['quebra-cabeça de grade grátis para imprimir', 'associação em grelha grátis online', 'puzzle visual em grade grátis', 'atividades de grade para crianças grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'associação em grade', 'grelha', '104 temas', 'raciocínio lógico', 'teste grátis', 'licença comercial'],
    title: 'Grades de associação grátis online | LCS',
    meta: 'Crie quebra-cabeças de associação em grade grátis. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de grades de associação — teste grátis online',
    desc: 'Crie quebra-cabeças de associação em grade diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz puzzles onde as crianças associam imagens em uma grelha visual. Mais de 3.000 ilustrações em 104 temas. Desenvolve raciocínio lógico e atenção aos detalhes. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para atividades de raciocínio em casa e na escola. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'find-and-count.ts': {
    pk: 'gerador de procure e conte grátis',
    sk: ['procure e conte para imprimir grátis', 'atividades de encontre e conte grátis', 'contagem visual grátis para crianças', 'atividades de procurar e contar grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'procurar e contar', 'contagem', '104 temas', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Procure e conte grátis online | LCS',
    meta: 'Crie atividades de procurar e contar grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de procure e conte — teste grátis online',
    desc: 'Crie atividades de procurar e contar diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz cenas visuais com imagens temáticas — as crianças encontram e contam cada tipo de imagem. Combina atenção visual com habilidades de contagem. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'missing-pieces.ts': {
    pk: 'gerador de peças faltantes grátis',
    sk: ['quebra-cabeça peças faltantes para imprimir grátis', 'puzzle de completar imagens grátis', 'atividades de peças faltantes grátis online', 'quebra-cabeça visual grátis para crianças'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'peças faltantes', 'puzzle visual', '104 temas', 'raciocínio lógico', 'teste grátis', 'licença comercial'],
    title: 'Peças faltantes grátis online | LCS',
    meta: 'Crie quebra-cabeças de peças faltantes grátis. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de peças faltantes — teste grátis online',
    desc: 'Crie quebra-cabeças de peças faltantes diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz puzzles visuais onde uma parte da imagem é removida e as crianças identificam a peça correta. Desenvolve atenção visual e raciocínio lógico. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'shadow-match.ts': {
    pk: 'gerador de atividades de sombras grátis',
    sk: ['atividades de sombras para imprimir grátis', 'associar sombras grátis online', 'atividades de silhuetas grátis para crianças', 'shadow matching grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'sombras', 'silhuetas', '104 temas', 'percepção visual', 'teste grátis', 'licença comercial'],
    title: 'Atividades de sombras grátis online | LCS',
    meta: 'Crie atividades de associar sombras grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de sombras — teste grátis online',
    desc: 'Crie atividades de associar sombras diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios onde as crianças associam imagens coloridas às suas silhuetas correspondentes. Desenvolve percepção visual e atenção aos detalhes. Mais de 3.000 ilustrações em 104 temas. Formato visual universal que funciona em qualquer idioma. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'picture-path.ts': {
    pk: 'gerador de labirintos ilustrados grátis',
    sk: ['labirintos para imprimir grátis', 'criar labirintos com imagens grátis', 'atividades de percurso grátis para crianças', 'labirinto para imprimir grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'labirinto', 'percurso', 'coordenação motora', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Labirintos ilustrados grátis online | LCS',
    meta: 'Crie labirintos ilustrados grátis com imagens temáticas. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de labirintos ilustrados — teste grátis online',
    desc: 'Crie labirintos ilustrados diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz atividades de percurso onde as crianças traçam caminhos entre imagens temáticas. "Labirinto para imprimir" é um dos termos de atividades mais buscados no Brasil. Mais de 3.000 imagens em 104 temas. Combina coordenação motora com diversão visual. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'picture-sort.ts': {
    pk: 'gerador de atividades de classificação grátis',
    sk: ['atividades de classificação para imprimir grátis', 'exercícios de categorização grátis online', 'atividades de ordenar grátis para crianças', 'classificação visual grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'classificação', 'categorização', '104 temas', 'raciocínio lógico', 'teste grátis', 'licença comercial'],
    title: 'Classificação grátis online | LCS',
    meta: 'Crie atividades de classificação e categorização grátis. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de classificação — teste grátis online',
    desc: 'Crie atividades de classificação e categorização diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios onde as crianças ordenam e agrupam imagens temáticas por categorias. Desenvolve raciocínio lógico e pensamento crítico. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. Perfeito para educação infantil e ensino fundamental. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'prepositions.ts': {
    pk: 'gerador de atividades de preposições grátis',
    sk: ['atividades de preposições para imprimir grátis', 'exercícios de preposições com imagens grátis', 'atividades de PLE grátis online', 'preposições em português grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'preposições', 'PLE', '11 idiomas', 'vocabulário', 'teste grátis', 'licença comercial'],
    title: 'Atividades de preposições grátis online | LCS',
    meta: 'Crie atividades de preposições grátis com imagens. 11 idiomas, PLE, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de preposições — teste grátis online',
    desc: 'Crie atividades de preposições com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios visuais de relações espaciais — em cima, embaixo, dentro, fora, ao lado — usando imagens temáticas. Suporte a 11 idiomas, perfeito para PLE (Português como Língua Estrangeira). Mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'coloring.ts': {
    pk: 'gerador de desenhos para colorir grátis',
    sk: ['desenhos para colorir para imprimir grátis', 'criar páginas de colorir online grátis', 'desenhos para pintar grátis para crianças', 'colorir para imprimir grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'desenho para colorir', 'página para colorir', '104 temas', 'coordenação motora', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Desenhos para colorir grátis online | LCS',
    meta: 'Crie desenhos para colorir grátis com imagens temáticas. 104 temas, modo escala de cinza, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de desenhos para colorir — teste grátis online',
    desc: 'Crie desenhos para colorir diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz páginas para colorir com imagens temáticas de mais de 3.000 ilustrações em 104 temas. Modo escala de cinza para páginas econômicas em tinta. "Desenho para colorir" e "colorir para imprimir" são termos de altíssimo volume no Brasil. Adicione linhas de caligrafia e campo de nome para atividades multicompetências. Exporte PDFs prontos para imprimir. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'draw-and-color.ts': {
    pk: 'criar atividades de desenho e pintura grátis',
    sk: ['atividades de desenhar e colorir para imprimir grátis', 'criar atividades de arte online grátis', 'atividades de desenho grátis para crianças', 'desenho e pintura grátis online'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'desenhar e colorir', 'arte', 'criatividade', '104 temas', 'coordenação motora', 'teste grátis', 'licença comercial'],
    title: 'Desenho e pintura grátis online | LCS',
    meta: 'Crie atividades de desenho e pintura grátis com imagens. 104 temas, canvas livre, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de desenho e pintura — teste grátis',
    desc: 'Crie atividades de desenho e pintura diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz páginas de atividades artísticas com imagens temáticas como inspiração e ferramentas de canvas livre. Mais de 3.000 ilustrações em 104 temas. Desenvolve coordenação motora fina, criatividade e expressão artística. Exporte PDFs prontos para imprimir. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'alphabet-train.ts': {
    pk: 'gerador de atividades de alfabeto grátis',
    sk: ['trem do alfabeto para imprimir grátis', 'atividades de letras para crianças grátis', 'atividades de alfabetização grátis online', 'reconhecimento de letras grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'alfabeto', 'trem de letras', 'alfabetização', '11 idiomas', 'teste grátis', 'licença comercial'],
    title: 'Atividades de alfabeto grátis online | LCS',
    meta: 'Crie atividades de trem do alfabeto grátis. 11 idiomas, associação letra-imagem, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de alfabeto — teste grátis online',
    desc: 'Crie atividades de trem do alfabeto diretamente no navegador — sem cadastro, sem instalação, sem custo. Onze vagões coloridos com letras e ilustrações correspondentes. Suporte a 11 idiomas com alfabetos nativos — a mesma imagem associa-se com letras diferentes em cada idioma. "Alfabetização" é um dos termos mais buscados no Brasil. Mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'bingo.ts': {
    pk: 'gerador de cartelas de bingo grátis com imagens',
    sk: ['cartelas de bingo para imprimir grátis', 'criar bingo online grátis', 'bingo com imagens grátis para crianças', 'gerador de bingo educativo grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'cartelas de bingo', 'exportação ZIP', 'folha de chamada', '104 temas', 'jogo educativo', 'teste grátis', 'licença comercial'],
    title: 'Cartelas de bingo grátis com imagens | LCS',
    meta: 'Crie cartelas de bingo grátis com imagens. Lote até 10 cartelas, exportação ZIP, folha de chamada. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de cartelas de bingo — teste grátis online',
    desc: 'Crie cartelas de bingo com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Gere de 1 a 10 cartelas únicas por lote, cada uma com imagens diferentes em posições diferentes. Grelhas de 3×3 a 5×5, exportação ZIP e folha de chamada incluída. Mais de 3.000 imagens em 104 temas e 11 idiomas. Perfeito para festas infantis, atividades escolares e jogos em família. Exporte PDFs prontos para imprimir. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'pattern-train.ts': {
    pk: 'gerador de atividades de sequências grátis',
    sk: ['atividades de sequências para imprimir grátis', 'completar sequências grátis online', 'trem de padrões grátis para crianças', 'atividades de padrões grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'sequências', 'padrões', 'raciocínio lógico', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Atividades de sequências grátis online | LCS',
    meta: 'Crie atividades de sequências e padrões grátis. Trem de padrões visual, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de atividades de sequências — teste grátis online',
    desc: 'Crie atividades de sequências e padrões diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios de trem de padrões onde as crianças identificam e completam sequências visuais com imagens temáticas. Desenvolve raciocínio lógico e reconhecimento de padrões. Mais de 3.000 imagens em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'pattern-worksheet.ts': {
    pk: 'atividades de reconhecimento de padrões grátis',
    sk: ['atividades de padrões para imprimir grátis', 'exercícios de padrões visuais grátis', 'reconhecimento de padrões grátis para crianças', 'atividades de padrões grátis online'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'padrões', 'reconhecimento visual', 'raciocínio lógico', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Reconhecimento de padrões grátis online | LCS',
    meta: 'Crie atividades de reconhecimento de padrões grátis. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Atividades de reconhecimento de padrões — teste grátis',
    desc: 'Crie atividades de reconhecimento de padrões diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios onde as crianças identificam e completam padrões visuais usando imagens temáticas. Habilidade fundamental em matemática e raciocínio lógico. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'treasure-hunt.ts': {
    pk: 'gerador de caça ao tesouro grátis',
    sk: ['caça ao tesouro para imprimir grátis', 'criar caça ao tesouro online grátis', 'jogo de pistas grátis para crianças', 'atividade de caça ao tesouro grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'caça ao tesouro', 'jogo de pistas', '104 temas', 'atenção visual', 'teste grátis', 'licença comercial'],
    title: 'Caça ao tesouro grátis online | LCS',
    meta: 'Crie atividades de caça ao tesouro grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de caça ao tesouro — teste grátis online',
    desc: 'Crie atividades de caça ao tesouro diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz jogos de pistas visuais onde as crianças seguem um caminho de imagens para encontrar o tesouro. Mais de 3.000 ilustrações em 104 temas. Formato adorado por crianças, perfeito para festas e atividades escolares. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'sudoku.ts': {
    pk: 'gerador de sudoku com imagens grátis crianças',
    sk: ['sudoku para imprimir grátis', 'sudoku com figuras grátis para crianças', 'criar sudoku visual online grátis', 'sudoku infantil grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'sudoku', 'sudoku visual', 'raciocínio lógico', 'jogos de lógica', 'teste grátis', 'licença comercial'],
    title: 'Sudoku com imagens grátis crianças | LCS',
    meta: 'Crie sudoku com imagens grátis para crianças. Grades visuais, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de sudoku com imagens — teste grátis online',
    desc: 'Crie sudoku com imagens diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz puzzles de sudoku onde os números são substituídos por imagens temáticas — tornando o jogo acessível para crianças que ainda não dominam números. Mais de 3.000 ilustrações em 104 temas. Desenvolve raciocínio lógico e resolução de problemas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'big-small.ts': {
    pk: 'atividades de comparação de tamanhos grátis',
    sk: ['atividades de grande e pequeno para imprimir grátis', 'exercícios de tamanhos grátis para crianças', 'grande e pequeno grátis online', 'atividades de comparação grátis'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'grande e pequeno', 'comparação de tamanhos', '104 temas', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Comparação de tamanhos grátis online | LCS',
    meta: 'Crie atividades de grande e pequeno grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Atividades de grande e pequeno — teste grátis online',
    desc: 'Crie atividades de comparação de tamanhos diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios onde as crianças identificam grande, médio e pequeno usando imagens temáticas. Habilidade fundamental na educação infantil. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'more-less.ts': {
    pk: 'atividades de maior e menor grátis',
    sk: ['atividades de mais e menos para imprimir grátis', 'exercícios de comparação numérica grátis', 'maior e menor grátis para crianças', 'atividades de quantidade grátis online'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'maior e menor', 'mais e menos', '104 temas', 'educação infantil', 'teste grátis', 'licença comercial'],
    title: 'Maior e menor grátis online | LCS',
    meta: 'Crie atividades de maior e menor grátis com imagens. Comparação visual, 104 temas, gabarito automático. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Atividades de maior e menor — teste grátis online',
    desc: 'Crie atividades de maior e menor diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios de comparação visual onde as crianças determinam qual grupo tem mais ou menos imagens. Desenvolve conceitos de quantidade e pré-numeracia. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
  'odd-one-out.ts': {
    pk: 'gerador de encontre o intruso grátis',
    sk: ['encontre o diferente para imprimir grátis', 'intruso grátis para crianças online', 'atividades de encontrar o diferente grátis', 'odd one out grátis para imprimir'],
    lsi: ['grátis online', 'sem cadastro', 'marca d\\\'água', 'imprimir', 'PDF', 'gabarito', 'encontre o intruso', 'encontre o diferente', '104 temas', 'raciocínio lógico', 'teste grátis', 'licença comercial'],
    title: 'Encontre o intruso grátis online | LCS',
    meta: 'Crie atividades de encontre o intruso grátis com imagens. 104 temas, gabarito automático, PDF imprimível. Teste online sem cadastro — marca d\\\'água removível.',
    h1: 'Gerador de encontre o intruso — teste grátis online',
    desc: 'Crie atividades de encontre o intruso diretamente no navegador — sem cadastro, sem instalação, sem custo. Este gerador produz exercícios onde as crianças observam um grupo de imagens e identificam qual não pertence ao conjunto. Desenvolve raciocínio lógico e categorização. Mais de 3.000 ilustrações em 104 temas. Exporte PDFs prontos para imprimir com gabarito automático. O teste grátis inclui todas as funcionalidades — os downloads vêm com marca d\\\'água. Para uso comercial, conheça a versão com licença.',
  },
};

// Apply SEO rewrites
let modified = 0;
for (const [file, data] of Object.entries(tools)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`  SKIP ${file} — not found`); continue; }
  let content = fs.readFileSync(fp, 'utf8');

  // Build new SEO block
  const skStr = data.sk.map(k => `      '${k}',`).join('\n');
  const lsiStr = data.lsi.map(k => `      '${k}',`).join('\n');
  const newSeo = `  seo: {\n    primaryKeyword: '${data.pk}',\n    secondaryKeywords: [\n${skStr}\n    ],\n    lsiKeywords: [\n${lsiStr}\n    ],\n    titleTag: '${data.title}',\n    metaDescription:\n      '${data.meta}',\n  },`;

  // Replace seo block (handle CRLF)
  const seoRegex = /  seo: \{[\s\S]*?\r?\n  \},/;
  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, newSeo);
  } else { console.log(`  WARN ${file} — seo block`); continue; }

  // Replace hero.title and hero.description
  const heroIdx = content.indexOf('hero: {');
  if (heroIdx !== -1) {
    // Title
    const tp = "title: '";
    const ts = content.indexOf(tp, heroIdx);
    if (ts !== -1) {
      const vs = ts + tp.length;
      let ve = -1;
      for (let i = vs; i < content.length; i++) { if (content[i]==='\\' && i+1<content.length){i++;continue;} if (content[i]==="'"){ve=i;break;} }
      if (ve !== -1) content = content.substring(0, vs) + data.h1 + content.substring(ve);
    }
    // Description (CRLF-aware)
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
  // Validate
  const tl = data.title.replace(/\\'/g,"'").length;
  const ml = data.meta.replace(/\\'/g,"'").length;
  const hl = data.h1.length;
  const w = [];
  if (tl>60) w.push('title='+tl);
  if (ml>155) w.push('meta='+ml);
  if (hl>70) w.push('H1='+hl);
  console.log(`  ✓ ${file}${w.length?' ⚠ '+w.join(', '):''}`);
}
console.log(`\nModified: ${modified}/${Object.keys(tools).length} files`);
