#!/usr/bin/env node
/* =====================================================================
   apply-say-it-panel-tier2.js — the rest of what the six panels filed.
   ---------------------------------------------------------------------
   Tier 1 (`apply-say-it-panel-corrections.js`) took the unshippable and
   the severe: an obscenity, a romantic proposal, nine cards duzing a
   teacher, a false friend meaning "school year", a tool named after a
   plank, and a pronoun that does not exist in Brazil.

   This is everything else they filed — register, lexicon alignment,
   incomplete sentences, and the words the shipped product already uses
   elsewhere. It is the difference between a locale that is *correct*
   and one a native would not notice was written by an outsider.

   ⭐ THREE OPERATOR RULINGS THE PANELS ESCALATED, DECIDED HERE:

   1. PORTUGUESE `obrigado / obrigada`. Portuguese has no gender-neutral
      thank-you, so the board currently makes every girl say the
      masculine form. Every alternative is worse: `Obrigado(a)` is read
      aloud by TTS as "obrigado abre parênteses a"; `Valeu` is peer slang
      a child would not say to a teacher; `Agradeço` is an adult
      register. A per-child setting is the one option that would work
      and it is REFUSE-LISTED — "the board never asks who is using it".
      ⭐ RULING: keep `Obrigado`, and STATE THE RESIDUAL rather than hide
      it, exactly as the art panel did with cream as a skin tone. A
      known, named, least-wrong choice is honest; a silent one is not.
      Spanish has no such problem — `Gracias` is already invariant.

   2. FINNISH sentence-starter case government. Solved by DATA:
      `STARTER_EG` ships three worked completions per starter per
      locale, rendered under the textarea for the selected opening.
      ⚠ NOT by a validator — the Finnish panel was explicit and right:
      a machine must not sit in judgement of a native speaker's Finnish.
      Two starters had NO correct filling in some locales at all
      (`J'ai besoin de {x}`, `Ho bisogno di {x}`) and were re-cut to
      forms that take a bare noun phrase.

   3. TITLES. Four panels proposed renaming the tool in their locale
      (`Sprechkarten`, `Mon tableau pour parler`, `Pratkartan`,
      `Puhetaulu`). ⭐ RULING: take only the ones where the current name
      is NOT A WORD or means the wrong object — `zegbord` (not Dutch),
      `tavola` (a plank), `Sanomistaulu` (one letter from "notice
      board"). Leave the rest. A live slug rename is a §21.5a churn-freeze
      item, and the shipped slugs are untouched either way: these are
      the in-tool titles only.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const P = path.join(__dirname, '_home-language-bridge-strings.js');
const DRY = process.argv.indexOf('--dry-run') >= 0;
let s = fs.readFileSync(P, 'utf8');

const FIX = [
  /* ── ENGLISH, the last of what the panels convicted ────────────── */
  ["en:'I am still working'", "en:'I have not finished yet'",
   'four panels: the natural negation of the core done card, which is how the board pairs its opposites everywhere else'],
  ["en:'Our class'", "en:'Our own phrases'", 'it labels the teacher kept phrases, and was the only tab named from the adult point of view'],
  ["en:'Recent'", "en:'Recently used'", 'bare adjective as a heading; several locales inherited a bare adverb'],
  ["en:'What happens now'", "en:'What now'", 'a headless relative used as a tab label, faithfully reproduced by every Nordic locale'],
  ["en:'Say it aloud'", "en:'Speak the cards'", 'the settings toggle was one word from the card button, and a teacher could not tell which one sticks'],
  ["en:'Only if it is one of these — the pictures work whatever the child speaks.'",
   "en:'Add it only if the child’s language is on this list — the pictures work in any language.'",
   '"it" had no antecedent inside its own string, and the dangling pronoun propagated into at least German'],
  ["en:'Tap a picture — the class hears it out loud, in the language of the room.'",
   "en:'Tap a picture and it is said out loud, in the language of the class.'",
   'three panels: the class does NOT hear it in four states — the three dignity cards, show-big, and no voice — and "the room" is an invention teachers do not say'],
  ["en:'This device has no voice for that language",
   "en:'This device has no voice for this language", 'the deixis was wrong; its matched pair three lines away says "this"'],

  /* ── GERMAN tier 2 ─────────────────────────────────────────────── */
  ["de:'Das tut weh'", "de:'Mir tut etwas weh'", 'needs a referent the card cannot supply'],
  ["de:'Mir ist übel'", "de:'Mir ist schlecht'", 'übel is the adult/medical register'],
  ["de:'Ich kann es nicht sehen'", "de:'Ich sehe es nicht'", 'the modal adds nothing; this is the child form'],
  ["de:'Wo soll ich hingehen?'", "de:'Wo muss ich hin?'", 'the child form, and shorter'],
  ["de:'Machst du mit mir zusammen?'", "de:'Machen wir zusammen?'", 'the verb had no object; and this is the actual German pairing phrase'],
  ["de:'Ich spreche meine eigene Sprache'", "de:'Ich kann schon eine Sprache'",
   'the dignity group: "meine eigene" faintly concedes it is not the real one'],
  ["de:'Ich sage meinen Namen'", "de:'Ich sage meinen Namen selbst'", 'the English is a request for the floor; German had lost it'],
  ["de:'Ich will es versuchen'", "de:'Ich will es probieren'", 'probieren is the K-1 word'],
  ["de:'Ich möchte noch etwas'", "de:'Ich hätte gern noch etwas'", 'ambiguous, and this is the polite request form German schools teach'],
  ["de:'Mit anderen zusammen'", "de:'Mit den anderen'", 'adverbial phrase as a tab label'],
  ["de:'Meine Worte, ich bin dran'", "de:'Meine Wörter'", 'Worte is the oratorical plural, and the rest was byte-identical to the myturn card'],
  ["de:'Zuletzt'", "de:'Zuletzt benutzt'", 'bare adverb as a heading'],
  ["de:'Das laut sagen'", "de:'Laut sagen'", 'the demonstrative reads as a command, and it is spliced into every card aria-label'],

  /* ── FRENCH tier 2 ─────────────────────────────────────────────── */
  ['fr:\'L’enfant qui en a besoin ne sait pas lire les mots.\'', 'fr:\'L’enfant qui en a besoin ne peut pas encore lire ces mots.\'',
   'THE ONE STRING IN THE FILE THAT JUDGED THE CHILD — "ne sait pas lire" says illiterate; he cannot read THIS language'],
  ["fr:'Pour l’enseignant'", "fr:'Espace enseignant'", 'the premier degré is ~83% female and this is the button a teacher presses about herself'],
  ["fr:'Images seules'", "fr:'Images uniquement'", 'Images seules reads as LONE images'],
  ["fr:'Ce qui se passe maintenant'", "fr:'Et maintenant ?'", '26-char tab label beside an icon; it wraps'],
  ["fr:'C’est quand le repas ?'", "fr:'C’est quand le repas ?'", 'confirmed correct after tier 1'],
  ["fr:'Je parle ma propre langue'", "fr:'Je parle ma langue à moi'", 'the dislocated possessive is how a French child asserts ownership'],
  ["fr:'Je dis mon prénom'", "fr:'Je veux dire mon prénom'", 'the English is a request for the floor; the French was a flat statement'],
  ["fr:'Annuler'", "fr:'Rétablir'", 'the control RESTORES a phrase just deleted; Annuler beside a delete reads as cancel-this-dialogue'],

  /* ── SPANISH tier 2 ────────────────────────────────────────────── */
  ['es:\'El niño que la necesita no sabe leer las palabras.\'', 'es:\'Quien la necesita todavía no puede leer las palabras.\'',
   'same judgement as the French, plus it dodges the generic masculine'],
  ["es:'Me duele'", "es:'Me duele aquí'", 'Me duele is incomplete in Spanish — the verb needs its subject'],
  ["es:'Esto sé hacerlo'", "es:'Yo sé hacer esto'", 'matches the emphatic Yo of its neighbours in the dignity group'],
  ['es:\'¿Puedo enseñártelo mejor?\'', "es:'Mejor te lo muestro'",
   'mejor after the verb reads as BETTER, so the card asked "may I show it to you in a better way?"'],
  ['es:\'¿Estoy en el sitio correcto?\'', 'es:\'¿Estoy en el lugar correcto?\'', 'lugar 25 : sitio 3 across the shipped Spanish landings'],
  ['es:\'¿Ya es hora de irse?\'', 'es:\'¿Ya es hora de ir a casa?\'', 'impersonal reflexive on a first-person card, and it does not say where'],
  ["es:'Para el docente'", "es:'Para docentes'", 'el docente is masculine-marked by its article'],
  ["es:'Quizá'", "es:'Quizás'", 'the spoken form'],
  ["es:'Qué pasa ahora'", "es:'Lo que pasa ahora'", 'a bare Qué pasa ahora reads as a question with its punctuation stripped'],
  ["es:'Mis palabras, me toca'", "es:'Mis palabras, mi turno'", 'a conjugated fragment where the parallel needs a noun phrase'],

  /* ── DUTCH tier 2 ──────────────────────────────────────────────── */
  ["nl:'Tik op een plaatje — de klas hoort het hardop, in de taal van het lokaal.'", "nl:'Tik op een plaatje en het wordt hardop gezegd, in de taal van de klas.'", 'a room has no language; Dutch says de taal van de klas'],
  ["nl:'Wil je me helpen beginnen?'", "nl:'Wil je me op weg helpen?'", 'the stacked bare infinitive is not idiomatic; op weg helpen is the exact idiom'],
  ["nl:'Wanneer is het eten?'", "nl:'Wanneer gaan we eten?'", 'het eten reads as dinner at home'],
  ['nl:\'Is het tijd om naar huis te gaan?\'', "nl:'Is de school uit?'", 'the actual Dutch school phrase, and four words shorter on a card'],
  ["nl:'Ik zeg mijn naam'", "nl:'Ik zeg zelf mijn naam'", 'the English is "LET me say my name"; without zelf the dignity is gone'],
  ["nl:'Ik wil er graag nog wat'", "nl:'Ik wil graag nog wat meer'", 'the er…wat split has no licensor — broken Dutch'],
  ["nl:'Iemand is gemeen tegen mij'", "nl:'Iemand doet gemeen tegen mij'",
   'gemeen zijn is a character judgement about the other child; gemeen doen is the childlike collocation'],
  ["nl:'Groot tonen'", "nl:'Groot laten zien'", 'tonen is register-formal, and this string is spliced into every card aria-label'],
  ["nl:'Altijd groot tonen'", "nl:'Altijd groot laten zien'", 'consistency'],
  ["nl:'Tik ergens om te sluiten.'", "nl:'Tik ergens op om te sluiten.'", 'Dutch tikken takes op'],

  /* ── ITALIAN tier 2 ────────────────────────────────────────────── */
  ["it:'Ho bisogno di aiuto'", "it:'Mi serve aiuto'", 'ho bisogno di is what an adult writes; a child says mi serve'],
  ["it:'Ho bisogno di vestiti asciutti'", "it:'Mi servono vestiti asciutti'", 'register + plural agreement; the remedy-not-event ruling is preserved'],
  ["it:'Ho bisogno della mia medicina'", "it:'Mi serve la mia medicina'", 'register'],
  ["it:'Ho bisogno di un fazzoletto'", "it:'Mi serve un fazzoletto'", 'register'],
  ["it:'Ho bisogno di una piccola pausa'", "it:'Mi serve una pausa'", 'piccola pausa is a calque of "a little break"'],
  ["it:'Questo non posso mangiarlo'", "it:'Questo non lo posso mangiare'", 'left-dislocation puts the clitic before the modal'],
  ["it:'Sto ancora lavorando'", "it:'Non ho ancora finito'", 'Italian primary children do not LAVORARE on an exercise'],
  ["it:'Posso prendere il cappotto?'", "it:'Posso prendere il mio giubbotto?'", 'cappotto is a formal overcoat; children wear a giubbotto — and the possessive was missing'],
  ["it:'Quello è mio'", "it:'È mio'", 'quello is far-deixis; this card is used when something is being taken out of the child hands'],
  ["it:'Dico io il mio nome'", "it:'Il mio nome lo dico io'", 'the emphatic dislocation IS the dignity point'],
  ["it:'Posso fartelo vedere invece?'", "it:'Posso fartelo vedere?'", 'trailing invece is unidiomatic; the icon carries the contrast'],
  ["it:'Tienila'", "it:'Salvala'", 'tenere is to HOLD; the Italian verb for persisting a thing is salvare'],
  ["it:'{n} su {max} tenute'", "it:'{n} di {max} salvate'", 'consistency with the verb above'],

  /* ── BRAZILIAN tier 2 ──────────────────────────────────────────── */
  ["pt:'Não estou me sentindo bem'", "pt:'Não estou bem'", 'a phrase for a doctor waiting room'],
  ["pt:'Estou com vontade de vomitar'", "pt:'Acho que vou vomitar'", 'long, clinical, and it reads as a WISH'],
  ["pt:'Onde eu devo ir?'", "pt:'Pra onde eu vou?'", 'devo ir is the register of a form'],
  ["pt:'Não encontro as minhas coisas'", "pt:'Não estou achando minhas coisas'", 'encontro + article-possessive is European'],
  ["pt:'Posso pegar o meu casaco?'", "pt:'Posso pegar meu casaco?'", 'article + possessive is European'],
  ["pt:'Quando vêm me buscar?'", "pt:'Quando vão me buscar?'", 'subjectless vêm is vague; BR uses the periphrastic future'],
  ["pt:'Deixe eu dizer o meu nome'", "pt:'Deixa eu falar meu nome'", 'formal imperative + article; and BR uses falar'],
  ["pt:'Eu falo a minha própria língua'", "pt:'Eu falo a minha língua'", 'própria is redundant and costs card width'],
  ['pt:\'Posso mostrar em vez de dizer?\'', 'pt:\'Posso mostrar em vez de falar?\'', 'BR default verb'],
  ["pt:'Guardou {n} frases.", "pt:'Você guardou {n} frases.", 'subjectless 3rd person is European formal address'],
  ["pt:'Mostrar grande'", "pt:'Mostrar ampliado'", 'em grande is a European idiom'],
  ["pt:'Mostrar sempre grande'", "pt:'Mostrar sempre ampliado'", 'same'],
  ["pt:'Pôr no quadro'", "pt:'Colocar no quadro'", 'pôr is PT-flavoured in BR UI copy'],

  /* ── SWEDISH ───────────────────────────────────────────────────── */
  ["sv:'Jag behöver gå på toaletten'", "sv:'Jag måste gå på toa'", 'no Swedish six-year-old says behöver here; and toa is the school euphemism'],
  ["sv:'Det här kan jag inte äta'", "sv:'Det här får jag inte äta'", 'SAFETY: kan inte = unable; allergy, diet and religion are får inte'],
  ["sv:'Jag håller på än'", "sv:'Jag är inte klar än'", 'håller på än is marked/archaic; this is the honest opposite of the done card'],
  ["sv:'Jag har glömt'", "sv:'Jag har glömt det'", 'transitive verb with no object'],
  ['sv:\'Vill du vara med mig?\'', 'sv:\'Vill du jobba med mig?\'', 'vara med mig reads as "be with me" — clingy/romantic'],
  ["sv:'Jag talar mitt eget språk'", "sv:'Jag pratar mitt eget språk'", 'tala is formal/adult; children pratar'],
  ["sv:'Jag säger mitt namn'", "sv:'Jag säger mitt namn själv'", 'the English is "LET me say my name"'],
  ['sv:\'Får jag hämta jackan?\'', 'sv:\'Får jag hämta min jacka?\'', 'definite article is not a possessive; the card is about the child own coat'],
  ["sv:'Jag vill gärna ha mer'", "sv:'Jag vill ha lite mer'", 'vill gärna is Danish-flavoured'],
  ['sv:\'Ska vi dela?\'', 'sv:\'Ska vi dela på det?\'', 'bare dela is ambiguous — divide or split up'],
  ["sv:'Behåll den'", "sv:'Spara den'", 'it collided with its own gate, which says att SPARA, and with the counter, which says sparade'],
  ["sv:'Lägg den på tavlan'", "sv:'Visa den på tavlan'", 'lägg implies persistence; this is the free ephemeral button'],
  ["sv:'Säg det högt'", "sv:'Läs upp högt'", 'collided with the card button'],
  ["sv:'Avsluta meningen.'", "sv:'Skriv klart meningen.'", 'avsluta = terminate'],
  ["sv:'Vad som händer nu'", "sv:'Vad händer nu'", 'headless relative as a tab label'],

  /* ── DANISH ────────────────────────────────────────────────────── */
  ["da:'Nogen er ond ved mig'", "da:'Nogen driller mig'",
   'ond means EVIL — no Danish child says it about a classmate, and a teacher hearing it from a device escalates to the wrong procedure'],
  ['da:\'Vil du være sammen med mig?\'', 'da:\'Vil du være min makker?\'', 'at være sammen med nogen is the Danish idiom for DATING'],
  ['da:\'Hvad skal jeg nu?\'', 'da:\'Hvad skal jeg lave nu?\'', 'verb elided; incomplete on a printed card'],
  ["da:'Jeg taler mit eget sprog'", "da:'Jeg snakker mit eget sprog'", 'tale is formal; children snakker'],
  ["da:'Jeg siger mit navn'", "da:'Jeg siger selv mit navn'", 'loses "LET me"'],
  ["da:'Se på mig, tak'", "da:'Vil du kigge på mig?'", 'kigge is the child verb; imperative + tak is curt from a child to an adult'],
  ["da:'At gemme mere end {n}", "da:'At gemme flere end {n}", 'GRAMMAR: a countable noun takes flere end, not mere end'],
  ["da:'Behold den'", "da:'Gem den'", 'the gate says at GEMME and the counter says gemt; the button said behold'],
  ["da:'Læg den på tavlen'", "da:'Vis den på tavlen'", 'as sv'],
  ["da:'Sig det højt'", "da:'Læs op'", 'collided with the card button'],
  ["da:'Hvad der sker nu'", "da:'Hvad sker der nu'", 'headless relative as a tab label'],

  /* ── NORWEGIAN ─────────────────────────────────────────────────── */
  ['no:\'Kan jeg få litt vann?\'', 'no:\'Får jeg litt vann?\'', 'Kan jeg asks about ABILITY; Norwegian children ask Får jeg'],
  ['no:\'Kan jeg være med?\'', 'no:\'Får jeg være med?\'', 'same'],
  ['no:\'Kan jeg sitte her?\'', 'no:\'Får jeg sitte her?\'', 'same'],
  ['no:\'Kan jeg hente jakka mi?\'', 'no:\'Får jeg hente jakka mi?\'', 'same'],
  ['no:\'Kan jeg vise det i stedet?\'', 'no:\'Får jeg vise det i stedet?\'', 'same'],
  ['no:\'Kan jeg svare på mitt språk?\'', 'no:\'Får jeg svare på språket mitt?\'',
   'permission AND possessive: bokmål wants the post-posed språket mitt, as this same file already writes jakka mi and navnet mitt'],
  ['no:\'Vil du være sammen med meg?\'', 'no:\'Vil du være makkeren min?\'', 'være sammen med = dating, as Danish'],
  ["no:'Jeg holder på ennå'", "no:'Jeg er ikke ferdig ennå'", 'stilted; the honest opposite of the done card'],
  ["no:'Dette kan jeg ikke spise'", "no:'Dette får jeg ikke spise'", 'SAFETY: not-allowed, not unable'],
  ['no:\'Når er lunsjen?\'', 'no:\'Når er matpausen?\'', 'lunsj is an office word; barneskole has matpause'],
  ['no:\'Er det tid for å gå hjem?\'', 'no:\'Er det på tide å gå hjem?\'', 'på tide is the idiom'],
  ["no:'Se på meg, takk'", "no:'Kan du se på meg?'", 'imperative + takk is markedly less idiomatic in Norwegian than in Swedish'],
  ["no:'Jeg sier navnet mitt'", "no:'Jeg sier navnet mitt selv'", 'loses "LET me"'],
  ["no:'Å beholde mer enn {n}", "no:'Å beholde flere enn {n}", 'GRAMMAR: countable takes flere enn'],
  ["no:'Si det høyt'", "no:'Les opp'", 'collided with the card button'],
  ["no:'Hva som skjer nå'", "no:'Hva skjer nå'", 'headless relative as a tab label'],
  ["no:'Legg den på tavla'", "no:'Vis den på tavla'", 'as sv/da'],

  /* ── FINNISH ───────────────────────────────────────────────────── */
  ['fi:\'Lapsi joka tätä tarvitsee ei osaa lukea sanoja.\'', 'fi:\'Lapsi, joka tätä tarvitsee, ei osaa lukea sanoja.\'',
   'HARD ERROR: a Finnish relative clause must be comma-delimited on BOTH sides'],
  ["fi:'Teen vielä'", "fi:'En ole vielä valmis'", 'no object — it is not a sentence; and this is the honest opposite of the done card'],
  ["fi:'Olen unohtanut'", "fi:'Unohdin sen'", 'transitive verb with no object'],
  ['fi:\'Tuletko minun pariksi?\'', 'fi:\'Tuletko minun parikseni?\'', 'translative + possessor requires the possessive suffix'],
  ["fi:'Tätä en voi syödä'", "fi:'Tätä en saa syödä'", 'SAFETY: en voi = unable; en saa is what Finns say for allergy, diet and religion alike'],
  ['fi:\'Saanko näyttää sen sijaan?\'', 'fi:\'Saanko mieluummin näyttää?\'', 'näyttää sen parses out of sen sijaan — genuinely ambiguous'],
  ["fi:'Olen täällä uusi'", "fi:'Olen uusi täällä'", 'the current order puts contrastive focus on uusi'],
  ["fi:'Sanomistaulu'", "fi:'Puhetaulu'", 'Sanomistaulu is not a word, and it is one letter from parsing as sanomataulu = NOTICE BOARD'],
  ["fi:'Sano ääneen'", "fi:'Lue ääneen'", 'collided with the card button'],
  ["fi:'Poista yksi lisätäksesi toisen.'", "fi:'Poista yksi, niin voit lisätä uuden.'", 'the translative infinitive is officialese'],
];

let applied = 0;
const missed = [];
FIX.forEach(([a, b]) => {
  if (a === b) { applied++; return; }          /* confirmed-correct rows */
  if (s.indexOf(a) >= 0) { s = s.replace(a, b); applied++; }
  else missed.push(a);
});

if (!DRY) fs.writeFileSync(P, s, 'utf8');
console.log(`  applied ${applied}/${FIX.length} tier-2 corrections${DRY ? ' (dry run)' : ''}`);
if (missed.length) {
  console.error(`\n  ${missed.length} needle(s) did not match:`);
  missed.forEach((m) => console.error('    ' + m));
  process.exit(1);
}
