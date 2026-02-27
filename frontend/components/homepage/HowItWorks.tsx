'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/use-reveal';

interface Step {
  number: number;
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
}

interface HowItWorksProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  ctaButton: string;
}> = {
  en: {
    badge: 'Quick Start',
    title: 'Create, Export & Sell',
    subtitle: 'Turn printables into products in 3 simple steps. No design skills required.',
    ctaButton: 'Try Free with Watermark',
  },
  de: {
    badge: 'Schnellstart',
    title: 'Erstellen, Exportieren & Verkaufen',
    subtitle: 'Verwandeln Sie Druckvorlagen in 3 einfachen Schritten in Produkte. Keine Designkenntnisse erforderlich.',
    ctaButton: 'Gratis mit Wasserzeichen testen',
  },
  fr: {
    badge: 'Démarrage rapide',
    title: 'Créer, Exporter & Vendre',
    subtitle: 'Transformez des imprimables en produits en 3 étapes simples. Aucune compétence en design requise.',
    ctaButton: 'Essai gratuit avec filigrane',
  },
  es: {
    badge: 'Inicio rápido',
    title: 'Crear, Exportar y Vender',
    subtitle: 'Convierte imprimibles en productos en 3 pasos sencillos. No necesitas saber diseñar.',
    ctaButton: 'Probar gratis con marca de agua',
  },
  it: {
    badge: 'Guida rapida',
    title: 'Crea, Esporta e Vendi',
    subtitle: 'Trasforma stampabili in prodotti in 3 semplici passaggi. Nessuna competenza grafica richiesta.',
    ctaButton: 'Prova gratis con filigrana',
  },
  pt: {
    badge: 'Início rápido',
    title: 'Criar, Exportar e Vender',
    subtitle: 'Transforme imprimíveis em produtos em 3 passos simples. Não precisa saber design.',
    ctaButton: 'Teste grátis com marca d\'agua',
  },
  nl: {
    badge: 'Snel aan de slag',
    title: 'Maak, Exporteer & Verkoop',
    subtitle: 'Maak van printables producten in 3 simpele stappen. Geen ontwerpvaardigheden nodig.',
    ctaButton: 'Gratis proberen met watermerk',
  },
  da: {
    badge: 'Hurtig start',
    title: 'Opret, Eksporter & Sælg',
    subtitle: 'Gør printables til produkter i 3 enkle trin. Ingen designfærdigheder påkrævet.',
    ctaButton: 'Prøv gratis med vandmærke',
  },
  sv: {
    badge: 'Snabbstart',
    title: 'Skapa, Exportera & Sälj',
    subtitle: 'Gör utskrifter till produkter i 3 enkla steg. Inga designkunskaper krävs.',
    ctaButton: 'Prova gratis med vattenstämpel',
  },
  no: {
    badge: 'Hurtigstart',
    title: 'Lag, Eksporter og Selg',
    subtitle: 'Gjør utskrifter til produkter i 3 enkle trinn. Ingen designkunnskaper nødvendig.',
    ctaButton: 'Prøv gratis med vannmerke',
  },
  fi: {
    badge: 'Pikaopas',
    title: 'Luo, Vie ja Myy',
    subtitle: 'Muuta tulostettavat tuotteiksi kolmessa yksinkertaisessa vaiheessa. Suunnittelutaitoja ei tarvita.',
    ctaButton: 'Kokeile ilmaiseksi vesileimalla',
  },
};

const steps: Step[] = [
  {
    number: 1,
    icon: '🎯',
    titleEn: 'Choose & Create',
    titleDe: 'Auswählen & Erstellen',
    titleFr: 'Choisir & Créer',
    titleEs: 'Elegir y Crear',
    titleIt: 'Scegli e Crea',
    titlePt: 'Escolher e Criar',
    titleNl: 'Kies & Maak',
    titleDa: 'Vælg & Opret',
    titleSv: 'Välj & Skapa',
    titleNo: 'Velg & Lag',
    titleFi: 'Valitse & Luo',
    descriptionEn: 'Pick from 33 professional generators. Choose a theme from 3,000+ images, customize settings, and generate your printable in under 3 minutes.',
    descriptionDe: 'Wählen Sie aus 33 professionellen Generatoren. Wählen Sie ein Thema aus über 3.000 Bildern, passen Sie die Einstellungen an und generieren Sie Ihre Druckvorlage in unter 3 Minuten.',
    descriptionFr: 'Choisissez parmi 33 générateurs professionnels. Sélectionnez un thème parmi plus de 3 000 images, personnalisez et générez votre imprimable en moins de 3 minutes.',
    descriptionEs: 'Elige entre 33 generadores profesionales. Selecciona un tema de más de 3.000 imágenes, personaliza y genera tu imprimible en menos de 3 minutos.',
    descriptionIt: 'Scegli tra 33 generatori professionali. Seleziona un tema da oltre 3.000 immagini, personalizza e genera il tuo stampabile in meno di 3 minuti.',
    descriptionPt: 'Escolha entre 33 geradores profissionais. Selecione um tema de mais de 3.000 imagens, personalize e gere o seu imprimível em menos de 3 minutos.',
    descriptionNl: 'Kies uit 33 professionele generatoren. Selecteer een thema uit 3.000+ afbeeldingen, pas instellingen aan en genereer je printable in minder dan 3 minuten.',
    descriptionDa: 'Vælg mellem 33 professionelle generatorer. Vælg et tema fra over 3.000 billeder, tilpas indstillinger og generer din printable på under 3 minutter.',
    descriptionSv: 'Välj bland 33 professionella generatorer. Välj ett tema från över 3 000 bilder, anpassa inställningar och generera din utskrift på under 3 minuter.',
    descriptionNo: 'Velg blant 33 profesjonelle generatorer. Velg et tema fra over 3 000 bilder, tilpass innstillinger og generer din utskrift på under 3 minutter.',
    descriptionFi: 'Valitse 33 ammattimaisesta generaattorista. Valitse teema yli 3 000 kuvasta, säädä asetukset ja luo tulostettavasi alle 3 minuutissa.',
  },
  {
    number: 2,
    icon: '📥',
    titleEn: 'Export High-Quality PDF',
    titleDe: 'Hochwertiges PDF exportieren',
    titleFr: 'Exporter un PDF haute qualité',
    titleEs: 'Exportar PDF de alta calidad',
    titleIt: 'Esporta PDF di alta qualità',
    titlePt: 'Exportar PDF de alta qualidade',
    titleNl: 'Exporteer hoogwaardige PDF',
    titleDa: 'Eksporter PDF i høj kvalitet',
    titleSv: 'Exportera högkvalitets-PDF',
    titleNo: 'Eksporter høykvalitets-PDF',
    titleFi: 'Vie korkealaatuinen PDF',
    descriptionEn: 'Download 300 DPI print-ready PDFs with answer keys included. Every printable is commercially licensed — ready to sell as-is.',
    descriptionDe: 'Laden Sie druckfertige 300-DPI-PDFs mit Lösungsblättern herunter. Jede Druckvorlage ist kommerziell lizenziert — sofort verkaufsbereit.',
    descriptionFr: 'Téléchargez des PDF 300 DPI prêts à imprimer avec corrigés inclus. Chaque imprimable est sous licence commerciale — prêt à vendre.',
    descriptionEs: 'Descarga PDFs listos para imprimir a 300 DPI con respuestas incluidas. Cada imprimible tiene licencia comercial — listo para vender.',
    descriptionIt: 'Scarica PDF pronti per la stampa a 300 DPI con soluzioni incluse. Ogni stampabile è con licenza commerciale — pronto per la vendita.',
    descriptionPt: 'Baixe PDFs prontos para impressão a 300 DPI com gabaritos incluídos. Cada imprimível tem licença comercial — pronto para vender.',
    descriptionNl: 'Download drukklare 300 DPI PDFs met antwoordbladen. Elke printable is commercieel gelicenseerd — klaar om te verkopen.',
    descriptionDa: 'Download printklare 300 DPI PDFs med facitlister inkluderet. Hver printable er kommercielt licenseret — klar til salg.',
    descriptionSv: 'Ladda ner utskriftsklara 300 DPI PDFs med facit inkluderat. Varje utskrift är kommersiellt licensierad — redo att sälja.',
    descriptionNo: 'Last ned utskriftsklare 300 DPI PDFs med fasit inkludert. Hver utskrift er kommersielt lisensiert — klar for salg.',
    descriptionFi: 'Lataa tulostusvalmiita 300 DPI PDF-tiedostoja vastauslomakkeineen. Jokainen tulostettava on kaupallisesti lisensoitu — valmis myytäväksi.',
  },
  {
    number: 3,
    icon: '💰',
    titleEn: 'Sell on Etsy, KDP & More',
    titleDe: 'Auf Etsy, KDP & mehr verkaufen',
    titleFr: 'Vendre sur Etsy, KDP et plus',
    titleEs: 'Vender en Etsy, KDP y más',
    titleIt: 'Vendi su Etsy, KDP e altro',
    titlePt: 'Vender no Etsy, KDP e mais',
    titleNl: 'Verkoop op Etsy, KDP & meer',
    titleDa: 'Sælg på Etsy, KDP og mere',
    titleSv: 'Sälj på Etsy, KDP och mer',
    titleNo: 'Selg på Etsy, KDP og mer',
    titleFi: 'Myy Etsyssä, KDP:ssä ja muualla',
    descriptionEn: 'List your printables on Etsy, Amazon KDP, Teachers Pay Teachers, or your own website. Commercial license included — no attribution required.',
    descriptionDe: 'Listen Sie Ihre Druckvorlagen auf Etsy, Amazon KDP, Teachers Pay Teachers oder Ihrer eigenen Website. Kommerzielle Lizenz inklusive — keine Quellenangabe nötig.',
    descriptionFr: 'Mettez vos imprimables en vente sur Etsy, Amazon KDP, Teachers Pay Teachers ou votre propre site. Licence commerciale incluse — aucune attribution requise.',
    descriptionEs: 'Publica tus imprimibles en Etsy, Amazon KDP, Teachers Pay Teachers o tu propio sitio web. Licencia comercial incluida — sin necesidad de atribución.',
    descriptionIt: 'Metti in vendita i tuoi stampabili su Etsy, Amazon KDP, Teachers Pay Teachers o il tuo sito web. Licenza commerciale inclusa — nessuna attribuzione richiesta.',
    descriptionPt: 'Publique seus imprimíveis no Etsy, Amazon KDP, Teachers Pay Teachers ou seu próprio site. Licença comercial inclusa — sem necessidade de atribuição.',
    descriptionNl: 'Zet je printables te koop op Etsy, Amazon KDP, Teachers Pay Teachers of je eigen website. Commerciële licentie inbegrepen — geen bronvermelding vereist.',
    descriptionDa: 'Sæt dine printables til salg på Etsy, Amazon KDP, Teachers Pay Teachers eller din egen hjemmeside. Kommerciel licens inkluderet — ingen kildeangivelse påkrævet.',
    descriptionSv: 'Lägg upp dina utskrifter till försäljning på Etsy, Amazon KDP, Teachers Pay Teachers eller din egen webbplats. Kommersiell licens ingår — ingen källhänvisning krävs.',
    descriptionNo: 'Legg ut utskriftene dine for salg på Etsy, Amazon KDP, Teachers Pay Teachers eller din egen nettside. Kommersiell lisens inkludert — ingen kildeangivelse nødvendig.',
    descriptionFi: 'Listaa tulostettavasi myyntiin Etsyssä, Amazon KDP:ssä, Teachers Pay Teachersissa tai omalla verkkosivullasi. Kaupallinen lisenssi sisältyy — lähdemainintaa ei vaadita.',
  },
];

export default function HowItWorks({ locale }: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useReveal();
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH; // element top hits bottom of viewport
      const end = -rect.height; // element bottom passes top of viewport
      const current = rect.top;
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setLineProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getStepTitle = (step: Step) => {
    if (locale === 'fi') return step.titleFi;
    if (locale === 'no') return step.titleNo;
    if (locale === 'sv') return step.titleSv;
    if (locale === 'da') return step.titleDa;
    if (locale === 'nl') return step.titleNl;
    if (locale === 'pt') return step.titlePt;
    if (locale === 'it') return step.titleIt;
    if (locale === 'es') return step.titleEs;
    if (locale === 'fr') return step.titleFr;
    if (locale === 'de') return step.titleDe;
    return step.titleEn;
  };
  const getStepDescription = (step: Step) => {
    if (locale === 'fi') return step.descriptionFi;
    if (locale === 'no') return step.descriptionNo;
    if (locale === 'sv') return step.descriptionSv;
    if (locale === 'da') return step.descriptionDa;
    if (locale === 'nl') return step.descriptionNl;
    if (locale === 'pt') return step.descriptionPt;
    if (locale === 'it') return step.descriptionIt;
    if (locale === 'es') return step.descriptionEs;
    if (locale === 'fr') return step.descriptionFr;
    if (locale === 'de') return step.descriptionDe;
    return step.descriptionEn;
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #fef3c7 0%,
            #fffbeb 30%,
            #f8fafc 70%,
            #f1f5f9 100%
          )`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-stone-100 border border-stone-200">
            <span className="text-stone-600">{'\ud83d\ude80'}</span>
            <span className="text-sm font-medium text-stone-700">{content.badge}</span>
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

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-stone-200" />

          {/* Animated progress line */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400 transition-[height] duration-100"
            style={{ height: `${lineProgress * 100}%` }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`
                  relative flex items-start gap-6 md:gap-12
                  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                  md:py-8
                `}
              >
                {/* Step number circle - mobile */}
                <div className="relative z-10 flex-shrink-0 md:hidden">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`
                    flex-1 md:w-5/12
                    ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}
                  `}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="text-3xl flex-shrink-0">{step.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-stone-800 mb-2">
                          {getStepTitle(step)}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {getStepDescription(step)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center number - desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white">
                    {step.number}
                  </div>
                </div>

                {/* Empty space for alignment - desktop */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
          >
            {content.ctaButton}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
