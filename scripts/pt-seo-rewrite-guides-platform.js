/**
 * Portuguese SEO Rewrite — Guide Content: Platform Guides (20 files)
 */
const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/guide-content/pt';

const guides = {
  'sell-math-worksheets-etsy.ts': {
    pk: 'vender atividades de matemática no Etsy guia',
    sk: ['como vender atividades de matemática no Etsy', 'dicas para vender imprimíveis de matemática Etsy', 'atividades de matemática Etsy SEO e preços', 'guia completo vendedor de matemática Etsy'],
    lsi: ['Etsy', 'atividades de matemática', 'imprimíveis', 'vendedor', 'SEO Etsy', 'etiquetas', 'preços', 'pacotes', 'licença comercial', 'renda extra', 'Hotmart', 'KDP'],
    title: 'Vender atividades de matemática no Etsy | LCS',
    meta: 'Guia completo para vender atividades de matemática no Etsy. SEO, preços, etiquetas, pacotes e dicas para maximizar vendas. Comece hoje.',
    h1: 'Como vender atividades de matemática no Etsy — guia completo',
    desc: 'Aprenda a vender atividades de matemática no Etsy e transforme exercícios imprimíveis em uma fonte de renda extra. Este guia cobre tudo: como criar listagens otimizadas com as etiquetas certas, precificar para maximizar lucros, montar pacotes que aumentam o valor médio do pedido e usar SEO do Etsy para aparecer nos resultados de busca. Atividades de matemática são um dos nichos mais estáveis no Etsy — pais e professores buscam o ano inteiro. Com o gerador do LessonCraftStudio, você cria produtos profissionais em minutos com licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'sell-word-search-etsy.ts': {
    pk: 'vender caça-palavras no Etsy dicas',
    sk: ['como vender caça-palavras no Etsy', 'caça-palavras imprimíveis para Etsy', 'dicas para vender sopa de letras Etsy', 'nicho de caça-palavras Etsy'],
    lsi: ['Etsy', 'caça-palavras', 'sopa de letras', 'imprimíveis', 'vendedor', 'SEO Etsy', 'licença comercial', 'renda extra', 'Hotmart', 'KDP'],
    title: 'Vender caça-palavras no Etsy — guia | LCS',
    meta: 'Guia para vender caça-palavras no Etsy. SEO, preços, pacotes temáticos e estratégias para destacar suas listagens. Comece com teste grátis.',
    h1: 'Como vender caça-palavras no Etsy — dicas e estratégias',
    desc: 'Descubra como vender caça-palavras no Etsy e aproveitar um dos nichos de imprimíveis mais populares. "Caça-palavras" é um dos termos mais buscados em português — e no Etsy, a competição em português é mínima. Este guia ensina a criar listagens otimizadas, escolher temas sazonais que vendem, precificar pacotes temáticos e usar etiquetas de SEO que atraem compradores. Com o gerador do LessonCraftStudio, você cria caça-palavras profissionais com gabarito colorido em minutos. Licença comercial inclusa. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'start-etsy-printable-shop.ts': {
    pk: 'abrir loja de imprimíveis no Etsy guia',
    sk: ['como abrir loja Etsy de imprimíveis', 'guia iniciante loja Etsy imprimíveis', 'criar loja Etsy atividades educativas', 'passo a passo loja Etsy Brasil'],
    lsi: ['Etsy', 'loja', 'imprimíveis', 'atividades educativas', 'iniciante', 'passo a passo', 'SEO', 'preços', 'licença comercial', 'renda extra', 'Hotmart'],
    title: 'Abrir loja de imprimíveis no Etsy | LCS',
    meta: 'Guia passo a passo para abrir sua loja de imprimíveis no Etsy. Da criação da conta às primeiras vendas. Comece hoje com teste grátis.',
    h1: 'Como abrir uma loja de imprimíveis no Etsy — passo a passo',
    desc: 'Aprenda a abrir sua loja de imprimíveis educativos no Etsy do zero, mesmo sem experiência. Este guia cobre cada etapa: criar conta, configurar a loja, criar suas primeiras listagens, otimizar para SEO do Etsy, definir preços competitivos e fazer as primeiras vendas. O Etsy é uma das melhores plataformas para vendedores brasileiros que querem alcançar o mercado global — e atividades educativas em português têm competição quase nula. Com os geradores do LessonCraftStudio, você cria produtos profissionais instantaneamente. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-etsy-coloring-pages.ts': {
    pk: 'criar desenhos para colorir que vendem no Etsy',
    sk: ['como criar páginas de colorir para Etsy', 'desenhos para colorir que vendem Etsy', 'nicho de colorir no Etsy', 'livros de colorir Etsy dicas'],
    lsi: ['Etsy', 'desenhos para colorir', 'páginas de colorir', 'imprimíveis', 'vendedor', 'KDP', 'licença comercial', 'renda extra', 'Hotmart', 'escala de cinza'],
    title: 'Colorir que vendem no Etsy — guia | LCS',
    meta: 'Crie desenhos para colorir que vendem no Etsy. Temas, preços, pacotes e dicas de SEO para maximizar vendas de páginas de colorir.',
    h1: 'Criar desenhos para colorir que vendem no Etsy',
    desc: 'Aprenda a criar desenhos para colorir que realmente vendem no Etsy. Páginas de colorir são um dos nichos mais lucrativos de imprimíveis — baixo custo de produção, alta demanda e compradores recorrentes. Este guia cobre: como escolher temas que vendem, criar pacotes temáticos atraentes, otimizar listagens com SEO do Etsy e precificar para maximizar lucros. Com o gerador do LessonCraftStudio, você cria páginas de colorir com mais de 3.000 imagens em 104 temas e modo escala de cinza para livros KDP. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'sell-educational-printables-etsy.ts': {
    pk: 'vender atividades educativas no Etsy iniciante',
    sk: ['como vender imprimíveis educativos no Etsy', 'guia iniciante vendedor Etsy educativo', 'atividades educativas para vender Etsy', 'imprimíveis para professores Etsy'],
    lsi: ['Etsy', 'atividades educativas', 'imprimíveis', 'iniciante', 'vendedor', 'SEO', 'preços', 'licença comercial', 'renda extra', 'Hotmart', 'KDP'],
    title: 'Vender atividades educativas no Etsy | LCS',
    meta: 'Guia para iniciantes: como vender atividades educativas no Etsy. Nichos, SEO, preços e primeiras vendas. Comece com teste grátis.',
    h1: 'Como vender atividades educativas no Etsy — guia para iniciantes',
    desc: 'Comece a vender atividades educativas no Etsy mesmo sem experiência prévia. Este guia para iniciantes cobre: escolher nichos lucrativos, criar listagens que convertem, usar etiquetas de SEO eficazes, precificar produtos e fazer suas primeiras vendas. Atividades educativas em português são um oceano azul no Etsy — pouquíssimos vendedores oferecem material em português, enquanto milhões de brasileiros buscam conteúdo educativo online. Com os geradores do LessonCraftStudio, você cria 33 tipos de atividades profissionais. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'price-etsy-printables.ts': {
    pk: 'como precificar imprimíveis no Etsy',
    sk: ['preços para imprimíveis Etsy', 'estratégia de preços Etsy atividades', 'quanto cobrar imprimíveis Etsy', 'precificação Etsy vendedor brasileiro'],
    lsi: ['Etsy', 'preços', 'precificação', 'imprimíveis', 'margem de lucro', 'pacotes', 'valor percebido', 'renda extra', 'Hotmart', 'KDP'],
    title: 'Precificar imprimíveis no Etsy — guia | LCS',
    meta: 'Como precificar imprimíveis no Etsy para maximizar lucros. Estratégias de preço, pacotes e valor percebido. Guia completo para vendedores.',
    h1: 'Como precificar imprimíveis no Etsy — estratégias de preço',
    desc: 'Aprenda a precificar seus imprimíveis no Etsy para maximizar lucros sem afugentar compradores. Este guia cobre: psicologia de preços, estratégias de pacotes que aumentam o valor médio, preços para diferentes tipos de atividades e como competir sem baixar preços. Vendedores que precificam estrategicamente ganham significativamente mais que os que simplesmente copiam concorrentes. Aprenda a calcular margens considerando as taxas do Etsy e a criar pacotes escalonados que incentivam compras maiores. Com os geradores do LessonCraftStudio, seu custo de produção é praticamente zero. Teste grátis com marca d\\\'água.',
  },
  'etsy-seo-educational-printables.ts': {
    pk: 'SEO do Etsy para atividades educativas 2026',
    sk: ['otimizar listagens Etsy atividades educativas', 'etiquetas Etsy imprimíveis educativos', 'SEO Etsy 2026 dicas vendedores', 'como ranquear no Etsy imprimíveis'],
    lsi: ['Etsy', 'SEO', 'etiquetas', 'palavras-chave', 'listagens', 'algoritmo', 'ranking', 'atividades educativas', 'imprimíveis', 'renda extra'],
    title: 'SEO Etsy atividades educativas (2026) | LCS',
    meta: 'SEO do Etsy para atividades educativas em 2026. Etiquetas, títulos, descrições e estratégias para ranquear suas listagens.',
    h1: 'SEO do Etsy para atividades educativas — guia atualizado 2026',
    desc: 'Domine o SEO do Etsy para atividades educativas e faça suas listagens aparecerem no topo dos resultados de busca. Este guia atualizado para 2026 cobre: como o algoritmo do Etsy funciona, escolher etiquetas que geram tráfego, escrever títulos otimizados, criar descrições que convertem e usar categorias estrategicamente. O SEO do Etsy é diferente do Google — e entender essas diferenças é a chave para vendas consistentes. Inclui exemplos práticos para atividades de matemática, caça-palavras, colorir e mais. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-etsy-worksheet-bundles.ts': {
    pk: 'criar pacotes de atividades para Etsy',
    sk: ['como criar bundles de atividades Etsy', 'pacotes de imprimíveis para Etsy', 'estratégia de pacotes Etsy', 'bundles educativos Etsy dicas'],
    lsi: ['Etsy', 'pacotes', 'bundles', 'atividades', 'imprimíveis', 'valor percebido', 'preços', 'SEO', 'licença comercial', 'renda extra'],
    title: 'Criar pacotes de atividades para Etsy | LCS',
    meta: 'Como criar pacotes de atividades que vendem no Etsy. Estratégias de bundling, preços e organização temática. Guia prático para vendedores.',
    h1: 'Como criar pacotes de atividades que vendem no Etsy',
    desc: 'Aprenda a criar pacotes de atividades que multiplicam suas vendas no Etsy. Pacotes (bundles) são a estratégia mais eficaz para aumentar o valor médio por pedido — compradores preferem pacotes completos a atividades individuais. Este guia cobre: como agrupar atividades por tema, série e tipo, precificar pacotes para máxima atratividade, criar listagens de pacotes otimizadas e usar pacotes como funil de vendas. Com os geradores do LessonCraftStudio, você cria 33 tipos de atividades em 104 temas — material ilimitado para pacotes. Teste grátis com marca d\\\'água.',
  },
  'math-activity-books-kdp.ts': {
    pk: 'criar apostilas de matemática para Amazon KDP',
    sk: ['como publicar apostila de matemática KDP', 'livro de atividades de matemática Amazon', 'apostila de exercícios KDP guia', 'caderno de matemática Amazon KDP'],
    lsi: ['Amazon KDP', 'apostila', 'livro de atividades', 'matemática', 'formatação', 'ISBN', 'capa', 'interior', 'royalties', 'renda passiva', 'Hotmart'],
    title: 'Apostilas de matemática para Amazon KDP | LCS',
    meta: 'Guia para criar apostilas de matemática para Amazon KDP. Formatação, capa, preços e estratégias para vender livros de atividades.',
    h1: 'Como criar apostilas de matemática para Amazon KDP',
    desc: 'Aprenda a criar e publicar apostilas de matemática no Amazon KDP e gere renda passiva com livros de atividades. Este guia cobre: formatação do interior (tamanhos de corte, margens, sangria), design de capas profissionais, escolha de palavras-chave KDP, estratégia de preços para maximizar royalties e como escalar com múltiplos títulos. O mercado brasileiro de livros de atividades na Amazon cresce rapidamente e a competição em português é mínima. Com o LessonCraftStudio, você gera conteúdo para centenas de páginas em minutos. Teste grátis com marca d\\\'água.',
  },
  'publish-puzzle-books-kdp.ts': {
    pk: 'publicar livros de passatempos no Amazon KDP',
    sk: ['como publicar livro de puzzles KDP', 'livros de passatempos Amazon guia', 'livro de quebra-cabeças KDP', 'publicar livro de jogos Amazon'],
    lsi: ['Amazon KDP', 'livro de passatempos', 'puzzles', 'quebra-cabeças', 'formatação', 'ISBN', 'capa', 'royalties', 'renda passiva', 'Hotmart', 'nichos'],
    title: 'Livros de passatempos para KDP — guia | LCS',
    meta: 'Guia para publicar livros de passatempos no Amazon KDP. Caça-palavras, sudoku, criptogramas e mais. Formatação, preços e estratégias.',
    h1: 'Como publicar livros de passatempos no Amazon KDP',
    desc: 'Aprenda a publicar livros de passatempos no Amazon KDP — um dos nichos mais lucrativos de baixo conteúdo. Este guia cobre: quais tipos de puzzles vendem melhor (caça-palavras, sudoku, criptogramas, palavras cruzadas), como formatar interiores para KDP, criar capas atraentes, escolher palavras-chave e definir preços. Livros de passatempos em português têm competição mínima na Amazon brasileira. Com o LessonCraftStudio, você gera centenas de puzzles únicos em minutos com 33 geradores diferentes. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'word-search-books-kdp.ts': {
    pk: 'criar livros de caça-palavras para KDP',
    sk: ['livro de caça-palavras Amazon KDP guia', 'publicar livro de sopa de letras KDP', 'como criar livro de caça-palavras', 'caça-palavras KDP nicho lucrativo'],
    lsi: ['Amazon KDP', 'livro de caça-palavras', 'sopa de letras', 'formatação', 'capa', 'royalties', 'renda passiva', 'nichos lucrativos', 'Hotmart'],
    title: 'Livros de caça-palavras para KDP — guia | LCS',
    meta: 'Crie livros de caça-palavras para Amazon KDP. Um dos nichos mais lucrativos. Formatação, temas, preços e estratégias de publicação.',
    h1: 'Como criar livros de caça-palavras para Amazon KDP',
    desc: 'Crie livros de caça-palavras para Amazon KDP e aproveite um dos nichos mais lucrativos de baixo conteúdo. Este guia cobre: como formatar interiores de caça-palavras para KDP, criar capas profissionais, escolher temas que vendem, definir dificuldade progressiva e precificar para maximizar royalties. "Caça-palavras" é um dos termos mais buscados no Brasil e livros de caça-palavras vendem consistentemente na Amazon. Com o gerador do LessonCraftStudio, você cria grades de 5×5 a 30×30 com gabarito colorido. Teste grátis com marca d\\\'água.',
  },
  'make-money-kdp-activity-books.ts': {
    pk: 'ganhar dinheiro com apostilas KDP 2026',
    sk: ['como ganhar dinheiro Amazon KDP atividades', 'renda passiva KDP livros de atividades', 'quanto dá para ganhar KDP apostilas', 'negócio de apostilas Amazon KDP 2026'],
    lsi: ['Amazon KDP', 'ganhar dinheiro', 'renda passiva', 'apostilas', 'livros de atividades', 'royalties', 'nichos', 'estratégia', 'Hotmart', 'renda extra'],
    title: 'Ganhar dinheiro com apostilas KDP (2026) | LCS',
    meta: 'Como ganhar dinheiro com apostilas no Amazon KDP em 2026. Nichos, estratégias, royalties e escalamento. Guia completo para iniciantes.',
    h1: 'Como ganhar dinheiro com apostilas no Amazon KDP em 2026',
    desc: 'Descubra como ganhar dinheiro com apostilas de atividades no Amazon KDP em 2026. Este guia cobre: nichos lucrativos para livros de atividades, quanto é possível ganhar com royalties, estratégias de publicação em série, como escalar de um livro para um catálogo completo e erros comuns que iniciantes devem evitar. O mercado brasileiro de livros de atividades na Amazon está em crescimento acelerado com competição mínima em português. Com o LessonCraftStudio, seu custo de produção é praticamente zero — gere centenas de páginas em minutos. Teste grátis com marca d\\\'água.',
  },
  'kdp-formatting-worksheets.ts': {
    pk: 'formatação KDP para livros de atividades guia',
    sk: ['como formatar interior KDP atividades', 'tamanho de corte KDP apostilas', 'margens e sangria KDP livros atividades', 'PDF interior KDP formatação guia'],
    lsi: ['Amazon KDP', 'formatação', 'interior', 'tamanho de corte', 'margens', 'sangria', 'PDF', 'apostila', 'livro de atividades', 'impressão'],
    title: 'Formatação KDP livros de atividades | LCS',
    meta: 'Guia de formatação KDP para livros de atividades. Tamanho de corte, margens, sangria, resolução e PDF interior. Passo a passo.',
    h1: 'Formatação KDP para livros de atividades — guia completo',
    desc: 'Domine a formatação KDP para livros de atividades e evite rejeições. Este guia técnico cobre: tamanhos de corte recomendados para apostilas (8.5×11, 8×10, 6×9), configuração de margens e sangria, resolução mínima (300 DPI), criação do PDF interior, como montar a capa com a calculadora de lombada do KDP e checklist de pré-publicação. Formatação incorreta é o motivo número um de rejeições no KDP. Com o LessonCraftStudio, suas exportações já saem em 300 DPI nos formatos corretos. Teste grátis com marca d\\\'água.',
  },
  'best-kdp-activity-book-niches.ts': {
    pk: 'melhores nichos de apostilas KDP 2026',
    sk: ['nichos lucrativos KDP livros de atividades', 'melhores nichos Amazon KDP 2026', 'nichos de apostilas com baixa competição', 'pesquisa de nicho KDP atividades'],
    lsi: ['Amazon KDP', 'nichos', 'lucrativos', 'apostilas', 'competição', 'pesquisa', 'palavras-chave', 'tendências', '2026', 'renda passiva'],
    title: 'Melhores nichos apostilas KDP (2026) | LCS',
    meta: 'Melhores nichos de apostilas para Amazon KDP em 2026. Análise de competição, tendências e oportunidades em português.',
    h1: 'Melhores nichos de apostilas para Amazon KDP em 2026',
    desc: 'Descubra os melhores nichos de apostilas para Amazon KDP em 2026 — onde a demanda é alta e a competição é baixa. Este guia analisa: nichos perenes vs. sazonais, como pesquisar competição e demanda, tendências emergentes em livros de atividades, nichos específicos para o mercado brasileiro em português e como validar um nicho antes de publicar. O mercado de apostilas em português no KDP está praticamente vazio comparado ao inglês — quem publicar primeiro domina. Com o LessonCraftStudio, você testa nichos rapidamente. Teste grátis com marca d\\\'água.',
  },
  'sudoku-books-kdp.ts': {
    pk: 'criar livros de sudoku para Amazon KDP',
    sk: ['livro de sudoku Amazon KDP guia', 'publicar livro de sudoku KDP', 'sudoku com imagens KDP nicho', 'como criar livro de sudoku para vender'],
    lsi: ['Amazon KDP', 'sudoku', 'livro de sudoku', 'formatação', 'capa', 'royalties', 'nichos', 'sudoku visual', 'crianças', 'raciocínio lógico'],
    title: 'Livros de sudoku para Amazon KDP — guia | LCS',
    meta: 'Crie livros de sudoku para Amazon KDP. Sudoku com imagens para crianças, formatação, preços e estratégias de publicação.',
    h1: 'Como criar livros de sudoku para Amazon KDP',
    desc: 'Crie livros de sudoku para Amazon KDP e aproveite um dos nichos de puzzles mais lucrativos. Este guia cobre: sudoku tradicional vs. sudoku com imagens para crianças, formatação de interiores para KDP, progressão de dificuldade, design de capas e estratégia de preços. Sudoku com imagens é um diferencial exclusivo — acessível para crianças que ainda não dominam números. Com o gerador do LessonCraftStudio, você cria puzzles com mais de 3.000 imagens em 104 temas. Competição mínima em português no KDP. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'kdp-vs-etsy-printables.ts': {
    pk: 'Amazon KDP ou Etsy para vender imprimíveis',
    sk: ['KDP vs Etsy comparação vendedores', 'onde vender imprimíveis KDP ou Etsy', 'melhor plataforma para imprimíveis', 'KDP e Etsy diferenças vendedores'],
    lsi: ['Amazon KDP', 'Etsy', 'comparação', 'imprimíveis', 'royalties', 'taxas', 'vantagens', 'desvantagens', 'Hotmart', 'Kiwify', 'renda extra'],
    title: 'KDP vs Etsy: onde vender imprimíveis | LCS',
    meta: 'Amazon KDP ou Etsy para vender imprimíveis? Comparação completa: taxas, público, vantagens e quando usar cada plataforma.',
    h1: 'KDP vs Etsy: onde vender seus imprimíveis educativos',
    desc: 'KDP ou Etsy — qual é a melhor plataforma para vender seus imprimíveis educativos? Este guia compara as duas em detalhes: taxas e royalties, tipo de público, formato de produto (PDF vs. livro impresso), esforço de marketing, escalabilidade e potencial de renda passiva. A resposta curta: use as duas, mas para produtos diferentes. Etsy para PDFs individuais e pacotes digitais, KDP para livros e apostilas encadernadas. E não esqueça o mercado brasileiro: Hotmart e Kiwify complementam ambas com público local. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'create-sell-tpt-resources.ts': {
    pk: 'vender atividades na Hotmart e Tá Pronto',
    sk: ['como vender atividades na Hotmart', 'vender material didático Tá Pronto', 'Hotmart para vendedores de atividades', 'plataformas brasileiras para imprimíveis'],
    lsi: ['Hotmart', 'Tá Pronto', 'Kiwify', 'Eduzz', 'atividades educativas', 'material didático', 'vendedor', 'infoprodutos', 'PIX', 'renda extra', 'Brasil'],
    title: 'Vender atividades na Hotmart e Kiwify | LCS',
    meta: 'Guia para vender atividades educativas na Hotmart, Kiwify e Tá Pronto. Plataformas brasileiras para vendedores de imprimíveis.',
    h1: 'Como vender atividades na Hotmart, Kiwify e Tá Pronto',
    desc: 'Aprenda a vender atividades educativas nas principais plataformas brasileiras: Hotmart, Kiwify, Tá Pronto e Eduzz. Este guia é essencial para o mercado brasileiro — a Hotmart é a plataforma dominante para infoprodutos no Brasil com mais de 500.000 produtos e pagamento via PIX. A Kiwify cresce explosivamente com taxas menores. O Tá Pronto é o "Teachers Pay Teachers brasileiro", específico para materiais didáticos. Cada plataforma tem suas vantagens: este guia cobre como configurar, precificar e vender em cada uma. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'tpt-store-optimization.ts': {
    pk: 'otimizar loja na Hotmart e Kiwify',
    sk: ['como otimizar loja Hotmart', 'SEO Hotmart para vendedores', 'otimização Kiwify dicas', 'aumentar vendas Hotmart Kiwify'],
    lsi: ['Hotmart', 'Kiwify', 'otimização', 'SEO', 'vendas', 'conversão', 'descrição', 'capa', 'preços', 'afiliados', 'Brasil', 'renda extra'],
    title: 'Otimizar loja Hotmart e Kiwify — guia | LCS',
    meta: 'Como otimizar sua loja na Hotmart e Kiwify para maximizar vendas. SEO, descrições, capas, preços e programa de afiliados.',
    h1: 'Como otimizar sua loja na Hotmart e Kiwify',
    desc: 'Otimize sua loja na Hotmart e Kiwify para maximizar vendas de atividades educativas. Este guia cobre: como escrever descrições que convertem, criar capas de produtos atraentes, definir preços competitivos, ativar e gerenciar o programa de afiliados (50% de comissão é o padrão do mercado), otimizar para busca interna da plataforma e usar estratégias de upsell. A Hotmart e a Kiwify são as plataformas mais importantes para vendedores brasileiros de infoprodutos educativos. Com o LessonCraftStudio, seu catálogo cresce rapidamente. Teste grátis com marca d\\\'água.',
  },
  'sell-printables-gumroad.ts': {
    pk: 'vender imprimíveis no Gumroad guia',
    sk: ['como vender imprimíveis no Gumroad', 'Gumroad para vendedores de atividades', 'guia Gumroad imprimíveis educativos', 'vender PDFs no Gumroad'],
    lsi: ['Gumroad', 'imprimíveis', 'atividades educativas', 'vendedor', 'preços', 'pagamentos', 'marketing', 'renda extra', 'Hotmart', 'Etsy'],
    title: 'Vender imprimíveis no Gumroad — guia | LCS',
    meta: 'Guia para vender imprimíveis educativos no Gumroad. Configuração, preços, marketing e dicas para maximizar vendas.',
    h1: 'Como vender imprimíveis educativos no Gumroad',
    desc: 'Aprenda a vender imprimíveis educativos no Gumroad — uma plataforma simples e direta para criadores digitais. Este guia cobre: como configurar sua página de vendas, definir preços, aceitar pagamentos internacionais, promover seus produtos e construir uma audiência. O Gumroad é uma boa opção complementar às plataformas brasileiras (Hotmart, Kiwify) e ao Etsy, especialmente para vendedores que querem controle total sobre a experiência de compra. Com o LessonCraftStudio, você cria produtos profissionais em minutos. Teste grátis com marca d\\\'água — sem cadastro.',
  },
  'sell-creative-fabrica.ts': {
    pk: 'vender recursos educativos no Creative Fabrica',
    sk: ['como vender no Creative Fabrica', 'Creative Fabrica para vendedores educativos', 'imprimíveis Creative Fabrica guia', 'vender atividades Creative Fabrica'],
    lsi: ['Creative Fabrica', 'imprimíveis', 'atividades educativas', 'vendedor', 'marketplace', 'assinatura', 'renda extra', 'Etsy', 'Hotmart'],
    title: 'Vender no Creative Fabrica — guia | LCS',
    meta: 'Guia para vender recursos educativos no Creative Fabrica. Configuração, regras da plataforma e estratégias para vendedores.',
    h1: 'Como vender recursos educativos no Creative Fabrica',
    desc: 'Aprenda a vender recursos educativos no Creative Fabrica — um marketplace crescente para designers e criadores de conteúdo. Este guia cobre: como se inscrever como vendedor, entender o modelo de assinatura vs. compras individuais, otimizar suas listagens, criar produtos que se destacam e maximizar receitas. O Creative Fabrica é uma excelente plataforma complementar ao Etsy e à Hotmart, com público global ávido por materiais educativos. Com o LessonCraftStudio, você gera atividades profissionais em 33 formatos diferentes. Teste grátis com marca d\\\'água — sem cadastro.',
  },
};

// Apply SEO rewrites
let modified = 0;
for (const [file, data] of Object.entries(guides)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`  SKIP ${file} — not found`); continue; }
  let content = fs.readFileSync(fp, 'utf8');

  const skStr = data.sk.map(k => `      '${k}',`).join('\n');
  const lsiStr = data.lsi.map(k => `      '${k}',`).join('\n');
  const newSeo = `  seo: {\n    primaryKeyword: '${data.pk}',\n    secondaryKeywords: [\n${skStr}\n    ],\n    lsiKeywords: [\n${lsiStr}\n    ],\n    titleTag: '${data.title}',\n    metaDescription:\n      '${data.meta}',\n  },`;

  const seoRegex = /  seo: \{[\s\S]*?\r?\n  \},/;
  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, newSeo);
  } else { console.log(`  WARN ${file} — seo block`); continue; }

  // Replace hero.title and hero.description
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
