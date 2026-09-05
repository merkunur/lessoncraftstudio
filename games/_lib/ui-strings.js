/* ============================================================
   ui-strings.js  —  Shared interface text for all games
   LessonCraft Studio
   ------------------------------------------------------------
   These are the words that appear in EVERY game: buttons,
   praise messages, score labels. They are written once here
   and reused, so "Try again" is worded identically in all
   200 games.

   Do NOT put game-specific content here (questions, answers,
   animal names). Those belong in each game's own file.

   Languages:
     en  English      de  German        fr  French
     es  Spanish (Latin America)        pt  Portuguese (Brazil)
     it  Italian      nl  Dutch         sv  Swedish
     no  Norwegian (Bokmal)             da  Danish
     fi  Finnish

   All translations use the informal "you" (du / tu / tu / je),
   which is correct when addressing children in every one
   of these languages.
   ============================================================ */

const UI_STRINGS = {

  en: {
    start: "Start",  play: "Play",  play_again: "Play again",
    next: "Next",  back: "Back",  menu: "Menu",  home: "Home",
    continue: "Continue",  close: "Close",  settings: "Settings",
    language: "Language",  sound_on: "Sound on",  sound_off: "Sound off",
    help: "Help",  how_to_play: "How to play",  loading: "Loading...",
    correct: "Correct!",  try_again: "Try again",  almost: "Almost!",
    well_done: "Well done!",  great_job: "Great job!",  excellent: "Excellent!",
    keep_going: "Keep going!",  nice_try: "Nice try!",  you_did_it: "You did it!",
    score: "Score",  level: "Level",  question: "Question",
    question_x_of_y: "Question {n} of {total}",
    progress: "Progress",  finished: "Finished!",  all_done: "All done!",
    your_score: "Your score",  stars: "Stars",
    choose_answer: "Choose the right answer",  tap_to_choose: "Tap to choose",
    drag_here: "Drag it here",  match_the_pairs: "Match the pairs",
    sort_them: "Put them in order",  listen_carefully: "Listen carefully",
    look_carefully: "Look carefully",  read_the_question: "Read the question",
    choose_another_game: "Choose another game",  more_games: "More games",
    yes: "Yes",  no: "No",  ok: "OK",  restart: "Start over",
    pause: "Pause",  resume: "Keep playing"
  },

  de: {
    start: "Start",  play: "Spielen",  play_again: "Nochmal spielen",
    next: "Weiter",  back: "Zurück",  menu: "Menü",  home: "Startseite",
    continue: "Fortsetzen",  close: "Schließen",  settings: "Einstellungen",
    language: "Sprache",  sound_on: "Ton an",  sound_off: "Ton aus",
    help: "Hilfe",  how_to_play: "So wird gespielt",  loading: "Lädt ...",
    correct: "Richtig!",  try_again: "Versuch es nochmal",  almost: "Fast!",
    well_done: "Gut gemacht!",  great_job: "Super gemacht!",  excellent: "Ausgezeichnet!",
    keep_going: "Weiter so!",  nice_try: "Guter Versuch!",  you_did_it: "Du hast es geschafft!",
    score: "Punkte",  level: "Level",  question: "Frage",
    question_x_of_y: "Frage {n} von {total}",
    progress: "Fortschritt",  finished: "Fertig!",  all_done: "Alles geschafft!",
    your_score: "Deine Punkte",  stars: "Sterne",
    choose_answer: "Wähle die richtige Antwort",  tap_to_choose: "Tippe zum Auswählen",
    drag_here: "Zieh es hierher",  match_the_pairs: "Finde die Paare",
    sort_them: "Bring sie in die richtige Reihenfolge",  listen_carefully: "Hör gut zu",
    look_carefully: "Schau genau hin",  read_the_question: "Lies die Frage",
    choose_another_game: "Wähle ein anderes Spiel",  more_games: "Mehr Spiele",
    yes: "Ja",  no: "Nein",  ok: "OK",  restart: "Von vorne",
    pause: "Pause",  resume: "Weiterspielen"
  },

  fr: {
    start: "Commencer",  play: "Jouer",  play_again: "Rejouer",
    next: "Suivant",  back: "Retour",  menu: "Menu",  home: "Accueil",
    continue: "Continuer",  close: "Fermer",  settings: "Réglages",
    language: "Langue",  sound_on: "Son activé",  sound_off: "Son coupé",
    help: "Aide",  how_to_play: "Comment jouer",  loading: "Chargement ...",
    correct: "Correct !",  try_again: "Essaie encore",  almost: "Presque !",
    well_done: "Bravo !",  great_job: "Très bien !",  excellent: "Excellent !",
    keep_going: "Continue comme ça !",  nice_try: "Bien essayé !",  you_did_it: "Tu as réussi !",
    score: "Score",  level: "Niveau",  question: "Question",
    question_x_of_y: "Question {n} sur {total}",
    progress: "Progression",  finished: "Terminé !",  all_done: "C'est fini !",
    your_score: "Ton score",  stars: "Étoiles",
    choose_answer: "Choisis la bonne réponse",  tap_to_choose: "Touche pour choisir",
    drag_here: "Fais glisser ici",  match_the_pairs: "Associe les paires",
    sort_them: "Mets-les dans l'ordre",  listen_carefully: "Écoute bien",
    look_carefully: "Regarde bien",  read_the_question: "Lis la question",
    choose_another_game: "Choisis un autre jeu",  more_games: "Plus de jeux",
    yes: "Oui",  no: "Non",  ok: "OK",  restart: "Recommencer",
    pause: "Pause",  resume: "Reprendre"
  },

  es: {
    start: "Empezar",  play: "Jugar",  play_again: "Jugar otra vez",
    next: "Siguiente",  back: "Atrás",  menu: "Menú",  home: "Inicio",
    continue: "Continuar",  close: "Cerrar",  settings: "Ajustes",
    language: "Idioma",  sound_on: "Sonido activado",  sound_off: "Sonido apagado",
    help: "Ayuda",  how_to_play: "Cómo jugar",  loading: "Cargando ...",
    correct: "¡Correcto!",  try_again: "Inténtalo otra vez",  almost: "¡Casi!",
    well_done: "¡Muy bien!",  great_job: "¡Excelente trabajo!",  excellent: "¡Excelente!",
    keep_going: "¡Sigue así!",  nice_try: "¡Buen intento!",  you_did_it: "¡Lo lograste!",
    score: "Puntos",  level: "Nivel",  question: "Pregunta",
    question_x_of_y: "Pregunta {n} de {total}",
    progress: "Progreso",  finished: "¡Terminado!",  all_done: "¡Todo listo!",
    your_score: "Tus puntos",  stars: "Estrellas",
    choose_answer: "Elige la respuesta correcta",  tap_to_choose: "Toca para elegir",
    drag_here: "Arrástralo aquí",  match_the_pairs: "Une las parejas",
    sort_them: "Ponlos en orden",  listen_carefully: "Escucha con atención",
    look_carefully: "Mira con atención",  read_the_question: "Lee la pregunta",
    choose_another_game: "Elige otro juego",  more_games: "Más juegos",
    yes: "Sí",  no: "No",  ok: "OK",  restart: "Empezar de nuevo",
    pause: "Pausa",  resume: "Seguir jugando"
  },

  pt: {
    start: "Começar",  play: "Jogar",  play_again: "Jogar de novo",
    next: "Próximo",  back: "Voltar",  menu: "Menu",  home: "Início",
    continue: "Continuar",  close: "Fechar",  settings: "Configurações",
    language: "Idioma",  sound_on: "Som ligado",  sound_off: "Som desligado",
    help: "Ajuda",  how_to_play: "Como jogar",  loading: "Carregando ...",
    correct: "Certo!",  try_again: "Tente de novo",  almost: "Quase!",
    well_done: "Muito bem!",  great_job: "Ótimo trabalho!",  excellent: "Excelente!",
    keep_going: "Continue assim!",  nice_try: "Boa tentativa!",  you_did_it: "Você conseguiu!",
    score: "Pontos",  level: "Nível",  question: "Pergunta",
    question_x_of_y: "Pergunta {n} de {total}",
    progress: "Progresso",  finished: "Terminou!",  all_done: "Tudo pronto!",
    your_score: "Seus pontos",  stars: "Estrelas",
    choose_answer: "Escolha a resposta certa",  tap_to_choose: "Toque para escolher",
    drag_here: "Arraste até aqui",  match_the_pairs: "Ligue os pares",
    sort_them: "Coloque em ordem",  listen_carefully: "Escute com atenção",
    look_carefully: "Olhe com atenção",  read_the_question: "Leia a pergunta",
    choose_another_game: "Escolha outro jogo",  more_games: "Mais jogos",
    yes: "Sim",  no: "Não",  ok: "OK",  restart: "Começar de novo",
    pause: "Pausa",  resume: "Continuar jogando"
  },

  it: {
    start: "Inizia",  play: "Gioca",  play_again: "Gioca ancora",
    next: "Avanti",  back: "Indietro",  menu: "Menu",  home: "Home",
    continue: "Continua",  close: "Chiudi",  settings: "Impostazioni",
    language: "Lingua",  sound_on: "Audio acceso",  sound_off: "Audio spento",
    help: "Aiuto",  how_to_play: "Come si gioca",  loading: "Caricamento ...",
    correct: "Giusto!",  try_again: "Riprova",  almost: "Quasi!",
    well_done: "Bravo!",  great_job: "Ottimo lavoro!",  excellent: "Eccellente!",
    keep_going: "Continua così!",  nice_try: "Bel tentativo!",  you_did_it: "Ce l'hai fatta!",
    score: "Punti",  level: "Livello",  question: "Domanda",
    question_x_of_y: "Domanda {n} di {total}",
    progress: "Progresso",  finished: "Finito!",  all_done: "Tutto fatto!",
    your_score: "I tuoi punti",  stars: "Stelle",
    choose_answer: "Scegli la risposta giusta",  tap_to_choose: "Tocca per scegliere",
    drag_here: "Trascina qui",  match_the_pairs: "Abbina le coppie",
    sort_them: "Mettili in ordine",  listen_carefully: "Ascolta bene",
    look_carefully: "Guarda bene",  read_the_question: "Leggi la domanda",
    choose_another_game: "Scegli un altro gioco",  more_games: "Altri giochi",
    yes: "Sì",  no: "No",  ok: "OK",  restart: "Ricomincia",
    pause: "Pausa",  resume: "Riprendi a giocare"
  },

  nl: {
    start: "Start",  play: "Spelen",  play_again: "Nog een keer",
    next: "Verder",  back: "Terug",  menu: "Menu",  home: "Home",
    continue: "Doorgaan",  close: "Sluiten",  settings: "Instellingen",
    language: "Taal",  sound_on: "Geluid aan",  sound_off: "Geluid uit",
    help: "Hulp",  how_to_play: "Hoe speel je",  loading: "Laden ...",
    correct: "Goed!",  try_again: "Probeer nog eens",  almost: "Bijna!",
    well_done: "Goed gedaan!",  great_job: "Knap gedaan!",  excellent: "Uitstekend!",
    keep_going: "Ga zo door!",  nice_try: "Goed geprobeerd!",  you_did_it: "Het is gelukt!",
    score: "Punten",  level: "Niveau",  question: "Vraag",
    question_x_of_y: "Vraag {n} van {total}",
    progress: "Voortgang",  finished: "Klaar!",  all_done: "Helemaal klaar!",
    your_score: "Jouw punten",  stars: "Sterren",
    choose_answer: "Kies het goede antwoord",  tap_to_choose: "Tik om te kiezen",
    drag_here: "Sleep het hierheen",  match_the_pairs: "Zoek de paren",
    sort_them: "Zet ze op volgorde",  listen_carefully: "Luister goed",
    look_carefully: "Kijk goed",  read_the_question: "Lees de vraag",
    choose_another_game: "Kies een ander spel",  more_games: "Meer spellen",
    yes: "Ja",  no: "Nee",  ok: "OK",  restart: "Opnieuw beginnen",
    pause: "Pauze",  resume: "Verder spelen"
  },

  sv: {
    start: "Starta",  play: "Spela",  play_again: "Spela igen",
    next: "Nästa",  back: "Tillbaka",  menu: "Meny",  home: "Hem",
    continue: "Fortsätt",  close: "Stäng",  settings: "Inställningar",
    language: "Språk",  sound_on: "Ljud på",  sound_off: "Ljud av",
    help: "Hjälp",  how_to_play: "Så spelar du",  loading: "Laddar ...",
    correct: "Rätt!",  try_again: "Försök igen",  almost: "Nästan!",
    well_done: "Bra jobbat!",  great_job: "Jättebra!",  excellent: "Utmärkt!",
    keep_going: "Fortsätt så!",  nice_try: "Bra försök!",  you_did_it: "Du klarade det!",
    score: "Poäng",  level: "Nivå",  question: "Fråga",
    question_x_of_y: "Fråga {n} av {total}",
    progress: "Framsteg",  finished: "Klart!",  all_done: "Allt klart!",
    your_score: "Dina poäng",  stars: "Stjärnor",
    choose_answer: "Välj rätt svar",  tap_to_choose: "Tryck för att välja",
    drag_here: "Dra hit",  match_the_pairs: "Para ihop",
    sort_them: "Sätt dem i rätt ordning",  listen_carefully: "Lyssna noga",
    look_carefully: "Titta noga",  read_the_question: "Läs frågan",
    choose_another_game: "Välj ett annat spel",  more_games: "Fler spel",
    yes: "Ja",  no: "Nej",  ok: "OK",  restart: "Börja om",
    pause: "Paus",  resume: "Fortsätt spela"
  },

  no: {
    start: "Start",  play: "Spill",  play_again: "Spill igjen",
    next: "Neste",  back: "Tilbake",  menu: "Meny",  home: "Hjem",
    continue: "Fortsett",  close: "Lukk",  settings: "Innstillinger",
    language: "Språk",  sound_on: "Lyd på",  sound_off: "Lyd av",
    help: "Hjelp",  how_to_play: "Slik spiller du",  loading: "Laster ...",
    correct: "Riktig!",  try_again: "Prøv igjen",  almost: "Nesten!",
    well_done: "Bra jobba!",  great_job: "Kjempebra!",  excellent: "Utmerket!",
    keep_going: "Fortsett sånn!",  nice_try: "Godt forsøk!",  you_did_it: "Du klarte det!",
    score: "Poeng",  level: "Nivå",  question: "Spørsmål",
    question_x_of_y: "Spørsmål {n} av {total}",
    progress: "Framgang",  finished: "Ferdig!",  all_done: "Alt ferdig!",
    your_score: "Dine poeng",  stars: "Stjerner",
    choose_answer: "Velg riktig svar",  tap_to_choose: "Trykk for å velge",
    drag_here: "Dra hit",  match_the_pairs: "Finn parene",
    sort_them: "Sett dem i riktig rekkefølge",  listen_carefully: "Lytt godt",
    look_carefully: "Se godt etter",  read_the_question: "Les spørsmålet",
    choose_another_game: "Velg et annet spill",  more_games: "Flere spill",
    yes: "Ja",  no: "Nei",  ok: "OK",  restart: "Start på nytt",
    pause: "Pause",  resume: "Fortsett å spille"
  },

  da: {
    start: "Start",  play: "Spil",  play_again: "Spil igen",
    next: "Næste",  back: "Tilbage",  menu: "Menu",  home: "Hjem",
    continue: "Fortsæt",  close: "Luk",  settings: "Indstillinger",
    language: "Sprog",  sound_on: "Lyd til",  sound_off: "Lyd fra",
    help: "Hjælp",  how_to_play: "Sådan spiller du",  loading: "Indlæser ...",
    correct: "Rigtigt!",  try_again: "Prøv igen",  almost: "Næsten!",
    well_done: "Godt klaret!",  great_job: "Flot arbejde!",  excellent: "Fremragende!",
    keep_going: "Bliv ved!",  nice_try: "Godt forsøgt!",  you_did_it: "Du klarede det!",
    score: "Point",  level: "Niveau",  question: "Spørgsmål",
    question_x_of_y: "Spørgsmål {n} af {total}",
    progress: "Fremskridt",  finished: "Færdig!",  all_done: "Det hele er klaret!",
    your_score: "Dine point",  stars: "Stjerner",
    choose_answer: "Vælg det rigtige svar",  tap_to_choose: "Tryk for at vælge",
    drag_here: "Træk herhen",  match_the_pairs: "Find parrene",
    sort_them: "Sæt dem i rækkefølge",  listen_carefully: "Lyt godt efter",
    look_carefully: "Kig godt efter",  read_the_question: "Læs spørgsmålet",
    choose_another_game: "Vælg et andet spil",  more_games: "Flere spil",
    yes: "Ja",  no: "Nej",  ok: "OK",  restart: "Start forfra",
    pause: "Pause",  resume: "Spil videre"
  },

  fi: {
    start: "Aloita",  play: "Pelaa",  play_again: "Pelaa uudestaan",
    next: "Seuraava",  back: "Takaisin",  menu: "Valikko",  home: "Etusivu",
    continue: "Jatka",  close: "Sulje",  settings: "Asetukset",
    language: "Kieli",  sound_on: "Äänet päällä",  sound_off: "Äänet pois",
    help: "Ohje",  how_to_play: "Näin pelaat",  loading: "Ladataan ...",
    correct: "Oikein!",  try_again: "Yritä uudestaan",  almost: "Melkein!",
    well_done: "Hyvin tehty!",  great_job: "Loistavaa!",  excellent: "Erinomaista!",
    keep_going: "Jatka samaan malliin!",  nice_try: "Hyvä yritys!",  you_did_it: "Sinä onnistuit!",
    score: "Pisteet",  level: "Taso",  question: "Kysymys",
    question_x_of_y: "Kysymys {n}/{total}",
    progress: "Edistyminen",  finished: "Valmis!",  all_done: "Kaikki valmista!",
    your_score: "Pisteesi",  stars: "Tähdet",
    choose_answer: "Valitse oikea vastaus",  tap_to_choose: "Napauta valitaksesi",
    drag_here: "Vedä tähän",  match_the_pairs: "Yhdistä parit",
    sort_them: "Laita ne järjestykseen",  listen_carefully: "Kuuntele tarkkaan",
    look_carefully: "Katso tarkkaan",  read_the_question: "Lue kysymys",
    choose_another_game: "Valitse toinen peli",  more_games: "Lisää pelejä",
    yes: "Kyllä",  no: "Ei",  ok: "OK",  restart: "Aloita alusta",
    pause: "Tauko",  resume: "Jatka pelaamista"
  }

};

/* Language names, each written in its own language.
   Used for the language picker menu. */
const LANGUAGE_NAMES = {
  en: "English",     de: "Deutsch",    fr: "Français",
  es: "Español",     pt: "Português",  it: "Italiano",
  nl: "Nederlands",  sv: "Svenska",    no: "Norsk",
  da: "Dansk",       fi: "Suomi"
};

/* The order languages appear in the picker. */
const LANGUAGE_ORDER = ["en","de","fr","it","es","pt","nl","sv","da","no","fi"];
