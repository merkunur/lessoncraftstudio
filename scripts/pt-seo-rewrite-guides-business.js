/**
 * Portuguese SEO Rewrite — Guide Content: Business Strategy Guides (20 files)
 */
const fs = require('fs');
const path = require('path');
const dir = 'frontend/config/guide-content/pt';

const guides = {
  'create-worksheet-bundles.ts': {
    pk: 'criar pacotes de atividades que vendem',
    title: 'Criar pacotes de atividades que vendem | LCS',
    meta: 'Como criar pacotes de atividades que vendem. Estratégias de bundling, organização temática e preços para maximizar vendas.',
    h1: 'Como criar pacotes de atividades que realmente vendem',
    desc: 'Aprenda a criar pacotes de atividades que multiplicam suas vendas na Hotmart, Kiwify, Etsy e Amazon KDP. Pacotes são a estratégia mais eficaz para aumentar o valor médio por pedido — compradores preferem pacotes completos a atividades individuais. Este guia cobre: como agrupar por tema, série escolar e tipo de atividade, precificar para máxima atratividade, criar descrições que convertem e usar pacotes como funil de vendas. Com o LessonCraftStudio, você tem 33 geradores e 104 temas para criar material ilimitado. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['estratégia de pacotes de atividades', 'como montar bundles educativos para vender', 'pacotes temáticos de imprimíveis Hotmart', 'bundling de atividades para Etsy e KDP'],
    lsi: ['pacotes', 'bundles', 'valor percebido', 'preços', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'vendedor'],
  },
  'niche-selection-printables.ts': {
    pk: 'escolher nicho para negócio de imprimíveis 2026',
    title: 'Escolher nicho de imprimíveis (2026) | LCS',
    meta: 'Como escolher o nicho certo para seu negócio de imprimíveis em 2026. Análise de demanda, competição e oportunidades.',
    h1: 'Como escolher o nicho certo para imprimíveis em 2026',
    desc: 'Aprenda a escolher o nicho certo para seu negócio de imprimíveis em 2026. A escolha do nicho é a decisão mais importante — um bom nicho tem alta demanda e baixa competição. Este guia cobre: como pesquisar demanda no Google, Etsy e Hotmart, analisar competição, identificar nichos sazonais vs. perenes, validar antes de investir e nichos específicos para o mercado brasileiro em português. O mercado de imprimíveis educativos em português está em fase de crescimento acelerado com oportunidades enormes. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['pesquisa de nicho imprimíveis 2026', 'nichos lucrativos imprimíveis Brasil', 'como validar nicho de imprimíveis', 'nicho de atividades educativas para vender'],
    lsi: ['nicho', 'demanda', 'competição', 'validação', 'pesquisa', 'Hotmart', 'Etsy', 'KDP', 'renda extra', 'negócio de imprimíveis', '2026', 'Brasil'],
  },
  'create-printable-product-line.ts': {
    pk: 'criar uma linha de produtos imprimíveis',
    title: 'Criar linha de produtos imprimíveis | LCS',
    meta: 'Como criar uma linha completa de produtos imprimíveis. Estratégia de catálogo, variações e escalamento.',
    h1: 'Como criar uma linha de produtos imprimíveis completa',
    desc: 'Aprenda a criar uma linha completa de produtos imprimíveis que gera vendas recorrentes na Hotmart, Kiwify, Etsy e Amazon KDP. Em vez de criar produtos avulsos, construa um catálogo estratégico com variações temáticas, progressão de dificuldade e pacotes escalonados. Este guia cobre: como planejar seu catálogo, criar variações sistemáticas a partir de cada gerador, usar temas sazonais para vendas previsíveis e escalar de uma linha para múltiplas. Com o LessonCraftStudio, 33 geradores e 104 temas permitem catálogos com centenas de produtos. Teste grátis com marca d\\\'água.',
    sk: ['estratégia de catálogo imprimíveis', 'linha de produtos educativos para vender', 'como escalar catálogo de atividades', 'criar portfólio de imprimíveis'],
    lsi: ['linha de produtos', 'catálogo', 'variações', 'escalamento', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'renda extra', 'negócio de imprimíveis', 'licença comercial', 'temas'],
  },
  'pricing-educational-printables.ts': {
    pk: 'estratégia de preços para atividades educativas',
    title: 'Preços para atividades educativas | LCS',
    meta: 'Estratégia de preços para atividades educativas. Psicologia de preços, pacotes e margens para Hotmart, Etsy e KDP.',
    h1: 'Estratégia de preços para atividades educativas',
    desc: 'Domine a estratégia de preços para atividades educativas e maximize seus lucros na Hotmart, Kiwify, Etsy e Amazon KDP. Este guia cobre: psicologia de preços, faixas de preço por tipo de produto (individual, pacote, mega pacote), como calcular margens considerando taxas de cada plataforma, estratégias de preço âncora e descontos, e adaptação de preços para o mercado brasileiro (R$) vs. internacional (USD). Precificar corretamente é a diferença entre um hobby e um negócio lucrativo. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['como precificar atividades educativas', 'preços imprimíveis Hotmart e Etsy', 'estratégia de preço para vendedores digitais', 'precificação de pacotes de atividades'],
    lsi: ['preços', 'precificação', 'margens', 'taxas', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'renda extra', 'negócio de imprimíveis', 'PIX', 'R$'],
  },
  'scale-printable-business-guide.ts': {
    pk: 'escalar seu negócio de imprimíveis',
    title: 'Escalar negócio de imprimíveis — guia | LCS',
    meta: 'Como escalar seu negócio de imprimíveis. De renda extra a negócio em tempo integral. Automação, catálogo e marketing.',
    h1: 'Como escalar seu negócio de imprimíveis educativos',
    desc: 'Aprenda a escalar seu negócio de imprimíveis de renda extra para renda principal na Hotmart, Kiwify, Etsy e Amazon KDP. Este guia cobre: como expandir seu catálogo sistematicamente, automatizar processos repetitivos, diversificar plataformas para reduzir risco, usar marketing orgânico e pago, e quando fazer a transição de renda extra para negócio em tempo integral. O mercado brasileiro de infoprodutos educativos é gigante e cresce a dois dígitos anualmente. Com o LessonCraftStudio, produção rápida permite escalamento acelerado. Teste grátis com marca d\\\'água.',
    sk: ['como crescer negócio de imprimíveis', 'escalar vendas de atividades educativas', 'de renda extra a negócio de imprimíveis', 'automação para vendedores de imprimíveis'],
    lsi: ['escalar', 'crescimento', 'automação', 'catálogo', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'renda extra', 'negócio', 'marketing', 'Brasil'],
  },
  'passive-income-worksheets.ts': {
    pk: 'renda passiva com atividades educativas 2026',
    title: 'Renda passiva com atividades (2026) | LCS',
    meta: 'Como gerar renda passiva com atividades educativas em 2026. Hotmart, Etsy, KDP e estratégias de renda recorrente.',
    h1: 'Renda passiva com atividades educativas em 2026',
    desc: 'Descubra como gerar renda passiva com atividades educativas em 2026 usando Hotmart, Kiwify, Etsy e Amazon KDP. A cultura de "renda extra" no Brasil é uma das mais fortes do mundo — e vender atividades educativas para imprimir é uma das oportunidades mais acessíveis. Este guia cobre: por que imprimíveis educativos geram renda passiva real, quais plataformas escolher para o mercado brasileiro, como construir um catálogo que vende no piloto automático e quanto é realista ganhar. Com o LessonCraftStudio, custo de produção praticamente zero. Teste grátis com marca d\\\'água.',
    sk: ['renda extra com atividades educativas', 'ganhar dinheiro vendendo imprimíveis 2026', 'renda passiva Hotmart atividades', 'negócio de imprimíveis renda extra Brasil'],
    lsi: ['renda passiva', 'renda extra', '2026', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'Brasil', 'infoprodutos', 'imprimíveis', 'atividades educativas', 'PIX'],
  },
  'understanding-commercial-licenses.ts': {
    pk: 'licença comercial para vendedores de imprimíveis',
    title: 'Licença comercial para vendedores | LCS',
    meta: 'Entenda a licença comercial para vendedores de imprimíveis. O que permite, o que proíbe e como proteger seu negócio.',
    h1: 'Licença comercial para vendedores de imprimíveis — guia',
    desc: 'Entenda tudo sobre licença comercial para vendedores de imprimíveis educativos. Este guia cobre: o que uma licença comercial permite e proíbe, diferença entre uso pessoal e comercial, como a licença do LessonCraftStudio funciona (sem atribuição, sem royalties, sem limites), como documentar suas licenças e proteger seu negócio legalmente. A licença comercial é o que permite transformar atividades geradas em produtos vendáveis na Hotmart, Kiwify, Etsy e Amazon KDP. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['como funciona licença comercial imprimíveis', 'licença comercial para Etsy e Hotmart', 'direitos de uso comercial atividades', 'licença para vender imprimíveis educativos'],
    lsi: ['licença comercial', 'uso comercial', 'direitos', 'atribuição', 'royalties', 'Hotmart', 'Etsy', 'KDP', 'renda extra', 'negócio de imprimíveis', 'proteção legal', 'vendedor'],
  },
  'research-profitable-niches.ts': {
    pk: 'encontrar nichos lucrativos de imprimíveis',
    title: 'Nichos lucrativos de imprimíveis — guia | LCS',
    meta: 'Como encontrar nichos lucrativos de imprimíveis. Pesquisa de mercado, validação e ferramentas para 2026.',
    h1: 'Como encontrar nichos lucrativos de imprimíveis',
    desc: 'Aprenda a encontrar nichos lucrativos de imprimíveis educativos usando pesquisa de mercado sistemática. Este guia cobre: ferramentas de pesquisa de palavras-chave, como analisar vendedores concorrentes na Hotmart, Etsy e Amazon, identificar lacunas de mercado em português, validar nichos antes de investir tempo e criar um mapa de oportunidades. O mercado brasileiro de imprimíveis educativos está em crescimento acelerado — quem encontra os nichos certos primeiro domina. Com o LessonCraftStudio, teste nichos rapidamente com 33 geradores. Teste grátis com marca d\\\'água.',
    sk: ['pesquisa de nicho imprimíveis educativos', 'como validar nicho de atividades', 'ferramentas pesquisa mercado imprimíveis', 'nichos de atividades com pouca competição'],
    lsi: ['nichos', 'pesquisa', 'validação', 'mercado', 'Hotmart', 'Etsy', 'KDP', 'renda extra', 'competição', 'palavras-chave', 'Brasil', 'oportunidades'],
  },
  'multilingual-printable-business.ts': {
    pk: 'negócio de imprimíveis multilíngue',
    title: 'Negócio de imprimíveis multilíngue | LCS',
    meta: 'Como criar um negócio de imprimíveis multilíngue. 11 idiomas, mercados globais e estratégia de expansão.',
    h1: 'Como criar um negócio de imprimíveis multilíngue',
    desc: 'Aprenda a criar um negócio de imprimíveis multilíngue que alcança mercados globais com o LessonCraftStudio. Com suporte a 11 idiomas nativos (português, inglês, alemão, francês, espanhol e mais), cada atividade que você cria pode ser vendida em múltiplos mercados. Este guia cobre: como adaptar produtos para diferentes idiomas, precificar para mercados internacionais, gerenciar listagens em múltiplos marketplaces e usar a vantagem multilíngue para se destacar da concorrência. Multiplique seu mercado por 11 com o mesmo esforço. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['imprimíveis em vários idiomas para vender', 'negócio global de atividades educativas', 'como vender em múltiplos idiomas Etsy', 'estratégia multilíngue vendedor imprimíveis'],
    lsi: ['multilíngue', '11 idiomas', 'mercados globais', 'Hotmart', 'Etsy', 'KDP', 'renda extra', 'português', 'inglês', 'alemão', 'francês', 'espanhol'],
  },
  'worksheets-multiple-languages.ts': {
    pk: 'criar atividades em vários idiomas para vender',
    title: 'Atividades em vários idiomas para vender | LCS',
    meta: 'Como criar atividades em vários idiomas para vender. 11 idiomas nativos, caracteres autênticos e mercados globais.',
    h1: 'Criar atividades em vários idiomas para vender online',
    desc: 'Aprenda a criar atividades em vários idiomas para vender na Hotmart, Kiwify, Etsy e Amazon KDP. O LessonCraftStudio suporta 11 idiomas com caracteres nativos — grades em português incluem ã, õ, ç; alemão tem ä, ö, ü; francês tem é, è, ç. Este guia cobre: como usar a funcionalidade multilíngue para criar produtos em cada idioma, quais mercados são mais lucrativos por idioma, como adaptar listagens e como multiplicar seu catálogo. Uma única atividade gera 11 produtos únicos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['atividades multilíngues para Etsy', 'criar imprimíveis em 11 idiomas', 'como vender atividades em português e inglês', 'vantagem multilíngue vendedor imprimíveis'],
    lsi: ['vários idiomas', '11 idiomas', 'caracteres nativos', 'Hotmart', 'Etsy', 'KDP', 'renda extra', 'português', 'inglês', 'mercados globais', 'licença comercial', 'vendedor'],
  },
  'copyright-printable-sellers.ts': {
    pk: 'direitos autorais para vendedores de imprimíveis',
    title: 'Direitos autorais para vendedores | LCS',
    meta: 'Direitos autorais para vendedores de imprimíveis. O que você pode e não pode fazer, proteção e legislação.',
    h1: 'Direitos autorais para vendedores de imprimíveis — guia',
    desc: 'Entenda os direitos autorais que afetam vendedores de imprimíveis educativos. Este guia cobre: o que é protegido por direitos autorais, como a licença comercial do LessonCraftStudio protege você, o que fazer se alguém copiar seu produto, como registrar seus direitos no Brasil (INPI) e dicas práticas para proteger seu trabalho na Hotmart, Etsy e KDP. Conhecer seus direitos é essencial para operar um negócio de imprimíveis com segurança jurídica. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['proteção de direitos autorais imprimíveis', 'copyright para vendedores Etsy', 'legislação direitos autorais Brasil imprimíveis', 'como proteger imprimíveis educativos'],
    lsi: ['direitos autorais', 'copyright', 'proteção', 'INPI', 'licença comercial', 'Hotmart', 'Etsy', 'KDP', 'legislação', 'Brasil', 'vendedor', 'negócio'],
  },
  'customer-support-digital-products.ts': {
    pk: 'atendimento ao cliente para produtos digitais',
    title: 'Atendimento ao cliente digital — guia | LCS',
    meta: 'Como fazer atendimento ao cliente para produtos digitais. Templates, FAQ, avaliações e fidelização.',
    h1: 'Atendimento ao cliente para produtos digitais — guia',
    desc: 'Aprenda a fazer atendimento ao cliente eficiente para seu negócio de produtos digitais educativos. Este guia cobre: como criar templates de resposta para perguntas frequentes, lidar com pedidos de reembolso, converter reclamações em avaliações positivas, automatizar respostas na Hotmart e Etsy, e construir relacionamento com compradores recorrentes. Um bom atendimento é o que separa vendedores amadores de profissionais — e impacta diretamente suas avaliações e vendas futuras. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['suporte ao cliente vendedor digital', 'como responder compradores Etsy Hotmart', 'atendimento ao cliente imprimíveis', 'templates de resposta vendedor digital'],
    lsi: ['atendimento ao cliente', 'suporte', 'avaliações', 'reembolso', 'FAQ', 'Hotmart', 'Etsy', 'KDP', 'fidelização', 'negócio digital', 'vendedor', 'templates'],
  },
  'automate-printable-business.ts': {
    pk: 'automatizar seu negócio de imprimíveis',
    title: 'Automatizar negócio de imprimíveis | LCS',
    meta: 'Como automatizar seu negócio de imprimíveis. Ferramentas, processos e estratégias para escalar com menos esforço.',
    h1: 'Como automatizar seu negócio de imprimíveis',
    desc: 'Aprenda a automatizar seu negócio de imprimíveis educativos e escalar com menos esforço. Este guia cobre: ferramentas de automação para Hotmart e Etsy, como criar processos repetíveis de criação de produtos, automação de e-mail marketing, agendamento de publicações, entrega automática de produtos e como reduzir o tempo gasto em tarefas operacionais. A automação é o que permite transformar renda extra em negócio escalável. Com o LessonCraftStudio, a criação de produtos já é automatizada — gere centenas de atividades em minutos. Teste grátis com marca d\\\'água.',
    sk: ['automação para vendedor de imprimíveis', 'ferramentas automação negócio digital', 'como automatizar vendas Hotmart Etsy', 'processos automáticos imprimíveis educativos'],
    lsi: ['automação', 'ferramentas', 'processos', 'escalamento', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'renda extra', 'negócio', 'email marketing', 'produtividade'],
  },
  'social-media-printable-marketing.ts': {
    pk: 'redes sociais para vendedores de imprimíveis',
    title: 'Redes sociais para vendedores | LCS',
    meta: 'Marketing em redes sociais para vendedores de imprimíveis. Instagram, Pinterest, TikTok e estratégias orgânicas.',
    h1: 'Redes sociais para vendedores de imprimíveis — guia',
    desc: 'Domine o marketing em redes sociais para seu negócio de imprimíveis educativos. Este guia cobre: quais plataformas funcionam melhor para imprimíveis (Instagram, Pinterest, TikTok), como criar conteúdo que atrai compradores, estratégias de hashtags por plataforma, frequência ideal de publicação e como converter seguidores em clientes na Hotmart, Etsy e KDP. As redes sociais são o canal de marketing mais acessível para vendedores iniciantes — investimento zero com potencial de alcance orgânico enorme. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['marketing redes sociais imprimíveis', 'Instagram para vendedor de atividades', 'Pinterest para negócio de imprimíveis', 'TikTok para vendedores educativos'],
    lsi: ['redes sociais', 'Instagram', 'Pinterest', 'TikTok', 'marketing', 'orgânico', 'hashtags', 'Hotmart', 'Etsy', 'renda extra', 'negócio', 'conteúdo'],
  },
  'pinterest-marketing-worksheets.ts': {
    pk: 'marketing no Pinterest para negócio de atividades',
    title: 'Pinterest para negócio de atividades | LCS',
    meta: 'Marketing no Pinterest para vendedores de atividades. Pins, quadros, SEO e estratégias de tráfego orgânico.',
    h1: 'Marketing no Pinterest para negócio de atividades',
    desc: 'Domine o Pinterest como canal de marketing para seu negócio de atividades educativas. O Pinterest é um motor de busca visual — e imprimíveis educativos são um dos conteúdos com melhor desempenho na plataforma. Este guia cobre: como criar pins que atraem cliques, otimizar quadros com palavras-chave, usar SEO do Pinterest para tráfego orgânico gratuito, agendar publicações e direcionar tráfego para suas lojas na Hotmart, Etsy e KDP. Um pin bem otimizado gera tráfego por meses ou anos. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['Pinterest para vendedor de imprimíveis', 'SEO Pinterest atividades educativas', 'como criar pins para imprimíveis', 'tráfego orgânico Pinterest para Etsy'],
    lsi: ['Pinterest', 'pins', 'quadros', 'SEO', 'tráfego orgânico', 'visual', 'Hotmart', 'Etsy', 'KDP', 'renda extra', 'marketing', 'imprimíveis'],
  },
  'email-marketing-printables.ts': {
    pk: 'email marketing para vendedores de imprimíveis',
    title: 'Email marketing para vendedores | LCS',
    meta: 'Email marketing para vendedores de imprimíveis. Lista, automação, sequências e estratégias de conversão.',
    h1: 'Email marketing para vendedores de imprimíveis — guia',
    desc: 'Aprenda a usar email marketing para aumentar vendas do seu negócio de imprimíveis educativos. Este guia cobre: como construir uma lista de emails, criar lead magnets com atividades grátis (com marca d\\\'água), montar sequências de automação, escrever emails que convertem e integrar com Hotmart, Kiwify e Etsy. O email marketing é o canal com maior ROI no marketing digital — e para vendedores de imprimíveis, a combinação de conteúdo grátis como isca e produtos pagos é extremamente eficaz. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['email marketing vendedor de imprimíveis', 'lista de emails para negócio digital', 'automação email Hotmart imprimíveis', 'como converter email em vendas imprimíveis'],
    lsi: ['email marketing', 'lista', 'automação', 'sequências', 'lead magnet', 'Hotmart', 'Kiwify', 'Etsy', 'renda extra', 'conversão', 'ROI', 'vendedor'],
  },
  'get-reviews-printable-products.ts': {
    pk: 'conseguir avaliações para produtos imprimíveis',
    title: 'Conseguir avaliações para imprimíveis | LCS',
    meta: 'Como conseguir avaliações para seus produtos imprimíveis. Estratégias éticas para Hotmart, Etsy e KDP.',
    h1: 'Como conseguir avaliações para produtos imprimíveis',
    desc: 'Aprenda a conseguir avaliações para seus produtos imprimíveis na Hotmart, Etsy e Amazon KDP. Avaliações são o fator mais importante para vendas — produtos com mais avaliações positivas vendem exponencialmente mais. Este guia cobre: estratégias éticas para solicitar avaliações, como incluir pedidos de avaliação nos PDFs entregues, timing ideal para follow-up, como lidar com avaliações negativas e transformá-las em oportunidades. Nunca compre ou fabrique avaliações — as estratégias aqui são 100% legítimas. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['como pedir avaliações Etsy Hotmart', 'estratégias de avaliação para vendedores', 'aumentar avaliações produtos digitais', 'reviews para imprimíveis educativos'],
    lsi: ['avaliações', 'reviews', 'follow-up', 'Hotmart', 'Etsy', 'KDP', 'vendas', 'reputação', 'confiança', 'negócio', 'vendedor', 'produtos digitais'],
  },
  'seasonal-marketing-printables.ts': {
    pk: 'marketing sazonal para vendedores de imprimíveis',
    title: 'Marketing sazonal para imprimíveis | LCS',
    meta: 'Marketing sazonal para vendedores de imprimíveis. Calendário brasileiro, datas comemorativas e estratégias.',
    h1: 'Marketing sazonal para vendedores de imprimíveis',
    desc: 'Domine o marketing sazonal para seu negócio de imprimíveis educativos com foco no calendário brasileiro. No Brasil, as datas são diferentes: volta às aulas em fevereiro, Dia dos Namorados em 12 de junho, Festa Junina em junho, Dia das Crianças em 12 de outubro, Carnaval em fevereiro-março. Este guia cobre: como planejar seu calendário de lançamentos, criar produtos sazonais com antecedência, usar tendências sazonais para picos de vendas e adaptar para mercados internacionais via Etsy e KDP. Teste grátis com marca d\\\'água — sem cadastro.',
    sk: ['calendário sazonal vendedor imprimíveis Brasil', 'datas comemorativas para vendas imprimíveis', 'marketing festas brasileiras imprimíveis', 'planejar lançamentos sazonais atividades'],
    lsi: ['sazonal', 'calendário', 'Carnaval', 'Festa Junina', 'volta às aulas', 'Natal', 'Hotmart', 'Etsy', 'KDP', 'Brasil', 'datas comemorativas', 'vendedor'],
  },
  'digital-vs-physical-printables.ts': {
    pk: 'imprimíveis digitais vs físicos comparação',
    title: 'Digitais vs físicos: imprimíveis | LCS',
    meta: 'Imprimíveis digitais vs físicos: qual modelo escolher? Comparação de margens, logística, escalamento e público.',
    h1: 'Imprimíveis digitais vs físicos — qual modelo escolher',
    desc: 'Compare imprimíveis digitais e físicos para decidir qual modelo funciona melhor para seu negócio. Este guia analisa: margens de lucro (digitais vencem por ampla margem), logística e envio (digitais não têm), escalabilidade (digitais são infinitamente escaláveis), público-alvo de cada modelo e quando faz sentido oferecer ambos. Para o mercado brasileiro, digitais dominam: Hotmart e Kiwify são plataformas 100% digitais, e os compradores esperam entrega instantânea via download. Amazon KDP é a exceção — livros físicos impressos sob demanda. Teste grátis com marca d\\\'água.',
    sk: ['digital vs físico para vendedores', 'vender imprimíveis digitais ou impressos', 'comparação modelos negócio imprimíveis', 'vantagens imprimíveis digitais'],
    lsi: ['digital', 'físico', 'comparação', 'margens', 'logística', 'Hotmart', 'Kiwify', 'Etsy', 'KDP', 'escalamento', 'download', 'impressão sob demanda'],
  },
  'quality-standards-worksheets.ts': {
    pk: 'padrões de qualidade para atividades vendáveis',
    title: 'Qualidade para atividades que vendem | LCS',
    meta: 'Padrões de qualidade para atividades que vendem. Resolução, layout, gabarito e o que compradores esperam.',
    h1: 'Padrões de qualidade para atividades que realmente vendem',
    desc: 'Aprenda os padrões de qualidade que separam atividades que vendem das que ficam paradas. Este guia cobre: resolução mínima (300 DPI), formatos de página corretos, layout profissional, inclusão de gabaritos, campos de nome e data, instruções claras e o que compradores na Hotmart, Etsy e KDP realmente esperam. Produtos de alta qualidade recebem melhores avaliações, geram vendas recorrentes e justificam preços premium. Com o LessonCraftStudio, suas atividades já saem em 300+ DPI com gabarito automático e layout profissional. Teste grátis com marca d\\\'água.',
    sk: ['qualidade para imprimíveis que vendem', 'padrões profissionais atividades Etsy', 'resolução e formato para imprimíveis', 'checklist qualidade atividades educativas'],
    lsi: ['qualidade', 'resolução', '300 DPI', 'layout', 'gabarito', 'profissional', 'Hotmart', 'Etsy', 'KDP', 'avaliações', 'padrões', 'vendedor'],
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
