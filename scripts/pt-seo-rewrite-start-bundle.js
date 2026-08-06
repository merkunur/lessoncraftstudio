/**
 * PT SEO Rewrite: Start Content (12 files) + Bundle Content (6 files)
 * Updates SEO block + hero.title + hero.description for all 18 Portuguese files.
 * Single script processes both directories.
 */
const fs = require('fs');
const path = require('path');

const START_DIR = path.join(__dirname, '..', 'frontend', 'config', 'start-content', 'pt');
const BUNDLE_DIR = path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'pt');

const startUpdates = [
  {
    file: 'complete-guide-printable-business.ts',
    seo: {
      primaryKeyword: 'como começar um negócio de imprimíveis 2026',
      secondaryKeywords: [
        'guia completo negócio imprimíveis do zero',
        'iniciar loja de atividades imprimíveis passo a passo',
        'negócio de imprimíveis para iniciantes 2026',
        'vender atividades educativas online guia',
      ],
      lsiKeywords: [
        'modelo de negócio downloads digitais educativos',
        'gerador de atividades para empreendedores',
        'loja Etsy de imprimíveis lucrativa',
        'livros de atividades Amazon KDP',
        'Hotmart atividades educativas vender',
        'Kiwify produtos digitais educativos',
        'licença comercial ferramentas imprimíveis',
        'nicho rentável atividades imprimíveis',
        'catálogo de produtos digitais educação',
        'renda passiva imprimíveis pedagógicos',
        'precificação atividades digitais mercado',
        'SEO Etsy para vendedores de imprimíveis',
      ],
      titleTag: 'Começar negócio de imprimíveis (2026) | LCS',
      metaDescription: 'Como começar um negócio de imprimíveis em 2026. Guia passo a passo para vender atividades no Hotmart, Kiwify, Etsy e Amazon KDP com geradores profissionais.',
    },
    hero: {
      title: 'Como Começar um Negócio de Imprimíveis em 2026',
      description: 'Este guia acompanha você em cada etapa do lançamento de um negócio de atividades imprimíveis em 2026. Você vai aprender a escolher um nicho lucrativo, criar produtos profissionais sem habilidades de design, publicar nas plataformas certas, definir preços para ter lucro e construir um catálogo que gere vendas constantes. Seja para vender no Hotmart, Kiwify, Etsy, Amazon KDP ou no seu próprio site, aqui é o seu ponto de partida. Cada gerador de atividades mencionado oferece um teste grátis com marca d\'água para avaliar a qualidade antes de comprar uma licença comercial. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'create-worksheets-that-sell.ts',
    seo: {
      primaryKeyword: 'criar atividades que vendem',
      secondaryKeywords: [
        'design de atividades imprimíveis que geram vendas',
        'como criar imprimíveis que compradores querem',
        'atividades educativas que vendem rápido',
        'segredos de imprimíveis rentáveis Etsy',
      ],
      lsiKeywords: [
        'design de atividades para vendedores de sucesso',
        'otimizar imprimíveis para conversão Etsy',
        'atividades profissionais que atraem compradores',
        'diferenciação de produtos imprimíveis nicho',
        'qualidade visual atividades imprimíveis',
        'psicologia do comprador imprimíveis digitais',
        'listagem Etsy otimizada atividades',
        'mockup profissional atividades educativas',
        'tendências de mercado imprimíveis 2026',
        'pacotes de atividades que convertem',
        'Hotmart vendas atividades educativas',
        'KDP curadoria livros de atividades',
      ],
      titleTag: 'Criar atividades que vendem | LCS',
      metaDescription: 'Aprenda a criar atividades imprimíveis que vendem. Técnicas de design, estratégias de produto e otimização para Etsy, Amazon KDP, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Como Criar Atividades Imprimíveis Que Vendem',
      description: 'Criar atividades imprimíveis é simples. Criar atividades que compradores realmente querem comprar exige entender o que procuram, como tomam decisões de compra e quais elementos visuais geram confiança à primeira vista. Este guia cobre técnicas de design, estrutura de produto e otimização visual que transformam atividades genéricas em produtos que vendem constantemente no Etsy, Amazon KDP, Hotmart e Kiwify. Você vai identificar o que funciona no seu nicho, criar diferenciação real e produzir imprimíveis profissionais com os geradores de atividades. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'printable-business-blueprint.ts',
    seo: {
      primaryKeyword: 'plano de negócio de imprimíveis de ideia a renda',
      secondaryKeywords: [
        'plano estratégico negócio imprimíveis educativos',
        'roteiro negócio de atividades imprimíveis',
        'blueprint negócio de imprimíveis passo a passo',
        'estratégia de negócio imprimíveis lucrativo',
      ],
      lsiKeywords: [
        'planejamento financeiro negócio imprimíveis',
        'modelo de negócio escalável atividades digitais',
        'cronograma de lançamento loja imprimíveis',
        'metas mensuráveis negócio de imprimíveis',
        'investimento inicial imprimíveis digitais',
        'análise de nicho atividades educativas',
        'funil de vendas imprimíveis Hotmart',
        'estratégia multicanal Etsy KDP Kiwify',
        'orçamento realista negócio digital',
        'primeiros 90 dias vendedor imprimíveis',
        'catálogo de produtos planejamento editorial',
        'validação de nicho atividades imprimíveis',
      ],
      titleTag: 'Plano: negócio de imprimíveis | LCS',
      metaDescription: 'Plano de negócio de imprimíveis da ideia à renda. Roteiro passo a passo com cronograma, orçamento e estratégia para vender atividades no Etsy, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Plano de Negócio de Imprimíveis: Da Ideia à Renda',
      description: 'Um negócio de imprimíveis sem plano é hobby. Este guia oferece um plano de negócio estruturado com cronograma semana a semana, orçamento realista, metas mensuráveis e estratégia de crescimento para transformar a ideia de vender atividades educativas em renda real em 90 dias. Cobrimos seleção de nicho com dados, investimento mínimo necessário, planejamento de catálogo e estratégia de plataformas para Etsy, Amazon KDP, Hotmart e Kiwify. Cada gerador de atividades mencionado oferece um teste para avaliar a qualidade. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'etsy-printable-business.ts',
    seo: {
      primaryKeyword: 'masterclass negócio Etsy imprimíveis',
      secondaryKeywords: [
        'como vender imprimíveis no Etsy guia completo',
        'loja Etsy de atividades educativas passo a passo',
        'otimizar listagens Etsy imprimíveis educativos',
        'SEO Etsy para vendedores de atividades',
      ],
      lsiKeywords: [
        'algoritmo de busca Etsy imprimíveis',
        'fotografia de produto atividades Etsy',
        'estratégia de tags Etsy vendedores educativos',
        'mockups para listagens Etsy atividades',
        'precificação competitiva Etsy imprimíveis',
        'avaliações e reviews Etsy atividades',
        'Etsy Star Seller imprimíveis educativos',
        'palavras-chave Etsy atividades de matemática',
        'sazonalidade vendas Etsy imprimíveis',
        'descrição de listagem Etsy atividades',
        'nicho Etsy atividades educativas lucrativo',
        'Etsy Ads imprimíveis retorno investimento',
      ],
      titleTag: 'Masterclass Etsy imprimíveis | LCS',
      metaDescription: 'Masterclass para vender imprimíveis no Etsy. SEO, otimização de listagens, estratégia de preços e táticas de visibilidade para atividades educativas.',
    },
    hero: {
      title: 'Masterclass: Negócio de Imprimíveis no Etsy',
      description: 'O Etsy é o maior marketplace do mundo para downloads digitais e o ponto de entrada natural para vendedores de imprimíveis educativos. Mas publicar um produto não garante vendas. Esta masterclass cobre técnicas específicas de SEO, otimização de listagens, estratégia de preços, fotografia de produto e táticas de visibilidade que separam lojas de atividades que geram renda constante das que ficam invisíveis. Você vai dominar o algoritmo de busca do Etsy, criar listagens que convertem e construir uma loja de imprimíveis lucrativa. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'amazon-kdp-activity-books.ts',
    seo: {
      primaryKeyword: 'negócio de apostilas Amazon KDP guia',
      secondaryKeywords: [
        'publicar livros de atividades Amazon KDP',
        'como vender apostilas na Amazon KDP',
        'negócio de livros educativos KDP passo a passo',
        'criar apostilas de atividades para Amazon',
      ],
      lsiKeywords: [
        'formato interior KDP livros de atividades',
        'capa de apostilas Amazon vendedores',
        'categorias e palavras-chave KDP educativos',
        'ISBN Amazon KDP livros de atividades',
        'print on demand apostilas educativas',
        'royalties KDP livros de baixo conteúdo',
        'nicho KDP atividades de matemática',
        'KDP Select vantagens livros educativos',
        'Amazon A+ Content apostilas vendedores',
        'tamanho de corte KDP atividades imprimíveis',
        'Amazon Ads KDP livros de atividades',
        'precificação apostilas KDP mercado brasileiro',
      ],
      titleTag: 'Negócio de apostilas Amazon KDP | LCS',
      metaDescription: 'Guia para publicar apostilas de atividades na Amazon KDP. Formato, capa, categorias e estratégia de palavras-chave para livros educativos impressos sob demanda.',
    },
    hero: {
      title: 'Negócio de Apostilas de Atividades na Amazon KDP',
      description: 'A Amazon KDP permite publicar livros de atividades e apostilas educativas em formato impresso sob demanda, acessando a maior base de compradores do mundo sem investir em estoque. Este guia cobre o processo completo: formato interior com atividades geradas profissionalmente, design de capa, seleção de categorias e palavras-chave, até estratégias de preços e promoção que funcionam para livros educativos na Amazon. Você vai transformar atividades criadas com os geradores LessonCraftStudio em apostilas vendáveis. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'create-multilingual-worksheets.ts',
    seo: {
      primaryKeyword: 'criar atividades multilíngues para vender',
      secondaryKeywords: [
        'negócio de imprimíveis em vários idiomas',
        'atividades bilíngues para vender no Etsy',
        'imprimíveis multilíngues mercado global',
        'vender atividades educativas em múltiplos idiomas',
      ],
      lsiKeywords: [
        'gerador de atividades multi-idioma vendedores',
        'imprimíveis em 11 idiomas negócio',
        'mercado global de atividades educativas',
        'localização de imprimíveis para Etsy',
        'atividades educativas exportação digital',
        'Hotmart internacional produtos multilíngues',
        'KDP mercados europeus livros de atividades',
        'SEO multi-idioma imprimíveis Etsy',
        'tradução automática atividades educativas',
        'nicho multilíngue atividades imprimíveis',
        'catálogo internacional atividades digitais',
        'Kiwify produtos digitais múltiplos idiomas',
      ],
      titleTag: 'Atividades multilíngues para vender | LCS',
      metaDescription: 'Como criar atividades multilíngues para vender globalmente. Imprimíveis em 11 idiomas para Etsy, Amazon KDP, Hotmart e Kiwify. Multiplique seu mercado.',
    },
    hero: {
      title: 'Criar Atividades Multilíngues para Vender Globalmente',
      description: 'A maioria dos vendedores de imprimíveis se limita a um idioma, ignorando 85% do mercado global. Os geradores do LessonCraftStudio suportam 11 idiomas — inglês, alemão, francês, espanhol, português, italiano, holandês, sueco, dinamarquês, norueguês e finlandês — permitindo criar atividades multilíngues com o mesmo esforço de uma versão monolíngue. Este guia cobre estratégia de mercados por idioma, otimização de listagens em cada plataforma e táticas de posicionamento para construir um catálogo multilíngue lucrativo no Etsy, Amazon KDP, Hotmart e Kiwify. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'commercial-license-guide.ts',
    seo: {
      primaryKeyword: 'licença comercial para vendedores de imprimíveis',
      secondaryKeywords: [
        'o que cobre uma licença comercial de atividades',
        'licença de uso comercial imprimíveis educativos',
        'permissões de revenda imprimíveis gerados',
        'licença comercial vs pessoal imprimíveis',
      ],
      lsiKeywords: [
        'direitos de revenda atividades geradas',
        'termos de licença imprimíveis Etsy',
        'uso comercial geradores de atividades',
        'licença comercial KDP apostilas geradas',
        'permissão de venda Hotmart atividades',
        'direitos autorais imprimíveis educativos',
        'marca d\'água remoção licença comercial',
        'licença pessoal vs comercial diferenças',
        'revenda imprimíveis Kiwify permissões',
        'proteção de conteúdo atividades digitais',
        'licença vitalícia imprimíveis geradores',
        'uso permitido licença comercial LCS',
      ],
      titleTag: 'Licença comercial para vendedores | LCS',
      metaDescription: 'Guia de licença comercial para vendedores de imprimíveis. O que cobre, o que permite e como usar para vender atividades no Etsy, Amazon KDP e Hotmart legalmente.',
    },
    hero: {
      title: 'Licença Comercial para Vendedores de Imprimíveis',
      description: 'A licença comercial é a base legal do seu negócio de imprimíveis. Sem ela, você não pode vender legalmente as atividades que gera. Este guia explica com clareza o que cobre a licença comercial do LessonCraftStudio, quais plataformas permite, quantas cópias pode vender, quais modificações pode fazer e quais restrições se aplicam. Cobrimos a diferença entre licença pessoal e comercial, os direitos específicos de revenda no Etsy, Amazon KDP, Hotmart e Kiwify, e as perguntas mais frequentes dos vendedores. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'printable-business-income.ts',
    seo: {
      primaryKeyword: 'quanto dá para ganhar vendendo imprimíveis',
      secondaryKeywords: [
        'renda realista negócio de imprimíveis',
        'quanto ganha um vendedor de atividades no Etsy',
        'potencial de renda imprimíveis educativos',
        'lucratividade negócio de atividades imprimíveis',
      ],
      lsiKeywords: [
        'margem de lucro atividades digitais vendedores',
        'renda passiva imprimíveis educativos',
        'escalabilidade negócio downloads digitais',
        'faturamento médio vendedor Etsy imprimíveis',
        'comissões plataforma impacto lucro vendedor',
        'crescimento catálogo imprimíveis renda mensal',
        'Hotmart comissões atividades educativas',
        'KDP royalties apostilas de atividades',
        'Kiwify margem líquida produtos digitais',
        'receita recorrente imprimíveis sazonais',
        'estudo de caso vendedor imprimíveis Brasil',
        'tempo para primeira venda imprimíveis Etsy',
      ],
      titleTag: 'Quanto ganhar vendendo imprimíveis | LCS',
      metaDescription: 'Quanto dá para ganhar vendendo imprimíveis. Análise realista de renda, margens e fatores de crescimento para negócios de atividades no Etsy e Amazon KDP.',
    },
    hero: {
      title: 'Quanto Dá para Ganhar Vendendo Imprimíveis',
      description: 'A pergunta mais comum de novos vendedores de imprimíveis é quanto podem ganhar. A resposta honesta depende de múltiplos fatores: nicho escolhido, tamanho do catálogo, qualidade dos produtos, otimização de listagens e consistência de produção. Este guia apresenta uma análise realista das faixas de renda em cada etapa do negócio, as margens de lucro reais descontando comissões de plataforma no Etsy, Amazon KDP, Hotmart e Kiwify, e os fatores que determinam a velocidade de crescimento. Sem promessas infladas — apenas dados práticos para planejar seu negócio. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'tools-for-printable-business.ts',
    seo: {
      primaryKeyword: 'ferramentas essenciais negócio de imprimíveis',
      secondaryKeywords: [
        'software para criar imprimíveis educativos',
        'ferramentas para vendedores de atividades',
        'geradores de atividades para negócio',
        'kit de ferramentas vendedor de imprimíveis',
      ],
      lsiKeywords: [
        'comparativo geradores de atividades vendedores',
        'ferramentas de design imprimíveis profissionais',
        'software de produtividade negócio digital',
        'Canva para vendedores de imprimíveis',
        'Adobe Acrobat atividades educativas',
        'geradores automáticos atividades imprimíveis',
        'plataformas de venda imprimíveis comparativo',
        'Hotmart vs Kiwify para vendedores',
        'Etsy ferramentas vendedor imprimíveis',
        'automação de produção atividades digitais',
        'mockup geradores vendedores Etsy',
        'ferramentas de SEO para vendedores imprimíveis',
      ],
      titleTag: 'Ferramentas para negócio imprimíveis | LCS',
      metaDescription: 'Ferramentas essenciais para um negócio de imprimíveis. Geradores de atividades, software de design e plataformas de venda comparados para vendedores.',
    },
    hero: {
      title: 'Ferramentas Essenciais para Negócio de Imprimíveis',
      description: 'As ferramentas certas fazem a diferença entre produzir uma atividade por hora e produzir vinte. Este guia cobre o ecossistema completo de ferramentas para vendedores de imprimíveis: geradores de atividades para produção rápida, software de design para personalização, plataformas de venda para distribuição no Etsy, Amazon KDP, Hotmart e Kiwify, e ferramentas de produtividade para gerenciar o negócio com eficiência. Comparamos opções em cada categoria com vantagens, limitações e preços para que você tome decisões informadas. O LessonCraftStudio oferece 33 geradores especializados. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'marketing-printable-business.ts',
    seo: {
      primaryKeyword: 'divulgar seu negócio de imprimíveis online',
      secondaryKeywords: [
        'marketing para vendedores de atividades educativas',
        'como divulgar imprimíveis nas redes sociais',
        'estratégia de marketing negócio imprimíveis',
        'atrair compradores para loja de imprimíveis',
      ],
      lsiKeywords: [
        'Pinterest marketing imprimíveis educativos',
        'email marketing vendedores de atividades',
        'SEO para lojas de imprimíveis Etsy',
        'Instagram marketing vendedores imprimíveis',
        'tráfego orgânico loja Etsy atividades',
        'marketing de conteúdo vendedores digitais',
        'TikTok para vendedores de imprimíveis',
        'funil de vendas Hotmart atividades',
        'Kiwify tráfego pago imprimíveis',
        'blog para vendedores de imprimíveis',
        'comunidade de vendedores imprimíveis Brasil',
        'lançamento de produto imprimíveis estratégia',
      ],
      titleTag: 'Divulgar negócio de imprimíveis | LCS',
      metaDescription: 'Como divulgar seu negócio de imprimíveis online. Estratégias de Pinterest, email marketing e SEO para atrair compradores à sua loja no Etsy, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Como Divulgar Seu Negócio de Imprimíveis Online',
      description: 'Criar produtos excelentes é só metade do negócio. Sem uma estratégia de marketing eficaz, até as melhores atividades ficam invisíveis. Este guia cobre táticas de divulgação que funcionam especificamente para vendedores de imprimíveis educativos: Pinterest como motor de tráfego visual, email marketing para construir audiência, SEO em marketplaces para visibilidade orgânica no Etsy e Amazon KDP, redes sociais para construção de marca e estratégias de lançamento no Hotmart e Kiwify. Você vai implementar cada canal sem precisar de orçamento publicitário. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'scaling-printable-business.ts',
    seo: {
      primaryKeyword: 'de renda extra a negócio de imprimíveis em tempo integral',
      secondaryKeywords: [
        'escalar negócio de imprimíveis educativos',
        'como crescer um negócio de atividades imprimíveis',
        'de hobby a negócio completo imprimíveis',
        'automatizar negócio de atividades digitais',
      ],
      lsiKeywords: [
        'delegação e automação negócio imprimíveis',
        'múltiplos canais de venda atividades educativas',
        'renda em tempo integral com imprimíveis',
        'terceirização produção atividades digitais',
        'catálogo escalável imprimíveis educativos',
        'diversificação de produtos imprimíveis nicho',
        'Etsy Amazon KDP Hotmart simultaneamente',
        'Kiwify escalabilidade produtos digitais',
        'gestão financeira negócio imprimíveis',
        'metas de crescimento vendedor imprimíveis',
        'processos automatizados produção atividades',
        'reinvestimento lucros negócio digital',
      ],
      titleTag: 'De renda extra a negócio completo | LCS',
      metaDescription: 'Como escalar de renda extra a negócio de imprimíveis em tempo integral. Automação, múltiplos canais e estratégias de crescimento para vendedores.',
    },
    hero: {
      title: 'De Renda Extra a Negócio de Imprimíveis em Tempo Integral',
      description: 'Muitos vendedores de imprimíveis começam como projeto paralelo e se perguntam se é possível transformar isso na fonte principal de renda. A resposta é sim, mas exige uma estratégia deliberada de escalamento que vai além de criar mais produtos. Este guia cobre a transição de renda extra a negócio em tempo integral: automação de processos, expansão para múltiplos canais de venda no Etsy, Amazon KDP, Hotmart e Kiwify, diversificação de produtos, delegação de tarefas e gestão financeira para sustentar o crescimento. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'printable-business-legal.ts',
    seo: {
      primaryKeyword: 'aspectos legais negócio de imprimíveis Brasil',
      secondaryKeywords: [
        'requisitos legais vender imprimíveis online Brasil',
        'impostos negócio de atividades digitais MEI',
        'regulamentações para vendedores de imprimíveis',
        'aspectos fiscais negócio de downloads digitais Brasil',
      ],
      lsiKeywords: [
        'MEI para vendedores de imprimíveis limite R$81.000',
        'Simples Nacional negócio de atividades digitais',
        'NFS-e nota fiscal serviço imprimíveis',
        'ISS imposto sobre serviço produtos digitais',
        'PIX recebimento vendas imprimíveis',
        'Hotmart retenção de impostos vendedores',
        'Kiwify retenção fiscal produtos digitais',
        'trabalhador independente Portugal IVA 23%',
        'proteção de propriedade intelectual imprimíveis',
        'direitos autorais atividades geradas Brasil',
        'CNPJ para vendedor de imprimíveis digitais',
        'contabilidade negócio digital imprimíveis',
      ],
      titleTag: 'Imprimíveis: aspectos legais Brasil | LCS',
      metaDescription: 'Aspectos legais de um negócio de imprimíveis no Brasil. MEI, Simples Nacional, NFS-e, ISS e PIX. Portugal: trabalhador independente e IVA. Consulte um profissional.',
    },
    hero: {
      title: 'Aspectos Legais de um Negócio de Imprimíveis no Brasil',
      description: 'Os aspectos legais de um negócio de imprimíveis variam significativamente entre países. No Brasil, você pode começar como MEI com faturamento até R$81.000/ano, emitir NFS-e e pagar ISS. Acima desse limite, o Simples Nacional é a opção mais comum. Plataformas como Hotmart e Kiwify já fazem retenção de impostos automaticamente, simplificando a contabilidade. PIX facilita recebimentos. Em Portugal, é necessário registrar-se como trabalhador independente e aplicar IVA de 23%. Este guia cobre impostos, propriedade intelectual e proteção de conteúdo — sem substituir assessoria profissional. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
];

const bundleUpdates = [
  {
    file: 'math-bundle.ts',
    seo: {
      primaryKeyword: 'pacote geradores de matemática para vendedores',
      secondaryKeywords: [
        'pacote de atividades de matemática uso comercial',
        'geradores de matemática imprimíveis Etsy KDP',
        'ferramentas de atividades de matemática para vendedores',
        'kit completo matemática imprimível comercial',
      ],
      lsiKeywords: [
        'pacote adição subtração atividades imprimíveis',
        'coleção puzzles matemáticos imprimíveis',
        'licença comercial atividades de matemática',
        'ferramenta de criação em massa atividades matemática',
        'atividades de matemática pré-escolar vendedores',
        'apostilas KDP matemática fundamental',
        'Etsy loja atividades matemática completa',
        'Hotmart pacote atividades matemática',
        'álgebra visual imprimível comercial',
        'código de adição puzzles criação',
        'grelha matemática atividades gerador',
        'Kiwify produtos matemática educativa',
      ],
      titleTag: 'Pacote Matemática para vendedores | LCS',
      metaDescription: 'Pacote com 6 geradores de matemática: adição, subtração, código, comparação, puzzles e álgebra. Venda no Hotmart, Kiwify, Etsy e KDP com licença comercial.',
    },
    hero: {
      title: 'Pacote Completo de Matemática para Vendedores',
      description: 'Construa uma linha completa de produtos de matemática imprimíveis sem alternar entre ferramentas separadas. O Pacote de Matemática reúne seis geradores especializados que cobrem adição, subtração, puzzles criptaritméticos, comparação maior/menor, puzzles de grelha e equações algébricas visuais. Cada gerador produz PDFs prontos para imprimir e JPEGs de alta resolução com gabaritos automáticos, dificuldade configurável e bibliotecas de imagens temáticas. Cinco das seis apps são completamente visuais — funcionam em qualquer idioma. Venda no Etsy, Amazon KDP, Hotmart ou Kiwify com licença comercial. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'literacy-bundle.ts',
    seo: {
      primaryKeyword: 'pacote jogos de palavras Etsy KDP',
      secondaryKeywords: [
        'pacote atividades de literacia para vendedores',
        'geradores de jogos de palavras uso comercial',
        'kit atividades de palavras imprimíveis Etsy',
        'pacote palavras cruzadas caça-palavras vendedores',
      ],
      lsiKeywords: [
        'caça-palavras gerador comercial imprimíveis',
        'palavras cruzadas criador atividades vendedores',
        'criptograma gerador puzzles de palavras',
        'atividades de literacia pré-escolar vendedores',
        'apostilas KDP jogos de palavras infantis',
        'Etsy loja jogos de palavras imprimíveis',
        'Hotmart pacote atividades de literacia',
        'Kiwify produtos jogos de palavras',
        'vocabulário visual atividades imprimíveis',
        'alfabetização atividades gerador comercial',
        'pacote completo literacia uso comercial',
        'licença comercial jogos de palavras',
      ],
      titleTag: 'Pacote jogos de palavras — Vender | LCS',
      metaDescription: 'Pacote com geradores de jogos de palavras: caça-palavras, palavras cruzadas, criptogramas e mais. Venda no Etsy, Amazon KDP, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Pacote Jogos de Palavras para Vendedores',
      description: 'Monte um catálogo completo de jogos de palavras imprimíveis com um único pacote. Inclui geradores de caça-palavras, palavras cruzadas, criptogramas e atividades de vocabulário visual — tudo o que compradores de atividades de literacia procuram. Cada gerador produz PDFs e JPEGs de alta resolução com gabaritos automáticos, múltiplos níveis de dificuldade e centenas de imagens temáticas. Crie atividades individuais ou apostilas completas para Amazon KDP. Venda no Etsy, Hotmart, Kiwify ou no seu próprio site com licença comercial incluída. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'visual-bundle.ts',
    seo: {
      primaryKeyword: 'pacote atividades visuais para vendedores',
      secondaryKeywords: [
        'pacote geradores de atividades visuais comercial',
        'kit atividades de colorir e desenho vendedores',
        'pacote imprimíveis visuais Etsy KDP',
        'atividades de arte e desenho uso comercial',
      ],
      lsiKeywords: [
        'páginas para colorir gerador comercial',
        'atividades de desenho imprimíveis vendedores',
        'arte educativa imprimível uso comercial',
        'colorir por números gerador atividades',
        'desenho guiado atividades crianças vendedores',
        'apostilas KDP colorir e desenho',
        'Etsy loja atividades visuais imprimíveis',
        'Hotmart atividades de arte educativas',
        'Kiwify pacote atividades visuais',
        'atividades motricidade fina imprimíveis',
        'criatividade infantil atividades comercial',
        'licença comercial atividades visuais',
      ],
      titleTag: 'Pacote atividades visuais vendedores | LCS',
      metaDescription: 'Pacote com geradores de atividades visuais: colorir, desenho, arte e mais. Crie imprimíveis profissionais para vender no Etsy, Amazon KDP, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Pacote Atividades Visuais para Vendedores',
      description: 'Construa uma linha de produtos visuais imprimíveis com geradores de colorir, desenho e atividades de arte. O pacote inclui ferramentas para criar páginas para colorir temáticas, atividades de desenho guiado, exercícios de motricidade fina e projetos de arte educativa — tudo com imagens de alta qualidade e layouts profissionais. Cada gerador oferece centenas de temas, múltiplos tamanhos de página e gabaritos automáticos. Ideal para apostilas de colorir no Amazon KDP ou listagens individuais no Etsy, Hotmart e Kiwify. Licença comercial incluída. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'matching-bundle.ts',
    seo: {
      primaryKeyword: 'pacote associação e classificação',
      secondaryKeywords: [
        'pacote atividades de associação para vendedores',
        'geradores de classificação imprimíveis comercial',
        'kit atividades de correspondência Etsy KDP',
        'pacote atividades de lógica visual vendedores',
      ],
      lsiKeywords: [
        'atividades de associação imprimíveis comercial',
        'classificação e ordenação gerador atividades',
        'correspondência visual imprimíveis vendedores',
        'atividades de sombras gerador comercial',
        'tamanho comparação atividades crianças',
        'apostilas KDP atividades de lógica',
        'Etsy loja atividades de associação',
        'Hotmart pacote atividades classificação',
        'Kiwify atividades de correspondência',
        'pré-escolar atividades associação vendedores',
        'licença comercial atividades de lógica',
        'atividades cognitivas imprimíveis comercial',
      ],
      titleTag: 'Pacote associação e classificação | LCS',
      metaDescription: 'Pacote com geradores de atividades de associação, classificação e correspondência visual. Venda imprimíveis no Etsy, Amazon KDP, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Pacote Associação e Classificação para Vendedores',
      description: 'Monte uma coleção completa de atividades de associação e classificação com um único pacote. Inclui geradores de correspondência visual, sombras, comparação de tamanho, ordenação e classificação por categorias — atividades essenciais para o desenvolvimento cognitivo na primeira infância. Cada gerador produz PDFs e JPEGs com gabaritos automáticos, centenas de imagens temáticas e múltiplos níveis de dificuldade. Perfeito para apostilas de pré-escolar no Amazon KDP ou listagens individuais no Etsy, Hotmart e Kiwify. Licença comercial incluída. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'puzzle-bundle.ts',
    seo: {
      primaryKeyword: 'pacote quebra-cabeças lógicos para KDP',
      secondaryKeywords: [
        'pacote geradores de puzzles imprimíveis vendedores',
        'kit atividades de lógica e puzzles comercial',
        'pacote quebra-cabeças educativos Etsy KDP',
        'geradores de puzzles uso comercial imprimíveis',
      ],
      lsiKeywords: [
        'sudoku gerador atividades imprimíveis',
        'labirintos gerador comercial vendedores',
        'puzzles de lógica imprimíveis comercial',
        'apostilas KDP quebra-cabeças educativos',
        'Etsy loja puzzles imprimíveis',
        'Hotmart pacote quebra-cabeças educativos',
        'Kiwify atividades de lógica vendedores',
        'atividades de raciocínio imprimíveis',
        'livros de puzzles Amazon KDP vendedores',
        'peças faltantes gerador atividades',
        'licença comercial puzzles educativos',
        'atividades STEM imprimíveis comercial',
      ],
      titleTag: 'Pacote quebra-cabeças para KDP | LCS',
      metaDescription: 'Pacote com geradores de quebra-cabeças lógicos: sudoku, labirintos, peças faltantes e mais. Crie apostilas para Amazon KDP, Etsy, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Pacote Quebra-Cabeças Lógicos para Vendedores',
      description: 'Crie apostilas e listagens de quebra-cabeças lógicos com um pacote completo de geradores. Inclui sudoku visual, labirintos, peças faltantes, intrusos e atividades de raciocínio — os tipos de puzzle mais procurados por compradores de imprimíveis educativos. Cada gerador produz PDFs e JPEGs com gabaritos automáticos, dificuldade configurável e centenas de imagens temáticas. Ideal para livros de puzzles no Amazon KDP ou listagens temáticas no Etsy. Venda também no Hotmart e Kiwify com licença comercial. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
  {
    file: 'search-bundle.ts',
    seo: {
      primaryKeyword: 'pacote ache e encontre para vendedores',
      secondaryKeywords: [
        'pacote geradores ache e encontre comercial',
        'kit atividades de busca visual vendedores',
        'pacote imprimíveis ache e encontre Etsy KDP',
        'geradores de atividades de procura comercial',
      ],
      lsiKeywords: [
        'ache e encontre gerador atividades imprimíveis',
        'encontre os objetos imprimíveis comercial',
        'atividades de atenção visual vendedores',
        'apostilas KDP ache e encontre crianças',
        'Etsy loja atividades de busca visual',
        'Hotmart pacote atividades de procura',
        'Kiwify atividades ache e encontre',
        'contagem visual atividades imprimíveis',
        'atividades de observação crianças comercial',
        'hidden objects worksheets vendedores',
        'licença comercial atividades de busca',
        'pré-escolar atividades visuais ache encontre',
      ],
      titleTag: 'Pacote ache e encontre vendedores | LCS',
      metaDescription: 'Pacote com geradores de atividades ache e encontre: busca visual, contagem e objetos escondidos. Venda imprimíveis no Etsy, Amazon KDP, Hotmart e Kiwify.',
    },
    hero: {
      title: 'Pacote Ache e Encontre para Vendedores',
      description: 'Monte uma coleção completa de atividades de busca visual com um único pacote. Inclui geradores de ache e encontre, contagem visual, objetos escondidos e atividades de observação — os tipos mais populares de imprimíveis visuais para crianças. Cada gerador produz PDFs e JPEGs com gabaritos automáticos, centenas de imagens temáticas e múltiplos níveis de dificuldade. Perfeito para apostilas de atividades visuais no Amazon KDP ou listagens individuais no Etsy. Venda também no Hotmart e Kiwify com licença comercial incluída. Teste grátis com marca d\'água — sem cadastro.',
    },
  },
];

// ─── Processing Engine ──────────────────────────────────────────────

const seoRegex = /  seo: \{[\s\S]*?\r?\n  \},/;

function buildSeoBlock(seo) {
  const sk = seo.secondaryKeywords.map(k => `      '${k.replace(/'/g, "\\'")}'`).join(',\n');
  const lsi = seo.lsiKeywords.map(k => `      '${k.replace(/'/g, "\\'")}'`).join(',\n');
  return `  seo: {
    primaryKeyword: '${seo.primaryKeyword.replace(/'/g, "\\'")}',
    secondaryKeywords: [
${sk},
    ],
    lsiKeywords: [
${lsi},
    ],
    titleTag: '${seo.titleTag.replace(/'/g, "\\'")}',
    metaDescription: '${seo.metaDescription.replace(/'/g, "\\'")}',
  },`;
}

function replaceHeroField(content, fieldName, newValue) {
  // Try multiple patterns for finding the field inside the hero block
  const escaped = newValue.replace(/'/g, "\\'");

  // Pattern 1: field: 'value'  (single line)
  const re1 = new RegExp(`(hero:\\s*\\{[\\s\\S]*?${fieldName}:\\s*)'(?:[^'\\\\]|\\\\.)*'`);
  if (re1.test(content)) {
    return content.replace(re1, `$1'${escaped}'`);
  }

  // Pattern 2: field: "value"  (single line, double quotes)
  const re2 = new RegExp(`(hero:\\s*\\{[\\s\\S]*?${fieldName}:\\s*)"(?:[^"\\\\]|\\\\.)*"`);
  if (re2.test(content)) {
    return content.replace(re2, `$1'${escaped}'`);
  }

  console.warn(`  WARNING: Could not replace hero.${fieldName}`);
  return content;
}

let updated = 0;
let errors = [];

function processFile(filePath, item, label) {
  if (!fs.existsSync(filePath)) {
    errors.push(`NOT FOUND: ${label}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace SEO block
  const seoBlock = buildSeoBlock(item.seo);
  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, seoBlock);
  } else {
    errors.push(`SEO REGEX FAILED: ${label}`);
    return;
  }

  // 2. Replace hero.title
  content = replaceHeroField(content, 'title', item.hero.title);

  // 3. Replace hero.description
  content = replaceHeroField(content, 'description', item.hero.description);

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log(`OK: ${label} — titleTag: ${item.seo.titleTag} (${item.seo.titleTag.length} chars)`);
}

// Process start-content
console.log('=== START CONTENT (12 files) ===\n');
for (const item of startUpdates) {
  const filePath = path.join(START_DIR, item.file);
  processFile(filePath, item, `start-content/pt/${item.file}`);
}

// Process bundle-content
console.log('\n=== BUNDLE CONTENT (6 files) ===\n');
for (const item of bundleUpdates) {
  const filePath = path.join(BUNDLE_DIR, item.file);
  processFile(filePath, item, `bundle-content/pt/${item.file}`);
}

console.log(`\nDone: ${updated}/18 updated, ${errors.length} errors`);
if (errors.length > 0) {
  console.log('ERRORS:');
  errors.forEach(e => console.log(`  - ${e}`));
}
