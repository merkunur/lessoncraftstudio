const fs = require('fs');
const filePath = 'frontend/components/homepage/AppCategories.tsx';
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
  learnMore: string;
  viewAllGenerators: string;
}> = {
  en: {
    badge: '33 Professional Printable Generators',
    title: 'Browse by Category',
    subtitle: 'From math worksheets to creative activities, find the perfect printable generator for your business.',
    learnMore: 'Try free',
    viewAllGenerators: 'View All 33 Generators',
  },
  de: {
    badge: '33 professionelle Druckvorlagen-Generatoren',
    title: 'Nach Kategorie durchsuchen',
    subtitle: 'Von Mathe-Arbeitsbl\u00e4ttern bis zu kreativen Aktivit\u00e4ten \u2013 finden Sie den perfekten Generator f\u00fcr Ihr Business.',
    learnMore: 'Gratis testen',
    viewAllGenerators: 'Alle 33 Generatoren entdecken',
  },
  fr: {
    badge: '33 g\u00e9n\u00e9rateurs d\\'imprimables professionnels',
    title: 'Parcourir par cat\u00e9gorie',
    subtitle: 'Des exercices de maths aux activit\u00e9s cr\u00e9atives, trouvez le g\u00e9n\u00e9rateur id\u00e9al pour votre business.',
    learnMore: 'Essai gratuit',
    viewAllGenerators: 'Explorer les 33 g\u00e9n\u00e9rateurs',
  },
  es: {
    badge: '33 generadores de imprimibles profesionales',
    title: 'Explorar por categor\u00eda',
    subtitle: 'Desde ejercicios de matem\u00e1ticas hasta actividades creativas, encuentra el generador perfecto para tu negocio.',
    learnMore: 'Probar gratis',
    viewAllGenerators: 'Explorar los 33 generadores',
  },
  it: {
    badge: '33 generatori di stampabili professionali',
    title: 'Esplora per categoria',
    subtitle: 'Dagli esercizi di matematica alle attivit\u00e0 creative, trova il generatore perfetto per il tuo business.',
    learnMore: 'Prova gratis',
    viewAllGenerators: 'Esplora tutti i 33 generatori',
  },
  pt: {
    badge: '33 geradores de imprim\u00edveis profissionais',
    title: 'Explore por categoria',
    subtitle: 'De exerc\u00edcios de matem\u00e1tica a atividades criativas, encontre o gerador perfeito para o seu neg\u00f3cio.',
    learnMore: 'Teste gr\u00e1tis',
    viewAllGenerators: 'Ver todos os 33 geradores',
  },
  nl: {
    badge: '33 professionele printbare generatoren',
    title: 'Ontdek per categorie',
    subtitle: 'Van rekenoefeningen tot creatieve activiteiten, vind de perfecte generator voor jouw business.',
    learnMore: 'Gratis proberen',
    viewAllGenerators: 'Bekijk alle 33 generatoren',
  },
  da: {
    badge: '33 professionelle printbare generatorer',
    title: 'Udforsk efter kategori',
    subtitle: 'Fra regneopgaver til kreative aktiviteter \u2013 find den perfekte generator til din virksomhed.',
    learnMore: 'Pr\u00f8v gratis',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  sv: {
    badge: '33 professionella utskriftsgeneratorer',
    title: 'Utforska efter kategori',
    subtitle: 'Fr\u00e5n matematik\u00f6vningar till kreativa aktiviteter \u2013 hitta den perfekta generatorn f\u00f6r ditt f\u00f6retag.',
    learnMore: 'Prova gratis',
    viewAllGenerators: 'Se alla 33 generatorer',
  },
  no: {
    badge: '33 profesjonelle utskriftsgeneratorer',
    title: 'Utforsk etter kategori',
    subtitle: 'Fra matteoppgaver til kreative aktiviteter \u2013 finn den perfekte generatoren for din virksomhet.',
    learnMore: 'Pr\u00f8v gratis',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  fi: {
    badge: '33 ammattimaista tulostusgeneraattoria',
    title: 'Selaa kategorioittain',
    subtitle: 'Matematiikan teht\u00e4vist\u00e4 luoviin aktiviteetteihin \u2013 l\u00f6yd\u00e4 t\u00e4ydellinen generaattori yrityksellesi.',
    learnMore: 'Kokeile ilmaiseksi',
    viewAllGenerators: 'Tutustu kaikkiin 33 generaattoriin',
  },
};`;

content = content.substring(0, startIdx) + newLocaleContent + content.substring(endIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated AppCategories.tsx for entrepreneur audience');
