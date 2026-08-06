const fs = require('fs');
const filePath = 'frontend/components/homepage/HomepageCTA.tsx';
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
  titleStart: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustNoCard: string;
  trustFreeGenerators: string;
  trustCancelAnytime: string;
}> = {
  en: {
    badge: 'Start Your Printable Business',
    titleStart: 'Ready to Create ',
    titleHighlight: 'Professional Printables',
    subtitle: 'Try all 33 generators free with watermark. See the full quality before you buy. No account required.',
    ctaPrimary: 'Try Free with Watermark',
    ctaSecondary: 'View All 33 Generators',
    trustNoCard: 'No account required',
    trustFreeGenerators: 'All 33 generators free',
    trustCancelAnytime: 'Commercial license included',
  },
  de: {
    badge: 'Starten Sie Ihr Printable-Business',
    titleStart: 'Bereit, ',
    titleHighlight: 'professionelle Druckvorlagen',
    subtitle: 'Testen Sie alle 33 Generatoren gratis mit Wasserzeichen. Sehen Sie die volle Qualit\u00e4t vor dem Kauf. Kein Konto erforderlich.',
    ctaPrimary: 'Gratis mit Wasserzeichen testen',
    ctaSecondary: 'Alle 33 Generatoren entdecken',
    trustNoCard: 'Kein Konto erforderlich',
    trustFreeGenerators: 'Alle 33 Generatoren gratis',
    trustCancelAnytime: 'Kommerzielle Lizenz inklusive',
  },
  fr: {
    badge: 'Lancez votre business d\\'imprimables',
    titleStart: 'Pr\u00eat \u00e0 cr\u00e9er des ',
    titleHighlight: 'imprimables professionnels',
    subtitle: 'Essayez les 33 g\u00e9n\u00e9rateurs gratuitement avec filigrane. Voyez la qualit\u00e9 compl\u00e8te avant d\\'acheter. Aucun compte requis.',
    ctaPrimary: 'Essai gratuit avec filigrane',
    ctaSecondary: 'Explorer les 33 g\u00e9n\u00e9rateurs',
    trustNoCard: 'Aucun compte requis',
    trustFreeGenerators: '33 g\u00e9n\u00e9rateurs gratuits',
    trustCancelAnytime: 'Licence commerciale incluse',
  },
  es: {
    badge: 'Empieza tu negocio de imprimibles',
    titleStart: '\u00bfListo para crear ',
    titleHighlight: 'imprimibles profesionales',
    subtitle: 'Prueba los 33 generadores gratis con marca de agua. Comprueba la calidad completa antes de comprar. Sin cuenta requerida.',
    ctaPrimary: 'Probar gratis con marca de agua',
    ctaSecondary: 'Explorar los 33 generadores',
    trustNoCard: 'Sin cuenta requerida',
    trustFreeGenerators: '33 generadores gratis',
    trustCancelAnytime: 'Licencia comercial incluida',
  },
  it: {
    badge: 'Avvia il tuo business di stampabili',
    titleStart: 'Pronto a creare ',
    titleHighlight: 'stampabili professionali',
    subtitle: 'Prova tutti i 33 generatori gratis con filigrana. Verifica la qualit\u00e0 completa prima di acquistare. Nessun account richiesto.',
    ctaPrimary: 'Prova gratis con filigrana',
    ctaSecondary: 'Esplora tutti i 33 generatori',
    trustNoCard: 'Nessun account richiesto',
    trustFreeGenerators: '33 generatori gratuiti',
    trustCancelAnytime: 'Licenza commerciale inclusa',
  },
  pt: {
    badge: 'Comece seu neg\u00f3cio de imprim\u00edveis',
    titleStart: 'Pronto para criar ',
    titleHighlight: 'imprim\u00edveis profissionais',
    subtitle: 'Experimente os 33 geradores gr\u00e1tis com marca d\\'agua. Veja a qualidade completa antes de comprar. Sem conta necess\u00e1ria.',
    ctaPrimary: 'Teste gr\u00e1tis com marca d\\'agua',
    ctaSecondary: 'Explorar todos os 33 geradores',
    trustNoCard: 'Sem conta necess\u00e1ria',
    trustFreeGenerators: '33 geradores gr\u00e1tis',
    trustCancelAnytime: 'Licen\u00e7a comercial inclusa',
  },
  nl: {
    badge: 'Start je printable business',
    titleStart: 'Klaar om ',
    titleHighlight: 'professionele printables',
    subtitle: 'Probeer alle 33 generatoren gratis met watermerk. Bekijk de volledige kwaliteit voor je koopt. Geen account nodig.',
    ctaPrimary: 'Gratis proberen met watermerk',
    ctaSecondary: 'Bekijk alle 33 generatoren',
    trustNoCard: 'Geen account nodig',
    trustFreeGenerators: 'Alle 33 generatoren gratis',
    trustCancelAnytime: 'Commerci\u00eble licentie inbegrepen',
  },
  da: {
    badge: 'Start din printable-virksomhed',
    titleStart: 'Klar til at lave ',
    titleHighlight: 'professionelle printables',
    subtitle: 'Pr\u00f8v alle 33 generatorer gratis med vandm\u00e6rke. Se den fulde kvalitet f\u00f8r du k\u00f8ber. Ingen konto p\u00e5kr\u00e6vet.',
    ctaPrimary: 'Pr\u00f8v gratis med vandm\u00e6rke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustNoCard: 'Ingen konto p\u00e5kr\u00e6vet',
    trustFreeGenerators: 'Alle 33 generatorer gratis',
    trustCancelAnytime: 'Kommerciel licens inkluderet',
  },
  sv: {
    badge: 'Starta ditt utskriftsf\u00f6retag',
    titleStart: 'Redo att skapa ',
    titleHighlight: 'professionella utskrifter',
    subtitle: 'Testa alla 33 generatorer gratis med vattenst\u00e4mpel. Se den fulla kvaliteten innan du k\u00f6per. Inget konto kr\u00e4vs.',
    ctaPrimary: 'Prova gratis med vattenst\u00e4mpel',
    ctaSecondary: 'Se alla 33 generatorer',
    trustNoCard: 'Inget konto kr\u00e4vs',
    trustFreeGenerators: 'Alla 33 generatorer gratis',
    trustCancelAnytime: 'Kommersiell licens ing\u00e5r',
  },
  no: {
    badge: 'Start din utskriftsvirksomhet',
    titleStart: 'Klar til \u00e5 lage ',
    titleHighlight: 'profesjonelle utskrifter',
    subtitle: 'Pr\u00f8v alle 33 generatorer gratis med vannmerke. Se den fulle kvaliteten f\u00f8r du kj\u00f8per. Ingen konto n\u00f8dvendig.',
    ctaPrimary: 'Pr\u00f8v gratis med vannmerke',
    ctaSecondary: 'Se alle 33 generatorer',
    trustNoCard: 'Ingen konto n\u00f8dvendig',
    trustFreeGenerators: 'Alle 33 generatorer gratis',
    trustCancelAnytime: 'Kommersiell lisens inkludert',
  },
  fi: {
    badge: 'Aloita tulostettavien liiketoiminta',
    titleStart: 'Valmis luomaan ',
    titleHighlight: 'ammattimaisia tulostettavia',
    subtitle: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. N\u00e4e t\u00e4ysi laatu ennen ostamista. Ei tili\u00e4 tarvita.',
    ctaPrimary: 'Kokeile ilmaiseksi vesileimalla',
    ctaSecondary: 'Tutustu kaikkiin 33 generaattoriin',
    trustNoCard: 'Ei tili\u00e4 tarvita',
    trustFreeGenerators: 'Kaikki 33 generaattoria ilmaiseksi',
    trustCancelAnytime: 'Kaupallinen lisenssi sis\u00e4ltyy',
  },
};`;

content = content.substring(0, startIdx) + newLocaleContent + content.substring(endIdx);

// Update primary CTA link from /auth/signup to /apps
content = content.replace(
  "href={`/${locale}/auth/signup`}",
  "href={`/${locale}/apps`}"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated HomepageCTA.tsx for entrepreneur audience');
