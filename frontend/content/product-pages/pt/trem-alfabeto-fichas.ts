import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Trenzinho do Alfabeto (Alphabet Train) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/trem-alfabeto-fichas.ts
 * URL: /pt/apps/trem-alfabeto-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing: Core Bundle (Pacote Essencial) - R$144/year or R$15/month
 */

export const alphabetTrainPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'trem-alfabeto-fichas',
    appId: 'alphabet-train',
    title: 'Gerador Trenzinho do Alfabeto - Atividades de Alfabetização para Imprimir com Educação Infantil',
    description: 'Crie atividades de alfabetização profissionais com nosso gerador de trenzinho do alfabeto. Sua assinatura Pacote Essencial oferece criação ilimitada de atividades para imprimir sem taxas extras. Produza atividades vogais e alfabeto personalizadas em menos de 3 minutos.',
    keywords: 'atividades de alfabetização, atividades para imprimir, atividades educação infantil, atividades vogais, alfabeto, coordenação motora, desenhos para colorir, letra cursiva, pontilhado, 1º ano, 2º ano, trenzinho do alfabeto',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/trem-alfabeto-fichas',
  },

  // Hero Section - FULL text from alphabet-train.md
  hero: {
    title: 'Gerador Trenzinho do Alfabeto',
    subtitle: 'Atividades de Alfabetização para Imprimir com Educação Infantil',
    description: `Crie atividades de alfabetização profissionais com nosso gerador de trenzinho do alfabeto. Com sua assinatura Pacote Essencial, você gera atividades para imprimir ilimitadas sem taxas extras. Produza atividades vogais e alfabeto personalizadas em menos de 3 minutos. Baixe PDFs de alta qualidade prontos para a sala de aula.

O trenzinho do alfabeto transforma o aprendizado das letras em diversão. Cada vagão carrega uma letra diferente. As crianças adoram esse formato lúdico. Ideal para atividades educação infantil e atividades 1º ano.

O gerador de trenzinho do alfabeto cria fichas educativas de forma rápida. Selecione 11 letras para formar seu trem. Associe cada letra a uma imagem correspondente. O sistema oferece mais de 3000 imagens para escolher.`,
    previewImageSrc: '/samples/english/alphabet train/alphabet train portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
  samples: {
    sectionTitle: 'Exemplos de Atividades do Trenzinho do Alfabeto',
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
        worksheetSrc: '/samples/english/alphabet train/alphabet train portrait.jpeg',
        answerKeySrc: '/samples/english/alphabet train/alphabet train portrait answer_key.jpeg',
        altText: 'Atividade trenzinho do alfabeto formato retrato para educação infantil',
        pdfDownloadUrl: '/samples/english/alphabet train/alphabet train portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/alphabet train/alphabet train landscape.jpeg',
        answerKeySrc: '/samples/english/alphabet train/alphabet train landscape answer_key.jpeg',
        altText: 'Atividade trenzinho do alfabeto formato paisagem para 1º ano',
        pdfDownloadUrl: '/samples/english/alphabet train/alphabet train landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from alphabet-train.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Trenzinho do Alfabeto',
    sectionDescription: 'O gerador de trenzinho do alfabeto oferece recursos completos para educadores. Crie atividades educação infantil personalizadas em minutos. Cada ferramenta foi pensada para facilitar seu trabalho. Descubra como transformar suas aulas com atividades vogais e alfabeto profissionais.',
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
        title: 'Crie Atividades de Alfabetização em 3 Cliques',
        description: `Crie atividades de alfabetização profissionais com apenas 3 cliques simples. Selecione um tema de imagens da biblioteca. Escolha suas 11 letras favoritas. Clique em gerar e pronto.

O modo automático seleciona letras e imagens aleatoriamente. Ideal para quem precisa de atividades para imprimir rápidas. O modo manual permite controle total sobre cada elemento. Perfeito para atividades educação infantil personalizadas.

Cada elemento no canvas é totalmente editável. Arraste, gire e redimensione qualquer imagem. Delete elementos que não deseja usar. Adicione textos personalizados com suas instruções.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Personalização Ilimitada para Educação Infantil',
        description: `Personalize cada detalhe das suas atividades educação infantil. Escolha entre temas de fundo variados. Adicione bordas decorativas temáticas. Ajuste a opacidade de cada elemento visual.

Configure atividades vogais e alfabeto do seu jeito. Selecione de 3 a 11 pistas por ficha. Inclua campos de nome e data para os alunos. Altere cores, fontes e tamanhos de texto.

O gerador oferece 7 fontes diferentes para títulos. Adicione contorno aos textos para destaque. Combine coordenação motora com reconhecimento de letras. Crie materiais únicos para cada aula.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload de Imagens Próprias',
        description: `Faça upload das suas próprias imagens para atividades para imprimir personalizadas. Aceita formatos JPEG, PNG e GIF. Carregue múltiplos arquivos de uma vez. Combine suas fotos com a biblioteca de imagens.

Use fotos dos alunos para atividades de alfabetização especiais. Inclua mascotes da escola no trenzinho. Adicione imagens de projetos temáticos. Crie conexões significativas com o conteúdo.

Perfeito para atividades 1º ano personalizadas por turma. Ideal para projetos de identidade na educação infantil. As crianças se engajam mais com imagens familiares. Transforme qualquer foto em material pedagógico.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades de Alfabetização em 11 Idiomas',
        description: `Gere atividades de alfabetização em 11 idiomas diferentes. Português brasileiro com vocabulário nativo. Inglês, alemão, francês e espanhol disponíveis. Italiano, holandês e idiomas nórdicos incluídos.

As imagens possuem nomes em cada idioma. Perfeito para atividades educação infantil bilíngues. Ideal para escolas internacionais no Brasil. Ótimo para ensino de línguas estrangeiras.

Crie atividades vogais e alfabeto em português. Depois gere a mesma ficha em inglês. Compare alfabetos de diferentes culturas. Explore letras especiais como Ç, Ñ, Ä e Ø.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licença Comercial POD Incluída',
        description: `A assinatura Pacote Essencial inclui licença comercial completa. Venda suas atividades para imprimir na internet. Publique no Teachers Pay Teachers sem taxas extras. Liste produtos na Hotmart ou Eduzz.

Crie atividades de alfabetização para vender. Monte apostilas completas de atividades educação infantil. Desenvolva pacotes de atividades 1º ano e 2º ano. Monetize seu conhecimento pedagógico.

Exportação em 300 DPI qualidade profissional. Arquivos prontos para impressão comercial. Sem marca d'água nas fichas geradas. Perfeito para empreendedores da educação.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens',
        description: `Acesse mais de 3000 imagens infantis de alta qualidade. Todas organizadas por temas práticos. Animais, alimentos, brinquedos e natureza disponíveis. Busque por nome ou navegue por categoria.

Cada imagem funciona para atividades vogais e alfabeto. Associe A com Abacaxi ou Avião. Conecte B com Bola ou Borboleta. Encontre opções para todas as letras.

Inclui fundos decorativos para suas atividades para imprimir. Bordas temáticas para cada estação do ano. Elementos visuais para datas comemorativas. Tudo incluído na assinatura sem custos extras.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI',
        description: `Exporte atividades educação infantil em qualidade profissional. Resolução de 300 DPI para impressão perfeita. Formatos PDF e JPEG disponíveis. Opção de escala de cinza para economizar tinta.

Gere a ficha de atividades de alfabetização principal. Crie também o gabarito com respostas. Baixe ambos separadamente ou juntos. Imprima em casa ou na gráfica.

Ideal para atividades para imprimir em quantidade. Perfeito para distribuir em reuniões de pais. Ótimo para portfólios de atividades 1º ano. Qualidade que impressiona coordenadores e diretores.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔧',
        title: 'Canvas Interativo para Edição',
        description: `Use o canvas interativo para ajustes finais. Organize camadas de elementos visuais. Alinhe objetos com precisão automática. Bloqueie elementos que não devem ser movidos.

Combine coordenação motora com atividades do alfabeto. Adicione espaços para desenhos para colorir. Inclua áreas de pontilhado e letra cursiva. Crie fichas multidisciplinares completas.

Recursos de desfazer e refazer para segurança. Zoom para trabalhar em detalhes pequenos. Controles intuitivos para todos os níveis. Interface em português brasileiro nativo.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from alphabet-train.md step sections
  howTo: {
    sectionTitle: 'Como Criar Atividades de Alfabetização em 5 Passos',
    sectionDescription: 'Aprenda a criar atividades de alfabetização profissionais em menos de 3 minutos. Este guia passo a passo mostra cada etapa do processo. Perfeito para professores de atividades educação infantil iniciantes. Ideal também para veteranos que buscam agilidade.',
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
        title: 'Escolha Suas Letras para Atividades Vogais e Alfabeto',
        description: `Comece selecionando as letras para suas atividades vogais e alfabeto. O trenzinho comporta exatamente 11 vagões. Cada vagão carrega uma letra diferente. Clique nas letras desejadas na grade do alfabeto.

Para atividades educação infantil focadas em vogais, selecione A, E, I, O, U. Complete com consoantes simples como B, C, D, M, P. Ideal para turmas de pré-escola iniciando a alfabetização.

O modo automático facilita para atividades 1º ano rápidas. Clique em "Criar Automático" e o sistema escolhe. Seleciona 11 letras aleatórias instantaneamente. Associa imagens automaticamente a cada letra.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure as Opções de Atividades para Imprimir',
        description: `Ajuste as configurações para suas atividades para imprimir específicas. Selecione o tamanho do papel desejado. Carta e A4 são os mais comuns no Brasil. Formato quadrado funciona para projetos especiais.

Defina quantas pistas terão suas atividades de alfabetização. Escolha entre 3 e 11 pistas por ficha. Menos pistas para atividades educação infantil iniciantes. Mais pistas para atividades 1º ano avançadas.

Ative o campo de nome e data quando necessário. Útil para portfólios individuais dos alunos. Essencial para acompanhamento de coordenação motora. Facilita a organização das atividades para imprimir.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere suas Atividades Educação Infantil',
        description: `Clique em "Criar Ficha" para gerar suas atividades educação infantil. O trenzinho aparece instantaneamente na tela. Cada vagão mostra uma letra do alfabeto. Imagens correspondentes ilustram cada letra.

Adicione desenhos para colorir ao seu material. O trenzinho pode incluir versões em contorno. Perfeito para combinar alfabetização com coordenação motora. As crianças praticam letras enquanto pintam.

O gabarito com respostas é gerado separadamente. Clique em "Criar Gabarito" após a ficha principal. Mostra as associações corretas letra-imagem. Facilita a correção de atividades de alfabetização.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite no Canvas para Personalização Completa',
        description: `Use o canvas para personalizar suas atividades 1º ano e 2º ano. Arraste elementos para reposicionar. Redimensione imagens conforme necessário. Gire objetos para layouts criativos.

Adicione textos personalizados às atividades para imprimir. Inclua instruções específicas para sua turma. Escreva o nome da escola no cabeçalho. Adicione dicas de coordenação motora nas margens.

Combine com pontilhado e letra cursiva para treino. Adicione linhas tracejadas para escrita. Inclua espaços para prática de caligrafia. Crie fichas multifuncionais completas.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe Atividades de Alfabetização em PDF',
        description: `Exporte suas atividades de alfabetização em formato profissional. Escolha entre PDF e JPEG de alta resolução. PDF é ideal para impressão em gráficas. JPEG funciona bem para compartilhamento digital.

Baixe atividades para imprimir em 300 DPI. Qualidade perfeita para cópias nítidas. Textos legíveis mesmo em tamanhos pequenos. Imagens claras sem pixelização.

Ative a opção de escala de cinza quando necessário. Economiza tinta colorida na impressora. Perfeito para atividades educação infantil em quantidade. Ideal para distribuição em toda a escola.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Trenzinho do Alfabeto',
    sectionDescription: 'O gerador de trenzinho do alfabeto atende diversos perfis de educadores. Professores de atividades educação infantil encontram recursos ideais. Pais que educam em casa ganham materiais profissionais. Descubra como cada grupo usa atividades para imprimir do trenzinho.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades com Coordenação Motora e Alfabeto',
        description: `Professores de atividades educação infantil usam o trenzinho diariamente. O formato lúdico encanta crianças de 4 a 6 anos. Cada vagão representa uma descoberta nova. As letras ganham vida através das imagens.

Combine coordenação motora com reconhecimento de letras. Peça para recortarem os vagões do trem. Solicite colagem em ordem alfabética no caderno. Desenvolva habilidades motoras finas brincando.

O trenzinho funciona para atividades vogais e alfabeto progressivas. Comece apenas com as cinco vogais. Adicione consoantes gradualmente nas semanas seguintes. Respeite o ritmo de cada turma.`,
        quote: 'Meus alunos adoram as atividades coloridas do trenzinho!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do 1º e 2º Ano',
        subtitle: 'Atividades com Letra Cursiva e Pontilhado',
        description: `Professores de atividades 1º ano e 2º ano aproveitam recursos avançados. O trenzinho complementa o processo de alfabetização formal. Conecta letras de forma com palavras do cotidiano. Reforça aprendizados da sala de aula.

Integre letra cursiva e pontilhado nas fichas do trenzinho. Adicione linhas para escrita abaixo de cada vagão. Peça para escreverem o nome da imagem. Pratique caligrafia de forma contextualizada.

Crie atividades de alfabetização diferenciadas por nível. Alunos avançados escrevem frases completas. Alunos em desenvolvimento copiam palavras. Todos participam com o mesmo material base.`,
        quote: 'A progressão de dificuldade acompanha o desenvolvimento dos alunos.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais Educadores Domiciliares',
        subtitle: 'Atividades para Imprimir com Desenhos para Colorir',
        description: `Pais que praticam educação domiciliar adoram atividades para imprimir prontas. O trenzinho oferece estrutura pedagógica profissional. Não precisa criar materiais do zero. Economiza horas de preparação semanal.

Inclua desenhos para colorir para momentos de relaxamento. O trenzinho em versão contorno vira atividade artística. Combine alfabetização com expressão criativa. Mantenha as crianças engajadas por mais tempo.

Use atividades educação infantil para irmãos de idades diferentes. Adapte a complexidade para cada filho. O mais velho escreve palavras completas. O mais novo apenas identifica letras.`,
        quote: 'Uma ferramenta atende todos os níveis dos meus filhos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Idiomas',
        subtitle: 'Atividades Vogais e Alfabeto Bilíngues',
        description: `Professores de inglês e outros idiomas exploram os 11 idiomas disponíveis. Crie atividades vogais e alfabeto em português e inglês. Compare letras e sons entre línguas. Desenvolva consciência fonológica bilíngue.

O trenzinho funciona para escolas internacionais no Brasil. Gere a mesma ficha em dois idiomas diferentes. Alunos associam imagens com palavras em ambas línguas. Aprendizado contextualizado e visual.

Explore alfabetos com letras especiais. Mostre o Ñ espanhol e o Ç português. Compare Ä alemão com A português. Transforme atividades de alfabetização em aulas de cultura.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Atividades de Alfabetização com Coordenação Motora Adaptadas',
        description: `Professores de educação especial personalizam cada detalhe. O gerador permite ajustes para necessidades específicas. Aumente o tamanho das letras quando necessário. Simplifique com menos elementos visuais.

Trabalhe coordenação motora em ritmo individualizado. O trenzinho oferece repetição sem monotonia. Cada ficha pode focar em uma única letra. Reforce através de múltiplas exposições visuais.

Combine com pontilhado e letra cursiva para treino motor. Linhas tracejadas ajudam no controle do lápis. Espaços amplos facilitam a escrita. Adapte para diferentes níveis de habilidade.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Atividades para Imprimir para Vender com Licença Comercial',
        description: `Professores empreendedores monetizam seu conhecimento pedagógico. A licença comercial Pacote Essencial permite vendas online. Crie atividades para imprimir exclusivas para sua loja. Venda no Teachers Pay Teachers ou Hotmart.

Desenvolva pacotes temáticos de atividades de alfabetização. Apostilas completas do alfabeto de A a Z. Coleções sazonais para datas comemorativas. Kits de atividades educação infantil prontos para uso.

Monte combos com atividades 1º ano e 2º ano incluídas. Ofereça materiais para diferentes faixas etárias. Atenda mais clientes com variedade. Construa renda passiva com produtos digitais.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - FULL text from alphabet-train.md FAQ sections
  faq: {
    sectionTitle: 'Perguntas Frequentes sobre o Trenzinho do Alfabeto',
    sectionDescription: 'Respondemos as dúvidas mais comuns sobre o gerador de trenzinho do alfabeto. Descubra tudo sobre atividades para imprimir, preços e recursos. Tire suas dúvidas antes de começar a criar atividades educação infantil profissionais.',
    showMoreText: 'Mostrar mais perguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'Perguntas Frequentes',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    secureCheckout: 'Pagamento seguro',
    cancelAnytime: 'Cancele quando quiser',
    items: [
      {
        id: '1',
        question: 'O gerador de atividades de alfabetização é gratuito para usar?',
        answer: 'O gerador de trenzinho do alfabeto requer assinatura Pacote Essencial. O custo é R$144 por ano ou R$15 por mês. Sua assinatura permite criação ilimitada de atividades de alfabetização. Não há taxas extras por ficha gerada. O Pacote Essencial inclui 10 geradores populares de atividades para imprimir. O Acesso Completo custa R$240 por ano e inclui todos os 33 geradores. Ambas as assinaturas incluem licença comercial e suporte a 11 idiomas. Exportação em 300 DPI qualidade profissional está incluída.',
      },
      {
        id: '2',
        question: 'Posso imprimir atividades educação infantil em casa na impressora comum?',
        answer: 'Sim. Atividades educação infantil do trenzinho imprimem perfeitamente em impressoras domésticas. O formato PDF funciona em qualquer impressora. A resolução de 300 DPI garante qualidade mesmo em equipamentos simples. Use papel sulfite comum para uso diário. Escolha papel mais grosso para atividades especiais. A opção de escala de cinza economiza tinta colorida. Imprima quantas cópias precisar para sua turma.',
      },
      {
        id: '3',
        question: 'Preciso de habilidades de design para criar atividades vogais e alfabeto?',
        answer: 'Não precisa de nenhuma habilidade de design. Atividades vogais e alfabeto são geradas automaticamente. O sistema faz todo o trabalho visual. Você apenas escolhe letras e imagens. O modo automático é perfeito para iniciantes. Clique em gerar e receba fichas prontas. O modo manual oferece mais controle. Arraste e solte elementos como quiser no canvas.',
      },
      {
        id: '4',
        question: 'Posso usar atividades para imprimir do trenzinho na sala de aula?',
        answer: 'A assinatura Pacote Essencial inclui uso ilimitado em sala de aula. Imprima atividades para imprimir para todos os alunos. Distribua para quantas turmas precisar. Não há limite de cópias ou distribuição educacional. Use em escolas públicas ou particulares livremente. Compartilhe com colegas professoras da mesma escola. Inclua em portfólios e reuniões de pais. Todo uso educacional está coberto pela assinatura.',
      },
      {
        id: '5',
        question: 'Em quais idiomas estão disponíveis as atividades de alfabetização?',
        answer: 'Atividades de alfabetização estão disponíveis em 11 idiomas completos. Português brasileiro com vocabulário nativo. Inglês, alemão, francês, espanhol e italiano incluídos. Holandês, sueco, dinamarquês, norueguês e finlandês também. Cada idioma usa nomes de imagens na língua correta. Alfabetos especiais funcionam perfeitamente. Ideal para escolas bilíngues e internacionais. Perfeito para professores de línguas estrangeiras.',
      },
      {
        id: '6',
        question: 'Posso vender atividades 1º ano e 2º ano criadas com o gerador?',
        answer: 'Sim. A assinatura Pacote Essencial inclui licença comercial completa. Venda atividades 1º ano e 2º ano sem taxas extras. Publique no Teachers Pay Teachers, Hotmart ou Eduzz. Liste na Amazon KDP para livros de atividades. Crie apostilas completas para comercialização. Monte pacotes temáticos para datas comemorativas. Desenvolva coleções por série escolar. Construa renda passiva com produtos digitais educacionais.',
      },
      {
        id: '7',
        question: 'Como personalizo atividades educação infantil com coordenação motora?',
        answer: 'Personalize atividades educação infantil no canvas interativo. Adicione exercícios de coordenação motora manualmente. Inclua linhas tracejadas para treino motor. Combine alfabetização com desenvolvimento de habilidades. Use as ferramentas de texto para instruções personalizadas. Adicione seu nome ou logo da escola. Inclua campos de nome e data para alunos. Ajuste cores, fontes e tamanhos livremente.',
      },
      {
        id: '8',
        question: 'Qual faixa etária funciona melhor com atividades vogais e alfabeto do trenzinho?',
        answer: 'Atividades vogais e alfabeto do trenzinho funcionam para 4 a 8 anos. Crianças de 4-5 anos na educação infantil adoram o formato. Alunos de 6-7 anos no 1º ano reforçam aprendizados. Estudantes de 7-8 anos no 2º ano praticam revisão. Adapte a complexidade para cada idade. Menos letras e pistas para os menores. Mais desafios e escrita para os maiores. O mesmo gerador atende múltiplas faixas etárias.',
      },
      {
        id: '9',
        question: 'Posso fazer upload de imagens próprias para atividades com desenhos para colorir?',
        answer: 'Sim. Faça upload de imagens próprias para atividades com desenhos para colorir personalizados. Aceita formatos JPEG, PNG e GIF. Carregue múltiplos arquivos de uma vez. Combine com imagens da biblioteca. Use fotos dos alunos para engajamento especial. Inclua mascotes e símbolos da escola. Adicione imagens de projetos temáticos. Personalize completamente suas atividades para imprimir.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar atividades de alfabetização completas?',
        answer: 'Criar atividades de alfabetização completas leva menos de 3 minutos. O modo automático gera fichas em segundos. O modo manual permite personalização detalhada. Mesmo com edições, raramente passa de 5 minutos. Compare com 30-60 minutos do método tradicional. Economize até 90% do tempo de preparação. Use o tempo extra para planejar outras atividades. Foque em ensinar, não em criar materiais.',
      },
      {
        id: '11',
        question: 'Atividades do trenzinho incluem gabarito com letra cursiva e pontilhado?',
        answer: 'O trenzinho gera gabarito separado com respostas. Mostra associações corretas entre letras e imagens. Você pode adicionar letra cursiva e pontilhado manualmente no canvas. Combine exercícios de escrita com o gabarito. Baixe ficha e gabarito em arquivos separados. Distribua apenas a ficha para alunos. Guarde o gabarito para correção. Imprima ambos quando precisar de materiais completos.',
      },
      {
        id: '12',
        question: 'Posso criar atividades de matemática e tabuada com o trenzinho do alfabeto?',
        answer: 'O trenzinho do alfabeto foca em atividades de alfabetização especificamente. Para atividades de matemática e tabuada, use outros geradores da plataforma. O Pacote Essencial inclui geradores de matemática dedicados. Combine diferentes apps para pacotes completos. Use o gerador de Fichas de Matemática para operações. Explore o app de Adição para somas básicas. O trenzinho complementa atividades de matemática tematicamente. Crie conexões entre letras e números nos pacotes.',
      },
    ],
  },

  // Pricing - Core Bundle for Alphabet Train
  pricing: {
    title: 'Pacote Essencial',
    price: 'R$144',
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
    guaranteeText: 'Garantia de reembolso de 30 dias',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando o trenzinho do alfabeto com estes geradores complementares.',
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
        slug: 'coloring',
        name: 'Desenhos para Colorir',
        category: 'Criativo',
        icon: '🎨',
        description: 'Combine atividades de alfabetização com desenhos para colorir temáticos para desenvolvimento de coordenação motora completo.',
      },
      {
        id: '2',
        slug: 'matching',
        name: 'Atividades de Correspondência',
        category: 'Visual',
        icon: '🔗',
        description: 'Expanda o reconhecimento de letras com atividades de correspondência que conectam letras a imagens e palavras.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Encontre e Conte',
        category: 'Matemática',
        icon: '🔢',
        description: 'Adicione conceitos matemáticos às atividades de alfabetização com exercícios de contagem visual.',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Desenho de Linhas',
        category: 'Motor',
        icon: '✏️',
        description: 'Desenvolva coordenação motora fina com atividades de desenho de linhas que complementam o trenzinho do alfabeto.',
      },
    ],
  },
};

export default alphabetTrainPtContent;
