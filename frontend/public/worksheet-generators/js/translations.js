// Translation system for worksheet generators
const translations = {
  en: {
    // Common UI elements
    generate: 'Generate',
    print: 'Print',
    download: 'Download PDF',
    newWorksheet: 'New Worksheet',
    settings: 'Settings',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Word Search specific
    wordSearch: 'Word Search',
    words: 'Words',
    gridSize: 'Grid Size',
    theme: 'Theme',
    animals: 'Animals',
    food: 'Food',
    school: 'School',
    nature: 'Nature',
    sports: 'Sports',
    transportation: 'Transportation',
    allThemes: 'All Themes',
    selectTheme: 'Select Theme:',
    searchImages: 'Search Images:',
    searchPlaceholder: 'e.g., apple, car',
    
    // Math worksheet
    mathWorksheet: 'Math Worksheet',
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    mixed: 'Mixed',
    numberOfProblems: 'Number of Problems',
    maxNumber: 'Maximum Number',
    
    // Coloring
    coloringPage: 'Coloring Page',
    selectImage: 'Select Image',
    
    // Common words for image names
    cat: 'Cat',
    dog: 'Dog',
    bird: 'Bird',
    fish: 'Fish',
    apple: 'Apple',
    banana: 'Banana',
    car: 'Car',
    bus: 'Bus',
    tree: 'Tree',
    flower: 'Flower',
    sun: 'Sun',
    moon: 'Moon',
    star: 'Star',
    book: 'Book',
    pencil: 'Pencil',
    ball: 'Ball'
  },
  
  de: {
    // Common UI elements
    generate: 'Generieren',
    print: 'Drucken',
    download: 'PDF herunterladen',
    newWorksheet: 'Neues Arbeitsblatt',
    settings: 'Einstellungen',
    difficulty: 'Schwierigkeit',
    easy: 'Einfach',
    medium: 'Mittel',
    hard: 'Schwer',
    
    // Word Search specific
    wordSearch: 'Wortsuche',
    words: 'Wörter',
    gridSize: 'Gittergröße',
    theme: 'Thema',
    animals: 'Tiere',
    food: 'Essen',
    school: 'Schule',
    nature: 'Natur',
    sports: 'Sport',
    transportation: 'Verkehr',
    allThemes: 'Alle Themen',
    selectTheme: 'Thema wählen:',
    searchImages: 'Bilder suchen:',
    searchPlaceholder: 'z.B. Apfel, Auto',
    
    // Math worksheet
    mathWorksheet: 'Mathe-Arbeitsblatt',
    addition: 'Addition',
    subtraction: 'Subtraktion',
    multiplication: 'Multiplikation',
    division: 'Division',
    mixed: 'Gemischt',
    numberOfProblems: 'Anzahl der Aufgaben',
    maxNumber: 'Maximale Zahl',
    
    // Coloring
    coloringPage: 'Malvorlage',
    selectImage: 'Bild auswählen',
    
    // Common words for image names
    cat: 'Katze',
    dog: 'Hund',
    bird: 'Vogel',
    fish: 'Fisch',
    apple: 'Apfel',
    banana: 'Banane',
    car: 'Auto',
    bus: 'Bus',
    tree: 'Baum',
    flower: 'Blume',
    sun: 'Sonne',
    moon: 'Mond',
    star: 'Stern',
    book: 'Buch',
    pencil: 'Bleistift',
    ball: 'Ball'
  },
  
  fr: {
    // Common UI elements
    generate: 'Générer',
    print: 'Imprimer',
    download: 'Télécharger PDF',
    newWorksheet: 'Nouvelle Feuille',
    settings: 'Paramètres',
    difficulty: 'Difficulté',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    
    // Word Search specific
    wordSearch: 'Mots Cachés',
    words: 'Mots',
    gridSize: 'Taille de la Grille',
    theme: 'Thème',
    animals: 'Animaux',
    food: 'Nourriture',
    school: 'École',
    nature: 'Nature',
    sports: 'Sports',
    transportation: 'Transport',
    allThemes: 'Tous les Thèmes',
    selectTheme: 'Sélectionner le thème:',
    searchImages: 'Rechercher des images:',
    searchPlaceholder: 'ex: pomme, voiture',
    
    // Math worksheet
    mathWorksheet: 'Feuille de Maths',
    addition: 'Addition',
    subtraction: 'Soustraction',
    multiplication: 'Multiplication',
    division: 'Division',
    mixed: 'Mixte',
    numberOfProblems: 'Nombre de Problèmes',
    maxNumber: 'Nombre Maximum',
    
    // Coloring
    coloringPage: 'Page de Coloriage',
    selectImage: 'Sélectionner une Image',
    
    // Common words for image names
    cat: 'Chat',
    dog: 'Chien',
    bird: 'Oiseau',
    fish: 'Poisson',
    apple: 'Pomme',
    banana: 'Banane',
    car: 'Voiture',
    bus: 'Bus',
    tree: 'Arbre',
    flower: 'Fleur',
    sun: 'Soleil',
    moon: 'Lune',
    star: 'Étoile',
    book: 'Livre',
    pencil: 'Crayon',
    ball: 'Ballon'
  },
  
  es: {
    // Common UI elements
    generate: 'Generar',
    print: 'Imprimir',
    download: 'Descargar PDF',
    newWorksheet: 'Nueva Hoja',
    settings: 'Configuración',
    difficulty: 'Dificultad',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    
    // Word Search specific
    wordSearch: 'Sopa de Letras',
    words: 'Palabras',
    gridSize: 'Tamaño de Cuadrícula',
    theme: 'Tema',
    animals: 'Animales',
    food: 'Comida',
    school: 'Escuela',
    nature: 'Naturaleza',
    sports: 'Deportes',
    transportation: 'Transporte',
    allThemes: 'Todos los Temas',
    selectTheme: 'Seleccionar tema:',
    searchImages: 'Buscar imágenes:',
    searchPlaceholder: 'ej: manzana, coche',
    
    // Math worksheet
    mathWorksheet: 'Hoja de Matemáticas',
    addition: 'Suma',
    subtraction: 'Resta',
    multiplication: 'Multiplicación',
    division: 'División',
    mixed: 'Mixto',
    numberOfProblems: 'Número de Problemas',
    maxNumber: 'Número Máximo',
    
    // Coloring
    coloringPage: 'Página para Colorear',
    selectImage: 'Seleccionar Imagen',
    
    // Common words for image names
    cat: 'Gato',
    dog: 'Perro',
    bird: 'Pájaro',
    fish: 'Pez',
    apple: 'Manzana',
    banana: 'Plátano',
    car: 'Coche',
    bus: 'Autobús',
    tree: 'Árbol',
    flower: 'Flor',
    sun: 'Sol',
    moon: 'Luna',
    star: 'Estrella',
    book: 'Libro',
    pencil: 'Lápiz',
    ball: 'Pelota'
  },
  
  pt: {
    generate: 'Gerar',
    print: 'Imprimir',
    download: 'Baixar PDF',
    newWorksheet: 'Nova Folha',
    settings: 'Configurações',
    difficulty: 'Dificuldade',
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    wordSearch: 'Caça-Palavras',
    words: 'Palavras',
    gridSize: 'Tamanho da Grade',
    theme: 'Tema',
    animals: 'Animais',
    food: 'Comida',
    school: 'Escola',
    nature: 'Natureza',
    sports: 'Esportes',
    transportation: 'Transporte',
    allThemes: 'Todos os Temas',
    selectTheme: 'Selecionar tema:',
    searchImages: 'Pesquisar imagens:',
    searchPlaceholder: 'ex: maçã, carro'
  },
  
  it: {
    generate: 'Genera',
    print: 'Stampa',
    download: 'Scarica PDF',
    newWorksheet: 'Nuovo Foglio',
    settings: 'Impostazioni',
    difficulty: 'Difficoltà',
    easy: 'Facile',
    medium: 'Medio',
    hard: 'Difficile',
    wordSearch: 'Crucipuzzle',
    words: 'Parole',
    gridSize: 'Dimensione Griglia',
    theme: 'Tema',
    animals: 'Animali',
    food: 'Cibo',
    school: 'Scuola',
    nature: 'Natura',
    sports: 'Sport',
    transportation: 'Trasporti',
    allThemes: 'Tutti i Temi',
    selectTheme: 'Seleziona tema:',
    searchImages: 'Cerca immagini:',
    searchPlaceholder: 'es: mela, auto'
  },
  
  nl: {
    generate: 'Genereren',
    print: 'Afdrukken',
    download: 'PDF Downloaden',
    newWorksheet: 'Nieuw Werkblad',
    settings: 'Instellingen',
    difficulty: 'Moeilijkheid',
    easy: 'Makkelijk',
    medium: 'Gemiddeld',
    hard: 'Moeilijk',
    wordSearch: 'Woordzoeker',
    words: 'Woorden',
    gridSize: 'Rastergrootte',
    theme: 'Thema',
    animals: 'Dieren',
    food: 'Eten',
    school: 'School',
    nature: 'Natuur',
    sports: 'Sport',
    transportation: 'Vervoer',
    allThemes: 'Alle Thema\'s',
    selectTheme: 'Selecteer thema:',
    searchImages: 'Zoek afbeeldingen:',
    searchPlaceholder: 'bijv: appel, auto'
  },
  
  sv: {
    generate: 'Generera',
    print: 'Skriv ut',
    download: 'Ladda ner PDF',
    newWorksheet: 'Nytt Arbetsblad',
    settings: 'Inställningar',
    difficulty: 'Svårighetsgrad',
    easy: 'Lätt',
    medium: 'Medel',
    hard: 'Svår',
    wordSearch: 'Ordsök',
    words: 'Ord',
    gridSize: 'Rutnätsstorlek',
    theme: 'Tema',
    animals: 'Djur',
    food: 'Mat',
    school: 'Skola',
    nature: 'Natur',
    sports: 'Sport',
    transportation: 'Transport',
    allThemes: 'Alla Teman',
    selectTheme: 'Välj tema:',
    searchImages: 'Sök bilder:',
    searchPlaceholder: 'ex: äpple, bil'
  },
  
  da: {
    generate: 'Generer',
    print: 'Udskriv',
    download: 'Download PDF',
    newWorksheet: 'Nyt Arbejdsark',
    settings: 'Indstillinger',
    difficulty: 'Sværhedsgrad',
    easy: 'Let',
    medium: 'Mellem',
    hard: 'Svær',
    wordSearch: 'Ordsøgning',
    words: 'Ord',
    gridSize: 'Gitterstørrelse',
    theme: 'Tema',
    animals: 'Dyr',
    food: 'Mad',
    school: 'Skole',
    nature: 'Natur',
    sports: 'Sport',
    transportation: 'Transport',
    allThemes: 'Alle Temaer',
    selectTheme: 'Vælg tema:',
    searchImages: 'Søg billeder:',
    searchPlaceholder: 'fx: æble, bil'
  },
  
  no: {
    generate: 'Generer',
    print: 'Skriv ut',
    download: 'Last ned PDF',
    newWorksheet: 'Nytt Arbeidsark',
    settings: 'Innstillinger',
    difficulty: 'Vanskelighetsgrad',
    easy: 'Lett',
    medium: 'Middels',
    hard: 'Vanskelig',
    wordSearch: 'Ordsøk',
    words: 'Ord',
    gridSize: 'Rutenettsstørrelse',
    theme: 'Tema',
    animals: 'Dyr',
    food: 'Mat',
    school: 'Skole',
    nature: 'Natur',
    sports: 'Sport',
    transportation: 'Transport',
    allThemes: 'Alle Temaer',
    selectTheme: 'Velg tema:',
    searchImages: 'Søk bilder:',
    searchPlaceholder: 'f.eks: eple, bil'
  },
  
  fi: {
    generate: 'Luo',
    print: 'Tulosta',
    download: 'Lataa PDF',
    newWorksheet: 'Uusi Tehtäväarkki',
    settings: 'Asetukset',
    difficulty: 'Vaikeustaso',
    easy: 'Helppo',
    medium: 'Keskitaso',
    hard: 'Vaikea',
    wordSearch: 'Sanaristikko',
    words: 'Sanat',
    gridSize: 'Ruudukon Koko',
    theme: 'Teema',
    animals: 'Eläimet',
    food: 'Ruoka',
    school: 'Koulu',
    nature: 'Luonto',
    sports: 'Urheilu',
    transportation: 'Liikenne',
    allThemes: 'Kaikki Teemat',
    selectTheme: 'Valitse teema:',
    searchImages: 'Hae kuvia:',
    searchPlaceholder: 'esim: omena, auto'
  }
};

// Function to get current locale from URL parameter
function getCurrentLocale() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('locale') || 'en';
}

// Function to translate a key
function t(key) {
  const locale = getCurrentLocale();
  const localeTranslations = translations[locale] || translations['en'];
  return localeTranslations[key] || translations['en'][key] || key;
}

// Function to translate all elements with data-translate attribute
function translatePage() {
  const locale = getCurrentLocale();
  document.documentElement.lang = locale;
  
  // Translate all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = t(key);
  });
  
  // Translate placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = t(key);
  });
  
  // Translate values (for buttons)
  document.querySelectorAll('[data-translate-value]').forEach(element => {
    const key = element.getAttribute('data-translate-value');
    element.value = t(key);
  });
}

// Auto-translate on page load
document.addEventListener('DOMContentLoaded', translatePage);

// Export for use in other scripts
window.translations = translations;
window.t = t;
window.translatePage = translatePage;
window.getCurrentLocale = getCurrentLocale;