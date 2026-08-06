const fs = require('fs');
const filePath = 'frontend/components/homepage/HomepageHero.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the localeContent object
const oldStart = "const localeContent: Record<string, {";
const startIdx = content.indexOf(oldStart);

// Find the closing }; of localeContent
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
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustLanguages: string;
  trustImages: string;
  trustLicense: string;
  answerKey: string;
  previewTitles: string[];
}> = {
  en: {
    badge: '33 Professional Printable Generators',
    titleLine1: 'Create ',
    titleHighlight: 'Professional Printables',
    titleLine2: 'for Your Business',
    subtitle: 'Generate word searches, math worksheets, coloring pages, and puzzles. Try free with watermark. Sell on Etsy, Amazon KDP, or your own shop. 11 languages, 3,000+ images.',
    ctaPrimary: 'Try Free with Watermark',
    ctaSecondary: 'See All 33 Generators',
    trustLanguages: '11 Languages',
    trustImages: '3000+ Images',
    trustLicense: 'Commercial License',
    answerKey: 'Answer Key',
    previewTitles: ['Addition', 'Word Search'],
  },
  de: {
    badge: '33 professionelle Druckvorlagen-Generatoren',
    titleLine1: 'Erstellen Sie ',
    titleHighlight: 'professionelle Druckvorlagen',
    titleLine2: 'f\u00fcr Ihr Business',
    subtitle: 'Generieren Sie Wortsuchr\u00e4tsel, Mathe-Arbeitsbl\u00e4tter, Ausmalbilder und Puzzles. Kostenlos testen mit Wasserzeichen. Verkaufen Sie auf Etsy, Amazon KDP oder in Ihrem eigenen Shop.',
    ctaPrimary: 'Gratis mit Wasserzeichen testen',
    ctaSecondary: 'Alle 33 Generatoren entdecken',
    trustLanguages: '11 Sprachen',
    trustImages: '3000+ Bilder',
    trustLicense: 'Kommerzielle Nutzung',
    answerKey: 'L\u00f6sungsschl\u00fcssel',
    previewTitles: ['Addition', 'Wortsuche'],
  },
  fr: {
    badge: '33 g\u00e9n\u00e9rateurs d\\'imprimables professionnels',
    titleLine1: 'Cr\u00e9ez des ',
    titleHighlight: 'imprimables professionnels',
    titleLine2: 'pour votre business',
    subtitle: 'G\u00e9n\u00e9rez des mots m\u00eal\u00e9s, des fiches de maths, des coloriages et des puzzles. Essai gratuit avec filigrane. Vendez sur Etsy, Amazon KDP ou votre propre boutique.',
    ctaPrimary: 'Essai gratuit avec filigrane',
    ctaSecondary: 'Explorer les 33 g\u00e9n\u00e9rateurs',
    trustLanguages: '11 langues',
    trustImages: '3000+ images',
    trustLicense: 'Usage commercial inclus',
    answerKey: 'Corrig\u00e9 inclus',
    previewTitles: ['Addition', 'Mots m\u00eal\u00e9s'],
  },
  es: {
    badge: '33 generadores de imprimibles profesionales',
    titleLine1: 'Crea ',
    titleHighlight: 'imprimibles profesionales',
    titleLine2: 'para tu negocio',
    subtitle: 'Genera sopas de letras, fichas de matem\u00e1ticas, p\u00e1ginas para colorear y puzzles. Prueba gratis con marca de agua. Vende en Etsy, Amazon KDP o tu propia tienda.',
    ctaPrimary: 'Probar gratis con marca de agua',
    ctaSecondary: 'Ver los 33 generadores',
    trustLanguages: '11 idiomas',
    trustImages: '3000+ im\u00e1genes',
    trustLicense: 'Uso comercial incluido',
    answerKey: 'Con respuestas',
    previewTitles: ['Sumas', 'Sopa de letras'],
  },
  it: {
    badge: '33 generatori di stampabili professionali',
    titleLine1: 'Crea ',
    titleHighlight: 'stampabili professionali',
    titleLine2: 'per il tuo business',
    subtitle: 'Genera crucipuzzle, schede di matematica, pagine da colorare e puzzle. Prova gratis con filigrana. Vendi su Etsy, Amazon KDP o il tuo negozio.',
    ctaPrimary: 'Prova gratis con filigrana',
    ctaSecondary: 'Esplora tutti i 33 generatori',
    trustLanguages: '11 lingue',
    trustImages: 'Oltre 3000 immagini',
    trustLicense: 'Licenza commerciale inclusa',
    answerKey: 'Soluzioni incluse',
    previewTitles: ['Addizioni', 'Cerca parole'],
  },
  pt: {
    badge: '33 geradores de imprim\u00edveis profissionais',
    titleLine1: 'Crie ',
    titleHighlight: 'imprim\u00edveis profissionais',
    titleLine2: 'para o seu neg\u00f3cio',
    subtitle: 'Gere ca\u00e7a-palavras, fichas de matem\u00e1tica, p\u00e1ginas para colorir e puzzles. Teste gr\u00e1tis com marca d\\'agua. Venda no Etsy, Amazon KDP ou na sua pr\u00f3pria loja.',
    ctaPrimary: 'Testar gr\u00e1tis com marca d\\'agua',
    ctaSecondary: 'Explorar todos os 33 geradores',
    trustLanguages: '11 idiomas',
    trustImages: 'Mais de 3000 imagens',
    trustLicense: 'Licen\u00e7a comercial inclusa',
    answerKey: 'Gabarito incluso',
    previewTitles: ['Adi\u00e7\u00e3o', 'Ca\u00e7a-palavras'],
  },
  nl: {
    badge: '33 professionele printbare generatoren',
    titleLine1: 'Maak ',
    titleHighlight: 'professionele printables',
    titleLine2: 'voor je business',
    subtitle: 'Genereer woordzoekers, rekenwerkbladen, kleurplaten en puzzels. Probeer gratis met watermerk. Verkoop op Etsy, Amazon KDP of je eigen winkel.',
    ctaPrimary: 'Gratis proberen met watermerk',
    ctaSecondary: 'Ontdek alle 33 generatoren',
    trustLanguages: '11 talen',
    trustImages: '3000+ afbeeldingen',
    trustLicense: 'Commerci\u00eble licentie',
    answerKey: 'Antwoordblad',
    previewTitles: ['Optellen', 'Woordzoeker'],
  },
  da: {
    badge: '33 professionelle printbare generatorer',
    titleLine1: 'Skab ',
    titleHighlight: 'professionelle printables',
    titleLine2: 'til din virksomhed',
    subtitle: 'Generer ords\u00f8gninger, regneopgaver, tegnesider og puslespil. Pr\u00f8v gratis med vandm\u00e6rke. S\u00e6lg p\u00e5 Etsy, Amazon KDP eller din egen butik.',
    ctaPrimary: 'Pr\u00f8v gratis med vandm\u00e6rke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustLanguages: '11 sprog',
    trustImages: 'Over 3000 billeder',
    trustLicense: 'Kommerciel licens',
    answerKey: 'Facitliste',
    previewTitles: ['Addition', 'Find ord'],
  },
  sv: {
    badge: '33 professionella utskriftsgeneratorer',
    titleLine1: 'Skapa ',
    titleHighlight: 'professionella utskrifter',
    titleLine2: 'f\u00f6r ditt f\u00f6retag',
    subtitle: 'Generera ords\u00f6kningar, mattearbetsblad, m\u00e5larbilder och pussel. Prova gratis med vattenst\u00e4mpel. S\u00e4lj p\u00e5 Etsy, Amazon KDP eller din egen butik.',
    ctaPrimary: 'Prova gratis med vattenst\u00e4mpel',
    ctaSecondary: 'Se alla 33 generatorer',
    trustLanguages: '11 spr\u00e5k',
    trustImages: '\u00d6ver 3000 bilder',
    trustLicense: 'Kommersiell licens',
    answerKey: 'Facit',
    previewTitles: ['Addition', 'Ords\u00f6k'],
  },
  no: {
    badge: '33 profesjonelle utskriftsgeneratorer',
    titleLine1: 'Lag ',
    titleHighlight: 'profesjonelle utskrifter',
    titleLine2: 'for din virksomhet',
    subtitle: 'Generer ords\u00f8k, matteoppgaver, fargeleggingssider og puslespill. Pr\u00f8v gratis med vannmerke. Selg p\u00e5 Etsy, Amazon KDP eller din egen butikk.',
    ctaPrimary: 'Pr\u00f8v gratis med vannmerke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustLanguages: '11 spr\u00e5k',
    trustImages: 'Over 3000 bilder',
    trustLicense: 'Kommersiell lisens',
    answerKey: 'Fasit',
    previewTitles: ['Addisjon', 'Finn ord'],
  },
  fi: {
    badge: '33 ammattimaista tulostusgeneraattoria',
    titleLine1: 'Luo ',
    titleHighlight: 'ammattimaisia tulostettavia',
    titleLine2: 'yrityksellesi',
    subtitle: 'Generoi sananhakuja, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia ja palapelit. Kokeile ilmaiseksi vesileimalla. Myy Etsyss\u00e4, Amazon KDP:ss\u00e4 tai omassa kaupassa.',
    ctaPrimary: 'Kokeile ilmaiseksi vesileimalla',
    ctaSecondary: 'Tutustu kaikkiin 33 generaattoriin',
    trustLanguages: '11 kielt\u00e4',
    trustImages: 'Yli 3000 kuvaa',
    trustLicense: 'Kaupallinen lisenssi',
    answerKey: 'Vastaukset',
    previewTitles: ['Yhteenlasku', 'Sananetsint\u00e4'],
  },
};`;

content = content.substring(0, startIdx) + newLocaleContent + content.substring(endIdx);

// Update the primary CTA to point to apps page instead of samples gallery
content = content.replace(
  'href="#samples-gallery"',
  'href={`/${locale}/apps`}'
);
content = content.replace(
  "onClick={() => { scrollToSamples(); }}",
  ''
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated HomepageHero.tsx for entrepreneur audience');
