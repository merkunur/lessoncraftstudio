const fs = require('fs');
const filePath = 'frontend/components/homepage/HowItWorks.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the localeContent object
const oldStart = "const localeContent: Record<string, {";
const startIdx = content.indexOf(oldStart);

let braceCount = 0;
let endIdx = startIdx;
let foundFirst = false;
for (let i = startIdx; i < content.length; i++) {
  if (content[i] === '{') { braceCount++; foundFirst = true; }
  if (content[i] === '}') {
    braceCount--;
    if (braceCount === 0 && foundFirst) {
      endIdx = i + 1;
      break;
    }
  }
}
if (content[endIdx] === ';') endIdx++;

const newLocaleContent = `const localeContent: Record<string, {
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
    badge: 'D\u00e9marrage rapide',
    title: 'Cr\u00e9er, Exporter & Vendre',
    subtitle: 'Transformez des imprimables en produits en 3 \u00e9tapes simples. Aucune comp\u00e9tence en design requise.',
    ctaButton: 'Essai gratuit avec filigrane',
  },
  es: {
    badge: 'Inicio r\u00e1pido',
    title: 'Crear, Exportar y Vender',
    subtitle: 'Convierte imprimibles en productos en 3 pasos sencillos. No necesitas saber dise\u00f1ar.',
    ctaButton: 'Probar gratis con marca de agua',
  },
  it: {
    badge: 'Guida rapida',
    title: 'Crea, Esporta e Vendi',
    subtitle: 'Trasforma stampabili in prodotti in 3 semplici passaggi. Nessuna competenza grafica richiesta.',
    ctaButton: 'Prova gratis con filigrana',
  },
  pt: {
    badge: 'In\u00edcio r\u00e1pido',
    title: 'Criar, Exportar e Vender',
    subtitle: 'Transforme imprim\u00edveis em produtos em 3 passos simples. N\u00e3o precisa saber design.',
    ctaButton: 'Teste gr\u00e1tis com marca d\\'agua',
  },
  nl: {
    badge: 'Snel aan de slag',
    title: 'Maak, Exporteer & Verkoop',
    subtitle: 'Maak van printables producten in 3 simpele stappen. Geen ontwerpvaardigheden nodig.',
    ctaButton: 'Gratis proberen met watermerk',
  },
  da: {
    badge: 'Hurtig start',
    title: 'Opret, Eksporter & S\u00e6lg',
    subtitle: 'G\u00f8r printables til produkter i 3 enkle trin. Ingen designf\u00e6rdigheder p\u00e5kr\u00e6vet.',
    ctaButton: 'Pr\u00f8v gratis med vandm\u00e6rke',
  },
  sv: {
    badge: 'Snabbstart',
    title: 'Skapa, Exportera & S\u00e4lj',
    subtitle: 'G\u00f6r utskrifter till produkter i 3 enkla steg. Inga designkunskaper kr\u00e4vs.',
    ctaButton: 'Prova gratis med vattenst\u00e4mpel',
  },
  no: {
    badge: 'Hurtigstart',
    title: 'Lag, Eksporter og Selg',
    subtitle: 'Gj\u00f8r utskrifter til produkter i 3 enkle trinn. Ingen designkunnskaper n\u00f8dvendig.',
    ctaButton: 'Pr\u00f8v gratis med vannmerke',
  },
  fi: {
    badge: 'Pikaopas',
    title: 'Luo, Vie ja Myy',
    subtitle: 'Muuta tulostettavat tuotteiksi kolmessa yksinkertaisessa vaiheessa. Suunnittelutaitoja ei tarvita.',
    ctaButton: 'Kokeile ilmaiseksi vesileimalla',
  },
};`;

content = content.substring(0, startIdx) + newLocaleContent + content.substring(endIdx);

// Now replace the steps array (reduce from 4 to 3 steps)
const stepsStart = "const steps: Step[] = [";
const stepsStartIdx = content.indexOf(stepsStart);
// Find closing ];
let sBraceCount = 0;
let sEndIdx = stepsStartIdx;
for (let i = stepsStartIdx; i < content.length; i++) {
  if (content[i] === '[') sBraceCount++;
  if (content[i] === ']') {
    sBraceCount--;
    if (sBraceCount === 0) {
      sEndIdx = i + 1;
      break;
    }
  }
}
if (content[sEndIdx] === ';') sEndIdx++;

const newSteps = `const steps: Step[] = [
  {
    number: 1,
    icon: '\ud83c\udfaf',
    titleEn: 'Choose & Create',
    titleDe: 'Ausw\u00e4hlen & Erstellen',
    titleFr: 'Choisir & Cr\u00e9er',
    titleEs: 'Elegir y Crear',
    titleIt: 'Scegli e Crea',
    titlePt: 'Escolher e Criar',
    titleNl: 'Kies & Maak',
    titleDa: 'V\u00e6lg & Opret',
    titleSv: 'V\u00e4lj & Skapa',
    titleNo: 'Velg & Lag',
    titleFi: 'Valitse & Luo',
    descriptionEn: 'Pick from 33 professional generators. Choose a theme from 3,000+ images, customize settings, and generate your printable in under 3 minutes.',
    descriptionDe: 'W\u00e4hlen Sie aus 33 professionellen Generatoren. W\u00e4hlen Sie ein Thema aus \u00fcber 3.000 Bildern, passen Sie die Einstellungen an und generieren Sie Ihre Druckvorlage in unter 3 Minuten.',
    descriptionFr: 'Choisissez parmi 33 g\u00e9n\u00e9rateurs professionnels. S\u00e9lectionnez un th\u00e8me parmi plus de 3 000 images, personnalisez et g\u00e9n\u00e9rez votre imprimable en moins de 3 minutes.',
    descriptionEs: 'Elige entre 33 generadores profesionales. Selecciona un tema de m\u00e1s de 3.000 im\u00e1genes, personaliza y genera tu imprimible en menos de 3 minutos.',
    descriptionIt: 'Scegli tra 33 generatori professionali. Seleziona un tema da oltre 3.000 immagini, personalizza e genera il tuo stampabile in meno di 3 minuti.',
    descriptionPt: 'Escolha entre 33 geradores profissionais. Selecione um tema de mais de 3.000 imagens, personalize e gere o seu imprim\u00edvel em menos de 3 minutos.',
    descriptionNl: 'Kies uit 33 professionele generatoren. Selecteer een thema uit 3.000+ afbeeldingen, pas instellingen aan en genereer je printable in minder dan 3 minuten.',
    descriptionDa: 'V\u00e6lg mellem 33 professionelle generatorer. V\u00e6lg et tema fra over 3.000 billeder, tilpas indstillinger og generer din printable p\u00e5 under 3 minutter.',
    descriptionSv: 'V\u00e4lj bland 33 professionella generatorer. V\u00e4lj ett tema fr\u00e5n \u00f6ver 3 000 bilder, anpassa inst\u00e4llningar och generera din utskrift p\u00e5 under 3 minuter.',
    descriptionNo: 'Velg blant 33 profesjonelle generatorer. Velg et tema fra over 3 000 bilder, tilpass innstillinger og generer din utskrift p\u00e5 under 3 minutter.',
    descriptionFi: 'Valitse 33 ammattimaisesta generaattorista. Valitse teema yli 3 000 kuvasta, s\u00e4\u00e4d\u00e4 asetukset ja luo tulostettavasi alle 3 minuutissa.',
  },
  {
    number: 2,
    icon: '\ud83d\udce5',
    titleEn: 'Export High-Quality PDF',
    titleDe: 'Hochwertiges PDF exportieren',
    titleFr: 'Exporter un PDF haute qualit\u00e9',
    titleEs: 'Exportar PDF de alta calidad',
    titleIt: 'Esporta PDF di alta qualit\u00e0',
    titlePt: 'Exportar PDF de alta qualidade',
    titleNl: 'Exporteer hoogwaardige PDF',
    titleDa: 'Eksporter PDF i h\u00f8j kvalitet',
    titleSv: 'Exportera h\u00f6gkvalitets-PDF',
    titleNo: 'Eksporter h\u00f8ykvalitets-PDF',
    titleFi: 'Vie korkealaatuinen PDF',
    descriptionEn: 'Download 300 DPI print-ready PDFs with answer keys included. Every printable is commercially licensed \u2014 ready to sell as-is.',
    descriptionDe: 'Laden Sie druckfertige 300-DPI-PDFs mit L\u00f6sungsbl\u00e4ttern herunter. Jede Druckvorlage ist kommerziell lizenziert \u2014 sofort verkaufsbereit.',
    descriptionFr: 'T\u00e9l\u00e9chargez des PDF 300 DPI pr\u00eats \u00e0 imprimer avec corrig\u00e9s inclus. Chaque imprimable est sous licence commerciale \u2014 pr\u00eat \u00e0 vendre.',
    descriptionEs: 'Descarga PDFs listos para imprimir a 300 DPI con respuestas incluidas. Cada imprimible tiene licencia comercial \u2014 listo para vender.',
    descriptionIt: 'Scarica PDF pronti per la stampa a 300 DPI con soluzioni incluse. Ogni stampabile \u00e8 con licenza commerciale \u2014 pronto per la vendita.',
    descriptionPt: 'Baixe PDFs prontos para impress\u00e3o a 300 DPI com gabaritos inclu\u00eddos. Cada imprim\u00edvel tem licen\u00e7a comercial \u2014 pronto para vender.',
    descriptionNl: 'Download drukklare 300 DPI PDFs met antwoordbladen. Elke printable is commercieel gelicenseerd \u2014 klaar om te verkopen.',
    descriptionDa: 'Download printklare 300 DPI PDFs med facitlister inkluderet. Hver printable er kommercielt licenseret \u2014 klar til salg.',
    descriptionSv: 'Ladda ner utskriftsklara 300 DPI PDFs med facit inkluderat. Varje utskrift \u00e4r kommersiellt licensierad \u2014 redo att s\u00e4lja.',
    descriptionNo: 'Last ned utskriftsklare 300 DPI PDFs med fasit inkludert. Hver utskrift er kommersielt lisensiert \u2014 klar for salg.',
    descriptionFi: 'Lataa tulostusvalmiita 300 DPI PDF-tiedostoja vastauslomakkeineen. Jokainen tulostettava on kaupallisesti lisensoitu \u2014 valmis myyt\u00e4v\u00e4ksi.',
  },
  {
    number: 3,
    icon: '\ud83d\udcb0',
    titleEn: 'Sell on Etsy, KDP & More',
    titleDe: 'Auf Etsy, KDP & mehr verkaufen',
    titleFr: 'Vendre sur Etsy, KDP et plus',
    titleEs: 'Vender en Etsy, KDP y m\u00e1s',
    titleIt: 'Vendi su Etsy, KDP e altro',
    titlePt: 'Vender no Etsy, KDP e mais',
    titleNl: 'Verkoop op Etsy, KDP & meer',
    titleDa: 'S\u00e6lg p\u00e5 Etsy, KDP og mere',
    titleSv: 'S\u00e4lj p\u00e5 Etsy, KDP och mer',
    titleNo: 'Selg p\u00e5 Etsy, KDP og mer',
    titleFi: 'Myy Etsyss\u00e4, KDP:ss\u00e4 ja muualla',
    descriptionEn: 'List your printables on Etsy, Amazon KDP, Teachers Pay Teachers, or your own website. Commercial license included \u2014 no attribution required.',
    descriptionDe: 'Listen Sie Ihre Druckvorlagen auf Etsy, Amazon KDP, Teachers Pay Teachers oder Ihrer eigenen Website. Kommerzielle Lizenz inklusive \u2014 keine Quellenangabe n\u00f6tig.',
    descriptionFr: 'Mettez vos imprimables en vente sur Etsy, Amazon KDP, Teachers Pay Teachers ou votre propre site. Licence commerciale incluse \u2014 aucune attribution requise.',
    descriptionEs: 'Publica tus imprimibles en Etsy, Amazon KDP, Teachers Pay Teachers o tu propio sitio web. Licencia comercial incluida \u2014 sin necesidad de atribuci\u00f3n.',
    descriptionIt: 'Metti in vendita i tuoi stampabili su Etsy, Amazon KDP, Teachers Pay Teachers o il tuo sito web. Licenza commerciale inclusa \u2014 nessuna attribuzione richiesta.',
    descriptionPt: 'Publique seus imprim\u00edveis no Etsy, Amazon KDP, Teachers Pay Teachers ou seu pr\u00f3prio site. Licen\u00e7a comercial inclusa \u2014 sem necessidade de atribui\u00e7\u00e3o.',
    descriptionNl: 'Zet je printables te koop op Etsy, Amazon KDP, Teachers Pay Teachers of je eigen website. Commerci\u00eble licentie inbegrepen \u2014 geen bronvermelding vereist.',
    descriptionDa: 'S\u00e6t dine printables til salg p\u00e5 Etsy, Amazon KDP, Teachers Pay Teachers eller din egen hjemmeside. Kommerciel licens inkluderet \u2014 ingen kildeangivelse p\u00e5kr\u00e6vet.',
    descriptionSv: 'L\u00e4gg upp dina utskrifter till f\u00f6rs\u00e4ljning p\u00e5 Etsy, Amazon KDP, Teachers Pay Teachers eller din egen webbplats. Kommersiell licens ing\u00e5r \u2014 ingen k\u00e4llh\u00e4nvisning kr\u00e4vs.',
    descriptionNo: 'Legg ut utskriftene dine for salg p\u00e5 Etsy, Amazon KDP, Teachers Pay Teachers eller din egen nettside. Kommersiell lisens inkludert \u2014 ingen kildeangivelse n\u00f8dvendig.',
    descriptionFi: 'Listaa tulostettavasi myyntiin Etsyss\u00e4, Amazon KDP:ss\u00e4, Teachers Pay Teachersissa tai omalla verkkosivullasi. Kaupallinen lisenssi sis\u00e4ltyy \u2014 l\u00e4hdemainintaa ei vaadita.',
  },
];`;

content = content.substring(0, stepsStartIdx) + newSteps + content.substring(sEndIdx);

// Update CTA link from /auth/signup to /apps
content = content.replace(
  'href={`/${locale}/auth/signup`}',
  'href={`/${locale}/apps`}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated HowItWorks.tsx for entrepreneur audience (3 steps: Create, Export, Sell)');
