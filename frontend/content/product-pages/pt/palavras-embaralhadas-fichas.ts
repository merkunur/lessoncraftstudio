import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Palavras Embaralhadas (Word Scramble) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/palavras-embaralhadas-fichas.ts
 * URL: /pt/apps/palavras-embaralhadas-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScramblePtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'palavras-embaralhadas-fichas',
    appId: 'word-scramble',
    title: 'Gerador de Palavras Embaralhadas | Atividades para Imprimir de Alfabetização',
    description: 'Crie atividades de palavras embaralhadas para educação infantil e ensino fundamental. Baixe fichas de alfabetização em PDF com gabarito. Atividades para 1º ano e 2º ano com vogais, coordenação motora e letra cursiva.',
    keywords: 'palavras embaralhadas, atividades para imprimir, atividades de alfabetização, educação infantil, 1º ano, 2º ano, vogais, alfabeto, coordenação motora, letra cursiva, pontilhado, desenhos para colorir',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/palavras-embaralhadas-fichas',
  },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-3
  hero: {
    title: 'Gerador de Palavras Embaralhadas',
    subtitle: 'Atividades para Imprimir de Alfabetização para Educação Infantil',
    description: `Crie atividades de palavras embaralhadas profissionais para suas aulas em poucos minutos. Com sua assinatura Pacote Essencial, você tem acesso ilimitado ao gerador de atividades para imprimir sem taxas adicionais por ficha. O gerador de palavras embaralhadas é perfeito para professores de educação infantil, 1º ano e 2º ano que precisam de atividades de alfabetização envolventes e divertidas.

As atividades de palavras embaralhadas ajudam crianças a desenvolver consciência fonológica, reconhecimento de letras e habilidades de leitura. Cada exercício apresenta uma imagem com as letras da palavra correspondente misturadas, desafiando os alunos a reorganizá-las corretamente. Este tipo de atividade de alfabetização é especialmente eficaz para crianças em fase de pré-escola e ensino fundamental porque combina aprendizado visual com raciocínio lógico.

O gerador de atividades para imprimir oferece personalização completa para atender às necessidades da sua turma. Você pode escolher entre diferentes níveis de dificuldade, desde exercícios sem dicas até versões com letras reveladas para alunos iniciantes. As atividades podem ser configuradas com letras maiúsculas ou minúsculas, e você pode optar por cores diferenciadas para vogais e consoantes, facilitando o reconhecimento das atividades de vogais e alfabeto.`,
    previewImageSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Exemplos de Palavras Embaralhadas',
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
        worksheetSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble portrait answer-key.jpeg',
        altText: 'Palavras embaralhadas formato retrato com imagens temáticas para educação infantil',
        pdfDownloadUrl: '/samples/english/word scramble/word scramble portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word scramble/word scramble landscape.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble landscape answer-key.jpeg',
        altText: 'Palavras embaralhadas formato paisagem com imagens coloridas para ensino fundamental',
        pdfDownloadUrl: '/samples/english/word scramble/word scramble landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word scramble/custom word list.jpeg',
        answerKeySrc: '/samples/english/word scramble/custom word list answer-key.jpeg',
        altText: 'Palavras embaralhadas com lista de palavras personalizada para atividades de alfabetização',
        pdfDownloadUrl: '/samples/english/word scramble/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Palavras Embaralhadas',
    sectionDescription: 'O gerador de palavras embaralhadas oferece recursos completos para criar atividades para imprimir de alta qualidade. Professores de educação infantil e ensino fundamental encontram tudo o que precisam para desenvolver materiais de alfabetização, coordenação motora e reconhecimento de letras. A ferramenta combina facilidade de uso com personalização avançada, permitindo criar atividades diferenciadas para cada nível de aprendizado.',
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
        title: 'Atividades de Alfabetização em 3 Cliques',
        description: `Criar atividades de alfabetização nunca foi tão simples. O processo completo leva menos de 3 minutos do início ao download. Primeiro, selecione um tema de imagens ou escolha figuras individuais da biblioteca. Segundo, ajuste as configurações como número de exercícios, nível de dificuldade e formato das letras. Terceiro, clique em gerar e sua atividade de educação infantil está pronta para imprimir.

O gerador cuida automaticamente do layout e posicionamento. As imagens ficam alinhadas perfeitamente com os espaços para as letras embaralhadas. Você não precisa de habilidades de design ou conhecimento técnico. Qualquer professor pode criar atividades para imprimir profissionais em poucos minutos.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Atividades para Imprimir Totalmente Editáveis',
        description: `Cada elemento da sua atividade para imprimir pode ser editado diretamente no canvas. Arraste imagens para reposicioná-las. Redimensione textos e figuras com controles intuitivos. Gire elementos para criar composições únicas. Delete itens que não deseja incluir. Esta flexibilidade permite adaptar cada atividade de alfabetização às necessidades específicas da sua turma.

O sistema oferece controles de camadas para organizar elementos. Traga objetos para frente ou envie para trás. Alinhe múltiplos itens horizontal ou verticalmente. Centralize elementos na página com um clique. Todas as edições são reversíveis com os botões desfazer e refazer, garantindo que você nunca perca seu trabalho em atividades de educação infantil.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Atividades Educação Infantil com Imagens Personalizadas',
        description: `O gerador permite fazer upload de suas próprias imagens para criar atividades de educação infantil personalizadas. Use fotos dos alunos, mascotes da escola ou imagens específicas do seu projeto pedagógico. O sistema aceita múltiplos arquivos simultaneamente em formatos JPEG, PNG e GIF.

Combine imagens enviadas com figuras da biblioteca para criar atividades para imprimir únicas. Cada imagem pode ter seu nome editado manualmente, permitindo trabalhar vocabulário específico. Esta funcionalidade é perfeita para projetos temáticos, datas comemorativas ou atividades de alfabetização com vocabulário controlado.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades de Alfabetização em 11 Idiomas',
        description: `O gerador suporta atividades de alfabetização em 11 idiomas diferentes. Além do português brasileiro, você pode criar materiais em inglês, alemão, francês, espanhol, italiano, holandês, sueco, dinamarquês, norueguês e finlandês. A interface e os nomes das imagens são traduzidos automaticamente para o idioma selecionado.

Esta funcionalidade é essencial para escolas bilíngues e professores de línguas estrangeiras. Crie atividades para imprimir de vocabulário em inglês ou espanhol usando as mesmas imagens. O sistema utiliza os nomes dos arquivos de imagem para gerar as palavras embaralhadas, garantindo precisão em cada idioma para suas atividades de educação infantil.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Atividades para Imprimir com Licença Comercial',
        description: `Sua assinatura Pacote Essencial inclui licença comercial completa para print-on-demand. Você pode vender suas atividades para imprimir no Teachers Pay Teachers, Hotmart, Etsy, Amazon KDP e outras plataformas. Não há taxas adicionais de licenciamento ou atribuição obrigatória.

Professores empreendedores usam o gerador para criar pacotes de atividades de alfabetização e vender online. Com exportação em 300 DPI, suas fichas têm qualidade profissional para impressão comercial. Muitos educadores relatam renda extra significativa vendendo atividades de educação infantil criadas com a ferramenta.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Atividades Educação Infantil com 3000+ Imagens',
        description: `A biblioteca inclui mais de 3000 imagens organizadas por temas educativos. Encontre figuras de animais, frutas, transportes, profissões, natureza e muito mais. Cada tema contém dezenas de desenhos para colorir e imagens coloridas prontas para uso em atividades de educação infantil.

Use a função de busca para encontrar imagens específicas rapidamente. Digite palavras-chave como "maçã", "carro" ou "cachorro" e veja resultados instantâneos. A biblioteca também inclui fundos temáticos e bordas decorativas para personalizar suas atividades para imprimir com desenhos para colorir.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Atividades para Imprimir em 300 DPI',
        description: `Todas as atividades para imprimir são exportadas em resolução 300 DPI, o padrão profissional de impressão. Baixe em formato PDF para impressão perfeita ou JPEG para uso digital. A opção de escala de cinza permite economizar tinta ao imprimir atividades de coordenação motora e alfabetização.

O gabarito com respostas é gerado automaticamente para cada atividade. Imprima a folha de respostas separadamente ou use para correção rápida. A qualidade profissional garante que suas atividades de educação infantil tenham aparência impecável, seja para uso em sala de aula ou venda online.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🔤',
        title: 'Atividades de Alfabetização com Vogais e Alfabeto',
        description: `O gerador oferece opção de cores diferenciadas para atividades de vogais e alfabeto. Vogais aparecem em uma cor e consoantes em outra, facilitando o reconhecimento para alunos em fase de alfabetização. Esta visualização ajuda crianças a identificar padrões e desenvolver consciência fonológica em atividades de educação infantil.

Você também pode escolher letras todas em preto para exercícios mais avançados. A opção de maiúsculas ou minúsculas permite adequar as atividades para imprimir ao nível de cada turma. Combine estas configurações com diferentes níveis de dicas para criar atividades de alfabetização progressivas.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Crie Palavras Embaralhadas em 5 Passos Simples',
    sectionDescription: 'Criar atividades para imprimir de palavras embaralhadas leva menos de 3 minutos do início ao download. O processo é simples e intuitivo, não exigindo conhecimentos técnicos ou habilidades de design. Professores de educação infantil, 1º ano e 2º ano podem gerar materiais profissionais de alfabetização rapidamente. Siga os cinco passos abaixo para criar suas primeiras atividades de alfabetização com palavras embaralhadas.',
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
        title: 'Escolha Imagens para Atividades Educação Infantil',
        description: `O primeiro passo é selecionar as imagens que aparecerão nas suas atividades de educação infantil. Você tem três opções principais para escolher o conteúdo. A primeira é selecionar um tema completo como animais, frutas ou transportes. A segunda é buscar e selecionar imagens individuais da biblioteca de desenhos para colorir. A terceira é fazer upload de suas próprias imagens personalizadas.

Para usar a biblioteca, clique no menu de seleção de temas. Escolha entre dezenas de categorias organizadas por assunto. Cada tema contém múltiplas imagens relacionadas, perfeitas para atividades de alfabetização temáticas. O contador mostra quantas imagens você selecionou para suas atividades para imprimir.

Se preferir escolher figuras específicas, use a barra de busca. Digite palavras como "maçã", "bola" ou "casa" para encontrar imagens relacionadas. Clique nas figuras desejadas para adicioná-las à seleção. Esta opção é ideal para trabalhar vocabulário específico em atividades de vogais e alfabeto.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Atividades 1º Ano e 2º Ano',
        description: `Após selecionar as imagens, configure as opções do exercício para adequar às suas atividades 1º ano ou atividades 2º ano. O painel de configuração oferece controles para personalizar cada aspecto da ficha de coordenação motora e alfabetização.

Primeiro, defina o número de exercícios por página, de 1 a 10. Para atividades de educação infantil, recomendamos 4 a 6 exercícios para manter o foco das crianças. Para turmas mais avançadas, você pode incluir até 10 desafios por página em suas atividades para imprimir.

Segundo, escolha o nível de dificuldade baseado em quantas letras ficam reveladas como dica. A opção "sem dicas" desafia os alunos a descobrir todas as letras. As opções "fácil", "normal" e "difícil" revelam proporções diferentes de letras, ideal para atividades de alfabetização diferenciadas.

Terceiro, selecione maiúsculas ou minúsculas conforme o estágio de aprendizado. Atividades 1º ano geralmente usam maiúsculas. Turmas mais avançadas podem praticar com letra cursiva e pontilhado em minúsculas. A opção de cores diferenciadas para vogais ajuda no reconhecimento em atividades de vogais e alfabeto.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere Atividades de Alfabetização',
        description: `Com imagens selecionadas e configurações definidas, clique no botão "Criar" para gerar suas atividades de alfabetização. O sistema processa automaticamente as imagens e cria o layout com as letras embaralhadas. A visualização aparece instantaneamente no canvas, pronta para revisão.

Cada exercício mostra a imagem selecionada ao lado das letras misturadas da palavra correspondente. O gerador organiza automaticamente os elementos na página para atividades para imprimir bem estruturadas. Se você selecionou desenhos para colorir, as imagens aparecem em formato preto e branco para os alunos colorirem.

Verifique se todas as palavras estão corretas para suas atividades de educação infantil. O sistema usa os nomes das imagens para gerar as palavras. Se precisar ajustar algum nome, use a função de edição manual antes de gerar. Isso garante que suas atividades de alfabetização tenham exatamente o vocabulário desejado.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite Atividades para Imprimir no Canvas',
        description: `Após gerar a atividade, você pode editar qualquer elemento diretamente no canvas. Esta flexibilidade permite criar atividades para imprimir totalmente personalizadas. Clique em qualquer objeto para selecioná-lo e ver os controles de edição.

Adicione textos personalizados como títulos, instruções ou campos para nome do aluno. Escolha entre várias fontes, incluindo opções de letra cursiva para prática de escrita. Ajuste cores, tamanhos e posições conforme necessário para suas atividades de alfabetização.

Insira elementos decorativos como bordas temáticas e fundos coloridos. A biblioteca inclui opções sazonais para datas comemorativas. Combine com desenhos para colorir adicionais para criar pacotes completos de atividades de educação infantil. Todas as edições são salvas automaticamente no canvas.

Use os controles de camadas para organizar elementos sobrepostos. Alinhe objetos com precisão usando as ferramentas de alinhamento. Bloqueie elementos que não deseja mover acidentalmente. Estas ferramentas profissionais garantem atividades para imprimir com aparência impecável, ideais para trabalhar coordenação motora.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe e Imprima',
        description: `O passo final é baixar suas atividades de alfabetização para impressão. Clique no botão "Download" para ver as opções disponíveis. Escolha entre formato PDF para impressão profissional ou JPEG para uso digital em atividades para imprimir.

O gerador cria automaticamente o gabarito com as respostas. Baixe a folha de respostas separadamente para facilitar a correção. Esta funcionalidade economiza tempo de professores de educação infantil que precisam verificar múltiplas atividades.

Ative a opção de escala de cinza para economizar tinta na impressão. Esta configuração converte cores em tons de cinza, mantendo a qualidade visual das atividades de alfabetização. Ideal para escolas com orçamento limitado para materiais de atividades 1º ano e 2º ano.

Combine suas atividades de palavras embaralhadas com outros geradores da plataforma. Crie pacotes completos incluindo atividades de matemática, tabuada e coordenação motora. A assinatura Pacote Essencial dá acesso a 10 geradores diferentes para criar materiais diversificados de atividades para imprimir.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Palavras Embaralhadas',
    sectionDescription: 'O gerador de palavras embaralhadas atende educadores de diversos contextos. Professores de educação infantil, ensino fundamental, escolas bilíngues e homeschoolers encontram recursos valiosos para suas atividades de alfabetização. A ferramenta também serve pais que desejam reforçar o aprendizado em casa e empreendedores que vendem materiais educativos. Conheça como cada grupo utiliza as atividades para imprimir de palavras embaralhadas.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades de Alfabetização com Coordenação Motora e Vogais',
        description: `Professores de educação infantil usam o gerador para criar atividades de alfabetização que desenvolvem múltiplas habilidades simultaneamente. Os exercícios de palavras embaralhadas trabalham reconhecimento de letras, consciência fonológica e coordenação motora. Crianças de 4 a 6 anos se beneficiam do formato visual que combina imagens atraentes com desafios de letras.

As atividades de vogais e alfabeto são especialmente populares na pré-escola. Configure o gerador para destacar vogais em cores diferentes, facilitando o aprendizado das atividades de educação infantil. Combine com desenhos para colorir para criar fichas completas que mantêm os pequenos engajados por mais tempo.

O recurso de dicas ajustáveis permite criar atividades de alfabetização progressivas. Comece com metade das letras reveladas para alunos iniciantes. Reduza as dicas gradualmente conforme a turma avança. Esta diferenciação é essencial em turmas de educação infantil com níveis variados.`,
        quote: 'Meus alunos adoram descobrir as palavras escondidas!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do 1º Ano e 2º Ano',
        subtitle: 'Atividades de Alfabetização com Letra Cursiva e Pontilhado',
        description: `Professores de atividades 1º ano e 2º ano utilizam palavras embaralhadas para consolidar a alfabetização. Nesta fase, os alunos já reconhecem letras e começam a formar palavras. Os exercícios desafiam as crianças a aplicar seu conhecimento de atividades de alfabetização em contextos práticos.

Configure exercícios com letra cursiva e pontilhado para turmas que estão aprendendo escrita cursiva. O gerador permite adicionar linhas pontilhadas para os alunos praticarem a escrita da palavra correta após descobri-la. Esta integração de leitura e escrita maximiza o valor de cada atividade para imprimir.

Professores de atividades 1º ano relatam que palavras embaralhadas funcionam bem como atividade de aquecimento ou conclusão de aula. O formato de desafio motiva alunos competitivos. Inclua campos de nome e data para organizar as atividades de alfabetização no portfólio do estudante.`,
        quote: 'Palavras embaralhadas transformam a prática de ortografia em diversão.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais que Fazem Educação Domiciliar',
        subtitle: 'Atividades Educação Infantil com Desenhos para Colorir em Casa',
        description: `Famílias que praticam homeschool encontram no gerador uma ferramenta versátil para atividades de educação infantil em casa. Pais podem criar materiais personalizados que se adequam ao ritmo e interesses de cada criança. A flexibilidade do sistema permite adaptar atividades de alfabetização às necessidades individuais.

O recurso de upload de imagens é especialmente útil para homeschoolers. Use fotos de objetos da casa, animais de estimação ou brinquedos favoritos para criar atividades para imprimir significativas. Crianças se engajam mais quando reconhecem elementos familiares em desenhos para colorir personalizados.

Combine palavras embaralhadas com outras atividades de coordenação motora para sessões de aprendizado completas. O formato impresso permite estudar sem telas, uma prioridade para muitas famílias homeschoolers. Crie rotinas semanais incluindo atividades de vogais e alfabeto variadas.`,
        quote: 'Uma ferramenta que atende todas as necessidades de aprendizado dos meus filhos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Inglês e Escolas Bilíngues',
        subtitle: 'Atividades de Alfabetização em 11 Idiomas',
        description: `Professores de inglês e escolas bilíngues aproveitam o suporte a 11 idiomas do gerador. Crie atividades de alfabetização em inglês, espanhol, francês ou alemão usando a mesma biblioteca de imagens. O sistema traduz automaticamente os nomes das figuras para o idioma selecionado em atividades para imprimir multilíngues.

Configure exercícios paralelos em português e inglês para comparação de vocabulário. Alunos descobrem a mesma palavra embaralhada em dois idiomas, reforçando conexões linguísticas. Esta técnica é eficaz em programas de imersão e atividades de educação infantil bilíngues.

Escolas internacionais usam o gerador para criar materiais consistentes em múltiplos idiomas. Professores de diferentes nacionalidades acessam a mesma ferramenta para produzir atividades de alfabetização padronizadas. O formato visual transcende barreiras linguísticas em turmas multiculturais.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Atividades Educação Infantil Adaptadas com Pontilhado',
        description: `Professores de educação especial precisam de materiais adaptáveis. O gerador oferece personalização completa para criar atividades de educação infantil que atendem necessidades específicas. Adapte cada exercício para o nível e capacidade de cada aluno.

Para alunos com dificuldades de aprendizado, aumente o número de dicas reveladas. Letras já posicionadas facilitam o sucesso inicial. Menos exercícios por página reduzem a sobrecarga. Cada vitória motiva o aluno a continuar praticando atividades de alfabetização.

Para alunos com TDAH, crie versões curtas e objetivas. Exercícios rápidos mantêm o foco. A satisfação de completar uma atividade para imprimir rapidamente incentiva a continuidade. Combine com atividades de pontilhado para variar as tarefas e manter o engajamento.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno especial.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Venda Atividades para Imprimir no Hotmart e Teachers Pay Teachers',
        description: `Professores empreendedores usam o gerador para criar produtos digitais para venda. A licença comercial incluída na assinatura Pacote Essencial permite vender atividades para imprimir no Teachers Pay Teachers, Hotmart e outras plataformas. Muitos educadores relatam renda extra significativa com materiais de alfabetização.

Crie pacotes temáticos combinando palavras embaralhadas com atividades de tabuada e coordenação motora. Temas sazonais como Páscoa, Festa Junina e Natal têm alta demanda. A biblioteca de desenhos para colorir oferece imagens para todas as ocasiões em atividades de educação infantil.

A qualidade profissional de 300 DPI garante produtos competitivos no mercado. Exporte em PDF para distribuição digital ou impressão sob demanda. Professores brasileiros vendem atividades de alfabetização, matemática e coordenação motora para colegas em todo o país e países lusófonos.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from word-scramble.md
  faq: {
    sectionTitle: 'Perguntas Frequentes',
    sectionDescription: 'Professores e pais têm dúvidas comuns sobre o gerador de palavras embaralhadas. Reunimos as perguntas mais frequentes sobre atividades para imprimir, licenciamento, personalização e uso em sala de aula. Encontre respostas sobre atividades de matemática, tabuada, coordenação motora e alfabetização para educação infantil e ensino fundamental.',
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
        question: 'O gerador de palavras embaralhadas é realmente gratuito?',
        answer: 'O gerador de palavras embaralhadas requer assinatura Pacote Essencial custando R$720 ao ano ou R$72 mensais. Sua assinatura permite criação ilimitada de atividades para imprimir sem taxas por ficha. Gere quantas atividades de alfabetização, coordenação motora e vogais precisar sem custos adicionais. O Pacote Essencial inclui 10 geradores populares de atividades educativas. O Acesso Completo custa R$1.200 ao ano e inclui todos os 33 tipos de geradores. Ambas as assinaturas incluem licença comercial, suporte a 11 idiomas e exportação em qualidade profissional 300 DPI.',
      },
      {
        id: '2',
        question: 'Posso imprimir atividades de coordenação motora e letra cursiva em casa?',
        answer: 'Sim, todas as atividades de coordenação motora e letra cursiva são otimizadas para impressão doméstica. O formato PDF garante qualidade perfeita em impressoras jato de tinta ou laser comuns. Atividades de pontilhado e letra cursiva ficam nítidas mesmo em papel sulfite comum. A opção de escala de cinza economiza tinta colorida. Ative esta configuração para imprimir atividades de vogais e alfabeto em preto e branco. Os desenhos para colorir mantêm qualidade mesmo sem cores.',
      },
      {
        id: '3',
        question: 'Preciso de habilidades de design para criar atividades?',
        answer: 'Não são necessárias habilidades de design para criar atividades de palavras embaralhadas. O gerador cuida automaticamente do layout e posicionamento. Selecione imagens, ajuste configurações e clique em gerar. Suas atividades para imprimir ficam prontas em menos de 3 minutos. A interface intuitiva guia você pelo processo passo a passo. Mesmo professores sem experiência tecnológica criam atividades 1º ano e 2º ano profissionais rapidamente.',
      },
      {
        id: '4',
        question: 'Posso usar atividades de vogais e alfabeto na sala de aula?',
        answer: 'A assinatura Pacote Essencial inclui uso ilimitado em sala de aula. Imprima quantas cópias precisar de atividades de vogais e alfabeto para todos os seus alunos. Não há restrições de quantidade ou necessidade de licenças adicionais para uso educacional em atividades de educação infantil. Professores de múltiplas turmas podem compartilhar materiais entre colegas da mesma escola.',
      },
      {
        id: '5',
        question: 'Quais idiomas estão disponíveis para atividades de alfabetização?',
        answer: 'O gerador suporta atividades de alfabetização em 11 idiomas diferentes. Além do português brasileiro, crie materiais em inglês, alemão, francês, espanhol, italiano, holandês, sueco, dinamarquês, norueguês e finlandês. A interface e vocabulário são traduzidos automaticamente. Escolas bilíngues usam esta funcionalidade para criar atividades de alfabetização paralelas em dois idiomas.',
      },
      {
        id: '6',
        question: 'Posso vender as atividades que criar com palavras embaralhadas?',
        answer: 'Sim, a assinatura Pacote Essencial inclui licença comercial completa para print-on-demand. Venda atividades de desenhos para colorir e coordenação motora no Teachers Pay Teachers, Hotmart, Eduzz e outras plataformas. Não há taxas de royalties ou atribuição obrigatória. A qualidade de 300 DPI garante produtos competitivos no mercado.',
      },
      {
        id: '7',
        question: 'Como personalizo atividades de letra cursiva e pontilhado?',
        answer: 'O gerador oferece múltiplas opções de personalização para atividades de letra cursiva e pontilhado. Escolha entre maiúsculas, minúsculas ou fonte cursiva. Ajuste o nível de dificuldade com diferentes quantidades de letras reveladas como dica. Adicione campos de nome e data para organização. Inclua instruções personalizadas usando a ferramenta de texto. Selecione bordas e fundos temáticos para ocasiões especiais.',
      },
      {
        id: '8',
        question: 'Qual faixa etária funciona melhor com palavras embaralhadas?',
        answer: 'Atividades de palavras embaralhadas funcionam melhor para crianças de 4 a 9 anos. Atividades de vogais e alfabeto são ideais para educação infantil (4-6 anos). Crianças em fase de alfabetização desenvolvem reconhecimento de letras e consciência fonológica com atividades de desenhos para colorir. Para turmas mais avançadas, o 2º e 3º anos são mais adequados. Alunos já alfabetizados podem descobrir palavras mais complexas.',
      },
      {
        id: '9',
        question: 'Posso fazer upload de imagens próprias para as atividades?',
        answer: 'Sim, o gerador permite upload de imagens próprias para criar atividades personalizadas. Use fotos de objetos, alunos da turma ou imagens específicas do seu currículo. O sistema aceita formatos JPEG, PNG e GIF para atividades para imprimir customizadas. Combine imagens enviadas com a biblioteca de desenhos para colorir incluída. Edite manualmente os nomes das imagens para controlar exatamente quais palavras aparecem.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar uma atividade de palavras embaralhadas?',
        answer: 'Criar atividades de palavras embaralhadas leva menos de 3 minutos. Selecione um tema ou imagens individuais em 30 segundos. Configure opções de dificuldade e formato em 30 segundos. Gere e baixe suas atividades para imprimir instantaneamente. A edição opcional no canvas adiciona alguns minutos conforme sua necessidade. Mesmo com customização completa, você economiza horas comparado à criação manual.',
      },
      {
        id: '11',
        question: 'As atividades de palavras embaralhadas incluem gabarito?',
        answer: 'Sim, o gerador cria automaticamente o gabarito para cada atividade de palavras embaralhadas. Baixe a folha de respostas separadamente em PDF ou JPEG. O gabarito mostra as palavras corretas correspondentes a cada imagem. Use para correção rápida ou autocorreção pelos alunos. Imprima uma cópia para referência do professor.',
      },
      {
        id: '12',
        question: 'Posso criar atividades de palavras embaralhadas sobre matemática?',
        answer: 'Sim, você pode criar atividades de matemática usando imagens de números e operações. Selecione figuras numéricas da biblioteca para gerar palavras como "cinco", "soma" ou "igual". Esta abordagem interdisciplinar conecta atividades de alfabetização com raciocínio matemático. Combine palavras embaralhadas de vocabulário matemático com outros geradores do Pacote Essencial.',
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
    sectionDescription: 'O Pacote Essencial inclui 10 geradores diferentes de atividades para imprimir. Combine palavras embaralhadas com caça-palavras, bingo, fichas de matemática e muito mais. Crie pacotes educativos completos para atividades 1º ano e 2º ano.',
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
        slug: 'word-search',
        name: 'Caça-Palavras',
        category: 'Língua e Leitura',
        icon: '🔍',
        description: 'Combine palavras embaralhadas com caça-palavras usando os mesmos temas de vocabulário para prática completa das palavras.',
      },
      {
        id: '2',
        slug: 'crossword',
        name: 'Palavras Cruzadas',
        category: 'Língua e Leitura',
        icon: '📝',
        description: 'Complete palavras embaralhadas com palavras cruzadas usando os mesmos temas de vocabulário para prática de ortografia.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Adivinhe a Palavra',
        category: 'Língua e Leitura',
        icon: '❓',
        description: 'Adicione atividades de adivinhar palavras aos seus centros de alfabetização junto com palavras embaralhadas para prática variada.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Trem do Alfabeto',
        category: 'Aprendizagem Inicial',
        icon: '🚂',
        description: 'Equilibre a prática de palavras embaralhadas com atividades de reconhecimento de letras para alfabetização inicial completa.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Desenhos para Colorir',
        category: 'Arte e Criatividade',
        icon: '🎨',
        description: 'Recompense palavras embaralhadas completadas com páginas para colorir temáticas que desenvolvem coordenação motora fina.',
      },
      {
        id: '6',
        slug: 'matching',
        name: 'Associação de Pares',
        category: 'Aprendizagem Visual',
        icon: '🔗',
        description: 'Combine palavras embaralhadas com jogos de associação para reforçar conexões entre palavras e imagens.',
      },
    ],
  },
};

export default wordScramblePtContent;
