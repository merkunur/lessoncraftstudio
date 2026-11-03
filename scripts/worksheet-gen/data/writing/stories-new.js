/**
 * data/writing/stories-new.js — the Stories & Writing maker's new templates' own words (2026-11-02, NEW-TEMPLATES §49),
 * literals per locale, read by a native + pedagogy review. All six templates are open writing: nothing here is an answer.
 *   STORY     story-map boxes and their prompts (G1-506): beginning · problem · middle · end
 *   ROLL      roll-a-story column heads (G1-508) and six PROBLEMS to roll (cue words, not sentences)
 *   PLACES    six pictured places to roll (vocab keys; the word under the picture is the vocabulary's)
 *   DESCRIBE  starters for describing a character (G1-509), "my character" — never a pronoun the child's animal would
 *             have to agree with; ___ = a blank to write on
 *   POSTCARD  greeting and closing (G1-510): the informal forms a 6-8-year-old writes to family, not gendered where the
 *             language would make them so (de Hallo, fr Bonjour, es ¡Hola!)
 */
'use strict';
const NN = ' ';
const STORY = {
  en: { beginning: 'Beginning', middle: 'Middle', end: 'End', problem: 'Problem', pBeginning: 'Who is in the story? Where are they?', pMiddle: 'What happens?', pEnd: 'How does it end?', pProblem: 'What goes wrong?' },
  de: { beginning: 'Anfang', middle: 'Mitte', end: 'Ende', problem: 'Problem', pBeginning: 'Wer kommt vor? Wo spielt die Geschichte?', pMiddle: 'Was passiert?', pEnd: 'Wie geht es aus?', pProblem: 'Was geht schief?' },
  fr: { beginning: 'Début', middle: 'Milieu', end: 'Fin', problem: 'Problème', pBeginning: `Qui est dans l'histoire${NN}? Où sont-ils${NN}?`, pMiddle: `Que se passe-t-il${NN}?`, pEnd: `Comment l'histoire finit-elle${NN}?`, pProblem: `Quel est le problème${NN}?` },
  es: { beginning: 'Inicio', middle: 'Desarrollo', end: 'Final', problem: 'Problema', pBeginning: '¿Quiénes están en el cuento? ¿Dónde están?', pMiddle: '¿Qué pasa?', pEnd: '¿Cómo termina?', pProblem: '¿Qué sale mal?' },
  pt: { beginning: 'Início', middle: 'Meio', end: 'Fim', problem: 'Problema', pBeginning: 'Quem está na história? Onde estão?', pMiddle: 'O que acontece?', pEnd: 'Como termina?', pProblem: 'O que dá errado?' },
  it: { beginning: 'Inizio', middle: 'Svolgimento', end: 'Fine', problem: 'Problema', pBeginning: 'Chi c\'è nella storia? Dove sono?', pMiddle: 'Che cosa succede?', pEnd: 'Come finisce?', pProblem: 'Che cosa va storto?' },
  nl: { beginning: 'Begin', middle: 'Midden', end: 'Eind', problem: 'Probleem', pBeginning: 'Wie komen er in het verhaal voor? Waar zijn ze?', pMiddle: 'Wat gebeurt er?', pEnd: 'Hoe loopt het af?', pProblem: 'Wat gaat er mis?' },
  sv: { beginning: 'Början', middle: 'Mitten', end: 'Slutet', problem: 'Problemet', pBeginning: 'Vem är med i berättelsen? Var är de?', pMiddle: 'Vad händer?', pEnd: 'Hur slutar det?', pProblem: 'Vad går fel?' },
  da: { beginning: 'Begyndelse', middle: 'Midte', end: 'Slutning', problem: 'Problem', pBeginning: 'Hvem er med i historien? Hvor er de?', pMiddle: 'Hvad sker der?', pEnd: 'Hvordan ender det?', pProblem: 'Hvad går galt?' },
  no: { beginning: 'Begynnelsen', middle: 'Midten', end: 'Slutten', problem: 'Problemet', pBeginning: 'Hvem er med i fortellingen? Hvor er de?', pMiddle: 'Hva skjer?', pEnd: 'Hvordan slutter det?', pProblem: 'Hva går galt?' },
  fi: { beginning: 'Alku', middle: 'Keskikohta', end: 'Loppu', problem: 'Ongelma', pBeginning: 'Keitä tarinassa on? Missä he ovat?', pMiddle: 'Mitä tapahtuu?', pEnd: 'Miten tarina päättyy?', pProblem: 'Mikä menee pieleen?' },
};
const ROLL = {
  en: { who: 'Who?', where: 'Where?', problem: 'What happens?' }, de: { who: 'Wer?', where: 'Wo?', problem: 'Was passiert?' },
  fr: { who: `Qui${NN}?`, where: `Où${NN}?`, problem: `Que se passe-t-il${NN}?` }, es: { who: '¿Quién?', where: '¿Dónde?', problem: '¿Qué pasa?' },
  pt: { who: 'Quem?', where: 'Onde?', problem: 'O que acontece?' }, it: { who: 'Chi?', where: 'Dove?', problem: 'Che cosa succede?' },
  nl: { who: 'Wie?', where: 'Waar?', problem: 'Wat gebeurt er?' }, sv: { who: 'Vem?', where: 'Var?', problem: 'Vad händer?' },
  da: { who: 'Hvem?', where: 'Hvor?', problem: 'Hvad sker der?' }, no: { who: 'Hvem?', where: 'Hvor?', problem: 'Hva skjer?' },
  fi: { who: 'Kuka?', where: 'Missä?', problem: 'Mitä tapahtuu?' },
};
const PROBLEMS = {
  en: ['lost', 'very hungry', 'a big storm', 'a lost ball', 'stuck in a tree', 'a broken toy'],
  de: ['verlaufen', 'großer Hunger', 'ein Sturm', 'der Ball ist weg', 'sitzt auf dem Baum fest', 'das Spielzeug ist kaputt'],
  fr: ['se perd', 'très faim', 'un orage', 'le ballon a disparu', 'ne peut plus descendre de l\'arbre', 'un jouet cassé'],
  es: ['no encuentra el camino', 'mucha hambre', 'una tormenta', 'la pelota se perdió', 'no puede bajar del árbol', 'un juguete roto'],
  pt: ['se perdeu', 'muita fome', 'uma tempestade', 'a bola sumiu', 'não consegue descer da árvore', 'um brinquedo quebrado'],
  it: ['non trova la strada', 'tanta fame', 'un temporale', 'la palla è sparita', 'non riesce a scendere dall\'albero', 'un giocattolo rotto'],
  nl: ['verdwaald', 'veel honger', 'een storm', 'de bal is weg', 'vast in een boom', 'het speelgoed is kapot'],
  sv: ['vilse', 'jättehungrig', 'en storm', 'bollen är borta', 'fast i ett träd', 'en trasig leksak'],
  da: ['faret vild', 'meget sulten', 'en storm', 'bolden er væk', 'sidder fast i et træ', 'legetøjet er gået i stykker'],
  no: ['gått seg vill', 'veldig sulten', 'en storm', 'ballen er borte', 'sitter fast i et tre', 'en ødelagt leke'],
  fi: ['eksyksissä', 'kova nälkä', 'myrsky', 'pallo katosi', 'jumissa puussa', 'rikkinäinen lelu'],
};
const PLACES = ['house', 'beach', 'forest', 'mountain', 'ship', 'rocket'];
const DESCRIBE = {
  en: ["My character's name is ___.", 'My character is ___ and ___.', 'My character likes ___.', 'My character lives in ___.'],
  de: ['Meine Figur heißt ___.', 'Meine Figur ist ___ und ___.', 'Meine Figur mag ___.', 'Meine Figur wohnt ___.'],
  fr: ["Mon personnage s'appelle ___.", 'Mon personnage est ___ et ___.', 'Mon personnage aime ___.', 'Mon personnage habite ___.'],
  es: ['Mi personaje se llama ___.', 'Mi personaje es ___ y ___.', 'A mi personaje le gusta ___.', 'Mi personaje vive ___.'],
  pt: ['Meu personagem se chama ___.', 'Meu personagem é ___ e ___.', 'Meu personagem gosta de ___.', 'Meu personagem mora ___.'],
  it: ['Il mio personaggio si chiama ___.', 'Il mio personaggio è ___ e ___.', 'Al mio personaggio piace ___.', 'Il mio personaggio vive ___.'],
  nl: ['Mijn personage heet ___.', 'Mijn personage is ___ en ___.', 'Mijn personage houdt van ___.', 'Mijn personage woont ___.'],
  sv: ['Min figur heter ___.', 'Min figur är ___ och ___.', 'Min figur tycker om ___.', 'Min figur bor ___.'],
  da: ['Min figur hedder ___.', 'Min figur er ___ og ___.', 'Min figur kan lide ___.', 'Min figur bor ___.'],
  no: ['Figuren min heter ___.', 'Figuren min er ___ og ___.', 'Figuren min liker ___.', 'Figuren min bor ___.'],
  fi: ['Hahmoni nimi on ___.', 'Hahmoni on ___ ja ___.', 'Hahmoni lempiasia on ___.', 'Hahmoni asuu ___.'],
};
const POSTCARD = {
  en: { greeting: 'Dear ___,', closing: 'Love,' }, de: { greeting: 'Hallo ___,', closing: 'Viele Grüße' },
  fr: { greeting: 'Bonjour ___,', closing: `À bientôt${NN}!` }, es: { greeting: '¡Hola, ___!', closing: 'Con cariño,' },
  pt: { greeting: 'Olá, ___!', closing: 'Um abraço,' }, it: { greeting: 'Ciao ___,', closing: 'Un abbraccio,' },
  nl: { greeting: 'Lieve ___,', closing: 'Groetjes,' }, sv: { greeting: 'Hej ___!', closing: 'Kram från' },
  da: { greeting: 'Kære ___', closing: 'Kærlig hilsen' }, no: { greeting: 'Kjære ___,', closing: 'Hilsen' },
  fi: { greeting: 'Hei ___!', closing: 'Terveisin' },
};

module.exports = { STORY, ROLL, PROBLEMS, PLACES, DESCRIBE, POSTCARD };
