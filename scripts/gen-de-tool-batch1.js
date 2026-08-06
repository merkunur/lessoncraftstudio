/**
 * Generate German tool content files - Batch 1 (Literacy remaining: cryptogram, writing)
 * + Visual category (7 files): big-small, pattern-train, pattern-worksheet, draw-and-color, drawing-lines, coloring, chart-count
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'de');

// German slug lookup for internalLinks tool pageType
const deSlug = {
  'addition': 'kostenloses-additions-arbeitsblaetter-tool',
  'subtraction': 'kostenloses-subtraktions-arbeitsblaetter-tool',
  'code-addition': 'kostenloses-code-addition-arbeitsblaetter-tool',
  'more-less': 'kostenloses-mehr-oder-weniger-arbeitsblaetter-tool',
  'math-puzzle': 'kostenloses-mathe-raetsel-tool',
  'math-worksheet': 'kostenloses-mathe-arbeitsblaetter-tool',
  'alphabet-train': 'kostenloses-alphabet-zug-tool',
  'prepositions': 'kostenloses-praepositionen-arbeitsblaetter-tool',
  'word-guess': 'kostenloses-wort-raten-tool',
  'word-scramble': 'kostenloses-buchstabensalat-tool',
  'wordsearch': 'kostenloses-wortsuchrraetsel-tool',
  'cryptogram': 'kostenloses-kryptogramm-tool',
  'writing': 'kostenloses-schreibuebungs-tool',
  'big-small': 'kostenloses-gross-und-klein-arbeitsblaetter-tool',
  'pattern-train': 'kostenloses-muster-zug-tool',
  'pattern-worksheet': 'kostenloses-muster-arbeitsblaetter-tool',
  'draw-and-color': 'kostenloses-malen-und-ausmalen-tool',
  'drawing-lines': 'kostenloses-linien-zeichnen-tool',
  'coloring': 'kostenloses-ausmalbilder-tool',
  'chart-count': 'kostenloses-diagramm-zaehlen-tool',
  'matching': 'kostenloses-zuordnungs-arbeitsblaetter-tool',
  'grid-match': 'kostenloses-gitter-zuordnung-tool',
  'shadow-match': 'kostenloses-schatten-zuordnung-tool',
  'bingo': 'kostenloses-bingo-karten-tool',
  'picture-sort': 'kostenloses-bilder-sortieren-tool',
  'missing-pieces': 'kostenloses-fehlende-teile-tool',
  'odd-one-out': 'kostenloses-was-passt-nicht-tool',
  'sudoku': 'kostenloses-sudoku-tool',
  'picture-path': 'kostenloses-bilderpfad-tool',
  'find-and-count': 'kostenloses-finden-und-zaehlen-tool',
  'find-objects': 'kostenloses-suchbild-tool',
  'crossword': 'kostenloses-kreuzwortraetsel-tool',
  'treasure-hunt': 'kostenloses-schatzsuche-tool',
};

// Helper: convert internalLinks - tool pageType uses German slug, others keep English
function makeLink(slug, pageType, anchorText) {
  if (pageType === 'tool') {
    return `    { slug: '${deSlug[slug]}', pageType: 'tool', anchorText: '${anchorText}' },`;
  }
  return `    { slug: '${slug}', pageType: '${pageType}', anchorText: '${anchorText}' },`;
}

// Common FAQ blocks
const commercialFaq = `    {
      question: 'Kann ich die erstellten Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz f\u00fcr den Verkauf auf Etsy, Amazon KDP, TPT und jeder anderen Plattform. Unbegrenzte Generierung inklusive.',
    },`;

const pricingFaq = `    {
      question: 'Was ist der Unterschied zwischen dem Commercial Pack und dem Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Generator, die kommerzielle Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang zu neuen Inhalten und alle zuk\u00fcnftigen Updates. Beide sind Einmalk\u00e4ufe ohne wiederkehrende Geb\u00fchren.',
    },`;

const refundFaq = `    {
      question: 'Wie ist Ihre R\u00fcckgaberichtlinie?',
      answer: 'Aufgrund der digitalen Natur des Produkts sind alle Verk\u00e4ufe endg\u00fcltig. Sobald ein Lizenzschl\u00fcssel zugestellt und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Nutzen Sie die kostenlose Version, um alles zuerst zu testen.',
    },`;

const files = {};

// ============================================
// CRYPTOGRAM
// ============================================
files['kostenloses-kryptogramm-tool.ts'] = `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'cryptogram',
  locale: 'de',

  seo: {
    titleTag: 'Kostenloser Kryptogramm-Generator | Chiffre-R\u00e4tsel erstellen',
    metaDescription: 'Erstellen Sie kostenlose Kryptogramm-Arbeitsbl\u00e4tter mit Bilder-Chiffre-R\u00e4tseln. Eigene S\u00e4tze, Entschl\u00fcsselungshilfen, automatische Bildzuordnung, L\u00f6sungsschl\u00fcssel. Keine Anmeldung.',
    primaryKeyword: 'kostenloser Kryptogramm-Generator',
    secondaryKeywords: [
      'Kryptogramm-Arbeitsblatt erstellen kostenlos',
      'Chiffre-R\u00e4tsel-Generator f\u00fcr Kinder',
      'druckbares Kryptogramm erstellen',
      'Geheimschrift-Arbeitsblatt Grundschule',
      'kostenlose Kryptogramm-Vorlage PDF',
    ],
    lsiKeywords: [
      'Entschl\u00fcsselungsr\u00e4tsel Arbeitsbl\u00e4tter',
      'Geheimcode-Aktivit\u00e4ten f\u00fcr Kinder',
      'Chiffre-Arbeitsblatt druckbar',
      'Code-Knacker-R\u00e4tsel erstellen',
      'Buchstaben-Substitutionsr\u00e4tsel',
      'kritisches Denken Arbeitsbl\u00e4tter',
      'Logikr\u00e4tsel zum Ausdrucken',
      'verschl\u00fcsselte Nachrichten Aktivit\u00e4ten',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/cryptogram/cryptogram_worksheet (1).jpeg',
      primaryAlt: 'Kryptogramm-Arbeitsblatt mit Bilder-Chiffre-R\u00e4tsel, bei dem Bilder Buchstaben in einem Satz ersetzen',
      secondary: '/samples/english/cryptogram/cryptogram_worksheet (2).jpeg',
      secondaryAlt: 'Kryptogramm-L\u00f6sungsschl\u00fcssel mit entschl\u00fcsseltem Satz und Bild-zu-Buchstaben-Zuordnung',
    },
    sampleGallery: [
      { src: '/samples/english/cryptogram/cryptogram_worksheet (3).jpeg', alt: 'Kryptogramm-R\u00e4tsel mit Tierbildern als Chiffre-Symbole', caption: 'Tierchiffre-Thema' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (4).jpeg', alt: 'Kryptogramm mit Entschl\u00fcsselungshilfen und teilweise gel\u00f6sten Buchstaben', caption: 'Entschl\u00fcsselungshilfen-Funktion' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (5).jpeg', alt: 'Individuelles Kryptogramm mit Essensthema-Bildern', caption: 'Eigener Satz als R\u00e4tsel' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (6).jpeg', alt: 'Kryptogramm mit manueller Bild-zu-Buchstaben-Zuordnung', caption: 'Manuelle Bildzuordnung' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (7).jpeg', alt: 'Mehrzeiliges Kryptogramm-R\u00e4tsel mit dekorativem Rahmen', caption: 'Mehrzeiliger Satz' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (8).jpeg', alt: 'Kryptogramm-L\u00f6sungsschl\u00fcssel mit Chiffre-Legende und entschl\u00fcsselter Nachricht', caption: 'Vollst\u00e4ndiger L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: '9U0BIIjCnco',
    videoTitle: 'So erstellen Sie Kryptogramm-Arbeitsbl\u00e4tter \u2014 Kostenloses Chiffre-R\u00e4tsel-Tutorial',
  },

  hero: {
    title: 'Kostenloser Kryptogramm-R\u00e4tsel-Generator',
    tagline: 'Bilder-Chiffren verwandeln geheime Nachrichten in R\u00e4tsel, die kritisches Denken und Buchstabenerkennung f\u00f6rdern',
    description: \`Dieser kostenlose Kryptogramm-Generator erstellt Arbeitsbl\u00e4tter, bei denen Bilder die Buchstaben in einem Satz ersetzen. Sch\u00fcler entschl\u00fcsseln die Nachricht, indem sie herausfinden, welchen Buchstaben jedes Bild darstellt, und schreiben die Buchstaben darunter, um den versteckten Text zu enth\u00fcllen. Das Format verbindet Code-Knacker-Logik mit Wortschatz\u00fcbung \u2014 jedes R\u00e4tsel trainiert Mustererkennung, deduktives Denken und Rechtschreibung gleichzeitig.

Jedes Kryptogramm verwendet eine Chiffre, bei der Bilder f\u00fcr bestimmte Buchstaben stehen. Ein Katzenbild k\u00f6nnte den Buchstaben \u201eK\u201c darstellen, ein Baumbild den Buchstaben \u201eB\u201c und so weiter. Die Beziehung zwischen Bildern und Buchstaben folgt der Anlaut-Logik, was die Chiffre auch f\u00fcr j\u00fcngere Sch\u00fcler zug\u00e4nglich macht und dennoch eine echte Entschl\u00fcsselungsherausforderung bietet.

Das Entschl\u00fcsselungshilfen-System steuert den Schwierigkeitsgrad. W\u00e4hlen Sie, wie viele Bild-zu-Buchstaben-Zuordnungen zu Beginn aufgedeckt werden. Mehr aufgedeckte Hinweise machen das R\u00e4tsel einfacher. Weniger Hinweise schaffen eine h\u00e4rtere Herausforderung, die mehr Deduktion erfordert. Diese einzelne Einstellung erzeugt Dutzende von Schwierigkeitsvariationen aus demselben Satz.

Geben Sie eigene S\u00e4tze ein oder lassen Sie den Generator sie erstellen. Manuelle und automatische Bildzuordnungsmodi geben Ihnen Kontrolle dar\u00fcber, welche Bilder welche Buchstaben darstellen. Durchsuchen Sie 104 Bildthemen f\u00fcr thematische Chiffre-R\u00e4tsel. Jedes Arbeitsblatt generiert einen passenden L\u00f6sungsschl\u00fcssel. Export als JPEG oder PDF mit Graustufen-Option. Alles funktioniert kostenlos mit Wasserzeichen \u2014 keine Anmeldung erforderlich.\`,
  },

  whatYouCanCreate: [
    {
      title: 'Bilder-Chiffre-R\u00e4tsel',
      description: 'Jedes R\u00e4tsel verwendet Bilder als Substitutions-Chiffre f\u00fcr Buchstaben. Sch\u00fcler entschl\u00fcsseln Bilder zu Buchstaben mithilfe der Anlaut-Logik und setzen die versteckte Nachricht Buchstabe f\u00fcr Buchstabe zusammen.',
    },
    {
      title: 'Individuelle Nachrichten-Kryptogramme',
      description: 'Geben Sie einen beliebigen Satz, ein Zitat oder eine Vokabel-\u00dcbung ein. Der Generator wandelt Ihren Text automatisch in ein Chiffre-R\u00e4tsel um, das Bilder aus dem gew\u00e4hlten Thema verwendet.',
    },
    {
      title: 'Schwierigkeitsangepasste Code-Knacker',
      description: 'Nutzen Sie Entschl\u00fcsselungshilfen zur Steuerung des Schwierigkeitsgrads. Decken Sie 70% der Chiffre f\u00fcr Anf\u00e4nger auf. Decken Sie 30% f\u00fcr fortgeschrittene Sch\u00fcler auf. Decken Sie nichts auf f\u00fcr eine vollst\u00e4ndige Code-Knacker-Herausforderung.',
    },
    {
      title: 'Thematische Geheimbotschaft-Aktivit\u00e4ten',
      description: 'Nutzen Sie die 104 Bildthemen f\u00fcr Chiffre-R\u00e4tsel, die zu Unterrichtsthemen passen. Ein Tier-Code f\u00fcr Naturkunde, eine Essens-Chiffre f\u00fcr Ern\u00e4hrungslehre oder ein Fahrzeug-Code f\u00fcr Erdkunde.',
    },
    {
      title: 'Warm-Up-\u00dcbungen f\u00fcr kritisches Denken',
      description: 'Kryptogramme trainieren deduktives Denken und Mustererkennung. Nutzen Sie ein t\u00e4gliches Kryptogramm als 5-Minuten-Warm-Up, das Logikf\u00e4higkeiten f\u00e4cher\u00fcbergreifend aufbaut.',
    },
    {
      title: 'Motivations-Nachrichten-R\u00e4tsel',
      description: 'Verschl\u00fcsseln Sie aufmunternde Spr\u00fcche und Wachstums-Mindset-Botschaften. Sch\u00fcler l\u00f6sen das R\u00e4tsel und entdecken eine positive Nachricht \u2014 kognitive \u00dcbung verbunden mit sozial-emotionaler St\u00e4rkung.',
    },
  ],

  tutorial: {
    title: 'Kryptogramm-R\u00e4tsel in 9 Schritten erstellen',
    steps: [
      {
        title: 'Generator \u00f6ffnen',
        description: 'Klicken Sie auf \u201eKostenlos testen\u201c, um den Kryptogramm-Generator zu starten. Kein Konto n\u00f6tig. Das Tool l\u00e4uft direkt in Ihrem Browser auf Desktop, Tablet oder Mobilger\u00e4t.',
      },
      {
        title: 'Satz eingeben',
        description: 'Geben Sie einen eigenen Satz, ein Zitat oder einen Spruch ein, der zur versteckten Nachricht wird. Der Generator akzeptiert jeden Text und wandelt ihn automatisch in ein Chiffre-R\u00e4tsel um.',
      },
      {
        title: 'Bildthema ausw\u00e4hlen',
        description: 'Durchsuchen Sie 104 Themen, um die Bilder auszuw\u00e4hlen, die als Chiffre-Symbole dienen. Jedes Thema bietet Illustrationen, die nach Anlaut-Logik den Buchstaben zugeordnet werden.',
      },
      {
        title: 'Bildzuordnungsmodus w\u00e4hlen',
        description: 'Der automatische Modus ordnet Bilder nach Anlaut-Logik zu. Der manuelle Modus l\u00e4sst Sie genau bestimmen, welches Bild welchen Buchstaben in der Chiffre darstellt.',
      },
      {
        title: 'Entschl\u00fcsselungshilfen festlegen',
        description: 'W\u00e4hlen Sie, wie viele Bild-zu-Buchstaben-Zuordnungen vorab aufgedeckt werden. Mehr Hinweise machen das R\u00e4tsel einfacher f\u00fcr Anf\u00e4nger. Weniger Hinweise schaffen h\u00e4rtere R\u00e4tsel.',
      },
      {
        title: 'R\u00e4tsel generieren',
        description: 'Klicken Sie auf Generieren. Jeder Buchstabe in Ihrem Satz wird durch sein zugeordnetes Bild ersetzt. Unter jedem Bild erscheinen Leerfelder, in die Sch\u00fcler die entschl\u00fcsselten Buchstaben schreiben.',
      },
      {
        title: '\u00dcberpr\u00fcfen und bearbeiten',
        description: 'Sehen Sie das R\u00e4tsel in der Vorschau. Tauschen Sie einzelne Bilder aus, passen Sie Hinweise an oder \u00e4ndern Sie den Satz. Jede \u00c4nderung wird in Echtzeit aktualisiert.',
      },
      {
        title: 'Layout anpassen',
        description: 'F\u00fcgen Sie Titel, Namensfelder und Anweisungen mit dem Canvas-Editor hinzu. Wenden Sie Rahmen und Hintergr\u00fcnde an. W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart.',
      },
      {
        title: 'Als JPEG oder PDF exportieren',
        description: 'Laden Sie das R\u00e4tsel und den L\u00f6sungsschl\u00fcssel als separate Dateien herunter. Der L\u00f6sungsschl\u00fcssel zeigt den vollst\u00e4ndigen entschl\u00fcsselten Satz und die Chiffre-Legende. Graustufen-Option f\u00fcr sparsames Drucken.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Code-Knacker-R\u00e4tselpakete auf Etsy',
      description: 'B\u00fcndeln Sie 15\u201320 Kryptogramme pro Thema in herunterladbare Pakete. \u201eTier-Code-Knacker\u201c, \u201eEssens-Chiffre-R\u00e4tsel\u201c und \u201eGeheimbotschaft-Sammlung\u201c sprechen Eltern und Lehrkr\u00e4fte an, die einzigartige Logik-Aktivit\u00e4ten suchen.',
      platform: 'Etsy',
    },
    {
      title: 'Kryptogramm-R\u00e4tselb\u00fccher auf Amazon KDP',
      description: 'Stellen Sie thematische Kryptogramme in B\u00fcchern mit progressivem Schwierigkeitsgrad zusammen. Beginnen Sie mit vielen Hinweisen und kurzen S\u00e4tzen, steigern Sie sich zu keinen Hinweisen und l\u00e4ngeren Nachrichten. L\u00f6sungen im Anhang.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Ressourcen f\u00fcr kritisches Denken auf TPT',
      description: 'Erstellen Sie Kryptogramm-Sets abgestimmt auf den Wortschatz der jeweiligen Klassenstufe. TPT-Lehrkr\u00e4fte sch\u00e4tzen Materialien, die h\u00f6heres Denkverm\u00f6gen aufbauen und gleichzeitig Rechtschreibung und Wortschatz \u00fcben.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Motivations-R\u00e4tsel-Sammlungen',
      description: 'Verschl\u00fcsseln Sie Growth-Mindset-Zitate und aufmunternde Botschaften in Kryptogrammen. Die Kombination aus Probleml\u00f6sung und positiver Botschaft spricht Eltern, Berater und Programme f\u00fcr sozial-emotionales Lernen an.',
      platform: 'Multi-Plattform',
    },
    {
      title: 'W\u00f6chentliche Code-Knacker-Challenge-Serie',
      description: 'Generieren Sie jede Woche ein neues thematisches Kryptogramm mit steigendem Schwierigkeitsgrad. Liefern Sie als digitales Abonnement, das Klassen als t\u00e4gliches oder w\u00f6chentliches Warm-Up nutzen.',
      platform: 'Gumroad',
    },
  ],

  proTips: [
    {
      title: 'Starten Sie mit 60\u201370% aufgedeckten Hinweisen f\u00fcr Anf\u00e4nger',
      tip: 'Decken Sie den Gro\u00dfteil der Chiffre auf, sodass Sch\u00fcler nur wenige Buchstaben entschl\u00fcsseln m\u00fcssen. Sie erleben den Nervenkitzel des Code-Knackens ohne \u00fcberw\u00e4ltigende Frustration. Reduzieren Sie die Hinweise mit wachsenden F\u00e4higkeiten.',
    },
    {
      title: 'Verwenden Sie kurze S\u00e4tze f\u00fcr junge Lerner',
      tip: 'Halten Sie anf\u00e4ngliche S\u00e4tze bei 3\u20135 W\u00f6rtern. Kurze Nachrichten sind weniger einsch\u00fcchternd und erlauben es den Sch\u00fclern, sich auf den Entschl\u00fcsselungsprozess selbst zu konzentrieren.',
    },
    {
      title: 'Verschl\u00fcsseln Sie Vokabel-Definitionen',
      tip: 'Geben Sie eine Definition als versteckten Satz ein und verwenden Sie ein Wort aus Ihrer Vokabelliste als Titel. Sch\u00fcler entschl\u00fcsseln die Definition und festigen so sowohl Bedeutung als auch Rechtschreibung.',
    },
    {
      title: 'Erstellen Sie mehrteilige Geschichten',
      tip: 'Erstellen Sie eine Serie von 3\u20135 Kryptogrammen, bei denen jede entschl\u00fcsselte Nachricht ein Satz einer Geschichte ist. Sch\u00fcler l\u00f6sen alle R\u00e4tsel, um die vollst\u00e4ndige Erz\u00e4hlung zu lesen.',
    },
    {
      title: 'Verwenden Sie denselben Chiffre-Schl\u00fcssel \u00fcber mehrere R\u00e4tsel',
      tip: 'Wenn Sie ein Set von R\u00e4tseln f\u00fcr eine Sitzung erstellen, behalten Sie dieselben Bild-zu-Buchstaben-Zuordnungen bei. Sch\u00fcler bauen Vertrautheit mit der Chiffre auf und entschl\u00fcsseln mit jedem R\u00e4tsel schneller.',
    },
    {
      title: 'Drucken Sie die Chiffre-Legende separat',
      tip: 'Exportieren Sie die Chiffre-Legende des L\u00f6sungsschl\u00fcssels als separate Referenzkarte. Sch\u00fcler k\u00f6nnen die Legende anfordern, wenn sie feststecken \u2014 als Hilfsmittel statt aufzugeben.',
    },
    {
      title: 'Kombinieren Sie mit Wortsuche zur Vertiefung',
      tip: 'Nachdem Sch\u00fcler ein Kryptogramm entschl\u00fcsselt haben, lassen Sie sie die entschl\u00fcsselten W\u00f6rter in einem Wortsuchr\u00e4tsel mit demselben Wortschatz finden. Die doppelte Besch\u00e4ftigung st\u00e4rkt die Rechtschreibung.',
    },
  ],

  faq: [
    {
      question: 'Wie funktioniert der Kryptogramm-Generator?',
      answer: 'Jeder Buchstabe in Ihrem Satz wird durch ein Bild ersetzt. Sch\u00fcler entschl\u00fcsseln die Bilder zur\u00fcck zu Buchstaben mithilfe der Anlaut-Logik und schreiben sie unter jedes Bild, um die versteckte Nachricht zu enth\u00fcllen. Eine Chiffre-Legende zeigt, welches Bild welchen Buchstaben darstellt.',
    },
    {
      question: 'Was ist das Bilder-Chiffre-System?',
      answer: 'Bilder ersetzen Buchstaben basierend auf Anlauten. Ein Katzenbild steht f\u00fcr \u201eK\u201c, ein Baumbild f\u00fcr \u201eB\u201c und so weiter. Diese phonikbasierte Chiffre ist f\u00fcr junge Lerner zug\u00e4nglich und bietet dennoch eine echte Entschl\u00fcsselungsherausforderung.',
    },
    {
      question: 'Wie funktionieren die Entschl\u00fcsselungshilfen?',
      answer: 'W\u00e4hlen Sie, wie viele Bild-zu-Buchstaben-Zuordnungen zu Beginn angezeigt werden. Mehr Hinweise machen das R\u00e4tsel einfacher. Weniger Hinweise erfordern mehr Deduktion und schaffen eine h\u00e4rtere Herausforderung.',
    },
    {
      question: 'Kann ich eigene S\u00e4tze eingeben?',
      answer: 'Ja. Geben Sie einen beliebigen Satz, ein Zitat oder eine Nachricht ein. Der Generator wandelt Ihren Text in ein Chiffre-R\u00e4tsel um, das Bilder aus dem gew\u00e4hlten Thema verwendet. Es gibt keine Begrenzung der Satzl\u00e4nge.',
    },
    {
      question: 'Was ist der Unterschied zwischen automatischer und manueller Bildzuordnung?',
      answer: 'Der automatische Modus ordnet Bilder den Buchstaben nach Anlaut-Logik zu. Der manuelle Modus l\u00e4sst Sie genau bestimmen, welches Bild welchen Buchstaben darstellt \u2014 volle Kontrolle \u00fcber die Chiffre-Zuordnung.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Der Generator unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Jede Sprache nutzt lokalisierte Anlaute f\u00fcr die Bild-zu-Buchstaben-Zuordnung.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel generiert?',
      answer: 'Ja. Jedes R\u00e4tsel generiert einen passenden L\u00f6sungsschl\u00fcssel mit dem vollst\u00e4ndigen entschl\u00fcsselten Satz und der Chiffre-Legende mit allen Bild-zu-Buchstaben-Zuordnungen. Beide Dateien werden separat exportiert.',
    },
${commercialFaq}
${pricingFaq}
${refundFaq}
  ],

  internalLinks: [
${makeLink('word-guess', 'tool', 'Kostenloses Wort-Raten-Tool')}
${makeLink('wordsearch', 'tool', 'Kostenloses Wortsuchr\u00e4tsel-Tool')}
${makeLink('word-scramble', 'tool', 'Kostenloses Buchstabensalat-Tool')}
${makeLink('alphabet-train', 'tool', 'Kostenloses Alphabet-Zug-Tool')}
${makeLink('writing', 'tool', 'Kostenloses Schreib\u00fcbungs-Tool')}
${makeLink('prepositions', 'tool', 'Kostenloses Pr\u00e4positionen-Tool')}
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Kryptogramm-Generator \u2014 Alle Details' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Buchstaben & W\u00f6rter Bundle \u2014 Alle Lese-Tools sparen' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Lese-Druckvorlagen-Gesch\u00e4ftsideen' },
    { slug: 'create-educational-bundles', pageType: 'guide', anchorText: 'So erstellen Sie Lern-Bundles die sich verkaufen' },
  ],
};
`;

// Write each file
for (const [filename, content] of Object.entries(files)) {
  const filepath = path.join(OUT_DIR, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Created: ${filename}`);
}

console.log(`\nBatch 1 complete: ${Object.keys(files).length} files created.`);
