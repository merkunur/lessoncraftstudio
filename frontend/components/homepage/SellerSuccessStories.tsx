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
        icon: '🌍',
        title: 'Word Puzzles in 11 Languages',
        description: 'Word search, crossword, cryptogram, word scramble, word guess, matching, bingo, picture sort, and treasure hunt generators all produce native-language content -- vocabulary, clues, and word lists automatically localized. Turn one design into 11 sellable variants for international marketplaces.',
        linkText: 'Learn how to sell multi-language worksheets',
        guideSlug: 'worksheets-multiple-languages',
      },
    ],
  },
  de: {
    badge: 'Marktchancen',
    title: 'Wie Verkäufer LessonCraftStudio nutzen',
    subtitle: 'Entdecken Sie profitable Nischen mit geringer Konkurrenz und hoher Nachfrage.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Wortsuche-Arbeitsblätter auf Deutsch',
        description: 'Eine wachsende Etsy-Nische mit wenig Konkurrenz. Die meisten Anbieter bieten nur englische Rätsel an -- erstellen Sie deutsche, französische oder spanische Versionen.',
        linkText: 'Erfahren Sie, wie Sie Wortsuchen verkaufen',
        guideSlug: 'wortsuche-verkaufen-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Mathe-Arbeitsblatt-Pakete für KDP',
        description: 'Dauerhaft gefragte Produkte auf Amazon KDP. Erstellen Sie Additions-, Subtraktions- und Multiplikations-Pakete einmal -- verkaufen Sie sie dauerhaft.',
        linkText: 'Erfahren Sie, wie Sie Mathe-Arbeitsblätter verkaufen',
        guideSlug: 'mathe-arbeitsblaetter-verkaufen-etsy',
      },
      {
        icon: '🌍',
        title: 'Worträtsel in 11 Sprachen',
        description: 'Wortsuche, Kreuzworträtsel, Kryptogramm, Buchstabensalat, Wortraten, Zuordnung, Bingo, Bildersortierung und Schatzsuche -- alle Generatoren erstellen Inhalte in der Zielsprache mit lokalisiertem Vokabular. Aus einem Entwurf werden 11 verkaufsfertige Varianten für internationale Marktplätze.',
        linkText: 'Erfahren Sie, wie Sie mehrsprachige Arbeitsblätter verkaufen',
        guideSlug: 'arbeitsblaetter-mehrere-sprachen',
      },
    ],
  },
  fr: {
    badge: 'Opportunités de marché',
    title: 'Comment les vendeurs utilisent LessonCraftStudio',
    subtitle: 'Découvrez des niches rentables avec peu de concurrence et une forte demande.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Mots mêlés en français',
        description: 'Une niche Etsy en croissance avec peu de concurrence. La plupart des vendeurs proposent uniquement des mots mêlés en anglais -- créez en français, allemand ou espagnol.',
        linkText: 'Apprendre à vendre des mots mêlés',
        guideSlug: 'vendre-mots-caches-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Lots de fiches de maths pour KDP',
        description: 'Une demande pérenne sur Amazon KDP. Créez des lots d\'addition, soustraction et multiplication une fois -- vendez-les indéfiniment sans frais de stock.',
        linkText: 'Apprendre à vendre des fiches de maths',
        guideSlug: 'vendre-fiches-maths-etsy',
      },
      {
        icon: '🌍',
        title: 'Jeux de mots en 11 langues',
        description: 'Mots mêlés, mots croisés, cryptogramme, anagrammes, jeu du pendu, appariement, bingo, tri d\'images et chasse au trésor -- tous les générateurs produisent du contenu en langue native avec vocabulaire localisé. Un seul modèle devient 11 variantes vendables pour les marchés internationaux.',
        linkText: 'Apprendre à vendre des fiches multilingues',
        guideSlug: 'fiches-exercices-plusieurs-langues',
      },
    ],
  },
  es: {
    badge: 'Oportunidades de mercado',
    title: 'Cómo los vendedores usan LessonCraftStudio',
    subtitle: 'Descubre nichos rentables con poca competencia y alta demanda.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Sopas de letras en español',
        description: 'Un nicho creciente en Etsy con poca competencia. La mayoría de vendedores solo ofrecen sopas de letras en inglés -- crea en español, alemán o francés.',
        linkText: 'Aprende a vender sopas de letras',
        guideSlug: 'vender-sopas-letras-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Paquetes de fichas de mates para KDP',
        description: 'Demanda constante en Amazon KDP. Crea paquetes de sumas, restas y multiplicaciones una vez -- véndelos indefinidamente sin costes de inventario.',
        linkText: 'Aprende a vender fichas de matemáticas',
        guideSlug: 'vender-fichas-matematicas-etsy',
      },
      {
        icon: '🌍',
        title: 'Juegos de palabras en 11 idiomas',
        description: 'Sopa de letras, crucigrama, criptograma, anagrama, adivina la palabra, emparejar, bingo, clasificar imágenes y búsqueda del tesoro -- todos los generadores producen contenido en idioma nativo con vocabulario localizado. Un diseño se convierte en 11 variantes vendibles para mercados internacionales.',
        linkText: 'Aprende a vender fichas multilingües',
        guideSlug: 'fichas-ejercicios-varios-idiomas',
      },
    ],
  },
  it: {
    badge: 'Opportunità di mercato',
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
        icon: '🌍',
        title: 'Giochi di parole in 11 lingue',
        description: 'Crucipuzzle, cruciverba, crittogramma, anagramma, indovina la parola, abbinamento, tombola, ordina le immagini e caccia al tesoro -- tutti i generatori producono contenuti nella lingua nativa con vocabolario localizzato. Un solo design diventa 11 varianti vendibili per i mercati internazionali.',
        linkText: 'Scopri come vendere schede multilingue',
        guideSlug: 'schede-esercizi-piu-lingue',
      },
    ],
  },
  pt: {
    badge: 'Oportunidades de mercado',
    title: 'Como os vendedores usam o LessonCraftStudio',
    subtitle: 'Descubra nichos lucrativos com pouca concorrência e alta demanda.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Caça-palavras em português',
        description: 'Um nicho crescente no Etsy com pouca concorrência. A maioria dos vendedores oferece apenas caça-palavras em inglês -- crie em português, alemão ou francês.',
        linkText: 'Aprenda a vender caça-palavras',
        guideSlug: 'vender-caca-palavras-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Pacotes de fichas de matemática para KDP',
        description: 'Demanda constante no Amazon KDP. Crie pacotes de adição, subtração e multiplicação uma vez -- venda indefinidamente sem custos de inventário.',
        linkText: 'Aprenda a vender fichas de matemática',
        guideSlug: 'vender-fichas-matematica-etsy',
      },
      {
        icon: '🌍',
        title: 'Jogos de palavras em 11 idiomas',
        description: 'Caça-palavras, palavras cruzadas, criptograma, anagrama, adivinha a palavra, pareamento, bingo, classificar imagens e caça ao tesouro -- todos os geradores produzem conteúdo no idioma nativo com vocabulário localizado. Um único design torna-se 11 variantes vendáveis para mercados internacionais.',
        linkText: 'Aprenda a vender fichas multilíngues',
        guideSlug: 'fichas-exercicios-varios-idiomas',
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
        icon: '🌍',
        title: 'Woordpuzzels in 11 talen',
        description: 'Woordzoeker, kruiswoordraadsel, cryptogram, woord-anagram, woord raden, matchen, bingo, afbeeldingen sorteren en schatzoektocht -- alle generators produceren inhoud in de moedertaal met gelokaliseerde woordenschat. Eén ontwerp wordt 11 verkoopbare varianten voor internationale marktplaatsen.',
        linkText: 'Leer hoe je meertalige werkbladen verkoopt',
        guideSlug: 'werkbladen-meerdere-talen',
      },
    ],
  },
  da: {
    badge: 'Markedsmuligheder',
    title: 'Hvordan sælgere bruger LessonCraftStudio',
    subtitle: 'Opdag profitable nicher med lav konkurrence og høj efterspørgsel.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Ordsøgninger på dansk',
        description: 'En voksende Etsy-niche med lav konkurrence. De fleste sælgere tilbyder kun engelske ordsøgninger -- opret på dansk, tysk eller fransk.',
        linkText: 'Lær at sælge ordsøgninger',
        guideSlug: 'saelg-ordsoegning-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Matematik-opgavepakker til KDP',
        description: 'Konstant efterspørgsel på Amazon KDP. Opret additions-, subtraktions- og multiplikationspakker en gang -- sælg dem for evigt uden lageromkostninger.',
        linkText: 'Lær at sælge matematik-opgaver',
        guideSlug: 'saelg-matematik-arbejdsark-etsy',
      },
      {
        icon: '🌍',
        title: 'Ordpuslespil på 11 sprog',
        description: 'Ordsøgning, krydsord, kryptogram, bogstavrod, gæt ordet, matching, bingo, billedsortering og skattejagt -- alle generatorer laver indhold på modersmålet med lokaliseret ordforråd. Ét design bliver til 11 sælgbare varianter til internationale markedspladser.',
        linkText: 'Lær at sælge flersprogede arbejdsark',
        guideSlug: 'arbejdsark-flere-sprog',
      },
    ],
  },
  sv: {
    badge: 'Marknadsmöjligheter',
    title: 'Hur säljare använder LessonCraftStudio',
    subtitle: 'Upptäck lönsamma nischer med låg konkurrens och hög efterfrågan.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Ordsök på svenska',
        description: 'En växande Etsy-nisch med låg konkurrens. De flesta säljare erbjuder bara engelska ordsök -- skapa på svenska, tyska eller franska.',
        linkText: 'Lär dig sälja ordsök',
        guideSlug: 'saelja-ordsoek-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Mattearbetsblad-paket för KDP',
        description: 'Konstant efterfrågan på Amazon KDP. Skapa additions-, subtraktions- och multiplikationspaket en gång -- sälj dem för alltid utan lagerkostnader.',
        linkText: 'Lär dig sälja mattearbetsblad',
        guideSlug: 'saelja-mattearbetsblad-etsy',
      },
      {
        icon: '🌍',
        title: 'Ordpussel på 11 språk',
        description: 'Ordsök, korsord, kryptogram, anagram, ordgissning, matchning, bingo, bildsortering och skattjakt -- alla generatorer skapar innehåll på modersmålet med lokaliserat ordförråd. En design blir 11 säljbara varianter för internationella marknadsplatser.',
        linkText: 'Lär dig sälja flerspråkiga arbetsblad',
        guideSlug: 'arbetsblad-flera-spraak',
      },
    ],
  },
  no: {
    badge: 'Markedsmuligheter',
    title: 'Hvordan selgere bruker LessonCraftStudio',
    subtitle: 'Oppdag lønnsomme nisjer med lav konkurranse og høy etterspørsel.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Ordsøk på norsk',
        description: 'En voksende Etsy-nisje med lav konkurranse. De fleste selgere tilbyr bare engelske ordsøk -- lag på norsk, tysk eller fransk.',
        linkText: 'Lær å selge ordsøk',
        guideSlug: 'selg-ordsoek-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Matteoppgave-pakker for KDP',
        description: 'Konstant etterspørsel på Amazon KDP. Lag addisjons-, subtraksjons- og multiplikasjonspakker en gang -- selg dem for alltid uten lagerkostnader.',
        linkText: 'Lær å selge matteoppgaver',
        guideSlug: 'selg-matte-arbeidsark-etsy',
      },
      {
        icon: '🌍',
        title: 'Ordspill på 11 språk',
        description: 'Ordsøk, kryssord, kryptogram, bokstavrot, gjett ordet, matching, bingo, bildesortering og skattejakt -- alle generatorene lager innhold på morsmålet med lokalisert ordforråd. Ett design blir til 11 salgbare varianter for internasjonale markedsplasser.',
        linkText: 'Lær å selge flerspråklige arbeidsark',
        guideSlug: 'arbeidsark-flere-spraak',
      },
    ],
  },
  fi: {
    badge: 'Markkinamahdollisuudet',
    title: 'Miten myyjät käyttävät LessonCraftStudiota',
    subtitle: 'Löydä kannattavia markkinarakoja vähäisellä kilpailulla ja suurella kysynnällä.',
    cards: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Sananetsintätehtävät suomeksi',
        description: 'Kasvava Etsy-markkinarako vähäisellä kilpailulla. Useimmat myyjät tarjoavat vain englanninkielisiä sananetsintöjä -- luo suomeksi, saksaksi tai ranskaksi.',
        linkText: 'Opi myymään sananetsintöjä',
        guideSlug: 'sell-word-search-etsy',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Matematiikkatehtäväpaketit KDP:lle',
        description: 'Jatkuva kysyntä Amazon KDP:ssä. Luo yhteenlasku-, vähennyslasku- ja kertolaskupaketit kerran -- myy niitä ikuisesti ilman varastokustannuksia.',
        linkText: 'Opi myymään matematiikkatehtäviä',
        guideSlug: 'sell-math-worksheets-etsy',
      },
      {
        icon: '🌍',
        title: 'Sanapelit 11 kielellä',
        description: 'Sananetsintä, ristikko, kryptogrammi, sananmuunnos, arvaa sana, yhdistäminen, bingo, kuvien lajittelu ja aarrejahti -- kaikki generaattorit tuottavat sisältöä äidinkielellä lokalisoidulla sanastolla. Yhdestä suunnitelmasta tulee 11 myytävää versiota kansainvälisille markkinapaikoille.',
        linkText: 'Opi myymään monikielisiä työarkkeja',
        guideSlug: 'worksheets-multiple-languages',
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
