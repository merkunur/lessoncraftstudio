/**
 * Fix keyword cannibalization between tool pages and app pages.
 *
 * Updates SEO fields (primaryKeyword, secondaryKeywords, lsiKeywords, titleTag, metaDescription)
 * in 9 tool-content files across 7 locales (63 files total).
 *
 * Strategy: Tool pages → educator/creator intent ("maker", "for teachers", "for classroom")
 *           App pages keep seller/business intent (unchanged)
 */

const fs = require('fs');
const path = require('path');

const TOOL_CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'config', 'tool-content');

// New SEO data for each tool, per locale
const seoFixes = {
  'coloring': {
    en: {
      primaryKeyword: 'custom coloring page maker',
      secondaryKeywords: [
        'coloring page maker for teachers',
        'custom coloring worksheets for classroom',
        'coloring page creator for homeschool',
        'printable coloring pages for kids online',
      ],
      lsiKeywords: [
        'classroom coloring page designer online',
        'grayscale coloring worksheet for printing',
        'freehand drawing coloring activity maker',
      ],
      titleTag: 'Custom Coloring Page Maker — Create Pages Online',
      metaDescription: 'Create custom coloring pages for your classroom or home. Free-form canvas, 3,100+ illustrations, 104 themes, freehand drawing, grayscale export. Try with watermark.',
    },
    de: {
      primaryKeyword: 'Ausmalseiten selber machen',
      secondaryKeywords: [
        'Malvorlagen erstellen für den Unterricht',
        'Ausmalbilder selber gestalten für Kinder',
        'Ausmalseiten-Ersteller für Lehrer',
        'druckbare Malvorlagen für die Klasse',
      ],
      lsiKeywords: [
        'Ausmalbilder für den Unterricht gestalten',
        'Graustufen-Malvorlage zum Ausdrucken',
        'Freihand-Zeichentool für Ausmalbilder',
      ],
      titleTag: 'Ausmalseiten selber machen — Malvorlagen erstellen',
      metaDescription: 'Eigene Ausmalseiten für den Unterricht oder zu Hause gestalten. Freie Arbeitsfläche, 3.100+ Illustrationen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des pages de coloriage en ligne',
      secondaryKeywords: [
        'créateur de coloriages pour enseignants',
        'pages de coloriage personnalisées pour la classe',
        'générateur de coloriages pour enfants',
        'coloriages imprimables pour l\'école',
      ],
      lsiKeywords: [
        'créer des coloriages pour la classe en ligne',
        'coloriage en niveaux de gris à imprimer',
        'outil de dessin libre pour coloriages',
      ],
      titleTag: 'Créer des Pages de Coloriage — Pour Enseignants',
      metaDescription: 'Créez des pages de coloriage personnalisées pour la classe ou la maison. Canevas libre, 3 100+ illustrations, 104 thèmes. Essai gratuit avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear páginas para colorear online',
      secondaryKeywords: [
        'creador de páginas para colorear para profesores',
        'páginas para colorear personalizadas para el aula',
        'generador de dibujos para colorear para niños',
        'páginas para colorear imprimibles para la escuela',
      ],
      lsiKeywords: [
        'diseñador de páginas para colorear para el aula',
        'páginas para colorear en escala de grises',
        'herramienta de dibujo libre para colorear',
      ],
      titleTag: 'Crear Páginas para Colorear — Para Profesores',
      metaDescription: 'Crea páginas para colorear personalizadas para el aula o el hogar. Lienzo libre, 3.100+ ilustraciones, 104 temas. Prueba gratis con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare pagine da colorare online',
      secondaryKeywords: [
        'creatore di pagine da colorare per insegnanti',
        'pagine da colorare personalizzate per la classe',
        'generatore di disegni da colorare per bambini',
        'pagine da colorare stampabili per la scuola',
      ],
      lsiKeywords: [
        'designer di pagine da colorare per la classe',
        'pagine da colorare in scala di grigi',
        'strumento di disegno libero per colorare',
      ],
      titleTag: 'Creare Pagine da Colorare — Per Insegnanti',
      metaDescription: 'Crea pagine da colorare personalizzate per la classe o a casa. Canvas libero, 3.100+ illustrazioni, 104 temi. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'kleurplaten maken online',
      secondaryKeywords: [
        'kleurplaten maker voor leerkrachten',
        'aangepaste kleurplaten voor de klas',
        'kleurplaat generator voor kinderen',
        'printbare kleurplaten voor school',
      ],
      lsiKeywords: [
        'kleurplaat ontwerper voor de klas',
        'grijstinten kleurplaat om te printen',
        'vrij tekenen tool voor kleurplaten',
      ],
      titleTag: 'Kleurplaten Maken Online — Voor Leerkrachten',
      metaDescription: 'Maak aangepaste kleurplaten voor de klas of thuis. Vrij canvas, 3.100+ illustraties, 104 thema\'s, uit de vrije hand tekenen. Gratis met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar páginas para colorir online',
      secondaryKeywords: [
        'criador de páginas para colorir para professores',
        'páginas para colorir personalizadas para a sala',
        'gerador de desenhos para colorir para crianças',
        'páginas para colorir imprimíveis para a escola',
      ],
      lsiKeywords: [
        'designer de páginas para colorir para a classe',
        'páginas para colorir em escala de cinza',
        'ferramenta de desenho livre para colorir',
      ],
      titleTag: 'Criar Páginas para Colorir — Para Professores',
      metaDescription: 'Crie páginas para colorir personalizadas para a sala de aula ou em casa. Canvas livre, 3.100+ ilustrações, 104 temas. Teste grátis com marca d\'água.',
    },
  },

  'image-addition': {
    en: {
      primaryKeyword: 'addition worksheet maker for teachers',
      secondaryKeywords: [
        'addition worksheet creator for classroom',
        'math addition worksheets for kids',
        'printable addition practice sheets',
        'image addition worksheets for kindergarten',
      ],
      lsiKeywords: [
        'visual math worksheets for the classroom',
        'picture-based addition practice for kids',
        'kindergarten math printables for teachers',
      ],
      titleTag: 'Addition Worksheet Maker — Math Sheets for Class',
      metaDescription: 'Create addition worksheets with themed images for your classroom. 104 themes, 4 exercise modes, answer keys, print-ready PDFs. Try with watermark — no signup.',
    },
    de: {
      primaryKeyword: 'Additions-Arbeitsblätter für den Unterricht erstellen',
      secondaryKeywords: [
        'Additions-Arbeitsblatt-Ersteller für Lehrer',
        'Mathe-Additions-Arbeitsblätter für Kinder',
        'druckbare Additionsübungen',
        'Bild-Additions-Arbeitsblätter für die Vorschule',
      ],
      lsiKeywords: [
        'visuelle Mathe-Arbeitsblätter für die Klasse',
        'bildbasierte Additionsübungen für Kinder',
        'Vorschul-Mathe-Arbeitsblätter für Lehrer',
      ],
      titleTag: 'Additions-Arbeitsblätter Erstellen — Für Lehrer',
      metaDescription: 'Additions-Arbeitsblätter mit Themenbildern für den Unterricht erstellen. 104 Themen, 4 Übungsmodi, Lösungsschlüssel, druckfertige PDFs. Kostenlos testen.',
    },
    fr: {
      primaryKeyword: 'créer des fiches d\'addition pour la classe',
      secondaryKeywords: [
        'créateur de fiches d\'addition pour enseignants',
        'fiches d\'addition mathématiques pour enfants',
        'exercices d\'addition imprimables',
        'fiches d\'addition avec images pour maternelle',
      ],
      lsiKeywords: [
        'fiches mathématiques visuelles pour la classe',
        'exercices d\'addition avec images pour enfants',
        'fiches mathématiques maternelle pour enseignants',
      ],
      titleTag: 'Créer des Fiches d\'Addition — Pour Enseignants',
      metaDescription: 'Créez des fiches d\'addition avec images thématiques pour la classe. 104 thèmes, difficulté réglable, corrigés inclus, PDF prêt à imprimer. Essai avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear fichas de suma para el aula',
      secondaryKeywords: [
        'creador de fichas de suma para profesores',
        'fichas de suma matemáticas para niños',
        'ejercicios de suma imprimibles',
        'fichas de suma con imágenes para preescolar',
      ],
      lsiKeywords: [
        'fichas matemáticas visuales para el aula',
        'ejercicios de suma con imágenes para niños',
        'fichas matemáticas preescolar para profesores',
      ],
      titleTag: 'Crear Fichas de Suma — Para Profesores y Padres',
      metaDescription: 'Crea fichas de suma con imágenes temáticas para el aula. 104 temas, dificultad ajustable, clave de respuestas, PDF imprimible. Prueba gratis con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare schede addizione per la classe',
      secondaryKeywords: [
        'creatore di schede addizione per insegnanti',
        'schede addizione matematica per bambini',
        'esercizi di addizione stampabili',
        'schede addizione con immagini per la scuola materna',
      ],
      lsiKeywords: [
        'schede matematiche visive per la classe',
        'esercizi di addizione con immagini per bambini',
        'schede matematiche scuola materna per insegnanti',
      ],
      titleTag: 'Creare Schede Addizione — Per Insegnanti',
      metaDescription: 'Crea schede di addizione con immagini tematiche per la classe. 104 temi, 4 modalità, chiave di correzione e PDF stampabili. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'optellen werkbladen maken voor de klas',
      secondaryKeywords: [
        'optellen werkblad maker voor leerkrachten',
        'rekenwerkbladen optellen voor kinderen',
        'printbare opteloefeningen',
        'optellen werkbladen met afbeeldingen voor kleuters',
      ],
      lsiKeywords: [
        'visuele rekenwerkbladen voor de klas',
        'opteloefeningen met afbeeldingen voor kinderen',
        'kleuterwiskunde werkbladen voor leerkrachten',
      ],
      titleTag: 'Optellen Werkbladen Maken — Voor Leerkrachten',
      metaDescription: 'Maak optelwerkbladen met thema-afbeeldingen voor de klas. 104 thema\'s, 4 oefenmodi, antwoordblad en printklare PDF\'s. Gratis proefversie met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar fichas de adição para a sala de aula',
      secondaryKeywords: [
        'criador de fichas de adição para professores',
        'fichas de adição matemática para crianças',
        'exercícios de adição imprimíveis',
        'fichas de adição com imagens para pré-escola',
      ],
      lsiKeywords: [
        'fichas matemáticas visuais para a classe',
        'exercícios de adição com imagens para crianças',
        'fichas matemáticas pré-escola para professores',
      ],
      titleTag: 'Criar Fichas de Adição — Para Professores e Pais',
      metaDescription: 'Crie fichas de adição com imagens temáticas para a sala de aula. 104 temas, dificuldade ajustável, gabarito incluído, PDF imprimível. Teste com marca d\'água.',
    },
  },

  'math-puzzle': {
    en: {
      primaryKeyword: 'math puzzle maker for classroom',
      secondaryKeywords: [
        'jigsaw math worksheets for teachers',
        'math puzzle creator for kids',
        'picture math puzzles for classroom',
        'printable math puzzle worksheets for students',
      ],
      lsiKeywords: [
        'image grid math puzzle for classroom use',
        'jigsaw-style math activity for kids',
        'configurable math puzzle worksheet creator',
      ],
      titleTag: 'Math Puzzle Maker — Jigsaw Worksheets for Class',
      metaDescription: 'Create jigsaw-style math puzzles for your classroom. Image grid puzzles with addition and subtraction, configurable grids, answer keys. Try with watermark.',
    },
    de: {
      primaryKeyword: 'Mathe-Rätsel für den Unterricht erstellen',
      secondaryKeywords: [
        'Puzzle-Mathe-Arbeitsblätter für Lehrer',
        'Mathe-Rätsel-Ersteller für Kinder',
        'Bild-Mathe-Rätsel für die Klasse',
        'druckbare Mathe-Rätsel für Schüler',
      ],
      lsiKeywords: [
        'Bildraster-Mathe-Rätsel für den Unterricht',
        'Puzzle-Mathe-Aktivität für Kinder',
        'konfigurierbarer Mathe-Rätsel-Ersteller',
      ],
      titleTag: 'Mathe-Rätsel Erstellen — Puzzles für die Klasse',
      metaDescription: 'Puzzle-Mathe-Arbeitsblätter im Jigsaw-Stil für den Unterricht erstellen. Bildraster, drei Rechenarten, Lösungsschlüssel. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des puzzles maths pour la classe',
      secondaryKeywords: [
        'puzzles mathématiques jigsaw pour enseignants',
        'créateur de puzzles maths pour enfants',
        'puzzles maths avec images pour la classe',
        'fiches puzzles maths imprimables pour élèves',
      ],
      lsiKeywords: [
        'puzzle maths avec grille d\'images pour la classe',
        'activité puzzle maths jigsaw pour enfants',
        'créateur de puzzles maths configurable',
      ],
      titleTag: 'Créer des Puzzles Maths — Pour la Classe',
      metaDescription: 'Créez des puzzles maths jigsaw pour la classe. Grilles d\'images avec addition et soustraction, corrigés inclus. Essai gratuit avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear puzzles matemáticos para el aula',
      secondaryKeywords: [
        'puzzles matemáticos jigsaw para profesores',
        'creador de puzzles matemáticos para niños',
        'puzzles de matemáticas con imágenes para clase',
        'fichas de puzzles matemáticos para alumnos',
      ],
      lsiKeywords: [
        'puzzle matemático con cuadrícula para el aula',
        'actividad puzzle matemático jigsaw para niños',
        'creador de puzzles matemáticos configurable',
      ],
      titleTag: 'Crear Puzzles Matemáticos — Para Profesores',
      metaDescription: 'Crea puzzles matemáticos tipo rompecabezas para el aula. Cuadrículas con imágenes, tres modos de operación, clave de respuestas. Prueba con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare puzzle matematici per la classe',
      secondaryKeywords: [
        'puzzle matematici jigsaw per insegnanti',
        'creatore di puzzle matematici per bambini',
        'puzzle di matematica con immagini per la classe',
        'schede puzzle matematici per studenti',
      ],
      lsiKeywords: [
        'puzzle matematico con griglia per la classe',
        'attività puzzle matematico per bambini',
        'creatore di puzzle matematici configurabile',
      ],
      titleTag: 'Creare Puzzle Matematici — Per Insegnanti',
      metaDescription: 'Crea puzzle matematici con griglie di immagini per la classe. Tre modalità operative, chiave di risposta automatica. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'rekenpuzzels maken voor de klas',
      secondaryKeywords: [
        'legpuzzel rekenwerkbladen voor leerkrachten',
        'rekenpuzzel maker voor kinderen',
        'rekenpuzzels met afbeeldingen voor de klas',
        'printbare rekenpuzzel werkbladen voor leerlingen',
      ],
      lsiKeywords: [
        'afbeeldingraster rekenpuzzel voor de klas',
        'legpuzzel rekenactiviteit voor kinderen',
        'configureerbare rekenpuzzel maker',
      ],
      titleTag: 'Rekenpuzzels Maken — Puzzels voor de Klas',
      metaDescription: 'Maak legpuzzel-stijl rekenpuzzels voor de klas. Afbeeldingrasters, drie rekenmodi, antwoordblad. Gratis proefversie met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar puzzles matemáticos para a sala de aula',
      secondaryKeywords: [
        'puzzles matemáticos jigsaw para professores',
        'criador de puzzles matemáticos para crianças',
        'puzzles de matemática com imagens para a classe',
        'fichas de puzzles matemáticos para alunos',
      ],
      lsiKeywords: [
        'puzzle matemático com quadrícula para a classe',
        'atividade puzzle matemático para crianças',
        'criador de puzzles matemáticos configurável',
      ],
      titleTag: 'Criar Puzzles Matemáticos — Para Professores',
      metaDescription: 'Crie puzzles matemáticos tipo quebra-cabeça para a sala de aula. Quadrículas de imagens, três modos, gabarito automático. Teste grátis com marca d\'água.',
    },
  },

  'bingo': {
    en: {
      primaryKeyword: 'bingo card maker for teachers',
      secondaryKeywords: [
        'picture bingo card creator for classroom',
        'bingo game maker for kids',
        'printable bingo cards for school',
        'custom bingo card generator for teachers',
      ],
      lsiKeywords: [
        'batch bingo card generator for classroom games',
        'image and word bingo card maker',
        'call-out sheet bingo worksheet creator',
      ],
      titleTag: 'Bingo Card Maker — Picture Bingo for Classroom',
      metaDescription: 'Create picture bingo cards for classroom games. Grids from 3x3 to 5x5, batch unique cards, call-out sheets, 104 themes. Try with watermark — no signup.',
    },
    de: {
      primaryKeyword: 'Bingo-Karten für den Unterricht erstellen',
      secondaryKeywords: [
        'Bilder-Bingo-Ersteller für die Klasse',
        'Bingo-Spiel-Ersteller für Kinder',
        'druckbare Bingo-Karten für die Schule',
        'Bingo-Karten-Generator für Lehrer',
      ],
      lsiKeywords: [
        'Stapel-Bingo-Karten für Klassenspiele',
        'Bild-und-Wort-Bingo-Ersteller',
        'Ansageblatt-Bingo-Arbeitsblatt-Ersteller',
      ],
      titleTag: 'Bingo-Karten Erstellen — Bilder-Bingo für die Klasse',
      metaDescription: 'Bingo-Karten für den Unterricht erstellen. Raster von 3x3 bis 5x5, Stapel-Generierung, Ansageblatt, 104 Themen. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des cartes bingo pour la classe',
      secondaryKeywords: [
        'créateur de bingo à images pour la classe',
        'jeu de bingo créateur pour enfants',
        'cartes de bingo imprimables pour l\'école',
        'générateur de cartes bingo pour enseignants',
      ],
      lsiKeywords: [
        'générateur de cartes bingo par lots pour la classe',
        'créateur de bingo images et mots',
        'feuille d\'appel bingo créateur',
      ],
      titleTag: 'Créer des Cartes Bingo — Pour la Classe',
      metaDescription: 'Créez des cartes bingo à images pour la classe. Grilles 3x3 à 5x5, lots de cartes uniques, feuilles d\'appel, 104 thèmes. Essai gratuit avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear tarjetas de bingo para el aula',
      secondaryKeywords: [
        'creador de bingo con imágenes para la clase',
        'creador de juegos de bingo para niños',
        'tarjetas de bingo imprimibles para la escuela',
        'generador de tarjetas bingo para profesores',
      ],
      lsiKeywords: [
        'generador de tarjetas bingo por lotes para la clase',
        'creador de bingo con imágenes y palabras',
        'hoja de referencia bingo creador',
      ],
      titleTag: 'Crear Tarjetas de Bingo — Para el Aula',
      metaDescription: 'Crea tarjetas de bingo con imágenes para el aula. Cuadrículas de 3x3 a 5x5, lotes de tarjetas únicas, hojas de referencia, 104 temas. Prueba con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare cartelle bingo per la classe',
      secondaryKeywords: [
        'creatore di bingo illustrato per la classe',
        'creatore di giochi bingo per bambini',
        'cartelle bingo stampabili per la scuola',
        'generatore di cartelle bingo per insegnanti',
      ],
      lsiKeywords: [
        'generatore batch di cartelle bingo per la classe',
        'creatore di bingo con immagini e parole',
        'foglio di richiamo bingo creatore',
      ],
      titleTag: 'Creare Cartelle Bingo — Bingo per la Classe',
      metaDescription: 'Crea cartelle bingo illustrate per la classe. Griglie da 3x3 a 5x5, generazione batch, foglio di richiamo, 104 temi. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'bingokaarten maken voor de klas',
      secondaryKeywords: [
        'plaatjesbingo maker voor de klas',
        'bingospel maker voor kinderen',
        'printbare bingokaarten voor school',
        'bingokaarten generator voor leerkrachten',
      ],
      lsiKeywords: [
        'batch bingokaarten generator voor de klas',
        'beeld-en-woord bingo maker',
        'afroepblad bingo werkblad maker',
      ],
      titleTag: 'Bingokaarten Maken — Plaatjesbingo voor de Klas',
      metaDescription: 'Maak plaatjesbingokaarten voor de klas. Rasters van 3x3 tot 5x5, batchgeneratie, afroepbladen, 104 thema\'s. Gratis proefversie met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar cartelas de bingo para a sala de aula',
      secondaryKeywords: [
        'criador de bingo com imagens para a classe',
        'criador de jogos de bingo para crianças',
        'cartelas de bingo imprimíveis para a escola',
        'gerador de cartelas bingo para professores',
      ],
      lsiKeywords: [
        'gerador batch de cartelas bingo para a classe',
        'criador de bingo com imagens e palavras',
        'folha de chamada bingo criador',
      ],
      titleTag: 'Criar Cartelas de Bingo — Para a Sala de Aula',
      metaDescription: 'Crie cartelas de bingo com imagens para a sala de aula. Grelhas de 3x3 a 5x5, lotes de cartelas únicas, folhas de chamada, 104 temas. Teste com marca d\'água.',
    },
  },

  'chart-count': {
    en: {
      primaryKeyword: 'picture graph worksheet maker for teachers',
      secondaryKeywords: [
        'pictograph worksheet creator for classroom',
        'chart count worksheets for kids',
        'printable data graph worksheets for school',
        'picture graph activity maker for teachers',
      ],
      lsiKeywords: [
        'scattered image grid counting worksheet',
        'auto answer key picture graph creator',
        'data representation worksheet for classroom',
      ],
      titleTag: 'Picture Graph Worksheet Maker — For Classroom',
      metaDescription: 'Create picture graph worksheets for classroom math. Scattered 4x5 grids, 6 image types, auto answer keys, 11 languages, 104 themes. Try with watermark.',
    },
    de: {
      primaryKeyword: 'Bilddiagramm-Arbeitsblätter für den Unterricht',
      secondaryKeywords: [
        'Bilddiagramm-Ersteller für die Klasse',
        'Zähl-und-Diagramm-Arbeitsblätter für Kinder',
        'druckbare Datendiagramm-Arbeitsblätter für die Schule',
        'Bilddiagramm-Aktivität für Lehrer',
      ],
      lsiKeywords: [
        'Bildraster-Zähl-Arbeitsblatt für den Unterricht',
        'automatischer Lösungsschlüssel Bilddiagramm',
        'Datenvisualisierung Arbeitsblatt für die Klasse',
      ],
      titleTag: 'Bilddiagramm-Arbeitsblätter — Für den Unterricht',
      metaDescription: 'Bilddiagramm-Arbeitsblätter für den Unterricht erstellen. 4x5-Bildraster, Lösungsschlüssel, 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des fiches graphique à images pour la classe',
      secondaryKeywords: [
        'créateur de pictogrammes pour la classe',
        'fiches de comptage et graphique pour enfants',
        'fiches de données graphiques pour l\'école',
        'activité graphique à images pour enseignants',
      ],
      lsiKeywords: [
        'grille d\'images dispersées pour compter',
        'corrigé automatique graphique à images',
        'fiche représentation de données pour la classe',
      ],
      titleTag: 'Fiches Graphique à Images — Pour la Classe',
      metaDescription: 'Créez des fiches graphique à images pour la classe. Grille 4x5 dispersée, corrigés automatiques, 11 langues, 104 thèmes. Essai gratuit avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear fichas gráficos de imágenes para el aula',
      secondaryKeywords: [
        'creador de pictogramas para la clase',
        'fichas de conteo y gráfico para niños',
        'fichas de gráficos de datos para la escuela',
        'actividad gráfico de imágenes para profesores',
      ],
      lsiKeywords: [
        'cuadrícula de imágenes dispersas para contar',
        'clave de respuestas automática gráfico pictórico',
        'ficha representación de datos para el aula',
      ],
      titleTag: 'Fichas Gráficos de Imágenes — Para el Aula',
      metaDescription: 'Crea fichas de gráficos pictóricos para el aula. Cuadrícula 4x5, 6 tipos de imágenes, clave de respuestas, 11 idiomas. Prueba gratis con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare schede grafico con immagini per la classe',
      secondaryKeywords: [
        'creatore di pittogrammi per la classe',
        'schede conteggio e grafico per bambini',
        'schede grafici dati per la scuola',
        'attività grafico con immagini per insegnanti',
      ],
      lsiKeywords: [
        'griglia immagini sparse per contare',
        'chiave di risposta automatica grafico pittorico',
        'scheda rappresentazione dati per la classe',
      ],
      titleTag: 'Schede Grafico con Immagini — Per la Classe',
      metaDescription: 'Crea schede grafico con immagini per la classe. Griglia 4x5, 6 tipi di icone, chiave di risposta automatica, 11 lingue. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'plaatjesgrafiek werkbladen maken voor de klas',
      secondaryKeywords: [
        'pictogram werkblad maker voor de klas',
        'tel-en-grafiek werkbladen voor kinderen',
        'printbare datagrafiek werkbladen voor school',
        'plaatjesgrafiek activiteit voor leerkrachten',
      ],
      lsiKeywords: [
        'verspreide afbeeldingraster tel werkblad',
        'automatisch antwoordblad plaatjesgrafiek',
        'datavisualisatie werkblad voor de klas',
      ],
      titleTag: 'Plaatjesgrafiek Werkbladen — Voor de Klas',
      metaDescription: 'Maak plaatjesgrafiek werkbladen voor de klas. 4x5 rasters, automatische antwoordbladen, 11 talen, 104 thema\'s. Gratis proefversie met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar fichas gráficos de imagens para a sala de aula',
      secondaryKeywords: [
        'criador de pictogramas para a classe',
        'fichas de contagem e gráfico para crianças',
        'fichas de gráficos de dados para a escola',
        'atividade gráfico de imagens para professores',
      ],
      lsiKeywords: [
        'quadrícula de imagens dispersas para contar',
        'gabarito automático gráfico pictórico',
        'ficha representação de dados para a classe',
      ],
      titleTag: 'Fichas Gráficos de Imagens — Para a Classe',
      metaDescription: 'Crie fichas de gráficos pictóricos para a sala de aula. Grelha 4x5, 6 tipos de imagens, gabarito automático, 11 idiomas. Teste grátis com marca d\'água.',
    },
  },

  'crossword': {
    en: {
      primaryKeyword: 'picture crossword maker for classroom',
      secondaryKeywords: [
        'crossword puzzle creator for teachers',
        'image crossword worksheets for kids',
        'printable crossword puzzles for school',
        'vocabulary crossword maker for students',
      ],
      lsiKeywords: [
        'image-clue crossword puzzle for vocabulary practice',
        'localized crossword word generator for classroom',
        'auto answer key crossword worksheet creator',
      ],
      titleTag: 'Picture Crossword Maker — Crosswords for Students',
      metaDescription: 'Create picture crossword puzzles for classroom vocabulary practice. Image clues on 15x15 grid, 4 input methods, auto answer key. Try with watermark — no signup.',
    },
    de: {
      primaryKeyword: 'Kreuzworträtsel für den Unterricht erstellen',
      secondaryKeywords: [
        'Kreuzworträtsel-Ersteller für Lehrer',
        'Bild-Kreuzworträtsel für Kinder',
        'druckbare Kreuzworträtsel für die Schule',
        'Vokabel-Kreuzworträtsel für Schüler',
      ],
      lsiKeywords: [
        'Bild-Hinweis-Kreuzworträtsel für Vokabelübung',
        'lokalisierter Kreuzworträtsel-Generator für die Klasse',
        'automatischer Lösungsschlüssel Kreuzworträtsel',
      ],
      titleTag: 'Kreuzworträtsel Erstellen — Für den Unterricht',
      metaDescription: 'Bilderkreuzworträtsel für den Unterricht erstellen. 15x15-Raster, vier Eingabemethoden, automatischer Lösungsschlüssel. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des mots croisés pour la classe',
      secondaryKeywords: [
        'créateur de mots croisés pour enseignants',
        'mots croisés en images pour enfants',
        'mots croisés imprimables pour l\'école',
        'mots croisés vocabulaire pour élèves',
      ],
      lsiKeywords: [
        'mots croisés avec indices visuels pour vocabulaire',
        'générateur de mots croisés localisé pour la classe',
        'corrigé automatique mots croisés créateur',
      ],
      titleTag: 'Créer des Mots Croisés — Pour la Classe',
      metaDescription: 'Créez des mots croisés en images pour la classe. Grille 15x15, quatre méthodes de saisie, corrigés automatiques, 104 thèmes. Essai gratuit avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear crucigramas con imágenes para el aula',
      secondaryKeywords: [
        'creador de crucigramas para profesores',
        'crucigramas con imágenes para niños',
        'crucigramas imprimibles para la escuela',
        'crucigramas de vocabulario para alumnos',
      ],
      lsiKeywords: [
        'crucigrama con pistas de imágenes para vocabulario',
        'generador de crucigramas localizado para el aula',
        'clave de respuestas automática crucigrama',
      ],
      titleTag: 'Crear Crucigramas — Vocabulario para el Aula',
      metaDescription: 'Crea crucigramas con pistas de imágenes para el aula. Cuadrícula 15x15, cuatro métodos de entrada, clave de respuestas automática. Prueba con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare cruciverba con immagini per la classe',
      secondaryKeywords: [
        'creatore di cruciverba per insegnanti',
        'cruciverba con immagini per bambini',
        'cruciverba stampabili per la scuola',
        'cruciverba di vocabolario per studenti',
      ],
      lsiKeywords: [
        'cruciverba con indizi visivi per il vocabolario',
        'generatore di cruciverba localizzato per la classe',
        'chiave di risposta automatica cruciverba',
      ],
      titleTag: 'Creare Cruciverba con Immagini — Per la Classe',
      metaDescription: 'Crea cruciverba con immagini per la classe. Griglia 15x15, quattro metodi di input, chiave di risposta automatica. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'kruiswoordpuzzel maken voor de klas',
      secondaryKeywords: [
        'kruiswoordpuzzel maker voor leerkrachten',
        'plaatjes kruiswoordpuzzels voor kinderen',
        'printbare kruiswoordpuzzels voor school',
        'woordenschat kruiswoordpuzzel voor leerlingen',
      ],
      lsiKeywords: [
        'kruiswoordpuzzel met visuele aanwijzingen',
        'gelokaliseerde kruiswoordpuzzel generator voor de klas',
        'automatisch antwoordblad kruiswoordpuzzel',
      ],
      titleTag: 'Kruiswoordpuzzel Maken — Voor de Klas',
      metaDescription: 'Maak plaatjes kruiswoordpuzzels voor de klas. 15x15 raster, vier invoermethoden, automatisch antwoordblad. Gratis proefversie met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar palavras cruzadas com imagens para a sala',
      secondaryKeywords: [
        'criador de palavras cruzadas para professores',
        'palavras cruzadas com imagens para crianças',
        'palavras cruzadas imprimíveis para a escola',
        'palavras cruzadas vocabulário para alunos',
      ],
      lsiKeywords: [
        'palavras cruzadas com pistas visuais para vocabulário',
        'gerador de palavras cruzadas localizado para a classe',
        'gabarito automático palavras cruzadas',
      ],
      titleTag: 'Criar Palavras Cruzadas — Para a Sala de Aula',
      metaDescription: 'Crie palavras cruzadas com imagens para a sala de aula. Grelha 15x15, quatro métodos de entrada, gabarito automático. Teste grátis com marca d\'água.',
    },
  },

  'alphabet-train': {
    en: {
      primaryKeyword: 'alphabet train worksheet maker for kids',
      secondaryKeywords: [
        'alphabet train creator for classroom',
        'letter recognition worksheets for kids',
        'printable alphabet train for preschool',
        'alphabet matching worksheet maker for teachers',
      ],
      lsiKeywords: [
        'letter-image matching train worksheet for kids',
        'multilingual alphabet activity for classroom',
        'colorful alphabet train printable for preschool',
      ],
      titleTag: 'Alphabet Train Maker — Letter Practice for Kids',
      metaDescription: 'Create alphabet train worksheets for letter recognition. 11 colorful wagons, letter-image matching, 11 languages, 104 themes. Try with watermark — no signup.',
    },
    de: {
      primaryKeyword: 'Alphabet-Zug-Arbeitsblätter für Kinder erstellen',
      secondaryKeywords: [
        'Alphabet-Zug-Ersteller für die Klasse',
        'Buchstabenerkennung Arbeitsblätter für Kinder',
        'druckbarer Alphabet-Zug für Vorschule',
        'Buchstaben-Zuordnung Ersteller für Lehrer',
      ],
      lsiKeywords: [
        'Buchstabe-Bild-Zuordnung Zug für Kinder',
        'mehrsprachige Alphabet-Aktivität für die Klasse',
        'bunter Alphabet-Zug zum Ausdrucken',
      ],
      titleTag: 'Alphabet-Zug Erstellen — Buchstabenüben für Kinder',
      metaDescription: 'Alphabet-Zug-Arbeitsblätter für Buchstabenerkennung erstellen. 11 bunte Waggons, Buchstabe-Bild-Zuordnung, 11 Sprachen. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des fiches train alphabet pour enfants',
      secondaryKeywords: [
        'créateur de train alphabet pour la classe',
        'fiches reconnaissance des lettres pour enfants',
        'train alphabet imprimable pour maternelle',
        'créateur d\'association lettres-images pour enseignants',
      ],
      lsiKeywords: [
        'fiche train association lettre-image pour enfants',
        'activité alphabet multilingue pour la classe',
        'train alphabet coloré imprimable pour maternelle',
      ],
      titleTag: 'Fiches Train Alphabet — Lettres pour Enfants',
      metaDescription: 'Créez des fiches train alphabet pour reconnaître les lettres. 11 wagons colorés, association lettre-image, 11 langues, 104 thèmes. Essai avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear fichas tren del abecedario para niños',
      secondaryKeywords: [
        'creador de tren del abecedario para la clase',
        'fichas reconocimiento de letras para niños',
        'tren del abecedario imprimible para preescolar',
        'creador de asociación letra-imagen para profesores',
      ],
      lsiKeywords: [
        'ficha tren asociación letra-imagen para niños',
        'actividad alfabeto multilingüe para el aula',
        'tren del abecedario colorido imprimible',
      ],
      titleTag: 'Fichas Tren del Abecedario — Letras para Niños',
      metaDescription: 'Crea fichas de tren del abecedario para reconocer letras. 11 vagones coloridos, asociación letra-imagen, 11 idiomas. Prueba gratis con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare schede treno alfabeto per bambini',
      secondaryKeywords: [
        'creatore di treno alfabeto per la classe',
        'schede riconoscimento lettere per bambini',
        'treno alfabeto stampabile per scuola materna',
        'creatore abbinamento lettera-immagine per insegnanti',
      ],
      lsiKeywords: [
        'scheda treno abbinamento lettera-immagine per bambini',
        'attività alfabeto multilingue per la classe',
        'treno alfabeto colorato stampabile',
      ],
      titleTag: 'Schede Treno Alfabeto — Lettere per Bambini',
      metaDescription: 'Crea schede treno dell\'alfabeto per il riconoscimento lettere. 11 vagoni colorati, abbinamento lettera-immagine, 11 lingue. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'alfabettrein werkbladen maken voor kinderen',
      secondaryKeywords: [
        'alfabettrein maker voor de klas',
        'letterherkenning werkbladen voor kinderen',
        'printbare alfabettrein voor kleuters',
        'letter-afbeelding koppeling maker voor leerkrachten',
      ],
      lsiKeywords: [
        'letter-afbeelding trein werkblad voor kinderen',
        'meertalige alfabet activiteit voor de klas',
        'kleurrijke alfabettrein om te printen',
      ],
      titleTag: 'Alfabettrein Werkbladen — Letteroefeningen',
      metaDescription: 'Maak alfabettrein werkbladen voor letterherkenning. 11 kleurrijke wagons, letter-afbeelding koppeling, 11 talen, 104 thema\'s. Gratis met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar fichas trem do alfabeto para crianças',
      secondaryKeywords: [
        'criador de trem do alfabeto para a classe',
        'fichas reconhecimento de letras para crianças',
        'trem do alfabeto imprimível para pré-escola',
        'criador associação letra-imagem para professores',
      ],
      lsiKeywords: [
        'ficha trem associação letra-imagem para crianças',
        'atividade alfabeto multilíngue para a classe',
        'trem do alfabeto colorido imprimível',
      ],
      titleTag: 'Fichas Trem do Alfabeto — Letras para Crianças',
      metaDescription: 'Crie fichas de trem do alfabeto para reconhecer letras. 11 vagões coloridos, associação letra-imagem, 11 idiomas. Teste grátis com marca d\'água.',
    },
  },

  'code-addition': {
    en: {
      primaryKeyword: 'code breaker math worksheet maker',
      secondaryKeywords: [
        'crack the code math worksheets for teachers',
        'code breaker puzzles for classroom',
        'printable cipher math worksheets for kids',
        'secret code addition worksheet creator',
      ],
      lsiKeywords: [
        'image cipher math puzzle for classroom',
        'word reveal code-cracking worksheet',
        'number code math activity for students',
      ],
      titleTag: 'Code Breaker Math Maker — Worksheets for Class',
      metaDescription: 'Create code-cracking math worksheets for classroom fun. Image cipher puzzles with addition, Word Reveal mode, 11 languages. Try with watermark — no signup.',
    },
    de: {
      primaryKeyword: 'Code-Knacker-Mathe-Arbeitsblätter erstellen',
      secondaryKeywords: [
        'Code-Knacker-Rätsel für den Unterricht',
        'Geheimcode-Mathe-Arbeitsblätter für Kinder',
        'druckbare Chiffre-Rätsel für die Klasse',
        'Additions-Code-Arbeitsblatt-Ersteller',
      ],
      lsiKeywords: [
        'Bilder-Chiffre-Mathe-Rätsel für die Klasse',
        'Wort-Enthüllung Code-Knacker-Arbeitsblatt',
        'Zahlencode-Mathe-Aktivität für Schüler',
      ],
      titleTag: 'Code-Knacker Mathe — Rätsel für den Unterricht',
      metaDescription: 'Code-Knacker-Additions-Rätsel für den Unterricht erstellen. Bildsymbole, Wort-Entschlüsselung, 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des fiches addition codée pour la classe',
      secondaryKeywords: [
        'puzzles code secret maths pour enseignants',
        'fiches addition chiffrée pour la classe',
        'exercices code maths imprimables pour enfants',
        'créateur de fiches addition codée',
      ],
      lsiKeywords: [
        'puzzle chiffré maths avec images pour la classe',
        'fiche mot mystère code-cracker',
        'activité code numérique maths pour élèves',
      ],
      titleTag: 'Fiches Addition Codée — Puzzles pour la Classe',
      metaDescription: 'Créez des puzzles d\'addition codée pour la classe. Codes secrets avec images, mode Mot Mystère, 11 langues. Essai gratuit avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear fichas suma codificada para el aula',
      secondaryKeywords: [
        'puzzles código secreto matemáticas para profesores',
        'fichas suma cifrada para la clase',
        'ejercicios código matemáticas para niños',
        'creador de fichas suma codificada',
      ],
      lsiKeywords: [
        'puzzle cifrado matemáticas con imágenes para el aula',
        'ficha descubrir palabra código secreto',
        'actividad código numérico matemáticas para alumnos',
      ],
      titleTag: 'Fichas Suma Codificada — Puzzles para el Aula',
      metaDescription: 'Crea puzzles de suma codificada para el aula. Códigos secretos con imágenes, modo Descubrir Palabra, 11 idiomas. Prueba gratis con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare schede addizione codificata per la classe',
      secondaryKeywords: [
        'puzzle codice segreto matematica per insegnanti',
        'schede addizione cifrata per la classe',
        'esercizi codice matematica per bambini',
        'creatore di schede addizione codificata',
      ],
      lsiKeywords: [
        'puzzle cifrato matematica con immagini per la classe',
        'scheda rivela parola codice segreto',
        'attività codice numerico matematica per studenti',
      ],
      titleTag: 'Schede Addizione Codificata — Per la Classe',
      metaDescription: 'Crea puzzle di addizione codificata per la classe. Simboli immagine, modalità Rivela Parola, 11 lingue. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'codekraker rekenwerkbladen maken voor de klas',
      secondaryKeywords: [
        'geheime code rekenpuzzels voor leerkrachten',
        'codekraker werkbladen voor de klas',
        'printbare cijfercode puzzels voor kinderen',
        'optellen codekraker werkblad maker',
      ],
      lsiKeywords: [
        'afbeelding cijferpuzzel voor de klas',
        'woord onthullen codekraker werkblad',
        'getalcode rekenactiviteit voor leerlingen',
      ],
      titleTag: 'Codekraker Reken Werkbladen — Voor de Klas',
      metaDescription: 'Maak codekraak-rekenpuzzels voor de klas. Afbeeldingssymbolen, twee modi, 11 talen, 104 thema\'s. Gratis proefversie met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar fichas adição codificada para a sala de aula',
      secondaryKeywords: [
        'puzzles código secreto matemática para professores',
        'fichas adição cifrada para a classe',
        'exercícios código matemática para crianças',
        'criador de fichas adição codificada',
      ],
      lsiKeywords: [
        'puzzle cifrado matemática com imagens para a classe',
        'ficha palavra revelada código secreto',
        'atividade código numérico matemática para alunos',
      ],
      titleTag: 'Fichas Adição Codificada — Puzzles para a Classe',
      metaDescription: 'Crie puzzles de adição codificada para a sala de aula. Códigos secretos com imagens, modo Palavra Revelada, 11 idiomas. Teste grátis com marca d\'água.',
    },
  },

  'big-small': {
    en: {
      primaryKeyword: 'size comparison worksheet maker for kids',
      secondaryKeywords: [
        'big and small worksheets for preschool',
        'size comparison creator for classroom',
        'printable size ordering worksheets for kids',
        'big small medium worksheets for kindergarten',
      ],
      lsiKeywords: [
        'visual size discrimination worksheet for kids',
        'zero-text size comparison printable',
        'big small ordering activity for preschool',
      ],
      titleTag: 'Size Comparison Worksheet Maker — For Kids',
      metaDescription: 'Create size comparison worksheets for preschool and kindergarten. Five question types, identical and different image modes, 104 themes. Try with watermark.',
    },
    de: {
      primaryKeyword: 'Größenvergleich-Arbeitsblätter für Kinder',
      secondaryKeywords: [
        'groß und klein Arbeitsblätter für Vorschule',
        'Größenvergleich-Ersteller für die Klasse',
        'druckbare Größenanordnung für Kinder',
        'groß klein mittel Arbeitsblätter für Kindergarten',
      ],
      lsiKeywords: [
        'visuelle Größenunterscheidung Arbeitsblatt',
        'textfreie Größenvergleich-Arbeitsblätter',
        'groß klein Anordnung Aktivität für Vorschule',
      ],
      titleTag: 'Größenvergleich Arbeitsblätter — Für Kinder',
      metaDescription: 'Größenvergleich-Arbeitsblätter für Kindergarten und Vorschule erstellen. Fünf Fragetypen, textfreie Ausgabe, 104 Themen. Kostenlos testen mit Wasserzeichen.',
    },
    fr: {
      primaryKeyword: 'créer des fiches grand et petit pour enfants',
      secondaryKeywords: [
        'fiches grand et petit pour maternelle',
        'créateur de comparaison de tailles pour la classe',
        'fiches classement par taille pour enfants',
        'fiches grand petit moyen pour maternelle',
      ],
      lsiKeywords: [
        'discrimination visuelle des tailles pour enfants',
        'fiche comparaison de tailles sans texte',
        'activité classement grand petit pour maternelle',
      ],
      titleTag: 'Fiches Grand et Petit — Pour Enfants',
      metaDescription: 'Créez des fiches de comparaison de tailles pour les enfants. Cinq types de questions, modes identiques et différents, 104 thèmes. Essai avec filigrane.',
    },
    es: {
      primaryKeyword: 'crear fichas grande y pequeño para niños',
      secondaryKeywords: [
        'fichas grande y pequeño para preescolar',
        'creador de comparación de tamaños para el aula',
        'fichas ordenar por tamaño para niños',
        'fichas grande pequeño mediano para kínder',
      ],
      lsiKeywords: [
        'discriminación visual de tamaños para niños',
        'ficha comparación de tamaños sin texto',
        'actividad ordenar grande pequeño para preescolar',
      ],
      titleTag: 'Fichas Grande y Pequeño — Para Niños',
      metaDescription: 'Crea fichas de comparación de tamaños para preescolar. Cinco tipos de ejercicio, dos modos de imagen, 104 temas. Prueba gratis con marca de agua.',
    },
    it: {
      primaryKeyword: 'creare schede grande piccolo per bambini',
      secondaryKeywords: [
        'schede grande e piccolo per scuola materna',
        'creatore confronto dimensioni per la classe',
        'schede ordinamento per dimensione per bambini',
        'schede grande piccolo medio per asilo',
      ],
      lsiKeywords: [
        'discriminazione visiva dimensioni per bambini',
        'scheda confronto dimensioni senza testo',
        'attività ordinamento grande piccolo per materna',
      ],
      titleTag: 'Schede Grande e Piccolo — Per Bambini',
      metaDescription: 'Crea schede di confronto dimensioni per bambini. Cinque tipi di domanda, modalità immagini identiche e diverse, 104 temi. Prova gratuita con filigrana.',
    },
    nl: {
      primaryKeyword: 'groot klein werkbladen maken voor kinderen',
      secondaryKeywords: [
        'groot en klein werkbladen voor kleuters',
        'groottevergelijking maker voor de klas',
        'printbare grootte-ordening voor kinderen',
        'groot klein medium werkbladen voor kleuterschool',
      ],
      lsiKeywords: [
        'visuele grootte-discriminatie werkblad',
        'tekstvrije groottevergelijking werkbladen',
        'groot klein ordenen activiteit voor kleuters',
      ],
      titleTag: 'Groot Klein Werkbladen — Voor Kinderen',
      metaDescription: 'Maak groottevergelijking werkbladen voor kleuters. Vijf vraagtypen, identieke en verschillende afbeeldingsmodi, 104 thema\'s. Gratis met watermerk.',
    },
    pt: {
      primaryKeyword: 'criar fichas grande e pequeno para crianças',
      secondaryKeywords: [
        'fichas grande e pequeno para pré-escola',
        'criador de comparação de tamanhos para a classe',
        'fichas ordenar por tamanho para crianças',
        'fichas grande pequeno médio para jardim de infância',
      ],
      lsiKeywords: [
        'discriminação visual de tamanhos para crianças',
        'ficha comparação de tamanhos sem texto',
        'atividade ordenar grande pequeno para pré-escola',
      ],
      titleTag: 'Fichas Grande e Pequeno — Para Crianças',
      metaDescription: 'Crie fichas de comparação de tamanhos para crianças. Cinco tipos de perguntas, dois modos de imagem, 104 temas. Teste grátis com marca d\'água.',
    },
  },
};

// Apply changes
let totalUpdated = 0;
let errors = [];

for (const [toolId, locales] of Object.entries(seoFixes)) {
  for (const [locale, newSeo] of Object.entries(locales)) {
    const filePath = path.join(TOOL_CONTENT_DIR, locale, `${toolId}.ts`);

    if (!fs.existsSync(filePath)) {
      errors.push(`File not found: ${filePath}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Find the seo block using regex
    const seoRegex = /(\s+seo:\s*\{)([\s\S]*?)(\n\s+\},)/;
    const match = content.match(seoRegex);

    if (!match) {
      errors.push(`Could not find seo block in: ${filePath}`);
      continue;
    }

    // Build replacement seo block
    const indent = '    ';
    const secondaryStr = newSeo.secondaryKeywords.map(k => `${indent}  '${k.replace(/'/g, "\\'")}',`).join('\n');
    const lsiStr = newSeo.lsiKeywords.map(k => `${indent}  '${k.replace(/'/g, "\\'")}',`).join('\n');

    const newSeoBlock = `  seo: {
${indent}primaryKeyword: '${newSeo.primaryKeyword.replace(/'/g, "\\'")}',
${indent}secondaryKeywords: [
${secondaryStr}
${indent}],
${indent}lsiKeywords: [
${lsiStr}
${indent}],
${indent}titleTag: '${newSeo.titleTag.replace(/'/g, "\\'")}',
${indent}metaDescription: '${newSeo.metaDescription.replace(/'/g, "\\'")}',
${indent}},`;

    content = content.replace(seoRegex, newSeoBlock);

    fs.writeFileSync(filePath, content, 'utf8');
    totalUpdated++;
    console.log(`✅ Updated: ${locale}/${toolId}.ts`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${totalUpdated} files`);
if (errors.length > 0) {
  console.log(`Errors: ${errors.length}`);
  errors.forEach(e => console.log(`  ❌ ${e}`));
}
