const fs = require('fs');
const filePath = 'frontend/components/homepage/HomepageFeatures.tsx';
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
  keyFeature: string;
  noFees: string;
  unlimitedDownloads: string;
  autoAnswerKeys: string;
}> = {
  en: {
    badge: 'Professional Tools',
    title: 'Everything You Need to Sell',
    subtitle: 'Professional tools to create and sell printables. Generate products that look like they took hours, in just minutes.',
    keyFeature: '\u2b50 Key Feature',
    noFees: 'No per-printable fees',
    unlimitedDownloads: 'Unlimited downloads',
    autoAnswerKeys: 'Auto-generated answer keys',
  },
  de: {
    badge: 'Professionelle Werkzeuge',
    title: 'Alles, was Sie zum Verkaufen brauchen',
    subtitle: 'Professionelle Werkzeuge zum Erstellen und Verkaufen von Druckvorlagen. Generieren Sie Produkte in wenigen Minuten, die aussehen, als h\u00e4tten Sie Stunden investiert.',
    keyFeature: '\u2b50 Highlight',
    noFees: 'Keine Kosten pro Druckvorlage',
    unlimitedDownloads: 'Unbegrenzte Downloads',
    autoAnswerKeys: 'Automatische L\u00f6sungsbl\u00e4tter',
  },
  fr: {
    badge: 'Outils professionnels',
    title: 'Tout pour cr\u00e9er et vendre',
    subtitle: 'Des outils professionnels pour cr\u00e9er et vendre des imprimables. G\u00e9n\u00e9rez des produits dignes d\\'un graphiste en quelques minutes.',
    keyFeature: '\u2b50 Essentiel',
    noFees: 'Aucun co\u00fbt par imprimable',
    unlimitedDownloads: 'T\u00e9l\u00e9chargements illimit\u00e9s',
    autoAnswerKeys: 'Corrig\u00e9s g\u00e9n\u00e9r\u00e9s automatiquement',
  },
  es: {
    badge: 'Herramientas profesionales',
    title: 'Todo lo que necesitas para vender',
    subtitle: 'Herramientas profesionales para crear y vender imprimibles. Crea productos que parecen de dise\u00f1ador en solo minutos.',
    keyFeature: '\u2b50 Funci\u00f3n destacada',
    noFees: 'Sin costo por imprimible',
    unlimitedDownloads: 'Descargas ilimitadas',
    autoAnswerKeys: 'Respuestas generadas autom\u00e1ticamente',
  },
  it: {
    badge: 'Strumenti professionali',
    title: 'Tutto ci\u00f2 che ti serve per vendere',
    subtitle: 'Strumenti professionali per creare e vendere stampabili. Crea prodotti degni di un grafico in pochi minuti.',
    keyFeature: '\u2b50 Funzione chiave',
    noFees: 'Nessun costo per stampabile',
    unlimitedDownloads: 'Download illimitati',
    autoAnswerKeys: 'Soluzioni generate automaticamente',
  },
  pt: {
    badge: 'Ferramentas profissionais',
    title: 'Tudo o que voc\u00ea precisa para vender',
    subtitle: 'Ferramentas profissionais para criar e vender imprim\u00edveis. Crie produtos com apar\u00eancia profissional em poucos minutos.',
    keyFeature: '\u2b50 Recurso principal',
    noFees: 'Sem taxa por imprim\u00edvel',
    unlimitedDownloads: 'Downloads ilimitados',
    autoAnswerKeys: 'Gabaritos gerados automaticamente',
  },
  nl: {
    badge: 'Professionele tools',
    title: 'Alles wat je nodig hebt om te verkopen',
    subtitle: 'Professionele tools om printables te maken en verkopen. Maak producten die eruitzien alsof ze uren werk kostten, in slechts enkele minuten.',
    keyFeature: '\u2b50 Belangrijkste functie',
    noFees: 'Geen kosten per printable',
    unlimitedDownloads: 'Onbeperkt downloaden',
    autoAnswerKeys: 'Automatisch gegenereerde antwoordbladen',
  },
  da: {
    badge: 'Professionelle v\u00e6rkt\u00f8jer',
    title: 'Alt hvad du skal bruge for at s\u00e6lge',
    subtitle: 'Professionelle v\u00e6rkt\u00f8jer til at oprette og s\u00e6lge printables. Lav produkter p\u00e5 f\u00e5 minutter, der ser ud som om de tog timer at lave.',
    keyFeature: '\u2b50 N\u00f8glefunktion',
    noFees: 'Ingen pris pr. printable',
    unlimitedDownloads: 'Ubegr\u00e6nsede downloads',
    autoAnswerKeys: 'Automatisk genererede facitlister',
  },
  sv: {
    badge: 'Professionella verktyg',
    title: 'Allt du beh\u00f6ver f\u00f6r att s\u00e4lja',
    subtitle: 'Professionella verktyg f\u00f6r att skapa och s\u00e4lja utskrifter. Skapa produkter p\u00e5 bara n\u00e5gra minuter som ser ut som om de tog timmar att g\u00f6ra.',
    keyFeature: '\u2b50 Nyckelfunktion',
    noFees: 'Ingen kostnad per utskrift',
    unlimitedDownloads: 'Obegr\u00e4nsade nedladdningar',
    autoAnswerKeys: 'Automatiskt genererade facit',
  },
  no: {
    badge: 'Profesjonelle verkt\u00f8y',
    title: 'Alt du trenger for \u00e5 selge',
    subtitle: 'Profesjonelle verkt\u00f8y for \u00e5 lage og selge utskrifter. Lag produkter som ser ut som om de tok timer, p\u00e5 bare noen minutter.',
    keyFeature: '\u2b50 N\u00f8kkelfunksjon',
    noFees: 'Ingen pris per utskrift',
    unlimitedDownloads: 'Ubegrenset nedlasting',
    autoAnswerKeys: 'Automatisk genererte fasitark',
  },
  fi: {
    badge: 'Ammattimaiset ty\u00f6kalut',
    title: 'Kaikki mit\u00e4 tarvitset myyntiin',
    subtitle: 'Ammattimaiset ty\u00f6kalut tulostettavien luomiseen ja myyntiin. Luo tuotteita, jotka n\u00e4ytt\u00e4v\u00e4t tuntien ty\u00f6lt\u00e4, vain muutamassa minuutissa.',
    keyFeature: '\u2b50 Avainominaisuus',
    noFees: 'Ei tulostettavakohtaisia maksuja',
    unlimitedDownloads: 'Rajattomat lataukset',
    autoAnswerKeys: 'Automaattiset vastauslomakkeet',
  },
};`;

content = content.substring(0, startIdx) + newLocaleContent + content.substring(endIdx);

// Update feature descriptions that reference "classroom" or "educators"
// Feature 1: "for your students" → "for your products"
content = content.replace(
  "Generate complete worksheets instantly. Select your theme, customize settings, and download professional PDFs ready for printing.",
  "Generate complete printables instantly. Select your theme, customize settings, and download professional PDFs ready to sell."
);
content = content.replace(
  "Generieren Sie fertige Arbeitsbl\u00e4tter im Handumdrehen. W\u00e4hlen Sie Ihr Thema, passen Sie die Einstellungen an und laden Sie druckfertige PDFs herunter.",
  "Generieren Sie fertige Druckvorlagen im Handumdrehen. W\u00e4hlen Sie Ihr Thema, passen Sie die Einstellungen an und laden Sie verkaufsfertige PDFs herunter."
);
content = content.replace(
  "G\u00e9n\u00e9rez des fiches compl\u00e8tes instantan\u00e9ment. Choisissez votre th\u00e8me, personnalisez les param\u00e8tres et t\u00e9l\u00e9chargez des PDF pr\u00eats \u00e0 imprimer.",
  "G\u00e9n\u00e9rez des imprimables complets instantan\u00e9ment. Choisissez votre th\u00e8me, personnalisez et t\u00e9l\u00e9chargez des PDF pr\u00eats \u00e0 vendre."
);

// Feature 6: "classroom printing and commercial publishing" → "commercial printing and selling"
content = content.replace(
  "Export high-resolution PDFs perfect for classroom printing and commercial publishing. Answer keys included automatically.",
  "Export high-resolution PDFs perfect for commercial printing and selling on Etsy, Amazon KDP, and more. Answer keys included automatically."
);

// Update German feature 6
content = content.replace(
  "Exportieren Sie hochaufl\u00f6sende PDFs, perfekt f\u00fcr den Klassenraum oder die kommerzielle Ver\u00f6ffentlichung.",
  "Exportieren Sie hochaufl\u00f6sende PDFs, perfekt f\u00fcr den Verkauf auf Etsy, Amazon KDP und mehr."
);

// Update French feature 6
content = content.replace(
  "Exportez des PDF haute r\u00e9solution parfaits pour l'impression en classe ou la publication commerciale.",
  "Exportez des PDF haute r\u00e9solution parfaits pour la vente sur Etsy, Amazon KDP et plus."
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated HomepageFeatures.tsx for entrepreneur audience');
