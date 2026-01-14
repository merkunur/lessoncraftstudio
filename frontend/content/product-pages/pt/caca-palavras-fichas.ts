import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Caça-Palavras (Word Search) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/caca-palavras-fichas.ts
 * URL: /pt/apps/caca-palavras-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'caca-palavras-fichas',
    appId: 'word-search',
    title: 'Gerador de Caça-Palavras Grátis | Atividades para Imprimir e Atividades de Alfabetização',
    description: 'Crie caça-palavras personalizados em poucos cliques. Baixe atividades para imprimir em PDF para educação infantil e ensino fundamental. Atividades de alfabetização com gabarito. Coordenação motora e desenvolvimento cognitivo.',
    keywords: 'caça-palavras, atividades para imprimir, atividades de alfabetização, educação infantil, ensino fundamental, 1º ano, 2º ano, coordenação motora, vogais, alfabeto, tabuada, letra cursiva, pontilhado, desenhos para colorir',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/caca-palavras-fichas',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Gerador de Caça-Palavras Grátis',
    subtitle: 'Atividades para Imprimir e Atividades de Alfabetização para Educação Infantil',
    description: `Crie caça-palavras personalizados em poucos cliques. O gerador de caça-palavras da LessonCraft Studio oferece uma versão gratuita com marca d'água. Para uso comercial e recursos completos, a assinatura Pacote Essencial custa R$720 por ano. Baixe fichas pedagógicas prontas em PDF. Economize horas de preparação de aulas.

O caça-palavras é uma das atividades mais queridas nas escolas brasileiras. Professores de educação infantil e ensino fundamental usam diariamente. Crianças adoram encontrar palavras escondidas na grade. Essa atividade desenvolve vocabulário e concentração.

Nosso gerador cria atividades para imprimir em segundos. Escolha entre mais de 3000 imagens da biblioteca. Selecione temas como animais, frutas ou profissões. O sistema gera automaticamente a grade de letras. Tudo pronto para baixar em PDF de alta qualidade.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Exemplos de Caça-Palavras',
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
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Caça-palavras formato retrato com imagens temáticas para educação infantil',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Caça-palavras formato paisagem com imagens coloridas para ensino fundamental',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Caça-palavras com lista de palavras personalizada para atividades de alfabetização',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Tudo o Que Você Precisa para Atividades de Alfabetização',
    sectionDescription: 'O gerador de caça-palavras da LessonCraft Studio oferece recursos profissionais. Cada funcionalidade foi pensada para professores brasileiros. Crie atividades para imprimir em minutos. Personalize cada detalhe da sua ficha pedagógica.',
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
        description: `A simplicidade é a marca do nosso gerador. Primeiro, escolha um tema da biblioteca. Segundo, defina o tamanho da grade. Terceiro, clique em gerar. Seu caça-palavras está pronto para baixar.

Não precisa de habilidades técnicas. Não precisa instalar nenhum programa. Tudo funciona direto no navegador. Professores de educação infantil adoram essa praticidade. Pais que fazem homeschool também aprovam.

O sistema oferece temas prontos para usar. Animais da fazenda, frutas tropicais, meios de transporte. Cada tema contém imagens coloridas e educativas. As palavras são geradas automaticamente em português.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edite Tudo no Canvas',
        description: `Após gerar o caça-palavras, você pode editar tudo. Arraste qualquer elemento para nova posição. Redimensione imagens com o mouse. Gire objetos no ângulo desejado. Delete elementos que não quer usar.

A edição completa diferencia nosso gerador. Adicione textos personalizados para sua turma. Mude cores e fontes como preferir. Crie atividades de alfabetização únicas. Alunos do 1º ano merecem materiais especiais.

O canvas funciona como um editor profissional. Camadas permitem organizar elementos. Alinhe objetos automaticamente. Centralize textos com um clique. Bloqueie elementos para não mover acidentalmente.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🌍',
        title: 'Caça-Palavras em 11 Idiomas',
        description: `O gerador suporta 11 idiomas diferentes. Português, inglês, espanhol, francês e alemão. Também italiano, holandês, sueco e dinamarquês. Norueguês e finlandês completam a lista.

Professores de escolas bilíngues aproveitam muito. Crie atividades de alfabetização em português. Na mesma aula, gere versão em inglês. Alunos praticam vocabulário nos dois idiomas. A biblioteca de imagens funciona em todos.

O sistema usa nomes de imagens no idioma selecionado. "Maçã" em português vira "Apple" em inglês. As palavras do caça-palavras mudam automaticamente. Perfeito para atividades de vocabulário bilíngue.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Envie Suas Próprias Imagens',
        description: `Um recurso adorado pelos professores. Você pode enviar suas próprias imagens. Use fotos dos alunos da turma. Inclua mascotes da escola. Adicione imagens temáticas especiais.

O upload aceita múltiplos arquivos. Formatos JPEG, PNG e GIF funcionam. As imagens enviadas aparecem na sessão. Combine com imagens da biblioteca. Crie atividades educação infantil personalizadas.

Imagine um caça-palavras com fotos das crianças. Cada aluno procura seu próprio nome. A turma fica animada com a atividade. Esse tipo de personalização engaja muito mais.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licença Comercial POD Incluída',
        description: `Com a assinatura Pacote Essencial ou Acesso Completo, você ganha licença comercial. Venda suas criações em plataformas digitais. Hotmart, Teachers Pay Teachers e Etsy são opções. Amazon KDP para livros de atividades também.

Muitos professores brasileiros já faturam assim. Criam pacotes de atividades para imprimir. Vendem para outros educadores do país. A renda extra complementa o salário. Alguns transformaram em negócio principal.

A qualidade 300 DPI garante impressões profissionais. Clientes ficam satisfeitos com a nitidez. Avaliações positivas trazem mais vendas. Seu portfólio cresce com novas criações.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca com Mais de 3000 Imagens',
        description: `Nossa biblioteca contém mais de 3000 imagens. Todas organizadas por temas educativos. Animais, alimentos, profissões e natureza. Objetos do cotidiano e veículos também.

As imagens servem para múltiplos propósitos. Use no caça-palavras com vocabulário. Combine com desenhos para colorir depois. Crie atividades vogais com figuras que começam com A, E, I, O, U. A versatilidade é enorme.

Cada tema contém imagens cuidadosamente selecionadas. Estilo visual consistente e profissional. Cores vibrantes que crianças adoram. Contornos claros para identificação fácil.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI',
        description: `O download oferece qualidade profissional de 300 DPI. Perfeito para impressão em qualquer impressora. Funciona bem em papel sulfite comum. Fica ainda melhor em papel especial.

Dois formatos disponíveis para download. PDF para impressão direta. JPEG para edição adicional se necessário. Ambos mantêm a qualidade original.

A opção escala de cinza economiza tinta. Ideal para impressão em grande quantidade. Escolas com orçamento limitado aproveitam muito. A qualidade permanece excelente mesmo em preto e branco.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Crie Caça-Palavras em 5 Passos Simples',
    sectionDescription: 'Criar um caça-palavras profissional leva menos de 3 minutos. O processo é simples e intuitivo. Qualquer professor consegue usar sem treinamento. Siga os 5 passos abaixo e baixe sua atividade.',
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
        description: `O primeiro passo é selecionar o conteúdo do caça-palavras. Você tem três opções principais. Cada uma serve para diferentes objetivos pedagógicos.

A primeira opção é usar um tema pronto. Clique no menu "Tema para o Caça-Palavras". Escolha entre dezenas de categorias disponíveis. Animais, frutas, cores, números e muito mais. O sistema seleciona automaticamente 8 imagens do tema.

A segunda opção é selecionar imagens individuais. Use o filtro por tema para navegar. Digite palavras-chave na busca. Clique nas imagens que deseja incluir. Você pode escolher até 8 imagens por caça-palavras.

A terceira opção é usar a lista de palavras personalizadas. Marque a opção "Usar lista de palavras personalizadas". Digite suas próprias palavras, uma por linha. Ideal para atividades de alfabetização específicas.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure as Opções',
        description: `O segundo passo é ajustar as configurações do caça-palavras. As opções permitem criar atividades para diferentes níveis.

Primeiro, defina o tamanho da grade. Use os campos "Linhas" e "Colunas". Grades menores como 8x8 são ideais para educação infantil. Grades maiores como 15x15 desafiam alunos do 2º ano. O padrão 12x12 funciona bem para a maioria.

Segundo, configure as opções de palavras. Marque "Permitir palavras diagonais" para mais desafio. Marque "Permitir palavras invertidas" para dificultar. Desmarque ambas para atividades de alfabetização iniciais.

Terceiro, escolha o que mostrar na lista de palavras. A opção "Mostrar lista de palavras" exibe as palavras a encontrar. A opção "Mostrar apenas imagens" exibe só as figuras. Combine conforme seu objetivo pedagógico.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere o Caça-Palavras',
        description: `O terceiro passo é clicar no botão "Gerar". O sistema processa tudo instantaneamente. Em segundos, seu caça-palavras aparece na tela.

Clique no botão azul "Gerar" no topo da página. Selecione "Nova Folha de Atividade" no menu. O gerador cria a grade de letras automaticamente. As palavras são posicionadas aleatoriamente. Letras de preenchimento completam os espaços.

A visualização mostra exatamente como ficará impresso. Veja a grade de letras centralizada. Observe a lista de palavras ou imagens embaixo. Confira se tudo está como deseja.

Se não gostar do resultado, gere novamente. Cada geração cria uma disposição diferente. As palavras mudam de posição a cada vez. Você pode gerar quantas vezes quiser.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite no Canvas',
        description: `O quarto passo é personalizar o caça-palavras gerado. O canvas permite editar qualquer elemento. Transforme uma atividade genérica em algo único.

Clique em qualquer elemento para selecioná-lo. Uma caixa azul aparece ao redor. Use as alças para redimensionar. Arraste para reposicionar na página.

Adicione textos personalizados para sua turma. Clique na aba "Ferramentas de Texto". Digite seu texto no campo. Clique em "Adicionar Texto". Arraste o texto para a posição desejada.

Personalize a aparência do texto. Mude a cor clicando no seletor de cores. Ajuste o tamanho com o controle deslizante. Escolha entre 7 fontes diferentes. Adicione bordas decorativas para embelezar.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe e Imprima',
        description: `O quinto e último passo é baixar sua criação. O gerador oferece múltiplas opções de download.

Clique no botão "Download" no topo da página. O menu de opções aparece. Escolha o formato desejado para sua atividade.

Selecione "Folha de Atividade (PDF)" para impressão direta. O arquivo PDF abre em qualquer leitor. Imprima direto sem precisar de outros programas. A qualidade permanece perfeita.

Não esqueça de baixar o gabarito. Clique em "Gabarito (PDF)" ou "Gabarito (JPEG)". O gabarito mostra as palavras destacadas na grade. Use para correção rápida das atividades.

Marque a opção "Escala de Cinza" para economizar tinta. As imagens ficam em preto e branco. Ideal para impressão em grande quantidade.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Caça-Palavras',
    sectionDescription: 'O gerador de caça-palavras atende diversos públicos. Professores, pais e empreendedores usam diariamente. Cada grupo encontra benefícios específicos. Descubra como a ferramenta pode ajudar você.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades Educação Infantil com Coordenação Motora',
        description: `Professores de educação infantil são nossos usuários mais frequentes. Trabalham com crianças de 4 a 6 anos. Precisam de materiais lúdicos e educativos. O caça-palavras é perfeito para essa faixa etária.

Na pré-escola, crianças estão descobrindo as letras. O caça-palavras introduz o alfabeto de forma divertida. Elas procuram letras familiares na grade. A atividade desenvolve reconhecimento visual.

O caça-palavras também trabalha coordenação motora. Circular palavras exige controle do lápis. O movimento desenvolve pegada correta. Preparação essencial para a escrita formal.`,
        quote: 'Meus alunos adoram encontrar as palavras escondidas!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do 1º Ano e 2º Ano',
        subtitle: 'Atividades de Alfabetização e Letra Cursiva',
        description: `Professores do ensino fundamental - anos iniciais - adoram caça-palavras. Alunos do 1º ano estão em plena alfabetização. O caça-palavras reforça palavras aprendidas em sala.

No 1º ano, use palavras do método de alfabetização. Palavras como BOLA, GATO, SAPO, PATO. A busca reforça a leitura dessas palavras. Crianças praticam sem perceber que estão estudando.

No 2º ano, aumente a complexidade. Use palavras maiores e mais desafiadoras. Ative palavras diagonais e invertidas. O desafio mantém o interesse dos alunos.

Combine com atividades de letra cursiva. Após encontrar, alunos copiam as palavras. A transição da letra bastão para cursiva fica natural.`,
        quote: 'O caça-palavras transforma a prática de ortografia em diversão.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais que Fazem Educação Domiciliar',
        subtitle: 'Atividades para Imprimir em Casa com Tabuada',
        description: `O homeschooling cresce rapidamente no Brasil. Pais buscam materiais de qualidade para ensinar em casa. O gerador de caça-palavras é aliado perfeito.

Pais economizam tempo com atividades prontas. Não precisam criar materiais do zero. Selecionam temas relevantes para a semana. Geram atividades em minutos.

A flexibilidade atende diferentes idades. Famílias com múltiplos filhos aproveitam muito. Crie versões fáceis para os menores. Versões desafiadoras para os mais velhos. Todo mundo faz a mesma atividade.

Integre caça-palavras com a tabuada. Esconda números por extenso na grade. DOIS, QUATRO, SEIS, OITO. Após encontrar, crianças escrevem a tabuada do 2.`,
        quote: 'Uma ferramenta atende todos os níveis dos meus filhos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Inglês e Idiomas',
        subtitle: 'Atividades de Alfabetização Bilíngue',
        description: `Professores de idiomas usam caça-palavras diariamente. A ferramenta ensina vocabulário de forma eficaz. Alunos memorizam palavras brincando.

O gerador suporta 11 idiomas diferentes. Crie caça-palavras em inglês para suas turmas. Mude para espanhol na próxima aula. Francês, alemão e italiano também disponíveis.

Use para ensinar atividades vogais em inglês. Palavras como APPLE, ELEPHANT, ICE, ORANGE, UMBRELLA. Cada vogal em inglês soa diferente. O caça-palavras ajuda na memorização.

Escolas bilíngues aproveitam enormemente. Crie versão português-inglês lado a lado. Alunos encontram MAÇÃ e APPLE. A conexão entre idiomas fica clara.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Atividades Educação Infantil Adaptadas com Pontilhado',
        description: `Professores de educação especial precisam de materiais adaptáveis. O gerador oferece personalização completa. Adapte para necessidades específicas dos alunos.

Para alunos com dificuldades visuais, aumente a grade. Letras maiores facilitam a leitura. Menos palavras por atividade reduz frustração. Cada vitória motiva a continuar.

Para alunos com TDAH, crie versões curtas. Grades 6x6 com apenas 4 palavras. A atividade termina rapidamente. Sucesso imediato mantém o engajamento.

Combine com atividades de pontilhado. O traçado sobre linhas desenvolve foco. A repetição acalma e organiza. Muitos professores de AEE relatam benefícios.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Venda Atividades para Imprimir no Hotmart',
        description: `Muitos professores brasileiros vendem materiais didáticos. Plataformas como Hotmart e Eduzz facilitam. O caça-palavras é produto popular nesses marketplaces.

A licença comercial está incluída na assinatura. Crie e venda sem preocupações legais. Seus clientes recebem produtos profissionais. Avaliações positivas geram mais vendas.

Crie pacotes temáticos completos. Caça-palavras combinado com desenhos para colorir. Adicione atividades de matemática relacionadas. Pacotes completos vendem mais.

Professores faturam de R$500 a R$5.000 por mês. Alguns transformaram em renda principal. O segredo é consistência e qualidade. Novos produtos toda semana mantêm as vendas.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Perguntas Frequentes',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre o gerador de caça-palavras. Se sua pergunta não estiver aqui, entre em contato.',
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
        question: 'O gerador de caça-palavras é realmente gratuito?',
        answer: 'Sim, a versão gratuita é 100% funcional. Você cria caça-palavras ilimitados sem pagar nada. A única diferença é a marca d\'água nas atividades. Para remover a marca d\'água e ganhar licença comercial, assine o Pacote Essencial ou Acesso Completo.',
      },
      {
        id: '2',
        question: 'Posso imprimir as atividades em casa em uma impressora comum?',
        answer: 'Sim. Todas as atividades baixam como arquivos PDF ou JPEG otimizados para impressão doméstica. Imprima em qualquer impressora inkjet ou laser padrão. Os formatos Carta e A4 se adaptam a impressoras comuns. A qualidade 300 DPI garante texto nítido e imagens claras.',
      },
      {
        id: '3',
        question: 'Preciso de habilidades técnicas para criar atividades?',
        answer: 'Não. O gerador não requer habilidades técnicas ou de design. Clique três botões: selecione tema, gere, baixe. O sistema cuida automaticamente de todo o design profissional. Nenhum conhecimento de software de gráficos necessário. Professores sem habilidades técnicas criam materiais profissionais facilmente.',
      },
      {
        id: '4',
        question: 'Posso usar caça-palavras e atividades na minha sala de aula?',
        answer: 'Sim. A assinatura Pacote Essencial inclui uso ilimitado em sala de aula para atividades de alfabetização e coordenação motora. Imprima cópias para todos os seus alunos. Compartilhe com colegas no seu prédio escolar. Use materiais para instrução em sala, tarefas de casa e centros de aprendizagem.',
      },
      {
        id: '5',
        question: 'Quais idiomas estão disponíveis para as atividades?',
        answer: 'As atividades estão disponíveis em 11 idiomas para conteúdo multilíngue. Crie atividades de alfabetização em português. Gere materiais em inglês, alemão, francês, espanhol, italiano, holandês, dinamarquês, sueco, norueguês ou finlandês. Cada imagem na biblioteca tem nomes em todos os idiomas suportados.',
      },
      {
        id: '6',
        question: 'Posso vender as atividades que criar?',
        answer: 'Sim. A assinatura Pacote Essencial inclui licença comercial completa de impressão sob demanda. Venda atividades no Hotmart, Teachers Pay Teachers ou Etsy. Crie pacotes para vender. Publique livros de atividades na Amazon KDP. A licença cobre todas as plataformas de vendas online.',
      },
      {
        id: '7',
        question: 'Como personalizo as atividades para alunos diferentes?',
        answer: 'Personalize atividades modificando tamanho da grade, dificuldade e conteúdo. Reduza o tamanho da grade para 8×8 para alunos com dificuldades. Aumente para 16×16 para alunos avançados. Desabilite palavras diagonais e invertidas para iniciantes. Envie imagens personalizadas para interesses específicos dos alunos.',
      },
      {
        id: '8',
        question: 'Quais faixas etárias funcionam melhor com caça-palavras?',
        answer: 'Atividades de coordenação motora funcionam melhor para crianças de 4-6 anos. Caça-palavras desenvolvem habilidades de reconhecimento visual necessárias para leitura. Alunos do ensino fundamental do 1º ao 3º ano se beneficiam de caça-palavras mais complexos com grades maiores e palavras mais difíceis.',
      },
      {
        id: '9',
        question: 'Posso enviar minhas próprias imagens para caça-palavras personalizados?',
        answer: 'Sim. Envie suas próprias imagens para criar atividades completamente personalizadas. Clique no botão de upload. Selecione arquivos JPEG, PNG ou GIF. Suas imagens aparecem na biblioteca. Use com imagens da nossa biblioteca ou sozinhas. Envie fotos dos alunos ou ilustrações específicas das suas aulas.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar uma atividade?',
        answer: 'Criar atividades leva menos de 3 minutos. Selecione tema com imagens do alfabeto. Clique gerar. Baixe. Três passos simples produzem caça-palavras profissional. Seleção de imagens individuais adiciona 2-3 minutos. Mesmo com personalização completa, caça-palavras ficam prontos em 10 minutos.',
      },
      {
        id: '11',
        question: 'As atividades incluem gabarito com respostas?',
        answer: 'Sim. Todos os caça-palavras incluem opção de gabarito. Clique "Baixar Gabarito" após gerar. Receba versão com todas as palavras destacadas na grade. Use para correção rápida. Compartilhe com assistentes de ensino. Os gabaritos correspondem exatamente ao caça-palavras do aluno.',
      },
      {
        id: '12',
        question: 'O caça-palavras funciona para desenvolver coordenação motora?',
        answer: 'Sim, o caça-palavras é excelente para coordenação motora. A atividade trabalha múltiplas habilidades motoras. O movimento dos olhos desenvolve rastreamento visual essencial para leitura fluente. Circular as palavras trabalha coordenação motora fina e melhora o controle do lápis.',
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
    bundleDescription: 'Sua assinatura inclui acesso a 10 geradores de fichas:',
    bundleApps: [
      'Adicao com Imagens',
      'Trem do Alfabeto',
      'Paginas para Colorir',
      'Fichas de Matematica',
      'Palavras Embaralhadas',
      'Encontre e Conte',
      'Jogo de Associacao',
      'Tracar Linhas',
      'Bingo de Imagens',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando caça-palavras com estes geradores complementares.',
    ctaTitle: 'Pronto para Criar Atividades Incríveis?',
    ctaDescription: 'Junte-se a milhares de educadores que criam atividades profissionais. Geração ilimitada, licença comercial incluída.',
    primaryCtaText: 'Iniciar Teste Gratuito',
    secondaryCtaText: 'Ver Todos os 33 Geradores',
    badgeText: 'Funciona Perfeitamente Com',
    exploreText: 'Explorar todas as aplicações',
    trustBadges: {
      securePayment: 'Pagamento seguro',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Palavras Cruzadas',
        category: 'Língua e Leitura',
        icon: '📝',
        description: 'Complete caça-palavras com palavras cruzadas usando os mesmos temas de vocabulário para prática completa das palavras.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Palavras Embaralhadas',
        category: 'Língua e Leitura',
        icon: '🔤',
        description: 'Combine caça-palavras com puzzles de palavras embaralhadas para reforçar ortografia e vocabulário de ângulos diferentes.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Adivinhe a Palavra',
        category: 'Língua e Leitura',
        icon: '❓',
        description: 'Adicione atividades de adivinhar palavras aos seus centros de alfabetização junto com caça-palavras para prática variada.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Criptogramas',
        category: 'Lógica',
        icon: '🔐',
        description: 'Desafie os alunos com puzzles de decodificação que desenvolvem pensamento lógico e reconhecimento de padrões de letras.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Desenhos para Colorir',
        category: 'Arte e Criatividade',
        icon: '🎨',
        description: 'Recompense caça-palavras completados com páginas para colorir temáticas que desenvolvem coordenação motora fina.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Trem do Alfabeto',
        category: 'Aprendizagem Inicial',
        icon: '🚂',
        description: 'Equilibre a prática de caça-palavras com atividades de reconhecimento de letras para alfabetização inicial completa.',
      },
    ],
  },
};

export default wordSearchPtContent;
