const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
function w(name, content) { fs.writeFileSync(path.join(dir, name), content, 'utf8'); console.log('Created ' + name); }

// 8. prepositions.ts
w('prepositions.ts', `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'prepositions',
  locale: 'de',
  category: 'literacy',

  seo: {
    titleTag: 'Pr\u00e4positionen Generator | Raumbegriffe Arbeitsbl\u00e4tter Gratis',
    metaDescription: 'Erstellen Sie Pr\u00e4positions-Arbeitsbl\u00e4tter mit L\u00fcckentext und Multiple-Choice. Objekte auf Formen, 104 Themen, L\u00f6sungsschl\u00fcssel. Kostenloser Generator mit PDF-Export.',
    primaryKeyword: 'Pr\u00e4positionen Arbeitsblatt Generator',
    secondaryKeywords: [
      'Pr\u00e4positionen Arbeitsbl\u00e4tter mit Bildern',
      'Raumbegriffe Arbeitsbl\u00e4tter',
      'Pr\u00e4positions\u00fcbungen Grundschule',
      'Lagebeziehungen Arbeitsbl\u00e4tter',
      'Pr\u00e4positionen \u00dcbungen druckbar',
    ],
    lsiKeywords: [
      'in auf unter neben Arbeitsbl\u00e4tter',
      'r\u00e4umliche Sprache \u00dcbungen',
      'Raumwahrnehmung Arbeitsbl\u00e4tter',
      'Ortspr\u00e4positionen \u00dcbungen',
      'DaF Pr\u00e4positionen',
      'Grammatik Arbeitsbl\u00e4tter Vorschule',
      'Lagebezeichnungen Aktivit\u00e4ten',
      'Wo ist es Arbeitsbl\u00e4tter',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/prepositions/prepositions_worksheet (1).jpeg',
      primaryAlt: 'Pr\u00e4positions-Arbeitsblatt mit Objekten in, auf, unter und neben Formen',
      secondary: '/samples/english/prepositions/prepositions_worksheet (2).jpeg',
      secondaryAlt: 'Multiple-Choice Pr\u00e4positions-Arbeitsblatt mit Bildhinweisen',
    },
    sampleGallery: [
      { src: '/samples/english/prepositions/prepositions_worksheet (3).jpeg', alt: 'L\u00fcckentext Pr\u00e4positions-Arbeitsblatt mit Tierthema', caption: 'L\u00fcckentext-Modus' },
      { src: '/samples/english/prepositions/prepositions_worksheet (4).jpeg', alt: 'Multiple-Choice Pr\u00e4position mit Lebensmittelbildern', caption: 'Multiple-Choice Modus' },
      { src: '/samples/english/prepositions/prepositions_worksheet (5).jpeg', alt: 'Pr\u00e4positions-Arbeitsblatt mit 8 \u00dcbungen und Fahrzeugthema', caption: '8 \u00dcbungen pro Seite' },
      { src: '/samples/english/prepositions/prepositions_worksheet (6).jpeg', alt: 'Pr\u00e4positions-Arbeitsblatt mit dekorativem Rahmen', caption: 'Eigener Hintergrund und Rahmen' },
      { src: '/samples/english/prepositions/prepositions_worksheet (7).jpeg', alt: 'Pr\u00e4positions-Arbeitsblatt im Querformat', caption: 'Querformat-Option' },
      { src: '/samples/english/prepositions/prepositions_worksheet (8).jpeg', alt: 'Pr\u00e4positionen L\u00f6sungsschl\u00fcssel mit korrekten Pr\u00e4positionen', caption: 'Automatischer L\u00f6sungsschl\u00fcssel' },
    ],
    youtubeId: 'ifIXbViR5_o',
    videoTitle: 'So erstellen Sie Pr\u00e4positions-Arbeitsbl\u00e4tter',
  },

  hero: {
    title: 'Pr\u00e4positionen Generator',
    tagline: 'Wo ist die Katze? Visuelle Pr\u00e4positions\u00fcbungen mit Objekten, Formen und r\u00e4umlichem Denken',
    description: \`Pr\u00e4positionen sind abstrakt, bis Kinder sie sehen k\u00f6nnen. \\u201eDie Katze ist AUF dem Kasten\\u201c bedeutet nichts, bis ein Sch\u00fcler ein Bild einer Katze auf einem Kasten betrachtet und die r\u00e4umliche Beziehung mit dem Wort verbindet. Der Pr\u00e4positionen Generator erstellt genau diese visuellen \u00dcbungen und paart Objektbilder mit Formenbildern.

Zwei \u00dcbungsmodi zielen auf verschiedene F\u00e4higkeitsstufen. L\u00fcckentext zeigt ein Bild eines Objekts relativ zu einer Form und fragt Sch\u00fcler, die korrekte Pr\u00e4position zu schreiben. Multiple-Choice zeigt dasselbe Bild mit Antwortoptionen zum Ankreuzen \\u2014 reduziert die kognitive Belastung f\u00fcr j\u00fcngere oder DaF-Lernende.

Das duale Bildbibliotheks-System hebt diesen Generator hervor. Eine Bibliothek liefert Objektbilder (Tiere, Lebensmittel, Fahrzeuge), eine separate liefert Formen-/Beh\u00e4lterbilder (K\u00e4sten, Tische, Regale). Der Generator platziert Objekte in r\u00e4umlicher Beziehung zu Formen.

Eigene Beschreibungsfelder f\u00fcr Anweisungen, der Canvas-Editor f\u00fcr Titel und Rahmen, und 11 Sprachen mit lokalisierten Pr\u00e4positionsbegriffen. Testen Sie es jetzt kostenlos.\`,
  },

  howItWorks: {
    title: 'Erstellen Sie ein Pr\u00e4positions-Arbeitsblatt in 5 Schritten',
    steps: [
      {
        title: '\u00dcbungsmodus w\u00e4hlen',
        description: 'W\u00e4hlen Sie L\u00fcckentext f\u00fcr offene Antworten oder Multiple-Choice f\u00fcr geleitete Auswahl. Beide Modi zeigen Objekte relativ zu Formen positioniert.',
      },
      {
        title: 'Objekt- und Formenbilder w\u00e4hlen',
        description: 'W\u00e4hlen Sie Objektbilder (Tiere, Lebensmittel, Fahrzeuge) aus einer Bibliothek und Formen-/Beh\u00e4lterbilder aus einer anderen. Manuell f\u00fcr Kontrolle oder \\u201eAlle Themen\\u201c f\u00fcr zuf\u00e4llige Kombinationen. 1\\u20138 \u00dcbungen pro Seite.',
      },
      {
        title: 'Anweisungen anpassen',
        description: 'Bearbeiten Sie das Beschreibungsfeld f\u00fcr spezifische Anweisungen wie \\u201eSchreibe die richtige Pr\u00e4position\\u201c oder \\u201eKreise die richtige Antwort ein\\u201c. Die Beschreibung erscheint auf dem Arbeitsblatt.',
      },
      {
        title: 'Layout gestalten',
        description: 'W\u00e4hlen Sie Seitengr\u00f6\u00dfe, Ausrichtung und Schriftart. F\u00fcgen Sie Text, Hintergr\u00fcnde und Rahmen mit dem Canvas-Editor hinzu. Name-/Datumsfelder f\u00fcr den Unterricht.',
      },
      {
        title: 'Exportieren und Drucken',
        description: 'Laden Sie Arbeitsblatt und L\u00f6sungsschl\u00fcssel als JPEG oder PDF herunter. Der L\u00f6sungsschl\u00fcssel zeigt korrekt ausgef\u00fcllte Pr\u00e4positionen. Graustufen f\u00fcr tinteneffizienten Druck.',
      },
    ],
  },

  features: [
    {
      title: 'L\u00fcckentext und Multiple-Choice Modi',
      description: 'L\u00fcckentext testet Abruf und Produktion. Multiple-Choice testet Wiedererkennung mit geringerer Belastung. L\u00fcckentext f\u00fcr Tests, Multiple-Choice f\u00fcr \u00dcbung oder DaF-Unterst\u00fctzung.',
    },
    {
      title: 'Duales Bildbibliotheks-System',
      description: 'Zwei separate Bildbibliotheken arbeiten zusammen. Die Objektbibliothek liefert Gegenst\u00e4nde (Tiere, Lebensmittel). Die Formenbibliothek liefert Beh\u00e4lter und Fl\u00e4chen (K\u00e4sten, Tische, Regale). Der Generator positioniert Objekte relativ zu Formen.',
    },
    {
      title: 'Manuelle oder zuf\u00e4llige Bildpaarung',
      description: 'W\u00e4hlen Sie bestimmte Objekte und Formen f\u00fcr kontrollierten Wortschatz oder nutzen Sie \\u201eAlle Themen\\u201c f\u00fcr zuf\u00e4llige Paarung mit automatischer Variation.',
    },
    {
      title: 'Eigenes Beschreibungsfeld',
      description: 'Bearbeiten Sie den Anweisungstext auf dem Arbeitsblatt. Passen Sie ihn an den \u00dcbungstyp an: \\u201eSchreibe die richtige Pr\u00e4position\\u201c oder \\u201eKreise das richtige Bild ein\\u201c.',
    },
    {
      title: '1\\u20138 \u00dcbungen pro Arbeitsblatt',
      description: 'Stellen Sie die Aufgabenanzahl von 1 bis 8 ein. Weniger \u00dcbungen erm\u00f6glichen gr\u00f6\u00dfere Bilder f\u00fcr j\u00fcngere Lernende. Mehr \u00dcbungen maximieren die \u00dcbungsdichte.',
    },
    {
      title: '11-Sprachen Pr\u00e4positions-Unterst\u00fctzung',
      description: 'Pr\u00e4positionsbegriffe sind \u00fcber alle 11 Sprachen lokalisiert. Deutsch verwendet \\u201ein, auf, unter, neben\\u201c. Jede Sprache bietet kulturell angemessenen r\u00e4umlichen Wortschatz.',
    },
    {
      title: 'Vollst\u00e4ndiger Canvas-Editor',
      description: 'F\u00fcgen Sie Text-Overlays hinzu, \u00e4ndern Sie Farben, wenden Sie Hintergr\u00fcnde und Rahmen an. Ebenensteuerung, Ausrichtung, Zoom und R\u00fcckg\u00e4ngig f\u00fcr professionelle Arbeitsbl\u00e4tter.',
    },
    {
      title: 'Automatisch generierter L\u00f6sungsschl\u00fcssel',
      description: 'Jedes Arbeitsblatt generiert einen L\u00f6sungsschl\u00fcssel mit korrekt ausgef\u00fcllten Pr\u00e4positionen. Export als JPEG oder PDF mit optionalem Graustufen-Druck.',
    },
  ],

  businessUseCases: [
    {
      title: 'DaF Pr\u00e4positions-Pakete f\u00fcr Etsy erstellen',
      description: 'B\u00fcndeln Sie Pr\u00e4positions-Arbeitsbl\u00e4tter f\u00fcr Deutsch als Fremdsprache. Pakete nach Pr\u00e4positionsgruppen: \\u201eIn, Auf, Unter\\u201c f\u00fcr Anf\u00e4nger, \\u201eHinter, Zwischen, Neben\\u201c f\u00fcr Fortgeschrittene.',
      platform: 'Etsy',
    },
    {
      title: 'Grammatik-Aktivit\u00e4tenb\u00fccher auf Amazon KDP erstellen',
      description: 'Stellen Sie Pr\u00e4positions-Arbeitsbl\u00e4tter zu thematischen B\u00fcchern zusammen: \\u201eWo ist es? Pr\u00e4positions\u00fcbungen f\u00fcr die Vorschule\\u201c. L\u00fcckentext und Multiple-Choice mit L\u00f6sungsschl\u00fcsseln.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Grammatik-Ressourcen f\u00fcr TPT erstellen',
      description: 'Erstellen Sie differenzierte Pr\u00e4positions-Pakete: Multiple-Choice f\u00fcr Einsteiger, L\u00fcckentext f\u00fcr Fortgeschrittene. TPT-Lehrer suchen nach \\u201ePr\u00e4positionen Arbeitsbl\u00e4tter\\u201c nach Klassenstufe.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Mehrsprachige Pr\u00e4positions-Sets entwickeln',
      description: 'Nutzen Sie die 11-Sprachen-Unterst\u00fctzung f\u00fcr Pr\u00e4positions-Arbeitsbl\u00e4tter in verschiedenen Sprachen. Franz\u00f6sische, deutsche und spanische Pakete zielen auf Sprachkurse und bilinguale Programme.',
      platform: 'Multi-platform',
    },
    {
      title: 'R\u00e4umliches Denken Lehrplan-Module erstellen',
      description: 'Strukturieren Sie Pr\u00e4positions-Arbeitsbl\u00e4tter in ein 6-Wochen-Modul mit einer Pr\u00e4positionsgruppe pro Woche. F\u00fcr Vorschul- und Kindergartenprogramme, die strukturierten Grammatikunterricht ben\u00f6tigen.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'Welche \u00dcbungsmodi sind verf\u00fcgbar?',
      answer: 'Zwei Modi: L\u00fcckentext (Sch\u00fcler schreiben die Pr\u00e4position) und Multiple-Choice (Sch\u00fcler kreisen die richtige Antwort ein). Beide nutzen visuelle Szenen mit Objekten relativ zu Formen.',
    },
    {
      question: 'Wie funktioniert das duale Bildbibliotheks-System?',
      answer: 'Eine Bibliothek liefert Objektbilder (Tiere, Lebensmittel, Fahrzeuge), eine andere Formen-/Beh\u00e4lterbilder. Der Generator positioniert Objekte relativ zu Formen f\u00fcr visuelle Pr\u00e4positions\u00fcbungen.',
    },
    {
      question: 'Welche Pr\u00e4positionen werden abgedeckt?',
      answer: 'G\u00e4ngige Ortspr\u00e4positionen wie in, auf, unter, neben, hinter, zwischen, vor, \u00fcber, darunter und bei. Die verf\u00fcgbaren Pr\u00e4positionen h\u00e4ngen von der gew\u00e4hlten Sprache ab.',
    },
    {
      question: 'Wie viele \u00dcbungen passen auf eine Seite?',
      answer: '1 bis 8 \u00dcbungen pro Arbeitsblatt. Weniger \u00dcbungen erzeugen gr\u00f6\u00dfere Bilder f\u00fcr j\u00fcngere Lernende. Mehr \u00dcbungen maximieren die \u00dcbungsdichte pro gedruckter Seite.',
    },
    {
      question: 'Werden L\u00f6sungsschl\u00fcssel generiert?',
      answer: 'Ja. Jedes Arbeitsblatt generiert einen L\u00f6sungsschl\u00fcssel mit korrekt ausgef\u00fcllten Pr\u00e4positionen. Beide als JPEG und PDF exportierbar.',
    },
    {
      question: 'Welche Sprachen werden unterst\u00fctzt?',
      answer: 'Alle 11 Sprachen mit vollst\u00e4ndig lokalisierten Pr\u00e4positionsbegriffen: Englisch, Deutsch, Franz\u00f6sisch, Spanisch, Portugiesisch, Italienisch, Niederl\u00e4ndisch, Schwedisch, D\u00e4nisch, Norwegisch und Finnisch.',
    },
    {
      question: 'Kann ich die Arbeitsbl\u00e4tter verkaufen?',
      answer: 'Ja. Sowohl das Commercial Pack ($27) als auch das Full Access Pack ($47) enthalten eine kommerzielle Lizenz. Verkaufen Sie auf Etsy, Amazon KDP, TPT und jeder Plattform.',
    },
    {
      question: 'Was ist der Unterschied zwischen Commercial Pack und Full Access Pack?',
      answer: 'Das Commercial Pack ($27) enth\u00e4lt Generator, kommerzielle Lizenz, beliebte Themen und alle Sprachen. Das Full Access Pack ($47) bietet zus\u00e4tzlich alle 104 Themen, bevorzugten Zugang und Updates. Beide Einmalk\u00e4ufe.',
    },
    {
      question: 'Kann ich es kostenlos testen?',
      answer: 'Ja. Beide Modi, alle Themen und Einstellungen funktionieren kostenlos \\u2014 nur mit Wasserzeichen. Keine Anmeldung erforderlich.',
    },
    {
      question: 'Wie ist Ihre R\u00fcckerstattungsrichtlinie?',
      answer: 'Alle Verk\u00e4ufe sind endg\u00fcltig aufgrund der digitalen Natur des Produkts. Sobald ein Lizenzschl\u00fcssel geliefert und aktiviert wurde, kann er nicht zur\u00fcckgegeben werden. Testen Sie zuerst die kostenlose Version.',
    },
  ],

  internalLinks: [
    { slug: 'writing', pageType: 'app', anchorText: 'Schreib-Generator' },
    { slug: 'alphabet-train', pageType: 'app', anchorText: 'Alphabet-Zug Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Wortr\u00e4tsel Generator' },
    { slug: 'big-small', pageType: 'app', anchorText: 'Gro\u00df & Klein Generator' },
    { slug: 'matching', pageType: 'app', anchorText: 'Zuordnungs-Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Wortsuche Generator' },
    { slug: 'prepositions', pageType: 'tool', anchorText: 'Pr\u00e4positionen Generator kostenlos testen' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Buchstaben & W\u00f6rter Bundle \\u2014 Sparen Sie bei allen Lese-Generatoren' },
    { slug: 'foreign-language-printable-ideas', pageType: 'idea', anchorText: 'Fremdsprachen-Druckvorlagen Ideen' },
    { slug: 'create-esl-worksheets', pageType: 'guide', anchorText: 'So erstellen Sie DaF-Arbeitsbl\u00e4tter' },
  ],
};
`);

console.log('prepositions done');
