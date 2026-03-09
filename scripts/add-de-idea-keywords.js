#!/usr/bin/env node
/**
 * Add primaryKeyword, secondaryKeywords, and lsiKeywords to all 45 German idea content files.
 * Keywords are seller-focused, in German, and unique per file.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'de');

const KEYWORDS = {
  'back-to-school-printable-ideas': {
    primary: 'Schulanfang-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Einschulung-Arbeitsblätter für Etsy erstellen',
      'Schulanfang-Aktivitäten auf KDP verkaufen',
      'Back-to-School-Druckvorlagen auf TPT anbieten',
      'saisonale Schulstart-Produkte für Druckvorlagen-Verkäufer',
    ],
    lsi: [
      'Juli-September-Nachfragespitze Lernmaterialien',
      'Grundschul-Arbeitsblätter saisonaler Verkauf',
      'Schulbeginn-Nische Druckvorlagen-Geschäft',
    ],
  },
  'birds-printable-ideas': {
    primary: 'Vögel-Druckvorlagen-Ideen für Verkäufer',
    secondary: [
      'Vogel-Arbeitsblätter auf Etsy verkaufen',
      'Vogelarten-Lernmaterialien auf KDP erstellen',
      'Natur-Druckvorlagen mit Vogelthemen auf TPT',
      'Vogelbeobachtungs-Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'Natur-Bildungsthema Druckvorlagen-Nische',
      'Ganzjahres-Tierthema Arbeitsblätter Umsatz',
      'ornithologische Lernmaterialien Etsy-Markt',
    ],
  },
  'bulk-licensing-printable-ideas': {
    primary: 'Massenlizenzierung Arbeitsblätter Geschäftsideen',
    secondary: [
      'Volumenlizenz Druckvorlagen an Schulen verkaufen',
      'Klassensatz-Arbeitsblätter für Bildungseinrichtungen',
      'Schullizenzen für Druckvorlagen-Produkte erstellen',
      'institutionelle Preisgestaltung Arbeitsblatt-Verkäufer',
    ],
    lsi: [
      'B2B-Druckvorlagen-Vertrieb Bildungssektor',
      'Volumenlizenz-Preismodelle Arbeitsblätter',
      'Schullizenz-Geschäftsmodell Druckvorlagen',
    ],
  },
  'camping-printable-ideas': {
    primary: 'Camping-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Camping-Arbeitsblätter auf Etsy erstellen',
      'Outdoor-Aktivitätsblätter auf KDP verkaufen',
      'Natur-Druckvorlagen Camping-Thema für TPT',
      'Sommerlager-Arbeitsblätter für Druckvorlagen-Verkäufer',
    ],
    lsi: [
      'saisonal-plus-evergreen Outdoor-Nische',
      'Campingplatz-Lernmaterialien Etsy-Markt',
      'Wandern-Natur-Thema Arbeitsblatt-Geschäft',
    ],
  },
  'christmas-printable-ideas': {
    primary: 'Weihnachts-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Weihnachts-Arbeitsblätter auf Etsy erstellen',
      'Advents-Aktivitätsblätter auf KDP verkaufen',
      'saisonale Weihnachts-Druckvorlagen für TPT',
      'Weihnachtszeit-Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'Adventszeit-Nachfragespitze Druckvorlagen',
      'Winter-Festtags-Nische Arbeitsblatt-Umsatz',
      'Dezember-Saison Lernmaterialien Etsy-Verkauf',
    ],
  },
  'construction-printable-ideas': {
    primary: 'Baustellen-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Baufahrzeug-Arbeitsblätter auf Etsy erstellen',
      'Werkzeug-Baustellen-Druckvorlagen auf KDP verkaufen',
      'Bagger-und-Kran-Aktivitätsblätter für TPT',
      'Baustellen-Thema Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'Jungen-Lieblingsthema Druckvorlagen-Nische',
      'Fahrzeuge-Werkzeuge Lernmaterialien Etsy',
      'Baustellen-Bildungsthema Arbeitsblatt-Markt',
    ],
  },
  'custom-worksheet-service-ideas': {
    primary: 'maßgeschneiderte Arbeitsblatt-Services verkaufen',
    secondary: [
      'individuelle Lernmaterialien auf Etsy anbieten',
      'Freelance-Arbeitsblatt-Erstellung als Service',
      'Premium-Druckvorlagen auf Bestellung erstellen',
      'personalisierte Arbeitsblätter für Bildungskunden',
    ],
    lsi: [
      'Auftragsfertigung Druckvorlagen-Service',
      'Premium-Preisgestaltung individuelle Arbeitsblätter',
      'maßgeschneiderte Lernmaterialien Geschäftsmodell',
    ],
  },
  'digital-download-printable-ideas': {
    primary: 'digitale Download-Arbeitsblatt-Ideen verkaufen',
    secondary: [
      'sofort lieferbare Lern-PDFs auf Etsy erstellen',
      'Digital-Download-Druckvorlagen auf Gumroad verkaufen',
      'druckfertige Arbeitsblätter ohne Lagerhaltung anbieten',
      'digitale Bildungsprodukte auf TPT und Etsy',
    ],
    lsi: [
      'lagerloses Druckvorlagen-Geschäftsmodell',
      'sofortige Lieferung digitale Lernmaterialien',
      'PDF-Arbeitsblätter passives Einkommen online',
    ],
  },
  'dinosaur-printable-ideas': {
    primary: 'Dinosaurier-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Dino-Arbeitsblätter auf Etsy erstellen',
      'Dinosaurier-Aktivitätsblätter auf KDP verkaufen',
      'Urzeit-Druckvorlagen für Kinder auf TPT',
      'Dinosaurier-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Evergreen-Kinderthema Druckvorlagen-Nische',
      'Paläontologie-Bildungsthema Arbeitsblätter',
      'T-Rex-Stegosaurus-Thema Lernmaterialien Etsy',
    ],
  },
  'easter-printable-ideas': {
    primary: 'Ostern-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Oster-Arbeitsblätter auf Etsy erstellen',
      'Frühlings-Ostern-Aktivitätsblätter auf KDP',
      'saisonale Oster-Druckvorlagen auf TPT verkaufen',
      'Osterhase-Thema Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'Frühlings-Saison Osternachfrage Druckvorlagen',
      'März-April-Verkaufsspitze Lernmaterialien',
      'Oster-Nische saisonaler Arbeitsblatt-Markt',
    ],
  },
  'esl-printable-ideas': {
    primary: 'ESL-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Sprachlern-Arbeitsblätter auf Etsy erstellen',
      'ESL-Vokabel-Druckvorlagen auf TPT verkaufen',
      'visuell unterstützte Sprachübungen auf KDP',
      'Fremdsprachen-Arbeitsblätter für Druckvorlagen-Verkäufer',
    ],
    lsi: [
      'wachsender Sprachlernmarkt Druckvorlagen',
      'Vokabel-Bildkarten Arbeitsblätter ESL-Nische',
      'mehrsprachige Lernmaterialien Etsy-Geschäft',
    ],
  },
  'fairy-tale-printable-ideas': {
    primary: 'Märchen-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Märchen-Arbeitsblätter auf Etsy erstellen',
      'Geschichtenbuch-Druckvorlagen auf KDP verkaufen',
      'Märchenthema-Aktivitätsblätter für TPT',
      'klassische Märchen-Lernmaterialien für Shops',
    ],
    lsi: [
      'zeitlose Erzählthemen Druckvorlagen-Nische',
      'Lesekompetenz Märchenthema Arbeitsblätter',
      'Fantasie-Bildungsthema Lernmaterialien Etsy',
    ],
  },
  'farm-animals-printable-ideas': {
    primary: 'Bauernhoftiere-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Bauernhof-Arbeitsblätter auf Etsy erstellen',
      'Nutztier-Aktivitätsblätter auf KDP verkaufen',
      'Bauernhof-Thema Druckvorlagen auf TPT anbieten',
      'Kuh-Schwein-Huhn Arbeitsblätter für Verkäufer',
    ],
    lsi: [
      'frühkindliche Bildung Tierthema Druckvorlagen',
      'Bauernhof-Nische Ganzjahres-Lernmaterialien',
      'Vorschul-Lieblingsthema Arbeitsblatt-Markt',
    ],
  },
  'first-grade-printable-ideas': {
    primary: 'Erste-Klasse-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Erstklässler-Arbeitsblätter auf Etsy erstellen',
      'Grundschul-Lernmaterialien auf KDP verkaufen',
      'erste Klasse Druckvorlagen auf TPT anbieten',
      'Schulanfänger-Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'Grundschul-Klassenstufe Arbeitsblatt-Nische',
      'altersgerechte Lernmaterialien Erst-Klasse',
      'Lehrplan-Arbeitsblätter Grundschule Etsy-Markt',
    ],
  },
  'food-cooking-printable-ideas': {
    primary: 'Essen-und-Koch-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Koch-Arbeitsblätter auf Etsy erstellen',
      'Lebensmittel-Aktivitätsblätter auf KDP verkaufen',
      'Küchen-Thema Druckvorlagen auf TPT anbieten',
      'Rezept-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Ernährungs-Bildungsthema Druckvorlagen-Nische',
      'Kochen-Lebensmittel Arbeitsblätter Etsy-Markt',
      'Hauswirtschaft-Thema Lernmaterialien Verkauf',
    ],
  },
  'forest-animals-printable-ideas': {
    primary: 'Waldtier-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Waldtier-Arbeitsblätter auf Etsy erstellen',
      'Wald-Tierwelt-Druckvorlagen auf KDP verkaufen',
      'Fuchs-Hirsch-Eule Aktivitätsblätter für TPT',
      'Wald-Natur-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Naturthema Druckvorlagen Ganzjahres-Nische',
      'Waldtiere-Bildungsthema Arbeitsblatt-Markt',
      'Fuchs-Bär-Reh Lernmaterialien Etsy-Verkauf',
    ],
  },
  'halloween-printable-ideas': {
    primary: 'Halloween-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'gruselige Arbeitsblätter auf Etsy erstellen',
      'Halloween-Aktivitätsblätter auf KDP verkaufen',
      'Oktober-Druckvorlagen auf TPT anbieten',
      'Kürbis-Geister-Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'Oktober-Nachfragespitze saisonale Druckvorlagen',
      'gruseliges Thema Arbeitsblätter Etsy-Markt',
      'Halloween-Saison Lernmaterialien Verkauf',
    ],
  },
  'homeschool-printable-ideas': {
    primary: 'Heimunterricht-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Homeschool-Arbeitsblätter auf Etsy erstellen',
      'Lehrplan-Druckvorlagen auf KDP verkaufen',
      'Heimunterricht-Aktivitätsblätter für TPT',
      'häuslicher Unterricht Lernmaterialien für Shops',
    ],
    lsi: [
      'wachsender Homeschool-Markt Druckvorlagen',
      'Eltern-Lehrplan Arbeitsblätter Etsy-Nische',
      'Heimunterricht-Ressourcen Druckvorlagen-Geschäft',
    ],
  },
  'insects-printable-ideas': {
    primary: 'Insekten-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Insekten-Arbeitsblätter auf Etsy erstellen',
      'Käfer-Schmetterling-Druckvorlagen auf KDP',
      'Insekten-Aktivitätsblätter auf TPT verkaufen',
      'Krabbeltier-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Naturwissenschaft-Thema Insekten-Druckvorlagen',
      'Entomologie-Bildungsthema Arbeitsblätter Etsy',
      'Frühling-Sommer-Insekten Lernmaterialien',
    ],
  },
  'kindergarten-printable-ideas': {
    primary: 'Kindergarten-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Kindergarten-Arbeitsblätter auf Etsy erstellen',
      'Vorschul-Kindergarten-Druckvorlagen auf KDP',
      'frühkindliche Aktivitätsblätter auf TPT verkaufen',
      'Kindergarten-Lernmaterialien für Etsy-Shops',
    ],
    lsi: [
      'frühkindliche Bildung Druckvorlagen-Nische',
      'Kindergarten-Klassenstufe Arbeitsblatt-Markt',
      'visuelles Lernen Vorschulalter Etsy-Verkauf',
    ],
  },
  'math-facts-printable-ideas': {
    primary: 'Mathe-Grundlagen-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Rechenflüssigkeit-Arbeitsblätter auf Etsy erstellen',
      'Mathe-Übungsblätter auf KDP verkaufen',
      'Einmaleins-Druckvorlagen auf TPT anbieten',
      'Grundrechenarten-Lernmaterialien für Verkäufer',
    ],
    lsi: [
      'immergrüner Mathematik-Markt Druckvorlagen',
      'Hochvolumen-Bildungsbereich Arbeitsblätter',
      'Rechenübungen Grundschule Etsy-Nische',
    ],
  },
  'music-printable-ideas': {
    primary: 'Musik-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Musik-Arbeitsblätter auf Etsy erstellen',
      'Instrumente-Druckvorlagen auf KDP verkaufen',
      'Musiktheorie-Aktivitätsblätter für TPT',
      'Noten-und-Rhythmus-Lernmaterialien für Shops',
    ],
    lsi: [
      'Musikunterricht-Thema Druckvorlagen-Nische',
      'Instrumente-Bildungsthema Arbeitsblätter',
      'Musikalische Früherziehung Lernmaterialien',
    ],
  },
  'ocean-animals-printable-ideas': {
    primary: 'Meerestiere-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Unterwasserwelt-Arbeitsblätter auf Etsy erstellen',
      'Meerestier-Druckvorlagen auf KDP verkaufen',
      'Ozean-Aktivitätsblätter auf TPT anbieten',
      'Wal-Delphin-Lernmaterialien für Etsy-Shops',
    ],
    lsi: [
      'Meeresbiologie-Thema Druckvorlagen-Nische',
      'Unterwasser-Bildungsthema Arbeitsblätter',
      'Ozean-Ganzjahres-Nische Lernmaterialien',
    ],
  },
  'parents-day-printable-ideas': {
    primary: 'Elterntag-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Muttertag-Arbeitsblätter auf Etsy erstellen',
      'Vatertag-Druckvorlagen auf KDP verkaufen',
      'Elterntag-Aktivitätsblätter auf TPT anbieten',
      'Familien-Feiertags-Lernmaterialien für Shops',
    ],
    lsi: [
      'saisonale Mai-Juni-Nachfrage Druckvorlagen',
      'Muttertag-Vatertag-Nische Arbeitsblätter',
      'Familienfest-Thema Lernmaterialien Etsy',
    ],
  },
  'party-supply-printable-ideas': {
    primary: 'druckbare Partyzubehör-Ideen verkaufen',
    secondary: [
      'Party-Aktivitätsblätter auf Etsy erstellen',
      'Geburtstag-Druckvorlagen auf KDP verkaufen',
      'Feier-Spiele-Arbeitsblätter für Etsy-Shops',
      'thematische Partypakete für Druckvorlagen-Verkäufer',
    ],
    lsi: [
      'Geburtstags-Nische Druckvorlagen-Geschäft',
      'Partyspiele Aktivitätsblätter Etsy-Markt',
      'Feier-Thema Lernmaterialien Verkauf',
    ],
  },
  'pets-printable-ideas': {
    primary: 'Haustier-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Hunde-Katzen-Arbeitsblätter auf Etsy erstellen',
      'Haustier-Druckvorlagen auf KDP verkaufen',
      'Kleintier-Aktivitätsblätter auf TPT anbieten',
      'Tierpflege-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Haustier-Lieblingsthema Kinder-Druckvorlagen',
      'Hund-Katze-Bildungsthema Arbeitsblätter',
      'Tierliebe Ganzjahres-Nische Etsy-Verkauf',
    ],
  },
  'physical-printable-product-ideas': {
    primary: 'physische Druckvorlagen-Produkte verkaufen',
    secondary: [
      'gedruckte Arbeitsblätter auf Etsy versenden',
      'laminierte Lernmaterialien auf Kunstmessen',
      'Premium-Druckprodukte als physische Ware',
      'Versand-Druckvorlagen Etsy-Geschäftsmodell',
    ],
    lsi: [
      'physische Produkte höhere Margen Druckvorlagen',
      'laminierte Arbeitsblätter Premium-Preise',
      'greifbare Lernmaterialien Direktvertrieb',
    ],
  },
  'pirates-printable-ideas': {
    primary: 'Piraten-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Piraten-Arbeitsblätter auf Etsy erstellen',
      'Seeräuber-Druckvorlagen auf KDP verkaufen',
      'Abenteuer-Piraten-Aktivitätsblätter für TPT',
      'Schatzkarte-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Abenteuer-Thema Druckvorlagen-Nische',
      'Piratenschiff-Bildungsthema Arbeitsblätter',
      'Schatzkarte-Thema Lernmaterialien Etsy',
    ],
  },
  'preschool-printable-ideas': {
    primary: 'Vorschule-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Vorschul-Arbeitsblätter auf Etsy erstellen',
      'frühkindliche Druckvorlagen auf KDP verkaufen',
      'Vorschulalter-Aktivitätsblätter auf TPT',
      'Vorschul-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'frühkindliche Bildung Druckvorlagen-Markt',
      'Vorschulalter visuelles Lernen Arbeitsblätter',
      'Kleinkind-Lernmaterialien Etsy-Nische',
    ],
  },
  'print-on-demand-printable-ideas': {
    primary: 'Print-on-Demand Arbeitsblatt-Ideen verkaufen',
    secondary: [
      'POD-Druckvorlagen auf Etsy erstellen',
      'gedruckte Arbeitshefte auf KDP verkaufen',
      'Print-on-Demand Aktivitätspakete auf Shopify',
      'lagerloses Druckvorlagen-Geschäft aufbauen',
    ],
    lsi: [
      'Print-on-Demand Geschäftsmodell Arbeitsblätter',
      'lagerlose Produktion Druckvorlagen-Verkauf',
      'Aktivitätshefte POD profitabel aufbauen',
    ],
  },
  'safari-animals-printable-ideas': {
    primary: 'Safaritiere-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Safari-Arbeitsblätter auf Etsy erstellen',
      'afrikanische Wildtier-Druckvorlagen auf KDP',
      'Löwe-Elefant-Giraffe Aktivitätsblätter TPT',
      'Safari-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'afrikanische Tierwelt Druckvorlagen-Nische',
      'Wildtier-Bildungsthema Arbeitsblätter Etsy',
      'Savannen-Thema Lernmaterialien Verkauf',
    ],
  },
  'second-grade-printable-ideas': {
    primary: 'Zweite-Klasse-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Zweitklässler-Arbeitsblätter auf Etsy erstellen',
      'Grundschul-Druckvorlagen zweite Klasse KDP',
      'Zweite-Klasse-Aktivitätsblätter auf TPT',
      'Klassenstufe-zwei-Lernmaterialien für Shops',
    ],
    lsi: [
      'Grundschul-Klassenstufe Druckvorlagen-Nische',
      'altersgerechte Lernmaterialien zweite Klasse',
      'Zweitklässler-Arbeitsblätter Etsy-Markt',
    ],
  },
  'space-printable-ideas': {
    primary: 'Weltraum-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Weltraum-Arbeitsblätter auf Etsy erstellen',
      'Planeten-Raketen-Druckvorlagen auf KDP',
      'STEM-Weltraum-Aktivitätsblätter auf TPT',
      'Astronomie-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'STEM-Bildungsthema Druckvorlagen-Nische',
      'Weltraum-Planeten Arbeitsblätter Etsy-Markt',
      'Raumfahrt-Thema Lernmaterialien Verkauf',
    ],
  },
  'special-education-printable-ideas': {
    primary: 'Sonderpädagogik-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'SPED-Arbeitsblätter auf Etsy erstellen',
      'angepasste Lernmaterialien auf KDP verkaufen',
      'visuelle Hilfen Sonderpädagogik auf TPT',
      'inklusive Arbeitsblätter für Druckvorlagen-Shops',
    ],
    lsi: [
      'unterversorgter SPED-Markt Druckvorlagen',
      'Förderschul-Thema Arbeitsblätter Etsy-Nische',
      'differenzierte Lernmaterialien Sonderpädagogik',
    ],
  },
  'sports-printable-ideas': {
    primary: 'Sport-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Sport-Arbeitsblätter auf Etsy erstellen',
      'Ballsport-Druckvorlagen auf KDP verkaufen',
      'Sportthema-Aktivitätsblätter auf TPT anbieten',
      'Fußball-Basketball-Lernmaterialien für Shops',
    ],
    lsi: [
      'Sportthema Ganzjahres-Druckvorlagen-Nische',
      'Bewegungs-Bildungsthema Arbeitsblätter',
      'Sport-Lernmaterialien Etsy-Markt',
    ],
  },
  'spring-printable-ideas': {
    primary: 'Frühling-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Frühlings-Arbeitsblätter auf Etsy erstellen',
      'März-Mai-Druckvorlagen auf KDP verkaufen',
      'saisonale Frühlings-Aktivitätsblätter TPT',
      'Blumen-Schmetterling-Lernmaterialien für Shops',
    ],
    lsi: [
      'Frühjahrssaison Druckvorlagen-Nachfrage',
      'saisonale Natur-Thema Arbeitsblätter Etsy',
      'Frühling-Garten Lernmaterialien Verkauf',
    ],
  },
  'subscription-box-printable-ideas': {
    primary: 'Arbeitsblatt-Abo-Box-Ideen verkaufen',
    secondary: [
      'monatliche Arbeitsblatt-Pakete auf Etsy',
      'Druckvorlagen-Abonnement auf Gumroad erstellen',
      'wiederkehrende Einnahmen mit Patreon-Bundles',
      'Abo-Geschäftsmodell für Arbeitsblatt-Verkäufer',
    ],
    lsi: [
      'wiederkehrende Einnahmen Druckvorlagen-Geschäft',
      'monatliche Bundles Abonnement-Modell',
      'Patreon-Gumroad Druckvorlagen-Abo aufbauen',
    ],
  },
  'summer-learning-printable-ideas': {
    primary: 'Sommerlernen-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Sommerbrücken-Arbeitsblätter auf Etsy erstellen',
      'Ferienlern-Druckvorlagen auf KDP verkaufen',
      'Sommerlernverlust-Aktivitätsblätter auf TPT',
      'Sommer-Lernpakete für Druckvorlagen-Verkäufer',
    ],
    lsi: [
      'Sommerlernverlust-Prävention Druckvorlagen',
      'Ferienaktivitäten Bildungsthema Arbeitsblätter',
      'Mai-August-Nachfrage Lernmaterialien Etsy',
    ],
  },
  'summer-printable-ideas': {
    primary: 'Sommer-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Sommer-Arbeitsblätter auf Etsy erstellen',
      'Strand-Ferien-Druckvorlagen auf KDP verkaufen',
      'saisonale Sommer-Aktivitätsblätter für TPT',
      'Sonnenschein-Thema Lernmaterialien für Shops',
    ],
    lsi: [
      'Sommer-Saison Druckvorlagen-Nachfrage',
      'Strand-Ferien-Nische Arbeitsblätter Etsy',
      'saisonaler Sommer-Markt Lernmaterialien',
    ],
  },
  'thanksgiving-printable-ideas': {
    primary: 'Erntedankfest-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Thanksgiving-Arbeitsblätter auf Etsy erstellen',
      'Herbst-Erntedank-Druckvorlagen auf KDP',
      'November-Feiertags-Aktivitätsblätter für TPT',
      'Truthahn-Ernte-Lernmaterialien für Shops',
    ],
    lsi: [
      'November-Nachfragespitze saisonale Druckvorlagen',
      'Erntedank-Nische Arbeitsblätter Etsy-Markt',
      'Herbst-Feiertags-Thema Lernmaterialien',
    ],
  },
  'third-grade-printable-ideas': {
    primary: 'Dritte-Klasse-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Drittklässler-Arbeitsblätter auf Etsy erstellen',
      'Grundschul-Druckvorlagen dritte Klasse KDP',
      'Dritte-Klasse-Aktivitätsblätter auf TPT',
      'Klassenstufe-drei-Lernmaterialien für Shops',
    ],
    lsi: [
      'Grundschul-Oberstufe Druckvorlagen-Nische',
      'anspruchsvollere Lernmaterialien dritte Klasse',
      'Drittklässler-Arbeitsblätter Etsy-Markt',
    ],
  },
  'transportation-printable-ideas': {
    primary: 'Fahrzeuge-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Fahrzeug-Arbeitsblätter auf Etsy erstellen',
      'Transport-Druckvorlagen auf KDP verkaufen',
      'Auto-Zug-Flugzeug-Aktivitätsblätter TPT',
      'Verkehrsmittel-Lernmaterialien für Shops',
    ],
    lsi: [
      'Fahrzeuge-Lieblingsthema Kinder-Druckvorlagen',
      'Transportmittel-Bildungsthema Arbeitsblätter',
      'Auto-Bus-Bahn Lernmaterialien Etsy-Nische',
    ],
  },
  'underwater-printable-ideas': {
    primary: 'Unterwasser-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Unterwasserwelt-Arbeitsblätter auf Etsy erstellen',
      'Ozean-Druckvorlagen auf KDP verkaufen',
      'Meereslebewesen-Aktivitätsblätter für TPT',
      'Korallen-Fisch-Lernmaterialien für Etsy-Shops',
    ],
    lsi: [
      'Unterwasser-Ozean-Nische Druckvorlagen',
      'Meeresbiologie-Thema Arbeitsblätter Etsy',
      'Unterwasserwelt Ganzjahres-Lernmaterialien',
    ],
  },
  'valentines-day-printable-ideas': {
    primary: 'Valentinstag-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Valentinstag-Arbeitsblätter auf Etsy erstellen',
      'Liebes-Herz-Druckvorlagen auf KDP verkaufen',
      'Februar-Feiertags-Aktivitätsblätter für TPT',
      'Valentinstag-Lernmaterialien für Druckvorlagen-Shops',
    ],
    lsi: [
      'Februar-Nachfragespitze saisonale Druckvorlagen',
      'Valentinstag-Nische Arbeitsblätter Etsy',
      'Liebes-Thema Lernmaterialien saisonaler Markt',
    ],
  },
  'winter-printable-ideas': {
    primary: 'Winter-Druckvorlagen-Ideen verkaufen',
    secondary: [
      'Winter-Arbeitsblätter auf Etsy erstellen',
      'Schnee-Eis-Druckvorlagen auf KDP verkaufen',
      'Kaltwetter-Aktivitätsblätter auf TPT anbieten',
      'Schneemann-Pinguin-Lernmaterialien für Shops',
    ],
    lsi: [
      'November-Februar-Nachfrage Druckvorlagen',
      'Kaltwetter-Nische Arbeitsblätter Etsy-Markt',
      'Winter-Saison Lernmaterialien Verkauf',
    ],
  },
};

// Validate we have all 45 files
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.ts')).map(f => f.replace('.ts', ''));
const missing = files.filter(f => !KEYWORDS[f]);
const extra = Object.keys(KEYWORDS).filter(k => !files.includes(k));

if (missing.length > 0) {
  console.error('Missing keyword entries for:', missing.join(', '));
  process.exit(1);
}
if (extra.length > 0) {
  console.error('Extra keyword entries (no file):', extra.join(', '));
  process.exit(1);
}

console.log(`Validated ${Object.keys(KEYWORDS).length} keyword entries for ${files.length} files.`);

// Validate keyword counts
let valErrors = 0;
for (const [slug, kw] of Object.entries(KEYWORDS)) {
  if (kw.secondary.length < 3 || kw.secondary.length > 5) {
    console.error(`${slug}: secondaryKeywords has ${kw.secondary.length} (need 3-5)`);
    valErrors++;
  }
  if (kw.lsi.length < 2 || kw.lsi.length > 3) {
    console.error(`${slug}: lsiKeywords has ${kw.lsi.length} (need 2-3)`);
    valErrors++;
  }
}
if (valErrors > 0) {
  console.error(`${valErrors} validation errors.`);
  process.exit(1);
}

// Apply keywords to each file
let applied = 0;
for (const [slug, kw] of Object.entries(KEYWORDS)) {
  const filePath = path.join(DIR, slug + '.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if keywords already exist
  if (content.includes('primaryKeyword:')) {
    console.log(`SKIP: ${slug} (already has keywords)`);
    continue;
  }

  // Build the keyword lines
  const secondaryStr = kw.secondary.map(s => `      '${s}'`).join(',\n');
  const lsiStr = kw.lsi.map(s => `      '${s}'`).join(',\n');

  const keywordBlock = `    primaryKeyword: '${kw.primary}',
    secondaryKeywords: [
${secondaryStr},
    ],
    lsiKeywords: [
${lsiStr},
    ],
    `;

  // Insert after "seo: {" line
  content = content.replace(
    /(\s*seo:\s*\{)\s*\n\s*(titleTag:)/,
    `$1\n    ${keywordBlock}$2`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`ADDED: ${slug}`);
  applied++;
}

console.log(`\n=== KEYWORD ADDITION SUMMARY ===`);
console.log(`Applied: ${applied}`);
console.log(`Total files: ${files.length}`);
