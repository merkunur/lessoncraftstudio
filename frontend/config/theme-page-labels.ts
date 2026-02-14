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
