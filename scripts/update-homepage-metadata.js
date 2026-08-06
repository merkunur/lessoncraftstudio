const fs = require('fs');
const filePath = 'frontend/app/[locale]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the old metadata object and replace it
const oldStart = "const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {";
const startIdx = content.indexOf(oldStart);
// Find the closing }; of the metadata object (after fi: { ... })
let braceCount = 0;
let endIdx = startIdx;
for (let i = startIdx; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1; // include the closing }
      break;
    }
  }
}
// Also include the semicolon
if (content[endIdx] === ';') endIdx++;

const newMetadata = `const homepageMetadata: Record<string, { title: string; description: string; keywords: string; ogAlt: string }> = {
  en: {
    title: 'Professional Printable Generators | Create & Sell on Etsy & KDP',
    description: 'Create professional printables with 33 generators. Word searches, math worksheets, coloring pages & puzzles. Try free with watermark. Sell on Etsy, Amazon KDP.',
    keywords: 'printable generator, Etsy printables, KDP worksheets, sell printables online, printable business, word search maker, coloring page creator, math worksheet generator, side hustle printables, commercial license printables',
    ogAlt: 'LessonCraftStudio - Professional Printable Generators'
  },
  de: {
    title: 'Professionelle Druckvorlagen-Generatoren | Erstellen & Verkaufen',
    description: 'Erstellen Sie professionelle Druckvorlagen mit 33 Generatoren. Kostenlos testen mit Wasserzeichen. Verkaufen Sie auf Etsy, Amazon KDP und mehr.',
    keywords: 'Druckvorlagen erstellen, Etsy Druckvorlagen, KDP Arbeitsbl\u00e4tter, Druckvorlagen verkaufen, Printables Business, Wortsuche Generator, professionelle Druckvorlagen',
    ogAlt: 'LessonCraftStudio - Professionelle Druckvorlagen-Generatoren'
  },
  fr: {
    title: "G\u00e9n\u00e9rateurs d'Imprimables Professionnels | Cr\u00e9er & Vendre",
    description: "Cr\u00e9ez des imprimables professionnels avec 33 g\u00e9n\u00e9rateurs. Essai gratuit avec filigrane. Vendez sur Etsy, Amazon KDP et plus.",
    keywords: "g\u00e9n\u00e9rateur imprimables, Etsy imprimables, KDP fiches, vendre imprimables en ligne, business imprimables, mots m\u00eal\u00e9s g\u00e9n\u00e9rateur, imprimables professionnels",
    ogAlt: "LessonCraftStudio - G\u00e9n\u00e9rateurs d'imprimables professionnels"
  },
  es: {
    title: 'Generadores de Imprimibles Profesionales | Crear y Vender',
    description: 'Crea imprimibles profesionales con 33 generadores. Prueba gratis con marca de agua. Vende en Etsy, Amazon KDP y m\u00e1s.',
    keywords: 'generador imprimibles, Etsy imprimibles, KDP fichas, vender imprimibles online, negocio imprimibles, sopa de letras generador, imprimibles profesionales',
    ogAlt: 'LessonCraftStudio - Generadores de imprimibles profesionales'
  },
  pt: {
    title: 'Geradores de Imprim\u00edveis Profissionais | Criar e Vender',
    description: "Crie imprim\u00edveis profissionais com 33 geradores. Teste gr\u00e1tis com marca d'agua. Venda no Etsy, Amazon KDP e mais.",
    keywords: 'gerador imprim\u00edveis, Etsy imprim\u00edveis, KDP atividades, vender imprim\u00edveis online, neg\u00f3cio imprim\u00edveis, imprim\u00edveis profissionais',
    ogAlt: 'LessonCraftStudio - Geradores de imprim\u00edveis profissionais'
  },
  it: {
    title: 'Generatori di Stampabili Professionali | Crea e Vendi',
    description: 'Crea stampabili professionali con 33 generatori. Prova gratis con filigrana. Vendi su Etsy, Amazon KDP e altro.',
    keywords: 'generatore stampabili, Etsy stampabili, KDP schede, vendere stampabili online, business stampabili, stampabili professionali',
    ogAlt: 'LessonCraftStudio - Generatori di stampabili professionali'
  },
  nl: {
    title: 'Professionele Printbare Generatoren | Maak & Verkoop',
    description: 'Maak professionele printbare producten met 33 generatoren. Probeer gratis met watermerk. Verkoop op Etsy, Amazon KDP en meer.',
    keywords: 'printbare generator, Etsy printables, KDP werkbladen, printables verkopen, printables business, professionele printables',
    ogAlt: 'LessonCraftStudio - Professionele printbare generatoren'
  },
  sv: {
    title: 'Professionella Utskriftsgeneratorer | Skapa & S\u00e4lj',
    description: 'Skapa professionella utskrifter med 33 generatorer. Prova gratis med vattenst\u00e4mpel. S\u00e4lj p\u00e5 Etsy, Amazon KDP och mer.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP arbetsblad, s\u00e4lja utskrifter online, professionella utskrifter',
    ogAlt: 'LessonCraftStudio - Professionella utskriftsgeneratorer'
  },
  da: {
    title: 'Professionelle Printbare Generatorer | Opret & S\u00e6lg',
    description: 'Opret professionelle printbare produkter med 33 generatorer. Pr\u00f8v gratis med vandm\u00e6rke. S\u00e6lg p\u00e5 Etsy, Amazon KDP og mere.',
    keywords: 'printbar generator, Etsy printables, KDP arbejdsark, s\u00e6lge printables, professionelle printables',
    ogAlt: 'LessonCraftStudio - Professionelle printbare generatorer'
  },
  no: {
    title: 'Profesjonelle Utskriftsgeneratorer | Lag & Selg',
    description: 'Lag profesjonelle utskrifter med 33 generatorer. Pr\u00f8v gratis med vannmerke. Selg p\u00e5 Etsy, Amazon KDP og mer.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP arbeidsark, selge utskrifter, profesjonelle utskrifter',
    ogAlt: 'LessonCraftStudio - Profesjonelle utskriftsgeneratorer'
  },
  fi: {
    title: 'Ammattimaiset Tulostusgeneraattorit | Luo & Myy',
    description: 'Luo ammattimaisia tulostettavia 33 generaattorilla. Kokeile ilmaiseksi vesileimalla. Myy Etsyss\u00e4, Amazon KDP:ss\u00e4 ja muualla.',
    keywords: 'tulostusgeneraattori, Etsy tulostettavat, KDP teht\u00e4v\u00e4t, myy tulostettavia, ammattimaiset tulostettavat',
    ogAlt: 'LessonCraftStudio - Ammattimaiset tulostusgeneraattorit'
  }
};`;

content = content.substring(0, startIdx) + newMetadata + content.substring(endIdx);

// Also update the comment above it
content = content.replace(
  '// Localized SEO metadata with researched keywords for all 11 languages',
  '// Localized SEO metadata for entrepreneur audience (Etsy, KDP, printables business)'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated page.tsx metadata for entrepreneur audience');
