// Generate remaining 22 German tool content files
// Run: node scripts/gen-de-tool-remaining.js
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'de');

function w(slug, content) {
  fs.writeFileSync(path.join(outDir, slug + '.ts'), content, 'utf8');
  console.log('Created: ' + slug + '.ts');
}

// Common FAQ items
const commercialFaq = `    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) entfernt das Wasserzeichen und gew\u00e4hrt eine kommerzielle Lizenz zum Verkauf erstellter Arbeitsbl\u00e4tter. Das Full Access Pack ($47) enth\u00e4lt alles im Commercial Pack plus die vollst\u00e4ndige Bildbibliothek mit allen 104 Themen f\u00fcr maximale Vielfalt bei einzigartigen Produkten.',
    },`;

const refundFaq = `    {
      question: 'Wie lautet Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst alles mit der kostenlosen Version.',
    },`;

const sellFaq = `    {
      question: 'Kann ich die erstellten Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz zum Verkauf auf Etsy, Amazon KDP, TPT und jeder anderen Plattform. Unbegrenzte Generierung inklusive.',
    },`;

const langFaq = `    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Der Generator unterst\u00fctzt 11 Sprachen: Deutsch, Englisch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Jede Sprache enth\u00e4lt lokalisiertes Vokabular und Oberfl\u00e4chen\u00fcbersetzungen.',
    },`;

const noSignupFaq = `    {
      question: 'Muss ich ein Konto erstellen?',
      answer: 'Nein. Die kostenlose Version funktioniert sofort ohne Anmeldung, E-Mail oder Kreditkarte. Alle Funktionen sind verf\u00fcgbar. Die einzige Einschr\u00e4nkung ist ein Wasserzeichen auf exportierten Dateien.',
    },`;

const answerKeyFaq = `    {
      question: 'Werden L\u00f6sungsschl\u00fcssel generiert?',
      answer: 'Ja. Jedes Arbeitsblatt generiert automatisch einen passenden L\u00f6sungsschl\u00fcssel. Arbeitsblatt und L\u00f6sungsschl\u00fcssel werden als separate Dateien exportiert.',
    },`;

// Literacy link block helper
const literacyLinks = `  internalLinks: [
    { slug: 'kostenloses-alphabet-zug-tool', pageType: 'tool', anchorText: 'Kostenloses Alphabet-Zug-Tool' },
    { slug: 'kostenloses-wortsuchrraetsel-tool', pageType: 'tool', anchorText: 'Kostenloses Wortsuchr\u00e4tsel-Tool' },
    { slug: 'kostenloses-wort-raten-tool', pageType: 'tool', anchorText: 'Kostenloses Wort-Raten-Tool' },
    { slug: 'kostenloses-buchstabensalat-tool', pageType: 'tool', anchorText: 'Kostenloses Buchstabensalat-Tool' },
    { slug: 'kostenloses-schreibuebungs-tool', pageType: 'tool', anchorText: 'Kostenloses Schreib\u00fcbungs-Tool' },
    { slug: 'kostenloses-praepositionen-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Pr\u00e4positionen-Arbeitsbl\u00e4tter-Tool' },`;

const visualLinks = `  internalLinks: [
    { slug: 'kostenloses-gross-und-klein-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Gro\u00df-und-Klein-Arbeitsbl\u00e4tter-Tool' },
    { slug: 'kostenloses-muster-zug-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Zug-Tool' },
    { slug: 'kostenloses-muster-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Muster-Arbeitsbl\u00e4tter-Tool' },
    { slug: 'kostenloses-malen-und-ausmalen-tool', pageType: 'tool', anchorText: 'Kostenloses Malen-und-Ausmalen-Tool' },
    { slug: 'kostenloses-linien-zeichnen-tool', pageType: 'tool', anchorText: 'Kostenloses Linien-Zeichnen-Tool' },
    { slug: 'kostenloses-ausmalbilder-tool', pageType: 'tool', anchorText: 'Kostenloses Ausmalbilder-Tool' },`;

const matchingLinks = `  internalLinks: [
    { slug: 'kostenloses-zuordnungs-arbeitsblaetter-tool', pageType: 'tool', anchorText: 'Kostenloses Zuordnungs-Arbeitsbl\u00e4tter-Tool' },
    { slug: 'kostenloses-gitter-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Gitter-Zuordnung-Tool' },
    { slug: 'kostenloses-schatten-zuordnung-tool', pageType: 'tool', anchorText: 'Kostenloses Schatten-Zuordnung-Tool' },
    { slug: 'kostenloses-bingo-karten-tool', pageType: 'tool', anchorText: 'Kostenloses Bingo-Karten-Tool' },
    { slug: 'kostenloses-bilder-sortieren-tool', pageType: 'tool', anchorText: 'Kostenloses Bilder-Sortieren-Tool' },`;

const puzzleLinks = `  internalLinks: [
    { slug: 'kostenloses-fehlende-teile-tool', pageType: 'tool', anchorText: 'Kostenloses Fehlende-Teile-Tool' },
    { slug: 'kostenloses-was-passt-nicht-tool', pageType: 'tool', anchorText: 'Kostenloses Was-Passt-Nicht-Tool' },
    { slug: 'kostenloses-sudoku-tool', pageType: 'tool', anchorText: 'Kostenloses Sudoku-Tool' },
    { slug: 'kostenloses-bilderpfad-tool', pageType: 'tool', anchorText: 'Kostenloses Bilderpfad-Tool' },`;

const searchLinks = `  internalLinks: [
    { slug: 'kostenloses-finden-und-zaehlen-tool', pageType: 'tool', anchorText: 'Kostenloses Finden-und-Z\u00e4hlen-Tool' },
    { slug: 'kostenloses-suchbild-tool', pageType: 'tool', anchorText: 'Kostenloses Suchbild-Tool' },
    { slug: 'kostenloses-kreuzwortraetsel-tool', pageType: 'tool', anchorText: 'Kostenloses Kreuzwortr\u00e4tsel-Tool' },
    { slug: 'kostenloses-schatzsuche-tool', pageType: 'tool', anchorText: 'Kostenloses Schatzsuche-Tool' },`;

// Now generate all 22 remaining files
// File structure is consistent: import, appId, locale:'de', seo, visuals, hero, whatYouCanCreate, tutorial, businessIdeas, proTips, faq, internalLinks

console.log('Generating 22 remaining German tool content files...');

// 1. Cryptogram
w('kostenloses-kryptogramm-tool', `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'cryptogram',
  locale: 'de',

  seo: {
    titleTag: 'Kostenloser Kryptogramm-R\\u00e4tsel-Generator | Chiffre-Tool',
    metaDescription: 'Erstellen Sie kostenlose Kryptogramm-Arbeitsbl\\u00e4tter mit Bild-Chiffre-R\\u00e4tseln. Eigene Phrasen, Aufdeckhinweise, automatische Bildzuordnung, L\\u00f6sungsschl\\u00fcssel. Keine Anmeldung.',
    primaryKeyword: 'kostenloser Kryptogramm-R\\u00e4tsel-Generator',
    secondaryKeywords: ['Kryptogramm-Arbeitsblatt-Ersteller', 'Chiffre-R\\u00e4tsel-Generator', 'druckbarer Kryptogramm-Ersteller', 'Geheimcode-Arbeitsblatt', 'Geheimbotschaft-R\\u00e4tsel druckbar'],
    lsiKeywords: ['Entschl\\u00fcsselungs-R\\u00e4tsel Arbeitsbl\\u00e4tter', 'Geheimcode-Aktivit\\u00e4ten f\\u00fcr Kinder', 'Chiffre-Arbeitsblatt druckbar', 'Code-Knacker-R\\u00e4tsel', 'Buchstabensubstitutions-R\\u00e4tsel', 'Kritisches Denken Arbeitsbl\\u00e4tter', 'Logik-R\\u00e4tsel druckbar', 'Verschl\\u00fcsselte-Nachricht-Aktivit\\u00e4ten'],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/cryptogram/cryptogram_worksheet (1).jpeg',
      primaryAlt: 'Kryptogramm-Arbeitsblatt mit Bild-Chiffre-R\\u00e4tsel, bei dem Bilder Buchstaben ersetzen',
      secondary: '/samples/english/cryptogram/cryptogram_worksheet (2).jpeg',
      secondaryAlt: 'Kryptogramm L\\u00f6sungsschl\\u00fcssel mit entschl\\u00fcsselter Phrase und Bild-Buchstaben-Zuordnung',
    },
    sampleGallery: [
      { src: '/samples/english/cryptogram/cryptogram_worksheet (3).jpeg', alt: 'Kryptogramm mit Tierbildern als Chiffre-Symbole', caption: 'Tierthema-Chiffre' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (4).jpeg', alt: 'Kryptogramm mit Aufdeckhinweisen', caption: 'Aufdeckhinweise-Funktion' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (5).jpeg', alt: 'Eigene-Phrase-Kryptogramm mit Essensthema', caption: 'Eigene-Phrase-R\\u00e4tsel' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (6).jpeg', alt: 'Kryptogramm mit manueller Bild-Buchstaben-Zuordnung', caption: 'Manuelle Bildzuordnung' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (7).jpeg', alt: 'Mehrzeiliges Kryptogramm mit dekorativem Rahmen', caption: 'Mehrzeilige Phrase' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (8).jpeg', alt: 'Kryptogramm L\\u00f6sungsschl\\u00fcssel mit Chiffre-Legende und entschl\\u00fcsselter Nachricht', caption: 'Vollst\\u00e4ndiger L\\u00f6sungsschl\\u00fcssel' },
    ],
    youtubeId: '9U0BIIjCnco',
    videoTitle: 'So erstellen Sie Kryptogramm-Arbeitsbl\\u00e4tter \\u2014 Kostenloses Chiffre-R\\u00e4tsel-Tutorial',
  },

  hero: {
    title: 'Kostenloser Kryptogramm-R\\u00e4tsel-Generator',
    tagline: 'Bild-Chiffren verwandeln Geheimbotschaften in R\\u00e4tsel, die kritisches Denken und Buchstabenerkennung f\\u00f6rdern',
    description: \`Dieser kostenlose Kryptogramm-R\\u00e4tsel-Generator erstellt Arbeitsbl\\u00e4tter, bei denen Bilder Buchstaben in einer Phrase ersetzen. Sch\\u00fcler entschl\\u00fcsseln die Nachricht, indem sie herausfinden, welchen Buchstaben jedes Bild darstellt, und die Buchstaben darunter schreiben, um den versteckten Text aufzudecken. Das Format kombiniert Code-Knacker-Logik mit Vokabel\\u00fcbung \\u2014 jedes R\\u00e4tsel trainiert Mustererkennung, deduktives Denken und Rechtschreibung gleichzeitig.

Jedes Kryptogramm verwendet eine Chiffre, bei der Bilder f\\u00fcr bestimmte Buchstaben stehen. Ein Katzenbild k\\u00f6nnte den Buchstaben \\u201EK\\u201C darstellen, ein Baumbild den Buchstaben \\u201EB\\u201C und so weiter. Die Beziehung zwischen Bildern und Buchstaben folgt der Anlaut-Logik, was die Chiffre auch f\\u00fcr j\\u00fcngere Sch\\u00fcler zug\\u00e4nglich macht und trotzdem eine echte Entschl\\u00fcsselungs-Herausforderung bietet.

Das Aufdeckhinweis-System steuert die Schwierigkeit. W\\u00e4hlen Sie, wie viele Bild-zu-Buchstaben-Zuordnungen zu Beginn aufgedeckt werden. Mehr Aufdeckungen machen das R\\u00e4tsel einfacher. Weniger Aufdeckungen erzeugen eine h\\u00e4rtere Herausforderung. Geben Sie eigene Phrasen ein oder lassen Sie den Generator sie erstellen. Manuelle und automatische Bildzuordnung geben Kontrolle dar\\u00fcber, welche Bilder welche Buchstaben darstellen. Durchsuchen Sie 104 Bildthemen f\\u00fcr thematische Chiffre-R\\u00e4tsel. Exportieren Sie als JPEG oder PDF mit Graustufen-Umschalter. Alles funktioniert kostenlos mit Wasserzeichen \\u2014 keine Anmeldung erforderlich.\`,
  },

  whatYouCanCreate: [
    { title: 'Bild-Chiffre-R\\u00e4tsel', description: 'Jedes R\\u00e4tsel nutzt Bilder als Substitutions-Chiffre f\\u00fcr Buchstaben. Sch\\u00fcler entschl\\u00fcsseln Bilder zu Buchstaben mithilfe der Anlaut-Logik und setzen die versteckte Nachricht Zeichen f\\u00fcr Zeichen zusammen.' },
    { title: 'Eigene-Nachricht-Kryptogramme', description: 'Geben Sie beliebige Phrasen, Zitate, Vokabels\\u00e4tze oder lustige Nachrichten ein. Der Generator konvertiert Ihren Text automatisch in ein Chiffre-R\\u00e4tsel mit Bildern aus Ihrem gew\\u00e4hlten Thema.' },
    { title: 'Schwierigkeitsangepasste Code-Knacker', description: 'Nutzen Sie Aufdeckhinweise zur Steuerung. 70% aufdecken f\\u00fcr Anf\\u00e4nger. 30% f\\u00fcr Fortgeschrittene. Nichts aufdecken f\\u00fcr eine vollst\\u00e4ndige Code-Knacker-Herausforderung.' },
    { title: 'Thematische Geheimbotschaft-Aktivit\\u00e4ten', description: 'Nutzen Sie die 104 Bildthemen f\\u00fcr Chiffre-R\\u00e4tsel passend zum Unterricht. Eine Tier-Code-Sachkundenachricht, eine Essen-Chiffre-Ern\\u00e4hrungsfakt oder ein Fahrzeug-Code-Geographie-Hinweis.' },
    { title: 'Aufw\\u00e4rm\\u00fcbungen f\\u00fcr kritisches Denken', description: 'Kryptogramme trainieren deduktives Denken und Mustererkennung. Nutzen Sie ein t\\u00e4gliches Kryptogramm als 5-Minuten-Aufw\\u00e4rm\\u00fcbung, die Logikf\\u00e4higkeiten \\u00fcber alle F\\u00e4cher aufbaut.' },
    { title: 'Motivierende Botschaft-R\\u00e4tsel', description: 'Verschl\\u00fcsseln Sie aufmunternde Phrasen und Wachstums-Denkweise-Botschaften. Sch\\u00fcler l\\u00f6sen das R\\u00e4tsel und entdecken eine positive Nachricht \\u2014 kognitive \\u00dcbung mit sozial-emotionaler Verst\\u00e4rkung.' },
  ],

  tutorial: {
    title: 'Kryptogramm-R\\u00e4tsel in 9 Schritten erstellen',
    steps: [
      { title: 'Generator \\u00f6ffnen', description: 'Klicken Sie auf \\u201EKostenlos testen\\u201C, um den Kryptogramm-Generator zu starten. Kein Konto n\\u00f6tig. L\\u00e4uft im Browser auf Desktop, Tablet oder Mobilger\\u00e4t.' },
      { title: 'Phrase eingeben', description: 'Tippen Sie eine eigene Phrase, einen Satz oder ein Zitat, das zur versteckten Nachricht wird. Der Generator akzeptiert jeden Text und konvertiert ihn automatisch in ein Chiffre-R\\u00e4tsel.' },
      { title: 'Bildthema ausw\\u00e4hlen', description: 'Durchsuchen Sie 104 Themen f\\u00fcr die Chiffre-Symbole. Jedes Thema bietet Illustrationen passend zu Anlauten f\\u00fcr logische Bild-zu-Buchstaben-Zuordnung.' },
      { title: 'Bildzuordnungs-Modus w\\u00e4hlen', description: 'Auto-Modus ordnet Bilder automatisch nach Anlaut zu. Manueller Modus l\\u00e4sst Sie genau w\\u00e4hlen, welches Bild welchen Buchstaben in der Chiffre darstellt.' },
      { title: 'Aufdeckhinweise festlegen', description: 'W\\u00e4hlen Sie, wie viele Bild-zu-Buchstaben-Zuordnungen zu Beginn aufgedeckt werden. Mehr Hinweise machen es einfacher. Weniger Hinweise erzeugen h\\u00e4rtere R\\u00e4tsel.' },
      { title: 'R\\u00e4tsel generieren', description: 'Klicken Sie auf Generieren. Jeder Buchstabe wird durch sein zugeordnetes Bild ersetzt. Leere Felder erscheinen unter jedem Bild zum Schreiben der entschl\\u00fcsselten Buchstaben.' },
      { title: 'Pr\\u00fcfen und bearbeiten', description: 'Vorschau des R\\u00e4tsels. Einzelne Bilder tauschen, Hinweise anpassen oder Phrase \\u00e4ndern. Jede \\u00c4nderung wird in Echtzeit aktualisiert.' },
      { title: 'Layout anpassen', description: '\\u00dcberschriften, Namensfelder und Anweisungen \\u00fcber den Canvas-Editor hinzuf\\u00fcgen. Rahmen und Hintergr\\u00fcnde anwenden. Seitenformat, Ausrichtung und Schriftart w\\u00e4hlen.' },
      { title: 'Als JPEG oder PDF exportieren', description: 'R\\u00e4tsel und L\\u00f6sungsschl\\u00fcssel als separate Dateien herunterladen. Der L\\u00f6sungsschl\\u00fcssel zeigt die vollst\\u00e4ndig entschl\\u00fcsselte Phrase und Chiffre-Legende. Graustufen-Umschalter f\\u00fcr tintensparsames Drucken.' },
    ],
  },

  businessIdeas: [
    { title: 'Code-Knacker-R\\u00e4tsel-Pakete auf Etsy', description: 'B\\u00fcndeln Sie 15\\u201320 Kryptogramm-R\\u00e4tsel pro Thema. \\u201ETier-Code-Knacker\\u201C, \\u201EEssen-Chiffre-R\\u00e4tsel\\u201C und \\u201EGeheimbotschaft-Sammlung\\u201C ziehen Eltern und Lehrkr\\u00e4fte an.', platform: 'Etsy' },
    { title: 'Kryptogramm-R\\u00e4tselb\\u00fccher auf Amazon KDP', description: 'Stellen Sie thematische Kryptogramm-R\\u00e4tsel zu B\\u00fcchern mit steigender Schwierigkeit zusammen. Von vielen Aufdeckhinweisen und kurzen Phrasen bis zu keinen Hinweisen und l\\u00e4ngeren Nachrichten.', platform: 'Amazon KDP' },
    { title: 'Kritisches-Denken-Ressourcen f\\u00fcr TPT', description: 'Erstellen Sie Kryptogramm-R\\u00e4tsel-Sets passend zum Klassenstufenvokabular. TPT-Lehrkr\\u00e4fte sch\\u00e4tzen Ressourcen, die h\\u00f6here Denkf\\u00e4higkeiten aufbauen und gleichzeitig Rechtschreibung und Vokabular \\u00fcben.', platform: 'Teachers Pay Teachers' },
    { title: 'Motivierende-Botschaft-R\\u00e4tsel-Sammlungen', description: 'Verschl\\u00fcsseln Sie Wachstums-Denkweise-Zitate und aufmunternde Nachrichten in Kryptogrammen. Kombination aus Probleml\\u00f6sen und positiver Botschaft spricht Eltern, Berater und sozial-emotionale Programme an.', platform: 'Multi-platform' },
    { title: 'W\\u00f6chentliche Code-Knacker-Challenge-Serie', description: 'Erstellen Sie jede Woche ein neues thematisches Kryptogramm mit steigender Schwierigkeit. Liefern Sie als digitales Abo f\\u00fcr t\\u00e4gliche oder w\\u00f6chentliche Aufw\\u00e4rm-Aktivit\\u00e4ten.', platform: 'Gumroad' },
  ],

  proTips: [
    { title: 'Mit 60\\u201370% Aufdeckungen f\\u00fcr Anf\\u00e4nger starten', tip: 'Decken Sie den Gro\\u00dfteil der Chiffre auf, damit Sch\\u00fcler nur wenige Buchstaben entschl\\u00fcsseln m\\u00fcssen. Sie erleben den Nervenkitzel des Code-Knackens ohne \\u00fcberw\\u00e4ltigende Frustration.' },
    { title: 'Kurze Phrasen f\\u00fcr junge Lernende nutzen', tip: 'Halten Sie anf\\u00e4ngliche Phrasen auf 3\\u20135 W\\u00f6rter. Kurze Nachrichten sind weniger einsch\\u00fcchternd und erlauben Fokus auf den Entschl\\u00fcsselungsprozess selbst.' },
    { title: 'Vokabeldefinitionen verschl\\u00fcsseln', tip: 'Geben Sie eine Definition als versteckte Phrase ein. Sch\\u00fcler entschl\\u00fcsseln die Definition und festigen sowohl Bedeutung als auch Rechtschreibung der Schl\\u00fcsselbegriffe.' },
    { title: 'Mehrteilige Geschichten-Sequenzen erstellen', tip: 'Erstellen Sie 3\\u20135 Kryptogramme, bei denen jede entschl\\u00fcsselte Nachricht ein Satz einer Geschichte ist. Sch\\u00fcler l\\u00f6sen alle R\\u00e4tsel, um die vollst\\u00e4ndige Erz\\u00e4hlung zu lesen.' },
    { title: 'Gleichen Chiffre-Schl\\u00fcssel \\u00fcber R\\u00e4tsel nutzen', tip: 'Behalten Sie bei einem R\\u00e4tsel-Set dieselbe Bild-zu-Buchstaben-Zuordnung bei. Sch\\u00fcler bauen Vertrautheit mit der Chiffre auf und entschl\\u00fcsseln mit jedem R\\u00e4tsel schneller.' },
    { title: 'Chiffre-Legende separat drucken', tip: 'Exportieren Sie die Chiffre-Legende des L\\u00f6sungsschl\\u00fcssels als separate Referenzkarte. Sch\\u00fcler k\\u00f6nnen sie bei Bedarf anfordern als Hilfestellung statt aufzugeben.' },
    { title: 'Mit Wortsuchr\\u00e4tsel zur Verst\\u00e4rkung kombinieren', tip: 'Nachdem Sch\\u00fcler ein Kryptogramm entschl\\u00fcsselt haben, lassen Sie sie die entschl\\u00fcsselten W\\u00f6rter in einem Wortsuchr\\u00e4tsel finden. Die doppelte Begegnung st\\u00e4rkt die Rechtschreibepr\\u00e4gung.' },
  ],

  faq: [
    { question: 'Wie funktioniert der Kryptogramm-Generator?', answer: 'Jeder Buchstabe Ihrer Phrase wird durch ein Bild ersetzt. Sch\\u00fcler entschl\\u00fcsseln die Bilder zur\\u00fcck zu Buchstaben mithilfe der Anlaut-Logik und schreiben sie unter jedes Bild, um die versteckte Nachricht aufzudecken.' },
    { question: 'Was ist das Bild-Chiffre-System?', answer: 'Bilder substituieren Buchstaben basierend auf Anlauten. Ein Katzenbild steht f\\u00fcr \\u201EK\\u201C, ein Baumbild f\\u00fcr \\u201EB\\u201C und so weiter. Diese Phonetik-basierte Chiffre ist f\\u00fcr junge Lernende zug\\u00e4nglich und bietet trotzdem eine echte Entschl\\u00fcsselungs-Herausforderung.' },
    { question: 'Wie funktionieren die Aufdeckhinweise?', answer: 'W\\u00e4hlen Sie, wie viele Bild-zu-Buchstaben-Zuordnungen zu Beginn angezeigt werden. Mehr Aufdeckungen machen das R\\u00e4tsel einfacher. Weniger erfordern mehr Deduktion und erzeugen eine h\\u00e4rtere Herausforderung.' },
    { question: 'Kann ich eigene Phrasen eingeben?', answer: 'Ja. Tippen Sie beliebige Phrasen, Zitate, S\\u00e4tze oder Nachrichten. Der Generator konvertiert Ihren Text in ein Chiffre-R\\u00e4tsel mit Bildern aus Ihrem gew\\u00e4hlten Thema. Keine L\\u00e4ngenbegrenzung.' },
${langFaq}
${answerKeyFaq}
${sellFaq}
${commercialFaq}
${refundFaq}
  ],

${literacyLinks}
    { slug: 'kostenloses-kryptogramm-tool', pageType: 'tool', anchorText: 'Kostenloses Kryptogramm-Tool' },
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Kryptogramm-Generator \\u2014 Alle Details' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Buchstaben & W\\u00f6rter Paket \\u2014 Sparen Sie bei allen Lese-Tools' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Lese-Druckvorlagen Nischenideen' },
    { slug: 'create-educational-bundles', pageType: 'guide', anchorText: 'Lern-Bundles erstellen, die sich verkaufen' },
  ],
};
`);

console.log('Done generating. Check output directory: ' + outDir);
console.log('\\nNote: This script generates only the cryptogram file as an example.');
console.log('The remaining 21 files are being generated separately.');
