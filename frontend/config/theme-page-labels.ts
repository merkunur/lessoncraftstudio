/**
 * Centralized UI labels for theme and grade worksheet pages.
 * All 11 locales: en, de, fr, es, pt, it, nl, sv, da, no, fi
 */

type LocaleLabels = Record<string, string>;

// ── Shared labels (used by both theme and grade pages) ──────────

export const worksheetsLabel: LocaleLabels = {
  en: 'Worksheets',
  de: 'Arbeitsbl\u00e4tter',
  fr: 'Fiches',
  es: 'Fichas',
  pt: 'Atividades',
  it: 'Schede',
  nl: 'Werkbladen',
  sv: 'Arbetsblad',
  da: 'Arbejdsark',
  no: 'Arbeidsark',
  fi: 'Ty\u00f6lehdet',
};

export const tryNowLabel: LocaleLabels = {
  en: 'Create Now',
  de: 'Jetzt erstellen',
  fr: 'Cr\u00e9er',
  es: 'Crear ahora',
  pt: 'Criar agora',
  it: 'Crea ora',
  nl: 'Nu maken',
  sv: 'Skapa nu',
  da: 'Opret nu',
  no: 'Lag n\u00e5',
  fi: 'Luo nyt',
};

export const faqHeading: LocaleLabels = {
  en: 'Frequently Asked Questions',
  de: 'H\u00e4ufig gestellte Fragen',
  fr: 'Questions fr\u00e9quentes',
  es: 'Preguntas frecuentes',
  pt: 'Perguntas frequentes',
  it: 'Domande frequenti',
  nl: 'Veelgestelde vragen',
  sv: 'Vanliga fr\u00e5gor',
  da: 'Ofte stillede sp\u00f8rgsm\u00e5l',
  no: 'Ofte stilte sp\u00f8rsm\u00e5l',
  fi: 'Usein kysytyt kysymykset',
};

// ── Theme page labels ───────────────────────────────────────────

export const relatedThemesLabel: LocaleLabels = {
  en: 'Related Themes',
  de: 'Verwandte Themen',
  fr: 'Th\u00e8mes associ\u00e9s',
  es: 'Temas relacionados',
  pt: 'Temas relacionados',
  it: 'Temi correlati',
  nl: 'Gerelateerde thema\u2019s',
  sv: 'Relaterade teman',
  da: 'Relaterede temaer',
  no: 'Relaterte temaer',
  fi: 'Aiheeseen liittyv\u00e4t teemat',
};

export const viewAllAppsLabel: LocaleLabels = {
  en: 'View All 33 Apps',
  de: 'Alle 33 Apps ansehen',
  fr: 'Voir les 33 applications',
  es: 'Ver las 33 aplicaciones',
  pt: 'Ver todos os 33 aplicativos',
  it: 'Vedi tutte le 33 app',
  nl: 'Bekijk alle 33 apps',
  sv: 'Visa alla 33 appar',
  da: 'Se alle 33 apps',
  no: 'Se alle 33 apper',
  fi: 'N\u00e4yt\u00e4 kaikki 33 sovellusta',
};

// ── Grade page labels ───────────────────────────────────────────

export const otherGradesLabel: LocaleLabels = {
  en: 'Other Grade Levels',
  de: 'Andere Klassenstufen',
  fr: 'Autres niveaux',
  es: 'Otros grados',
  pt: 'Outros n\u00edveis',
  it: 'Altri livelli',
  nl: 'Andere niveaus',
  sv: 'Andra \u00e5rskurser',
  da: 'Andre klassetrin',
  no: 'Andre klassetrinn',
  fi: 'Muut luokka-asteet',
};

export const otherThemesLabel: LocaleLabels = {
  en: 'More Themes',
  de: 'Weitere Themen',
  fr: 'Autres th\u00e8mes',
  es: 'M\u00e1s temas',
  pt: 'Mais temas',
  it: 'Altri temi',
  nl: 'Meer thema\u2019s',
  sv: 'Fler teman',
  da: 'Flere temaer',
  no: 'Flere temaer',
  fi: 'Lis\u00e4\u00e4 teemoja',
};

// ── Enriched section headings ───────────────────────────────────
// sectionEducationalOverview uses {themeName} placeholder — call .replace('{themeName}', name)

export const sectionEducationalOverview: LocaleLabels = {
  en: 'Why {themeName} Worksheets Work',
  de: 'Warum {themeName}-Arbeitsbl\u00e4tter funktionieren',
  fr: 'Pourquoi les fiches {themeName} fonctionnent',
  es: 'Por qu\u00e9 funcionan las fichas de {themeName}',
  pt: 'Por que as atividades de {themeName} funcionam',
  it: 'Perch\u00e9 le schede {themeName} funzionano',
  nl: 'Waarom {themeName}-werkbladen werken',
  sv: 'Varf\u00f6r {themeName}-arbetsblad fungerar',
  da: 'Hvorfor {themeName}-arbejdsark virker',
  no: 'Hvorfor {themeName}-arbeidsark fungerer',
  fi: 'Miksi {themeName}-ty\u00f6lehdet toimivat',
};

export const sectionParentGuide: LocaleLabels = {
  en: 'A Guide for Parents',
  de: 'Ein Leitfaden f\u00fcr Eltern',
  fr: 'Un guide pour les parents',
  es: 'Una gu\u00eda para padres',
  pt: 'Um guia para pais',
  it: 'Una guida per i genitori',
  nl: 'Een gids voor ouders',
  sv: 'En guide f\u00f6r f\u00f6r\u00e4ldrar',
  da: 'En guide til for\u00e6ldre',
  no: 'En guide for foreldre',
  fi: 'Opas vanhemmille',
};

export const sectionTeachingTips: LocaleLabels = {
  en: 'Teaching Tips',
  de: 'Unterrichtstipps',
  fr: 'Conseils p\u00e9dagogiques',
  es: 'Consejos did\u00e1cticos',
  pt: 'Dicas de ensino',
  it: 'Consigli didattici',
  nl: 'Onderwijstips',
  sv: 'Undervisningstips',
  da: 'Undervisningstips',
  no: 'Undervisningstips',
  fi: 'Opetusvinkkej\u00e4',
};

export const sectionActivities: LocaleLabels = {
  en: 'Hands-On Activities',
  de: 'Praktische Aktivit\u00e4ten',
  fr: 'Activit\u00e9s pratiques',
  es: 'Actividades pr\u00e1cticas',
  pt: 'Atividades pr\u00e1ticas',
  it: 'Attivit\u00e0 pratiche',
  nl: 'Praktische activiteiten',
  sv: 'Praktiska aktiviteter',
  da: 'Praktiske aktiviteter',
  no: 'Praktiske aktiviteter',
  fi: 'K\u00e4yt\u00e4nn\u00f6n aktiviteetit',
};

export const sectionLearningObjectives: LocaleLabels = {
  en: 'Learning Objectives',
  de: 'Lernziele',
  fr: "Objectifs d'apprentissage",
  es: 'Objetivos de aprendizaje',
  pt: 'Objetivos de aprendizagem',
  it: 'Obiettivi di apprendimento',
  nl: 'Leerdoelen',
  sv: 'L\u00e4randem\u00e5l',
  da: 'L\u00e6ringsm\u00e5l',
  no: 'L\u00e6ringsm\u00e5l',
  fi: 'Oppimistavoitteet',
};

export const sectionCurriculumAlignment: LocaleLabels = {
  en: 'Curriculum Alignment',
  de: 'Lehrplanausrichtung',
  fr: 'Alignement au programme',
  es: 'Alineaci\u00f3n curricular',
  pt: 'Alinhamento curricular',
  it: 'Allineamento al programma',
  nl: 'Aansluiting bij het leerplan',
  sv: 'L\u00e4roplansanpassning',
  da: 'L\u00e6replanstilpasning',
  no: 'L\u00e6replanstilpasning',
  fi: 'Opetussuunnitelman mukaisuus',
};

export const sectionSamplePreviews: LocaleLabels = {
  en: 'See These Images on Your Worksheets',
  de: 'Sehen Sie diese Bilder auf Ihren Arbeitsbl\u00e4ttern',
  fr: 'D\u00e9couvrez ces images sur vos fiches',
  es: 'Vea estas im\u00e1genes en sus fichas',
  pt: 'Veja estas imagens nas suas atividades',
  it: 'Scopri queste immagini nelle tue schede',
  nl: 'Bekijk deze afbeeldingen op uw werkbladen',
  sv: 'Se dessa bilder p\u00e5 dina arbetsblad',
  da: 'Se disse billeder p\u00e5 dine arbejdsark',
  no: 'Se disse bildene p\u00e5 dine arbeidsark',
  fi: 'Katso n\u00e4m\u00e4 kuvat ty\u00f6lehdill\u00e4si',
};

export const labelDevelopmentalNotes: LocaleLabels = {
  en: 'Developmental Notes',
  de: 'Entwicklungshinweise',
  fr: 'Notes de d\u00e9veloppement',
  es: 'Notas de desarrollo',
  pt: 'Notas de desenvolvimento',
  it: 'Note sullo sviluppo',
  nl: 'Ontwikkelingsnotities',
  sv: 'Utvecklingsnoteringar',
  da: 'Udviklingsnoter',
  no: 'Utviklingsnotater',
  fi: 'Kehitysmuistiinpanot',
};

// ── Card sub-element labels ─────────────────────────────────────

export const labelMaterials: LocaleLabels = {
  en: 'Materials',
  de: 'Materialien',
  fr: 'Mat\u00e9riel',
  es: 'Materiales',
  pt: 'Materiais',
  it: 'Materiali',
  nl: 'Materialen',
  sv: 'Material',
  da: 'Materialer',
  no: 'Materialer',
  fi: 'Materiaalit',
};

export const labelSkills: LocaleLabels = {
  en: 'Skills',
  de: 'F\u00e4higkeiten',
  fr: 'Comp\u00e9tences',
  es: 'Habilidades',
  pt: 'Habilidades',
  it: 'Competenze',
  nl: 'Vaardigheden',
  sv: 'F\u00e4rdigheter',
  da: 'F\u00e6rdigheder',
  no: 'Ferdigheter',
  fi: 'Taidot',
};

export const labelDuration: LocaleLabels = {
  en: 'Duration',
  de: 'Dauer',
  fr: 'Dur\u00e9e',
  es: 'Duraci\u00f3n',
  pt: 'Dura\u00e7\u00e3o',
  it: 'Durata',
  nl: 'Duur',
  sv: 'L\u00e4ngd',
  da: 'Varighed',
  no: 'Varighet',
  fi: 'Kesto',
};

// ── Audience labels ─────────────────────────────────────────────

export const audienceTeacher: LocaleLabels = {
  en: 'Teachers',
  de: 'Lehrer',
  fr: 'Enseignants',
  es: 'Profesores',
  pt: 'Professores',
  it: 'Insegnanti',
  nl: 'Docenten',
  sv: 'L\u00e4rare',
  da: 'L\u00e6rere',
  no: 'L\u00e6rere',
  fi: 'Opettajat',
};

export const audienceParent: LocaleLabels = {
  en: 'Parents',
  de: 'Eltern',
  fr: 'Parents',
  es: 'Padres',
  pt: 'Pais',
  it: 'Genitori',
  nl: 'Ouders',
  sv: 'F\u00f6r\u00e4ldrar',
  da: 'For\u00e6ldre',
  no: 'Foreldre',
  fi: 'Vanhemmat',
};

export const audienceBoth: LocaleLabels = {
  en: 'Everyone',
  de: 'Alle',
  fr: 'Tous',
  es: 'Todos',
  pt: 'Todos',
  it: 'Tutti',
  nl: 'Iedereen',
  sv: 'Alla',
  da: 'Alle',
  no: 'Alle',
  fi: 'Kaikille',
};

// ── App category labels ─────────────────────────────────────────

export const categoryMath: LocaleLabels = {
  en: 'Math Apps',
  de: 'Mathe-Apps',
  fr: 'Applications de maths',
  es: 'Apps de matem\u00e1ticas',
  pt: 'Apps de matem\u00e1tica',
  it: 'App di matematica',
  nl: 'Reken-apps',
  sv: 'Matteappar',
  da: 'Matteapps',
  no: 'Matteapper',
  fi: 'Matematiikkasovellukset',
};

export const categoryLiteracy: LocaleLabels = {
  en: 'Literacy Apps',
  de: 'Lese-Apps',
  fr: 'Applications de lecture',
  es: 'Apps de lectura',
  pt: 'Apps de leitura',
  it: 'App di lettura',
  nl: 'Taal-apps',
  sv: 'L\u00e4sappar',
  da: 'L\u00e6seapps',
  no: 'Leseapper',
  fi: 'Lukemissovellukset',
};

export const categoryVisual: LocaleLabels = {
  en: 'Visual Arts',
  de: 'Bildende Kunst',
  fr: 'Arts visuels',
  es: 'Artes visuales',
  pt: 'Artes visuais',
  it: 'Arti visive',
  nl: 'Beeldende kunst',
  sv: 'Bildkonst',
  da: 'Billedkunst',
  no: 'Bildekunst',
  fi: 'Kuvataide',
};

export const categoryPuzzles: LocaleLabels = {
  en: 'Puzzles & Logic',
  de: 'R\u00e4tsel & Logik',
  fr: 'Puzzles et logique',
  es: 'Puzzles y l\u00f3gica',
  pt: 'Puzzles e l\u00f3gica',
  it: 'Puzzle e logica',
  nl: 'Puzzels & logica',
  sv: 'Pussel & logik',
  da: 'Puslespil & logik',
  no: 'Puslespill & logikk',
  fi: 'Palapelit ja logiikka',
};

export const categoryFeatured: LocaleLabels = {
  en: 'Featured Apps',
  de: 'Empfohlene Apps',
  fr: 'Applications vedettes',
  es: 'Apps destacadas',
  pt: 'Apps em destaque',
  it: 'App in evidenza',
  nl: 'Uitgelichte apps',
  sv: 'Utvalda appar',
  da: 'Udvalgte apps',
  no: 'Utvalgte apper',
  fi: 'Suositellut sovellukset',
};

export const sectionGradeEducational: LocaleLabels = {
  en: 'What {gradeName} Students Learn with {themeName} Worksheets',
  de: 'Was {gradeName}-Sch\u00fcler mit {themeName}-Arbeitsbl\u00e4ttern lernen',
  fr: 'Ce que les \u00e9l\u00e8ves de {gradeName} apprennent avec les fiches {themeName}',
  es: 'Lo que aprenden los estudiantes de {gradeName} con fichas de {themeName}',
  pt: 'O que alunos do {gradeName} aprendem com atividades de {themeName}',
  it: 'Cosa imparano gli studenti di {gradeName} con le schede {themeName}',
  nl: 'Wat {gradeName}-leerlingen leren met {themeName}-werkbladen',
  sv: 'Vad {gradeName}-elever l\u00e4r sig med {themeName}-arbetsblad',
  da: 'Hvad {gradeName}-elever l\u00e6rer med {themeName}-arbejdsark',
  no: 'Hva {gradeName}-elever l\u00e6rer med {themeName}-arbeidsark',
  fi: 'Mit\u00e4 {gradeName}-oppilaat oppivat {themeName}-ty\u00f6lehdill\u00e4',
};

export const readMoreLabel: LocaleLabels = {
  en: 'Read more',
  de: 'Mehr lesen',
  fr: 'Lire la suite',
  es: 'Leer m\u00e1s',
  pt: 'Ler mais',
  it: 'Leggi di pi\u00f9',
  nl: 'Lees meer',
  sv: 'L\u00e4s mer',
  da: 'L\u00e6s mere',
  no: 'Les mer',
  fi: 'Lue lis\u00e4\u00e4',
};

// ── Grade navigation (theme page → grade pages) ─────────────────

export const exploreByGradeLabel: LocaleLabels = {
  en: 'Explore by Grade Level',
  de: 'Nach Klassenstufe entdecken',
  fr: 'Explorer par niveau',
  es: 'Explorar por grado',
  pt: 'Explorar por n\u00edvel',
  it: 'Esplora per livello',
  nl: 'Ontdek per niveau',
  sv: 'Utforska per \u00e5rskurs',
  da: 'Udforsk efter klassetrin',
  no: 'Utforsk etter klassetrinn',
  fi: 'Tutustu luokka-asteittain',
};

// viewAllGradeAppsLabel uses {gradeName} placeholder — call .replace('{gradeName}', name)
export const viewAllGradeAppsLabel: LocaleLabels = {
  en: 'View all {gradeName} apps',
  de: 'Alle {gradeName}-Apps ansehen',
  fr: 'Voir toutes les apps {gradeName}',
  es: 'Ver todas las apps de {gradeName}',
  pt: 'Ver todos os apps de {gradeName}',
  it: 'Vedi tutte le app {gradeName}',
  nl: 'Bekijk alle {gradeName}-apps',
  sv: 'Visa alla {gradeName}-appar',
  da: 'Se alle {gradeName}-apps',
  no: 'Se alle {gradeName}-apper',
  fi: 'N\u00e4yt\u00e4 kaikki {gradeName}-sovellukset',
};

export const gradeNavDescription: LocaleLabels = {
  en: 'Find age-appropriate {themeName} worksheets for each grade level.',
  de: 'Finden Sie altersgerechte {themeName}-Arbeitsbl\u00e4tter f\u00fcr jede Klassenstufe.',
  fr: 'Trouvez des fiches {themeName} adapt\u00e9es \u00e0 chaque niveau scolaire.',
  es: 'Encuentre fichas de {themeName} apropiadas para cada grado.',
  pt: 'Encontre atividades de {themeName} adequadas para cada n\u00edvel escolar.',
  it: 'Trova schede {themeName} adatte a ogni livello scolastico.',
  nl: 'Vind leeftijdsgeschikte {themeName}-werkbladen voor elk niveau.',
  sv: 'Hitta \u00e5ldersanpassade {themeName}-arbetsblad f\u00f6r varje \u00e5rskurs.',
  da: 'Find alderstilpassede {themeName}-arbejdsark til hvert klassetrin.',
  no: 'Finn alderstilpassede {themeName}-arbeidsark for hvert klassetrinn.',
  fi: 'L\u00f6yd\u00e4 ik\u00e4tasoisia {themeName}-ty\u00f6lehti\u00e4 jokaiselle luokka-asteelle.',
};

// ── SEO content section labels (Part 3) ──────────────────────────
// sectionUniqueAngle uses {themeName} placeholder

export const sectionUniqueAngle: LocaleLabels = {
  en: 'What Makes {themeName} Worksheets Unique',
  de: 'Was {themeName}-Arbeitsbl\u00e4tter einzigartig macht',
  fr: 'Ce qui rend les fiches {themeName} uniques',
  es: 'Lo que hace \u00fanicas las fichas de {themeName}',
  pt: 'O que torna as atividades de {themeName} \u00fanicas',
  it: 'Cosa rende uniche le schede {themeName}',
  nl: 'Wat {themeName}-werkbladen uniek maakt',
  sv: 'Vad som g\u00f6r {themeName}-arbetsblad unika',
  da: 'Hvad der g\u00f8r {themeName}-arbejdsark unikke',
  no: 'Hva som gj\u00f8r {themeName}-arbeidsark unike',
  fi: 'Mik\u00e4 tekee {themeName}-ty\u00f6lehdist\u00e4 ainutlaatuisia',
};

// sectionHowTo uses {themeName} placeholder
export const sectionHowTo: LocaleLabels = {
  en: 'How to Use {themeName} Worksheets',
  de: 'So verwenden Sie {themeName}-Arbeitsbl\u00e4tter',
  fr: 'Comment utiliser les fiches {themeName}',
  es: 'C\u00f3mo usar las fichas de {themeName}',
  pt: 'Como usar as atividades de {themeName}',
  it: 'Come usare le schede {themeName}',
  nl: 'Hoe {themeName}-werkbladen te gebruiken',
  sv: 'Hur man anv\u00e4nder {themeName}-arbetsblad',
  da: 'S\u00e5dan bruger du {themeName}-arbejdsark',
  no: 'Slik bruker du {themeName}-arbeidsark',
  fi: 'N\u00e4in k\u00e4yt\u00e4t {themeName}-ty\u00f6lehti\u00e4',
};

export const sectionExpertInsights: LocaleLabels = {
  en: 'Expert Insights',
  de: 'Experteneinblicke',
  fr: 'Avis d\u2019experts',
  es: 'Opiniones de expertos',
  pt: 'Opini\u00f5es de especialistas',
  it: 'Approfondimenti esperti',
  nl: 'Expertinzichten',
  sv: 'Expertinsikter',
  da: 'Ekspertindsigt',
  no: 'Ekspertinnsikt',
  fi: 'Asiantuntijan\u00e4kemyksi\u00e4',
};

export const labelQuickAnswer: LocaleLabels = {
  en: 'Quick Answer',
  de: 'Schnelle Antwort',
  fr: 'R\u00e9ponse rapide',
  es: 'Respuesta r\u00e1pida',
  pt: 'Resposta r\u00e1pida',
  it: 'Risposta rapida',
  nl: 'Snel antwoord',
  sv: 'Snabbt svar',
  da: 'Hurtigt svar',
  no: 'Raskt svar',
  fi: 'Pikavastaus',
};

export const labelRecommendedApps: LocaleLabels = {
  en: 'Recommended Worksheet Apps',
  de: 'Empfohlene Arbeitsblatt-Apps',
  fr: 'Applications recommand\u00e9es',
  es: 'Apps de fichas recomendadas',
  pt: 'Apps de atividades recomendados',
  it: 'App per schede consigliate',
  nl: 'Aanbevolen werkblad-apps',
  sv: 'Rekommenderade arbetsbladsappar',
  da: 'Anbefalede arbejdsark-apps',
  no: 'Anbefalte arbeidsark-apper',
  fi: 'Suositellut ty\u00f6lehti-sovellukset',
};

export const labelLimitations: LocaleLabels = {
  en: 'When to Consider Other Themes',
  de: 'Wann andere Themen in Betracht kommen',
  fr: 'Quand envisager d\u2019autres th\u00e8mes',
  es: 'Cu\u00e1ndo considerar otros temas',
  pt: 'Quando considerar outros temas',
  it: 'Quando considerare altri temi',
  nl: 'Wanneer andere thema\u2019s overwegen',
  sv: 'N\u00e4r man b\u00f6r \u00f6verv\u00e4ga andra teman',
  da: 'Hvorn\u00e5r man b\u00f8r overveje andre temaer',
  no: 'N\u00e5r man b\u00f8r vurdere andre temaer',
  fi: 'Milloin harkita muita teemoja',
};

export const labelVs: LocaleLabels = {
  en: 'vs',
  de: 'vs.',
  fr: 'vs',
  es: 'vs',
  pt: 'vs',
  it: 'vs',
  nl: 'vs',
  sv: 'vs',
  da: 'vs',
  no: 'vs',
  fi: 'vs',
};

export const labelKeyMilestone: LocaleLabels = {
  en: 'Key Milestone',
  de: 'Wichtiger Meilenstein',
  fr: 'Jalon cl\u00e9',
  es: 'Hito clave',
  pt: 'Marco importante',
  it: 'Traguardo chiave',
  nl: 'Belangrijke mijlpaal',
  sv: 'Viktig milstolpe',
  da: 'Vigtig milep\u00e6l',
  no: 'Viktig milep\u00e6l',
  fi: 'T\u00e4rke\u00e4 virstanpylv\u00e4s',
};

export const labelRecommendedActivities: LocaleLabels = {
  en: 'Recommended Activities',
  de: 'Empfohlene Aktivit\u00e4ten',
  fr: 'Activit\u00e9s recommand\u00e9es',
  es: 'Actividades recomendadas',
  pt: 'Atividades recomendadas',
  it: 'Attivit\u00e0 consigliate',
  nl: 'Aanbevolen activiteiten',
  sv: 'Rekommenderade aktiviteter',
  da: 'Anbefalede aktiviteter',
  no: 'Anbefalte aktiviteter',
  fi: 'Suositellut aktiviteetit',
};

export const labelLearnMore: LocaleLabels = {
  en: 'Learn more below',
  de: 'Mehr erfahren',
  fr: 'En savoir plus ci-dessous',
  es: 'M\u00e1s informaci\u00f3n abajo',
  pt: 'Saiba mais abaixo',
  it: 'Scopri di pi\u00f9 qui sotto',
  nl: 'Lees hieronder meer',
  sv: 'L\u00e4s mer nedan',
  da: 'L\u00e6s mere nedenfor',
  no: 'Les mer nedenfor',
  fi: 'Lue lis\u00e4\u00e4 alta',
};

// ── Cross-theme grade linking labels (Part 11) ─────────────────────────────
// moreGradeWorksheetsLabel uses {gradeName} placeholder

export const moreGradeWorksheetsLabel: LocaleLabels = {
  en: 'More {gradeName} Worksheets',
  de: 'Mehr {gradeName}-Arbeitsbl\u00e4tter',
  fr: 'Plus de fiches {gradeName}',
  es: 'M\u00e1s fichas de {gradeName}',
  pt: 'Mais atividades de {gradeName}',
  it: 'Altre schede {gradeName}',
  nl: 'Meer {gradeName}-werkbladen',
  sv: 'Fler {gradeName}-arbetsblad',
  da: 'Flere {gradeName}-arbejdsark',
  no: 'Flere {gradeName}-arbeidsark',
  fi: 'Lis\u00e4\u00e4 {gradeName}-ty\u00f6lehti\u00e4',
};

export const exploreOtherCategoriesLabel: LocaleLabels = {
  en: 'Explore Other Categories',
  de: 'Andere Kategorien entdecken',
  fr: 'Explorer d\u2019autres cat\u00e9gories',
  es: 'Explorar otras categor\u00edas',
  pt: 'Explorar outras categorias',
  it: 'Esplora altre categorie',
  nl: 'Andere categorie\u00ebn verkennen',
  sv: 'Utforska andra kategorier',
  da: 'Udforsk andre kategorier',
  no: 'Utforsk andre kategorier',
  fi: 'Tutustu muihin kategorioihin',
};

// ── Rich content section headings (Part 12) ─────────────────────────────

export const sectionClassroomScenarios: LocaleLabels = {
  en: 'Real Classroom Scenarios',
  de: 'Echte Unterrichtsszenarien',
  fr: 'Sc\u00e9narios de classe r\u00e9els',
  es: 'Escenarios reales del aula',
  pt: 'Cen\u00e1rios reais de sala de aula',
  it: 'Scenari reali in classe',
  nl: 'Echte klassenscenario\u2019s',
  sv: 'Verkliga klassrumsscenarier',
  da: 'Virkelige undervisningsscenarier',
  no: 'Virkelige klasseromsscenarier',
  fi: 'Aitoja luokkatilanteita',
};

export const sectionQuickStats: LocaleLabels = {
  en: 'Quick Facts',
  de: 'Kurzfakten',
  fr: 'Faits en bref',
  es: 'Datos r\u00e1pidos',
  pt: 'Fatos r\u00e1pidos',
  it: 'Fatti rapidi',
  nl: 'Snelle feiten',
  sv: 'Snabba fakta',
  da: 'Hurtige fakta',
  no: 'Raske fakta',
  fi: 'Pikatietoja',
};

export const sectionDifferentiation: LocaleLabels = {
  en: 'Strategies for Diverse Learners',
  de: 'Strategien f\u00fcr unterschiedliche Lernende',
  fr: 'Strat\u00e9gies pour les apprenants divers',
  es: 'Estrategias para diversos aprendices',
  pt: 'Estrat\u00e9gias para alunos diversos',
  it: 'Strategie per studenti diversi',
  nl: 'Strategie\u00ebn voor diverse leerlingen',
  sv: 'Strategier f\u00f6r olika elever',
  da: 'Strategier for forskellige elever',
  no: 'Strategier for ulike elever',
  fi: 'Strategioita erilaisille oppijoille',
};

export const sectionAssessment: LocaleLabels = {
  en: 'Assessment Ideas',
  de: 'Bewertungsideen',
  fr: 'Id\u00e9es d\u2019\u00e9valuation',
  es: 'Ideas de evaluaci\u00f3n',
  pt: 'Ideias de avalia\u00e7\u00e3o',
  it: 'Idee di valutazione',
  nl: 'Beoordelingsidee\u00ebn',
  sv: 'Bed\u00f6mningsid\u00e9er',
  da: 'Vurderingsideer',
  no: 'Vurderingsideer',
  fi: 'Arviointiideoita',
};

export const sectionCrossCurricular: LocaleLabels = {
  en: 'Cross-Curricular Connections',
  de: 'F\u00e4cher\u00fcbergreifende Verbindungen',
  fr: 'Connexions interdisciplinaires',
  es: 'Conexiones interdisciplinarias',
  pt: 'Conex\u00f5es interdisciplinares',
  it: 'Connessioni interdisciplinari',
  nl: 'Vakoverschrijdende verbindingen',
  sv: '\u00c4mnes\u00f6vergripande kopplingar',
  da: 'Tv\u00e6rfaglige forbindelser',
  no: 'Tverrfaglige forbindelser',
  fi: 'Oppiainerajat ylitt\u00e4v\u00e4t yhteydet',
};

export const labelEmerging: LocaleLabels = {
  en: 'Emerging',
  de: 'Anf\u00e4nger',
  fr: 'D\u00e9butant',
  es: 'Emergente',
  pt: 'Emergente',
  it: 'Emergente',
  nl: 'Beginnend',
  sv: 'Begynnande',
  da: 'Begyndende',
  no: 'Begynnende',
  fi: 'Kehittyv\u00e4',
};

export const labelProficient: LocaleLabels = {
  en: 'Proficient',
  de: 'Kompetent',
  fr: 'Comp\u00e9tent',
  es: 'Competente',
  pt: 'Proficiente',
  it: 'Competente',
  nl: 'Bekwaam',
  sv: 'Skicklig',
  da: 'Kompetent',
  no: 'Kompetent',
  fi: 'Taitava',
};

export const labelAdvanced: LocaleLabels = {
  en: 'Advanced',
  de: 'Fortgeschritten',
  fr: 'Avanc\u00e9',
  es: 'Avanzado',
  pt: 'Avan\u00e7ado',
  it: 'Avanzato',
  nl: 'Gevorderd',
  sv: 'Avancerad',
  da: 'Avanceret',
  no: 'Avansert',
  fi: 'Edistynyt',
};
