/**
 * The words on the children's class page (/c/<code>), in the 11 languages (en = US, es = Mexico, pt = Brazil).
 *
 * Few on purpose: the page is used by children who may not read yet — a child finds their PICTURE, the teacher
 * says which worksheet to tap. Every sentence is one a five-year-old can be read aloud. `{n}` = a seat number.
 * Native review: docs/daily-teaching-system/PART-9-DESIGN.md §6.
 */
export interface ChildStrings {
  /** over the seat grid */
  pick: string;
  /** over the child's worksheets */
  work: string;
  /** the button that goes back to the seat grid */
  switchChild: string;
  /** a seat in a numbers-only class, for a screen reader */
  number: string;
  stateNew: string;
  stateDone: string;
  stateRest: string;
  restTitle: string;
  restBody: string;
  masteredTitle: string;
  masteredBody: string;
  emptyWork: string;
  emptySeats: string;
  askTeacher: string;
  inactive: string;
  notFound: string;
  error: string;
  loading: string;
  back: string;
  /** the one line for adults at the foot of the page: a link to the privacy section "Classes and results" */
  privacy: string;
}

export const CHILD_STRINGS: Record<string, ChildStrings> = {
  en: {
    pick: 'Tap your picture', work: 'Tap a worksheet', switchChild: 'Not me', number: 'Number {n}',
    stateNew: 'Not started', stateDone: 'Done', stateRest: 'Done for today',
    restTitle: 'That is all for today!', restBody: 'You can do more another day.',
    masteredTitle: 'You finished this one!', masteredBody: 'Pick another worksheet.',
    emptyWork: 'Nothing to do here yet.', emptySeats: 'This class has no children yet.', askTeacher: 'Please ask your teacher.',
    inactive: 'This class link is not open right now.', notFound: 'This class link does not exist.',
    error: 'That did not work. Tap to try again.', loading: 'One moment…', back: 'Back',
    privacy: 'Privacy',
  },
  de: {
    pick: 'Tippe auf dein Bild', work: 'Tippe auf ein Arbeitsblatt', switchChild: 'Das bin ich nicht', number: 'Nummer {n}',
    stateNew: 'Noch nicht angefangen', stateDone: 'Fertig', stateRest: 'Fertig für heute',
    restTitle: 'Das war alles für heute!', restBody: 'An einem anderen Tag geht es weiter.',
    masteredTitle: 'Das hast du geschafft!', masteredBody: 'Such dir ein anderes Arbeitsblatt aus.',
    emptyWork: 'Hier gibt es noch nichts zu tun.', emptySeats: 'In dieser Klasse ist noch kein Kind.', askTeacher: 'Bitte frag deine Lehrerin oder deinen Lehrer.',
    inactive: 'Dieser Klassenlink ist gerade nicht geöffnet.', notFound: 'Diesen Klassenlink gibt es nicht.',
    error: 'Das hat nicht geklappt. Tippe und versuch es noch einmal.', loading: 'Einen Moment …', back: 'Zurück',
    privacy: 'Datenschutz',
  },
  fr: {
    pick: 'Touche ton image', work: 'Touche une fiche', switchChild: 'Ce n’est pas moi', number: 'Numéro {n}',
    stateNew: 'Pas commencée', stateDone: 'Terminée', stateRest: 'Terminée pour aujourd’hui',
    restTitle: 'C’est tout pour aujourd’hui !', restBody: 'Tu pourras continuer un autre jour.',
    masteredTitle: 'Tu as terminé cette fiche !', masteredBody: 'Choisis une autre fiche.',
    emptyWork: 'Il n’y a encore rien à faire ici.', emptySeats: 'Il n’y a pas encore d’élèves dans cette classe.', askTeacher: 'Demande à ta maîtresse ou à ton maître.',
    inactive: 'Ce lien de classe n’est pas ouvert pour le moment.', notFound: 'Ce lien de classe n’existe pas.',
    error: 'Ça n’a pas marché. Touche pour réessayer.', loading: 'Un instant…', back: 'Retour',
    privacy: 'Confidentialité',
  },
  es: {
    pick: 'Toca tu dibujo', work: 'Toca una hoja de trabajo', switchChild: 'No soy yo', number: 'Número {n}',
    stateNew: 'Sin empezar', stateDone: 'Terminada', stateRest: 'Terminada por hoy',
    restTitle: '¡Es todo por hoy!', restBody: 'Puedes seguir otro día.',
    masteredTitle: '¡Terminaste esta hoja!', masteredBody: 'Elige otra hoja de trabajo.',
    emptyWork: 'Aquí todavía no hay nada que hacer.', emptySeats: 'Todavía no hay niños en este grupo.', askTeacher: 'Pregúntale a tu maestra o maestro.',
    inactive: 'Este enlace del grupo no está abierto en este momento.', notFound: 'Este enlace del grupo no existe.',
    error: 'No funcionó. Toca para intentarlo de nuevo.', loading: 'Un momento…', back: 'Regresar',
    privacy: 'Privacidad',
  },
  pt: {
    pick: 'Toque na sua figura', work: 'Toque em uma atividade', switchChild: 'Não sou eu', number: 'Número {n}',
    stateNew: 'Não começou', stateDone: 'Terminada', stateRest: 'Terminada por hoje',
    restTitle: 'É tudo por hoje!', restBody: 'Você pode continuar outro dia.',
    masteredTitle: 'Você terminou esta atividade!', masteredBody: 'Escolha outra atividade.',
    emptyWork: 'Ainda não há nada para fazer aqui.', emptySeats: 'Ainda não há crianças nesta turma.', askTeacher: 'Peça ajuda à sua professora ou ao seu professor.',
    inactive: 'Este link da turma não está aberto agora.', notFound: 'Este link da turma não existe.',
    error: 'Não deu certo. Toque para tentar de novo.', loading: 'Um momento…', back: 'Voltar',
    privacy: 'Privacidade',
  },
  it: {
    pick: 'Tocca la tua figura', work: 'Tocca una scheda', switchChild: 'Non sono io', number: 'Numero {n}',
    stateNew: 'Non iniziata', stateDone: 'Finita', stateRest: 'Finita per oggi',
    restTitle: 'Per oggi è tutto!', restBody: 'Puoi continuare un altro giorno.',
    masteredTitle: 'Hai finito questa scheda!', masteredBody: 'Scegli un’altra scheda.',
    emptyWork: 'Qui non c’è ancora niente da fare.', emptySeats: 'In questa classe non ci sono ancora bambini.', askTeacher: 'Chiedi alla tua maestra o al tuo maestro.',
    inactive: 'Questo link della classe non è aperto in questo momento.', notFound: 'Questo link della classe non esiste.',
    error: 'Non ha funzionato. Tocca per riprovare.', loading: 'Un momento…', back: 'Indietro',
    privacy: 'Privacy',
  },
  nl: {
    pick: 'Tik op jouw plaatje', work: 'Tik op een werkblad', switchChild: 'Dat ben ik niet', number: 'Nummer {n}',
    stateNew: 'Nog niet begonnen', stateDone: 'Klaar', stateRest: 'Klaar voor vandaag',
    restTitle: 'Dat was alles voor vandaag!', restBody: 'Op een andere dag kun je verder.',
    masteredTitle: 'Dit werkblad heb je af!', masteredBody: 'Kies een ander werkblad.',
    emptyWork: 'Hier is nog niets te doen.', emptySeats: 'Er zitten nog geen kinderen in deze klas.', askTeacher: 'Vraag het aan je juf of meester.',
    inactive: 'Deze klaslink is nu niet open.', notFound: 'Deze klaslink bestaat niet.',
    error: 'Dat lukte niet. Tik om het nog eens te proberen.', loading: 'Even wachten…', back: 'Terug',
    privacy: 'Privacy',
  },
  sv: {
    pick: 'Tryck på din bild', work: 'Tryck på ett arbetsblad', switchChild: 'Det är inte jag', number: 'Nummer {n}',
    stateNew: 'Inte börjat', stateDone: 'Klart', stateRest: 'Klart för i dag',
    restTitle: 'Det var allt för i dag!', restBody: 'Du kan fortsätta en annan dag.',
    masteredTitle: 'Du är klar med det här!', masteredBody: 'Välj ett annat arbetsblad.',
    emptyWork: 'Här finns inget att göra än.', emptySeats: 'Det finns inga barn i den här klassen än.', askTeacher: 'Fråga din lärare.',
    inactive: 'Den här klasslänken är inte öppen just nu.', notFound: 'Den här klasslänken finns inte.',
    error: 'Det gick inte. Tryck för att försöka igen.', loading: 'Ett ögonblick …', back: 'Tillbaka',
    privacy: 'Integritet',
  },
  da: {
    pick: 'Tryk på dit billede', work: 'Tryk på et arbejdsark', switchChild: 'Det er ikke mig', number: 'Nummer {n}',
    stateNew: 'Ikke begyndt', stateDone: 'Færdig', stateRest: 'Færdig for i dag',
    restTitle: 'Det var alt for i dag!', restBody: 'Du kan fortsætte en anden dag.',
    masteredTitle: 'Du er færdig med den her!', masteredBody: 'Vælg et andet arbejdsark.',
    emptyWork: 'Her er ikke noget at lave endnu.', emptySeats: 'Der er ingen børn i denne klasse endnu.', askTeacher: 'Spørg din lærer.',
    inactive: 'Dette klasselink er ikke åbent lige nu.', notFound: 'Dette klasselink findes ikke.',
    error: 'Det virkede ikke. Tryk for at prøve igen.', loading: 'Et øjeblik …', back: 'Tilbage',
    privacy: 'Privatliv',
  },
  no: {
    pick: 'Trykk på bildet ditt', work: 'Trykk på et arbeidsark', switchChild: 'Det er ikke meg', number: 'Nummer {n}',
    stateNew: 'Ikke begynt', stateDone: 'Ferdig', stateRest: 'Ferdig for i dag',
    restTitle: 'Det var alt for i dag!', restBody: 'Du kan fortsette en annen dag.',
    masteredTitle: 'Du er ferdig med denne!', masteredBody: 'Velg et annet arbeidsark.',
    emptyWork: 'Her er det ikke noe å gjøre ennå.', emptySeats: 'Det er ingen barn i denne klassen ennå.', askTeacher: 'Spør læreren din.',
    inactive: 'Denne klasselenken er ikke åpen akkurat nå.', notFound: 'Denne klasselenken finnes ikke.',
    error: 'Det gikk ikke. Trykk for å prøve igjen.', loading: 'Et øyeblikk …', back: 'Tilbake',
    privacy: 'Personvern',
  },
  fi: {
    pick: 'Napauta omaa kuvaasi', work: 'Napauta tehtävää', switchChild: 'En ole minä', number: 'Numero {n}',
    stateNew: 'Ei aloitettu', stateDone: 'Valmis', stateRest: 'Valmis tältä päivältä',
    restTitle: 'Siinä kaikki tältä päivältä!', restBody: 'Voit jatkaa toisena päivänä.',
    masteredTitle: 'Sait tämän valmiiksi!', masteredBody: 'Valitse toinen tehtävä.',
    emptyWork: 'Täällä ei ole vielä mitään tehtävää.', emptySeats: 'Tässä luokassa ei ole vielä lapsia.', askTeacher: 'Kysy opettajalta.',
    inactive: 'Tämä luokan linkki ei ole juuri nyt auki.', notFound: 'Tätä luokan linkkiä ei ole olemassa.',
    error: 'Se ei onnistunut. Napauta ja yritä uudelleen.', loading: 'Hetkinen…', back: 'Takaisin',
    privacy: 'Tietosuoja',
  },
};
