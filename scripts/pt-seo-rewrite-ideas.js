const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/idea-content/pt';

const ideas = {
  // === E1: Theme ideas (8) ===
  'farm-animals-printable-ideas.ts': {
    pk: 'imprimíveis de animais da fazenda para vender',
    title: 'Imprimíveis fazenda para Etsy | LCS',
    meta: 'Descubra como criar e vender imprimíveis de animais da fazenda no Etsy, Hotmart e KDP. Ideias de produtos, nichos rentáveis e estratégias para vendedores.',
    h1: 'Imprimíveis de Animais da Fazenda — Ideias para Vender Online',
    desc: 'O nicho de animais da fazenda é um dos mais estáveis no mercado de imprimíveis educativos. Pais e educadores buscam atividades com vacas, porcos e galinhas o ano todo, com picos na primavera e no outono. Para vendedores no Etsy, Hotmart e Amazon KDP, esse tema oferece demanda constante e espaço para diferenciação criativa. Crie atividades de contagem, caça-palavras, labirintos e páginas para colorir com tema fazenda. Pacotes temáticos completos alcançam preços mais altos e aumentam o valor médio do pedido. Use nossas ferramentas para gerar produtos profissionais rapidamente. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades animais da fazenda para vender Etsy',
      'negócio imprimíveis tema fazenda Hotmart',
      'atividades educativas fazenda para vendedores',
      'vender imprimíveis fazenda Amazon KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'ocean-animals-printable-ideas.ts': {
    pk: 'imprimíveis de animais marinhos ideias negócio',
    title: 'Imprimíveis animais marinhos | LCS',
    meta: 'Ideias de imprimíveis de animais marinhos para vender online. Nichos rentáveis no Etsy, Hotmart e KDP com atividades de fundo do mar para crianças.',
    h1: 'Animais Marinhos — Ideias de Imprimíveis para Negócio Online',
    desc: 'Animais marinhos são um tema fascinante que atrai compradores o ano todo, com pico no verão. Baleias, golfinhos, tubarões e tartarugas marinhas encantam crianças de todas as idades. Para vendedores de imprimíveis, esse nicho permite criar atividades de contagem, labirintos, caça-palavras e páginas para colorir com apelo visual forte. No Etsy, listagens com temas oceânicos têm alta taxa de conversão. No Hotmart e Kiwify, pacotes educativos completos de fundo do mar vendem bem para educadores. No Amazon KDP, livros de atividades marinhas atingem boa classificação na busca. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades animais marinhos para vender',
      'imprimíveis fundo do mar Etsy',
      'negócio atividades oceano Hotmart',
      'livros atividades marinhas KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'safari-animals-printable-ideas.ts': {
    pk: 'imprimíveis de animais de safari para vender',
    title: 'Imprimíveis safari para vender | LCS',
    meta: 'Crie e venda imprimíveis de animais de safari no Etsy, Hotmart e KDP. Leões, elefantes e girafas em atividades educativas que vendem o ano todo.',
    h1: 'Imprimíveis de Safari — Nicho Lucrativo para Vendedores',
    desc: 'O tema safari com leões, elefantes, girafas e zebras é um dos mais populares no mercado de imprimíveis infantis. A demanda é constante durante todo o ano, sem depender de sazonalidade. Vendedores podem criar atividades de contagem, correspondência, caça-palavras e labirintos com animais africanos. No Etsy, esse nicho tem concorrência moderada e alto potencial de vendas. No Hotmart, pacotes completos de safari para educação infantil alcançam bons preços. No Amazon KDP, livros de atividades de safari atraem pais que buscam material educativo envolvente. Diversifique com pacotes por faixa etária para maximizar receita. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades safari para vender Etsy',
      'imprimíveis animais africanos negócio',
      'pacotes safari educativos Hotmart',
      'livros atividades safari KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'pets-printable-ideas.ts': {
    pk: 'imprimíveis de animais de estimação para Etsy',
    title: 'Imprimíveis pets para Etsy | LCS',
    meta: 'Venda imprimíveis de animais de estimação no Etsy e Hotmart. Gatos, cães e coelhos em atividades educativas com alta demanda. Ideias de nicho rentável.',
    h1: 'Imprimíveis de Animais de Estimação — Ideias para Etsy',
    desc: 'Animais de estimação são o tema mais próximo do coração das crianças. Gatos, cães, coelhos e hamsters geram conexão emocional imediata, o que aumenta a taxa de conversão nas plataformas de venda. No Etsy, imprimíveis de pets têm demanda constante e forte apelo para pais e educadores. No Hotmart, pacotes temáticos com atividades de contagem, labirintos, caça-palavras e páginas para colorir de animais de estimação vendem bem o ano todo. No Amazon KDP, livros de atividades com pets atraem compradores impulsivos. Crie produtos em múltiplos formatos e faixas de preço para maximizar sua receita nesse nicho perene. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades animais de estimação para vender',
      'imprimíveis pets Etsy Hotmart',
      'negócio atividades cães gatos',
      'vender imprimíveis pets online',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'dinosaur-printable-ideas.ts': {
    pk: 'imprimíveis de dinossauros ideias negócio',
    title: 'Imprimíveis dinossauros — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de dinossauros. Crie e venda atividades educativas no Etsy, Hotmart e KDP. Nicho com alta demanda o ano todo.',
    h1: 'Dinossauros — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'Dinossauros são um dos temas mais procurados por crianças de todas as idades. T-Rex, Triceratops e Estegossauro geram fascínio constante que se traduz em vendas durante todo o ano. Para vendedores de imprimíveis, esse nicho permite criar atividades de contagem, caça-palavras, quebra-cabeças, labirintos e páginas para colorir com apelo irresistível. No Etsy, listagens de dinossauros têm alta visibilidade. No Hotmart, pacotes educativos completos com tema jurássico alcançam preços premium. No Amazon KDP, livros de atividades de dinossauros são bestsellers na categoria infantil. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades dinossauros para vender',
      'imprimíveis tema jurássico Etsy',
      'negócio atividades dinossauros Hotmart',
      'livros dinossauros Amazon KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'birds-printable-ideas.ts': {
    pk: 'imprimíveis de pássaros para vender',
    title: 'Imprimíveis pássaros para vender | LCS',
    meta: 'Crie e venda imprimíveis de pássaros no Etsy, Hotmart e KDP. Atividades educativas com aves para crianças. Nicho com baixa concorrência e boa demanda.',
    h1: 'Imprimíveis de Pássaros — Nicho para Vendedores Online',
    desc: 'O nicho de pássaros é uma oportunidade subexplorada no mercado de imprimíveis educativos. Papagaios, corujas, tucanos e águias encantam crianças e oferecem conexão natural com ciências e natureza. A concorrência é menor que em temas como dinossauros ou fazenda, permitindo que novos vendedores se destaquem rapidamente. No Etsy, atividades com tema de aves têm boa taxa de conversão. No Hotmart, pacotes de atividades de pássaros para educação infantil atendem a uma demanda crescente. No Amazon KDP, livros de atividades de aves se beneficiam da busca por conteúdo educativo de natureza. Crie caça-palavras, labirintos e páginas para colorir. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades pássaros para vender Etsy',
      'imprimíveis aves educativos Hotmart',
      'negócio atividades pássaros online',
      'livros atividades aves KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'insects-printable-ideas.ts': {
    pk: 'imprimíveis de insetos ideias negócio',
    title: 'Imprimíveis insetos — Ideias negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de insetos para Etsy, Hotmart e KDP. Borboletas, joaninhas e abelhas em atividades educativas que vendem bem.',
    h1: 'Insetos — Ideias de Negócio com Imprimíveis para Vender',
    desc: 'Insetos oferecem um nicho versátil para vendedores de imprimíveis educativos. Borboletas, joaninhas, abelhas e formigas são temas populares que combinam apelo visual com valor educativo em ciências naturais. A demanda cresce na primavera e verão, mas mantém base sólida o ano todo. No Etsy, atividades com tema de insetos atraem pais que buscam conteúdo sobre natureza. No Hotmart, pacotes educativos de insetos para educação infantil têm espaço para crescer. No Amazon KDP, livros de atividades com insetos ocupam um nicho específico com concorrência moderada. Crie atividades de contagem, correspondência e caça-palavras com insetos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades insetos para vender online',
      'imprimíveis borboletas joaninhas Etsy',
      'negócio atividades insetos Hotmart',
      'livros atividades insetos KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'forest-animals-printable-ideas.ts': {
    pk: 'imprimíveis animais da floresta para Etsy',
    title: 'Imprimíveis floresta para Etsy | LCS',
    meta: 'Venda imprimíveis de animais da floresta no Etsy e Hotmart. Ursos, raposas e coelhos em atividades educativas. Nicho perene com forte demanda.',
    h1: 'Animais da Floresta — Imprimíveis para Vender no Etsy',
    desc: 'Animais da floresta como ursos, raposas, corujas e coelhos são um tema encantador com forte apelo no mercado de imprimíveis. O estilo visual woodland é tendência no design infantil, o que impulsiona vendas de atividades educativas com esse tema. No Etsy, listagens de animais da floresta têm alta demanda durante o outono, mas vendem bem o ano todo. No Hotmart, pacotes educativos completos com tema floresta atendem educadores que buscam material temático integrado. No Amazon KDP, livros de atividades woodland atraem pais que valorizam estética e conteúdo educativo. Crie labirintos, caça-palavras e contagem com animais da floresta. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades animais da floresta para vender',
      'imprimíveis woodland Etsy Hotmart',
      'negócio atividades floresta educativos',
      'livros animais da floresta KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },

  // === E2: Season/holiday ideas (10) ===
  'christmas-printable-ideas.ts': {
    pk: 'imprimíveis de Natal para vender no Etsy',
    title: 'Imprimíveis de Natal para Etsy | LCS',
    meta: 'Crie e venda imprimíveis de Natal no Etsy, Hotmart e KDP. Atividades natalinas com alta demanda sazonal. Estratégias de lançamento e precificação.',
    h1: 'Imprimíveis de Natal — Como Vender Atividades Natalinas',
    desc: 'O Natal é a época mais lucrativa para vendedores de imprimíveis educativos. A demanda por atividades natalinas dispara entre outubro e dezembro, gerando o maior volume de vendas do ano. Papai Noel, renas, árvores de Natal e presentes são temas que vendem massivamente. No Etsy, listagens de Natal dominam a busca na temporada. No Hotmart, pacotes natalinos completos alcançam preços premium. No Amazon KDP, livros de atividades de Natal são bestsellers sazonais. A chave é publicar seus produtos até setembro para capturar o tráfego de busca antecipado. Crie caça-palavras, labirintos, contagem e páginas para colorir natalinas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades de Natal para vender Etsy',
      'imprimíveis natalinos Hotmart',
      'negócio atividades Natal online',
      'livros atividades Natal KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'halloween-printable-ideas.ts': {
    pk: 'imprimíveis de Halloween ideias negócio',
    title: 'Imprimíveis Halloween — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de Halloween. Venda atividades educativas no Etsy, Hotmart e KDP. Nicho sazonal com pico forte em outubro.',
    h1: 'Halloween — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'O Halloween é uma data sazonal poderosa para vendedores de imprimíveis, mesmo no Brasil onde a celebração cresce a cada ano. Abóboras, fantasmas, morcegos e bruxas geram forte engajamento infantil. No Etsy, a demanda por atividades de Halloween explode em setembro e outubro, especialmente no mercado americano — perfeito para vendedores brasileiros que vendem em inglês. No Hotmart, pacotes temáticos de Halloween atendem educadores que buscam material diferenciado. No Amazon KDP, livros de atividades de Halloween alcançam alta classificação na temporada. Publique seus produtos até agosto para capturar o tráfego antecipado. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades Halloween para vender',
      'imprimíveis Halloween Etsy negócio',
      'pacotes Halloween educativos Hotmart',
      'livros atividades Halloween KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'easter-printable-ideas.ts': {
    pk: 'imprimíveis de Páscoa para vender no Etsy',
    title: 'Imprimíveis de Páscoa para Etsy | LCS',
    meta: 'Venda imprimíveis de Páscoa no Etsy, Hotmart e KDP. Coelhos, ovos e atividades pascais com forte demanda sazonal. Guia completo para vendedores.',
    h1: 'Imprimíveis de Páscoa — Atividades para Vender Online',
    desc: 'A Páscoa é uma das datas mais importantes para vendedores de imprimíveis no Brasil e no mercado internacional. Coelhos, ovos coloridos e chocolate geram forte apelo emocional que impulsiona vendas entre fevereiro e abril. No Etsy, atividades pascais têm alta conversão no período. No Hotmart, pacotes completos de Páscoa para educação infantil alcançam preços elevados. No Amazon KDP, livros de atividades de Páscoa vendem bem como presentes complementares. A Páscoa é especialmente forte no mercado brasileiro, onde a data tem grande importância cultural. Crie caça-palavras, contagem, labirintos e páginas para colorir com tema pascal. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades Páscoa para vender Etsy',
      'imprimíveis pascais Hotmart',
      'negócio atividades Páscoa online',
      'livros atividades Páscoa KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'valentines-day-printable-ideas.ts': {
    pk: 'imprimíveis de Dia dos Namorados para vender',
    title: 'Imprimíveis Dia dos Namorados | LCS',
    meta: 'Crie e venda imprimíveis de Dia dos Namorados. Atividades educativas com corações e amor para Etsy, Hotmart e KDP. Nicho sazonal lucrativo.',
    h1: 'Dia dos Namorados — Imprimíveis para Vender Online',
    desc: 'O Dia dos Namorados oferece duas oportunidades para vendedores brasileiros de imprimíveis: 12 de junho no Brasil e 14 de fevereiro no mercado internacional (Valentine\\\'s Day). Corações, amor e amizade são temas que geram forte conexão emocional em atividades educativas infantis. No Etsy, atividades de Valentine\\\'s Day têm demanda explosiva em janeiro e fevereiro. No Hotmart, pacotes temáticos de Dia dos Namorados atendem o mercado brasileiro em maio e junho. No Amazon KDP, livros de atividades românticas vendem bem em ambas as datas. Explore os dois calendários para maximizar suas vendas ao longo do ano. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades Dia dos Namorados para vender',
      'imprimíveis Valentine\\\'s Day Etsy',
      'negócio atividades corações Hotmart',
      'livros atividades românticas KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'back-to-school-printable-ideas.ts': {
    pk: 'imprimíveis volta às aulas para vender Etsy',
    title: 'Imprimíveis volta às aulas Etsy | LCS',
    meta: 'Venda imprimíveis de volta às aulas no Etsy e Hotmart. Atividades educativas com alta demanda em janeiro-fevereiro (BR) e agosto-setembro (EUA).',
    h1: 'Volta às Aulas — Imprimíveis para Vender no Etsy',
    desc: 'A volta às aulas é um dos períodos mais lucrativos para vendedores de imprimíveis educativos. No Brasil, a demanda começa em janeiro; nos EUA e Europa, em agosto-setembro. Isso significa dois picos de venda por ano para quem vende em múltiplos mercados. Atividades de reconhecimento de letras, contagem, caça-palavras e organização escolar têm alta procura nesse período. No Etsy, listagens de volta às aulas dominam a busca na temporada. No Hotmart, pacotes completos para início do ano letivo alcançam preços premium. No Amazon KDP, livros de atividades escolares vendem como presentes de volta às aulas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades volta às aulas para vender',
      'imprimíveis início ano letivo Etsy',
      'negócio atividades escolares Hotmart',
      'material volta às aulas KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'summer-printable-ideas.ts': {
    pk: 'imprimíveis de verão ideias negócio',
    title: 'Imprimíveis de verão — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de verão. Atividades educativas de férias para Etsy, Hotmart e KDP. Nicho sazonal com forte demanda.',
    h1: 'Verão — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'O verão cria forte demanda por atividades educativas que mantêm as crianças aprendendo durante as férias. Praia, sol, sorvete e férias são temas que vendem bem nessa temporada. No Brasil, o verão vai de dezembro a março; nos EUA e Europa, de junho a agosto — dois ciclos de venda para vendedores multilíngues. No Etsy, atividades de verão têm alta demanda de pais que buscam evitar a perda de aprendizado nas férias. No Hotmart, pacotes de atividades de férias atendem famílias brasileiras. No Amazon KDP, livros de atividades de verão são populares como presentes. Crie caça-palavras, labirintos e contagem com tema praia. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades verão para vender online',
      'imprimíveis férias educativos Etsy',
      'negócio atividades verão Hotmart',
      'livros atividades férias KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'winter-printable-ideas.ts': {
    pk: 'imprimíveis de inverno para vender no Etsy',
    title: 'Imprimíveis de inverno para Etsy | LCS',
    meta: 'Venda imprimíveis de inverno no Etsy, Hotmart e KDP. Atividades com neve, frio e animais polares. Nicho sazonal com demanda em múltiplos mercados.',
    h1: 'Imprimíveis de Inverno — Atividades para Vender no Etsy',
    desc: 'O inverno oferece um nicho sazonal forte para vendedores de imprimíveis educativos. Neve, bonecos de neve, animais polares e roupas de frio são temas que encantam crianças. No mercado internacional, a demanda é enorme entre novembro e fevereiro. Para vendedores brasileiros que vendem em inglês no Etsy, esse nicho é altamente lucrativo. No Hotmart, atividades de inverno atendem escolas bilíngues e famílias que exploram temas sazonais globais. No Amazon KDP, livros de atividades de inverno vendem bem durante toda a estação fria do hemisfério norte. Crie caça-palavras, labirintos, contagem e páginas para colorir com tema invernal. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades inverno para vender Etsy',
      'imprimíveis neve animais polares',
      'negócio atividades inverno Hotmart',
      'livros atividades inverno KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'spring-printable-ideas.ts': {
    pk: 'imprimíveis de primavera ideias negócio',
    title: 'Imprimíveis primavera — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de primavera. Flores, borboletas e jardim em atividades educativas para Etsy, Hotmart e KDP.',
    h1: 'Primavera — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'A primavera é uma das estações mais lucrativas para vendedores de imprimíveis educativos. Flores, borboletas, jardins e chuva geram apelo visual forte e conexão com ciências naturais. A demanda cresce entre março e maio no hemisfério norte, e entre setembro e novembro no Brasil. No Etsy, atividades de primavera têm alta conversão com fotos de listagem coloridas. No Hotmart, pacotes educativos com tema primavera atendem educadores que planejam unidades sazonais. No Amazon KDP, livros de atividades de primavera vendem como presentes criativos. Combine temas de primavera com atividades de contagem, caça-palavras e labirintos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades primavera para vender',
      'imprimíveis flores borboletas Etsy',
      'negócio atividades primavera Hotmart',
      'livros atividades primavera KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'thanksgiving-printable-ideas.ts': {
    pk: 'imprimíveis de Ação de Graças para vender',
    title: 'Imprimíveis Ação de Graças | LCS',
    meta: 'Venda imprimíveis de Ação de Graças no Etsy e KDP. Nicho do mercado americano perfeito para vendedores brasileiros. Estratégias e ideias de produtos.',
    h1: 'Ação de Graças — Imprimíveis para o Mercado Americano',
    desc: 'O Dia de Ação de Graças (Thanksgiving) não é celebrado no Brasil, mas representa uma enorme oportunidade para vendedores brasileiros que vendem em inglês no Etsy e Amazon KDP. A demanda por atividades de Thanksgiving explode entre outubro e novembro nos EUA. Perus, abóboras, folhas de outono e temas de gratidão vendem massivamente. Como a concorrência de vendedores brasileiros nesse nicho é baixa, há espaço para se posicionar bem. No Etsy, listagens de Thanksgiving em inglês alcançam o imenso mercado americano. No Amazon KDP, livros de atividades de Thanksgiving são bestsellers sazonais. Crie seus produtos em inglês com nossas ferramentas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades Thanksgiving para vender Etsy',
      'imprimíveis Ação de Graças KDP',
      'nicho americano vendedores brasileiros',
      'atividades Thanksgiving em inglês',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'parents-day-printable-ideas.ts': {
    pk: 'imprimíveis Dia das Mães Pais para vender',
    title: 'Imprimíveis Dia das Mães/Pais | LCS',
    meta: 'Crie e venda imprimíveis para Dia das Mães e Dia dos Pais no Etsy e Hotmart. Atividades educativas e presentes imprimíveis. Nicho sazonal forte.',
    h1: 'Dia das Mães e Pais — Imprimíveis para Vender Online',
    desc: 'O Dia das Mães (maio) e o Dia dos Pais (agosto no Brasil, junho nos EUA) são datas com forte potencial para vendedores de imprimíveis. Além de atividades educativas temáticas, esse nicho inclui cartões imprimíveis, cupons de presente e atividades de escrita criativa sobre a família. No Etsy, imprimíveis de Mother\\\'s Day e Father\\\'s Day têm demanda explosiva no mercado americano. No Hotmart, atividades para Dia das Mães e Dia dos Pais atendem escolas e educadores brasileiros. No Amazon KDP, livros de atividades temáticos vendem como presentes complementares. Explore ambos os calendários para maximizar vendas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades Dia das Mães para vender',
      'imprimíveis Dia dos Pais Etsy',
      'negócio atividades família Hotmart',
      'presentes imprimíveis pais mães',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },

  // === E3: Subject ideas (10) ===
  'space-printable-ideas.ts': {
    pk: 'imprimíveis de espaço para vender no Etsy',
    title: 'Imprimíveis espaço para Etsy | LCS',
    meta: 'Venda imprimíveis de espaço no Etsy, Hotmart e KDP. Planetas, foguetes e astronautas em atividades educativas. Nicho com demanda constante.',
    h1: 'Imprimíveis de Espaço — Atividades para Vender no Etsy',
    desc: 'O espaço sideral é um tema fascinante que nunca sai de moda. Planetas, foguetes, astronautas e estrelas geram encantamento em crianças de todas as idades e forte interesse de compra dos pais. No Etsy, imprimíveis de espaço têm demanda constante durante todo o ano. No Hotmart, pacotes educativos com tema espacial atendem educadores que buscam material de ciências envolvente. No Amazon KDP, livros de atividades do espaço são populares na categoria infantil. A combinação de apelo visual forte e valor educativo em astronomia torna esse nicho altamente rentável. Crie caça-palavras, contagem, labirintos e páginas para colorir espaciais. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades espaço para vender Etsy',
      'imprimíveis planetas foguetes Hotmart',
      'negócio atividades espaço sideral',
      'livros atividades espaço KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'transportation-printable-ideas.ts': {
    pk: 'imprimíveis de meios de transporte negócio',
    title: 'Imprimíveis transportes — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de meios de transporte. Carros, aviões e trens em atividades educativas para Etsy, Hotmart e KDP.',
    h1: 'Meios de Transporte — Ideias de Negócio com Imprimíveis',
    desc: 'Meios de transporte são um tema clássico que atrai especialmente meninos, embora seja popular com todas as crianças. Carros, caminhões, aviões, trens e barcos geram interesse constante durante todo o ano. No Etsy, atividades de transporte têm boa demanda e concorrência moderada. No Hotmart, pacotes educativos com tema de veículos atendem educadores que buscam material para atividades de vocabulário e contagem. No Amazon KDP, livros de atividades de transporte são populares na faixa de 3 a 7 anos. Crie atividades de correspondência, caça-palavras, labirintos e contagem com diferentes veículos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades meios de transporte para vender',
      'imprimíveis veículos educativos Etsy',
      'negócio atividades transporte Hotmart',
      'livros atividades veículos KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'food-cooking-printable-ideas.ts': {
    pk: 'imprimíveis de alimentação para vender Etsy',
    title: 'Imprimíveis alimentação para Etsy | LCS',
    meta: 'Venda imprimíveis de alimentação e culinária no Etsy e Hotmart. Frutas, legumes e comida em atividades educativas. Nicho com demanda crescente.',
    h1: 'Alimentação e Culinária — Imprimíveis para Vender no Etsy',
    desc: 'Alimentação é um tema educativo com demanda crescente, impulsionado pelo interesse em alimentação saudável infantil. Frutas, legumes, receitas e culinária oferecem rico material para atividades educativas. No Etsy, imprimíveis de alimentação atraem pais preocupados com nutrição e educadores. No Hotmart, pacotes sobre alimentação saudável para educação infantil têm forte demanda no mercado brasileiro. No Amazon KDP, livros de atividades sobre comida e culinária alcançam um público amplo. Crie atividades de correspondência, contagem com frutas, caça-palavras de alimentos e páginas para colorir de receitas. O nicho permite expansão para temas de sustentabilidade. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades alimentação para vender Etsy',
      'imprimíveis comida educativos Hotmart',
      'negócio atividades culinária infantil',
      'livros atividades alimentação KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'sports-printable-ideas.ts': {
    pk: 'imprimíveis de esportes ideias negócio',
    title: 'Imprimíveis esportes — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de esportes. Futebol, basquete e atletismo em atividades educativas para Etsy, Hotmart e KDP.',
    h1: 'Esportes — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'Esportes são um tema com forte apelo emocional e picos sazonais previsíveis ligados a Copa do Mundo, Olimpíadas e campeonatos nacionais. Futebol, basquete, natação e atletismo geram interesse em crianças de todas as idades. No Etsy, atividades esportivas vendem bem durante eventos esportivos globais. No Hotmart, pacotes educativos de esportes atendem educadores que buscam material para educação física e interdisciplinaridade. No Amazon KDP, livros de atividades esportivas atraem pais de crianças ativas. O futebol é especialmente forte no mercado brasileiro. Crie contagem, caça-palavras e labirintos com tema esportivo. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades esportes para vender online',
      'imprimíveis futebol educativos Etsy',
      'negócio atividades esportivas Hotmart',
      'livros atividades esportes KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'music-printable-ideas.ts': {
    pk: 'imprimíveis de música para vender',
    title: 'Imprimíveis música para vender | LCS',
    meta: 'Crie e venda imprimíveis de música no Etsy, Hotmart e KDP. Instrumentos, notas musicais e ritmo em atividades educativas. Nicho diferenciado.',
    h1: 'Imprimíveis de Música — Nicho Diferenciado para Vendedores',
    desc: 'Música é um nicho diferenciado no mercado de imprimíveis educativos com concorrência significativamente menor que temas populares como animais ou dinossauros. Instrumentos musicais, notas, ritmo e compositores oferecem material rico para atividades variadas. No Etsy, imprimíveis musicais atraem pais de crianças em aulas de música e educadores musicais. No Hotmart, pacotes de musicalização infantil têm demanda crescente no Brasil. No Amazon KDP, livros de atividades musicais ocupam um nicho específico com pouca concorrência. A combinação de educação artística com atividades imprimíveis cria produtos únicos que se destacam. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades música para vender Etsy',
      'imprimíveis instrumentos musicais Hotmart',
      'negócio atividades musicalização',
      'livros atividades música KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'construction-printable-ideas.ts': {
    pk: 'imprimíveis de construção para vender',
    title: 'Imprimíveis construção para vender | LCS',
    meta: 'Venda imprimíveis de construção no Etsy e Hotmart. Escavadeiras, guindastes e ferramentas em atividades educativas. Nicho com forte apelo infantil.',
    h1: 'Construção — Imprimíveis para Vender Online',
    desc: 'O tema construção fascina crianças com escavadeiras, guindastes, caminhões basculantes e ferramentas. É um nicho com demanda constante e forte apelo visual que se traduz em alta taxa de conversão. No Etsy, atividades de construção atraem pais de crianças fascinadas por máquinas e canteiros de obra. No Hotmart, pacotes educativos com tema construção atendem educadores que buscam atividades diferenciadas. No Amazon KDP, livros de atividades de construção são populares na faixa de 3 a 6 anos. A concorrência é menor que em temas como animais, oferecendo oportunidade para se destacar rapidamente. Crie contagem, labirintos e caça-palavras. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades construção para vender Etsy',
      'imprimíveis máquinas educativos Hotmart',
      'negócio atividades construção online',
      'livros atividades construção KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'pirates-printable-ideas.ts': {
    pk: 'imprimíveis de piratas ideias negócio',
    title: 'Imprimíveis piratas — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de piratas. Tesouros, mapas e aventura em atividades educativas para Etsy, Hotmart e KDP.',
    h1: 'Piratas — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'O tema piratas combina aventura, mistério e diversão, gerando forte engajamento em crianças de 3 a 8 anos. Mapas do tesouro, navios, papagaios e cofres de ouro criam atividades envolventes que vendem bem. No Etsy, imprimíveis de piratas atraem pais que buscam atividades temáticas diferentes do comum. No Hotmart, pacotes educativos com tema pirata atendem educadores que organizam semanas temáticas e festas. No Amazon KDP, livros de atividades de piratas são populares como presentes. A concorrência é baixa comparada a temas como animais, oferecendo boa oportunidade de posicionamento. Crie caça-palavras, labirintos e caça ao tesouro imprimível. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades piratas para vender online',
      'imprimíveis tema pirata Etsy',
      'negócio atividades piratas Hotmart',
      'livros atividades piratas KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'fairy-tale-printable-ideas.ts': {
    pk: 'imprimíveis de contos de fadas para Etsy',
    title: 'Imprimíveis contos de fadas Etsy | LCS',
    meta: 'Venda imprimíveis de contos de fadas no Etsy e Hotmart. Princesas, castelos e dragões em atividades educativas. Nicho com apelo atemporal.',
    h1: 'Contos de Fadas — Imprimíveis para Vender no Etsy',
    desc: 'Contos de fadas são um tema atemporal que encanta crianças geração após geração. Princesas, castelos, dragões, fadas e unicórnios geram forte apelo emocional e visual. No Etsy, imprimíveis de contos de fadas têm demanda constante e atraem compradores que valorizam design encantador. No Hotmart, pacotes educativos com tema de contos de fadas atendem educadores que trabalham literatura infantil e contação de histórias. No Amazon KDP, livros de atividades de contos de fadas vendem bem na faixa de 3 a 7 anos. O tema permite criar produtos para festas de aniversário além de atividades educativas. Crie labirintos, caça-palavras e páginas para colorir encantadas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades contos de fadas para vender',
      'imprimíveis princesas castelos Etsy',
      'negócio atividades contos de fadas Hotmart',
      'livros atividades fadas KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'camping-printable-ideas.ts': {
    pk: 'imprimíveis de camping ideias negócio',
    title: 'Imprimíveis camping — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de camping. Barracas, fogueiras e natureza em atividades educativas para Etsy, Hotmart e KDP.',
    h1: 'Camping — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'O tema camping combina natureza, aventura ao ar livre e diversão familiar, criando atividades educativas com forte apelo sazonal no verão. Barracas, fogueiras, lanternas e trilhas geram interesse em crianças e famílias. No Etsy, imprimíveis de camping têm pico de demanda entre maio e agosto no hemisfério norte, e entre novembro e fevereiro no Brasil. No Hotmart, pacotes educativos com tema acampamento atendem escolas que organizam atividades ao ar livre. No Amazon KDP, livros de atividades de camping são populares como presentes de férias. A concorrência é moderada, permitindo boa visibilidade para novos vendedores. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades camping para vender Etsy',
      'imprimíveis acampamento educativos Hotmart',
      'negócio atividades camping natureza',
      'livros atividades camping KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'underwater-printable-ideas.ts': {
    pk: 'imprimíveis de fundo do mar para vender',
    title: 'Imprimíveis fundo do mar vender | LCS',
    meta: 'Crie e venda imprimíveis de fundo do mar no Etsy e Hotmart. Peixes, corais e sereias em atividades educativas. Nicho visual e envolvente.',
    h1: 'Fundo do Mar — Imprimíveis para Vender Online',
    desc: 'O fundo do mar é um tema visualmente deslumbrante que gera fascínio em crianças de todas as idades. Peixes coloridos, corais, sereias, polvos e cavalos-marinhos criam atividades educativas com apelo visual excepcional. No Etsy, imprimíveis de fundo do mar têm demanda constante com pico no verão. No Hotmart, pacotes educativos com tema submarino atendem educadores que trabalham ciências marinhas e meio ambiente. No Amazon KDP, livros de atividades submarinas são populares na faixa de 3 a 7 anos. O tema permite diferenciação criativa através de cenários ricos e coloridos que se destacam nas buscas. Crie caça-palavras, contagem e labirintos aquáticos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades fundo do mar para vender',
      'imprimíveis submarino educativos Etsy',
      'negócio atividades oceano Hotmart',
      'livros atividades fundo do mar KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },

  // === E4: Age group ideas (10) ===
  'preschool-printable-ideas.ts': {
    pk: 'imprimíveis de educação infantil para vender',
    title: 'Imprimíveis educação infantil Etsy | LCS',
    meta: 'Venda imprimíveis de educação infantil no Etsy e Hotmart. Atividades para crianças de 3-5 anos com alta demanda. Nicho mais lucrativo do mercado.',
    h1: 'Educação Infantil — Imprimíveis para Vender no Etsy',
    desc: 'A educação infantil (3-5 anos) é o nicho mais lucrativo no mercado de imprimíveis educativos. Pais e educadores buscam constantemente atividades de coordenação motora, reconhecimento de letras, contagem básica e cores. No Etsy, imprimíveis para educação infantil dominam as vendas da categoria educativa. No Hotmart, pacotes completos para pré-escola atendem o enorme mercado brasileiro de educação infantil. No Amazon KDP, livros de atividades para crianças pequenas são bestsellers constantes. O volume de compradores nessa faixa etária garante demanda durante todo o ano. Crie atividades de traçar, colorir, contar e encontrar diferenças. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades educação infantil para vender',
      'imprimíveis pré-escola Etsy Hotmart',
      'negócio atividades crianças 3-5 anos',
      'livros atividades educação infantil KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'kindergarten-printable-ideas.ts': {
    pk: 'imprimíveis de pré-escola ideias negócio',
    title: 'Imprimíveis pré-escola — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis para pré-escola. Atividades para 5-6 anos no Etsy, Hotmart e KDP. Nicho com demanda massiva e constante.',
    h1: 'Pré-Escola — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'A pré-escola (5-6 anos) representa um nicho com demanda massiva no mercado de imprimíveis. Crianças nessa idade estão aprendendo a ler, escrever e contar, gerando necessidade constante de material educativo. No Etsy, atividades para kindergarten são as mais buscadas na categoria educativa. No Hotmart, pacotes de alfabetização e numeracia para pré-escola vendem consistentemente bem. No Amazon KDP, livros de atividades para essa faixa etária têm alta rotação. Vendedores que criam séries progressivas de dificuldade geram compras recorrentes. Crie atividades de reconhecimento de letras, contagem até 20, caça-palavras simples e labirintos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades pré-escola para vender',
      'imprimíveis kindergarten Etsy negócio',
      'pacotes alfabetização pré-escola Hotmart',
      'livros atividades kindergarten KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'first-grade-printable-ideas.ts': {
    pk: 'imprimíveis de 1º ano para vender no Etsy',
    title: 'Imprimíveis 1º ano para Etsy | LCS',
    meta: 'Venda imprimíveis de 1º ano no Etsy, Hotmart e KDP. Atividades de alfabetização e matemática para crianças de 6-7 anos. Alta demanda constante.',
    h1: 'Imprimíveis de 1º Ano — Atividades para Vender no Etsy',
    desc: 'O 1º ano (6-7 anos) é uma faixa etária crítica onde crianças consolidam leitura, escrita e operações matemáticas básicas. Isso gera demanda intensa por material educativo complementar. No Etsy, imprimíveis de first grade são extremamente populares no mercado americano. No Hotmart, pacotes de reforço escolar para 1º ano atendem pais e educadores brasileiros. No Amazon KDP, livros de atividades para essa idade vendem bem como complemento escolar. Crie atividades de soma, subtração, leitura de palavras, caça-palavras e problemas matemáticos. Séries temáticas por habilidade geram compras múltiplas do mesmo cliente. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades 1º ano para vender Etsy',
      'imprimíveis first grade Hotmart',
      'negócio atividades alfabetização 1º ano',
      'livros atividades 1º ano KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'second-grade-printable-ideas.ts': {
    pk: 'imprimíveis de 2º ano ideias negócio',
    title: 'Imprimíveis 2º ano — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de 2º ano. Matemática e leitura para 7-8 anos no Etsy, Hotmart e KDP. Nicho com demanda crescente.',
    h1: '2º Ano — Ideias de Negócio com Imprimíveis Educativos',
    desc: 'O 2º ano (7-8 anos) é uma faixa etária onde crianças avançam em leitura fluente, multiplicação básica e resolução de problemas. Pais buscam material de reforço e educadores precisam de atividades diferenciadas. No Etsy, imprimíveis de second grade têm boa demanda com concorrência menor que faixas mais jovens. No Hotmart, pacotes de reforço escolar para 2º ano atendem o crescente mercado de educação complementar no Brasil. No Amazon KDP, livros de atividades para 7-8 anos vendem como suporte escolar. Crie atividades de multiplicação, caça-palavras avançados, problemas de lógica e leitura. A menor concorrência nessa faixa é uma vantagem. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades 2º ano para vender online',
      'imprimíveis second grade Etsy negócio',
      'pacotes reforço 2º ano Hotmart',
      'livros atividades 2º ano KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'third-grade-printable-ideas.ts': {
    pk: 'imprimíveis de 3º ano para vender',
    title: 'Imprimíveis 3º ano para vender | LCS',
    meta: 'Crie e venda imprimíveis de 3º ano no Etsy e Hotmart. Atividades de matemática e leitura para 8-9 anos. Nicho com menor concorrência.',
    h1: 'Imprimíveis de 3º Ano — Nicho para Vendedores Online',
    desc: 'O 3º ano (8-9 anos) é um nicho com concorrência significativamente menor que educação infantil, o que facilita o posicionamento para novos vendedores. Crianças nessa idade trabalham multiplicação, divisão, interpretação de texto e escrita criativa. No Etsy, imprimíveis de third grade atraem pais que buscam reforço escolar específico. No Hotmart, pacotes de atividades para 3º ano atendem educadores e pais brasileiros preocupados com desempenho escolar. No Amazon KDP, livros de atividades para 8-9 anos ocupam um nicho especializado com boa demanda. Crie problemas de matemática, caça-palavras temáticos e atividades de lógica. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades 3º ano para vender Etsy',
      'imprimíveis third grade Hotmart',
      'negócio atividades 8-9 anos',
      'livros atividades 3º ano KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'homeschool-printable-ideas.ts': {
    pk: 'imprimíveis para homeschool vender',
    title: 'Imprimíveis homeschool para vender | LCS',
    meta: 'Venda imprimíveis para homeschool no Etsy e Hotmart. Atividades para educação domiciliar com demanda crescente. Nicho lucrativo no Brasil e EUA.',
    h1: 'Homeschool — Imprimíveis para Vender Online',
    desc: 'O homeschool (educação domiciliar) é um dos nichos de maior crescimento no mercado de imprimíveis educativos. No Brasil, a regulamentação do ensino domiciliar aumentou a demanda por materiais estruturados. Nos EUA, o mercado de homeschool já é massivo e continua crescendo. No Etsy, imprimíveis para homeschool atraem famílias que buscam currículo completo e atividades suplementares. No Hotmart, pacotes educativos para educação domiciliar atendem o mercado brasileiro em expansão. No Amazon KDP, livros de atividades para homeschool são uma categoria em alta. Crie pacotes por disciplina, grade e habilidade para atender essa demanda crescente. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades homeschool para vender Etsy',
      'imprimíveis educação domiciliar Hotmart',
      'negócio material homeschool Brasil',
      'livros atividades homeschool KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'special-education-printable-ideas.ts': {
    pk: 'imprimíveis AEE educação especial vender',
    title: 'Imprimíveis AEE para vender | LCS',
    meta: 'Venda imprimíveis de educação especial e AEE no Etsy e Hotmart. Atividades adaptadas com demanda crescente e baixa concorrência. Nicho único.',
    h1: 'Educação Especial e AEE — Imprimíveis para Vender',
    desc: 'O Atendimento Educacional Especializado (AEE) e a educação especial representam um nicho com baixíssima concorrência e demanda crescente. Atividades adaptadas para crianças com necessidades especiais são escassas no mercado, criando oportunidade única para vendedores. No Etsy, imprimíveis de special education atraem pais e terapeutas no mercado americano. No Hotmart, materiais de AEE atendem o mercado brasileiro de inclusão educacional. No Amazon KDP, livros de atividades adaptadas ocupam um nicho especializado com pouca oferta. Crie atividades de coordenação motora, reconhecimento visual, sequenciamento e habilidades sociais. O impacto social agrega valor à marca. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades AEE para vender online',
      'imprimíveis educação especial Etsy',
      'negócio material inclusão Hotmart',
      'livros atividades necessidades especiais KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'esl-printable-ideas.ts': {
    pk: 'imprimíveis PLE português língua estrangeira negócio',
    title: 'Imprimíveis PLE — Ideias negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de PLE e ESL. Atividades para ensino de idiomas no Etsy e Hotmart. Nicho global com demanda crescente.',
    h1: 'PLE e ESL — Ideias de Negócio com Imprimíveis de Idiomas',
    desc: 'O ensino de idiomas é um nicho global com demanda massiva e crescente. PLE (Português Língua Estrangeira) e ESL (English as a Second Language) representam mercados enormes. No Etsy, imprimíveis de ESL são dos mais vendidos na categoria educativa do mercado americano. No Hotmart, materiais de PLE atendem o crescente mercado de estrangeiros aprendendo português. No Amazon KDP, livros de atividades para aprendizado de idiomas vendem globalmente. Para vendedores brasileiros, criar material bilíngue ou multilíngue é uma vantagem competitiva natural. Crie caça-palavras, vocabulário visual, correspondência e atividades de conversação. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades PLE para vender online',
      'imprimíveis ESL Etsy negócio',
      'negócio material ensino idiomas Hotmart',
      'livros atividades idiomas KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'summer-learning-printable-ideas.ts': {
    pk: 'atividades de férias para vender no Etsy',
    title: 'Atividades de férias para vender | LCS',
    meta: 'Venda atividades de férias no Etsy, Hotmart e KDP. Imprimíveis para evitar perda de aprendizado nas férias. Nicho sazonal com alta demanda.',
    h1: 'Atividades de Férias — Imprimíveis para Vender no Etsy',
    desc: 'Atividades educativas para férias são um nicho sazonal poderoso, impulsionado pela preocupação de pais com a perda de aprendizado durante o recesso escolar. No Brasil, as férias de janeiro e julho geram demanda por material de revisão. Nos EUA, o summer learning loss é uma preocupação real que impulsiona vendas entre maio e agosto. No Etsy, pacotes de atividades de férias são bestsellers sazonais. No Hotmart, cadernos de férias digitais atendem pais brasileiros. No Amazon KDP, livros de atividades de férias vendem como presentes práticos. Crie pacotes de revisão por série e disciplina para maximizar vendas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades férias para vender Etsy',
      'imprimíveis revisão férias Hotmart',
      'negócio caderno de férias digital',
      'livros atividades férias KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'math-facts-printable-ideas.ts': {
    pk: 'tabuada imprimíveis ideias negócio',
    title: 'Tabuada imprimíveis — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis de tabuada e fatos matemáticos. Atividades de prática no Etsy, Hotmart e KDP. Nicho perene com alta demanda.',
    h1: 'Tabuada e Fatos Matemáticos — Negócio com Imprimíveis',
    desc: 'A tabuada e os fatos matemáticos básicos (soma, subtração, multiplicação, divisão) são o nicho perene por excelência no mercado de imprimíveis educativos. Todo pai e educador precisa de material de prática matemática, gerando demanda constante durante todo o ano letivo. No Etsy, imprimíveis de math facts são consistentemente os mais vendidos na categoria educativa. No Hotmart, pacotes de treino de tabuada atendem o enorme mercado brasileiro de reforço escolar. No Amazon KDP, livros de prática matemática são bestsellers permanentes. Crie atividades de treino cronometrado, quebra-cabeças matemáticos e jogos de tabuada. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'atividades tabuada para vender Etsy',
      'imprimíveis fatos matemáticos Hotmart',
      'negócio treino matemática online',
      'livros prática tabuada KDP',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },

  // === E5: Product format ideas (7) ===
  'subscription-box-printable-ideas.ts': {
    pk: 'caixa de assinatura de imprimíveis ideias',
    title: 'Assinatura de imprimíveis — Negócio | LCS',
    meta: 'Ideias para criar caixa de assinatura de imprimíveis. Receita recorrente com atividades mensais no Hotmart, Kiwify e Etsy. Modelo escalável.',
    h1: 'Caixa de Assinatura de Imprimíveis — Modelo de Negócio',
    desc: 'Caixas de assinatura de imprimíveis educativos oferecem o modelo de negócio mais desejado: receita recorrente mensal. Em vez de vender produtos individuais, você entrega um pacote mensal de atividades temáticas por assinatura. No Hotmart e Kiwify, plataformas brasileiras permitem criar assinaturas facilmente. No Etsy, você pode oferecer caixas mensais como listagens recorrentes. O modelo permite prever receita, construir comunidade e aumentar o valor do cliente ao longo do tempo. Combine temas sazonais com progressão de dificuldade para manter assinantes engajados mês a mês. Use nossas ferramentas para gerar conteúdo mensal de forma eficiente. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'assinatura imprimíveis educativos Hotmart',
      'caixa mensal atividades Kiwify',
      'negócio receita recorrente imprimíveis',
      'modelo assinatura imprimíveis Etsy',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'print-on-demand-printable-ideas.ts': {
    pk: 'impressão sob demanda atividades negócio',
    title: 'Impressão sob demanda atividades | LCS',
    meta: 'Crie negócio de atividades educativas com impressão sob demanda. Amazon KDP, Lulu e print-on-demand. Sem estoque, sem risco. Guia completo.',
    h1: 'Impressão Sob Demanda — Negócio de Atividades Educativas',
    desc: 'A impressão sob demanda (print-on-demand) elimina o maior risco do negócio de imprimíveis: estoque. Com plataformas como Amazon KDP, Lulu e outras, você cria livros de atividades que são impressos e enviados automaticamente quando alguém compra. Sem investimento inicial, sem estoque e sem logística. No Amazon KDP, livros de atividades educativas são uma das categorias mais rentáveis de print-on-demand. O modelo permite testar múltiplos nichos rapidamente e escalar os que funcionam. Combine com vendas digitais no Etsy e Hotmart para diversificar receita. Use nossas ferramentas para gerar conteúdo para seus livros. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'print-on-demand atividades educativas',
      'livros sob demanda Amazon KDP',
      'negócio sem estoque imprimíveis',
      'impressão sob demanda Lulu educativo',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'digital-download-printable-ideas.ts': {
    pk: 'downloads digitais imprimíveis ideias negócio',
    title: 'Negócio downloads digitais | LCS',
    meta: 'Ideias de negócio com downloads digitais de imprimíveis educativos. Venda PDFs no Etsy, Hotmart e Kiwify. Margem alta, escalável e automatizado.',
    h1: 'Downloads Digitais — Negócio de Imprimíveis Educativos',
    desc: 'Downloads digitais são o formato mais popular e lucrativo para vender imprimíveis educativos. PDFs para download oferecem margem próxima a 100%, entrega instantânea e escala ilimitada. No Etsy, downloads digitais dominam a categoria de imprimíveis educativos com milhões de vendas anuais. No Hotmart e Kiwify, produtos digitais educativos são uma das categorias de maior crescimento no Brasil. O modelo é perfeito para empreendedores que buscam renda passiva: crie uma vez, venda infinitas vezes. Organize seus produtos em pacotes temáticos e por faixa etária para maximizar vendas. Use nossas ferramentas para gerar PDFs profissionais rapidamente. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'vender PDFs educativos Etsy',
      'downloads digitais Hotmart Kiwify',
      'negócio renda passiva imprimíveis',
      'produtos digitais educativos online',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'physical-printable-product-ideas.ts': {
    pk: 'produtos impressos físicos ideias negócio',
    title: 'Produtos impressos físicos — Negócio | LCS',
    meta: 'Ideias de negócio com produtos educativos impressos. Cadernos, apostilas e kits físicos para vender na Shopee, Mercado Livre e feiras.',
    h1: 'Produtos Impressos Físicos — Ideias de Negócio',
    desc: 'Produtos educativos impressos fisicamente oferecem margens mais altas que downloads digitais e atendem compradores que preferem material tangível. Cadernos de atividades, apostilas temáticas e kits educativos podem ser vendidos na Shopee, Mercado Livre, feiras pedagógicas e papelarias. No Brasil, muitos pais e educadores ainda preferem comprar material impresso pronto. O investimento inicial em impressão é baixo com gráficas digitais e pequenas tiragens. Combine vendas físicas com digitais para maximizar alcance: venda o PDF no Hotmart e a versão impressa no Mercado Livre. Use nossas ferramentas para criar o conteúdo e depois imprima profissionalmente. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'apostilas educativas para vender',
      'cadernos atividades impressos negócio',
      'vender material educativo Mercado Livre',
      'produtos físicos imprimíveis Shopee',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'party-supply-printable-ideas.ts': {
    pk: 'imprimíveis para festas ideias negócio',
    title: 'Imprimíveis para festas — Negócio | LCS',
    meta: 'Ideias de negócio com imprimíveis para festas infantis. Convites, decoração e atividades para Etsy e Hotmart. Nicho com demanda o ano todo.',
    h1: 'Imprimíveis para Festas — Negócio com Alta Demanda',
    desc: 'Imprimíveis para festas infantis são um nicho enorme que combina atividades educativas com entretenimento. Convites, decoração, jogos, caça ao tesouro e atividades temáticas para aniversários vendem constantemente. No Etsy, imprimíveis para festas são uma das categorias mais lucrativas. No Hotmart, kits de festa completos com atividades temáticas atendem mães que organizam festas em casa. No Brasil, festas infantis movimentam bilhões por ano, e a tendência de festas DIY com imprimíveis cresce a cada ano. Crie kits por tema (dinossauros, princesas, super-heróis) com atividades, decoração e jogos inclusos. Use nossas ferramentas para gerar as atividades dos kits. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'kit festa imprimível para vender',
      'atividades festa infantil Etsy',
      'negócio imprimíveis festas Hotmart',
      'decoração festa imprimível online',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'custom-worksheet-service-ideas.ts': {
    pk: 'serviço de criação de atividades negócio',
    title: 'Serviço de atividades — Negócio | LCS',
    meta: 'Ideias de negócio oferecendo serviço de criação de atividades personalizadas. Atenda escolas e editoras. Alto valor por projeto.',
    h1: 'Serviço de Criação de Atividades — Modelo de Negócio',
    desc: 'Oferecer serviço de criação de atividades personalizadas é um modelo de negócio de alto valor que complementa a venda de imprimíveis. Escolas, editoras, centros de tutoria e empresas de educação precisam de material exclusivo e pagam valores premium por atividades sob encomenda. No Brasil, escolas particulares e redes de ensino contratam criadores de conteúdo educativo regularmente. No mercado internacional, plataformas como Fiverr e Upwork conectam criadores de atividades com clientes globais. Use nossas ferramentas para produzir atividades personalizadas de forma eficiente e atender múltiplos clientes simultaneamente. Combine serviços com vendas de produtos para diversificar receita. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'serviço criação atividades personalizadas',
      'freelancer atividades educativas',
      'atender escolas editoras material',
      'negócio criação conteúdo educativo',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
  'bulk-licensing-printable-ideas.ts': {
    pk: 'licença em volume imprimíveis ideias',
    title: 'Licença em volume imprimíveis | LCS',
    meta: 'Ideias para vender licenças em volume de imprimíveis educativos. Atenda escolas e redes de ensino. Receita recorrente de alto valor.',
    h1: 'Licença em Volume — Venda Imprimíveis para Escolas',
    desc: 'Vender licenças em volume para escolas e redes de ensino é o modelo de maior receita por transação no mercado de imprimíveis educativos. Em vez de vender atividades individuais por poucos reais, licencie pacotes completos para uso em toda a escola ou rede por valores significativamente maiores. No Brasil, escolas particulares e redes municipais investem em material educativo digital. No Hotmart, você pode criar tiers de licenciamento: individual, escola e rede. No mercado internacional, site licenses para escolas americanas geram receita substancial. Combine licenças recorrentes anuais com suporte e atualizações para criar receita previsível. Use nossas ferramentas para manter catálogo atualizado. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: [
      'licença escolar imprimíveis educativos',
      'vender para escolas material digital',
      'licenciamento volume atividades',
      'receita recorrente escolas imprimíveis',
    ],
    lsi: ['Hotmart', 'Kiwify', 'Etsy', 'Amazon KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'nicho', 'ideias de produto', 'vendedor', 'Brasil', 'imprimíveis educativos'],
  },
};

let modified = 0;
for (const [file, data] of Object.entries(ideas)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`  SKIP ${file}`); continue; }
  let content = fs.readFileSync(fp, 'utf8');

  const skStr = data.sk.map(k => `      '${k}',`).join('\n');
  const lsiStr = data.lsi.map(k => `      '${k}',`).join('\n');
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
console.log(`\nModified: ${modified}/${Object.keys(ideas).length} files`);
