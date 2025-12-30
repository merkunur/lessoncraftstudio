'use client';

import { motion } from 'framer-motion';

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
    badge: 'Platform Features',
    title: 'Everything You Need',
    subtitle: 'Professional tools designed for educators. Create worksheets that look like they took hours, in just minutes.',
    keyFeature: '⭐ Key Feature',
    noFees: 'No per-worksheet fees',
    unlimitedDownloads: 'Unlimited downloads',
    autoAnswerKeys: 'Auto-generated answer keys',
  },
  de: {
    badge: 'Plattform-Funktionen',
    title: 'Alles, was Sie brauchen',
    subtitle: 'Professionelle Werkzeuge für Lehrkräfte. Erstellen Sie Arbeitsblätter in wenigen Minuten, die aussehen, als hätten Sie Stunden daran gearbeitet.',
    keyFeature: '⭐ Highlight',
    noFees: 'Keine Kosten pro Arbeitsblatt',
    unlimitedDownloads: 'Unbegrenzte Downloads',
    autoAnswerKeys: 'Automatische Lösungsblätter',
  },
  fr: {
    badge: 'Fonctionnalités',
    title: 'Tout ce qu\'il vous faut',
    subtitle: 'Des outils professionnels conçus pour les enseignants. Créez des fiches dignes d\'un graphiste en quelques minutes.',
    keyFeature: '⭐ Essentiel',
    noFees: 'Aucun coût par fiche',
    unlimitedDownloads: 'Téléchargements illimités',
    autoAnswerKeys: 'Corrigés générés automatiquement',
  },
  es: {
    badge: 'Funciones de la plataforma',
    title: 'Todo lo que necesitas',
    subtitle: 'Herramientas profesionales diseñadas para maestros. Crea fichas que parecen de diseñador en solo minutos.',
    keyFeature: '⭐ Función destacada',
    noFees: 'Sin costo por ficha',
    unlimitedDownloads: 'Descargas ilimitadas',
    autoAnswerKeys: 'Respuestas generadas automáticamente',
  },
  it: {
    badge: 'Funzionalità della piattaforma',
    title: 'Tutto ciò che ti serve',
    subtitle: 'Strumenti professionali pensati per gli insegnanti. Crea schede degne di un grafico in pochi minuti.',
    keyFeature: '⭐ Funzione chiave',
    noFees: 'Nessun costo per scheda',
    unlimitedDownloads: 'Download illimitati',
    autoAnswerKeys: 'Soluzioni generate automaticamente',
  },
  pt: {
    badge: 'Recursos da plataforma',
    title: 'Tudo o que você precisa',
    subtitle: 'Ferramentas profissionais feitas para educadores. Crie atividades com aparência profissional em poucos minutos.',
    keyFeature: '⭐ Recurso principal',
    noFees: 'Sem taxa por atividade',
    unlimitedDownloads: 'Downloads ilimitados',
    autoAnswerKeys: 'Gabaritos gerados automaticamente',
  },
  nl: {
    badge: 'Platformfuncties',
    title: 'Alles wat je nodig hebt',
    subtitle: 'Professionele tools speciaal voor leerkrachten. Maak werkbladen die eruitzien alsof ze uren werk kostten, in slechts enkele minuten.',
    keyFeature: '⭐ Belangrijkste functie',
    noFees: 'Geen kosten per werkblad',
    unlimitedDownloads: 'Onbeperkt downloaden',
    autoAnswerKeys: 'Automatisch gegenereerde antwoordbladen',
  },
  da: {
    badge: 'Platformfunktioner',
    title: 'Alt hvad du har brug for',
    subtitle: 'Professionelle værktøjer designet til undervisere. Lav opgaveark på få minutter, der ser ud som om de tog timer at lave.',
    keyFeature: '⭐ Nøglefunktion',
    noFees: 'Ingen pris pr. opgaveark',
    unlimitedDownloads: 'Ubegrænsede downloads',
    autoAnswerKeys: 'Automatisk genererede facitlister',
  },
  sv: {
    badge: 'Plattformsfunktioner',
    title: 'Allt du behöver',
    subtitle: 'Professionella verktyg skapade för lärare. Skapa övningsblad på bara några minuter som ser ut som om de tog timmar att göra.',
    keyFeature: '⭐ Nyckelfunktion',
    noFees: 'Ingen kostnad per övningsblad',
    unlimitedDownloads: 'Obegränsade nedladdningar',
    autoAnswerKeys: 'Automatiskt genererade facit',
  },
  no: {
    badge: 'Plattformfunksjoner',
    title: 'Alt du trenger',
    subtitle: 'Profesjonelle verktøy laget for lærere. Lag oppgaveark som ser ut som om de tok timer, på bare noen minutter.',
    keyFeature: '⭐ Nøkkelfunksjon',
    noFees: 'Ingen pris per oppgaveark',
    unlimitedDownloads: 'Ubegrenset nedlasting',
    autoAnswerKeys: 'Automatisk genererte fasitark',
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
    descriptionEn: 'Generate complete worksheets instantly. Select your theme, customize settings, and download professional PDFs ready for printing.',
    descriptionDe: 'Generieren Sie fertige Arbeitsblätter im Handumdrehen. Wählen Sie Ihr Thema, passen Sie die Einstellungen an und laden Sie druckfertige PDFs herunter.',
    descriptionFr: 'Générez des fiches complètes instantanément. Choisissez votre thème, personnalisez les paramètres et téléchargez des PDF prêts à imprimer.',
    descriptionEs: 'Genera fichas completas al instante. Elige tu tema, personaliza las opciones y descarga PDFs profesionales listos para imprimir.',
    descriptionIt: 'Genera schede complete in un istante. Scegli il tema, personalizza le impostazioni e scarica PDF professionali pronti per la stampa.',
    descriptionPt: 'Gere atividades completas instantaneamente. Escolha seu tema, personalize as opções e baixe PDFs profissionais prontos para imprimir.',
    descriptionNl: 'Genereer complete werkbladen in een handomdraai. Kies je thema, pas de instellingen aan en download drukklare PDFs.',
    descriptionDa: 'Generer færdige opgaveark på et øjeblik. Vælg dit tema, tilpas indstillingerne og download printklare PDF-filer.',
    descriptionSv: 'Skapa färdiga övningsblad på ett ögonblick. Välj ditt tema, anpassa inställningarna och ladda ner utskriftsklara PDF-filer.',
    descriptionNo: 'Generer komplette oppgaveark på et øyeblikk. Velg tema, tilpass innstillingene og last ned utskriftsklare PDF-filer.',
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
    descriptionEn: 'Export high-resolution PDFs perfect for classroom printing and commercial publishing. Answer keys included automatically.',
    descriptionDe: 'Exportieren Sie hochauflösende PDFs, perfekt für den Klassenraum oder die kommerzielle Veröffentlichung. Lösungsblätter werden automatisch erstellt.',
    descriptionFr: 'Exportez des PDF haute résolution parfaits pour l\'impression en classe ou la publication commerciale. Les corrigés sont générés automatiquement.',
    descriptionEs: 'Exporta PDFs de alta resolución perfectos para imprimir en el salón y para venta comercial. Las respuestas se incluyen automáticamente.',
    descriptionIt: 'Esporta PDF ad alta risoluzione perfetti per la stampa in classe e la vendita commerciale. Le soluzioni sono generate automaticamente.',
    descriptionPt: 'Exporte PDFs em alta resolução perfeitos para impressão em sala de aula e venda comercial. Gabaritos incluídos automaticamente.',
    descriptionNl: 'Exporteer hoge-resolutie PDFs perfect voor de klas en commerciële publicatie. Antwoordbladen worden automatisch gegenereerd.',
    descriptionDa: 'Eksporter højopløselige PDF-filer perfekte til print i klasseværelset og kommerciel udgivelse. Facitlister inkluderes automatisk.',
    descriptionSv: 'Exportera högupplösta PDF-filer perfekta för klassrumsutskrifter och kommersiell publicering. Facit inkluderas automatiskt.',
    descriptionNo: 'Eksporter høyoppløselige PDF-filer perfekte for utskrift i klasserommet og kommersiell publisering. Fasit inkluderes automatisk.',
    highlighted: true,
  },
];

export default function HomepageFeatures({ locale }: HomepageFeaturesProps) {
  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getFeatureTitle = (feature: Feature) => {
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-200/50 border border-amber-300"
          >
            <span className="text-amber-700">🌟</span>
            <span className="text-sm font-medium text-amber-800">{content.badge}</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                className={`
                  relative p-6 rounded-2xl h-full transition-all duration-300
                  ${feature.highlighted
                    ? 'bg-gradient-to-br from-amber-100 via-white to-orange-50 border-2 border-amber-300 shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg'
                  }
                `}
                whileHover={{
                  y: -5,
                  boxShadow: feature.highlighted
                    ? '0 25px 50px -12px rgba(245,158,11,0.25)'
                    : '0 20px 40px -10px rgba(0,0,0,0.1)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
