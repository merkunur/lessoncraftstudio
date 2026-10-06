/**
 * verb-forms-extra-wrong.js — one extra WRONG form per verb for the Verb Forms SCREEN in the tense languages (2026-10-06).
 *
 * Why: in en / sv / da a verb has three forms on this worksheet (base · present · past), so every card offered exactly
 * those three, and the asked form decided the length order — the regular past was the longest on most cards and "tap
 * the longest word" won 50-52%. A fourth form lets the screen choose its two distractors so the answer is the shortest,
 * the middle or the longest option as often as chance says.
 *
 * Each form is a real form of the same verb that a child writes in the wrong place, and is never a right answer for any
 * gap of these worksheets (the gaps ask the present or the past only):
 *   en  the -ing form   ("Yesterday I jumping")
 *   sv  the supine       ("Igår hoppat jag")
 *   da  the participle   ("I går hoppet jeg")
 * Keyed by the bank's infinitive. no is left out on purpose: the bokmål participle of many weak verbs equals an
 * accepted past form (hoppet), so it could be a right answer.
 */
'use strict';
module.exports = {
  en: {
    run: 'running', jump: 'jumping', sleep: 'sleeping', eat: 'eating', sing: 'singing', read: 'reading', swim: 'swimming',
    play: 'playing', hop: 'hopping', sit: 'sitting', climb: 'climbing', laugh: 'laughing', draw: 'drawing', wash: 'washing',
    push: 'pushing', pull: 'pulling', throw: 'throwing', catch: 'catching', whisper: 'whispering', wander: 'wandering',
    giggle: 'giggling', gather: 'gathering', listen: 'listening', carry: 'carrying', build: 'building', dance: 'dancing',
    shout: 'shouting', hide: 'hiding', be: 'being', have: 'having', do: 'doing', go: 'going',
  },
  sv: {
    springa: 'sprungit', hoppa: 'hoppat', sova: 'sovit', äta: 'ätit', sjunga: 'sjungit', läsa: 'läst', simma: 'simmat',
    leka: 'lekt', sitta: 'suttit', dricka: 'druckit', klättra: 'klättrat', skratta: 'skrattat', rita: 'ritat',
    tvätta: 'tvättat', knuffa: 'knuffat', dra: 'dragit', kasta: 'kastat', fånga: 'fångat', dansa: 'dansat', gömma: 'gömt',
    leta: 'letat', viska: 'viskat', vandra: 'vandrat', fnissa: 'fnissat', samla: 'samlat', lyssna: 'lyssnat', bära: 'burit',
    bygga: 'byggt', ropa: 'ropat', baka: 'bakat', vara: 'varit', ha: 'haft', gå: 'gått', få: 'fått', se: 'sett',
  },
  da: {
    løbe: 'løbet', hoppe: 'hoppet', læse: 'læst', danse: 'danset', vandre: 'vandret', bage: 'bagt', synge: 'sunget',
    tegne: 'tegnet', spise: 'spist', svømme: 'svømmet', lege: 'leget', klatre: 'klatret', grine: 'grinet', vaske: 'vasket',
    skubbe: 'skubbet', kaste: 'kastet', gemme: 'gemt', hviske: 'hvisket', samle: 'samlet', lytte: 'lyttet', bygge: 'bygget',
    råbe: 'råbt', sove: 'sovet', sidde: 'siddet', drikke: 'drukket', trække: 'trukket', gribe: 'grebet', bære: 'båret',
    være: 'været', have: 'haft', gå: 'gået', få: 'fået', se: 'set',
  },
};
