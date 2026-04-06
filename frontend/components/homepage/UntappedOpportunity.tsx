'use client';

import { useReveal } from '@/hooks/use-reveal';

interface UntappedOpportunityProps {
  locale: string;
}

const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  advantages: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  trustItems: string[];
}> = {
  en: {
    badge: 'The Untapped Opportunity',
    title: 'Why Printable Businesses Work',
    subtitle: 'Low startup costs, zero inventory, and evergreen demand. Here\'s why thousands of entrepreneurs are building printable businesses.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Low Competition in Non-English Markets',
        description: 'Most sellers only target English speakers. With 11 languages built in, you can dominate German, French, Spanish, and 8 other markets that competitors ignore.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Evergreen Demand, Zero Inventory',
        description: 'Educational printables sell year-round. Create a worksheet once and sell unlimited digital copies forever. No shipping, no storage, no restocking.',
      },
      {
        icon: '\u2728',
        title: 'Professional Quality, No Design Skills',
        description: '300 DPI print-ready PDFs with 3,000+ themed images and automatic answer keys. Your products look like they took hours to design -- you made them in minutes.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Commercial License Included',
        description: 'Sell on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, or your own website. Full commercial rights included -- no attribution required.',
      },
    ],
    trustItems: [
      'No monthly fees',
      'Unlimited downloads with license',
      'Automatic answer keys',
    ],
  },
  de: {
    badge: 'Die ungenutzte Chance',
    title: 'Warum Printable-Businesses funktionieren',
    subtitle: 'Niedrige Startkosten, kein Lager, dauerhafte Nachfrage. Deshalb bauen Tausende Unternehmer Printable-Businesses auf.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Wenig Konkurrenz in nicht-englischen Maerkten',
        description: 'Die meisten Verkaeufer zielen nur auf Englisch ab. Mit 11 integrierten Sprachen dominieren Sie deutsche, franzoesische, spanische und 8 weitere Maerkte.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Dauerhafte Nachfrage, kein Lager',
        description: 'Paedagogische Druckvorlagen verkaufen sich das ganze Jahr. Erstellen Sie ein Arbeitsblatt einmal und verkaufen Sie unbegrenzt digitale Kopien.',
      },
      {
        icon: '\u2728',
        title: 'Professionelle Qualitaet, keine Designkenntnisse',
        description: '300 DPI druckfertige PDFs mit ueber 3.000 thematischen Bildern und automatischen Loesungsschluesseln. Ihre Produkte sehen professionell aus.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommerzielle Lizenz inklusive',
        description: 'Verkaufen Sie auf Etsy, Amazon KDP, Teachers Pay Teachers oder Ihrer eigenen Website. Volle kommerzielle Rechte -- keine Quellenangabe noetig.',
      },
    ],
    trustItems: [
      'Keine monatlichen Gebuehren',
      'Unbegrenzte Downloads mit Lizenz',
      'Automatische Loesungsschluessel',
    ],
  },
  fr: {
    badge: 'L\'opportunite inexploitee',
    title: 'Pourquoi les business d\'imprimables fonctionnent',
    subtitle: 'Faibles couts de demarrage, zero stock, demande constante. Voici pourquoi des milliers d\'entrepreneurs creent des business d\'imprimables.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Peu de concurrence hors marche anglophone',
        description: 'La plupart des vendeurs ne ciblent que l\'anglais. Avec 11 langues integrees, dominez les marches allemand, francais, espagnol et 8 autres.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Demande perenne, zero stock',
        description: 'Les imprimables educatifs se vendent toute l\'annee. Creez une fiche une fois et vendez des copies numeriques a l\'infini. Ni envoi, ni stockage.',
      },
      {
        icon: '\u2728',
        title: 'Qualite professionnelle, aucune competence design',
        description: 'PDFs prets a imprimer en 300 DPI avec plus de 3 000 images thematiques et corriges automatiques. Vos produits ont l\'air professionnels.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licence commerciale incluse',
        description: 'Vendez sur Etsy, Amazon KDP, Teachers Pay Teachers ou votre propre site. Droits commerciaux complets -- aucune attribution requise.',
      },
    ],
    trustItems: [
      'Pas de frais mensuels',
      'Telechargements illimites avec licence',
      'Corriges automatiques',
    ],
  },
  es: {
    badge: 'La oportunidad sin explotar',
    title: 'Por que funcionan los negocios de imprimibles',
    subtitle: 'Bajos costes iniciales, cero inventario y demanda constante. Por eso miles de emprendedores crean negocios de imprimibles.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Poca competencia en mercados no ingleses',
        description: 'La mayoria de vendedores solo se dirigen al publico anglofono. Con 11 idiomas integrados, domina los mercados aleman, frances, espanol y 8 mas.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Demanda constante, cero inventario',
        description: 'Los imprimibles educativos se venden todo el ano. Crea una ficha una vez y vende copias digitales ilimitadas. Sin envios, sin almacen.',
      },
      {
        icon: '\u2728',
        title: 'Calidad profesional, sin habilidades de diseno',
        description: 'PDFs listos para imprimir a 300 DPI con mas de 3.000 imagenes tematicas y respuestas automaticas. Tus productos parecen profesionales.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licencia comercial incluida',
        description: 'Vende en Etsy, Amazon KDP, Teachers Pay Teachers o tu propio sitio web. Derechos comerciales completos -- sin necesidad de atribucion.',
      },
    ],
    trustItems: [
      'Sin cuotas mensuales',
      'Descargas ilimitadas con licencia',
      'Respuestas automaticas',
    ],
  },
  it: {
    badge: 'L\'opportunita inesplorata',
    title: 'Perche i business di stampabili funzionano',
    subtitle: 'Bassi costi iniziali, zero inventario e domanda costante. Ecco perche migliaia di imprenditori creano business di stampabili.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Poca concorrenza nei mercati non anglofoni',
        description: 'La maggior parte dei venditori si rivolge solo al pubblico anglofono. Con 11 lingue integrate, domina i mercati tedesco, francese, spagnolo e altri 8.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Domanda costante, zero inventario',
        description: 'Gli stampabili educativi si vendono tutto l\'anno. Crea una scheda una volta e vendi copie digitali illimitate. Nessuna spedizione, nessun magazzino.',
      },
      {
        icon: '\u2728',
        title: 'Qualita professionale, nessuna competenza di design',
        description: 'PDF pronti per la stampa a 300 DPI con oltre 3.000 immagini tematiche e soluzioni automatiche. I tuoi prodotti sembrano professionali.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licenza commerciale inclusa',
        description: 'Vendi su Etsy, Amazon KDP, Teachers Pay Teachers o il tuo sito web. Diritti commerciali completi -- nessuna attribuzione richiesta.',
      },
    ],
    trustItems: [
      'Nessun canone mensile',
      'Download illimitati con licenza',
      'Soluzioni automatiche',
    ],
  },
  pt: {
    badge: 'A oportunidade inexplorada',
    title: 'Por que negocios de imprimiveis funcionam',
    subtitle: 'Baixos custos iniciais, zero estoque e demanda constante. Por isso milhares de empreendedores criam negocios de imprimiveis.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Pouca concorrencia em mercados nao anglofanos',
        description: 'A maioria dos vendedores so atende o publico anglofono. Com 11 idiomas integrados, domine os mercados alemao, frances, espanhol e mais 8.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Demanda constante, zero estoque',
        description: 'Imprimiveis educativos vendem o ano todo. Crie uma atividade uma vez e venda copias digitais ilimitadas. Sem envio, sem armazenamento.',
      },
      {
        icon: '\u2728',
        title: 'Qualidade profissional, sem habilidades de design',
        description: 'PDFs prontos para impressao a 300 DPI com mais de 3.000 imagens tematicas e gabaritos automaticos. Seus produtos parecem profissionais.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licenca comercial inclusa',
        description: 'Venda no Etsy, Amazon KDP, Teachers Pay Teachers ou seu proprio site. Direitos comerciais completos -- sem necessidade de atribuicao.',
      },
    ],
    trustItems: [
      'Sem taxas mensais',
      'Downloads ilimitados com licenca',
      'Gabaritos automaticos',
    ],
  },
  nl: {
    badge: 'De onbenutte kans',
    title: 'Waarom printable bedrijven werken',
    subtitle: 'Lage opstartkosten, geen voorraad en constante vraag. Daarom bouwen duizenden ondernemers printable bedrijven.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Weinig concurrentie in niet-Engelstalige markten',
        description: 'De meeste verkopers richten zich alleen op Engels. Met 11 ingebouwde talen domineer je de Duitse, Franse, Spaanse en 8 andere markten.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Constante vraag, geen voorraad',
        description: 'Educatieve printables verkopen het hele jaar door. Maak een werkblad eenmalig en verkoop onbeperkt digitale kopieeen. Geen verzending, geen opslag.',
      },
      {
        icon: '\u2728',
        title: 'Professionele kwaliteit, geen ontwerpvaardigheden',
        description: 'Drukklare PDFs van 300 DPI met 3.000+ thematische afbeeldingen en automatische antwoordbladen. Je producten zien er professioneel uit.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Commerciele licentie inbegrepen',
        description: 'Verkoop op Etsy, Amazon KDP, Teachers Pay Teachers of je eigen website. Volledige commerciele rechten -- geen bronvermelding nodig.',
      },
    ],
    trustItems: [
      'Geen maandelijkse kosten',
      'Onbeperkte downloads met licentie',
      'Automatische antwoordbladen',
    ],
  },
  da: {
    badge: 'Den uudnyttede mulighed',
    title: 'Hvorfor printable-virksomheder virker',
    subtitle: 'Lave startomkostninger, intet lager og konstant eftersporgsel. Derfor bygger tusindvis af ivaerksaettere printable-virksomheder.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Lav konkurrence paa ikke-engelske markeder',
        description: 'De fleste saelgere henvender sig kun til engelsktalende. Med 11 indbyggede sprog kan du dominere tyske, franske, spanske og 8 andre markeder.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Konstant eftersporgsel, intet lager',
        description: 'Paedagogiske printables saelges hele aaret. Opret et opgaveark en gang og saelg ubegracnsede digitale kopier for evigt. Ingen forsendelse, ingen opbevaring.',
      },
      {
        icon: '\u2728',
        title: 'Professionel kvalitet, ingen designfaerdigheder',
        description: 'Printklare 300 DPI PDFs med over 3.000 tematiske billeder og automatiske facitlister. Dine produkter ser professionelle ud.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommerciel licens inkluderet',
        description: 'Saelg paa Etsy, Amazon KDP, Teachers Pay Teachers eller din egen hjemmeside. Fulde kommercielle rettigheder -- ingen kildeangivelse paakraevet.',
      },
    ],
    trustItems: [
      'Ingen maanedlige gebyrer',
      'Ubegracnsede downloads med licens',
      'Automatiske facitlister',
    ],
  },
  sv: {
    badge: 'Den outnyttjade moejligheten',
    title: 'Varfoer utskriftsfoereag fungerar',
    subtitle: 'Laaga startkostnader, inget lager och konstant efterfraagan. Daefoer bygger tusentals entreprenoerer utskriftsfoereag.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Laag konkurrens paa icke-engelska marknader',
        description: 'De flesta saeljare riktar sig bara till engelsktalande. Med 11 inbyggda spraak kan du dominera tyska, franska, spanska och 8 andra marknader.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Konstant efterfraagan, inget lager',
        description: 'Pedagogiska utskrifter saeljs aaaret runt. Skapa ett arbetsblad en gaang och saelj obegraensade digitala kopior foer alltid. Ingen frakt, ingen lagring.',
      },
      {
        icon: '\u2728',
        title: 'Professionell kvalitet, inga designkunskaper',
        description: 'Utskriftsklara 300 DPI PDFs med oever 3 000 tematiska bilder och automatiska facit. Dina produkter ser professionella ut.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommersiell licens ingaar',
        description: 'Saelj paa Etsy, Amazon KDP, Teachers Pay Teachers eller din egen webbplats. Fullstaendiga kommersiella raettigheter -- ingen kaellhaenvisning kraevs.',
      },
    ],
    trustItems: [
      'Inga maanadsavgifter',
      'Obegraensade nedladdningar med licens',
      'Automatiska facit',
    ],
  },
  no: {
    badge: 'Den uutnyttede muligheten',
    title: 'Hvorfor utskriftsvirksomheter fungerer',
    subtitle: 'Lave oppstartskostnader, null lager og konstant etterspoorsel. Derfor bygger tusenvis av grunndere utskriftsvirksomheter.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Lav konkurranse i ikke-engelske markeder',
        description: 'De fleste selgere retter seg bare mot engelsktalende. Med 11 innebygde spraak kan du dominere tyske, franske, spanske og 8 andre markeder.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Konstant etterspoorsel, null lager',
        description: 'Pedagogiske utskrifter selges hele aaret. Lag et arbeidsark en gang og selg ubegrensede digitale kopier for alltid. Ingen frakt, ingen lagring.',
      },
      {
        icon: '\u2728',
        title: 'Profesjonell kvalitet, ingen designkunnskaper',
        description: 'Utskriftsklare 300 DPI PDFer med over 3 000 tematiske bilder og automatisk fasit. Produktene dine ser profesjonelle ut.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommersiell lisens inkludert',
        description: 'Selg paa Etsy, Amazon KDP, Teachers Pay Teachers eller din egen nettside. Fulle kommersielle rettigheter -- ingen kildeangivelse noedvendig.',
      },
    ],
    trustItems: [
      'Ingen maanedlige avgifter',
      'Ubegrensede nedlastinger med lisens',
      'Automatisk fasit',
    ],
  },
  fi: {
    badge: 'Hyoedyntaemaetoen mahdollisuus',
    title: 'Miksi tulostettavien liiketoiminta toimii',
    subtitle: 'Matalat aloituskustannukset, ei varastoa ja jatkuva kysynta. Siksi tuhannet yrittajaet rakentavat tulostettavien liiketoimintaa.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Vaehaeinen kilpailu ei-englanninkielisillae markkinoilla',
        description: 'Useimmat myyjat kohdentavat vain englanninkielisille. 11 sisaanrakennetulla kielellae voit hallita saksalaisia, ranskalaisia, espanjalaisia ja 8 muuta markkinaa.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Jatkuva kysynta, ei varastoa',
        description: 'Opetukselliset tulostettavat myyvat ympari vuoden. Luo tehtava kerran ja myy rajattomasti digitaalisia kopioita ikuisesti. Ei toimitusta, ei varastointia.',
      },
      {
        icon: '\u2728',
        title: 'Ammattimainen laatu, ei suunnittelutaitoja',
        description: 'Tulostusvalmiit 300 DPI PDF-tiedostot yli 3 000 teemakuvalla ja automaattisilla vastauslomakkeilla. Tuotteesi naeyttaevat ammattimaisilta.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kaupallinen lisenssi sisaeltyy',
        description: 'Myy Etsyssa, Amazon KDP:ssa, Teachers Pay Teachersissa tai omalla verkkosivullasi. Taedet kaupalliset oikeudet -- laehdemainintaa ei vaadita.',
      },
    ],
    trustItems: [
      'Ei kuukausimaksuja',
      'Rajoittamattomat lataukset lisenssillae',
      'Automaattiset vastauslomakkeet',
    ],
  },
};

export default function UntappedOpportunity({ locale }: UntappedOpportunityProps) {
  const headerRef = useReveal();
  const cardsRef = useReveal();
  const trustRef = useReveal();

  const content = localeContent[locale] || localeContent.en;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #fffbeb 0%,
            #fef3c7 30%,
            #fde68a 60%,
            #fef3c7 80%,
            #fffbeb 100%
          )`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-100 border border-amber-300">
            <span className="text-amber-700">{'\uD83D\uDCA1'}</span>
            <span className="text-sm font-medium text-amber-800">{content.badge}</span>
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

        {/* Advantage cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 reveal">
          {content.advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">{advantage.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div ref={trustRef} className="flex flex-wrap justify-center gap-8 reveal">
          {content.trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-stone-700">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
