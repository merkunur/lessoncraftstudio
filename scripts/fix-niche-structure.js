// Fix niche-selection-printables.ts to match GuideContent type
const fs = require('fs');
const fp = 'frontend/config/guide-content/pt/niche-selection-printables.ts';
let content = fs.readFileSync(fp, 'utf8');

// 1. Replace all 'title:' with 'heading:' inside tutorial entries (not hero.title)
// Lines with 6-space indent + title: (tutorial entries)
content = content.replace(/^(\s{6})title: '/gm, "$1heading: '");

// 2. Remove all keyTakeaways arrays from tutorial entries
content = content.replace(/\s+keyTakeaways: \[\n(?:\s+'[^']*',?\n)*\s+\],/g, '');

// 3. Add introduction after hero block
const heroEnd = "  },\n\n  tutorial:";
const introText = `  },

  introduction: 'A diferença entre vendedores de imprimíveis que constroem negócios sustentáveis e os que lutam durante anos resume-se muitas vezes a uma única decisão inicial: a seleção de nicho. Escolher o nicho certo determina a sua audiência, o seu poder de fixação de preços, o seu nível de concorrência e o seu potencial de crescimento a longo prazo.\\n\\nEste guia fornece um enquadramento sistemático para avaliar, escolher e validar um nicho de imprimíveis — quer venda no Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad ou qualquer outra plataforma. Vai aprender a identificar as suas vantagens iniciais, pesquisar a procura do mercado, analisar a concorrência, avaliar a rentabilidade, validar antes de se comprometer e planear a sua estratégia de expansão.\\n\\nTodas as ferramentas mencionadas neste guia estão disponíveis no teste grátis com marca d\\'água. Pode criar fichas de exemplo para múltiplos nichos, testar diferentes tipos de produtos e avaliar a qualidade do resultado antes de comprar uma licença comercial.',

  tutorial:`;
content = content.replace(heroEnd, introText);

// 4. Replace productShowcase with proper visuals
const productShowcaseStart = content.indexOf('  productShowcase:');
const galleryStart = content.indexOf('  gallery:');
const themeImagesStart = content.indexOf('  themeImages:');

// Find the end of gallery block
const afterGallery = content.indexOf('\n  themeImages:');

// Replace productShowcase and gallery with proper visuals
const beforeProductShowcase = content.substring(0, productShowcaseStart);
const afterThemeImages = content.substring(themeImagesStart);

// Build faq section
const faqSection = `  faq: [
    {
      question: 'Como sei se o meu nicho de imprimíveis tem procura suficiente?',
      answer: 'Pesquise o seu nicho nos principais marketplaces (Etsy, Amazon KDP, Teachers Pay Teachers) e observe as sugestões automáticas, o número de resultados e as avaliações dos produtos mais vendidos. Sugestões automáticas indicam pesquisas reais. Produtos com centenas de avaliações confirmam procura forte. Ferramentas como eRank (Etsy) ou Publisher Rocket (KDP) fornecem dados de volume de pesquisa específicos.',
    },
    {
      question: 'Devo começar com um nicho perene ou sazonal?',
      answer: 'A estratégia ótima combina ambos. Use nichos perenes como base do seu rendimento — fichas que vendem todos os meses — e complemente com produtos sazonais que aproveitam picos de procura. Nichos perenes dão estabilidade. Nichos sazonais dão oportunidades de crescimento concentrado.',
    },
    {
      question: 'Como posso validar um nicho antes de investir muito tempo?',
      answer: 'Crie um produto mínimo viável de 3-5 fichas para o nicho potencial. Liste-o nos marketplaces relevantes com SEO bem otimizado e observe durante 2-4 semanas. Visualizações e favoritos indicam interesse. Se possível, teste 2-3 nichos simultaneamente para comparar com dados reais. Defina critérios de decisão antes de testar.',
    },
    {
      question: 'Quando devo expandir para um nicho adjacente?',
      answer: 'A regra geral é expandir quando 80% do seu catálogo base está completo e a vender. Expanda primeiro verticalmente (mais conteúdo no mesmo nicho), depois horizontalmente (nichos adjacentes com o mesmo público), e depois por nível escolar ou idioma. Cada tipo de expansão reutiliza os seus modelos, público e posicionamento existentes.',
    },
    {
      question: 'Posso experimentar ferramentas de criação antes de escolher um nicho?',
      answer: 'Sim. Todas as ferramentas do LessonCraft Studio oferecem um teste grátis com marca d\\'água. Pode criar fichas de exemplo para múltiplos nichos, testar diferentes tipos de produtos e avaliar a velocidade de produção antes de se comprometer com um nicho específico. A licença comercial remove a marca d\\'água quando estiver pronto para vender.',
    },
    {
      question: 'Que tipos de imprimíveis são mais fáceis de começar a vender?',
      answer: 'Fichas de matemática (adição, subtração), sopas de letras, páginas para colorir e cartões de bingo são os tipos de produtos mais acessíveis para iniciantes. Têm procura consistente, são rápidos de criar com geradores e funcionam em múltiplos nichos temáticos. Comece com o tipo que melhor se adequa ao seu nicho escolhido.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/english/word-search/word search portrait.webp', alt: 'Ficha de caça-palavras mostrando a versatilidade de produtos em múltiplos nichos' },
    samples: [
      { src: '/samples/english/word-search/word search portrait.webp', alt: 'Ficha de caça-palavras mostrando a versatilidade de um produto em múltiplos nichos', caption: 'Os caça-palavras funcionam em qualquer nicho temático — animais, alimentos, veículos, profissões — tornando-os ideais para testar a procura de nicho' },
      { src: '/samples/english/coloring/coloring portrait.webp', alt: 'Página para colorir mostrando possibilidades de produtos temáticos de nicho', caption: 'As páginas para colorir são o produto de entrada mais popular — cada nicho temático gera dezenas de variações' },
      { src: '/samples/english/bingo/bingo portrait.webp', alt: 'Cartão de bingo mostrando como um tipo de produto serve múltiplos segmentos de mercado', caption: 'Um único tipo de produto pode servir múltiplos segmentos — salas de aula, festas e terapia' },
      { src: '/samples/english/matching/matching portrait.webp', alt: 'Ficha de associação mostrando a variedade de produtos de nicho educativo', caption: 'As atividades de associação funcionam em nichos educativos desde vocabulário a matemática' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Como criar caça-palavras para qualquer tema de nicho',
  },

`;

content = beforeProductShowcase + faqSection + afterThemeImages;

fs.writeFileSync(fp, content, 'utf8');
console.log('Done - restructured niche-selection-printables.ts');
