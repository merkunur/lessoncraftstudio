/**
 * Maker screen text, 11 locales (en = American English, es = Mexican Spanish, pt = Brazilian Portuguese).
 * Kept short: the screen shows few words on purpose (ARCHITECTURE §4.1a F3). Every string is native-reviewed before
 * a maker ships (CLAUDE.md #2 rule); a missing key fails scripts/makers/gates/ui-strings.js.
 */
'use strict';
window.LCS_MAKER_UI = {
  en: {
    color: 'Color', blackWhite: 'Black & white',
    templates: 'Worksheets', level: 'Level', pictures: 'Pictures', word: 'Word', answerKey: 'Answer key',
    newVersion: 'New version', addPage: 'Add page', removePage: 'Remove this page', print: 'Print or save as PDF',
    paper: 'Paper', letter: 'US Letter', a4: 'A4', page: 'Page', of: 'of', loading: 'Loading…',
    notInLanguage: 'This worksheet is not available in this language yet.', failed: "This page couldn't be created. Try another setting.",
    makers: { 'ten-frames': 'Ten Frames and Tally Marks', counting: 'Counting', 'sight-words': 'Sight Words' },
  },
  de: {
    color: 'Farbe', blackWhite: 'Schwarz-weiß',
    templates: 'Arbeitsblätter', level: 'Stufe', pictures: 'Bilder', word: 'Wort', answerKey: 'Lösungen',
    newVersion: 'Neue Version', addPage: 'Seite hinzufügen', removePage: 'Seite entfernen', print: 'Drucken oder als PDF speichern',
    paper: 'Papier', letter: 'US Letter', a4: 'A4', page: 'Seite', of: 'von', loading: 'Wird geladen …',
    notInLanguage: 'Dieses Arbeitsblatt gibt es in dieser Sprache noch nicht.', failed: 'Diese Seite konnte nicht erstellt werden. Bitte eine andere Einstellung wählen.',
    makers: { 'ten-frames': 'Zehnerfelder und Strichlisten', counting: 'Zählen', 'sight-words': 'Häufige Wörter' },
  },
  fr: {
    color: 'Couleur', blackWhite: 'Noir et blanc',
    templates: 'Fiches', level: 'Niveau', pictures: 'Images', word: 'Mot', answerKey: 'Corrigé',
    newVersion: 'Nouvelle version', addPage: 'Ajouter une page', removePage: 'Supprimer la page', print: 'Imprimer ou enregistrer en PDF',
    paper: 'Papier', letter: 'Lettre US', a4: 'A4', page: 'Page', of: 'sur', loading: 'Chargement…',
    notInLanguage: 'Cette fiche n’est pas encore disponible dans cette langue.', failed: 'Impossible de créer cette page. Essayez un autre réglage.',
    makers: { 'ten-frames': 'Cadres de dix et bâtons', counting: 'Compter', 'sight-words': 'Mots-outils' },
  },
  es: {
    color: 'Color', blackWhite: 'Blanco y negro',
    templates: 'Hojas de trabajo', level: 'Nivel', pictures: 'Imágenes', word: 'Palabra', answerKey: 'Clave de respuestas',
    newVersion: 'Nueva versión', addPage: 'Agregar página', removePage: 'Quitar página', print: 'Imprimir o guardar como PDF',
    paper: 'Papel', letter: 'Carta', a4: 'A4', page: 'Página', of: 'de', loading: 'Cargando…',
    notInLanguage: 'Esta hoja todavía no está disponible en este idioma.', failed: 'No se pudo crear esta página. Prueba otra opción.',
    makers: { 'ten-frames': 'Marcos de diez y marcas de conteo', counting: 'Contar', 'sight-words': 'Palabras de uso frecuente' },
  },
  pt: {
    color: 'Colorido', blackWhite: 'Preto e branco',
    templates: 'Atividades', level: 'Nível', pictures: 'Imagens', word: 'Palavra', answerKey: 'Gabarito',
    newVersion: 'Nova versão', addPage: 'Adicionar página', removePage: 'Remover página', print: 'Imprimir ou salvar em PDF',
    paper: 'Papel', letter: 'Carta', a4: 'A4', page: 'Página', of: 'de', loading: 'Carregando…',
    notInLanguage: 'Esta atividade ainda não está disponível neste idioma.', failed: 'Não foi possível criar esta página. Tente outra opção.',
    makers: { 'ten-frames': 'Quadros de dez e tracinhos', counting: 'Contagem', 'sight-words': 'Palavras de alta frequência' },
  },
  it: {
    color: 'Colori', blackWhite: 'Bianco e nero',
    templates: 'Schede', level: 'Livello', pictures: 'Immagini', word: 'Parola', answerKey: 'Soluzioni',
    newVersion: 'Nuova versione', addPage: 'Aggiungi pagina', removePage: 'Rimuovi pagina', print: 'Stampa o salva in PDF',
    paper: 'Carta', letter: 'US Letter', a4: 'A4', page: 'Pagina', of: 'di', loading: 'Caricamento…',
    notInLanguage: 'Questa scheda non è ancora disponibile in questa lingua.', failed: 'Impossibile creare questa pagina. Prova un’altra impostazione.',
    makers: { 'ten-frames': 'Cornici del dieci e tacche', counting: 'Contare', 'sight-words': 'Parole ad alta frequenza' },
  },
  nl: {
    color: 'Kleur', blackWhite: 'Zwart-wit',
    templates: 'Werkbladen', level: 'Niveau', pictures: 'Plaatjes', word: 'Woord', answerKey: 'Antwoorden',
    newVersion: 'Nieuwe versie', addPage: 'Pagina toevoegen', removePage: 'Pagina verwijderen', print: 'Afdrukken of als pdf opslaan',
    paper: 'Papier', letter: 'US Letter', a4: 'A4', page: 'Pagina', of: 'van', loading: 'Laden…',
    notInLanguage: 'Dit werkblad is nog niet beschikbaar in deze taal.', failed: 'Deze pagina kon niet worden gemaakt. Kies een andere instelling.',
    makers: { 'ten-frames': 'Tienvakken en turven', counting: 'Tellen', 'sight-words': 'Flitswoorden' },
  },
  sv: {
    color: 'Färg', blackWhite: 'Svartvitt',
    templates: 'Arbetsblad', level: 'Nivå', pictures: 'Bilder', word: 'Ord', answerKey: 'Facit',
    newVersion: 'Ny version', addPage: 'Lägg till sida', removePage: 'Ta bort sidan', print: 'Skriv ut eller spara som pdf',
    paper: 'Papper', letter: 'US Letter', a4: 'A4', page: 'Sida', of: 'av', loading: 'Laddar …',
    notInLanguage: 'Det här arbetsbladet finns inte på det här språket än.', failed: 'Sidan kunde inte skapas. Prova en annan inställning.',
    makers: { 'ten-frames': 'Tiorutor och streck', counting: 'Räkna', 'sight-words': 'Högfrekventa ord' },
  },
  da: {
    color: 'Farve', blackWhite: 'Sort-hvid',
    templates: 'Opgaveark', level: 'Niveau', pictures: 'Billeder', word: 'Ord', answerKey: 'Facitliste',
    newVersion: 'Ny version', addPage: 'Tilføj side', removePage: 'Fjern siden', print: 'Udskriv eller gem som pdf',
    paper: 'Papir', letter: 'US Letter', a4: 'A4', page: 'Side', of: 'af', loading: 'Indlæser …',
    notInLanguage: 'Dette opgaveark findes ikke på dette sprog endnu.', failed: 'Siden kunne ikke laves. Prøv en anden indstilling.',
    makers: { 'ten-frames': 'Tierrammer og tællestreger', counting: 'Tælling', 'sight-words': 'Højfrekvente ord' },
  },
  no: {
    color: 'Farge', blackWhite: 'Svart-hvitt',
    templates: 'Oppgaveark', level: 'Nivå', pictures: 'Bilder', word: 'Ord', answerKey: 'Fasit',
    newVersion: 'Ny versjon', addPage: 'Legg til side', removePage: 'Fjern siden', print: 'Skriv ut eller lagre som pdf',
    paper: 'Papir', letter: 'US Letter', a4: 'A4', page: 'Side', of: 'av', loading: 'Laster inn …',
    notInLanguage: 'Dette oppgavearket finnes ikke på dette språket ennå.', failed: 'Siden kunne ikke lages. Prøv en annen innstilling.',
    makers: { 'ten-frames': 'Tierrammer og tellestreker', counting: 'Telling', 'sight-words': 'Høyfrekvente ord' },
  },
  fi: {
    color: 'Värikuvat', blackWhite: 'Mustavalkoiset',
    templates: 'Tehtävämonisteet', level: 'Taso', pictures: 'Kuvat', word: 'Sana', answerKey: 'Vastaukset',
    newVersion: 'Uusi versio', addPage: 'Lisää sivu', removePage: 'Poista sivu', print: 'Tulosta tai tallenna PDF',
    paper: 'Paperi', letter: 'US Letter', a4: 'A4', page: 'Sivu', of: '/', loading: 'Ladataan…',
    notInLanguage: 'Tätä tehtävämonistetta ei vielä ole tällä kielellä.', failed: 'Sivua ei voitu luoda. Kokeile toista asetusta.',
    makers: { 'ten-frames': 'Kymppiruudukot ja tukkimiehen kirjanpito', counting: 'Laskeminen', 'sight-words': 'Yleisimmät sanat' },
  },
};
