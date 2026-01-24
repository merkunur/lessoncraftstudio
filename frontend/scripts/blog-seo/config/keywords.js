/**
 * Blog SEO Keywords Configuration
 *
 * Universal Keywords: 7 per language (must appear 10+ times each)
 * Local Keywords: 10 per language (must appear 10+ times each)
 *
 * Total: 17 keywords per language, 200+ keyword instances per translation
 */

const UNIVERSAL_KEYWORDS = {
  en: [
    'Free worksheet',
    'Free worksheet for kids',
    'Free worksheets',
    'Free printables',
    'Worksheet for kids',
    'Worksheet for kindergarten',
    'Worksheet'
  ],
  de: [
    'Kostenloses Arbeitsblatt',
    'Kostenloses Arbeitsblatt für Kinder',
    'Kostenlose Arbeitsblätter',
    'Kostenlose Druckvorlagen',
    'Arbeitsblatt für Kinder',
    'Arbeitsblatt für Vorschule',
    'Arbeitsblatt'
  ],
  fr: [
    'Fiche gratuite',
    'Fiche gratuite pour enfants',
    'Fiches gratuites',
    'Imprimables gratuits',
    'Fiche pour enfants',
    'Fiche pour maternelle',
    'Fiche'
  ],
  es: [
    'Ficha gratis',
    'Ficha gratis para niños',
    'Fichas gratis',
    'Imprimibles gratis',
    'Ficha para niños',
    'Ficha para preescolar',
    'Ficha'
  ],
  pt: [
    'Atividade grátis',
    'Atividade grátis para crianças',
    'Atividades grátis',
    'Imprimíveis grátis',
    'Atividade para crianças',
    'Atividade para educação infantil',
    'Atividade'
  ],
  it: [
    'Scheda gratuita',
    'Scheda gratuita per bambini',
    'Schede gratuite',
    'Stampabili gratuiti',
    'Scheda per bambini',
    'Scheda per scuola dell\'infanzia',
    'Scheda'
  ],
  nl: [
    'Gratis werkblad',
    'Gratis werkblad voor kinderen',
    'Gratis werkbladen',
    'Gratis printables',
    'Werkblad voor kinderen',
    'Werkblad voor kleuters',
    'Werkblad'
  ],
  sv: [
    'Gratis arbetsblad',
    'Gratis arbetsblad för barn',
    'Gratis arbetsblad',
    'Gratis utskrifter',
    'Arbetsblad för barn',
    'Arbetsblad för förskoleklass',
    'Arbetsblad'
  ],
  da: [
    'Gratis arbejdsark',
    'Gratis arbejdsark til børn',
    'Gratis arbejdsark',
    'Gratis printables',
    'Arbejdsark til børn',
    'Arbejdsark til børnehaveklasse',
    'Arbejdsark'
  ],
  no: [
    'Gratis arbeidsark',
    'Gratis arbeidsark for barn',
    'Gratis arbeidsark',
    'Gratis utskrifter',
    'Arbeidsark for barn',
    'Arbeidsark for 1. trinn',
    'Arbeidsark'
  ],
  fi: [
    'Ilmainen työarkki',
    'Ilmainen työarkki lapsille',
    'Ilmaiset työarkit',
    'Ilmaiset tulosteet',
    'Työarkki lapsille',
    'Työarkki esiopetukseen',
    'Työarkki'
  ]
};

const LOCAL_KEYWORDS = {
  en: [
    'Kindergarten worksheets',
    'Math worksheets',
    'Sight words worksheets',
    'Phonics worksheets',
    'Alphabet worksheets',
    'Addition worksheets',
    'Tracing worksheets',
    'Free printable worksheets',
    'Coloring worksheets',
    'First grade worksheets'
  ],
  de: [
    'Arbeitsblätter Grundschule',
    'Mathe Arbeitsblätter',
    'Vorschule Arbeitsblätter',
    'Einmaleins',
    'Schwungübungen',
    'Buchstaben lernen',
    'Ausmalbilder',
    'Kostenlose Arbeitsblätter',
    'Rechnen lernen',
    'Deutsch Arbeitsblätter'
  ],
  fr: [
    'Fiches maternelle',
    'Exercices CP',
    'Graphisme maternelle',
    'Coloriage',
    'Apprendre à lire',
    'Exercices maths',
    'Alphabet',
    'Tables de multiplication',
    'Fiches à imprimer gratuit',
    'Écriture cursive'
  ],
  es: [
    'Fichas para imprimir',
    'Fichas infantil',
    'Grafomotricidad',
    'Lectoescritura',
    'Ejercicios matemáticas',
    'Colorear',
    'Abecedario',
    'Números',
    'Tablas de multiplicar',
    'Material educativo gratis'
  ],
  pt: [
    'Atividades para imprimir',
    'Atividades de alfabetização',
    'Atividades educação infantil',
    'Atividades de matemática',
    'Coordenação motora',
    'Desenhos para colorir',
    'Atividades vogais',
    'Letra cursiva',
    'Atividades 1º ano',
    'Tabuada'
  ],
  it: [
    'Schede didattiche',
    'Schede didattiche scuola primaria',
    'Pregrafismo',
    'Schede matematica',
    'Disegni da colorare',
    'Tabelline',
    'Alfabeto',
    'Schede italiano classe prima',
    'Scuola dell\'infanzia',
    'Numeri da stampare'
  ],
  nl: [
    'Werkbladen groep 3',
    'Werkbladen kleuters',
    'Rekenen werkbladen',
    'Kleurplaten',
    'Letters leren',
    'Oefenbladen gratis',
    'Tafels oefenen',
    'Veilig leren lezen',
    'Fijne motoriek',
    'Sommen tot 20'
  ],
  sv: [
    'Arbetsblad gratis',
    'Målarbilder barn',
    'Bokstäver lära sig',
    'Matematik arbetsblad',
    'Multiplikationstabellen',
    'Siffror och tal',
    'Finmotorik övningar',
    'Klockan lära sig',
    'Förskoleklass material',
    'Addition och subtraktion'
  ],
  da: [
    'Opgaver til print',
    'Matematikopgaver',
    'Lære bogstaver',
    'Malebog',
    'Arbejdsark',
    'Finmotorik øvelser',
    '0. klasse opgaver',
    'Gangetabeller',
    'Læse og skrive',
    'Gratis skoleopgaver'
  ],
  no: [
    'Arbeidsark gratis',
    'Fargeleggingsbilder barn',
    'Bokstaver lære skrive',
    'Matematikk oppgaver',
    'Gangetabellen',
    'Tall og telling',
    'Finmotorikk øvelser',
    'Addisjon og subtraksjon',
    'Oppgavehefter barn',
    'Lesetrening'
  ],
  fi: [
    'Tulostettavat tehtävät lapsille ilmainen',
    'Värityskuvia lapsille tulostettava',
    'Kirjaimet harjoittelu esikoulu',
    'Matematiikka tehtävät alakoulu',
    'Kertotaulut tulostettava',
    'Yhteenlasku ja vähennyslasku tehtävät',
    'Hienomotoriikka harjoitukset',
    'Pisteestä pisteeseen tehtävät',
    'Esiopetus materiaali ilmainen',
    'Lukemaan oppiminen tehtävät'
  ]
};

const META_TEMPLATES = {
  en: {
    titleTemplate: '{topic} Free Worksheets | Printable Activities - LessonCraftStudio',
    descriptionTemplate: 'Download free {topic} worksheets for kindergarten and first grade. Professional printables for teachers and parents. Create custom worksheets instantly!',
    focusKeywordTemplate: 'free {topic} worksheets'
  },
  de: {
    titleTemplate: '{topic} Kostenlose Arbeitsblätter | Übungen - LessonCraftStudio',
    descriptionTemplate: 'Laden Sie kostenlose {topic} Arbeitsblätter für Vorschule und Grundschule herunter. Professionelle Druckvorlagen für Lehrer und Eltern. Sofort erstellen!',
    focusKeywordTemplate: 'kostenlose {topic} arbeitsblätter'
  },
  fr: {
    titleTemplate: '{topic} Fiches Gratuites | Activités Enfants - LessonCraftStudio',
    descriptionTemplate: 'Téléchargez des fiches gratuites de {topic} pour maternelle et CP. Imprimables professionnels pour enseignants et parents. Créez instantanément!',
    focusKeywordTemplate: 'fiches gratuites {topic}'
  },
  es: {
    titleTemplate: '{topic} Fichas Gratis | Actividades Niños - LessonCraftStudio',
    descriptionTemplate: 'Descarga fichas gratis de {topic} para preescolar y primaria. Material educativo profesional para maestros y padres. ¡Crea fichas al instante!',
    focusKeywordTemplate: 'fichas gratis de {topic}'
  },
  pt: {
    titleTemplate: '{topic} Atividades Grátis | Para Crianças - LessonCraftStudio',
    descriptionTemplate: 'Baixe atividades grátis de {topic} para educação infantil. Material profissional para professores e pais. Crie atividades personalizadas!',
    focusKeywordTemplate: 'atividades grátis de {topic}'
  },
  it: {
    titleTemplate: '{topic} Schede Gratuite | Attività Bambini - LessonCraftStudio',
    descriptionTemplate: 'Scarica schede gratuite di {topic} per scuola dell\'infanzia e primaria. Materiale professionale per insegnanti e genitori. Crea subito!',
    focusKeywordTemplate: 'schede gratuite {topic}'
  },
  nl: {
    titleTemplate: '{topic} Gratis Werkbladen | Activiteiten Kinderen - LessonCraftStudio',
    descriptionTemplate: 'Download gratis {topic} werkbladen voor kleuters en basisschool. Professioneel materiaal voor leerkrachten en ouders. Direct maken!',
    focusKeywordTemplate: 'gratis {topic} werkbladen'
  },
  sv: {
    titleTemplate: '{topic} Gratis Arbetsblad | Övningar Barn - LessonCraftStudio',
    descriptionTemplate: 'Ladda ner gratis {topic} arbetsblad för förskola och lågstadiet. Professionellt material för lärare och föräldrar. Skapa direkt!',
    focusKeywordTemplate: 'gratis {topic} arbetsblad'
  },
  da: {
    titleTemplate: '{topic} Gratis Arbejdsark | Aktiviteter Børn - LessonCraftStudio',
    descriptionTemplate: 'Download gratis {topic} arbejdsark til børnehave og indskoling. Professionelt materiale til lærere og forældre. Lav med det samme!',
    focusKeywordTemplate: 'gratis {topic} arbejdsark'
  },
  no: {
    titleTemplate: '{topic} Gratis Arbeidsark | Aktiviteter Barn - LessonCraftStudio',
    descriptionTemplate: 'Last ned gratis {topic} arbeidsark for barnehage og barneskole. Profesjonelt materiale for lærere og foreldre. Lag med en gang!',
    focusKeywordTemplate: 'gratis {topic} arbeidsark'
  },
  fi: {
    titleTemplate: '{topic} Ilmaiset Työarkit | Tehtävät Lapsille - LessonCraftStudio',
    descriptionTemplate: 'Lataa ilmaiset {topic} työarkit esiopetukseen ja alakouluun. Ammattimaista materiaalia opettajille ja vanhemmille. Luo heti!',
    focusKeywordTemplate: 'ilmaiset {topic} työarkit'
  }
};

const LANGUAGE_NAMES = {
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  pt: 'Portuguese',
  it: 'Italian',
  nl: 'Dutch',
  sv: 'Swedish',
  da: 'Danish',
  no: 'Norwegian',
  fi: 'Finnish'
};

const MINIMUM_KEYWORD_COUNT = 10;
const MINIMUM_KEYWORDS_IN_HEADINGS = 20;
const META_TITLE_MIN = 55;
const META_TITLE_MAX = 60;
const META_DESC_MIN = 155;
const META_DESC_MAX = 160;

/**
 * Get all keywords for a language
 * @param {string} lang - Language code
 * @returns {string[]} Array of all keywords (universal + local)
 */
function getAllKeywords(lang) {
  return [...(UNIVERSAL_KEYWORDS[lang] || []), ...(LOCAL_KEYWORDS[lang] || [])];
}

/**
 * Get universal keywords for a language
 * @param {string} lang - Language code
 * @returns {string[]} Array of universal keywords
 */
function getUniversalKeywords(lang) {
  return UNIVERSAL_KEYWORDS[lang] || [];
}

/**
 * Get local keywords for a language
 * @param {string} lang - Language code
 * @returns {string[]} Array of local keywords
 */
function getLocalKeywords(lang) {
  return LOCAL_KEYWORDS[lang] || [];
}

/**
 * Get meta templates for a language
 * @param {string} lang - Language code
 * @returns {object} Meta templates
 */
function getMetaTemplates(lang) {
  return META_TEMPLATES[lang] || META_TEMPLATES.en;
}

module.exports = {
  UNIVERSAL_KEYWORDS,
  LOCAL_KEYWORDS,
  META_TEMPLATES,
  LANGUAGE_NAMES,
  MINIMUM_KEYWORD_COUNT,
  MINIMUM_KEYWORDS_IN_HEADINGS,
  META_TITLE_MIN,
  META_TITLE_MAX,
  META_DESC_MIN,
  META_DESC_MAX,
  getAllKeywords,
  getUniversalKeywords,
  getLocalKeywords,
  getMetaTemplates
};
