/**
 * data/feelings/feelings-new.js — the Me, My Family & Feelings maker's new templates (2026-11-03, NEW-TEMPLATES §55),
 * native per language. The feeling WORDS and FACES are never here: they are data/b3/feelings.js (the K-319 bank: the
 * six faces a K child reads without the word, each word native-reviewed, the face pictures opened).
 *   strength  the thermometer's steps, weakest first (K-565): 3 steps, and the ends of the 5-step scale
 *   helps     the line under a thermometer: what helps me
 *   because   the reason frame of the week chart (K-564 level 3: «I felt this way because …»; neutral where the
 *             language marks gender: fr senti(e), it sentito/a — the B7 review 2026-11-03)
 *   venn      me / my friend / both (G1-531)
 *   prompts   what to compare (G1-531 levels 2-3)
 *   frames    G1-531 level 3: «We both like …» / «I like …, my friend likes …»
 */
'use strict';
const NN = ' ';

const FEELINGS_NEW = {
  en: { strength: ['a little', 'medium', 'very'], helps: 'What helps me:', because: 'I felt this way because',
    venn: { me: 'Me', friend: 'My friend', both: 'Both of us' }, prompts: ['favorite food', 'favorite color', 'pets', 'games', 'hair', 'family'],
    frames: ['We both like', 'I like', 'my friend likes'] },
  de: { strength: ['ein bisschen', 'ziemlich', 'sehr'], helps: 'Das hilft mir:', because: 'Ich habe mich so gefühlt, weil',
    venn: { me: 'Ich', friend: 'Mein Freund / meine Freundin', both: 'Wir beide' }, prompts: ['Lieblingsessen', 'Lieblingsfarbe', 'Haustiere', 'Spiele', 'Haare', 'Familie'],
    frames: ['Wir beide mögen', 'Ich mag', 'mein Freund / meine Freundin mag'] },
  fr: { strength: ['un peu', 'assez', 'très'], helps: "Ce qui m'aide" + NN + ':', because: 'Je me suis senti(e) comme ça parce que',
    venn: { me: 'Moi', friend: 'Mon ami / mon amie', both: 'Nous deux' }, prompts: ['plat préféré', 'couleur préférée', 'animaux', 'jeux', 'cheveux', 'famille'],
    frames: ['Nous aimons tous les deux', "J'aime", 'mon ami / mon amie aime'] },
  es: { strength: ['un poco', 'bastante', 'mucho'], helps: 'Lo que me ayuda:', because: 'Me sentí así porque',
    venn: { me: 'Yo', friend: 'Mi amigo / mi amiga', both: 'Los dos' }, prompts: ['comida favorita', 'color favorito', 'mascotas', 'juegos', 'cabello', 'familia'],
    frames: ['A los dos nos gusta', 'A mí me gusta', 'a mi amigo / a mi amiga le gusta'] },
  pt: { strength: ['um pouco', 'bastante', 'muito'], helps: 'O que me ajuda:', because: 'Eu me senti assim porque',
    venn: { me: 'Eu', friend: 'Meu amigo / minha amiga', both: 'Nós dois' }, prompts: ['comida favorita', 'cor favorita', 'animais de estimação', 'brincadeiras', 'cabelo', 'família'],
    frames: ['Nós dois gostamos de', 'Eu gosto de', 'meu amigo / minha amiga gosta de'] },
  it: { strength: ['un po’', 'abbastanza', 'molto'], helps: 'Che cosa mi aiuta:', because: 'Mi sono sentito/a così perché',
    venn: { me: 'Io', friend: 'Il mio amico / la mia amica', both: 'Tutti e due' }, prompts: ['cibo preferito', 'colore preferito', 'animali', 'giochi', 'capelli', 'famiglia'],
    frames: ['A tutti e due piace', 'A me piace', 'al mio amico / alla mia amica piace'] },
  nl: { strength: ['een beetje', 'best wel', 'heel erg'], helps: 'Wat mij helpt:', because: 'Ik voelde me zo omdat',
    venn: { me: 'Ik', friend: 'Mijn vriend / vriendin', both: 'Wij allebei' }, prompts: ['lievelingseten', 'lievelingskleur', 'huisdieren', 'spelletjes', 'haar', 'familie'],
    frames: ['Wij vinden allebei leuk:', 'Ik vind leuk:', 'mijn vriend / vriendin vindt leuk:'] },
  sv: { strength: ['lite', 'ganska', 'mycket'], helps: 'Det här hjälper mig:', because: 'Jag kände mig så för att',
    venn: { me: 'Jag', friend: 'Min kompis', both: 'Vi båda' }, prompts: ['favoritmat', 'favoritfärg', 'husdjur', 'lekar', 'hår', 'familj'],
    frames: ['Vi gillar båda', 'Jag gillar', 'min kompis gillar'] },
  da: { strength: ['lidt', 'ret', 'meget'], helps: 'Det hjælper mig:', because: 'Jeg havde det sådan, fordi',
    venn: { me: 'Mig', friend: 'Min ven', both: 'Os begge' }, prompts: ['yndlingsmad', 'yndlingsfarve', 'kæledyr', 'lege', 'hår', 'familie'],
    frames: ['Vi kan begge lide', 'Jeg kan lide', 'min ven kan lide'] },
  no: { strength: ['litt', 'ganske', 'veldig'], helps: 'Dette hjelper meg:', because: 'Jeg følte meg sånn fordi',
    venn: { me: 'Meg', friend: 'Vennen min', both: 'Oss begge' }, prompts: ['yndlingsmat', 'yndlingsfarge', 'kjæledyr', 'leker', 'hår', 'familie'],
    frames: ['Vi liker begge', 'Jeg liker', 'vennen min liker'] },
  fi: { strength: ['vähän', 'aika paljon', 'tosi paljon'], helps: 'Minua auttaa:', because: 'Tunsin näin, koska',
    venn: { me: 'Minä', friend: 'Kaverini', both: 'Me molemmat' }, prompts: ['lempiruoka', 'lempiväri', 'lemmikit', 'leikit', 'hiukset', 'perhe'],
    frames: ['Me molemmat tykkäämme', 'Minä tykkään', 'kaverini tykkää'] },
};

module.exports = { FEELINGS_NEW };
