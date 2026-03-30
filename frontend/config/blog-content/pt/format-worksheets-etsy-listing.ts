import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'formatar fichas listagem Etsy',
    secondaryKeywords: [
      'formatar fichas listagem Etsy passo a passo',
      'formatar fichas listagem Etsy tutorial',
      'formatar fichas listagem Etsy como fazer',
    ],
    lsiKeywords: [
      'tutorial imprimíveis',
      'como criar fichas educativas',
      'guia prático imprimíveis',
    ],
    titleTag: 'Como Formatar Fichas para Listagens no Etsy | LCS',
    metaDescription: 'A formatação das suas fichas impacta diretamente as vendas no Etsy. Tamanho do papel, resolução, formato do arquivo e apresentação visual determinam s.',
  },
  hero: {
    title: 'Como Formatar Fichas para Listagens no Etsy',
    tagline: 'O formato que maximiza visualizações e conversões',
    description: 'A formatação das suas fichas impacta diretamente as vendas no Etsy. Tamanho do papel, resolução, formato do arquivo e apresentação visual determinam se um comprador clica e compra. Este tutorial mostra exatamente como formatar fichas para máxima conversão.',
  },
  category: 'how-to',
  introduction: 'Muitos vendedores criam fichas excelentes mas perdem vendas por formatação inadequada. PDF com resolução baixa, tamanho de papel errado ou apresentação confusa afastam compradores. Este guia cobre cada aspecto técnico da formatação para Etsy.',
  sections: [
    {
      heading: 'Especificações Técnicas',
      content: '- **Formato:** PDF (nunca JPEG ou PNG para fichas multipáginas)\n- **Resolução:** 300 DPI mínimo para impressão nítida\n- **Tamanho:** Ofereça A4 + Letter quando possível\n- **Margens:** Mínimo 1,5 cm em todas as laterais\n- **Cores:** CMYK para impressão, RGB para visualização digital\n\nO LessonCraftStudio gera fichas em 300 DPI com margens corretas automaticamente.',
    },
    {
      heading: 'Estrutura do Arquivo',
      content: 'Monte seu PDF assim:\n\n1. **Capa:** Título, número de páginas, faixa etária\n2. **Instruções:** Como usar as fichas (1 página)\n3. **Fichas de atividade:** O conteúdo principal\n4. **Gabaritos:** Todas as respostas\n5. **Termos de uso:** Licença de uso pessoal/comercial\n\nEsta estrutura profissional reduz perguntas de compradores e pedidos de reembolso.',
    },
    {
      heading: 'Fotos de Listagem (Mockups)',
      content: 'As fotos vendem mais que o produto em si:\n\n1. **Foto principal:** Mockup da ficha impressa em mesa de madeira\n2. **Foto 2:** 3-4 fichas abertas em leque\n3. **Foto 3:** Close de uma ficha com detalhes visíveis\n4. **Foto 4:** Antes e depois (ficha em branco vs preenchida)\n5. **Foto 5:** Todas as páginas em miniatura (mostra o volume)\n\nUse geradores de mockup gratuitos como Smartmockups ou Canva.',
    },
    {
      heading: 'Título e Tags Otimizados',
      content: 'Formato ideal do título:\n[Número] + [Tipo] + [Tema] + [Nível] + [Formato]\n\nExemplo: "30 Addition Worksheets Farm Animals | Kindergarten Math | Printable PDF with Answer Keys"\n\nTags: use todas as 13, cobrindo sinônimos e variações:\n1. addition worksheets kindergarten\n2. math worksheets printable\n3. farm animal math activities\n...\n\nNunca repita exatamente a mesma palavra-chave em múltiplas tags.',
    },
    {
      heading: 'Erros Comuns de Formatação',
      content: 'Evite estes erros que matam vendas:\n\n- **Resolução baixa:** 72 DPI fica borrado na impressão\n- **Sem gabarito:** Reduz valor percebido em 30-50%\n- **Apenas Letter:** Compradores europeus e brasileiros precisam de A4\n- **Marca d\'água no produto:** Só para amostras grátis, nunca no produto pago\n- **PDF sem bookmarks:** Dificulta navegação em pacotes grandes\n- **Cores que não imprimem bem:** Tons pastéis muito claros ficam invisíveis',
    },
  ],
  keyTakeaways: [
    'PDF em 300 DPI é o padrão mínimo para impressão profissional',
    'Ofereça A4 + Letter para alcance global',
    'Mockups profissionais aumentam conversão em 2-3x',
    '5 fotos de listagem cobrindo diferentes ângulos',
    'Gabarito incluído aumenta valor percebido em 30-50%',
  ],
  faq: [
    {
      question: 'Preciso oferecer A4 e Letter?',
      answer: 'Idealmente sim. Compradores americanos usam Letter; europeus e brasileiros usam A4. Ofereça ambos no mesmo arquivo ou como downloads separados.',
    },
    {
      question: 'Qual resolução usar?',
      answer: '300 DPI é o padrão para impressão. O LessonCraftStudio gera automaticamente nesta resolução.',
    },
    {
      question: 'Preciso de Photoshop para mockups?',
      answer: 'Não. Canva, Smartmockups e Placeit oferecem mockups gratuitos ou baratos sem necessidade de Photoshop.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'addition-worksheets', anchorText: 'Gerador de Fichas de Adição' },
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Gerador de Caça-Palavras' },
    { pageType: 'app', slug: 'coloring-worksheets', anchorText: 'Gerador de Colorir' },
  ],
  relatedPosts: [
    { slug: 'negocio-imprimiveis-sem-design', title: 'Negócio Sem Design' },
    { slug: 'estrategia-precos-imprimiveis-etsy', title: 'Estratégia Preços Etsy' },
    { slug: 'loja-etsy-imprimiveis-primeiro-mes', title: 'Loja Etsy: Primeiro Mês' },
  ],
  cta: {
    heading: 'Comece a Criar Agora',
    description: 'Gere fichas profissionais em minutos com nosso gerador. Teste grátis com marca d\'água — sem cadastro.',
    buttonText: 'Testar o Gerador',
    buttonUrl: '/apps',
  },
};

export default content;
