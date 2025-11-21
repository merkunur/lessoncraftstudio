import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBlogPosts() {
  console.log('\n📝 Seeding blog posts...');

  // Get the admin user to be the author
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@lessoncraftstudio.com' },
  });

  if (!admin) {
    console.error('❌ Admin user not found. Please run user seeding first.');
    return;
  }

  // Sample blog posts with multilingual content
  const blogPosts = [
    {
      slug: 'critical-thinking-worksheets-teachers',
      category: 'teaching-resources',
      keywords: ['critical thinking', 'worksheets', 'teachers', 'education', 'classroom'],
      featuredImage: '/uploads/blog/critical-thinking.jpg',
      status: 'published',
      publishedAt: new Date('2025-01-15'),
      featured: true,
      translations: {
        en: {
          title: 'Critical Thinking Worksheets for Teachers: A Complete Guide',
          excerpt: 'Discover how critical thinking worksheets can transform your classroom and help students develop essential problem-solving skills.',
          content: `# Critical Thinking Worksheets for Teachers: A Complete Guide

Critical thinking is one of the most important skills students can develop. It helps them analyze information, solve problems, and make informed decisions. As educators, providing students with the right tools to develop these skills is crucial.

## Why Critical Thinking Matters

In today's fast-paced world, students need more than just factual knowledge. They need to:
- Analyze information critically
- Evaluate sources and arguments
- Solve complex problems
- Make evidence-based decisions
- Think creatively and independently

## How Worksheets Help Develop Critical Thinking

Well-designed worksheets can:
1. **Present Real-World Scenarios**: Students engage with practical problems
2. **Encourage Analysis**: Questions prompt deeper thinking
3. **Build Logical Reasoning**: Step-by-step problem solving
4. **Foster Creativity**: Open-ended questions inspire original thinking

## Types of Critical Thinking Worksheets

### 1. Logic Puzzles
Logic puzzles challenge students to use deductive reasoning and pattern recognition.

### 2. Argument Analysis
These worksheets help students identify claims, evidence, and fallacies in arguments.

### 3. Problem-Solving Scenarios
Real-world problems that require creative solutions and strategic thinking.

### 4. Compare and Contrast
Activities that develop analytical skills by examining similarities and differences.

## Tips for Using Critical Thinking Worksheets

- **Start Simple**: Begin with age-appropriate challenges
- **Encourage Discussion**: Have students explain their reasoning
- **Provide Feedback**: Guide students through their thought process
- **Make It Relevant**: Connect problems to students' lives

## Conclusion

Critical thinking worksheets are invaluable tools for developing students' analytical and problem-solving abilities. By incorporating them into your curriculum, you're preparing students for success in school and beyond.`,
          metaTitle: 'Critical Thinking Worksheets for Teachers | Complete Guide 2025',
          metaDescription: 'Transform your classroom with critical thinking worksheets. Learn how to develop students\' problem-solving skills with proven teaching strategies and resources.',
        },
        de: {
          title: 'Arbeitsblätter zum Kritischen Denken für Lehrer: Ein Vollständiger Leitfaden',
          excerpt: 'Entdecken Sie, wie Arbeitsblätter zum kritischen Denken Ihren Unterricht transformieren und Schülern helfen können, wesentliche Problemlösungsfähigkeiten zu entwickeln.',
          content: `# Arbeitsblätter zum Kritischen Denken für Lehrer: Ein Vollständiger Leitfaden

Kritisches Denken ist eine der wichtigsten Fähigkeiten, die Schüler entwickeln können. Es hilft ihnen, Informationen zu analysieren, Probleme zu lösen und fundierte Entscheidungen zu treffen.

## Warum Kritisches Denken Wichtig Ist

In der heutigen schnelllebigen Welt brauchen Schüler mehr als nur faktisches Wissen. Sie müssen:
- Informationen kritisch analysieren
- Quellen und Argumente bewerten
- Komplexe Probleme lösen
- Evidenzbasierte Entscheidungen treffen

## Fazit

Arbeitsblätter zum kritischen Denken sind unschätzbare Werkzeuge zur Entwicklung der analytischen Fähigkeiten der Schüler.`,
          metaTitle: 'Arbeitsblätter Kritisches Denken für Lehrer | Vollständiger Leitfaden 2025',
          metaDescription: 'Transformieren Sie Ihren Unterricht mit Arbeitsblättern zum kritischen Denken. Entwickeln Sie Problemlösungsfähigkeiten mit bewährten Lehrstrategien.',
        },
        es: {
          title: 'Hojas de Trabajo de Pensamiento Crítico para Profesores: Guía Completa',
          excerpt: 'Descubra cómo las hojas de trabajo de pensamiento crítico pueden transformar su aula y ayudar a los estudiantes a desarrollar habilidades esenciales de resolución de problemas.',
          content: `# Hojas de Trabajo de Pensamiento Crítico para Profesores

El pensamiento crítico es una de las habilidades más importantes que los estudiantes pueden desarrollar.

## Por Qué Importa el Pensamiento Crítico

En el mundo actual, los estudiantes necesitan más que conocimiento factual.

## Conclusión

Las hojas de trabajo de pensamiento crítico son herramientas invaluables para desarrollar las habilidades de los estudiantes.`,
          metaTitle: 'Hojas de Trabajo Pensamiento Crítico para Profesores | Guía 2025',
          metaDescription: 'Transforme su aula con hojas de trabajo de pensamiento crítico. Aprenda a desarrollar habilidades de resolución de problemas.',
        },
        fr: {
          title: 'Feuilles de Travail de Pensée Critique pour Enseignants: Guide Complet',
          excerpt: 'Découvrez comment les feuilles de travail de pensée critique peuvent transformer votre classe et aider les élèves à développer des compétences essentielles.',
          content: `# Feuilles de Travail de Pensée Critique pour Enseignants

La pensée critique est l'une des compétences les plus importantes que les élèves peuvent développer.

## Conclusion

Les feuilles de travail de pensée critique sont des outils précieux pour développer les compétences des élèves.`,
          metaTitle: 'Feuilles de Travail Pensée Critique pour Enseignants | Guide 2025',
          metaDescription: 'Transformez votre classe avec des feuilles de travail de pensée critique. Développez les compétences de résolution de problèmes.',
        },
        it: {
          title: 'Schede di Pensiero Critico per Insegnanti: Guida Completa',
          excerpt: 'Scopri come le schede di pensiero critico possono trasformare la tua classe e aiutare gli studenti a sviluppare competenze essenziali.',
          content: `# Schede di Pensiero Critico per Insegnanti

Il pensiero critico è una delle competenze più importanti che gli studenti possono sviluppare.

## Conclusione

Le schede di pensiero critico sono strumenti preziosi per sviluppare le competenze degli studenti.`,
          metaTitle: 'Schede Pensiero Critico per Insegnanti | Guida 2025',
          metaDescription: 'Trasforma la tua classe con schede di pensiero critico. Sviluppa competenze di risoluzione dei problemi.',
        },
        pt: {
          title: 'Folhas de Trabalho de Pensamento Crítico para Professores: Guia Completo',
          excerpt: 'Descubra como as folhas de trabalho de pensamento crítico podem transformar sua sala de aula e ajudar os alunos a desenvolver habilidades essenciais.',
          content: `# Folhas de Trabalho de Pensamento Crítico para Professores

O pensamento crítico é uma das habilidades mais importantes que os alunos podem desenvolver.

## Conclusão

As folhas de trabalho de pensamento crítico são ferramentas valiosas para desenvolver as habilidades dos alunos.`,
          metaTitle: 'Folhas de Trabalho Pensamento Crítico para Professores | Guia 2025',
          metaDescription: 'Transforme sua sala de aula com folhas de trabalho de pensamento crítico. Desenvolva habilidades de resolução de problemas.',
        },
        nl: {
          title: 'Werkbladen Kritisch Denken voor Leraren: Volledige Gids',
          excerpt: 'Ontdek hoe werkbladen voor kritisch denken uw klas kunnen transformeren en studenten kunnen helpen essentiële vaardigheden te ontwikkelen.',
          content: `# Werkbladen Kritisch Denken voor Leraren

Kritisch denken is een van de belangrijkste vaardigheden die studenten kunnen ontwikkelen.

## Conclusie

Werkbladen voor kritisch denken zijn waardevolle tools voor het ontwikkelen van studentenvaardigheden.`,
          metaTitle: 'Werkbladen Kritisch Denken voor Leraren | Gids 2025',
          metaDescription: 'Transformeer uw klas met werkbladen voor kritisch denken. Ontwikkel probleemoplossende vaardigheden.',
        },
        da: {
          title: 'Arbejdsark til Kritisk Tænkning for Lærere: Komplet Guide',
          excerpt: 'Oplev hvordan arbejdsark til kritisk tænkning kan transformere dit klasseværelse og hjælpe elever med at udvikle væsentlige færdigheder.',
          content: `# Arbejdsark til Kritisk Tænkning for Lærere

Kritisk tænkning er en af de vigtigste færdigheder, som elever kan udvikle.

## Konklusion

Arbejdsark til kritisk tænkning er uvurderlige værktøjer til at udvikle elevers færdigheder.`,
          metaTitle: 'Arbejdsark Kritisk Tænkning for Lærere | Guide 2025',
          metaDescription: 'Transformer dit klasseværelse med arbejdsark til kritisk tænkning. Udvikl problemløsningsfærdigheder.',
        },
        sv: {
          title: 'Arbetsblad för Kritiskt Tänkande för Lärare: Komplett Guide',
          excerpt: 'Upptäck hur arbetsblad för kritiskt tänkande kan transformera ditt klassrum och hjälpa elever att utveckla viktiga färdigheter.',
          content: `# Arbetsblad för Kritiskt Tänkande för Lärare

Kritiskt tänkande är en av de viktigaste färdigheterna som elever kan utveckla.

## Slutsats

Arbetsblad för kritiskt tänkande är ovärderliga verktyg för att utveckla elevers färdigheter.`,
          metaTitle: 'Arbetsblad Kritiskt Tänkande för Lärare | Guide 2025',
          metaDescription: 'Transformera ditt klassrum med arbetsblad för kritiskt tänkande. Utveckla problemlösningsfärdigheter.',
        },
        no: {
          title: 'Arbeidsark for Kritisk Tenkning for Lærere: Komplett Guide',
          excerpt: 'Oppdag hvordan arbeidsark for kritisk tenkning kan transformere klasserommet ditt og hjelpe elever med å utvikle viktige ferdigheter.',
          content: `# Arbeidsark for Kritisk Tenkning for Lærere

Kritisk tenkning er en av de viktigste ferdighetene som elever kan utvikle.

## Konklusjon

Arbeidsark for kritisk tenkning er uvurderlige verktøy for å utvikle elevers ferdigheter.`,
          metaTitle: 'Arbeidsark Kritisk Tenkning for Lærere | Guide 2025',
          metaDescription: 'Transformer klasserommet ditt med arbeidsark for kritisk tenkning. Utvikle problemløsningsferdigheter.',
        },
        fi: {
          title: 'Kriittisen Ajattelun Työarkit Opettajille: Täydellinen Opas',
          excerpt: 'Tutustu siihen, miten kriittisen ajattelun työarkit voivat muuttaa luokkahuoneesi ja auttaa oppilaita kehittämään tärkeitä taitoja.',
          content: `# Kriittisen Ajattelun Työarkit Opettajille

Kriittinen ajattelu on yksi tärkeimmistä taidoista, joita oppilaat voivat kehittää.

## Johtopäätös

Kriittisen ajattelun työarkit ovat arvokkaita työkaluja oppilaiden taitojen kehittämiseen.`,
          metaTitle: 'Kriittisen Ajattelun Työarkit Opettajille | Opas 2025',
          metaDescription: 'Muuta luokkahuoneesi kriittisen ajattelun työarkeilla. Kehitä ongelmanratkaisutaitoja.',
        },
      },
    },
    {
      slug: 'math-worksheets-elementary-students',
      category: 'mathematics',
      keywords: ['math', 'worksheets', 'elementary', 'students', 'addition', 'subtraction'],
      featuredImage: '/uploads/blog/math-worksheets.jpg',
      status: 'published',
      publishedAt: new Date('2025-01-10'),
      featured: true,
      translations: {
        en: {
          title: 'Effective Math Worksheets for Elementary Students',
          excerpt: 'Learn how to use math worksheets effectively to build strong foundational skills in elementary students.',
          content: `# Effective Math Worksheets for Elementary Students

Math worksheets are essential tools for building foundational mathematical skills. When used correctly, they can significantly improve students' numerical fluency and problem-solving abilities.

## Benefits of Math Worksheets

### 1. Practice Makes Perfect
Regular practice with worksheets helps students master basic operations like addition, subtraction, multiplication, and division.

### 2. Self-Paced Learning
Students can work at their own pace, ensuring they understand concepts before moving forward.

### 3. Immediate Feedback
Worksheets allow for quick assessment and immediate correction of mistakes.

## Types of Math Worksheets

- **Number Recognition**: For early learners
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Word Problems**: Apply math to real-world scenarios
- **Geometry**: Shapes, patterns, and spatial reasoning
- **Fractions and Decimals**: Building advanced concepts

## Best Practices for Using Math Worksheets

1. **Start with Concrete Examples**: Use visual aids before abstract problems
2. **Gradual Difficulty**: Increase complexity as skills improve
3. **Mix Problem Types**: Keep students engaged with variety
4. **Celebrate Progress**: Acknowledge improvements and effort

## Conclusion

Math worksheets, when used thoughtfully, are powerful tools for developing mathematical proficiency in elementary students.`,
          metaTitle: 'Math Worksheets for Elementary Students | Teaching Guide 2025',
          metaDescription: 'Discover effective strategies for using math worksheets with elementary students. Build strong foundational skills in mathematics.',
        },
        de: {
          title: 'Effektive Mathe-Arbeitsblätter für Grundschüler',
          excerpt: 'Erfahren Sie, wie Sie Mathe-Arbeitsblätter effektiv nutzen, um starke grundlegende Fähigkeiten bei Grundschülern aufzubauen.',
          content: `# Effektive Mathe-Arbeitsblätter für Grundschüler

Mathe-Arbeitsblätter sind wesentliche Werkzeuge zum Aufbau mathematischer Grundfähigkeiten.

## Fazit

Mathe-Arbeitsblätter sind leistungsstarke Werkzeuge zur Entwicklung mathematischer Fähigkeiten.`,
          metaTitle: 'Mathe-Arbeitsblätter für Grundschüler | Lehrleitfaden 2025',
          metaDescription: 'Entdecken Sie effektive Strategien für Mathe-Arbeitsblätter. Bauen Sie starke mathematische Grundlagen auf.',
        },
        es: {
          title: 'Hojas de Trabajo de Matemáticas Efectivas para Estudiantes de Primaria',
          excerpt: 'Aprenda a usar hojas de trabajo de matemáticas de manera efectiva para construir habilidades fundamentales sólidas.',
          content: `# Hojas de Trabajo de Matemáticas Efectivas

Las hojas de trabajo de matemáticas son herramientas esenciales.

## Conclusión

Las hojas de trabajo de matemáticas son herramientas poderosas.`,
          metaTitle: 'Hojas de Trabajo de Matemáticas para Primaria | Guía 2025',
          metaDescription: 'Descubra estrategias efectivas para hojas de trabajo de matemáticas. Construya bases matemáticas sólidas.',
        },
        fr: {
          title: 'Feuilles de Travail de Mathématiques Efficaces pour Élèves du Primaire',
          excerpt: 'Apprenez à utiliser efficacement les feuilles de travail de mathématiques pour construire des compétences fondamentales solides.',
          content: `# Feuilles de Travail de Mathématiques Efficaces

Les feuilles de travail de mathématiques sont des outils essentiels.

## Conclusion

Les feuilles de travail de mathématiques sont des outils puissants.`,
          metaTitle: 'Feuilles de Travail de Mathématiques pour Primaire | Guide 2025',
          metaDescription: 'Découvrez des stratégies efficaces pour les feuilles de travail de mathématiques. Construisez des bases solides.',
        },
        it: {
          title: 'Schede di Matematica Efficaci per Studenti Elementari',
          excerpt: 'Scopri come utilizzare efficacemente le schede di matematica per costruire solide competenze fondamentali.',
          content: `# Schede di Matematica Efficaci

Le schede di matematica sono strumenti essenziali.

## Conclusione

Le schede di matematica sono strumenti potenti.`,
          metaTitle: 'Schede di Matematica per Elementari | Guida 2025',
          metaDescription: 'Scopri strategie efficaci per le schede di matematica. Costruisci solide basi matematiche.',
        },
        pt: {
          title: 'Folhas de Trabalho de Matemática Eficazes para Alunos do Ensino Fundamental',
          excerpt: 'Aprenda a usar folhas de trabalho de matemática de forma eficaz para construir habilidades fundamentais sólidas.',
          content: `# Folhas de Trabalho de Matemática Eficazes

As folhas de trabalho de matemática são ferramentas essenciais.

## Conclusão

As folhas de trabalho de matemática são ferramentas poderosas.`,
          metaTitle: 'Folhas de Trabalho de Matemática para Fundamental | Guia 2025',
          metaDescription: 'Descubra estratégias eficazes para folhas de trabalho de matemática. Construa bases matemáticas sólidas.',
        },
        nl: {
          title: 'Effectieve Wiskundewerkbladen voor Basisschoolleerlingen',
          excerpt: 'Leer hoe u wiskundewerkbladen effectief kunt gebruiken om sterke basisvaardigheden op te bouwen.',
          content: `# Effectieve Wiskundewerkbladen

Wiskundewerkbladen zijn essentiële tools.

## Conclusie

Wiskundewerkbladen zijn krachtige tools.`,
          metaTitle: 'Wiskundewerkbladen voor Basisschool | Gids 2025',
          metaDescription: 'Ontdek effectieve strategieën voor wiskundewerkbladen. Bouw sterke wiskundige fundamenten.',
        },
        da: {
          title: 'Effektive Matematikarbejdsark for Grundskoleelever',
          excerpt: 'Lær at bruge matematikarbejdsark effektivt til at opbygge stærke grundlæggende færdigheder.',
          content: `# Effektive Matematikarbejdsark

Matematikarbejdsark er væsentlige værktøjer.

## Konklusion

Matematikarbejdsark er kraftfulde værktøjer.`,
          metaTitle: 'Matematikarbejdsark for Grundskole | Guide 2025',
          metaDescription: 'Oplev effektive strategier for matematikarbejdsark. Byg stærke matematiske fundamenter.',
        },
        sv: {
          title: 'Effektiva Matematikarbetsblad för Grundskoleelever',
          excerpt: 'Lär dig att använda matematikarbetsblad effektivt för att bygga starka grundläggande färdigheter.',
          content: `# Effektiva Matematikarbetsblad

Matematikarbetsblad är väsentliga verktyg.

## Slutsats

Matematikarbetsblad är kraftfulla verktyg.`,
          metaTitle: 'Matematikarbetsblad för Grundskola | Guide 2025',
          metaDescription: 'Upptäck effektiva strategier för matematikarbetsblad. Bygg starka matematiska grunder.',
        },
        no: {
          title: 'Effektive Matematikkarbeidsark for Barneskoleelever',
          excerpt: 'Lær å bruke matematikkarbeidsark effektivt for å bygge sterke grunnleggende ferdigheter.',
          content: `# Effektive Matematikkarbeidsark

Matematikkarbeidsark er essensielle verktøy.

## Konklusjon

Matematikkarbeidsark er kraftige verktøy.`,
          metaTitle: 'Matematikkarbeidsark for Barneskole | Guide 2025',
          metaDescription: 'Oppdag effektive strategier for matematikkarbeidsark. Bygg sterke matematiske grunnlag.',
        },
        fi: {
          title: 'Tehokkaita Matematiikan Työarkkeja Alakoululaisille',
          excerpt: 'Opi käyttämään matematiikan työarkkeja tehokkaasti vahvojen perustaitojen rakentamiseen.',
          content: `# Tehokkaita Matematiikan Työarkkeja

Matematiikan työarkit ovat olennaisia työkaluja.

## Johtopäätös

Matematiikan työarkit ovat tehokkaita työkaluja.`,
          metaTitle: 'Matematiikan Työarkkeja Alakoululle | Opas 2025',
          metaDescription: 'Tutustu tehokkaisiin strategioihin matematiikan työarkeille. Rakenna vahvat matemaattiset perustaidot.',
        },
      },
    },
    {
      slug: 'engaging-reading-comprehension-activities',
      category: 'literacy',
      keywords: ['reading', 'comprehension', 'literacy', 'activities', 'students'],
      featuredImage: '/uploads/blog/reading-comprehension.jpg',
      status: 'published',
      publishedAt: new Date('2025-01-05'),
      featured: false,
      translations: {
        en: {
          title: 'Engaging Reading Comprehension Activities for All Ages',
          excerpt: 'Boost reading comprehension with these proven activities that make reading fun and meaningful for students.',
          content: `# Engaging Reading Comprehension Activities for All Ages

Reading comprehension is the cornerstone of literacy. It's not enough for students to simply decode words; they must understand, interpret, and engage with the text.

## Why Reading Comprehension Matters

Strong reading comprehension skills enable students to:
- Understand complex texts
- Make inferences and predictions
- Connect ideas across different sources
- Think critically about what they read

## Effective Activities

### 1. Story Mapping
Students create visual representations of story elements including characters, setting, problem, and solution.

### 2. Question Generation
Instead of answering questions, students create their own questions about the text, promoting deeper engagement.

### 3. Think-Pair-Share
Students think about a question, discuss with a partner, then share with the class.

### 4. Literature Circles
Small groups discuss assigned roles and perspectives on the reading.

## Conclusion

By incorporating diverse reading comprehension activities, we help students become confident, critical readers.`,
          metaTitle: 'Reading Comprehension Activities | Boost Literacy Skills 2025',
          metaDescription: 'Discover engaging reading comprehension activities for all ages. Proven strategies to make reading fun and meaningful for students.',
        },
        de: {
          title: 'Ansprechende Leseverständnis-Aktivitäten für Alle Altersgruppen',
          excerpt: 'Steigern Sie das Leseverständnis mit diesen bewährten Aktivitäten, die das Lesen für Schüler unterhaltsam und bedeutungsvoll machen.',
          content: `# Ansprechende Leseverständnis-Aktivitäten

Leseverständnis ist der Grundstein der Alphabetisierung.

## Fazit

Durch die Einbeziehung verschiedener Leseverständnis-Aktivitäten helfen wir Schülern.`,
          metaTitle: 'Leseverständnis-Aktivitäten | Lese-Fähigkeiten Steigern 2025',
          metaDescription: 'Entdecken Sie ansprechende Leseverständnis-Aktivitäten. Bewährte Strategien für unterhaltsames Lesen.',
        },
        es: {
          title: 'Actividades Atractivas de Comprensión Lectora para Todas las Edades',
          excerpt: 'Mejore la comprensión lectora con estas actividades probadas que hacen la lectura divertida y significativa.',
          content: `# Actividades Atractivas de Comprensión Lectora

La comprensión lectora es la piedra angular de la alfabetización.

## Conclusión

Al incorporar diversas actividades de comprensión lectora, ayudamos a los estudiantes.`,
          metaTitle: 'Actividades de Comprensión Lectora | Mejorar Alfabetización 2025',
          metaDescription: 'Descubra actividades atractivas de comprensión lectora. Estrategias probadas para hacer la lectura divertida.',
        },
        fr: {
          title: 'Activités Engageantes de Compréhension de Lecture pour Tous les Âges',
          excerpt: 'Améliorez la compréhension de lecture avec ces activités éprouvées qui rendent la lecture amusante et significative.',
          content: `# Activités Engageantes de Compréhension de Lecture

La compréhension de lecture est la pierre angulaire de l'alphabétisation.

## Conclusion

En incorporant diverses activités de compréhension de lecture, nous aidons les élèves.`,
          metaTitle: 'Activités de Compréhension de Lecture | Améliorer Alphabétisation 2025',
          metaDescription: 'Découvrez des activités engageantes de compréhension de lecture. Stratégies éprouvées pour rendre la lecture amusante.',
        },
        it: {
          title: 'Attività Coinvolgenti di Comprensione della Lettura per Tutte le Età',
          excerpt: 'Migliora la comprensione della lettura con queste attività comprovate che rendono la lettura divertente e significativa.',
          content: `# Attività Coinvolgenti di Comprensione della Lettura

La comprensione della lettura è la pietra miliare dell'alfabetizzazione.

## Conclusione

Incorporando diverse attività di comprensione della lettura, aiutiamo gli studenti.`,
          metaTitle: 'Attività di Comprensione della Lettura | Migliorare Alfabetizzazione 2025',
          metaDescription: 'Scopri attività coinvolgenti di comprensione della lettura. Strategie comprovate per rendere la lettura divertente.',
        },
        pt: {
          title: 'Atividades Envolventes de Compreensão de Leitura para Todas as Idades',
          excerpt: 'Melhore a compreensão de leitura com estas atividades comprovadas que tornam a leitura divertida e significativa.',
          content: `# Atividades Envolventes de Compreensão de Leitura

A compreensão de leitura é a pedra angular da alfabetização.

## Conclusão

Ao incorporar diversas atividades de compreensão de leitura, ajudamos os alunos.`,
          metaTitle: 'Atividades de Compreensão de Leitura | Melhorar Alfabetização 2025',
          metaDescription: 'Descubra atividades envolventes de compreensão de leitura. Estratégias comprovadas para tornar a leitura divertida.',
        },
        nl: {
          title: 'Boeiende Leesbegrip Activiteiten voor Alle Leeftijden',
          excerpt: 'Verbeter leesbegrip met deze bewezen activiteiten die lezen leuk en betekenisvol maken.',
          content: `# Boeiende Leesbegrip Activiteiten

Leesbegrip is de hoeksteen van geletterdheid.

## Conclusie

Door diverse leesbegrip activiteiten op te nemen, helpen we studenten.`,
          metaTitle: 'Leesbegrip Activiteiten | Geletterdheid Verbeteren 2025',
          metaDescription: 'Ontdek boeiende leesbegrip activiteiten. Bewezen strategieën om lezen leuk te maken.',
        },
        da: {
          title: 'Engagerende Læseforståelsesaktiviteter for Alle Aldre',
          excerpt: 'Forbedre læseforståelsen med disse dokumenterede aktiviteter, der gør læsning sjov og meningsfuld.',
          content: `# Engagerende Læseforståelsesaktiviteter

Læseforståelse er hjørnestenen i læsefærdigheder.

## Konklusion

Ved at inkorporere forskellige læseforståelsesaktiviteter hjælper vi elever.`,
          metaTitle: 'Læseforståelsesaktiviteter | Forbedre Læsefærdigheder 2025',
          metaDescription: 'Oplev engagerende læseforståelsesaktiviteter. Dokumenterede strategier til at gøre læsning sjov.',
        },
        sv: {
          title: 'Engagerande Läsförståelseaktiviteter för Alla Åldrar',
          excerpt: 'Förbättra läsförståelsen med dessa beprövade aktiviteter som gör läsning rolig och meningsfull.',
          content: `# Engagerande Läsförståelseaktiviteter

Läsförståelse är hörnstenen i läskunnighet.

## Slutsats

Genom att införliva olika läsförståelseaktiviteter hjälper vi elever.`,
          metaTitle: 'Läsförståelseaktiviteter | Förbättra Läskunnighet 2025',
          metaDescription: 'Upptäck engagerande läsförståelseaktiviteter. Beprövade strategier för att göra läsning rolig.',
        },
        no: {
          title: 'Engasjerende Leseforståelsesaktiviteter for Alle Aldre',
          excerpt: 'Forbedre leseforståelsen med disse dokumenterte aktivitetene som gjør lesing morsomt og meningsfullt.',
          content: `# Engasjerende Leseforståelsesaktiviteter

Leseforståelse er hjørnesteinen i leseferdigheter.

## Konklusjon

Ved å inkorporere ulike leseforståelsesaktiviteter hjelper vi elever.`,
          metaTitle: 'Leseforståelsesaktiviteter | Forbedre Leseferdigheter 2025',
          metaDescription: 'Oppdag engasjerende leseforståelsesaktiviteter. Dokumenterte strategier for å gjøre lesing morsomt.',
        },
        fi: {
          title: 'Mielenkiintoisia Luetun Ymmärtämisen Aktiviteetteja Kaikille Ikäryhmille',
          excerpt: 'Paranna luetun ymmärtämistä näillä todistetuilla aktiviteeteilla, jotka tekevät lukemisesta hauskaa ja merkityksellistä.',
          content: `# Mielenkiintoisia Luetun Ymmärtämisen Aktiviteetteja

Luetun ymmärtäminen on lukutaidon kulmakivi.

## Johtopäätös

Sisällyttämällä erilaisia luetun ymmärtämisen aktiviteetteja autamme oppilaita.`,
          metaTitle: 'Luetun Ymmärtämisen Aktiviteetteja | Parantaa Lukutaitoa 2025',
          metaDescription: 'Tutustu mielenkiintoisiin luetun ymmärtämisen aktiviteetteihin. Todistettuja strategioita lukemisen tekemiseksi hauskaksi.',
        },
      },
    },
  ];

  // Create blog posts
  for (const post of blogPosts) {
    const createdPost = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        authorId: admin.id,
        slug: post.slug,
        translations: post.translations,
        category: post.category,
        keywords: post.keywords,
        featuredImage: post.featuredImage,
        status: post.status,
        publishedAt: post.publishedAt,
        featured: post.featured,
      },
    });
    console.log(`✅ Created blog post: ${post.slug}`);
  }

  console.log('✅ Blog posts seeded successfully!');
}
