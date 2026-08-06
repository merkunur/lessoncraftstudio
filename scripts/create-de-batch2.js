const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');

function w(name, content) {
  fs.writeFileSync(path.join(dir, name), content, 'utf8');
  console.log('Created ' + name);
}

// 4. more-less.ts
w('more-less.ts', `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'more-less',
  locale: 'de',
  category: 'math',

  seo: {
    titleTag: 'Mehr oder Weniger Generator | Vergleichs\u00fcbungen Kostenlos',
    metaDescription: 'Erstellen Sie visuelle Vergleichs-Arbeitsbl\u00e4tter mit Gr\u00f6\u00dfer, Kleiner und Gleich. 3 Modi inkl. Ankreuzen & Durchstreichen. 104 Themen. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Mehr oder Weniger Arbeitsblatt Generator',
    secondaryKeywords: [
      'Gr\u00f6\u00dfer Kleiner Arbeitsbl\u00e4tter',
      'Vergleichs\u00fcbungen mit Bildern',
      'Mehr oder Weniger Vorschule',
      'Zahlen vergleichen Arbeitsbl\u00e4tter',
      'visuelle Vergleichs\u00fcbungen',
    ],
    lsiKeywords: [
      'Gr\u00f6\u00dfer Kleiner Gleich',
      'Mengen vergleichen Arbeitsbl\u00e4tter',
      'Zahlenvergleich Vorschule',
      'Mehr und Weniger \u00dcbungen',
      'Vergleichszeichen Arbeitsbl\u00e4tter',
      'Mathe Vergleichs\u00fcbungen',
      'Z\u00e4hlen und Vergleichen',
      'Mengenerfassung Arbeitsbl\u00e4tter',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/more less/More Less (10).jpeg',
      primaryAlt: 'Mehr oder Weniger Vergleichs-Arbeitsblatt mit Tierbildern',
      secondary: '/samples/english/more less/More Less (11).jpeg',
      secondaryAlt: 'Ankreuzen und Durchstreichen Vergleichs-Arbeitsblatt',
    },
    sampleGallery: [
      { src: '/samples/english/more less/More Less (12).jpeg', alt: 'Bild-zu-Bild Vergleichs-Arbeitsblatt mit Lebensmittel-Thema', caption: 'Bild zu Bild Modus' },
      { src: '/samples/english/more less/More Less (13).jpeg', alt: 'Bild-zu-Zahl Vergleichs-Arbeitsblatt mit Fahrzeugbildern', caption: 'Bild zu Zahl Modus' },
      { src: '/samples/english/more less/More Less (14).jpeg', alt: 'Ankreuzen und Durchstreichen mit gemischten Tierbildern', caption: 'Ankreuzen & Durchstreichen' },
      { src: '/samples/english/more less/More Less (15).jpeg', alt: 'Vergleichs-Arbeitsblatt mit illustrierten Symbolen', caption: 'Illustrierte Vergleichszeichen' },
      { src: '/samples/english/more less/More Less (16).jpeg', alt: 'Vergleichs-Arbeitsblatt mit Rahmen und Ozean-Hintergrund', caption: 'Eigener Hintergrund und Rahmen' },
      { src: '/samples/english/more less/More Less (17).jpeg', alt: 'Mehr oder Weniger L\u00f6sungsschl\u00fcssel', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'eNguG63nYVs',
    videoTitle: 'So erstellen Sie Mehr oder Weniger Vergleichs-Arbeitsbl\u00e4tter',
  },

  hero: {
    title: 'Mehr oder Weniger Generator',
    tagline: 'Visuelle Vergleichs-Arbeitsbl\u00e4tter, die Gr\u00f6\u00dfer, Kleiner und Gleich mit Bildern lehren',
    description: \`Mengen vergleichen ist eine der ersten mathematischen F\u00e4higkeiten, die Kinder entwickeln. Dennoch reduzieren viele Arbeitsbl\u00e4tter es auf abstrakte Zahlenpaare. Der Mehr oder Weniger Generator bringt das Vergleichen zur\u00fcck zu seinen visuellen Wurzeln: Sch\u00fcler betrachten Bildergruppen und bestimmen, welche mehr hat, welche weniger hat oder ob sie gleich sind.

Drei \u00dcbungsmodi decken jede Lernstufe ab. Bild zu Bild zeigt zwei Bildergruppen nebeneinander \u2014 Sch\u00fcler vergleichen die Mengen direkt. Bild zu Zahl paart eine Bildergruppe mit einer Ziffer und \u00fcberbr\u00fcckt die L\u00fccke zwischen konkret und abstrakt. Ankreuzen & Durchstreichen pr\u00e4sentiert zwei gemischte Bilder in einem Kasten \u2014 Sch\u00fcler markieren die gr\u00f6\u00dfere Gruppe (Haken) und die kleinere (Kreuz).

Sie w\u00e4hlen die Vergleichsbeziehungen: Gr\u00f6\u00dfer als, Kleiner als, Gleich oder jede Kombination. W\u00e4hlen Sie zwischen illustrierten Vergleichssymbolen und mathematischen Standardzeichen (>, <, =). Stellen Sie Aufgabenanzahl ein, w\u00e4hlen Sie gleiche oder verschiedene Bilder und nutzen Sie 104 Themen.

Der Canvas-Editor f\u00fcgt Titel, Anweisungen und Namensfelder hinzu. Jedes Arbeitsblatt generiert einen L\u00f6sungsschl\u00fcssel. Export als JPEG oder PDF mit Graustufen-Option. Testen Sie alle Funktionen kostenlos ohne Anmeldung.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie ein Vergleichs-Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: 'W\u00e4hlen Sie den Vergleichsmodus',
        description: 'W\u00e4hlen Sie Bild zu Bild f\u00fcr reinen visuellen Vergleich, Bild zu Zahl f\u00fcr den \u00dcbergang zu Ziffern, oder Ankreuzen & Durchstreichen f\u00fcr eine einzigartige Markierungs\u00fcbung.',
      },
      {
        title: 'Beziehungen und Aufgabenanzahl festlegen',
        description: 'W\u00e4hlen Sie per Checkbox: Gr\u00f6\u00dfer als, Kleiner als und/oder Gleich. Stellen Sie die Aufgabenanzahl ein (1\u20138 f\u00fcr Standardmodi, 1\u20133 f\u00fcr Ankreuzen & Durchstreichen). W\u00e4hlen Sie gleiche oder verschiedene Bildtypen.',
      },
      {
        title: 'Thema und Symbolstil w\u00e4hlen',
        description: 'Durchsuchen Sie 104 Bildthemen. W\u00e4hlen Sie zwischen illustrierten Vergleichssymbolen (kindgerechte Grafiken) oder mathematischen Standardzeichen (>, <, =). W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart.',
      },
      {
        title: 'Anpassen im Canvas-Editor',
        description: 'F\u00fcgen Sie Titel, Namensfeld oder Anweisungen als Text-Overlays hinzu. \u00c4ndern Sie Hintergrundfarben, wenden Sie Rahmen an und passen Sie Elemente mit Drag-and-Drop, Ausrichtungs- und Ebenenwerkzeugen an.',
      },
      {
        title: 'Arbeitsblatt und L\u00f6sung exportieren',
        description: 'Laden Sie Arbeitsblatt und passenden L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Graustufen-Schalter f\u00fcr Schwarz-Wei\u00df-Druck. Beide Dateien in voller Aufl\u00f6sung.',
      },
    ],
  },

  features: [
    {
      title: 'Drei Vergleichs-\u00dcbungsmodi',
      description: 'Bild zu Bild zeigt zwei Bildergruppen zum direkten Vergleich. Bild zu Zahl paart Bilder mit einer Ziffer. Ankreuzen & Durchstreichen pr\u00e4sentiert gemischte Bilder in einem Kasten \u2014 Sch\u00fcler markieren die gr\u00f6\u00dfere und kleinere Gruppe.',
    },
    {
      title: 'W\u00e4hlbare Vergleichsbeziehungen',
      description: 'W\u00e4hlen Sie per Checkbox Gr\u00f6\u00dfer als, Kleiner als, Gleich oder jede Kombination. Erstellen Sie fokussierte Arbeitsbl\u00e4tter f\u00fcr eine Beziehung oder alle drei f\u00fcr umfassende Vergleichs\u00fcbungen.',
    },
    {
      title: 'Illustrierte oder Standard-Symbole',
      description: 'Zeigen Sie Vergleichssymbole als kindgerechte illustrierte Grafiken oder als mathematische Standardzeichen (>, <, =). Illustrierte Symbole eignen sich f\u00fcr j\u00fcngere Lernende, Standardzeichen f\u00fcr formale Notation.',
    },
    {
      title: 'Gleiche oder verschiedene Bildergruppen',
      description: 'W\u00e4hlen Sie, ob beide Vergleichsgruppen den gleichen Bildtyp verwenden (5 Katzen vs. 7 Katzen) oder verschiedene (5 Katzen vs. 7 Hunde). Gleiche Bilder isolieren den Mengenvergleich. Verschiedene f\u00fcgen visuelle Vielfalt hinzu.',
    },
    {
      title: '104 illustrierte Bildthemen',
      description: 'Jedes Thema bietet klare, kindgerechte Bilder f\u00fcr Vergleichsgruppen. Tiere, Lebensmittel, Fahrzeuge, Sport, Natur und Jahreszeitenthemen verbinden Mathe mit anderen Unterrichtsthemen.',
    },
    {
      title: 'Ankreuzen & Durchstreichen Modus',
      description: 'Ein einzigartiges \u00dcbungsformat: Zwei Bildtypen sind in einem Kasten gemischt (8\u201320 Bilder). Sch\u00fcler z\u00e4hlen jeden Typ und markieren die gr\u00f6\u00dfere Gruppe (Haken) und die kleinere (Kreuz).',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor',
      description: 'F\u00fcgen Sie Text-Overlays hinzu, \u00e4ndern Sie Seiten- und Hintergrundfarben, wenden Sie dekorative Rahmen an. Ebenensteuerung, Ausrichtungswerkzeuge, Zoom und R\u00fcckg\u00e4ngig f\u00fcr professionelle Arbeitsbl\u00e4tter.',
    },
    {
      title: 'Automatischer L\u00f6sungsschl\u00fcssel mit Doppelexport',
      description: 'Jedes Arbeitsblatt generiert einen passenden L\u00f6sungsschl\u00fcssel mit korrekt ausgef\u00fcllten Vergleichszeichen. Export als hochaufl\u00f6sendes JPEG oder druckfertiges PDF. Graustufen-Option f\u00fcr tinteneffizienten Druck.',
    },
  ],

  businessUseCases: [
    {
      title: 'Vergleichs-Arbeitsblatt-Pakete f\u00fcr Etsy erstellen',
      description: 'B\u00fcndeln Sie thematische Vergleichs-Arbeitsbl\u00e4tter als Sofort-Downloads: \u201eTier Mehr oder Weniger \u2014 20 Arbeitsbl\u00e4tter\u201c, \u201eLebensmittel-Vergleichspaket \u2014 15 \u00dcbungen\u201c. Eltern und Lehrer suchen nach \u201eGr\u00f6\u00dfer Kleiner Arbeitsbl\u00e4tter mit Bildern\u201c.',
      platform: 'Etsy',
    },
    {
      title: 'Vergleichs-Aktivit\u00e4tenb\u00fccher auf Amazon KDP ver\u00f6ffentlichen',
      description: 'Stellen Sie 50\u2013100 Vergleichs-Arbeitsbl\u00e4tter zu B\u00fcchern zusammen: \u201eMehr oder Weniger f\u00fcr Vorschulkinder\u201c, \u201eZahlen vergleichen f\u00fcr die Vorschule\u201c. Alle drei Modi f\u00fcr Abwechslung und L\u00f6sungsschl\u00fcssel am Ende.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Zahlensinn-Ressourcen f\u00fcr TPT erstellen',
      description: 'Erstellen Sie differenzierte Vergleichspakete: Grundstufe (nur Bild zu Bild), Mittelstufe (Bild zu Zahl), Fortgeschritten (Ankreuzen & Durchstreichen). TPT-K\u00e4ufer sch\u00e4tzen progressive Ressourcen.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Saisonale Vergleichs-Sammlungen erstellen',
      description: 'Nutzen Sie Themenbilder f\u00fcr saisonale Vergleichspakete: K\u00fcrbisse f\u00fcr Herbst, Schneeflocken f\u00fcr Winter, Blumen f\u00fcr Fr\u00fchling. Saisonale Produkte haben konzentrierte Nachfrage.',
      platform: 'Multi-platform',
    },
    {
      title: 'Fr\u00fche Mathe-Lehrplan-Module erstellen',
      description: 'Strukturieren Sie Vergleichs-Arbeitsbl\u00e4tter in ein 10-Wochen-Modul: von Bild zu Bild mit gleichen Bildern \u00fcber Bild zu Zahl bis Ankreuzen & Durchstreichen. Als Zahlensinn-Erg\u00e4nzung f\u00fcr Homeschool-Familien.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Welche Vergleichs-\u00dcbungsmodi sind verf\u00fcgbar?',
      answer: 'Drei Modi: Bild zu Bild (zwei Bildergruppen vergleichen), Bild zu Zahl (Bildergruppe mit Ziffer vergleichen) und Ankreuzen & Durchstreichen (gemischte Bilder in einem Kasten, gr\u00f6\u00dfere und kleinere Gruppe markieren).',
    },
    {
      question: 'Kann ich w\u00e4hlen, welche Vergleichsbeziehungen enthalten sind?',
      answer: 'Ja. Per Checkbox k\u00f6nnen Sie Gr\u00f6\u00dfer als, Kleiner als, Gleich oder jede Kombination einschlie\u00dfen. So erstellen Sie fokussierte oder umfassende Arbeitsbl\u00e4tter.',
    },
    {
      question: 'Was ist der Ankreuzen & Durchstreichen Modus?',
      answer: 'Ankreuzen & Durchstreichen zeigt 8\u201320 gemischte Bilder zweier Typen in einem Kasten. Sch\u00fcler z\u00e4hlen jeden Typ und markieren die gr\u00f6\u00dfere Gruppe (Haken) und die kleinere (Kreuz). Erfordert Z\u00e4hlen, Verfolgen und Vergleichen in einer \u00dcbung.',
    },
    {
      question: 'Kann ich illustrierte Symbole statt >, <, = verwenden?',
      answer: 'Ja. Wechseln Sie zwischen illustrierten Vergleichssymbolen (kindgerechte Grafiken) und mathematischen Standardzeichen. Illustrierte Symbole eignen sich f\u00fcr j\u00fcngere Lernende.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel generiert?',
      answer: 'Ja. Jedes Arbeitsblatt generiert einen passenden L\u00f6sungsschl\u00fcssel mit korrekt ausgef\u00fcllten Vergleichszeichen. Export als separate Datei in JPEG und PDF.',
    },
    {
      question: 'Wie viele Themen sind verf\u00fcgbar?',
      answer: 'Das Full Access Pack enth\u00e4lt alle 104 Bildthemen. Das Commercial Pack enth\u00e4lt eine kuratierte Auswahl beliebter Themen. Beide erlauben eigene Bild-Uploads.',
    },
    {
      question: 'Kann ich die erstellten Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz f\u00fcr Etsy, Amazon KDP, Teachers Pay Teachers und jede Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen Commercial Pack und Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt den Generator mit kommerzieller Lizenz, beliebte Themen und alle 11 Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang und alle Updates. Beide sind Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich es vor dem Kauf testen?',
      answer: 'Ja. Alle Modi, Themen und Einstellungen funktionieren in der kostenlosen Version \u2014 nur mit Wasserzeichen auf Exporten. Testen Sie alle drei Vergleichsmodi.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Die Oberfl\u00e4che unterst\u00fctzt 11 Sprachen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch. Vergleichs-Arbeitsbl\u00e4tter sind visuell und funktionieren sprachunabh\u00e4ngig.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.',
    },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app', anchorText: 'Additions-Arbeitsblatt Generator' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraktions-Arbeitsblatt Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Diagramm Z\u00e4hlen & Ausmalen Generator' },
    { slug: 'number-tracing', pageType: 'app', anchorText: 'Zahlen-Nachspuren Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Generator' },
    { slug: 'more-less', pageType: 'tool', anchorText: 'Mehr oder Weniger Generator kostenlos testen' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Mathe & Zahlen Bundle \\u2014 Sparen Sie bei allen Mathe-Generatoren' },
    { slug: 'create-math-workbooks', pageType: 'guide', anchorText: 'So erstellen Sie Mathe-Arbeitshefte' },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: 'Kindergarten Druckvorlagen Nischen-Ideen' },
  ],
};
`);

console.log('more-less.ts done');
