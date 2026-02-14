/**
 * Blog Language Audit Script (v2)
 *
 * Detects the ACTUAL language of each blog post translation by scoring
 * title and content SEPARATELY. This catches two mismatch patterns:
 *   A. Wrong-language title, correct body (e.g., English title under 'es')
 *   B. Correct title, wrong-language body (e.g., English body under 'fi')
 *
 * Uses 1/N weighted function-word scoring against 11 language profiles.
 *
 * Usage (run from frontend directory):
 *   cd /opt/lessoncraftstudio/frontend
 *   NODE_PATH=./node_modules node ../scripts/audit-blog-languages.js
 *
 * Output: ../scripts/blog-language-audit.json
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// =====================================================================
// LANGUAGE PROFILES
// =====================================================================

const LANG_PROFILES = {
  en: [
    'the', 'this', 'that', 'these', 'those',
    'you', 'your', 'yours', 'we', 'our', 'they', 'their', 'them', 'its',
    'he', 'she', 'his', 'her', 'my', 'myself', 'yourself',
    'of', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about',
    'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'between', 'under', 'against', 'without',
    'and', 'but', 'or', 'if', 'because', 'while', 'although', 'whether',
    'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'having',
    'do', 'does', 'did',
    'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might',
    'not', 'also', 'very', 'often', 'however', 'too', 'usually', 'really',
    'already', 'always', 'never', 'sometimes',
    'which', 'who', 'whom', 'what', 'where', 'when', 'how', 'why',
    'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'than', 'there', 'here', 'only', 'just', 'then',
    'worksheets', 'worksheet', 'teacher', 'teachers', 'student', 'students',
    'learning', 'classroom', 'skills', 'education', 'practice', 'children',
    'activities', 'printable', 'download', 'free', 'grade', 'lesson',
    'complete', 'guide', 'using', 'create', 'custom', 'best',
  ],
  de: [
    'der', 'die', 'das', 'den', 'dem', 'des',
    'ein', 'eine', 'einer', 'eines', 'einem', 'einen',
    'dieser', 'diese', 'dieses', 'diesem', 'diesen',
    'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr',
    'sich', 'mich', 'dich', 'uns', 'euch',
    'ihre', 'ihren', 'ihrem', 'ihrer',
    'sein', 'seine', 'seinen', 'seinem', 'seiner',
    'von', 'zu', 'mit', 'auf', 'an', 'f\u00fcr',
    'aus', 'bei', 'nach', '\u00fcber', 'unter', 'durch',
    'gegen', 'ohne', 'zwischen', 'vor', 'hinter', 'neben',
    'und', 'aber', 'oder', 'wenn', 'weil', 'dass', 'ob',
    'denn', 'sondern', 'als', 'wie',
    'ist', 'sind', 'war', 'waren', 'hat', 'haben', 'hatte',
    'wird', 'werden', 'wurde', 'wurden',
    'kann', 'k\u00f6nnen', 'konnte', 'muss', 'm\u00fcssen',
    'soll', 'sollen', 'darf', 'd\u00fcrfen',
    'nicht', 'auch', 'noch', 'schon', 'nur', 'sehr',
    'immer', 'bereits', 'hier', 'dort',
    'welche', 'welcher', 'welches', 'jede', 'jeder', 'jedes',
    'alle', 'mehr', 'viele', 'andere',
    'arbeitsbl\u00e4tter', 'arbeitsblatt', 'sch\u00fcler',
    'sch\u00fclerinnen', 'lehrer', 'unterricht',
    'mathematik', 'lernen', 'kinder', '\u00fcbungen',
    'grundschule', 'klasse', 'aufgaben',
    'vollst\u00e4ndiger', 'leitfaden', 'erstellen', 'besten',
  ],
  fr: [
    'le', 'la', 'les', 'un', 'une', 'des', 'du', 'au', 'aux',
    'ce', 'cette', 'ces', 'cet',
    'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles',
    'me', 'te', 'se', 'lui', 'leur', 'leurs',
    'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
    'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos',
    'de', '\u00e0', 'en', 'dans', 'pour', 'sur', 'avec', 'par',
    'sans', 'sous', 'entre', 'vers', 'chez', 'apr\u00e8s', 'avant',
    'et', 'ou', 'mais', 'que', 'qui', 'si', 'car', 'donc',
    'lorsque', 'quand', 'comme', 'parce',
    'est', 'sont', 'ont', 'fait', '\u00eatre', 'avoir',
    'peut', 'peuvent', 'doit', 'doivent',
    'ne', 'pas', 'plus', 'tr\u00e8s', 'bien', 'aussi', 'encore',
    'm\u00eame', 'toujours', 'jamais', 'souvent',
    'tout', 'tous', 'toute', 'toutes', 'chaque', 'autre', 'autres',
    'quel', 'quelle', 'quels', 'quelles',
    'fiches', 'exercices', '\u00e9l\u00e8ves', 'enseignants',
    'apprentissage', 'math\u00e9matiques', 'enfants', 'classe',
    'activit\u00e9s', 't\u00e9l\u00e9charger', 'gratuit',
    'complet', 'cr\u00e9er', 'meilleurs',
  ],
  es: [
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
    'este', 'esta', 'estos', 'estas', 'ese', 'esa',
    'yo', 't\u00fa', '\u00e9l', 'ella', 'nosotros', 'ellos', 'ellas',
    'me', 'te', 'se', 'nos', 'les',
    'mi', 'tu', 'su', 'sus', 'nuestro', 'nuestra', 'nuestros', 'nuestras',
    'de', 'en', 'para', 'por', 'con', 'sin',
    'sobre', 'entre', 'hasta', 'desde', 'hacia', 'seg\u00fan',
    'del', 'al',
    'pero', 'que', 'si', 'porque', 'cuando', 'como',
    'sino', 'aunque', 'mientras', 'donde',
    'es', 'son', 'est\u00e1', 'est\u00e1n', 'ha', 'han', 'ser', 'estar',
    'puede', 'pueden', 'tiene', 'tienen', 'hace', 'hacen',
    'hay', 'fue', 'sido',
    'no', 'tambi\u00e9n', 'm\u00e1s', 'muy', 'ya', 'a\u00fan', 'siempre',
    'nunca', 'bien', 'as\u00ed', 'aqu\u00ed', 'ah\u00ed',
    'todo', 'toda', 'todos', 'todas', 'cada', 'otro', 'otra', 'otros', 'otras',
    'qu\u00e9', 'cu\u00e1l', 'c\u00f3mo', 'd\u00f3nde', 'cu\u00e1ndo',
    'hojas', 'trabajo', 'alumnos', 'estudiantes', 'profesores',
    'aprendizaje', 'matem\u00e1ticas', 'ni\u00f1os', 'ejercicios',
    'actividades', 'descargar', 'gratuito',
    'completa', 'gu\u00eda', 'crear', 'mejores',
  ],
  pt: [
    'os', 'as', 'um', 'uma', 'uns', 'umas',
    'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas',
    'ao', 'aos', '\u00e0s', 'pelo', 'pela', 'pelos', 'pelas',
    'num', 'numa',
    'eu', 'ele', 'ela', 'n\u00f3s', 'eles', 'elas',
    'me', 'te', 'se', 'lhe', 'lhes',
    'meu', 'minha', 'seu', 'sua', 'seus', 'suas',
    'nosso', 'nossa', 'nossos', 'nossas',
    'de', 'em', 'para', 'por', 'com', 'sem',
    'sobre', 'entre', 'at\u00e9', 'desde',
    'ou', 'mas', 'que', 'se', 'porque', 'quando', 'como',
    'embora', 'enquanto', 'onde',
    '\u00e9', 's\u00e3o', 'est\u00e1', 'est\u00e3o', 'tem', 't\u00eam', 'ser', 'estar',
    'pode', 'podem', 'h\u00e1', 'foi', 'sido',
    'n\u00e3o', 'tamb\u00e9m', 'mais', 'muito', 'j\u00e1', 'ainda', 'sempre',
    'nunca', 'bem', 'assim', 'aqui',
    'todo', 'toda', 'todos', 'todas', 'cada', 'outro', 'outra', 'outros', 'outras',
    'fichas', 'trabalho', 'alunos', 'professores',
    'aprendizagem', 'matem\u00e1tica', 'crian\u00e7as', 'exerc\u00edcios',
    'ensino', 'atividades', 'baixar',
    'completo', 'guia', 'criar', 'melhores',
  ],
  it: [
    'il', 'lo', 'la', 'le', 'gli', 'un', 'una', 'uno',
    'del', 'dello', 'della', 'dei', 'degli', 'delle',
    'al', 'allo', 'alla', 'ai', 'agli', 'alle',
    'nel', 'nello', 'nella', 'nei', 'negli', 'nelle',
    'dal', 'dallo', 'dalla', 'dai', 'dagli', 'dalle',
    'sul', 'sullo', 'sulla', 'sui', 'sugli', 'sulle',
    'questo', 'questa', 'questi', 'queste',
    'io', 'tu', 'lui', 'lei', 'noi', 'voi', 'loro',
    'mi', 'ti', 'ci', 'vi', 'si',
    'mio', 'mia', 'suo', 'sua', 'suoi', 'sue',
    'nostro', 'nostra', 'nostri', 'nostre',
    'di', 'in', 'per', 'con', 'su', 'tra', 'fra',
    'da', 'senza', 'dopo', 'prima', 'sotto', 'sopra',
    'ma', 'che', 'se', 'perch\u00e9', 'quando', 'come',
    'anche', 'per\u00f2', 'oppure', 'dove',
    '\u00e8', 'sono', 'ha', 'hanno', 'essere', 'avere',
    'pu\u00f2', 'possono', 'fa', 'fanno', 'viene', 'vengono',
    'non', 'pi\u00f9', 'molto', 'gi\u00e0', 'ancora', 'sempre',
    'mai', 'bene', 'cos\u00ec', 'qui',
    'tutto', 'tutta', 'tutti', 'tutte', 'ogni', 'altro', 'altra', 'altri', 'altre',
    'quale', 'quali',
    'schede', 'lavoro', 'alunni', 'insegnanti',
    'apprendimento', 'matematica', 'bambini', 'esercizi',
    'lezione', 'attivit\u00e0', 'scaricare', 'gratuito',
    'completa', 'creare', 'migliori',
  ],
  nl: [
    'de', 'het', 'een', 'dit', 'dat', 'deze', 'die',
    'ik', 'jij', 'je', 'hij', 'zij', 'ze', 'wij', 'we',
    'mij', 'hem', 'haar', 'hen', 'hun',
    'mijn', 'jouw', 'zijn', 'uw', 'onze', 'ons',
    'van', 'in', 'op', 'aan', 'met', 'voor', 'door',
    'uit', 'bij', 'over', 'naar', 'tot', 'onder', 'tussen',
    'zonder', 'tegen', 'langs', 'rond',
    'en', 'of', 'maar', 'dat', 'als', 'omdat', 'wanneer',
    'terwijl', 'hoewel', 'want', 'dus', 'toch',
    'is', 'zijn', 'was', 'waren', 'heeft', 'hebben', 'had',
    'wordt', 'worden', 'werd', 'werden',
    'kan', 'kunnen', 'kon', 'moet', 'moeten',
    'zal', 'zullen', 'zou', 'zouden',
    'niet', 'ook', 'nog', 'al', 'wel', 'er', 'hier', 'daar',
    'veel', 'meer', 'heel', 'erg', 'altijd', 'nooit', 'soms',
    'alle', 'elk', 'elke', 'andere', 'geen', 'wat', 'wie', 'waar',
    'werkbladen', 'werkblad', 'leerlingen', 'leraren',
    'onderwijs', 'leren', 'wiskunde', 'kinderen', 'oefeningen',
    'activiteiten', 'downloaden', 'gratis',
    'volledige', 'gids', 'maken', 'beste',
  ],
  sv: [
    'den', 'det', 'de', 'en', 'ett', 'denna', 'detta', 'dessa',
    'jag', 'du', 'han', 'hon', 'vi', 'ni', 'dem',
    'min', 'mitt', 'mina', 'din', 'ditt', 'dina',
    'sin', 'sitt', 'sina', 'hans', 'hennes', 'deras',
    'v\u00e5r', 'v\u00e5rt', 'v\u00e5ra',
    'av', 'f\u00f6r', 'med', 'till', 'fr\u00e5n', 'om',
    'vid', 'under', '\u00f6ver', 'mellan', 'efter', 'mot', 'utan',
    'genom', 'hos', 'bland',
    'och', 'eller', 'men', 'att', 'som', 'n\u00e4r',
    'medan', 'fast\u00e4n', 'eftersom', 'd\u00e4r',
    '\u00e4r', 'var', 'har', 'hade', 'kan', 'kunde',
    'ska', 'skulle', 'kommer', 'kom',
    'vill', 'ville', 'm\u00e5ste', 'f\u00e5r', 'fick',
    'bli', 'blev', 'blir',
    'inte', 'ocks\u00e5', 'mycket', 'redan', 'h\u00e4r', 'd\u00e4r',
    'alltid', 'aldrig', 'ofta', 'bara', 'mer', 'mest',
    'alla', 'varje', 'andra', 'vilken', 'vilket', 'vilka',
    'arbetsblad', 'elever', 'l\u00e4rare', 'undervisning',
    'l\u00e4rande', 'matematik', 'barn', '\u00f6vningar',
    'aktiviteter', 'ladda', 'gratis',
    'komplett', 'guide', 'skapa', 'b\u00e4sta',
  ],
  da: [
    'den', 'det', 'de', 'en', 'et', 'denne', 'dette', 'disse',
    'jeg', 'du', 'han', 'hun', 'vi', 'dem',
    'min', 'mit', 'mine', 'din', 'dit', 'dine',
    'sin', 'sit', 'sine', 'hans', 'hendes', 'deres',
    'vores',
    'af', 'for', 'med', 'til', 'fra', 'om',
    'ved', 'under', 'over', 'mellem', 'efter', 'mod', 'uden',
    'gennem', 'hos', 'blandt',
    'og', 'eller', 'men', 'at', 'som', 'n\u00e5r',
    'mens', 'selvom', 'fordi', 'hvor',
    'er', 'var', 'har', 'havde', 'kan', 'kunne',
    'skal', 'skulle', 'vil', 'ville',
    'm\u00e5', 'm\u00e5tte', 'f\u00e5r', 'fik',
    'blive', 'blev', 'bliver',
    'ikke', 'ogs\u00e5', 'meget', 'allerede', 'her', 'der',
    'altid', 'aldrig', 'ofte', 'kun', 'mere', 'mest',
    'alle', 'hver', 'andre', 'hvilken', 'hvilket', 'hvilke',
    'arbejdsark', 'elever', 'l\u00e6rere', 'undervisning',
    'l\u00e6ring', 'matematik', 'b\u00f8rn', 'opgaver',
    'aktiviteter', 'downloade', 'gratis',
    'bruger', 'g\u00f8r', 'g\u00f8re', 'b\u00f8rnene', 'eleverne',
    'komplet', 'bedste', 'opret',
  ],
  no: [
    'den', 'det', 'de', 'en', 'et', 'ei', 'denne', 'dette', 'disse',
    'jeg', 'du', 'han', 'hun', 'vi', 'dere', 'dem',
    'min', 'mitt', 'mine', 'din', 'ditt', 'dine',
    'sin', 'sitt', 'sine', 'hans', 'hennes', 'deres',
    'v\u00e5r', 'v\u00e5rt', 'v\u00e5re',
    'av', 'for', 'med', 'til', 'fra', 'om',
    'ved', 'under', 'over', 'mellom', 'etter', 'mot', 'uten',
    'gjennom', 'hos', 'blant',
    'og', 'eller', 'men', 'at', 'som', 'n\u00e5r',
    'mens', 'selv', 'fordi', 'hvor',
    'er', 'var', 'har', 'hadde', 'kan', 'kunne',
    'skal', 'skulle', 'vil', 'ville',
    'm\u00e5', 'm\u00e5tte', 'f\u00e5r', 'fikk',
    'bli', 'ble', 'blir',
    'ikke', 'ogs\u00e5', 'mye', 'allerede', 'her', 'der',
    'alltid', 'aldri', 'ofte', 'bare', 'mer', 'mest',
    'alle', 'hver', 'andre', 'hvilken', 'hvilket', 'hvilke',
    'arbeidsark', 'elever', 'l\u00e6rere', 'undervisning',
    'l\u00e6ring', 'matematikk', 'barn', 'oppgaver',
    'aktiviteter', 'laste', 'gratis',
    'bruker', 'gj\u00f8r', 'gj\u00f8re', 'barna', 'elevene',
    'komplett', 'beste', 'lage',
  ],
  fi: [
    'ja', 'on', 'ei', 'se', 'ne', 'he', 'me', 'te',
    'tai', 'kun', 'jos', 'niin', 'voi', 'olla',
    'my\u00f6s', 'mutta', 'sek\u00e4', 'vain', 'kaikki',
    'ett\u00e4', 'koska', 'jotta', 'vaikka',
    't\u00e4m\u00e4', 't\u00e4m\u00e4n', 't\u00e4ss\u00e4', 'n\u00e4m\u00e4', 'n\u00e4iden',
    'joka', 'jotka', 'joiden', 'joita', 'joissa',
    'kanssa', 'kautta', 'ennen', 'j\u00e4lkeen', 'mukaan',
    'v\u00e4lill\u00e4', 'ilman', 'yli', 'lis\u00e4ksi',
    'ovat', 'oli', 'olivat', 'voidaan', 't\u00e4ytyy',
    'pit\u00e4\u00e4', 'saada', 'tehd\u00e4', 'k\u00e4ytt\u00e4\u00e4',
    'auttaa', 'antaa', 'tulla',
    'min\u00e4', 'sin\u00e4', 'h\u00e4n', 'h\u00e4nen', 'heid\u00e4n', 'meid\u00e4n',
    'sinun', 'minun',
    'niiden', 'niit\u00e4', 'niille', 'niist\u00e4',
    'paljon', 'jokainen', 'eri', 'hyvin',
    'enemm\u00e4n', 'kuin', 'aina', 'usein', 'viel\u00e4',
    'miss\u00e4', 'mik\u00e4', 'miten', 'miksi',
    'teht\u00e4v\u00e4t', 'teht\u00e4v\u00e4', 'oppilaat', 'oppilaiden',
    'opettajat', 'opettajille', 'opetus', 'oppiminen',
    'matematiikka', 'lapset', 'harjoitukset',
    'ty\u00f6lehti\u00e4', 'ty\u00f6lehti', 'koulutus',
    'toimintaa', 'lataa', 'ilmainen',
    'oman', 'omaa', 'omia',
    't\u00e4ydellinen', 'opas', 'luoda', 'parhaat',
  ],
};

// =====================================================================
// PRECOMPUTE WORD-TO-LANGUAGES MAP
// =====================================================================

const wordToLangs = new Map();
for (const [lang, words] of Object.entries(LANG_PROFILES)) {
  for (const word of words) {
    const normalized = word.normalize('NFC').toLowerCase();
    if (!wordToLangs.has(normalized)) {
      wordToLangs.set(normalized, []);
    }
    const list = wordToLangs.get(normalized);
    if (!list.includes(lang)) list.push(lang);
  }
}

// =====================================================================
// TEXT PROCESSING
// =====================================================================

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/&#\d+;/gi, ' ')
    .replace(/&#x[0-9a-f]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  if (!text) return [];
  return text.normalize('NFC').toLowerCase()
    .split(/[^\p{L}]+/u)
    .filter(w => w.length > 1); // skip single-char words (too ambiguous)
}

// =====================================================================
// LANGUAGE SCORING
// =====================================================================

/**
 * Score a list of words against all language profiles.
 * Returns { lang: score } sorted descending.
 */
function scoreWords(words) {
  const scores = {};
  for (const lang of LOCALES) scores[lang] = 0;

  for (const word of words) {
    const langs = wordToLangs.get(word);
    if (langs) {
      const weight = 1 / langs.length;
      for (const lang of langs) {
        scores[lang] += weight;
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return {
    topLang: sorted[0][0],
    topScore: Math.round(sorted[0][1] * 100) / 100,
    secondLang: sorted[1][0],
    secondScore: Math.round(sorted[1][1] * 100) / 100,
  };
}

function getConfidence(topScore, secondScore) {
  if (topScore < 2) return 'low';
  if (topScore > 5 && (secondScore === 0 || topScore / secondScore > 2.0)) return 'high';
  if (topScore > 3 && (secondScore === 0 || topScore / secondScore > 1.3)) return 'medium';
  return 'low';
}

// =====================================================================
// MAIN AUDIT
// =====================================================================

async function auditBlogLanguages() {
  console.log('=== BLOG LANGUAGE AUDIT v2 ===\n');
  console.log('Detects title and content language SEPARATELY.\n');

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Found ${posts.length} published posts\n`);

  const results = [];
  let titleMismatches = 0;
  let contentMismatches = 0;
  let postsWithIssues = 0;
  const perLocaleTitle = {};
  const perLocaleContent = {};
  LOCALES.forEach(l => { perLocaleTitle[l] = 0; perLocaleContent[l] = 0; });

  // Also track duplicate titles (exact English title appearing in another locale)
  let duplicateTitleCount = 0;

  for (const post of posts) {
    const translations = post.translations;
    if (!translations || typeof translations !== 'object') continue;

    const localeResults = {};
    let postHasIssue = false;

    // Collect all titles for duplicate detection
    const titleToLocales = {};
    for (const locale of LOCALES) {
      const t = translations[locale];
      if (t && t.title) {
        const trimmed = t.title.trim();
        if (!titleToLocales[trimmed]) titleToLocales[trimmed] = [];
        titleToLocales[trimmed].push(locale);
      }
    }
    const dupTitles = Object.entries(titleToLocales)
      .filter(([, locs]) => locs.length > 1);

    for (const locale of LOCALES) {
      const trans = translations[locale];
      if (!trans || !trans.title) {
        localeResults[locale] = { missing: true };
        continue;
      }

      // --- TITLE DETECTION ---
      const titleWords = tokenize(trans.title);
      const titleResult = scoreWords(titleWords);
      const titleMatch = titleResult.topLang === locale;
      const titleConf = getConfidence(titleResult.topScore, titleResult.secondScore);

      // --- CONTENT DETECTION ---
      // Use metaDescription + excerpt (plain text) + stripped content body
      let contentParts = [];
      if (trans.metaDescription) contentParts.push(trans.metaDescription);
      if (trans.excerpt) contentParts.push(trans.excerpt);
      if (trans.metaTitle) contentParts.push(trans.metaTitle);
      // For the HTML content, extract body text (skip first 300 chars which is usually head/meta)
      if (trans.content) {
        const stripped = stripHtml(trans.content);
        // Take a large chunk from after the meta section
        contentParts.push(stripped.substring(300, 3000));
      }
      const contentText = contentParts.join(' ');
      const contentWords = tokenize(contentText);
      const contentResult = scoreWords(contentWords);
      const contentMatch = contentResult.topLang === locale;
      const contentConf = getConfidence(contentResult.topScore, contentResult.secondScore);

      // Check for exact title duplication with English
      const isDupOfEn = locale !== 'en' && trans.title.trim() === (translations.en?.title || '').trim();

      const entry = {
        slug: trans.slug || '',
        title: (trans.title || '').substring(0, 80),
        titleLang: titleResult.topLang,
        titleMatch,
        titleConf,
        titleScore: titleResult.topScore,
        titleSecond: titleResult.secondLang,
        titleSecondScore: titleResult.secondScore,
        contentLang: contentResult.topLang,
        contentMatch,
        contentConf,
        contentScore: contentResult.topScore,
        contentSecond: contentResult.secondLang,
        contentSecondScore: contentResult.secondScore,
        isDupOfEn,
      };

      // A locale has an issue if EITHER title or content is in the wrong language
      // or if the title is an exact duplicate of the English title
      const hasIssue = !titleMatch || !contentMatch || isDupOfEn;

      if (!titleMatch) { titleMismatches++; perLocaleTitle[locale]++; }
      if (!contentMatch) { contentMismatches++; perLocaleContent[locale]++; }
      if (isDupOfEn) duplicateTitleCount++;
      if (hasIssue) postHasIssue = true;

      entry.hasIssue = hasIssue;
      localeResults[locale] = entry;
    }

    if (postHasIssue) postsWithIssues++;

    results.push({
      primarySlug: post.slug,
      dupTitles: dupTitles.length > 0
        ? dupTitles.map(([t, locs]) => ({ title: t.substring(0, 60), locales: locs }))
        : undefined,
      locales: localeResults,
    });
  }

  // Build report
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      total_posts: posts.length,
      posts_with_issues: postsWithIssues,
      title_mismatches: titleMismatches,
      content_mismatches: contentMismatches,
      duplicate_en_titles: duplicateTitleCount,
      per_locale_title_mismatches: perLocaleTitle,
      per_locale_content_mismatches: perLocaleContent,
    },
    posts: results,
  };

  const outputPath = path.join(__dirname, 'blog-language-audit.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Report written to: ${outputPath}\n`);

  // ---- Console summary ----
  console.log('=== SUMMARY ===');
  console.log(`Total posts:              ${posts.length}`);
  console.log(`Posts with any issue:     ${postsWithIssues}`);
  console.log(`Title mismatches:         ${titleMismatches}`);
  console.log(`Content mismatches:       ${contentMismatches}`);
  console.log(`Duplicate-of-EN titles:   ${duplicateTitleCount}`);

  console.log('\nPer-locale title mismatches:');
  for (const [locale, count] of Object.entries(perLocaleTitle)) {
    if (count > 0) console.log(`  ${locale}: ${count}`);
  }
  console.log('\nPer-locale content mismatches:');
  for (const [locale, count] of Object.entries(perLocaleContent)) {
    if (count > 0) console.log(`  ${locale}: ${count}`);
  }

  // ---- Detailed listing ----
  console.log('\n=== ISSUES DETAIL ===\n');
  for (const post of results) {
    const issues = Object.entries(post.locales)
      .filter(([, v]) => !v.missing && v.hasIssue);

    if (issues.length > 0) {
      console.log(`Post: ${post.primarySlug}`);
      if (post.dupTitles) {
        for (const d of post.dupTitles) {
          console.log(`  DUP TITLE: "${d.title}" in [${d.locales.join(', ')}]`);
        }
      }
      for (const [locale, info] of issues) {
        const parts = [];
        if (!info.titleMatch) {
          parts.push(`title=${info.titleLang}(${info.titleConf} ${info.titleScore})`);
        }
        if (!info.contentMatch) {
          parts.push(`content=${info.contentLang}(${info.contentConf} ${info.contentScore})`);
        }
        if (info.isDupOfEn) {
          parts.push('EXACT-DUP-OF-EN');
        }
        console.log(`  [${locale}] ${parts.join(' | ')} title="${info.title}"`);
      }
      console.log('');
    }
  }

  return report;
}

// =====================================================================
// RUN
// =====================================================================

auditBlogLanguages()
  .then(() => {
    console.log('=== AUDIT COMPLETE ===');
    process.exit(0);
  })
  .catch(error => {
    console.error('Audit failed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
