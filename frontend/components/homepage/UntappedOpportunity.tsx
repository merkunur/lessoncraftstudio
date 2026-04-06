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
        title: 'Wenig Konkurrenz in nicht-englischen Märkten',
        description: 'Die meisten Verkäufer zielen nur auf Englisch ab. Mit 11 integrierten Sprachen dominieren Sie deutsche, französische, spanische und 8 weitere Märkte.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Dauerhafte Nachfrage, kein Lager',
        description: 'Pädagogische Druckvorlagen verkaufen sich das ganze Jahr. Erstellen Sie ein Arbeitsblatt einmal und verkaufen Sie unbegrenzt digitale Kopien.',
      },
      {
        icon: '\u2728',
        title: 'Professionelle Qualität, keine Designkenntnisse',
        description: '300 DPI druckfertige PDFs mit über 3.000 thematischen Bildern und automatischen Lösungsschlüsseln. Ihre Produkte sehen professionell aus.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommerzielle Lizenz inklusive',
        description: 'Verkaufen Sie auf Etsy, Amazon KDP, Teachers Pay Teachers oder Ihrer eigenen Website. Volle kommerzielle Rechte -- keine Quellenangabe nötig.',
      },
    ],
    trustItems: [
      'Keine monatlichen Gebühren',
      'Unbegrenzte Downloads mit Lizenz',
      'Automatische Lösungsschlüssel',
    ],
  },
  fr: {
    badge: 'L\'opportunité inexploitée',
    title: 'Pourquoi les business d\'imprimables fonctionnent',
    subtitle: 'Faibles coûts de démarrage, zéro stock, demande constante. Voici pourquoi des milliers d\'entrepreneurs créent des business d\'imprimables.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Peu de concurrence hors marché anglophone',
        description: 'La plupart des vendeurs ne ciblent que l\'anglais. Avec 11 langues intégrées, dominez les marchés allemand, français, espagnol et 8 autres.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Demande pérenne, zéro stock',
        description: 'Les imprimables éducatifs se vendent toute l\'année. Créez une fiche une fois et vendez des copies numériques à l\'infini. Ni envoi, ni stockage.',
      },
      {
        icon: '\u2728',
        title: 'Qualité professionnelle, aucune compétence design',
        description: 'PDFs prêts à imprimer en 300 DPI avec plus de 3 000 images thématiques et corrigés automatiques. Vos produits ont l\'air professionnels.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licence commerciale incluse',
        description: 'Vendez sur Etsy, Amazon KDP, Teachers Pay Teachers ou votre propre site. Droits commerciaux complets -- aucune attribution requise.',
      },
    ],
    trustItems: [
      'Pas de frais mensuels',
      'Téléchargements illimités avec licence',
      'Corrigés automatiques',
    ],
  },
  es: {
    badge: 'La oportunidad sin explotar',
    title: 'Por qué funcionan los negocios de imprimibles',
    subtitle: 'Bajos costes iniciales, cero inventario y demanda constante. Por eso miles de emprendedores crean negocios de imprimibles.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Poca competencia en mercados no ingleses',
        description: 'La mayoría de vendedores solo se dirigen al público anglófono. Con 11 idiomas integrados, domina los mercados alemán, francés, español y 8 más.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Demanda constante, cero inventario',
        description: 'Los imprimibles educativos se venden todo el año. Crea una ficha una vez y vende copias digitales ilimitadas. Sin envíos, sin almacén.',
      },
      {
        icon: '\u2728',
        title: 'Calidad profesional, sin habilidades de diseño',
        description: 'PDFs listos para imprimir a 300 DPI con más de 3.000 imágenes temáticas y respuestas automáticas. Tus productos parecen profesionales.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licencia comercial incluida',
        description: 'Vende en Etsy, Amazon KDP, Teachers Pay Teachers o tu propio sitio web. Derechos comerciales completos -- sin necesidad de atribución.',
      },
    ],
    trustItems: [
      'Sin cuotas mensuales',
      'Descargas ilimitadas con licencia',
      'Respuestas automáticas',
    ],
  },
  it: {
    badge: 'L\'opportunità inesplorata',
    title: 'Perché i business di stampabili funzionano',
    subtitle: 'Bassi costi iniziali, zero inventario e domanda costante. Ecco perché migliaia di imprenditori creano business di stampabili.',
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
        title: 'Qualità professionale, nessuna competenza di design',
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
    title: 'Por que negócios de imprimíveis funcionam',
    subtitle: 'Baixos custos iniciais, zero estoque e demanda constante. Por isso milhares de empreendedores criam negócios de imprimíveis.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Pouca concorrência em mercados não anglófonos',
        description: 'A maioria dos vendedores só atende o público anglófono. Com 11 idiomas integrados, domine os mercados alemão, francês, espanhol e mais 8.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Demanda constante, zero estoque',
        description: 'Imprimíveis educativos vendem o ano todo. Crie uma atividade uma vez e venda cópias digitais ilimitadas. Sem envio, sem armazenamento.',
      },
      {
        icon: '\u2728',
        title: 'Qualidade profissional, sem habilidades de design',
        description: 'PDFs prontos para impressão a 300 DPI com mais de 3.000 imagens temáticas e gabaritos automáticos. Seus produtos parecem profissionais.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Licença comercial inclusa',
        description: 'Venda no Etsy, Amazon KDP, Teachers Pay Teachers ou seu próprio site. Direitos comerciais completos -- sem necessidade de atribuição.',
      },
    ],
    trustItems: [
      'Sem taxas mensais',
      'Downloads ilimitados com licença',
      'Gabaritos automáticos',
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
        description: 'Educatieve printables verkopen het hele jaar door. Maak een werkblad eenmalig en verkoop onbeperkt digitale kopieën. Geen verzending, geen opslag.',
      },
      {
        icon: '\u2728',
        title: 'Professionele kwaliteit, geen ontwerpvaardigheden',
        description: 'Drukklare PDFs van 300 DPI met 3.000+ thematische afbeeldingen en automatische antwoordbladen. Je producten zien er professioneel uit.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Commerciële licentie inbegrepen',
        description: 'Verkoop op Etsy, Amazon KDP, Teachers Pay Teachers of je eigen website. Volledige commerciële rechten -- geen bronvermelding nodig.',
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
    subtitle: 'Lave startomkostninger, intet lager og konstant efterspørgsel. Derfor bygger tusindvis af iværksættere printable-virksomheder.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Lav konkurrence på ikke-engelske markeder',
        description: 'De fleste sælgere henvender sig kun til engelsktalende. Med 11 indbyggede sprog kan du dominere tyske, franske, spanske og 8 andre markeder.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Konstant efterspørgsel, intet lager',
        description: 'Pædagogiske printables sælges hele året. Opret et opgaveark en gang og sælg ubegrænsede digitale kopier for evigt. Ingen forsendelse, ingen opbevaring.',
      },
      {
        icon: '\u2728',
        title: 'Professionel kvalitet, ingen designfærdigheder',
        description: 'Printklare 300 DPI PDFs med over 3.000 tematiske billeder og automatiske facitlister. Dine produkter ser professionelle ud.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommerciel licens inkluderet',
        description: 'Sælg på Etsy, Amazon KDP, Teachers Pay Teachers eller din egen hjemmeside. Fulde kommercielle rettigheder -- ingen kildeangivelse påkrævet.',
      },
    ],
    trustItems: [
      'Ingen månedlige gebyrer',
      'Ubegrænsede downloads med licens',
      'Automatiske facitlister',
    ],
  },
  sv: {
    badge: 'Den outnyttjade möjligheten',
    title: 'Varför utskriftsföretag fungerar',
    subtitle: 'Låga startkostnader, inget lager och konstant efterfrågan. Därför bygger tusentals entreprenörer utskriftsföretag.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Låg konkurrens på icke-engelska marknader',
        description: 'De flesta säljare riktar sig bara till engelsktalande. Med 11 inbyggda språk kan du dominera tyska, franska, spanska och 8 andra marknader.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Konstant efterfrågan, inget lager',
        description: 'Pedagogiska utskrifter säljs året runt. Skapa ett arbetsblad en gång och sälj obegränsade digitala kopior för alltid. Ingen frakt, ingen lagring.',
      },
      {
        icon: '\u2728',
        title: 'Professionell kvalitet, inga designkunskaper',
        description: 'Utskriftsklara 300 DPI PDFs med över 3 000 tematiska bilder och automatiska facit. Dina produkter ser professionella ut.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommersiell licens ingår',
        description: 'Sälj på Etsy, Amazon KDP, Teachers Pay Teachers eller din egen webbplats. Fullständiga kommersiella rättigheter -- ingen källhänvisning krävs.',
      },
    ],
    trustItems: [
      'Inga månadsavgifter',
      'Obegränsade nedladdningar med licens',
      'Automatiska facit',
    ],
  },
  no: {
    badge: 'Den uutnyttede muligheten',
    title: 'Hvorfor utskriftsvirksomheter fungerer',
    subtitle: 'Lave oppstartskostnader, null lager og konstant etterspørsel. Derfor bygger tusenvis av gründere utskriftsvirksomheter.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Lav konkurranse i ikke-engelske markeder',
        description: 'De fleste selgere retter seg bare mot engelsktalende. Med 11 innebygde språk kan du dominere tyske, franske, spanske og 8 andre markeder.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Konstant etterspørsel, null lager',
        description: 'Pedagogiske utskrifter selges hele året. Lag et arbeidsark en gang og selg ubegrensede digitale kopier for alltid. Ingen frakt, ingen lagring.',
      },
      {
        icon: '\u2728',
        title: 'Profesjonell kvalitet, ingen designkunnskaper',
        description: 'Utskriftsklare 300 DPI PDFer med over 3 000 tematiske bilder og automatisk fasit. Produktene dine ser profesjonelle ut.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kommersiell lisens inkludert',
        description: 'Selg på Etsy, Amazon KDP, Teachers Pay Teachers eller din egen nettside. Fulle kommersielle rettigheter -- ingen kildeangivelse nødvendig.',
      },
    ],
    trustItems: [
      'Ingen månedlige avgifter',
      'Ubegrensede nedlastinger med lisens',
      'Automatisk fasit',
    ],
  },
  fi: {
    badge: 'Hyödyntämätön mahdollisuus',
    title: 'Miksi tulostettavien liiketoiminta toimii',
    subtitle: 'Matalat aloituskustannukset, ei varastoa ja jatkuva kysyntä. Siksi tuhannet yrittäjät rakentavat tulostettavien liiketoimintaa.',
    advantages: [
      {
        icon: '\uD83C\uDF0D',
        title: 'Vähäinen kilpailu ei-englanninkielisillä markkinoilla',
        description: 'Useimmat myyjät kohdentavat vain englanninkielisille. 11 sisäänrakennetulla kielellä voit hallita saksalaisia, ranskalaisia, espanjalaisia ja 8 muuta markkinaa.',
      },
      {
        icon: '\u267E\uFE0F',
        title: 'Jatkuva kysyntä, ei varastoa',
        description: 'Opetukselliset tulostettavat myyvät ympäri vuoden. Luo tehtävä kerran ja myy rajattomasti digitaalisia kopioita ikuisesti. Ei toimitusta, ei varastointia.',
      },
      {
        icon: '\u2728',
        title: 'Ammattimainen laatu, ei suunnittelutaitoja',
        description: 'Tulostusvalmiit 300 DPI PDF-tiedostot yli 3 000 teemakuvalla ja automaattisilla vastauslomakkeilla. Tuotteesi näyttävät ammattimaisilta.',
      },
      {
        icon: '\uD83D\uDCBC',
        title: 'Kaupallinen lisenssi sisältyy',
        description: 'Myy Etsyssä, Amazon KDP:ssä, Teachers Pay Teachersissä tai omalla verkkosivullasi. Täydet kaupalliset oikeudet -- lähdemainintaa ei vaadita.',
      },
    ],
    trustItems: [
      'Ei kuukausimaksuja',
      'Rajoittamattomat lataukset lisenssillä',
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
