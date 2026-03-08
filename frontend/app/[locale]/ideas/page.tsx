import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { ideaPageSlugs, getIdeaSlugForLocale } from '@/config/idea-page-slugs';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getSectionLabel } from '@/config/section-labels';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Localized page content
const ideasContent: Record<string, {
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  subcatDescriptions: Record<string, string>;
}> = {
  en: {
    heroTitle: 'Printable Business Niche Ideas',
    heroDescription: 'Find your perfect printable niche. 45 profitable ideas with product suggestions, platform tips, and pricing strategies.',
    metaTitle: 'Printable Business Niche Ideas | 45 Profitable Niches | LessonCraftStudio',
    metaDescription: 'Discover 45 profitable printable business niches. Product ideas organized by age group, subject, season, theme, and format. Find your perfect niche for Etsy and KDP.',
    ctaTitle: 'Ready to Start Your Niche?',
    ctaDescription: 'Try all 33 printable generators free with watermark. No signup required.',
    ctaButton: 'Try Free Generators',
    subcatDescriptions: {
      animals: 'Animal and nature themed printable niches',
      season: 'Seasonal and holiday-themed printable niches',
      interests: 'Interest and activity based printable niches',
      education: 'Educational focus and grade-level printable niches',
      business: 'Business model and product format niches',
    },
  },
  de: {
    heroTitle: 'Druckvorlagen-Gesch\u00e4ftsideen nach Nische',
    heroDescription: 'Finden Sie Ihre perfekte Druckvorlagen-Nische. 45 profitable Ideen mit Produktvorschl\u00e4gen, Plattform-Tipps und Preisstrategien.',
    metaTitle: 'Druckvorlagen-Nischenideen | 45 profitable Nischen | LessonCraftStudio',
    metaDescription: '45 profitable Druckvorlagen-Nischen entdecken. Produktideen nach Alter, Thema, Saison und Format. Perfekte Nische f\u00fcr Etsy und KDP finden.',
    ctaTitle: 'Bereit f\u00fcr Ihre Nische?',
    ctaDescription: 'Alle 33 Druckvorlagen-Generatoren gratis mit Wasserzeichen testen. Keine Anmeldung.',
    ctaButton: 'Generatoren gratis testen',
    subcatDescriptions: {
      animals: 'Tier- und Natur-Druckvorlagen-Nischen',
      season: 'Saisonale und feiertags-bezogene Druckvorlagen-Nischen',
      interests: 'Interessen- und aktivit\u00e4tsbasierte Druckvorlagen-Nischen',
      education: 'Bildungsorientierte und klassenstufenbezogene Druckvorlagen-Nischen',
      business: 'Gesch\u00e4ftsmodell- und Produktformat-Nischen',
    },
  },
  fr: {
    heroTitle: 'Id\u00e9es de niches d\'imprimables',
    heroDescription: 'Trouvez votre niche parfaite. 45 id\u00e9es rentables avec suggestions de produits, conseils de plateformes et strat\u00e9gies de prix.',
    metaTitle: 'Id\u00e9es de niches d\'imprimables | 45 niches rentables | LessonCraftStudio',
    metaDescription: 'D\u00e9couvrez 45 niches rentables d\'imprimables. Id\u00e9es class\u00e9es par \u00e2ge, th\u00e8me, saison et format. Trouvez votre niche pour Etsy et KDP.',
    ctaTitle: 'Pr\u00eat \u00e0 lancer votre niche ?',
    ctaDescription: 'Essayez les 33 g\u00e9n\u00e9rateurs gratuits avec filigrane. Sans inscription.',
    ctaButton: 'Essayer les g\u00e9n\u00e9rateurs',
    subcatDescriptions: {
      animals: 'Niches d\'imprimables sur les animaux et la nature',
      season: 'Niches d\'imprimables saisonniers et f\u00eates',
      interests: 'Niches d\'imprimables par int\u00e9r\u00eat et activit\u00e9',
      education: 'Niches d\'imprimables par niveau scolaire',
      business: 'Niches par mod\u00e8le commercial et format produit',
    },
  },
  es: {
    heroTitle: 'Ideas de nichos de imprimibles',
    heroDescription: 'Encuentra tu nicho perfecto. 45 ideas rentables con sugerencias de productos, consejos de plataformas y estrategias de precios.',
    metaTitle: 'Ideas de nichos de imprimibles | 45 nichos rentables | LessonCraftStudio',
    metaDescription: 'Descubre 45 nichos rentables de imprimibles. Ideas organizadas por edad, tema, temporada y formato. Encuentra tu nicho para Etsy y KDP.',
    ctaTitle: '\u00bfListo para empezar tu nicho?',
    ctaDescription: 'Prueba los 33 generadores gratis con marca de agua. Sin registro.',
    ctaButton: 'Probar generadores gratis',
    subcatDescriptions: {
      animals: 'Nichos de imprimibles de animales y naturaleza',
      season: 'Nichos de imprimibles de temporada y festividades',
      interests: 'Nichos de imprimibles por intereses y actividades',
      education: 'Nichos de imprimibles por nivel educativo',
      business: 'Nichos por modelo de negocio y formato de producto',
    },
  },
  pt: {
    heroTitle: 'Ideias de nichos de imprimir',
    heroDescription: 'Encontre o seu nicho perfeito. 45 ideias rent\u00e1veis com sugest\u00f5es de produtos, dicas de plataformas e estrat\u00e9gias de pre\u00e7os.',
    metaTitle: 'Ideias de nichos de imprimir | 45 nichos rent\u00e1veis | LessonCraftStudio',
    metaDescription: 'Descubra 45 nichos rent\u00e1veis de imprimir. Ideias organizadas por idade, tema, temporada e formato. Encontre o seu nicho para Etsy e KDP.',
    ctaTitle: 'Pronto para come\u00e7ar o seu nicho?',
    ctaDescription: 'Experimente os 33 geradores gr\u00e1tis com marca d\'\u00e1gua. Sem registo.',
    ctaButton: 'Experimentar geradores gr\u00e1tis',
    subcatDescriptions: {
      animals: 'Nichos de imprimir de animais e natureza',
      season: 'Nichos de imprimir sazonais e festivos',
      interests: 'Nichos de imprimir por interesses e atividades',
      education: 'Nichos de imprimir por n\u00edvel educativo',
      business: 'Nichos por modelo de neg\u00f3cio e formato de produto',
    },
  },
  it: {
    heroTitle: 'Idee di nicchie per stampabili',
    heroDescription: 'Trova la tua nicchia perfetta. 45 idee redditizie con suggerimenti di prodotti, consigli sulle piattaforme e strategie di prezzo.',
    metaTitle: 'Idee di nicchie per stampabili | 45 nicchie redditizie | LessonCraftStudio',
    metaDescription: 'Scopri 45 nicchie redditizie di stampabili. Idee organizzate per et\u00e0, tema, stagione e formato. Trova la tua nicchia per Etsy e KDP.',
    ctaTitle: 'Pronto a iniziare la tua nicchia?',
    ctaDescription: 'Prova tutti i 33 generatori gratis con filigrana. Senza registrazione.',
    ctaButton: 'Prova i generatori gratis',
    subcatDescriptions: {
      animals: 'Nicchie di stampabili su animali e natura',
      season: 'Nicchie di stampabili stagionali e festivi',
      interests: 'Nicchie di stampabili per interessi e attivit\u00e0',
      education: 'Nicchie di stampabili per livello scolastico',
      business: 'Nicchie per modello di business e formato prodotto',
    },
  },
  nl: {
    heroTitle: 'Printbare niche-idee\u00ebn',
    heroDescription: 'Vind je perfecte printbare niche. 45 winstgevende idee\u00ebn met productsuggesties, platformtips en prijsstrategie\u00ebn.',
    metaTitle: 'Printbare niche-idee\u00ebn | 45 winstgevende niches | LessonCraftStudio',
    metaDescription: 'Ontdek 45 winstgevende printbare niches. Idee\u00ebn georganiseerd op leeftijd, thema, seizoen en formaat. Vind je niche voor Etsy en KDP.',
    ctaTitle: 'Klaar om je niche te starten?',
    ctaDescription: 'Probeer alle 33 generatoren gratis met watermerk. Geen registratie.',
    ctaButton: 'Generatoren gratis proberen',
    subcatDescriptions: {
      animals: 'Dieren- en natuur-printbare niches',
      season: 'Seizoens- en feestdagen-printbare niches',
      interests: 'Interesse- en activiteitsgerichte printbare niches',
      education: 'Educatieve en leeftijdsgerichte printbare niches',
      business: 'Bedrijfsmodel- en productformaatniches',
    },
  },
  sv: {
    heroTitle: 'Nischid\u00e9er f\u00f6r utskrifter',
    heroDescription: 'Hitta din perfekta utskriftsnisch. 45 l\u00f6nsamma id\u00e9er med produktf\u00f6rslag, plattformstips och prisstrategier.',
    metaTitle: 'Nischid\u00e9er f\u00f6r utskrifter | 45 l\u00f6nsamma nischer | LessonCraftStudio',
    metaDescription: 'Uppt\u00e4ck 45 l\u00f6nsamma utskriftsnischer. Id\u00e9er organiserade efter \u00e5lder, \u00e4mne, s\u00e4song och format. Hitta din nisch f\u00f6r Etsy och KDP.',
    ctaTitle: 'Redo att starta din nisch?',
    ctaDescription: 'Prova alla 33 generatorer gratis med vattenst\u00e4mpel. Ingen registrering.',
    ctaButton: 'Prova generatorerna gratis',
    subcatDescriptions: {
      animals: 'Djur- och naturtema utskriftsnischer',
      season: 'S\u00e4songs- och h\u00f6gtidstema utskriftsnischer',
      interests: 'Intresse- och aktivitetsbaserade utskriftsnischer',
      education: 'Utbildningsfokuserade utskriftsnischer',
      business: 'Aff\u00e4rsmodell- och produktformatnischer',
    },
  },
  da: {
    heroTitle: 'Niche-id\u00e9er til printables',
    heroDescription: 'Find din perfekte printbare niche. 45 profitable id\u00e9er med produktforslag, platformstips og prisstrategier.',
    metaTitle: 'Niche-id\u00e9er til printables | 45 profitable nicher | LessonCraftStudio',
    metaDescription: 'Opdag 45 profitable printbare nicher. Id\u00e9er organiseret efter alder, emne, s\u00e6son og format. Find din niche til Etsy og KDP.',
    ctaTitle: 'Klar til at starte din niche?',
    ctaDescription: 'Pr\u00f8v alle 33 generatorer gratis med vandm\u00e6rke. Ingen tilmelding.',
    ctaButton: 'Pr\u00f8v generatorerne gratis',
    subcatDescriptions: {
      animals: 'Dyre- og naturtema printbare nicher',
      season: 'S\u00e6son- og h\u00f8jtidstema printbare nicher',
      interests: 'Interesse- og aktivitetsbaserede printbare nicher',
      education: 'Uddannelsesfokuserede printbare nicher',
      business: 'Forretningsmodel- og produktformatnicher',
    },
  },
  no: {
    heroTitle: 'Nisjeid\u00e9er for utskrifter',
    heroDescription: 'Finn din perfekte utskriftsnisje. 45 l\u00f8nnsomme id\u00e9er med produktforslag, plattformtips og prisstrategier.',
    metaTitle: 'Nisjeid\u00e9er for utskrifter | 45 l\u00f8nnsomme nisjer | LessonCraftStudio',
    metaDescription: 'Oppdag 45 l\u00f8nnsomme utskriftsnisjer. Id\u00e9er organisert etter alder, tema, sesong og format. Finn din nisje for Etsy og KDP.',
    ctaTitle: 'Klar til \u00e5 starte din nisje?',
    ctaDescription: 'Pr\u00f8v alle 33 generatorer gratis med vannmerke. Ingen registrering.',
    ctaButton: 'Pr\u00f8v generatorene gratis',
    subcatDescriptions: {
      animals: 'Dyre- og naturtema utskriftsnisjer',
      season: 'Sesong- og h\u00f8ytidstema utskriftsnisjer',
      interests: 'Interesse- og aktivitetsbaserte utskriftsnisjer',
      education: 'Utdanningsfokuserte utskriftsnisjer',
      business: 'Forretningsmodell- og produktformatnisjer',
    },
  },
  fi: {
    heroTitle: 'Tulostettavien niche-ideat',
    heroDescription: 'L\u00f6yd\u00e4 t\u00e4ydellinen tulostettavien nichesi. 45 kannattavaa ideaa tuote-ehdotuksilla, alustaneuvoilla ja hinnoittelustrategioilla.',
    metaTitle: 'Tulostettavien niche-ideat | 45 kannattavaa niche\u00e4 | LessonCraftStudio',
    metaDescription: 'L\u00f6yd\u00e4 45 kannattavaa tulostettavien niche\u00e4. Ideat j\u00e4rjestetty i\u00e4n, aiheen, kauden ja muodon mukaan. L\u00f6yd\u00e4 nichesi Etsyyn ja KDP:hen.',
    ctaTitle: 'Valmis aloittamaan nichesi?',
    ctaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei rekister\u00f6itymist\u00e4.',
    ctaButton: 'Kokeile generaattoreita ilmaiseksi',
    subcatDescriptions: {
      animals: 'El\u00e4in- ja luontoaiheiset tulostenichit',
      season: 'Kausi- ja juhla-aiheiset tulostenichit',
      interests: 'Kiinnostus- ja aktiviteettiaiheiset tulostenichit',
      education: 'Koulutuspainotteiset tulostenichit',
      business: 'Liiketoimintamalli- ja tuotemuotonichit',
    },
  },
};

// Localized idea display names
const ideaDisplayNames: Record<string, Record<string, string>> = {
  en: {
    'farm-animals-printable-ideas': 'Farm Animals',
    'ocean-animals-printable-ideas': 'Ocean Animals',
    'safari-animals-printable-ideas': 'Safari Animals',
    'pets-printable-ideas': 'Pets',
    'dinosaur-printable-ideas': 'Dinosaurs',
    'birds-printable-ideas': 'Birds',
    'insects-printable-ideas': 'Insects',
    'forest-animals-printable-ideas': 'Forest Animals',
    'christmas-printable-ideas': 'Christmas',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Easter',
    'valentines-day-printable-ideas': 'Valentine\'s Day',
    'back-to-school-printable-ideas': 'Back to School',
    'summer-printable-ideas': 'Summer',
    'winter-printable-ideas': 'Winter',
    'spring-printable-ideas': 'Spring',
    'thanksgiving-printable-ideas': 'Thanksgiving',
    'parents-day-printable-ideas': 'Parents Day',
    'space-printable-ideas': 'Space',
    'transportation-printable-ideas': 'Transportation',
    'food-cooking-printable-ideas': 'Food & Cooking',
    'sports-printable-ideas': 'Sports',
    'music-printable-ideas': 'Music',
    'construction-printable-ideas': 'Construction',
    'pirates-printable-ideas': 'Pirates',
    'fairy-tale-printable-ideas': 'Fairy Tales',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Underwater',
    'preschool-printable-ideas': 'Preschool',
    'kindergarten-printable-ideas': 'Kindergarten',
    'first-grade-printable-ideas': 'First Grade',
    'second-grade-printable-ideas': 'Second Grade',
    'third-grade-printable-ideas': 'Third Grade',
    'homeschool-printable-ideas': 'Homeschool',
    'special-education-printable-ideas': 'Special Education',
    'esl-printable-ideas': 'ESL',
    'summer-learning-printable-ideas': 'Summer Learning',
    'math-facts-printable-ideas': 'Math Facts',
    'subscription-box-printable-ideas': 'Subscription Box',
    'print-on-demand-printable-ideas': 'Print on Demand',
    'digital-download-printable-ideas': 'Digital Downloads',
    'physical-printable-product-ideas': 'Physical Products',
    'party-supply-printable-ideas': 'Party Supplies',
    'custom-worksheet-service-ideas': 'Custom Worksheets',
    'bulk-licensing-printable-ideas': 'Bulk Licensing',
  },
  de: {
    'farm-animals-printable-ideas': 'Bauernhoftiere',
    'ocean-animals-printable-ideas': 'Meerestiere',
    'safari-animals-printable-ideas': 'Safaritiere',
    'pets-printable-ideas': 'Haustiere',
    'dinosaur-printable-ideas': 'Dinosaurier',
    'birds-printable-ideas': 'V\u00f6gel',
    'insects-printable-ideas': 'Insekten',
    'forest-animals-printable-ideas': 'Waldtiere',
    'christmas-printable-ideas': 'Weihnachten',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Ostern',
    'valentines-day-printable-ideas': 'Valentinstag',
    'back-to-school-printable-ideas': 'Schulanfang',
    'summer-printable-ideas': 'Sommer',
    'winter-printable-ideas': 'Winter',
    'spring-printable-ideas': 'Fr\u00fchling',
    'thanksgiving-printable-ideas': 'Erntedankfest',
    'parents-day-printable-ideas': 'Elterntag',
    'space-printable-ideas': 'Weltraum',
    'transportation-printable-ideas': 'Fahrzeuge',
    'food-cooking-printable-ideas': 'Essen & Kochen',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musik',
    'construction-printable-ideas': 'Baustelle',
    'pirates-printable-ideas': 'Piraten',
    'fairy-tale-printable-ideas': 'M\u00e4rchen',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Unterwasser',
    'preschool-printable-ideas': 'Vorschule',
    'kindergarten-printable-ideas': 'Kindergarten',
    'first-grade-printable-ideas': '1. Klasse',
    'second-grade-printable-ideas': '2. Klasse',
    'third-grade-printable-ideas': '3. Klasse',
    'homeschool-printable-ideas': 'Homeschooling',
    'special-education-printable-ideas': 'Sonderp\u00e4dagogik',
    'esl-printable-ideas': 'DaF/DaZ',
    'summer-learning-printable-ideas': 'Sommerlernen',
    'math-facts-printable-ideas': 'Mathe-Grundlagen',
    'subscription-box-printable-ideas': 'Abo-Box',
    'print-on-demand-printable-ideas': 'Print-on-Demand',
    'digital-download-printable-ideas': 'Digitale Downloads',
    'physical-printable-product-ideas': 'Physische Produkte',
    'party-supply-printable-ideas': 'Partyzubeh\u00f6r',
    'custom-worksheet-service-ideas': 'Individuelle Arbeitsbl\u00e4tter',
    'bulk-licensing-printable-ideas': 'Massenlizenzierung',
  },
  fr: {
    'farm-animals-printable-ideas': 'Animaux de ferme',
    'ocean-animals-printable-ideas': 'Animaux marins',
    'safari-animals-printable-ideas': 'Animaux de safari',
    'pets-printable-ideas': 'Animaux domestiques',
    'dinosaur-printable-ideas': 'Dinosaures',
    'birds-printable-ideas': 'Oiseaux',
    'insects-printable-ideas': 'Insectes',
    'forest-animals-printable-ideas': 'Animaux de la for\u00eat',
    'christmas-printable-ideas': 'No\u00ebl',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'P\u00e2ques',
    'valentines-day-printable-ideas': 'Saint-Valentin',
    'back-to-school-printable-ideas': 'Rentr\u00e9e scolaire',
    'summer-printable-ideas': '\u00c9t\u00e9',
    'winter-printable-ideas': 'Hiver',
    'spring-printable-ideas': 'Printemps',
    'thanksgiving-printable-ideas': 'Action de gr\u00e2ces',
    'parents-day-printable-ideas': 'F\u00eate des parents',
    'space-printable-ideas': 'Espace',
    'transportation-printable-ideas': 'Transports',
    'food-cooking-printable-ideas': 'Cuisine',
    'sports-printable-ideas': 'Sports',
    'music-printable-ideas': 'Musique',
    'construction-printable-ideas': 'Construction',
    'pirates-printable-ideas': 'Pirates',
    'fairy-tale-printable-ideas': 'Contes de f\u00e9es',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Sous-marin',
    'preschool-printable-ideas': 'Maternelle',
    'kindergarten-printable-ideas': 'Grande section',
    'first-grade-printable-ideas': 'CP',
    'second-grade-printable-ideas': 'CE1',
    'third-grade-printable-ideas': 'CE2',
    'homeschool-printable-ideas': '\u00c9cole \u00e0 la maison',
    'special-education-printable-ideas': '\u00c9ducation sp\u00e9ciale',
    'esl-printable-ideas': 'FLE',
    'summer-learning-printable-ideas': 'Cahier de vacances',
    'math-facts-printable-ideas': 'Calcul mental',
    'subscription-box-printable-ideas': 'Box par abonnement',
    'print-on-demand-printable-ideas': 'Impression \u00e0 la demande',
    'digital-download-printable-ideas': 'T\u00e9l\u00e9chargements',
    'physical-printable-product-ideas': 'Produits physiques',
    'party-supply-printable-ideas': 'Articles de f\u00eate',
    'custom-worksheet-service-ideas': 'Fiches personnalis\u00e9es',
    'bulk-licensing-printable-ideas': 'Licences en gros',
  },
  es: {
    'farm-animals-printable-ideas': 'Animales de granja',
    'ocean-animals-printable-ideas': 'Animales marinos',
    'safari-animals-printable-ideas': 'Animales de safari',
    'pets-printable-ideas': 'Mascotas',
    'dinosaur-printable-ideas': 'Dinosaurios',
    'birds-printable-ideas': 'P\u00e1jaros',
    'insects-printable-ideas': 'Insectos',
    'forest-animals-printable-ideas': 'Animales del bosque',
    'christmas-printable-ideas': 'Navidad',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Pascua',
    'valentines-day-printable-ideas': 'San Valent\u00edn',
    'back-to-school-printable-ideas': 'Vuelta al cole',
    'summer-printable-ideas': 'Verano',
    'winter-printable-ideas': 'Invierno',
    'spring-printable-ideas': 'Primavera',
    'thanksgiving-printable-ideas': 'Acci\u00f3n de Gracias',
    'parents-day-printable-ideas': 'D\u00eda de los padres',
    'space-printable-ideas': 'Espacio',
    'transportation-printable-ideas': 'Transporte',
    'food-cooking-printable-ideas': 'Comida y cocina',
    'sports-printable-ideas': 'Deportes',
    'music-printable-ideas': 'M\u00fasica',
    'construction-printable-ideas': 'Construcci\u00f3n',
    'pirates-printable-ideas': 'Piratas',
    'fairy-tale-printable-ideas': 'Cuentos de hadas',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Submarino',
    'preschool-printable-ideas': 'Preescolar',
    'kindergarten-printable-ideas': 'Infantil',
    'first-grade-printable-ideas': 'Primer grado',
    'second-grade-printable-ideas': 'Segundo grado',
    'third-grade-printable-ideas': 'Tercer grado',
    'homeschool-printable-ideas': 'Educaci\u00f3n en casa',
    'special-education-printable-ideas': 'Educaci\u00f3n especial',
    'esl-printable-ideas': 'ELE',
    'summer-learning-printable-ideas': 'Aprendizaje de verano',
    'math-facts-printable-ideas': 'C\u00e1lculo mental',
    'subscription-box-printable-ideas': 'Caja de suscripci\u00f3n',
    'print-on-demand-printable-ideas': 'Impresi\u00f3n bajo demanda',
    'digital-download-printable-ideas': 'Descargas digitales',
    'physical-printable-product-ideas': 'Productos f\u00edsicos',
    'party-supply-printable-ideas': 'Art\u00edculos de fiesta',
    'custom-worksheet-service-ideas': 'Fichas personalizadas',
    'bulk-licensing-printable-ideas': 'Licencias al por mayor',
  },
  pt: {
    'farm-animals-printable-ideas': 'Animais da fazenda',
    'ocean-animals-printable-ideas': 'Animais marinhos',
    'safari-animals-printable-ideas': 'Animais de safari',
    'pets-printable-ideas': 'Animais de estima\u00e7\u00e3o',
    'dinosaur-printable-ideas': 'Dinossauros',
    'birds-printable-ideas': 'P\u00e1ssaros',
    'insects-printable-ideas': 'Insetos',
    'forest-animals-printable-ideas': 'Animais da floresta',
    'christmas-printable-ideas': 'Natal',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'P\u00e1scoa',
    'valentines-day-printable-ideas': 'Dia dos Namorados',
    'back-to-school-printable-ideas': 'Volta \u00e0s aulas',
    'summer-printable-ideas': 'Ver\u00e3o',
    'winter-printable-ideas': 'Inverno',
    'spring-printable-ideas': 'Primavera',
    'thanksgiving-printable-ideas': 'A\u00e7\u00e3o de Gra\u00e7as',
    'parents-day-printable-ideas': 'Dia dos Pais',
    'space-printable-ideas': 'Espa\u00e7o',
    'transportation-printable-ideas': 'Transportes',
    'food-cooking-printable-ideas': 'Comida e culin\u00e1ria',
    'sports-printable-ideas': 'Desporto',
    'music-printable-ideas': 'M\u00fasica',
    'construction-printable-ideas': 'Constru\u00e7\u00e3o',
    'pirates-printable-ideas': 'Piratas',
    'fairy-tale-printable-ideas': 'Contos de fadas',
    'camping-printable-ideas': 'Acampamento',
    'underwater-printable-ideas': 'Submarino',
    'preschool-printable-ideas': 'Pr\u00e9-escolar',
    'kindergarten-printable-ideas': 'Jardim de inf\u00e2ncia',
    'first-grade-printable-ideas': '1\u00ba ano',
    'second-grade-printable-ideas': '2\u00ba ano',
    'third-grade-printable-ideas': '3\u00ba ano',
    'homeschool-printable-ideas': 'Ensino dom\u00e9stico',
    'special-education-printable-ideas': 'Educa\u00e7\u00e3o especial',
    'esl-printable-ideas': 'PLE',
    'summer-learning-printable-ideas': 'Aprendizagem de ver\u00e3o',
    'math-facts-printable-ideas': 'Factos matem\u00e1ticos',
    'subscription-box-printable-ideas': 'Caixa por assinatura',
    'print-on-demand-printable-ideas': 'Impress\u00e3o sob demanda',
    'digital-download-printable-ideas': 'Downloads digitais',
    'physical-printable-product-ideas': 'Produtos f\u00edsicos',
    'party-supply-printable-ideas': 'Artigos de festa',
    'custom-worksheet-service-ideas': 'Fichas personalizadas',
    'bulk-licensing-printable-ideas': 'Licenciamento em massa',
  },
  it: {
    'farm-animals-printable-ideas': 'Animali della fattoria',
    'ocean-animals-printable-ideas': 'Animali marini',
    'safari-animals-printable-ideas': 'Animali del safari',
    'pets-printable-ideas': 'Animali domestici',
    'dinosaur-printable-ideas': 'Dinosauri',
    'birds-printable-ideas': 'Uccelli',
    'insects-printable-ideas': 'Insetti',
    'forest-animals-printable-ideas': 'Animali della foresta',
    'christmas-printable-ideas': 'Natale',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Pasqua',
    'valentines-day-printable-ideas': 'San Valentino',
    'back-to-school-printable-ideas': 'Ritorno a scuola',
    'summer-printable-ideas': 'Estate',
    'winter-printable-ideas': 'Inverno',
    'spring-printable-ideas': 'Primavera',
    'thanksgiving-printable-ideas': 'Ringraziamento',
    'parents-day-printable-ideas': 'Festa dei genitori',
    'space-printable-ideas': 'Spazio',
    'transportation-printable-ideas': 'Trasporti',
    'food-cooking-printable-ideas': 'Cibo e cucina',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musica',
    'construction-printable-ideas': 'Costruzione',
    'pirates-printable-ideas': 'Pirati',
    'fairy-tale-printable-ideas': 'Fiabe',
    'camping-printable-ideas': 'Campeggio',
    'underwater-printable-ideas': 'Sottomarino',
    'preschool-printable-ideas': 'Prescuola',
    'kindergarten-printable-ideas': 'Scuola materna',
    'first-grade-printable-ideas': 'Prima elementare',
    'second-grade-printable-ideas': 'Seconda elementare',
    'third-grade-printable-ideas': 'Terza elementare',
    'homeschool-printable-ideas': 'Istruzione domestica',
    'special-education-printable-ideas': 'Educazione speciale',
    'esl-printable-ideas': 'Italiano L2',
    'summer-learning-printable-ideas': 'Compiti estivi',
    'math-facts-printable-ideas': 'Calcolo mentale',
    'subscription-box-printable-ideas': 'Box in abbonamento',
    'print-on-demand-printable-ideas': 'Stampa su richiesta',
    'digital-download-printable-ideas': 'Download digitali',
    'physical-printable-product-ideas': 'Prodotti fisici',
    'party-supply-printable-ideas': 'Articoli per feste',
    'custom-worksheet-service-ideas': 'Schede personalizzate',
    'bulk-licensing-printable-ideas': 'Licenze all\'ingrosso',
  },
  nl: {
    'farm-animals-printable-ideas': 'Boerderijdieren',
    'ocean-animals-printable-ideas': 'Oceaandieren',
    'safari-animals-printable-ideas': 'Safaridieren',
    'pets-printable-ideas': 'Huisdieren',
    'dinosaur-printable-ideas': 'Dinosaurussen',
    'birds-printable-ideas': 'Vogels',
    'insects-printable-ideas': 'Insecten',
    'forest-animals-printable-ideas': 'Bosdieren',
    'christmas-printable-ideas': 'Kerst',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Pasen',
    'valentines-day-printable-ideas': 'Valentijnsdag',
    'back-to-school-printable-ideas': 'Terug naar school',
    'summer-printable-ideas': 'Zomer',
    'winter-printable-ideas': 'Winter',
    'spring-printable-ideas': 'Lente',
    'thanksgiving-printable-ideas': 'Thanksgiving',
    'parents-day-printable-ideas': 'Ouderdag',
    'space-printable-ideas': 'Ruimte',
    'transportation-printable-ideas': 'Vervoer',
    'food-cooking-printable-ideas': 'Eten & koken',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Muziek',
    'construction-printable-ideas': 'Bouw',
    'pirates-printable-ideas': 'Piraten',
    'fairy-tale-printable-ideas': 'Sprookjes',
    'camping-printable-ideas': 'Kamperen',
    'underwater-printable-ideas': 'Onderwaterwereld',
    'preschool-printable-ideas': 'Kleuterschool',
    'kindergarten-printable-ideas': 'Groep 1-2',
    'first-grade-printable-ideas': 'Groep 3',
    'second-grade-printable-ideas': 'Groep 4',
    'third-grade-printable-ideas': 'Groep 5',
    'homeschool-printable-ideas': 'Thuisonderwijs',
    'special-education-printable-ideas': 'Speciaal onderwijs',
    'esl-printable-ideas': 'NT2',
    'summer-learning-printable-ideas': 'Zomerleren',
    'math-facts-printable-ideas': 'Rekenvaardigheid',
    'subscription-box-printable-ideas': 'Abonnementsbox',
    'print-on-demand-printable-ideas': 'Print-on-demand',
    'digital-download-printable-ideas': 'Digitale downloads',
    'physical-printable-product-ideas': 'Fysieke producten',
    'party-supply-printable-ideas': 'Feestartikelen',
    'custom-worksheet-service-ideas': 'Aangepaste werkbladen',
    'bulk-licensing-printable-ideas': 'Bulklicenties',
  },
  sv: {
    'farm-animals-printable-ideas': 'G\u00e5rdsdjur',
    'ocean-animals-printable-ideas': 'Havsdjur',
    'safari-animals-printable-ideas': 'Safaridjur',
    'pets-printable-ideas': 'Husdjur',
    'dinosaur-printable-ideas': 'Dinosaurier',
    'birds-printable-ideas': 'F\u00e5glar',
    'insects-printable-ideas': 'Insekter',
    'forest-animals-printable-ideas': 'Skogsdjur',
    'christmas-printable-ideas': 'Jul',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'P\u00e5sk',
    'valentines-day-printable-ideas': 'Alla hj\u00e4rtans dag',
    'back-to-school-printable-ideas': 'Skolstart',
    'summer-printable-ideas': 'Sommar',
    'winter-printable-ideas': 'Vinter',
    'spring-printable-ideas': 'V\u00e5r',
    'thanksgiving-printable-ideas': 'Tacksägelse',
    'parents-day-printable-ideas': 'F\u00f6r\u00e4ldradag',
    'space-printable-ideas': 'Rymden',
    'transportation-printable-ideas': 'Fordon',
    'food-cooking-printable-ideas': 'Mat & matlagning',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musik',
    'construction-printable-ideas': 'Bygge',
    'pirates-printable-ideas': 'Pirater',
    'fairy-tale-printable-ideas': 'Sagor',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Undervattensv\u00e4rld',
    'preschool-printable-ideas': 'F\u00f6rskola',
    'kindergarten-printable-ideas': 'F\u00f6rskoleklass',
    'first-grade-printable-ideas': '\u00c5rskurs 1',
    'second-grade-printable-ideas': '\u00c5rskurs 2',
    'third-grade-printable-ideas': '\u00c5rskurs 3',
    'homeschool-printable-ideas': 'Hemundervisning',
    'special-education-printable-ideas': 'Specialundervisning',
    'esl-printable-ideas': 'SFI',
    'summer-learning-printable-ideas': 'Sommarl\u00e4rande',
    'math-facts-printable-ideas': 'Mattefakta',
    'subscription-box-printable-ideas': 'Prenumerationsbox',
    'print-on-demand-printable-ideas': 'Print-on-demand',
    'digital-download-printable-ideas': 'Digitala nedladdningar',
    'physical-printable-product-ideas': 'Fysiska produkter',
    'party-supply-printable-ideas': 'Festartiklar',
    'custom-worksheet-service-ideas': 'Anpassade arbetsblad',
    'bulk-licensing-printable-ideas': 'Masslicensiering',
  },
  da: {
    'farm-animals-printable-ideas': 'G\u00e5rddyr',
    'ocean-animals-printable-ideas': 'Havdyr',
    'safari-animals-printable-ideas': 'Safaridyr',
    'pets-printable-ideas': 'K\u00e6ledyr',
    'dinosaur-printable-ideas': 'Dinosaurer',
    'birds-printable-ideas': 'Fugle',
    'insects-printable-ideas': 'Insekter',
    'forest-animals-printable-ideas': 'Skovdyr',
    'christmas-printable-ideas': 'Jul',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'P\u00e5ske',
    'valentines-day-printable-ideas': 'Valentinsdag',
    'back-to-school-printable-ideas': 'Skolestart',
    'summer-printable-ideas': 'Sommer',
    'winter-printable-ideas': 'Vinter',
    'spring-printable-ideas': 'For\u00e5r',
    'thanksgiving-printable-ideas': 'H\u00f8stfest',
    'parents-day-printable-ideas': 'For\u00e6ldredag',
    'space-printable-ideas': 'Rummet',
    'transportation-printable-ideas': 'Transport',
    'food-cooking-printable-ideas': 'Mad & madlavning',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musik',
    'construction-printable-ideas': 'Byggeri',
    'pirates-printable-ideas': 'Pirater',
    'fairy-tale-printable-ideas': 'Eventyr',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Undervandsverden',
    'preschool-printable-ideas': 'B\u00f8rnehave',
    'kindergarten-printable-ideas': 'B\u00f8rnehaveklasse',
    'first-grade-printable-ideas': '1. klasse',
    'second-grade-printable-ideas': '2. klasse',
    'third-grade-printable-ideas': '3. klasse',
    'homeschool-printable-ideas': 'Hjemmeundervisning',
    'special-education-printable-ideas': 'Specialundervisning',
    'esl-printable-ideas': 'Dansk som andetsprog',
    'summer-learning-printable-ideas': 'Sommerl\u00e6ring',
    'math-facts-printable-ideas': 'Regnefakta',
    'subscription-box-printable-ideas': 'Abonnementsboks',
    'print-on-demand-printable-ideas': 'Print-on-demand',
    'digital-download-printable-ideas': 'Digitale downloads',
    'physical-printable-product-ideas': 'Fysiske produkter',
    'party-supply-printable-ideas': 'Festartikler',
    'custom-worksheet-service-ideas': 'Tilpassede opgaver',
    'bulk-licensing-printable-ideas': 'Masselicenser',
  },
  no: {
    'farm-animals-printable-ideas': 'G\u00e5rdsdyr',
    'ocean-animals-printable-ideas': 'Havdyr',
    'safari-animals-printable-ideas': 'Safaridyr',
    'pets-printable-ideas': 'Kj\u00e6ledyr',
    'dinosaur-printable-ideas': 'Dinosaurer',
    'birds-printable-ideas': 'Fugler',
    'insects-printable-ideas': 'Insekter',
    'forest-animals-printable-ideas': 'Skogsdyr',
    'christmas-printable-ideas': 'Jul',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'P\u00e5ske',
    'valentines-day-printable-ideas': 'Valentinsdagen',
    'back-to-school-printable-ideas': 'Skolestart',
    'summer-printable-ideas': 'Sommer',
    'winter-printable-ideas': 'Vinter',
    'spring-printable-ideas': 'V\u00e5r',
    'thanksgiving-printable-ideas': 'H\u00f8stfest',
    'parents-day-printable-ideas': 'Foreldredag',
    'space-printable-ideas': 'Verdensrommet',
    'transportation-printable-ideas': 'Transport',
    'food-cooking-printable-ideas': 'Mat & matlaging',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musikk',
    'construction-printable-ideas': 'Bygg',
    'pirates-printable-ideas': 'Pirater',
    'fairy-tale-printable-ideas': 'Eventyr',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Undervannsverden',
    'preschool-printable-ideas': 'Barnehage',
    'kindergarten-printable-ideas': 'F\u00f8rskoleklasse',
    'first-grade-printable-ideas': '1. trinn',
    'second-grade-printable-ideas': '2. trinn',
    'third-grade-printable-ideas': '3. trinn',
    'homeschool-printable-ideas': 'Hjemmeskole',
    'special-education-printable-ideas': 'Spesialundervisning',
    'esl-printable-ideas': 'Norsk som andrespr\u00e5k',
    'summer-learning-printable-ideas': 'Sommerl\u00e6ring',
    'math-facts-printable-ideas': 'Mattefakta',
    'subscription-box-printable-ideas': 'Abonnementsboks',
    'print-on-demand-printable-ideas': 'Print-on-demand',
    'digital-download-printable-ideas': 'Digitale nedlastinger',
    'physical-printable-product-ideas': 'Fysiske produkter',
    'party-supply-printable-ideas': 'Festartikler',
    'custom-worksheet-service-ideas': 'Tilpassede oppgaver',
    'bulk-licensing-printable-ideas': 'Masselisensiering',
  },
  fi: {
    'farm-animals-printable-ideas': 'Maatilan el\u00e4imet',
    'ocean-animals-printable-ideas': 'Meriel\u00e4imet',
    'safari-animals-printable-ideas': 'Safariel\u00e4imet',
    'pets-printable-ideas': 'Lemmikit',
    'dinosaur-printable-ideas': 'Dinosaurukset',
    'birds-printable-ideas': 'Linnut',
    'insects-printable-ideas': 'Hy\u00f6nteiset',
    'forest-animals-printable-ideas': 'Mets\u00e4nel\u00e4imet',
    'christmas-printable-ideas': 'Joulu',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'P\u00e4\u00e4si\u00e4inen',
    'valentines-day-printable-ideas': 'Yst\u00e4v\u00e4np\u00e4iv\u00e4',
    'back-to-school-printable-ideas': 'Koulun alku',
    'summer-printable-ideas': 'Kes\u00e4',
    'winter-printable-ideas': 'Talvi',
    'spring-printable-ideas': 'Kev\u00e4t',
    'thanksgiving-printable-ideas': 'Kiitostenp\u00e4iv\u00e4',
    'parents-day-printable-ideas': 'Vanhempainen p\u00e4iv\u00e4',
    'space-printable-ideas': 'Avaruus',
    'transportation-printable-ideas': 'Kulkuneuvot',
    'food-cooking-printable-ideas': 'Ruoka ja ruoanlaitto',
    'sports-printable-ideas': 'Urheilu',
    'music-printable-ideas': 'Musiikki',
    'construction-printable-ideas': 'Rakentaminen',
    'pirates-printable-ideas': 'Merirosvot',
    'fairy-tale-printable-ideas': 'Sadut',
    'camping-printable-ideas': 'Leiri',
    'underwater-printable-ideas': 'Vedenalainen',
    'preschool-printable-ideas': 'Esikoulu',
    'kindergarten-printable-ideas': 'P\u00e4iv\u00e4koti',
    'first-grade-printable-ideas': '1. luokka',
    'second-grade-printable-ideas': '2. luokka',
    'third-grade-printable-ideas': '3. luokka',
    'homeschool-printable-ideas': 'Kotiopetus',
    'special-education-printable-ideas': 'Erityisopetus',
    'esl-printable-ideas': 'S2-opetus',
    'summer-learning-printable-ideas': 'Kes\u00e4oppiminen',
    'math-facts-printable-ideas': 'Laskutaito',
    'subscription-box-printable-ideas': 'Tilausboksi',
    'print-on-demand-printable-ideas': 'Tilauspaino',
    'digital-download-printable-ideas': 'Digitaaliset lataukset',
    'physical-printable-product-ideas': 'Fyysiset tuotteet',
    'party-supply-printable-ideas': 'Juhlatarvikkeet',
    'custom-worksheet-service-ideas': 'R\u00e4\u00e4t\u00e4l\u00f6idyt teht\u00e4v\u00e4t',
    'bulk-licensing-printable-ideas': 'Massalisensointi',
  },
};

// Subcategories for niche ideas
const ideaSubcategories = [
  {
    id: 'animals',
    labelKey: 'byTheme',
    description: 'Animal and nature themed printable niches',
    ideaIds: new Set([
      'farm-animals-printable-ideas', 'ocean-animals-printable-ideas', 'safari-animals-printable-ideas',
      'pets-printable-ideas', 'dinosaur-printable-ideas', 'birds-printable-ideas',
      'insects-printable-ideas', 'forest-animals-printable-ideas',
    ]),
  },
  {
    id: 'season',
    labelKey: 'bySeasonHoliday',
    description: 'Seasonal and holiday-themed printable niches',
    ideaIds: new Set([
      'christmas-printable-ideas', 'halloween-printable-ideas', 'easter-printable-ideas',
      'valentines-day-printable-ideas', 'back-to-school-printable-ideas', 'summer-printable-ideas',
      'winter-printable-ideas', 'spring-printable-ideas', 'thanksgiving-printable-ideas',
      'parents-day-printable-ideas',
    ]),
  },
  {
    id: 'interests',
    labelKey: 'bySubject',
    description: 'Interest and activity based printable niches',
    ideaIds: new Set([
      'space-printable-ideas', 'transportation-printable-ideas', 'food-cooking-printable-ideas',
      'sports-printable-ideas', 'music-printable-ideas', 'construction-printable-ideas',
      'pirates-printable-ideas', 'fairy-tale-printable-ideas', 'camping-printable-ideas',
      'underwater-printable-ideas',
    ]),
  },
  {
    id: 'education',
    labelKey: 'byAgeGroup',
    description: 'Educational focus and grade-level printable niches',
    ideaIds: new Set([
      'preschool-printable-ideas', 'kindergarten-printable-ideas', 'first-grade-printable-ideas',
      'second-grade-printable-ideas', 'third-grade-printable-ideas', 'homeschool-printable-ideas',
      'special-education-printable-ideas', 'esl-printable-ideas', 'summer-learning-printable-ideas',
      'math-facts-printable-ideas',
    ]),
  },
  {
    id: 'business',
    labelKey: 'byProductFormat',
    description: 'Business model and product format niches',
    ideaIds: new Set([
      'subscription-box-printable-ideas', 'print-on-demand-printable-ideas', 'digital-download-printable-ideas',
      'physical-printable-product-ideas', 'party-supply-printable-ideas', 'custom-worksheet-service-ideas',
      'bulk-licensing-printable-ideas',
    ]),
  },
];

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const ic = ideasContent[locale] || ideasContent.en;
  const title = ic.metaTitle;
  const description = ic.metaDescription;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/ideas`;
  }
  alternates['x-default'] = `${baseUrl}/en/ideas`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/ideas`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/${locale}/ideas`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default function IdeasListingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;
  const content = ideasContent[locale] || ideasContent.en;
  const displayNames = ideaDisplayNames[locale] || ideaDisplayNames.en;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {ideaSubcategories.map(subcat => {
            const ideas = ideaPageSlugs.filter(i => subcat.ideaIds.has(i.ideaId));
            if (ideas.length === 0) return null;

            return (
              <div key={subcat.id} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{getSectionLabel(subcat.labelKey, locale)}</h2>
                <p className="text-gray-600 text-sm mb-4">{content.subcatDescriptions[subcat.id] || subcat.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ideas.map(idea => {
                    const slug = getIdeaSlugForLocale(idea.ideaId, locale) || idea.slugs.en;
                    const displayName = displayNames[idea.ideaId] || idea.ideaId
                      .replace(/-printable-ideas$/, '')
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, c => c.toUpperCase());

                    return (
                      <Link
                        key={idea.ideaId}
                        href={`/${locale}/ideas/${slug}`}
                        className="p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all"
                      >
                        <span className="text-sm font-medium text-gray-900">{displayName}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar m\u00e1s', pt: 'Explorar mais', it: 'Esplora di pi\u00f9', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lis\u00e4\u00e4' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Gu\u00edas', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
            </Link>
            <Link href={`/${locale}/start`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Get Started', de: 'Erste Schritte', fr: 'D\u00e9marrer', es: 'Comenzar', pt: 'Come\u00e7ar', it: 'Inizia', nl: 'Aan de slag', sv: 'Kom ig\u00e5ng', da: 'Kom i gang', no: 'Kom i gang', fi: 'Aloita' }[locale] || 'Get Started'}
            </Link>
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas gr\u00e1tis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis v\u00e6rkt\u00f8jer', no: 'Gratisverkt\u00f8y', fi: 'Ilmaiset ty\u00f6kalut' }[locale] || 'Free Tools'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{content.ctaTitle}</h2>
          <p className="text-amber-100 mb-8 max-w-lg mx-auto">
            {content.ctaDescription}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
          >
            {content.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
