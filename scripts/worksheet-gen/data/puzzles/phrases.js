/**
 * data/puzzles/phrases.js — short child-safe sentences per language (2026-11-03, ENGINES Part 3 shared data): the hidden
 * message of a word search (G2-494: the letters left over spell one) and the Secret Code maker's messages. Kind, simple,
 * culture-neutral (no proverb, no holiday, no name); every length from about 8 to 30 letters, so a grid's free cells
 * find one. Native per language, never translated word for word. FOUND_ALL («you found all the words») is the word
 * search's alone. Reviewed 2026-11-03 (calques fixed: fr «Lire, c'est amusant», de «Wir helfen einander» …).
 */
'use strict';
const PHRASES = {
  en: ['You did it', 'Good job', 'Well done', 'Be kind', 'I like to read', 'The sun is warm', 'We are friends', 'Have a nice day', 'Reading is fun',
    'Keep trying', 'You are a star', 'Come and play outside', 'I can do it', 'Today is a good day', 'Books are fun', 'We help each other', 'The sky is blue',
    'I love my class', 'Smile and say hello', 'Thank you for helping', 'Cats like to sleep', 'Birds can fly high', 'We share our toys'],
  de: ['Gut gemacht', 'Super', 'Toll gemacht', 'Sei nett', 'Ich lese gern', 'Die Sonne ist warm', 'Wir sind Freunde', 'Einen schönen Tag', 'Lesen macht Spaß',
    'Weiter so', 'Du bist ein Star', 'Wir spielen draußen', 'Ich kann das', 'Heute ist ein guter Tag', 'Bücher sind toll', 'Wir helfen einander', 'Der Himmel ist blau',
    'Ich mag meine Klasse', 'Lächle und sag Hallo', 'Danke für deine Hilfe', 'Katzen schlafen gern', 'Vögel fliegen hoch', 'Wir teilen unser Spielzeug'],
  fr: ['Bravo', 'Bien joué', 'Très bien', 'Sois gentil', "J'aime lire", 'Le soleil est chaud', 'Nous sommes amis', 'Passe une bonne journée', "Lire, c'est amusant",
    'Continue comme ça', 'Tu es une star', 'Allons jouer dehors', "J'y arrive", "Aujourd'hui, c'est une belle journée", 'Les livres sont super', "On s'aide les uns les autres", 'Le ciel est bleu',
    "J'aime ma classe", 'Souris et dis bonjour', 'Merci pour ton aide', 'Les chats aiment dormir', 'Les oiseaux volent haut', 'Nous partageons nos jouets'],
  es: ['Lo lograste', 'Buen trabajo', 'Muy bien', 'Sé amable', 'Me gusta leer', 'El sol calienta', 'Somos amigos', 'Que tengas un buen día', 'Leer es divertido',
    'Sigue intentándolo', 'Eres una estrella', 'Vamos a jugar afuera', 'Yo puedo', 'Hoy es un buen día', 'Los libros son geniales', 'Nos ayudamos', 'El cielo es azul',
    'Quiero a mi grupo', 'Sonríe y saluda', 'Gracias por ayudar', 'A los gatos les gusta dormir', 'Los pájaros vuelan alto', 'Compartimos los juguetes'],
  pt: ['Você conseguiu', 'Bom trabalho', 'Muito bem', 'Seja gentil', 'Eu gosto de ler', 'O sol está quente', 'Somos amigos', 'Tenha um bom dia', 'Ler é divertido',
    'Continue tentando', 'Você é uma estrela', 'Vamos brincar lá fora', 'Eu consigo', 'Hoje é um bom dia', 'Os livros são legais', 'Nós nos ajudamos', 'O céu é azul',
    'Eu adoro minha turma', 'Sorria e diga oi', 'Valeu pela ajuda', 'Os gatos gostam de dormir', 'Os pássaros voam alto', 'Dividimos os brinquedos'],
  it: ["Ce l'hai fatta", 'Ottimo lavoro', 'Molto bene', 'Sii gentile', 'Mi piace leggere', 'Il sole è caldo', 'Siamo amici', 'Buona giornata', 'Leggere è bello',
    'Continua così', 'Sei una stella', 'Andiamo a giocare fuori', 'Io ce la faccio', 'Oggi è una bella giornata', 'I libri sono belli', 'Ci aiutiamo', 'Il cielo è azzurro',
    'Voglio bene alla mia classe', 'Sorridi e saluta', "Grazie per l'aiuto", 'Ai gatti piace dormire', 'Gli uccelli volano in alto', 'Condividiamo i giochi'],
  nl: ['Goed gedaan', 'Knap hoor', 'Heel goed', 'Wees lief', 'Ik lees graag', 'De zon is warm', 'Wij zijn vrienden', 'Fijne dag', 'Lezen is leuk',
    'Ga zo door', 'Jij bent een ster', 'We spelen buiten', 'Ik kan het', 'Vandaag is een fijne dag', 'Boeken zijn leuk', 'We helpen elkaar', 'De lucht is blauw',
    'Ik hou van mijn klas', 'Lach en zeg hallo', 'Bedankt voor je hulp', 'Katten slapen graag', 'Vogels vliegen hoog', 'We delen ons speelgoed'],
  sv: ['Bra jobbat', 'Snyggt', 'Mycket bra', 'Var snäll', 'Jag gillar att läsa', 'Solen är varm', 'Vi är vänner', 'Ha en fin dag', 'Det är kul att läsa',
    'Fortsätt så', 'Du är en stjärna', 'Vi leker ute', 'Jag klarar det', 'I dag är en bra dag', 'Böcker är roliga', 'Vi hjälper varandra', 'Himlen är blå',
    'Jag gillar min klass', 'Le och säg hej', 'Tack för hjälpen', 'Katter sover gärna', 'Fåglar flyger högt', 'Vi delar på leksakerna'],
  da: ['Godt gået', 'Flot', 'Rigtig godt', 'Vær sød', 'Jeg kan lide at læse', 'Solen er varm', 'Vi er venner', 'Hav en god dag', 'Det er sjovt at læse',
    'Bliv ved', 'Du er en stjerne', 'Vi leger udenfor', 'Jeg kan godt', 'I dag er en god dag', 'Bøger er sjove', 'Vi hjælper hinanden', 'Himlen er blå',
    'Jeg kan lide min klasse', 'Smil og sig hej', 'Tak for hjælpen', 'Katte kan lide at sove', 'Fugle flyver højt', 'Vi deler legetøjet'],
  no: ['Bra jobbet', 'Flott', 'Kjempebra', 'Vær snill', 'Jeg liker å lese', 'Sola er varm', 'Vi er venner', 'Ha en fin dag', 'Det er gøy å lese',
    'Fortsett sånn', 'Du er en stjerne', 'Vi leker ute', 'Jeg klarer det', 'I dag er en fin dag', 'Bøker er gøy', 'Vi hjelper hverandre', 'Himmelen er blå',
    'Jeg liker klassen min', 'Smil og si hei', 'Takk for hjelpen', 'Katter liker å sove', 'Fugler flyr høyt', 'Vi deler lekene'],
  fi: ['Hienoa', 'Hyvin tehty', 'Tosi hyvä', 'Ole kiltti', 'Tykkään lukea', 'Aurinko on lämmin', 'Me olemme ystäviä', 'Mukavaa päivää', 'Lukeminen on kivaa',
    'Jatka samaan malliin', 'Sinä olet tähti', 'Mennään ulos leikkimään', 'Minä osaan', 'Tänään on hyvä päivä', 'Kirjat ovat kivoja', 'Autamme toisiamme', 'Taivas on sininen',
    'Tykkään luokastani', 'Hymyile ja sano hei', 'Kiitos avusta', 'Kissat nukkuvat mielellään', 'Linnut lentävät korkealla', 'Jaamme lelut'],
};
// the word search's own message (G2-494 only: a code page has no words to find)
const FOUND_ALL = {
  en: 'You found all the words',
  de: 'Du hast alle Wörter gefunden',
  fr: 'Tu as trouvé tous les mots',
  es: 'Encontraste todas las palabras',
  pt: 'Você achou todas as palavras',
  it: 'Hai trovato tutte le parole',
  nl: 'Je hebt alle woorden gevonden',
  sv: 'Du hittade alla orden',
  da: 'Du fandt alle ordene',
  no: 'Du fant alle ordene',
  fi: 'Löysit kaikki sanat'
};
module.exports = { PHRASES, FOUND_ALL };
