'use client';

import { useReveal } from '@/hooks/use-reveal';

interface Feature {
  icon: string;
  titleEn: string;
  titleDe: string;
  titleFr: string;
  titleEs: string;
  titleIt: string;
  titlePt: string;
  titleNl: string;
  titleDa: string;
  titleSv: string;
  titleNo: string;
  titleFi: string;
  descriptionEn: string;
  descriptionDe: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt: string;
  descriptionPt: string;
  descriptionNl: string;
  descriptionDa: string;
  descriptionSv: string;
  descriptionNo: string;
  descriptionFi: string;
  highlighted?: boolean;
}

interface HomepageFeaturesProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  keyFeature: string;
  noFees: string;
  unlimitedDownloads: string;
  autoAnswerKeys: string;
}> = {
  en: {
    badge: 'Professional Tools',
    title: 'Everything You Need to Sell',
    subtitle: 'Professional tools to create and sell printables. Generate products that look like they took hours, in just minutes.',
    keyFeature: '⭐ Key Feature',
    noFees: 'No per-printable fees',
    unlimitedDownloads: 'Unlimited downloads',
    autoAnswerKeys: 'Auto-generated answer keys',
  },
  de: {
    badge: 'Professionelle Werkzeuge',
    title: 'Alles, was Sie zum Verkaufen brauchen',
    subtitle: 'Professionelle Werkzeuge zum Erstellen und Verkaufen von Druckvorlagen. Generieren Sie Produkte in wenigen Minuten, die aussehen, als hätten Sie Stunden investiert.',
    keyFeature: '⭐ Highlight',
    noFees: 'Keine Kosten pro Druckvorlage',
    unlimitedDownloads: 'Unbegrenzte Downloads',
    autoAnswerKeys: 'Automatische Lösungsblätter',
  },
  fr: {
    badge: 'Outils professionnels',
    title: 'Tout pour créer et vendre',
    subtitle: 'Des outils professionnels pour créer et vendre des imprimables. Générez des produits dignes d\'un graphiste en quelques minutes.',
    keyFeature: '⭐ Essentiel',
    noFees: 'Aucun coût par imprimable',
    unlimitedDownloads: 'Téléchargements illimités',
    autoAnswerKeys: 'Corrigés générés automatiquement',
  },
  es: {
    badge: 'Herramientas profesionales',
    title: 'Todo lo que necesitas para vender',
    subtitle: 'Herramientas profesionales para crear y vender imprimibles. Crea productos que parecen de diseñador en solo minutos.',
    keyFeature: '⭐ Función destacada',
    noFees: 'Sin costo por imprimible',
    unlimitedDownloads: 'Descargas ilimitadas',
    autoAnswerKeys: 'Respuestas generadas automáticamente',
  },
  it: {
    badge: 'Strumenti professionali',
    title: 'Tutto ciò che ti serve per vendere',
    subtitle: 'Strumenti professionali per creare e vendere stampabili. Crea prodotti degni di un grafico in pochi minuti.',
    keyFeature: '⭐ Funzione chiave',
    noFees: 'Nessun costo per stampabile',
    unlimitedDownloads: 'Download illimitati',
    autoAnswerKeys: 'Soluzioni generate automaticamente',
  },
  pt: {
    badge: 'Ferramentas profissionais',
    title: 'Tudo o que você precisa para vender',
    subtitle: 'Ferramentas profissionais para criar e vender imprimíveis. Crie produtos com aparência profissional em poucos minutos.',
    keyFeature: '⭐ Recurso principal',
    noFees: 'Sem taxa por imprimível',
    unlimitedDownloads: 'Downloads ilimitados',
    autoAnswerKeys: 'Gabaritos gerados automaticamente',
  },
  nl: {
    badge: 'Professionele tools',
    title: 'Alles wat je nodig hebt om te verkopen',
    subtitle: 'Professionele tools om printables te maken en verkopen. Maak producten die eruitzien alsof ze uren werk kostten, in slechts enkele minuten.',
    keyFeature: '⭐ Belangrijkste functie',
    noFees: 'Geen kosten per printable',
    unlimitedDownloads: 'Onbeperkt downloaden',
    autoAnswerKeys: 'Automatisch gegenereerde antwoordbladen',
  },
  da: {
    badge: 'Professionelle værktøjer',
    title: 'Alt hvad du skal bruge for at sælge',
    subtitle: 'Professionelle værktøjer til at oprette og sælge printables. Lav produkter på få minutter, der ser ud som om de tog timer at lave.',
    keyFeature: '⭐ Nøglefunktion',
    noFees: 'Ingen pris pr. printable',
    unlimitedDownloads: 'Ubegrænsede downloads',
    autoAnswerKeys: 'Automatisk genererede facitlister',
  },
  sv: {
    badge: 'Professionella verktyg',
    title: 'Allt du behöver för att sälja',
    subtitle: 'Professionella verktyg för att skapa och sälja utskrifter. Skapa produkter på bara några minuter som ser ut som om de tog timmar att göra.',
    keyFeature: '⭐ Nyckelfunktion',
    noFees: 'Ingen kostnad per utskrift',
    unlimitedDownloads: 'Obegränsade nedladdningar',
    autoAnswerKeys: 'Automatiskt genererade facit',
  },
  no: {
    badge: 'Profesjonelle verktøy',
    title: 'Alt du trenger for å selge',
    subtitle: 'Profesjonelle verktøy for å lage og selge utskrifter. Lag produkter som ser ut som om de tok timer, på bare noen minutter.',
    keyFeature: '⭐ Nøkkelfunksjon',
    noFees: 'Ingen pris per utskrift',
    unlimitedDownloads: 'Ubegrenset nedlasting',
    autoAnswerKeys: 'Automatisk genererte fasitark',
  },
  fi: {
    badge: 'Ammattimaiset työkalut',
    title: 'Kaikki mitä tarvitset myyntiin',
    subtitle: 'Ammattimaiset työkalut tulostettavien luomiseen ja myyntiin. Luo tuotteita, jotka näyttävät tuntien työltä, vain muutamassa minuutissa.',
    keyFeature: '⭐ Avainominaisuus',
    noFees: 'Ei tulostettavakohtaisia maksuja',
    unlimitedDownloads: 'Rajattomat lataukset',
    autoAnswerKeys: 'Automaattiset vastauslomakkeet',
  },
};

// Real features only - no fake information
const features: Feature[] = [
  {
    icon: '⚡',
    titleEn: 'Create in Under 3 Minutes',
    titleDe: 'Erstellen in unter 3 Minuten',
    titleFr: 'Créez en moins de 3 minutes',
    titleEs: 'Crea en menos de 3 minutos',
    titleIt: 'Crea in meno di 3 minuti',
    titlePt: 'Crie em menos de 3 minutos',
    titleNl: 'Maak in minder dan 3 minuten',
    titleDa: 'Opret på under 3 minutter',
    titleSv: 'Skapa på under 3 minuter',
    titleNo: 'Lag på under 3 minutter',
    titleFi: 'Luo alle 3 minuutissa',
    descriptionEn: 'Generate complete printables instantly. Select your theme, customize settings, and download professional PDFs ready to sell.',
    descriptionDe: 'Generieren Sie fertige Druckvorlagen im Handumdrehen. Wählen Sie Ihr Thema, passen Sie die Einstellungen an und laden Sie verkaufsfertige PDFs herunter.',
    descriptionFr: 'Générez des imprimables complets instantanément. Choisissez votre thème, personnalisez et téléchargez des PDF prêts à vendre.',
    descriptionEs: 'Genera fichas completas al instante. Elige tu tema, personaliza las opciones y descarga PDFs profesionales listos para imprimir.',
    descriptionIt: 'Genera schede complete in un istante. Scegli il tema, personalizza le impostazioni e scarica PDF professionali pronti per la stampa.',
    descriptionPt: 'Gere atividades completas instantaneamente. Escolha seu tema, personalize as opções e baixe PDFs profissionais prontos para imprimir.',
    descriptionNl: 'Genereer complete werkbladen in een handomdraai. Kies je thema, pas de instellingen aan en download drukklare PDFs.',
    descriptionDa: 'Generer færdige opgaveark på et øjeblik. Vælg dit tema, tilpas indstillingerne og download printklare PDF-filer.',
    descriptionSv: 'Skapa färdiga övningsblad på ett ögonblick. Välj ditt tema, anpassa inställningarna och ladda ner utskriftsklara PDF-filer.',
    descriptionNo: 'Generer komplette oppgaveark på et øyeblikk. Velg tema, tilpass innstillingene og last ned utskriftsklare PDF-filer.',
    descriptionFi: 'Luo valmiita tehtävämonisteja hetkessä. Valitse teemasi, säädä asetukset ja lataa ammattimaiset tulostusvalmiit PDF-tiedostot.',
    highlighted: false,
  },
  {
    icon: '🎨',
    titleEn: '3000+ Child-Friendly Images',
    titleDe: 'Über 3000 kindgerechte Bilder',
    titleFr: 'Plus de 3000 images adaptées aux enfants',
    titleEs: 'Más de 3000 imágenes para niños',
    titleIt: 'Oltre 3000 immagini per bambini',
    titlePt: 'Mais de 3000 imagens infantis',
    titleNl: 'Meer dan 3000 kindvriendelijke afbeeldingen',
    titleDa: 'Over 3000 børnevenlige billeder',
    titleSv: 'Över 3000 barnvänliga bilder',
    titleNo: 'Over 3000 barnevennlige bilder',
    titleFi: 'Yli 3000 lapsiystävällistä kuvaa',
    descriptionEn: 'Browse our curated library organized by themes: animals, food, vehicles, nature, seasons, and more. Search or filter to find exactly what you need.',
    descriptionDe: 'Durchsuchen Sie unsere Bilderbibliothek nach Themen: Tiere, Essen, Fahrzeuge, Natur, Jahreszeiten und vieles mehr. Suchen und filtern Sie, um genau das Richtige zu finden.',
    descriptionFr: 'Parcourez notre bibliothèque organisée par thèmes : animaux, nourriture, véhicules, nature, saisons et bien plus. Recherchez ou filtrez pour trouver exactement ce qu\'il vous faut.',
    descriptionEs: 'Explora nuestra biblioteca organizada por temas: animales, comida, vehículos, naturaleza, estaciones y más. Busca o filtra para encontrar justo lo que necesitas.',
    descriptionIt: 'Esplora la nostra libreria organizzata per temi: animali, cibo, veicoli, natura, stagioni e molto altro. Cerca o filtra per trovare esattamente ciò che ti serve.',
    descriptionPt: 'Explore nossa biblioteca organizada por temas: animais, comida, veículos, natureza, estações do ano e muito mais. Pesquise ou filtre para encontrar exatamente o que você precisa.',
    descriptionNl: 'Blader door onze bibliotheek ingedeeld op thema: dieren, eten, voertuigen, natuur, seizoenen en meer. Zoek of filter om precies te vinden wat je nodig hebt.',
    descriptionDa: 'Gennemse vores håndplukkede billedbibliotek organiseret efter temaer: dyr, mad, køretøjer, natur, årstider og meget mere. Søg eller filtrer for at finde præcis det, du har brug for.',
    descriptionSv: 'Bläddra i vårt noggrant utvalda bildbibliotek sorterat efter teman: djur, mat, fordon, natur, årstider och mer. Sök eller filtrera för att hitta exakt det du behöver.',
    descriptionNo: 'Bla gjennom vårt håndplukkede bildebibliotek sortert etter temaer: dyr, mat, kjøretøy, natur, årstider og mer. Søk eller filtrer for å finne akkurat det du trenger.',
    descriptionFi: 'Selaa teemoittain järjestettyä kuvakirjastoamme: eläimet, ruoka, ajoneuvot, luonto, vuodenajat ja paljon muuta. Hae tai suodata löytääksesi juuri sen mitä tarvitset.',
    highlighted: false,
  },
  {
    icon: '🌍',
    titleEn: '11 Languages Supported',
    titleDe: '11 Sprachen verfügbar',
    titleFr: '11 langues disponibles',
    titleEs: '11 idiomas disponibles',
    titleIt: '11 lingue disponibili',
    titlePt: '11 idiomas disponíveis',
    titleNl: '11 talen beschikbaar',
    titleDa: '11 sprog understøttet',
    titleSv: '11 språk tillgängliga',
    titleNo: '11 språk tilgjengelig',
    titleFi: '11 kieltä tuettuna',
    descriptionEn: 'Create worksheets in English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish.',
    descriptionDe: 'Erstellen Sie Arbeitsblätter auf Deutsch, Englisch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch und Finnisch.',
    descriptionFr: 'Créez des fiches en français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.',
    descriptionEs: 'Crea fichas en español, inglés, alemán, francés, portugués, italiano, holandés, sueco, danés, noruego y finlandés.',
    descriptionIt: 'Crea schede in italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese e finlandese.',
    descriptionPt: 'Crie atividades em português, inglês, alemão, francês, espanhol, italiano, holandês, sueco, dinamarquês, norueguês e finlandês.',
    descriptionNl: 'Maak werkbladen in het Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins.',
    descriptionDa: 'Lav opgaveark på dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk.',
    descriptionSv: 'Skapa övningsblad på svenska, engelska, tyska, franska, spanska, portugisiska, italienska, holländska, danska, norska och finska.',
    descriptionNo: 'Lag oppgaveark på norsk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk og finsk.',
    descriptionFi: 'Luo tehtävämonisteet suomeksi, englanniksi, saksaksi, ranskaksi, espanjaksi, portugaliksi, italiaksi, hollanniksi, ruotsiksi, tanskaksi ja norjaksi.',
    highlighted: false,
  },
  {
    icon: '✏️',
    titleEn: 'Full Canvas Editing',
    titleDe: 'Vollständige Bearbeitung',
    titleFr: 'Édition complète sur le canevas',
    titleEs: 'Edición completa en el lienzo',
    titleIt: 'Modifica completa sulla tela',
    titlePt: 'Edição completa na tela',
    titleNl: 'Volledige canvasbewerking',
    titleDa: 'Fuld redigering på lærredet',
    titleSv: 'Fullständig redigering på arbetsytan',
    titleNo: 'Full redigering på lerretet',
    titleFi: 'Täydellinen muokkaus',
    descriptionEn: 'Every element is editable. Drag to move, resize with handles, rotate freely. Add custom text with 7 fonts. Upload your own images.',
    descriptionDe: 'Jedes Element ist bearbeitbar. Verschieben, skalieren und drehen Sie frei. Fügen Sie Text mit 7 Schriftarten hinzu. Laden Sie eigene Bilder hoch.',
    descriptionFr: 'Chaque élément est modifiable. Déplacez, redimensionnez et faites pivoter librement. Ajoutez du texte personnalisé avec 7 polices. Importez vos propres images.',
    descriptionEs: 'Cada elemento es editable. Arrastra para mover, cambia el tamaño, gira libremente. Agrega texto con 7 fuentes. Sube tus propias imágenes.',
    descriptionIt: 'Ogni elemento è modificabile. Trascina per spostare, ridimensiona, ruota liberamente. Aggiungi testo con 7 font. Carica le tue immagini.',
    descriptionPt: 'Cada elemento é editável. Arraste para mover, redimensione e gire livremente. Adicione textos com 7 fontes. Envie suas próprias imagens.',
    descriptionNl: 'Elk element is bewerkbaar. Sleep om te verplaatsen, schaal met handvatten, draai vrij. Voeg tekst toe met 7 lettertypen. Upload je eigen afbeeldingen.',
    descriptionDa: 'Hvert element kan redigeres. Træk for at flytte, ændr størrelse med håndtag, roter frit. Tilføj din egen tekst med 7 skrifttyper. Upload dine egne billeder.',
    descriptionSv: 'Varje element kan redigeras. Dra för att flytta, ändra storlek med handtag, rotera fritt. Lägg till egen text med 7 typsnitt. Ladda upp dina egna bilder.',
    descriptionNo: 'Hvert element kan redigeres. Dra for å flytte, endre størrelse med håndtak, roter fritt. Legg til egen tekst med 7 skrifttyper. Last opp egne bilder.',
    descriptionFi: 'Jokaista elementtiä voi muokata. Vedä siirtääksesi, muuta kokoa kahvoilla, kierrä vapaasti. Lisää omaa tekstiä 7 fontilla. Lataa omia kuviasi.',
    highlighted: false,
  },
  {
    icon: '💰',
    titleEn: 'Commercial License Included',
    titleDe: 'Kommerzielle Nutzung inklusive',
    titleFr: 'Usage commercial inclus',
    titleEs: 'Licencia comercial incluida',
    titleIt: 'Licenza commerciale inclusa',
    titlePt: 'Licença comercial inclusa',
    titleNl: 'Commerciële licentie inbegrepen',
    titleDa: 'Kommerciel licens inkluderet',
    titleSv: 'Kommersiell licens ingår',
    titleNo: 'Kommersiell lisens inkludert',
    titleFi: 'Kaupallinen lisenssi sisältyy',
    descriptionEn: 'Sell your worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP. No attribution required. No extra licensing fees.',
    descriptionDe: 'Verkaufen Sie Ihre Arbeitsblätter auf Teachers Pay Teachers, Etsy oder Amazon KDP. Keine Quellenangabe nötig. Keine zusätzlichen Lizenzgebühren.',
    descriptionFr: 'Vendez vos fiches sur Teachers Pay Teachers, Etsy ou Amazon KDP. Aucune mention de source requise. Aucun frais de licence supplémentaire.',
    descriptionEs: 'Vende tus fichas en Teachers Pay Teachers, Etsy o Amazon KDP. Sin necesidad de dar crédito. Sin cuotas de licencia adicionales.',
    descriptionIt: 'Vendi le tue schede su Teachers Pay Teachers, Etsy o Amazon KDP. Nessuna attribuzione richiesta. Nessun costo di licenza aggiuntivo.',
    descriptionPt: 'Venda suas atividades no Teachers Pay Teachers, Etsy ou Amazon KDP. Sem necessidade de crédito. Sem taxas de licença adicionais.',
    descriptionNl: 'Verkoop je werkbladen op Teachers Pay Teachers, Etsy of Amazon KDP. Geen bronvermelding vereist. Geen extra licentiekosten.',
    descriptionDa: 'Sælg dine opgaveark på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen kildeangivelse påkrævet. Ingen ekstra licensgebyrer.',
    descriptionSv: 'Sälj dina övningsblad på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen källhänvisning krävs. Inga extra licensavgifter.',
    descriptionNo: 'Selg oppgavearkene dine på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen kildeangivelse nødvendig. Ingen ekstra lisensavgifter.',
    descriptionFi: 'Myy tehtävämonisteitasi Teachers Pay Teachers, Etsy tai Amazon KDP -palveluissa. Lähdemainintaa ei vaadita. Ei ylimääräisiä lisenssimaksuja.',
    highlighted: true,
  },
  {
    icon: '🖨️',
    titleEn: '300 DPI Print Quality',
    titleDe: '300 DPI Druckqualität',
    titleFr: 'Qualité d\'impression 300 DPI',
    titleEs: 'Calidad de impresión 300 DPI',
    titleIt: 'Qualità di stampa 300 DPI',
    titlePt: 'Qualidade de impressão 300 DPI',
    titleNl: '300 DPI afdrukkwaliteit',
    titleDa: '300 DPI printkvalitet',
    titleSv: '300 DPI utskriftskvalitet',
    titleNo: '300 DPI utskriftskvalitet',
    titleFi: '300 DPI tulostuslaatu',
    descriptionEn: 'Export high-resolution PDFs perfect for commercial printing and selling on Etsy, Amazon KDP, and more. Answer keys included automatically.',
    descriptionDe: 'Exportieren Sie hochauflösende PDFs, perfekt für den Verkauf auf Etsy, Amazon KDP und mehr. Lösungsblätter werden automatisch erstellt.',
    descriptionFr: 'Exportez des PDF haute résolution parfaits pour l\'impression en classe ou la publication commerciale. Les corrigés sont générés automatiquement.',
    descriptionEs: 'Exporta PDFs de alta resolución perfectos para imprimir en el salón y para venta comercial. Las respuestas se incluyen automáticamente.',
    descriptionIt: 'Esporta PDF ad alta risoluzione perfetti per la stampa in classe e la vendita commerciale. Le soluzioni sono generate automaticamente.',
    descriptionPt: 'Exporte PDFs em alta resolução perfeitos para impressão em sala de aula e venda comercial. Gabaritos incluídos automaticamente.',
    descriptionNl: 'Exporteer hoge-resolutie PDFs perfect voor de klas en commerciële publicatie. Antwoordbladen worden automatisch gegenereerd.',
    descriptionDa: 'Eksporter højopløselige PDF-filer perfekte til print i klasseværelset og kommerciel udgivelse. Facitlister inkluderes automatisk.',
    descriptionSv: 'Exportera högupplösta PDF-filer perfekta för klassrumsutskrifter och kommersiell publicering. Facit inkluderas automatiskt.',
    descriptionNo: 'Eksporter høyoppløselige PDF-filer perfekte for utskrift i klasserommet og kommersiell publisering. Fasit inkluderes automatisk.',
    descriptionFi: 'Vie korkearesoluutioisia PDF-tiedostoja, jotka sopivat täydellisesti luokkahuonetulostukseen ja kaupalliseen julkaisuun. Vastauslomakkeet sisältyvät automaattisesti.',
    highlighted: true,
  },
];

export default function HomepageFeatures({ locale }: HomepageFeaturesProps) {
  const headerRef = useReveal();
  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getFeatureTitle = (feature: Feature) => {
    if (locale === 'fi') return feature.titleFi;
    if (locale === 'no') return feature.titleNo;
    if (locale === 'sv') return feature.titleSv;
    if (locale === 'da') return feature.titleDa;
    if (locale === 'nl') return feature.titleNl;
    if (locale === 'pt') return feature.titlePt;
    if (locale === 'it') return feature.titleIt;
    if (locale === 'es') return feature.titleEs;
    if (locale === 'fr') return feature.titleFr;
    if (locale === 'de') return feature.titleDe;
    return feature.titleEn;
  };
  const getFeatureDescription = (feature: Feature) => {
    if (locale === 'fi') return feature.descriptionFi;
    if (locale === 'no') return feature.descriptionNo;
    if (locale === 'sv') return feature.descriptionSv;
    if (locale === 'da') return feature.descriptionDa;
    if (locale === 'nl') return feature.descriptionNl;
    if (locale === 'pt') return feature.descriptionPt;
    if (locale === 'it') return feature.descriptionIt;
    if (locale === 'es') return feature.descriptionEs;
    if (locale === 'fr') return feature.descriptionFr;
    if (locale === 'de') return feature.descriptionDe;
    return feature.descriptionEn;
  };
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #fffbeb 0%,
            #fef3c7 30%,
            #fde68a 60%,
            #fef3c7 100%
          )`,
        }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-200/50 border border-amber-300">
            <span className="text-amber-700">{'\ud83c\udf1f'}</span>
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

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div
                className={`
                  relative p-6 rounded-2xl h-full transition-all duration-300 hover:-translate-y-1
                  ${feature.highlighted
                    ? 'bg-gradient-to-br from-amber-100 via-white to-orange-50 border-2 border-amber-300 shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.25)]'
                    : 'bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]'
                  }
                `}
              >
                {/* Highlighted badge */}
                {feature.highlighted && (
                  <div className="absolute -top-3 left-6">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                      {content.keyFeature}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`
                    w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                    ${feature.highlighted
                      ? 'bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg'
                      : 'bg-gradient-to-br from-amber-100 to-orange-100'
                    }
                  `}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className={`
                    text-xl font-bold mb-3
                    ${feature.highlighted ? 'text-stone-900' : 'text-stone-800'}
                  `}
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {getFeatureTitle(feature)}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${feature.highlighted ? 'text-stone-700' : 'text-stone-600'}`}>
                  {getFeatureDescription(feature)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200/50 p-6">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{content.noFees}</span>
              </div>
              <div className="w-px h-5 bg-stone-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{content.unlimitedDownloads}</span>
              </div>
              <div className="w-px h-5 bg-stone-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{content.autoAnswerKeys}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
