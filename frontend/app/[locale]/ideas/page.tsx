import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { ideaPageSlugs, getIdeaSlugForLocale } from '@/config/idea-page-slugs';
import { getHreflangCode, ogLocaleMap, generateIdeasCollectionSchema, generateIdeasItemListSchema } from '@/lib/schema-generator';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { getSectionLabel } from '@/config/section-labels';

const baseUrl = 'https://www.lessoncraftstudio.com';

const ideasKeywords: Record<string, string[]> = {
  en: ['profitable printable niche ideas for Etsy', 'best printable niches to sell', 'Etsy niche research printables', 'KDP niche ideas for activity books', 'what printables sell best on Etsy', 'printable business niche ideas'],
  de: ['Druckvorlagen-Nischen-Ideen', 'profitable Druckvorlagen-Nischen', 'Etsy Nischenrecherche', 'KDP Nischen-Ideen', 'welche Druckvorlagen verkaufen sich am besten', 'Druckvorlagen-Geschäftsideen'],
  fr: ['idées de niches imprimables', 'niches imprimables rentables', 'recherche de niche Etsy', 'idées niche KDP', 'quels imprimables se vendent le mieux', 'idées business imprimables'],
  es: ['ideas nichos imprimibles rentables', 'nichos imprimibles Etsy KDP', 'investigación nicho imprimibles', 'ideas nicho Hotmart', 'qué imprimibles se venden mejor', 'ideas negocio imprimibles hispano'],
  pt: ['ideias de nichos imprimíveis', 'nichos imprimíveis rentáveis', 'pesquisa de nicho Etsy', 'ideias nicho KDP', 'quais imprimíveis vendem melhor', 'ideias negócio imprimíveis'],
  it: ['idee di nicchia stampabili', 'nicchie stampabili redditizie', 'ricerca di nicchia Etsy', 'idee nicchia KDP', 'quali stampabili si vendono meglio', 'idee business stampabili'],
  nl: ['printable niche-ideeën', 'winstgevende printable niches', 'Etsy niche-onderzoek', 'KDP niche-ideeën', 'welke printables verkopen het best', 'printable bedrijfsideeën'],
  sv: ['nischidéer utskrifter', 'lönsamma utskriftsnischer', 'Etsy nischforskning', 'KDP nischidéer', 'vilka utskrifter säljer bäst', 'utskriftsföretagsidéer'],
  da: ['niche-ideer printables', 'profitable printable-nicher', 'Etsy nicheforskning', 'KDP niche-ideer', 'hvilke printables sælger bedst', 'printable forretningsideer'],
  no: ['nisjeideer utskrifter', 'lønnsomme utskriftsnisjer', 'Etsy nisjeforskning', 'KDP nisjeideer', 'hvilke utskrifter selger best', 'utskriftsvirksomhetsideer'],
  fi: ['niche-ideat tulostettavat', 'kannattavat tulostettavien nichet', 'Etsy niche-tutkimus', 'KDP niche-ideat', 'mitkä tulostettavat myyvät parhaiten', 'tulostettavien liiketoimintaideat'],
};

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
    heroTitle: '45 Profitable Printable Niche Ideas',
    heroDescription: 'Find your perfect printable niche. 45 profitable ideas with product suggestions, platform tips, and pricing strategies for Etsy and KDP sellers.',
    metaTitle: '45 Profitable Printable Niche Ideas | LCS',
    metaDescription: 'Discover 45 profitable printable niches for Etsy, KDP & TPT. Theme, seasonal, age-group & format ideas with product suggestions and pricing strategies.',
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
    heroTitle: 'Druckvorlagen-Geschäftsideen nach Nische',
    heroDescription: 'Finden Sie Ihre perfekte Druckvorlagen-Nische. 45 profitable Ideen mit Produktvorschlägen, Plattform-Tipps und Preisstrategien.',
    metaTitle: 'Druckvorlagen-Nischenideen | 45 profitable Nischen | LessonCraftStudio',
    metaDescription: '45 profitable Druckvorlagen-Nischen entdecken. Produktideen nach Alter, Thema, Saison und Format. Perfekte Nische für Etsy und KDP finden.',
    ctaTitle: 'Bereit für Ihre Nische?',
    ctaDescription: 'Alle 33 Druckvorlagen-Generatoren gratis mit Wasserzeichen testen. Keine Anmeldung.',
    ctaButton: 'Generatoren gratis testen',
    subcatDescriptions: {
      animals: 'Tier- und Natur-Druckvorlagen-Nischen',
      season: 'Saisonale und feiertags-bezogene Druckvorlagen-Nischen',
      interests: 'Interessen- und aktivitätsbasierte Druckvorlagen-Nischen',
      education: 'Bildungsorientierte und klassenstufenbezogene Druckvorlagen-Nischen',
      business: 'Geschäftsmodell- und Produktformat-Nischen',
    },
  },
  fr: {
    heroTitle: 'Idées de niches d\'imprimables',
    heroDescription: 'Trouvez votre niche parfaite. 45 idées rentables avec suggestions de produits, conseils de plateformes et stratégies de prix.',
    metaTitle: 'Idées de niches d\'imprimables | 45 niches rentables | LessonCraftStudio',
    metaDescription: 'Découvrez 45 niches rentables d\'imprimables. Idées classées par âge, thème, saison et format. Trouvez votre niche pour Etsy et KDP.',
    ctaTitle: 'Prêt à lancer votre niche ?',
    ctaDescription: 'Essayez les 33 générateurs gratuits avec filigrane. Sans inscription.',
    ctaButton: 'Essayer les générateurs',
    subcatDescriptions: {
      animals: 'Niches d\'imprimables sur les animaux et la nature',
      season: 'Niches d\'imprimables saisonniers et fêtes',
      interests: 'Niches d\'imprimables par intérêt et activité',
      education: 'Niches d\'imprimables par niveau scolaire',
      business: 'Niches par modèle commercial et format produit',
    },
  },
  es: {
    heroTitle: 'Ideas de nichos rentables de imprimibles',
    heroDescription: 'Encuentre su nicho perfecto. 45 ideas rentables con sugerencias de productos, consejos de plataformas y estrategias de precios.',
    metaTitle: '45 nichos rentables de imprimibles | LCS',
    metaDescription: 'Descubra 45 nichos rentables para vender imprimibles en Etsy, KDP y Hotmart. Temas, temporadas, edades y formatos con ideas de productos y precios.',
    ctaTitle: '¿Listo para empezar su nicho?',
    ctaDescription: 'Pruebe los 33 generadores gratis con marca de agua. Sin registro.',
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
    heroTitle: '45 nichos lucrativos de imprimíveis para vender',
    heroDescription: 'Encontre o nicho perfeito para seu negócio. 45 ideias lucrativas com sugestões de produtos, dicas de plataformas e estratégias de preços para Hotmart, Etsy e KDP.',
    metaTitle: '45 nichos lucrativos de imprimíveis | LCS',
    metaDescription: 'Descubra 45 nichos lucrativos para vender imprimíveis na Hotmart, Etsy e KDP. Temas, estações, séries e formatos com ideias de produtos e preços.',
    ctaTitle: 'Pronto para começar seu nicho?',
    ctaDescription: 'Teste os 33 geradores grátis com marca d\'água. Sem cadastro.',
    ctaButton: 'Testar geradores grátis',
    subcatDescriptions: {
      animals: 'Nichos de imprimir de animais e natureza',
      season: 'Nichos de imprimir sazonais e festivos',
      interests: 'Nichos de imprimir por interesses e atividades',
      education: 'Nichos de imprimir por nível educativo',
      business: 'Nichos por modelo de negócio e formato de produto',
    },
  },
  it: {
    heroTitle: 'Idee di nicchie per stampabili',
    heroDescription: 'Trova la tua nicchia perfetta. 45 idee redditizie con suggerimenti di prodotti, consigli sulle piattaforme e strategie di prezzo.',
    metaTitle: '45 nicchie redditizie di stampabili | LessonCraftStudio',
    metaDescription: 'Scopri 45 nicchie redditizie per vendere stampabili su Etsy, KDP e Eduki. Temi, stagioni, fasce d\'età e formati con idee e strategie.',
    ctaTitle: 'Pronto a iniziare la tua nicchia?',
    ctaDescription: 'Prova tutti i 33 generatori gratis con filigrana. Senza registrazione.',
    ctaButton: 'Prova i generatori gratis',
    subcatDescriptions: {
      animals: 'Nicchie di stampabili su animali e natura',
      season: 'Nicchie di stampabili stagionali e festivi',
      interests: 'Nicchie di stampabili per interessi e attività',
      education: 'Nicchie di stampabili per livello scolastico',
      business: 'Nicchie per modello di business e formato prodotto',
    },
  },
  nl: {
    heroTitle: 'Printbare niche-ideeën',
    heroDescription: 'Vind je perfecte printbare niche. 45 winstgevende ideeën met productsuggesties, platformtips en prijsstrategieën.',
    metaTitle: 'Printbare niche-ideeën | 45 winstgevende niches | LessonCraftStudio',
    metaDescription: 'Ontdek 45 winstgevende printbare niches. Ideeën georganiseerd op leeftijd, thema, seizoen en formaat. Vind je niche voor Etsy en KDP.',
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
    heroTitle: 'Nischidéer för utskrifter',
    heroDescription: 'Hitta din perfekta utskriftsnisch. 45 lönsamma idéer med produktförslag, plattformstips och prisstrategier.',
    metaTitle: 'Nischidéer för utskrifter | 45 lönsamma nischer | LessonCraftStudio',
    metaDescription: 'Upptäck 45 lönsamma utskriftsnischer. Idéer organiserade efter ålder, ämne, säsong och format. Hitta din nisch för Etsy och KDP.',
    ctaTitle: 'Redo att starta din nisch?',
    ctaDescription: 'Prova alla 33 generatorer gratis med vattenstämpel. Ingen registrering.',
    ctaButton: 'Prova generatorerna gratis',
    subcatDescriptions: {
      animals: 'Djur- och naturtema utskriftsnischer',
      season: 'Säsongs- och högtidstema utskriftsnischer',
      interests: 'Intresse- och aktivitetsbaserade utskriftsnischer',
      education: 'Utbildningsfokuserade utskriftsnischer',
      business: 'Affärsmodell- och produktformatnischer',
    },
  },
  da: {
    heroTitle: 'Niche-idéer til printables',
    heroDescription: 'Find din perfekte printbare niche. 45 profitable idéer med produktforslag, platformstips og prisstrategier.',
    metaTitle: 'Niche-idéer til printables | 45 profitable nicher | LessonCraftStudio',
    metaDescription: 'Opdag 45 profitable printbare nicher. Idéer organiseret efter alder, emne, sæson og format. Find din niche til Etsy og KDP.',
    ctaTitle: 'Klar til at starte din niche?',
    ctaDescription: 'Prøv alle 33 generatorer gratis med vandmærke. Ingen tilmelding.',
    ctaButton: 'Prøv generatorerne gratis',
    subcatDescriptions: {
      animals: 'Dyre- og naturtema printbare nicher',
      season: 'Sæson- og højtidstema printbare nicher',
      interests: 'Interesse- og aktivitetsbaserede printbare nicher',
      education: 'Uddannelsesfokuserede printbare nicher',
      business: 'Forretningsmodel- og produktformatnicher',
    },
  },
  no: {
    heroTitle: 'Nisjeidéer for utskrifter',
    heroDescription: 'Finn din perfekte utskriftsnisje. 45 lønnsomme idéer med produktforslag, plattformtips og prisstrategier.',
    metaTitle: 'Nisjeidéer for utskrifter | 45 lønnsomme nisjer | LessonCraftStudio',
    metaDescription: 'Oppdag 45 lønnsomme utskriftsnisjer. Idéer organisert etter alder, tema, sesong og format. Finn din nisje for Etsy og KDP.',
    ctaTitle: 'Klar til å starte din nisje?',
    ctaDescription: 'Prøv alle 33 generatorer gratis med vannmerke. Ingen registrering.',
    ctaButton: 'Prøv generatorene gratis',
    subcatDescriptions: {
      animals: 'Dyre- og naturtema utskriftsnisjer',
      season: 'Sesong- og høytidstema utskriftsnisjer',
      interests: 'Interesse- og aktivitetsbaserte utskriftsnisjer',
      education: 'Utdanningsfokuserte utskriftsnisjer',
      business: 'Forretningsmodell- og produktformatnisjer',
    },
  },
  fi: {
    heroTitle: 'Tulostettavien niche-ideat',
    heroDescription: 'Löydä täydellinen tulostettavien nichesi. 45 kannattavaa ideaa tuote-ehdotuksilla, alustaneuvoilla ja hinnoittelustrategioilla.',
    metaTitle: 'Tulostettavien niche-ideat | 45 kannattavaa nicheä | LessonCraftStudio',
    metaDescription: 'Löydä 45 kannattavaa tulostettavien nicheä. Ideat järjestetty iän, aiheen, kauden ja muodon mukaan. Löydä nichesi Etsyyn ja KDP:hen.',
    ctaTitle: 'Valmis aloittamaan nichesi?',
    ctaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei rekisteröitymistä.',
    ctaButton: 'Kokeile generaattoreita ilmaiseksi',
    subcatDescriptions: {
      animals: 'Eläin- ja luontoaiheiset tulostenichit',
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
    'birds-printable-ideas': 'Vögel',
    'insects-printable-ideas': 'Insekten',
    'forest-animals-printable-ideas': 'Waldtiere',
    'christmas-printable-ideas': 'Weihnachten',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Ostern',
    'valentines-day-printable-ideas': 'Valentinstag',
    'back-to-school-printable-ideas': 'Schulanfang',
    'summer-printable-ideas': 'Sommer',
    'winter-printable-ideas': 'Winter',
    'spring-printable-ideas': 'Frühling',
    'thanksgiving-printable-ideas': 'Erntedankfest',
    'parents-day-printable-ideas': 'Elterntag',
    'space-printable-ideas': 'Weltraum',
    'transportation-printable-ideas': 'Fahrzeuge',
    'food-cooking-printable-ideas': 'Essen & Kochen',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musik',
    'construction-printable-ideas': 'Baustelle',
    'pirates-printable-ideas': 'Piraten',
    'fairy-tale-printable-ideas': 'Märchen',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Unterwasser',
    'preschool-printable-ideas': 'Vorschule',
    'kindergarten-printable-ideas': 'Kindergarten',
    'first-grade-printable-ideas': '1. Klasse',
    'second-grade-printable-ideas': '2. Klasse',
    'third-grade-printable-ideas': '3. Klasse',
    'homeschool-printable-ideas': 'Homeschooling',
    'special-education-printable-ideas': 'Sonderpädagogik',
    'esl-printable-ideas': 'DaF/DaZ',
    'summer-learning-printable-ideas': 'Sommerlernen',
    'math-facts-printable-ideas': 'Mathe-Grundlagen',
    'subscription-box-printable-ideas': 'Abo-Box',
    'print-on-demand-printable-ideas': 'Print-on-Demand',
    'digital-download-printable-ideas': 'Digitale Downloads',
    'physical-printable-product-ideas': 'Physische Produkte',
    'party-supply-printable-ideas': 'Partyzubehör',
    'custom-worksheet-service-ideas': 'Individuelle Arbeitsblätter',
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
    'forest-animals-printable-ideas': 'Animaux de la forêt',
    'christmas-printable-ideas': 'Noël',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Pâques',
    'valentines-day-printable-ideas': 'Saint-Valentin',
    'back-to-school-printable-ideas': 'Rentrée scolaire',
    'summer-printable-ideas': 'Été',
    'winter-printable-ideas': 'Hiver',
    'spring-printable-ideas': 'Printemps',
    'thanksgiving-printable-ideas': 'Action de grâces',
    'parents-day-printable-ideas': 'Fête des parents',
    'space-printable-ideas': 'Espace',
    'transportation-printable-ideas': 'Transports',
    'food-cooking-printable-ideas': 'Cuisine',
    'sports-printable-ideas': 'Sports',
    'music-printable-ideas': 'Musique',
    'construction-printable-ideas': 'Construction',
    'pirates-printable-ideas': 'Pirates',
    'fairy-tale-printable-ideas': 'Contes de fées',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Sous-marin',
    'preschool-printable-ideas': 'Maternelle',
    'kindergarten-printable-ideas': 'Grande section',
    'first-grade-printable-ideas': 'CP',
    'second-grade-printable-ideas': 'CE1',
    'third-grade-printable-ideas': 'CE2',
    'homeschool-printable-ideas': 'École à la maison',
    'special-education-printable-ideas': 'Éducation spéciale',
    'esl-printable-ideas': 'FLE',
    'summer-learning-printable-ideas': 'Cahier de vacances',
    'math-facts-printable-ideas': 'Calcul mental',
    'subscription-box-printable-ideas': 'Box par abonnement',
    'print-on-demand-printable-ideas': 'Impression à la demande',
    'digital-download-printable-ideas': 'Téléchargements',
    'physical-printable-product-ideas': 'Produits physiques',
    'party-supply-printable-ideas': 'Articles de fête',
    'custom-worksheet-service-ideas': 'Fiches personnalisées',
    'bulk-licensing-printable-ideas': 'Licences en gros',
  },
  es: {
    'farm-animals-printable-ideas': 'Animales de granja',
    'ocean-animals-printable-ideas': 'Animales marinos',
    'safari-animals-printable-ideas': 'Animales de safari',
    'pets-printable-ideas': 'Mascotas',
    'dinosaur-printable-ideas': 'Dinosaurios',
    'birds-printable-ideas': 'Pájaros',
    'insects-printable-ideas': 'Insectos',
    'forest-animals-printable-ideas': 'Animales del bosque',
    'christmas-printable-ideas': 'Navidad',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Pascua',
    'valentines-day-printable-ideas': 'San Valentín',
    'back-to-school-printable-ideas': 'Vuelta al cole',
    'summer-printable-ideas': 'Verano',
    'winter-printable-ideas': 'Invierno',
    'spring-printable-ideas': 'Primavera',
    'thanksgiving-printable-ideas': 'Acción de Gracias',
    'parents-day-printable-ideas': 'Día de los padres',
    'space-printable-ideas': 'Espacio',
    'transportation-printable-ideas': 'Transporte',
    'food-cooking-printable-ideas': 'Comida y cocina',
    'sports-printable-ideas': 'Deportes',
    'music-printable-ideas': 'Música',
    'construction-printable-ideas': 'Construcción',
    'pirates-printable-ideas': 'Piratas',
    'fairy-tale-printable-ideas': 'Cuentos de hadas',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Submarino',
    'preschool-printable-ideas': 'Preescolar',
    'kindergarten-printable-ideas': 'Infantil',
    'first-grade-printable-ideas': 'Primer grado',
    'second-grade-printable-ideas': 'Segundo grado',
    'third-grade-printable-ideas': 'Tercer grado',
    'homeschool-printable-ideas': 'Educación en casa',
    'special-education-printable-ideas': 'Educación especial',
    'esl-printable-ideas': 'ELE',
    'summer-learning-printable-ideas': 'Aprendizaje de verano',
    'math-facts-printable-ideas': 'Cálculo mental',
    'subscription-box-printable-ideas': 'Caja de suscripción',
    'print-on-demand-printable-ideas': 'Impresión bajo demanda',
    'digital-download-printable-ideas': 'Descargas digitales',
    'physical-printable-product-ideas': 'Productos físicos',
    'party-supply-printable-ideas': 'Artículos de fiesta',
    'custom-worksheet-service-ideas': 'Fichas personalizadas',
    'bulk-licensing-printable-ideas': 'Licencias al por mayor',
  },
  pt: {
    'farm-animals-printable-ideas': 'Animais da fazenda',
    'ocean-animals-printable-ideas': 'Animais marinhos',
    'safari-animals-printable-ideas': 'Animais de safari',
    'pets-printable-ideas': 'Animais de estimação',
    'dinosaur-printable-ideas': 'Dinossauros',
    'birds-printable-ideas': 'Pássaros',
    'insects-printable-ideas': 'Insetos',
    'forest-animals-printable-ideas': 'Animais da floresta',
    'christmas-printable-ideas': 'Natal',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Páscoa',
    'valentines-day-printable-ideas': 'Dia dos Namorados',
    'back-to-school-printable-ideas': 'Volta às aulas',
    'summer-printable-ideas': 'Verão',
    'winter-printable-ideas': 'Inverno',
    'spring-printable-ideas': 'Primavera',
    'thanksgiving-printable-ideas': 'Ação de Graças',
    'parents-day-printable-ideas': 'Dia dos Pais',
    'space-printable-ideas': 'Espaço',
    'transportation-printable-ideas': 'Transportes',
    'food-cooking-printable-ideas': 'Comida e culinária',
    'sports-printable-ideas': 'Desporto',
    'music-printable-ideas': 'Música',
    'construction-printable-ideas': 'Construção',
    'pirates-printable-ideas': 'Piratas',
    'fairy-tale-printable-ideas': 'Contos de fadas',
    'camping-printable-ideas': 'Acampamento',
    'underwater-printable-ideas': 'Submarino',
    'preschool-printable-ideas': 'Pré-escolar',
    'kindergarten-printable-ideas': 'Jardim de infância',
    'first-grade-printable-ideas': '1º ano',
    'second-grade-printable-ideas': '2º ano',
    'third-grade-printable-ideas': '3º ano',
    'homeschool-printable-ideas': 'Ensino doméstico',
    'special-education-printable-ideas': 'Educação especial',
    'esl-printable-ideas': 'PLE',
    'summer-learning-printable-ideas': 'Aprendizagem de verão',
    'math-facts-printable-ideas': 'Factos matemáticos',
    'subscription-box-printable-ideas': 'Caixa por assinatura',
    'print-on-demand-printable-ideas': 'Impressão sob demanda',
    'digital-download-printable-ideas': 'Downloads digitais',
    'physical-printable-product-ideas': 'Produtos físicos',
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
    'farm-animals-printable-ideas': 'Gårdsdjur',
    'ocean-animals-printable-ideas': 'Havsdjur',
    'safari-animals-printable-ideas': 'Safaridjur',
    'pets-printable-ideas': 'Husdjur',
    'dinosaur-printable-ideas': 'Dinosaurier',
    'birds-printable-ideas': 'Fåglar',
    'insects-printable-ideas': 'Insekter',
    'forest-animals-printable-ideas': 'Skogsdjur',
    'christmas-printable-ideas': 'Jul',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Påsk',
    'valentines-day-printable-ideas': 'Alla hjärtans dag',
    'back-to-school-printable-ideas': 'Skolstart',
    'summer-printable-ideas': 'Sommar',
    'winter-printable-ideas': 'Vinter',
    'spring-printable-ideas': 'Vår',
    'thanksgiving-printable-ideas': 'Tacksägelse',
    'parents-day-printable-ideas': 'Föräldradag',
    'space-printable-ideas': 'Rymden',
    'transportation-printable-ideas': 'Fordon',
    'food-cooking-printable-ideas': 'Mat & matlagning',
    'sports-printable-ideas': 'Sport',
    'music-printable-ideas': 'Musik',
    'construction-printable-ideas': 'Bygge',
    'pirates-printable-ideas': 'Pirater',
    'fairy-tale-printable-ideas': 'Sagor',
    'camping-printable-ideas': 'Camping',
    'underwater-printable-ideas': 'Undervattensvärld',
    'preschool-printable-ideas': 'Förskola',
    'kindergarten-printable-ideas': 'Förskoleklass',
    'first-grade-printable-ideas': 'Årskurs 1',
    'second-grade-printable-ideas': 'Årskurs 2',
    'third-grade-printable-ideas': 'Årskurs 3',
    'homeschool-printable-ideas': 'Hemundervisning',
    'special-education-printable-ideas': 'Specialundervisning',
    'esl-printable-ideas': 'SFI',
    'summer-learning-printable-ideas': 'Sommarlärande',
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
    'farm-animals-printable-ideas': 'Gårddyr',
    'ocean-animals-printable-ideas': 'Havdyr',
    'safari-animals-printable-ideas': 'Safaridyr',
    'pets-printable-ideas': 'Kæledyr',
    'dinosaur-printable-ideas': 'Dinosaurer',
    'birds-printable-ideas': 'Fugle',
    'insects-printable-ideas': 'Insekter',
    'forest-animals-printable-ideas': 'Skovdyr',
    'christmas-printable-ideas': 'Jul',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Påske',
    'valentines-day-printable-ideas': 'Valentinsdag',
    'back-to-school-printable-ideas': 'Skolestart',
    'summer-printable-ideas': 'Sommer',
    'winter-printable-ideas': 'Vinter',
    'spring-printable-ideas': 'Forår',
    'thanksgiving-printable-ideas': 'Høstfest',
    'parents-day-printable-ideas': 'Forældredag',
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
    'preschool-printable-ideas': 'Børnehave',
    'kindergarten-printable-ideas': 'Børnehaveklasse',
    'first-grade-printable-ideas': '1. klasse',
    'second-grade-printable-ideas': '2. klasse',
    'third-grade-printable-ideas': '3. klasse',
    'homeschool-printable-ideas': 'Hjemmeundervisning',
    'special-education-printable-ideas': 'Specialundervisning',
    'esl-printable-ideas': 'Dansk som andetsprog',
    'summer-learning-printable-ideas': 'Sommerlæring',
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
    'farm-animals-printable-ideas': 'Gårdsdyr',
    'ocean-animals-printable-ideas': 'Havdyr',
    'safari-animals-printable-ideas': 'Safaridyr',
    'pets-printable-ideas': 'Kjæledyr',
    'dinosaur-printable-ideas': 'Dinosaurer',
    'birds-printable-ideas': 'Fugler',
    'insects-printable-ideas': 'Insekter',
    'forest-animals-printable-ideas': 'Skogsdyr',
    'christmas-printable-ideas': 'Jul',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Påske',
    'valentines-day-printable-ideas': 'Valentinsdagen',
    'back-to-school-printable-ideas': 'Skolestart',
    'summer-printable-ideas': 'Sommer',
    'winter-printable-ideas': 'Vinter',
    'spring-printable-ideas': 'Vår',
    'thanksgiving-printable-ideas': 'Høstfest',
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
    'kindergarten-printable-ideas': 'Førskoleklasse',
    'first-grade-printable-ideas': '1. trinn',
    'second-grade-printable-ideas': '2. trinn',
    'third-grade-printable-ideas': '3. trinn',
    'homeschool-printable-ideas': 'Hjemmeskole',
    'special-education-printable-ideas': 'Spesialundervisning',
    'esl-printable-ideas': 'Norsk som andrespråk',
    'summer-learning-printable-ideas': 'Sommerlæring',
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
    'farm-animals-printable-ideas': 'Maatilan eläimet',
    'ocean-animals-printable-ideas': 'Merieläimet',
    'safari-animals-printable-ideas': 'Safarieläimet',
    'pets-printable-ideas': 'Lemmikit',
    'dinosaur-printable-ideas': 'Dinosaurukset',
    'birds-printable-ideas': 'Linnut',
    'insects-printable-ideas': 'Hyönteiset',
    'forest-animals-printable-ideas': 'Metsäneläimet',
    'christmas-printable-ideas': 'Joulu',
    'halloween-printable-ideas': 'Halloween',
    'easter-printable-ideas': 'Pääsiäinen',
    'valentines-day-printable-ideas': 'Ystävänpäivä',
    'back-to-school-printable-ideas': 'Koulun alku',
    'summer-printable-ideas': 'Kesä',
    'winter-printable-ideas': 'Talvi',
    'spring-printable-ideas': 'Kevät',
    'thanksgiving-printable-ideas': 'Kiitostenpäivä',
    'parents-day-printable-ideas': 'Vanhempainen päivä',
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
    'kindergarten-printable-ideas': 'Päiväkoti',
    'first-grade-printable-ideas': '1. luokka',
    'second-grade-printable-ideas': '2. luokka',
    'third-grade-printable-ideas': '3. luokka',
    'homeschool-printable-ideas': 'Kotiopetus',
    'special-education-printable-ideas': 'Erityisopetus',
    'esl-printable-ideas': 'S2-opetus',
    'summer-learning-printable-ideas': 'Kesäoppiminen',
    'math-facts-printable-ideas': 'Laskutaito',
    'subscription-box-printable-ideas': 'Tilausboksi',
    'print-on-demand-printable-ideas': 'Tilauspaino',
    'digital-download-printable-ideas': 'Digitaaliset lataukset',
    'physical-printable-product-ideas': 'Fyysiset tuotteet',
    'party-supply-printable-ideas': 'Juhlatarvikkeet',
    'custom-worksheet-service-ideas': 'Räätälöidyt tehtävät',
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
    keywords: ideasKeywords[locale] || ideasKeywords.en,
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
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.lessoncraftstudio.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: content.heroTitle },
    ],
  };

  const collectionSchema = generateIdeasCollectionSchema(locale);
  const allIdeas = ideaPageSlugs.map(idea => ({
    name: displayNames[idea.ideaId] || idea.ideaId,
    slug: getIdeaSlugForLocale(idea.ideaId, locale) || idea.slugs.en,
  }));
  const itemListSchema = generateIdeasItemListSchema(locale, allIdeas);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
            {{ en: 'Explore More', de: 'Mehr entdecken', fr: 'Explorer plus', es: 'Explorar más', pt: 'Explorar mais', it: 'Esplora di più', nl: 'Ontdek meer', sv: 'Utforska mer', da: 'Udforsk mere', no: 'Utforsk mer', fi: 'Tutustu lisää' }[locale] || 'Explore More'}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/guides`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Guías', pt: 'Guias', it: 'Guide', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}
            </Link>
            <Link href={`/${locale}/start`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Get Started', de: 'Erste Schritte', fr: 'Démarrer', es: 'Comenzar', pt: 'Começar', it: 'Inizia', nl: 'Aan de slag', sv: 'Kom igång', da: 'Kom i gang', no: 'Kom i gang', fi: 'Aloita' }[locale] || 'Get Started'}
            </Link>
            <Link href={`/${locale}/tools`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
              {{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas grátis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis værktøjer', no: 'Gratisverktøy', fi: 'Ilmaiset työkalut' }[locale] || 'Free Tools'}
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
