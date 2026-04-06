'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/use-reveal';

interface SellerSuccessStoriesProps {
  locale: string;
}

const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  cards: Array<{
    icon: string;
    title: string;
    description: string;
    linkText: string;
    guideSlug: string;
  }>;
}> = {
  en: {
    badge: 'Market Opportunities',
    title: 'How Sellers Use LessonCraftStudio to Earn',
    subtitle: 'Discover profitable niches with low competition and high demand for printable products.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Word Search Worksheets in German',
        description: 'A growing Etsy niche with low competition. Most sellers only offer English word searches -- create in German, French, or Spanish and reach underserved markets.',
        linkText: 'Learn how to sell word searches',
        guideSlug: 'sell-word-search-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Math Worksheet Bundles for KDP',
        description: 'Evergreen demand on Amazon KDP. Create addition, subtraction, and multiplication bundles once -- sell them forever with zero inventory costs.',
        linkText: 'Learn how to sell math worksheets',
        guideSlug: 'sell-math-worksheets-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Coloring Pages in 11 Languages',
        description: 'Reach markets most sellers ignore. With 3,000+ themed images and 11 language options, you can create unique coloring books for audiences worldwide.',
        linkText: 'Learn how to create coloring pages',
        guideSlug: 'create-etsy-coloring-pages',
      },
    ],
  },
  de: {
    badge: 'Marktchancen',
    title: 'Wie Verkaeufer LessonCraftStudio nutzen',
    subtitle: 'Entdecken Sie profitable Nischen mit geringer Konkurrenz und hoher Nachfrage.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Wortsuche-Arbeitsblaetter auf Deutsch',
        description: 'Eine wachsende Etsy-Nische mit wenig Konkurrenz. Die meisten Anbieter bieten nur englische Raetsel an -- erstellen Sie deutsche, franzoesische oder spanische Versionen.',
        linkText: 'Erfahren Sie, wie Sie Wortsuchen verkaufen',
        guideSlug: 'wortsuche-verkaufen-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Mathe-Arbeitsblatt-Pakete fuer KDP',
        description: 'Dauerhaft gefragte Produkte auf Amazon KDP. Erstellen Sie Additions-, Subtraktions- und Multiplikations-Pakete einmal -- verkaufen Sie sie dauerhaft.',
        linkText: 'Erfahren Sie, wie Sie Mathe-Arbeitsblaetter verkaufen',
        guideSlug: 'mathe-arbeitsblaetter-verkaufen-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Malvorlagen in 11 Sprachen',
        description: 'Erreichen Sie Maerkte, die andere Verkaeufer ignorieren. Mit 3.000+ thematischen Bildern und 11 Sprachoptionen erstellen Sie einzigartige Malvorlagen.',
        linkText: 'Erfahren Sie, wie Sie Malvorlagen erstellen',
        guideSlug: 'etsy-malvorlagen-erstellen',
      },
    ],
  },
  fr: {
    badge: 'Opportunites de marche',
    title: 'Comment les vendeurs utilisent LessonCraftStudio',
    subtitle: 'Decouvrez des niches rentables avec peu de concurrence et une forte demande.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Mots meles en francais',
        description: 'Une niche Etsy en croissance avec peu de concurrence. La plupart des vendeurs proposent uniquement des mots meles en anglais -- creez en francais, allemand ou espagnol.',
        linkText: 'Apprendre a vendre des mots meles',
        guideSlug: 'vendre-mots-caches-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Lots de fiches de maths pour KDP',
        description: 'Une demande perenne sur Amazon KDP. Creez des lots d\'addition, soustraction et multiplication une fois -- vendez-les indefiniment sans frais de stock.',
        linkText: 'Apprendre a vendre des fiches de maths',
        guideSlug: 'vendre-fiches-maths-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Coloriages en 11 langues',
        description: 'Touchez des marches que la plupart des vendeurs ignorent. Avec plus de 3 000 images thematiques et 11 langues, creez des cahiers de coloriage uniques.',
        linkText: 'Apprendre a creer des coloriages',
        guideSlug: 'creer-coloriages-etsy',
      },
    ],
  },
  es: {
    badge: 'Oportunidades de mercado',
    title: 'Como los vendedores usan LessonCraftStudio',
    subtitle: 'Descubre nichos rentables con poca competencia y alta demanda.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Sopas de letras en espanol',
        description: 'Un nicho creciente en Etsy con poca competencia. La mayoria de vendedores solo ofrecen sopas de letras en ingles -- crea en espanol, aleman o frances.',
        linkText: 'Aprende a vender sopas de letras',
        guideSlug: 'vender-sopas-letras-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Paquetes de fichas de mates para KDP',
        description: 'Demanda constante en Amazon KDP. Crea paquetes de sumas, restas y multiplicaciones una vez -- vendelos indefinidamente sin costes de inventario.',
        linkText: 'Aprende a vender fichas de matematicas',
        guideSlug: 'vender-fichas-matematicas-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Paginas para colorear en 11 idiomas',
        description: 'Alcanza mercados que la mayoria de vendedores ignoran. Con mas de 3.000 imagenes tematicas y 11 idiomas, crea libros de colorear unicos.',
        linkText: 'Aprende a crear paginas para colorear',
        guideSlug: 'crear-paginas-colorear-etsy',
      },
    ],
  },
  it: {
    badge: 'Opportunita di mercato',
    title: 'Come i venditori usano LessonCraftStudio',
    subtitle: 'Scopri nicchie redditizie con poca concorrenza e alta domanda.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Crucipuzzle in italiano',
        description: 'Una nicchia Etsy in crescita con poca concorrenza. La maggior parte dei venditori offre solo crucipuzzle in inglese -- crea in italiano, tedesco o francese.',
        linkText: 'Scopri come vendere crucipuzzle',
        guideSlug: 'vendere-cerca-parole-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Pacchetti di schede di matematica per KDP',
        description: 'Domanda costante su Amazon KDP. Crea pacchetti di addizioni, sottrazioni e moltiplicazioni una volta -- vendili per sempre senza costi di inventario.',
        linkText: 'Scopri come vendere schede di matematica',
        guideSlug: 'vendere-schede-matematica-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Pagine da colorare in 11 lingue',
        description: 'Raggiungi mercati che la maggior parte dei venditori ignora. Con oltre 3.000 immagini tematiche e 11 lingue, crea libri da colorare unici.',
        linkText: 'Scopri come creare pagine da colorare',
        guideSlug: 'creare-pagine-colorare-etsy',
      },
    ],
  },
  pt: {
    badge: 'Oportunidades de mercado',
    title: 'Como os vendedores usam o LessonCraftStudio',
    subtitle: 'Descubra nichos lucrativos com pouca concorrencia e alta demanda.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Caca-palavras em portugues',
        description: 'Um nicho crescente no Etsy com pouca concorrencia. A maioria dos vendedores oferece apenas caca-palavras em ingles -- crie em portugues, alemao ou frances.',
        linkText: 'Aprenda a vender caca-palavras',
        guideSlug: 'vender-caca-palavras-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Pacotes de fichas de matematica para KDP',
        description: 'Demanda constante no Amazon KDP. Crie pacotes de adicao, subtracao e multiplicacao uma vez -- venda indefinidamente sem custos de inventario.',
        linkText: 'Aprenda a vender fichas de matematica',
        guideSlug: 'vender-fichas-matematica-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Paginas para colorir em 11 idiomas',
        description: 'Alcance mercados que a maioria dos vendedores ignora. Com mais de 3.000 imagens tematicas e 11 idiomas, crie livros para colorir unicos.',
        linkText: 'Aprenda a criar paginas para colorir',
        guideSlug: 'criar-paginas-colorir-etsy',
      },
    ],
  },
  nl: {
    badge: 'Marktkansen',
    title: 'Hoe verkopers LessonCraftStudio gebruiken',
    subtitle: 'Ontdek winstgevende niches met weinig concurrentie en veel vraag.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Woordzoekers in het Nederlands',
        description: 'Een groeiende Etsy-niche met weinig concurrentie. De meeste verkopers bieden alleen Engelse woordzoekers aan -- maak ze in het Nederlands, Duits of Frans.',
        linkText: 'Leer hoe je woordzoekers verkoopt',
        guideSlug: 'woordzoekers-verkopen-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Rekenwerkblad-bundels voor KDP',
        description: 'Constante vraag op Amazon KDP. Maak optelling, aftrekking en vermenigvuldiging bundels eenmalig -- verkoop ze voorgoed zonder voorraadkosten.',
        linkText: 'Leer hoe je rekenwerkbladen verkoopt',
        guideSlug: 'reken-werkbladen-verkopen-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Kleurplaten in 11 talen',
        description: 'Bereik markten die de meeste verkopers negeren. Met 3.000+ thematische afbeeldingen en 11 talen maak je unieke kleurboeken.',
        linkText: 'Leer hoe je kleurplaten maakt',
        guideSlug: 'etsy-kleurplaten-maken',
      },
    ],
  },
  da: {
    badge: 'Markedsmuligheder',
    title: 'Hvordan saelgere bruger LessonCraftStudio',
    subtitle: 'Opdag profitable nicher med lav konkurrence og hoej eftersporgsel.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Ordsoegninger paa dansk',
        description: 'En voksende Etsy-niche med lav konkurrence. De fleste saelgere tilbyder kun engelske ordsoegninger -- opret paa dansk, tysk eller fransk.',
        linkText: 'Laer at saelge ordsoegninger',
        guideSlug: 'saelg-ordsoegning-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Matematik-opgavepakker til KDP',
        description: 'Konstant eftersporgsel paa Amazon KDP. Opret additions-, subtraktions- og multiplikationspakker en gang -- saelg dem for evigt uden lageromkostninger.',
        linkText: 'Laer at saelge matematik-opgaver',
        guideSlug: 'saelg-matematik-arbejdsark-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Farvelaegningssider paa 11 sprog',
        description: 'Naa markeder som de fleste saelgere ignorerer. Med over 3.000 tematiske billeder og 11 sprog kan du lave unikke farvelaegningsboeger.',
        linkText: 'Laer at lave farvelaegningssider',
        guideSlug: 'skab-farvelaegningssider-etsy',
      },
    ],
  },
  sv: {
    badge: 'Marknadsmoejligheter',
    title: 'Hur saeljare anvaender LessonCraftStudio',
    subtitle: 'Upptaeck loensamma nischer med laag konkurrens och hoeg efterfraagan.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Ordsoek paa svenska',
        description: 'En vaexande Etsy-nisch med laag konkurrens. De flesta saeljare erbjuder bara engelska ordsoek -- skapa paa svenska, tyska eller franska.',
        linkText: 'Laer dig saelja ordsoek',
        guideSlug: 'saelja-ordsoek-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Mattearbetsblad-paket foer KDP',
        description: 'Konstant efterfraagan paa Amazon KDP. Skapa additions-, subtraktions- och multiplikationspaket en gaang -- saelj dem foer alltid utan lagerkostnader.',
        linkText: 'Laer dig saelja mattearbetsblad',
        guideSlug: 'saelja-mattearbetsblad-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Maelarsidor paa 11 spraak',
        description: 'Naa marknader som de flesta saeljare ignorerar. Med oever 3 000 tematiska bilder och 11 spraak skapar du unika maelarboecher.',
        linkText: 'Laer dig skapa maelarsidor',
        guideSlug: 'skapa-maelarsidor-etsy',
      },
    ],
  },
  no: {
    badge: 'Markedsmuligheter',
    title: 'Hvordan selgere bruker LessonCraftStudio',
    subtitle: 'Oppdag loennsomme nisjer med lav konkurranse og hoey etterspoorsel.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Ordsoek paa norsk',
        description: 'En voksende Etsy-nisje med lav konkurranse. De fleste selgere tilbyr bare engelske ordsoek -- lag paa norsk, tysk eller fransk.',
        linkText: 'Laer aa selge ordsoek',
        guideSlug: 'selg-ordsoek-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Matteoppgave-pakker for KDP',
        description: 'Konstant etterspoorsel paa Amazon KDP. Lag addisjons-, subtraksjons- og multiplikasjonspakker en gang -- selg dem for alltid uten lagerkostnader.',
        linkText: 'Laer aa selge matteoppgaver',
        guideSlug: 'selg-matte-arbeidsark-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Fargeleggingssider paa 11 spraak',
        description: 'Naa markeder som de fleste selgere ignorerer. Med over 3 000 tematiske bilder og 11 spraak lager du unike fargeleggingsboeker.',
        linkText: 'Laer aa lage fargeleggingssider',
        guideSlug: 'lag-fargeleggingssider-etsy',
      },
    ],
  },
  fi: {
    badge: 'Markkinamahdollisuudet',
    title: 'Miten myyjat kayttavat LessonCraftStudiota',
    subtitle: 'Loeyda kannattavia markkinarakoja vaehaeisellae kilpailulla ja suurella kysynnaellae.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Sananetsintatehtavat suomeksi',
        description: 'Kasvava Etsy-markkinarako vaehaeisellae kilpailulla. Useimmat myyjat tarjoavat vain englanninkielisia sananetsintoja -- luo suomeksi, saksaksi tai ranskaksi.',
        linkText: 'Opi myymaan sananetsintoja',
        guideSlug: 'sell-word-search-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Matematiikkatehtavapaketit KDP:lle',
        description: 'Jatkuva kysynta Amazon KDP:ssa. Luo yhteenlasku-, vaehennyslasku- ja kertolaskupaketit kerran -- myy niita ikuisesti ilman varastokustannuksia.',
        linkText: 'Opi myymaan matematiikkatehtavia',
        guideSlug: 'sell-math-worksheets-etsy',
      },
      {
        icon: '\uD83C\uDFA8',
        title: 'Vaerityskuvat 11 kielellae',
        description: 'Tavoita markkinat joita useimmat myyjat sivuuttavat. Yli 3 000 teemakuvalla ja 11 kielellae luot ainutlaatuisia vaeritykirjoja.',
        linkText: 'Opi luomaan vaerityskuvia',
        guideSlug: 'create-etsy-coloring-pages',
      },
    ],
  },
};

export default function SellerSuccessStories({ locale }: SellerSuccessStoriesProps) {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  const content = localeContent[locale] || localeContent.en;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-600">{'\uD83D\uDCC8'}</span>
            <span className="text-sm font-medium text-emerald-700">{content.badge}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto reveal">
          {content.cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">{card.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1">{card.description}</p>
              <Link
                href={`/${locale}/guides/${card.guideSlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {card.linkText}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
