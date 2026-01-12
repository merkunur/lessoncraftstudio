import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Atividades de Adição (Addition Worksheets) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/adicao-fichas.ts
 * URL: /pt/apps/adicao-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'adicao-fichas',
    appId: 'image-addition',
    title: 'Atividades de Adição para Imprimir - Gerador de Atividades de Matemática para Educação Infantil e 1º Ano',
    description: 'Crie atividades de adição personalizadas com nosso gerador de atividades de matemática. Sua assinatura Pacote Essencial oferece criação ilimitada de atividades para imprimir sem taxas adicionais. Gere fichas de adição profissionais para educação infantil e ensino fundamental.',
    keywords: 'atividades de adição, atividades para imprimir, atividades de matemática, educação infantil, 1º ano, 2º ano, coordenação motora, tabuada, desenhos para colorir, atividades de alfabetização, atividades vogais, letra cursiva, pontilhado',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/adicao-fichas',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-3
  hero: {
    title: 'Atividades de Adição para Imprimir',
    subtitle: 'Gerador de Atividades de Matemática para Educação Infantil e 1º Ano',
    description: `Crie atividades de adição personalizadas com nosso gerador de atividades de matemática. Sua assinatura Pacote Essencial oferece criação ilimitada de atividades para imprimir sem taxas adicionais. Gere fichas de adição profissionais perfeitas para educação infantil e ensino fundamental. Baixe PDFs de alta qualidade em menos de 3 minutos.

Professores de todo o Brasil precisam de atividades de matemática prontas para usar em sala de aula. Nosso gerador resolve esse problema. Você escolhe as imagens, define a quantidade de exercícios e gera atividades de adição instantaneamente.

O sistema funciona com mais de 3000 imagens infantis organizadas por temas. Animais, frutas, brinquedos, veículos e muito mais. Cada atividade usa imagens que as crianças reconhecem e adoram. Isso torna o aprendizado de matemática mais envolvente.`,
    previewImageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
    ctaLabels: {
      tryFree: 'Experimente Grátis',
      viewSamples: 'Ver Exemplos',
    },
    trustBadges: {
      languages: '11 Idiomas',
      images: '3000+ Imagens',
      license: 'Licença Comercial',
    },
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    floatingStats: {
      time: '3 min',
      action: 'Crie e Baixe',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Exemplos de Atividades de Adição',
    sectionDescription: 'Baixe exemplos gratuitos para ver nossa qualidade profissional',
    downloadLabel: 'Baixar Exemplo Grátis',
    worksheetLabel: 'Atividade',
    answerKeyLabel: 'Gabarito',
    viewAllLabel: 'Ampliar',
    noPdfLabel: 'Apenas prévia',
    freePdfCountLabel: 'downloads gratuitos',
    badgeText: 'Exemplos Grátis',
    downloadingLabel: 'Baixando...',
    ofLabel: 'de',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
        altText: 'Atividade de adição formato retrato com imagens para educação infantil',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/addition_worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key landscape.jpeg',
        altText: 'Atividade de adição formato paisagem para ensino fundamental',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/image and number.jpeg',
        answerKeySrc: '/samples/english/addition/image and number answer_key.jpeg',
        altText: 'Atividade de adição modo imagem e número para matemática visual',
        pdfDownloadUrl: '/samples/english/addition/image and number.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/addition/find addend.jpeg',
        answerKeySrc: '/samples/english/addition/find addend answer_key.jpeg',
        altText: 'Atividade encontre o termo para desenvolvimento do raciocínio algébrico',
        pdfDownloadUrl: '/samples/english/addition/find addend.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/addition/mixed mode.jpeg',
        answerKeySrc: '/samples/english/addition/mixed mode answer_key.jpeg',
        altText: 'Atividade de adição modo misto com variedade de exercícios',
        pdfDownloadUrl: '/samples/english/addition/mixed mode.pdf',
      },
    ],
  },

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Atividades de Matemática',
    sectionDescription: 'Nosso gerador de atividades de adição oferece recursos completos para educadores. Cada funcionalidade foi pensada para facilitar a criação de materiais didáticos. Professores economizam horas de trabalho toda semana. Veja todos os recursos disponíveis na plataforma.',
    highlightBadgeText: 'Recurso Principal',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    badgeText: 'Recursos',
    trustBadges: {
      allFeatures: 'Todos os recursos incluídos',
      noHiddenFees: 'Sem taxas ocultas',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Crie Atividades em 3 Cliques',
        description: `O processo de criação é simples e direto. Primeiro, selecione um tema de imagens ou escolha figuras individuais. Segundo, defina as configurações do exercício como quantidade e dificuldade. Terceiro, clique em gerar e sua atividade aparece instantaneamente.

Não precisa de habilidades de design. Não precisa de software caro. Tudo acontece no navegador. Suas atividades de matemática ficam prontas em menos de 3 minutos. O sistema cuida de todo o layout automaticamente.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Atividades Totalmente Editáveis',
        description: `Após gerar sua atividade, você tem controle total sobre cada elemento. Arraste imagens para novas posições. Redimensione qualquer figura com o mouse. Gire elementos para criar layouts únicos. Delete itens que não precisa.

O canvas interativo funciona como um editor profissional. Adicione textos personalizados com diferentes fontes e cores. Escolha entre Lexend Deca, Baloo 2, Nunito, Quicksand e Fredoka. Aplique contornos nos textos para maior destaque. Suas atividades educação infantil ficam exatamente como você imaginou.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Quatro Modos de Exercícios',
        description: `Nosso gerador de atividades de adição oferece quatro modos diferentes de exercícios. O modo "Imagem + Imagem" mostra grupos de figuras para somar. O modo "Imagem + Número" combina figuras com números. O modo "Encontre o Segundo Termo" desafia alunos a descobrir quantos faltam. O modo "Misto" combina todos os estilos em uma única folha.

Você controla a dificuldade de cada atividade. Defina o mínimo e máximo de itens por grupo de 1 a 10. Crie até 10 exercícios por página. Adicione campos para nome e data. Inclua ou remova números de exercícios. Todas as opções ficam ao seu alcance.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades em 11 Idiomas',
        description: `O gerador suporta 11 idiomas diferentes. Português brasileiro, inglês, alemão, francês, espanhol, italiano, holandês, sueco, dinamarquês, norueguês e finlandês. Ideal para escolas bilíngues e professores de idiomas.

Os nomes das imagens aparecem no idioma escolhido. Isso permite criar atividades de matemática que também reforçam vocabulário. Professores de escolas internacionais aproveitam essa funcionalidade diariamente.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '📤',
        title: 'Upload de Imagens Próprias',
        description: `Carregue suas próprias imagens para personalizar ainda mais. O sistema aceita JPEG, PNG e GIF. Faça upload de múltiplos arquivos de uma vez. Combine imagens próprias com a biblioteca do sistema.

Use fotos dos próprios alunos para criar atividades especiais. Adicione imagens temáticas de datas comemorativas. Crie atividades de alfabetização personalizadas com letras e números. Integre com suas atividades de matemática para pacotes completos de aprendizado.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Licença Comercial POD Incluída',
        description: `Sua assinatura Pacote Essencial inclui licença comercial completa. Venda suas atividades no Teachers Pay Teachers. Comercialize no Etsy e Amazon KDP. Crie produtos impressos sem taxas extras de licenciamento.

Exportação em 300 DPI garante qualidade profissional para venda. Nenhuma atribuição necessária. Suas atividades 1º ano e 2º ano podem gerar renda extra. Professores empreendedores aproveitam essa funcionalidade para criar negócios lucrativos.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens',
        description: `Acesse mais de 3000 imagens infantis prontas para usar. Todas organizadas por temas como animais, alimentos, veículos, natureza. Busque imagens pelo nome em português. Selecione múltiplas figuras para seus exercícios.

A biblioteca inclui desenhos para colorir em estilo contorno. Perfeitos para atividades que combinam matemática com arte. Economize tempo buscando cliparts. Tudo incluído na sua assinatura sem custos adicionais. Suas atividades educação infantil ganham visual profissional instantaneamente.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI',
        description: `Todas as exportações usam resolução 300 DPI. Padrão profissional para impressão comercial. Escolha entre formato PDF ou JPEG. Selecione tamanho A4 ou Carta conforme sua impressora.

Orientação retrato ou paisagem disponível. Dimensões personalizadas para projetos especiais. Opção escala de cinza para economizar tinta. Suas atividades de matemática imprimem com nitidez perfeita em qualquer equipamento.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Como Criar Atividades de Matemática em 5 Passos',
    sectionDescription: 'Criar atividades de adição profissionais leva menos de 3 minutos. Este guia passo a passo mostra exatamente como usar o gerador. Siga cada etapa e tenha suas atividades para imprimir prontas rapidamente.',
    ctaText: 'Comece Agora',
    badgeText: 'Como Funciona',
    stepLabel: 'Passo',
    completionTitle: 'Pronto!',
    completionSubtitle: 'Sua atividade está pronta',
    readyTime: 'Pronta em menos de 3 minutos',
    noSkillsNeeded: 'Não precisa de habilidades técnicas',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Escolha o Conteúdo',
        description: `O primeiro passo é selecionar as imagens para seus exercícios de adição. Você tem duas opções principais. Escolha um tema completo como "Animais" ou "Frutas". Ou selecione imagens individuais da biblioteca.

A biblioteca organiza mais de 3000 imagens por categorias temáticas. Busque pelo nome em português usando a barra de pesquisa. Clique nas imagens desejadas para adicioná-las à seleção. O contador mostra quantas imagens você escolheu.

Para atividades educação infantil, recomendamos temas com objetos familiares. Animais domésticos funcionam muito bem. Frutas e alimentos também engajam crianças pequenas. Suas atividades de matemática ficam mais atrativas com imagens reconhecíveis.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure os Exercícios',
        description: `Agora defina as configurações específicas do exercício. O painel de configuração oferece controle total sobre a dificuldade. Ajuste cada opção conforme o nível da sua turma.

Escolha o modo de exercício entre quatro opções. "Imagem + Imagem" mostra dois grupos de figuras para somar. "Imagem + Número" combina figuras com algarismos. "Encontre o Segundo Termo" desafia alunos a descobrir o valor faltante. "Modo Misto" varia os estilos automaticamente.

Defina a quantidade de exercícios de 1 a 10 por página. Configure o mínimo e máximo de itens por grupo. Para atividades 1º ano, use 1 a 5 itens. Para atividades 2º ano mais desafiadoras, aumente para 5 a 10 itens.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere sua Atividade',
        description: `Com imagens selecionadas e configurações definidas, clique no botão "Criar". O sistema processa sua solicitação em segundos. Sua atividade de matemática aparece no canvas principal imediatamente.

O gerador distribui os exercícios automaticamente na página. Cada problema recebe espaço adequado para resolução. As imagens aparecem em tamanho apropriado para contagem. Espaços de resposta ficam posicionados corretamente.

Exercícios de adição visual desenvolvem coordenação motora naturalmente. Crianças apontam e contam cada figura. Escrevem números nos espaços designados. Traçam conexões mentais entre quantidade e símbolo.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite e Personalize',
        description: `Após gerar, você pode editar qualquer elemento da atividade. O canvas interativo permite personalização completa. Arraste imagens para novas posições. Redimensione elementos conforme necessário. Delete itens indesejados.

Adicione textos personalizados usando a ferramenta de texto. Digite instruções específicas para sua turma. Escolha entre fontes infantis como Fredoka e Baloo 2. Aplique cores e contornos para destaque visual.

Personalize com bordas temáticas da biblioteca. Adicione fundos coloridos ou padrões sutis. Ajuste a opacidade para não competir com o conteúdo principal. Cada detalhe fica sob seu controle.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe e Imprima',
        description: `O último passo é exportar sua atividade finalizada. Clique no botão "Download" para ver as opções disponíveis. Escolha o formato que melhor atende suas necessidades.

PDF oferece qualidade máxima para impressão profissional. JPEG funciona bem para compartilhamento digital. Ambos exportam em 300 DPI para nitidez perfeita. Selecione escala de cinza para economizar tinta colorida.

O sistema também gera gabarito automaticamente. Clique em "Gerar Gabarito" após criar a atividade. Baixe o gabarito separadamente ou junto com a atividade. Facilita a correção de exercícios em sala.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa Nosso Gerador de Atividades',
    sectionDescription: 'Nosso gerador de atividades de adição atende diversos perfis de educadores. Cada grupo encontra funcionalidades específicas para suas necessidades. Veja como diferentes usuários aproveitam a plataforma para criar atividades para imprimir profissionais.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades com Coordenação Motora e Desenhos para Colorir',
        description: `Professores de pré-escola e educação infantil formam nosso maior grupo de usuários. Eles precisam de atividades visuais que engajam crianças pequenas. Nosso gerador oferece exatamente isso.

Exercícios de adição com imagens coloridas capturam atenção infantil. Crianças contam figuras de animais e frutas com entusiasmo. A matemática se torna brincadeira educativa. Professores economizam horas de preparação toda semana.

Atividades educação infantil combinam múltiplas habilidades. Coordenação motora se desenvolve ao escrever respostas. Reconhecimento numérico se fortalece com prática visual. Desenhos para colorir adicionam elemento artístico aos exercícios.`,
        quote: 'Meus alunos adoram as atividades coloridas de matemática!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do 1º e 2º Ano',
        subtitle: 'Atividades de Matemática e Preparação para Tabuada',
        description: `Docentes de 1º ano, 2º ano e 3º ano usam nosso gerador diariamente. A transição da educação infantil para o ensino fundamental exige materiais adequados. Nosso sistema oferece níveis progressivos de dificuldade.

Configure exercícios simples para início do 1º ano. Aumente complexidade para atividades 2º ano mais desafiadoras. Prepare alunos para conceitos de tabuada com somas repetidas. Atividades de matemática acompanham o currículo escolar brasileiro.

O modo "Encontre o Segundo Termo" desafia pensamento algébrico inicial. Alunos descobrem valores faltantes em equações visuais. Prepara fundamentos para álgebra futura. Professores do ensino fundamental valorizam essa funcionalidade avançada.`,
        quote: 'A progressão de dificuldade acompanha o desenvolvimento dos alunos.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais que Fazem Educação Domiciliar',
        subtitle: 'Atividades de Alfabetização e Atividades Vogais',
        description: `Famílias que optam por educação domiciliar encontram recursos valiosos em nosso gerador. Pais criam materiais personalizados para cada filho. Adaptam dificuldade conforme progresso individual.

Combine atividades de adição com prática de alfabetização. Use imagens que reforçam reconhecimento de letras. Crie exercícios onde crianças identificam vogais nas palavras das figuras. Atividades de alfabetização ganham contexto matemático envolvente.

Adicione elementos de letra cursiva aos exercícios gerados. Pratique escrita de números em formato cursivo. Combine atividades vogais com contagem de imagens. Educação domiciliar fica mais rica com materiais interdisciplinares.`,
        quote: 'Uma ferramenta atende todos os níveis dos meus filhos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Idiomas',
        subtitle: 'Atividades para Imprimir em 11 Idiomas',
        description: `Educadores de línguas estrangeiras descobrem valor único em nosso gerador. O suporte a 11 idiomas permite criar materiais bilíngues. Alunos aprendem vocabulário enquanto praticam matemática.

Gere atividades em inglês para turmas de idiomas. Os nomes das imagens aparecem na língua selecionada. Crianças associam palavras estrangeiras com figuras familiares. Atividades de alfabetização em novo idioma ficam mais acessíveis.

Escolas bilíngues e internacionais aproveitam especialmente. Crie versões da mesma atividade em português e inglês. Compare vocabulário entre idiomas. Atividades para imprimir atendem programas de imersão linguística completos.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Coordenação Motora e Pontilhado Adaptados',
        description: `Educadores especializados encontram ferramentas de adaptação em nosso gerador. O canvas editável permite modificar qualquer elemento. Crie versões simplificadas ou ampliadas conforme necessidade.

Aumente o tamanho das imagens para alunos com dificuldades visuais. Use a caixa infantil com espaços maiores para respostas. Reduza quantidade de exercícios por página. Adapte cada atividade para necessidades individuais.

Exercícios visuais desenvolvem coordenação motora em ritmo adequado. Adicione linhas de pontilhado para suporte motor adicional. Crie materiais que respeitam diferentes velocidades de aprendizado. Atividades educação infantil adaptadas ficam prontas rapidamente.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Venda Atividades de Matemática no Hotmart',
        description: `Educadores que vendem materiais online formam grupo crescente de usuários. Nossa licença comercial POD permite monetização sem custos extras. Crie produtos para Teachers Pay Teachers, Etsy e Amazon KDP.

Desenvolva pacotes temáticos de atividades de matemática. Combine com desenhos para colorir para maior valor percebido. Crie coleções sazonais para datas comemorativas. Materiais de volta às aulas vendem especialmente bem.

Exportação em 300 DPI garante qualidade profissional para venda. Nenhuma marca d'água nas atividades geradas. Direitos comerciais completos inclusos na assinatura Pacote Essencial. Professores empreendedores constroem renda passiva com materiais educativos.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from addition.md
  faq: {
    sectionTitle: 'Perguntas Frequentes',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre o gerador de atividades de adição. Se sua pergunta não estiver aqui, entre em contato.',
    showMoreText: 'Mostrar mais perguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    secureCheckout: 'Pagamento seguro',
    cancelAnytime: 'Cancele quando quiser',
    items: [
      {
        id: '1',
        question: 'O gerador de atividades de matemática é gratuito para criar atividades?',
        answer: 'O gerador de atividades de adição requer assinatura Pacote Essencial. O custo é R$720 por ano ou R$72 por mês. Sua assinatura oferece criação ilimitada de atividades de matemática sem taxas adicionais por atividade. Gere quantas atividades para imprimir precisar sem custos extras. Não há limites de downloads mensais.',
      },
      {
        id: '2',
        question: 'Posso imprimir atividades de adição em impressora comum?',
        answer: 'Todas as atividades exportam em formatos compatíveis com qualquer impressora. PDF e JPEG funcionam em impressoras jato de tinta e laser. A qualidade 300 DPI garante nitidez mesmo em equipamentos básicos. Use a opção escala de cinza para economizar tinta colorida. Atividades de adição ficam nítidas em qualquer configuração.',
      },
      {
        id: '3',
        question: 'Preciso de habilidades de design para criar atividades?',
        answer: 'Nenhuma habilidade de design é necessária. O sistema gera layouts profissionais automaticamente. Você apenas seleciona imagens e configura dificuldade. Atividades educação infantil ficam prontas em cliques. Exercícios de coordenação motora surgem sem esforço artístico.',
      },
      {
        id: '4',
        question: 'Posso usar atividades de matemática na sala de aula?',
        answer: 'Sua assinatura Pacote Essencial inclui uso ilimitado em sala de aula. Imprima quantas cópias precisar para seus alunos. Distribua atividades de matemática diariamente sem restrições. Use em qualquer contexto educacional institucional. Escolas públicas e privadas permitidas.',
      },
      {
        id: '5',
        question: 'Quais idiomas estão disponíveis para as atividades?',
        answer: 'O gerador suporta 11 idiomas completos para conteúdo. Português brasileiro com vocabulário local adequado. Inglês, alemão, francês, espanhol e italiano disponíveis. Holandês, sueco, dinamarquês, norueguês e finlandês também. Crie atividades de alfabetização em qualquer idioma listado.',
      },
      {
        id: '6',
        question: 'Posso vender as atividades que criar?',
        answer: 'Sua assinatura Pacote Essencial inclui licença comercial POD completa. Venda atividades para imprimir no Teachers Pay Teachers livremente. Comercialize no Etsy sem taxas extras. Publique no Amazon KDP com direitos completos. Nenhuma atribuição necessária em produtos vendidos.',
      },
      {
        id: '7',
        question: 'Como personalizar atividades para diferentes níveis?',
        answer: 'O painel de configuração oferece controle total sobre dificuldade. Defina mínimo e máximo de itens por grupo. Use 1 a 3 itens para atividades 1º ano iniciais. Aumente para 5 a 10 itens em atividades 2º ano avançadas. Escolha entre quatro modos de exercício diferentes. Adapte cada atividade para o nível específico da sua turma.',
      },
      {
        id: '8',
        question: 'Quais faixas etárias funcionam com atividades de adição?',
        answer: 'Atividades de adição visual funcionam da pré-escola ao 3º ano. Crianças de 4 anos contam imagens com supervisão. Alunos de educação infantil desenvolvem conceitos numéricos básicos. Estudantes do ensino fundamental praticam operações formais. Configure poucos itens por grupo para os menores. Aumente complexidade gradualmente conforme desenvolvimento.',
      },
      {
        id: '9',
        question: 'Posso fazer upload de imagens próprias?',
        answer: 'O sistema aceita upload de imagens personalizadas. Carregue JPEG, PNG ou GIF do seu computador. Faça upload de múltiplos arquivos simultaneamente. Combine imagens próprias com a biblioteca do sistema. Use fotos de alunos para atividades personalizadas. Adicione imagens temáticas de projetos escolares.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar uma atividade?',
        answer: 'O processo completo leva menos de 3 minutos. Selecione imagens em 30 segundos. Configure exercícios em mais 30 segundos. Gere e baixe em 2 minutos. Atividades de matemática profissionais prontas rapidamente. Comparado a 30-60 minutos de criação manual, a economia é enorme.',
      },
      {
        id: '11',
        question: 'As atividades incluem gabarito?',
        answer: 'Cada atividade gerada pode ter gabarito correspondente. Clique em "Gerar Gabarito" após criar a atividade. O sistema preenche todas as respostas automaticamente. Baixe gabarito separadamente ou junto com a atividade. Facilita correção rápida em sala.',
      },
      {
        id: '12',
        question: 'As atividades de adição ajudam na coordenação motora?',
        answer: 'Nossos exercícios de adição desenvolvem múltiplas habilidades simultaneamente. Crianças contam imagens exercitando coordenação motora fina. Escrevem números nos espaços de resposta. O modo de caixa infantil oferece espaços grandes para escrita. Ideal para crianças em fase de desenvolvimento motor.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Pacote Essencial',
    price: 'R$720',
    priceInterval: '/ano',
    priceSuffix: 'Cobrado anualmente',
    benefits: [
      'Criação ilimitada de atividades',
      'Licença comercial incluída',
      '11 idiomas suportados',
      '3000+ imagens temáticas',
      'Qualidade de impressão 300 DPI',
      'Gabaritos incluídos',
    ],
    ctaText: 'Comece Agora',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando atividades de adição com estes geradores complementares.',
    ctaTitle: 'Pronto para Criar Atividades Incríveis?',
    ctaDescription: 'Junte-se a milhares de educadores que criam atividades profissionais. Geração ilimitada, licença comercial incluída.',
    primaryCtaText: 'Iniciar Teste Gratuito',
    secondaryCtaText: 'Ver Todos os 33 Geradores',
    badgeText: 'Funciona Perfeitamente Com',
    exploreText: 'Explorar todas as aplicações',
    trustBadges: {
      guarantee: 'Garantia de reembolso 30 dias',
      securePayment: 'Pagamento seguro',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [
      {
        id: '1',
        slug: 'subtraction',
        name: 'Subtração',
        category: 'Matemática',
        icon: '➖',
        description: 'Complete atividades de adição com subtração usando os mesmos temas de imagens para prática completa de operações básicas.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Fichas de Matemática',
        category: 'Matemática',
        icon: '🔢',
        description: 'Expanda além de adição com fichas de matemática completas incluindo todas as operações numéricas.',
      },
      {
        id: '3',
        slug: 'code-addition',
        name: 'Adição com Código',
        category: 'Matemática',
        icon: '🔐',
        description: 'Adicione um elemento de resolução de enigmas às atividades de adição com exercícios de adição codificada.',
      },
      {
        id: '4',
        slug: 'chart-count',
        name: 'Gráficos e Contagem',
        category: 'Matemática',
        icon: '📊',
        description: 'Combine adição com atividades de gráficos e contagem para análise de dados e conceitos de soma visual.',
      },
    ],
  },
};

export default additionPtContent;
