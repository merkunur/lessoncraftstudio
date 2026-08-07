#!/usr/bin/env node
/* =====================================================================
   apply-say-it-panel-corrections.js — fold the native panels' rulings
   into the Say It Board's source of truth.
   ---------------------------------------------------------------------
   ⚠ WRITTEN AS A FILE, NOT A HEREDOC. A bash heredoc broke twice on the
   apostrophes and the backslashes in this very content, which is the
   recorded trap and is doubly stupid in a script whose whole subject is
   typographic apostrophes.

   Six panels reviewed ten locales on 2026-08-07 — the first native read
   these strings have EVER had. The previous build's docblock claimed a
   native ensemble had corrected them and named the script that did it;
   that script never existed anywhere in the repository.

   ⭐ WHAT THE PANELS FOUND THAT NO GATE COULD:

     · SPANISH shipped `coger` — obscene across Mexico, Argentina,
       Uruguay, Paraguay, Venezuela and most of Central America — on a
       card a six-year-old points at in front of thirty classmates. The
       Spanish panel measured the shipped product lexicon before ruling:
       `coger` appears ZERO times in the other 42 Spanish landings.
       And `¿Quieres ser mi pareja?` reads as a romantic proposal.
     · GERMAN duzt the teacher on nine cards. A Grundschule child says
       SIE, from Klasse 1, and a child who duzt a teacher commits a
       visible social error — on a board whose entire promise is that
       the newcomer arrives socially legible.
     · DUTCH used `groep` three times as a UI category label. In a
       basisschool `groep` is the school YEAR.
     · ITALIAN named the tool `tavola` — a plank, a surfboard, or the
       dinner table. The Italian AAC word is `tabella`, and three
       sibling tools already ship it.
     · BRAZILIAN PORTUGUESE said `o vosso filho` — a pronoun that does
       not exist in Brazil — on the sheet that goes home to the family.
     · FRENCH and ITALIAN and PORTUGUESE all forced MASCULINE agreement
       on cards a girl would press ("tout seul", "da solo", "sozinho").
     · ITALIAN `piano` means QUIETLY before it means slowly, so the
       "please speak slowly" card asked the teacher to speak MORE
       QUIETLY — the opposite of what a newcomer needs.

   ⭐⭐ AND THREE PANELS INDEPENDENTLY CONVICTED THE ENGLISH, which is
   the locale nobody reviews and the one all ten others were built from:
   `unkind` is a British-school softening that every locale rendered as
   *mean*; `tooLong` says "letters" where the code counts characters and
   all ten others correctly say characters; and `printBack` strands its
   adverb ("uses at home here") in the one sentence that goes to a
   family — which the French draft had silently worked around rather
   than reported.

   Run:  node scripts/apply-say-it-panel-corrections.js [--dry-run]
   Then: node scripts/apply-home-language-bridge-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const P = path.join(__dirname, '_home-language-bridge-strings.js');
const DRY = process.argv.indexOf('--dry-run') >= 0;
let s = fs.readFileSync(P, 'utf8');

/* [find, replace, why] — one line each, grouped by locale. */
const FIX = [
  /* ── ENGLISH: the outliers three panels convicted ──────────────── */
  ["en:'Someone is being unkind to me'", "en:'Someone is being mean to me'",
   'every locale rendered it as MEAN; the English was the soft outlier, and the longest card in the set on the one a distressed child must find fastest'],
  ['That is longer than {n} letters.', 'That is longer than {n} characters.',
   'the code counts characters; all ten other locales already said characters'],
  ["en:'Write the words your child uses at home here, and we will learn them.'",
   "en:'Write here the words your child uses at home, and we will learn them.'",
   'stranded adverb — "uses at home here" — in the sentence that goes home to a family'],

  /* ── SPANISH: two of these are unshippable ─────────────────────── */
  ['es:\'¿Puedo coger mi abrigo?\'', 'es:\'¿Puedo ir a buscar mi abrigo?\'',
   'OBSCENE across most of Latin America; zero occurrences in the other 42 Spanish landings'],
  ['es:\'¿Quieres ser mi pareja?\'', 'es:\'¿Hacemos pareja?\'',
   'reads as a romantic proposal; hacer pareja is the classroom idiom and carries no gender'],
  ["es:'Necesito un descansito'", "es:'Necesito un descanso'", 'nursery diminutive that shames a seven-year-old'],
  ["es:'Quiero jugar solo'", "es:'Quiero jugar a solas'", 'gender-marked; a solas is invariable'],
  ['es:\'Soy nuevo aquí\'', "es:'Acabo de llegar'", 'gender, on the opening card of the dignity group'],
  ["es:'Para'", 'es:\'¡Para!\'', 'bare Para reads first as the preposition'],
  ['es:\'Necesito ir al baño\'', 'es:\'Tengo que ir al baño\'', 'Necesito is the word on a form'],
  ["es:'Alguien no se porta bien conmigo'", 'es:\'Alguien se está metiendo conmigo\'',
   'portarse bien is the adult discipline frame handed to the child'],
  ['es:\'Enséñamelo, por favor\'', 'es:\'Muéstramelo, por favor\'', 'ensenar reads as TEACH me it in LatAm'],
  ['es:\'¿Cuándo es la comida?\'', 'es:\'¿Cuándo comemos?\'', 'la comida means lunch only in Spain and Mexico'],
  ['es:\'Repítelo, por favor\'', "es:'Otra vez, por favor'", 'address-free, and what a child with twenty words says'],
  ["es:'Dilo despacio, por favor'", 'es:\'Más despacio, por favor\'', 'address-free'],
  ["es:'Se me ha olvidado'", 'es:\'Se me olvidó\'', 'peninsular perfect'],

  /* ── GERMAN: a Grundschule child SIEZT the teacher ─────────────── */
  ["de:'Schau mich bitte an'", "de:'Schauen Sie mich bitte an'", 'Sie'],
  ["de:'Sag das bitte noch einmal'", "de:'Sagen Sie das bitte noch einmal'", 'Sie'],
  ["de:'Sag es bitte langsam'", 'de:\'Sprechen Sie bitte langsamer\'', 'Sie; and one asks someone to SPRECHEN slowly'],
  ["de:'Zeig es mir bitte'", "de:'Zeigen Sie es mir bitte'", 'Sie'],
  ["de:'Schreib es bitte auf'", "de:'Schreiben Sie es bitte auf'", 'Sie'],
  ['de:\'Ich höre dich nicht\'', 'de:\'Ich höre Sie nicht\'', 'Sie'],
  ["de:'Kannst du mir beim Anfangen helfen?'", 'de:\'Können Sie mir beim Anfangen helfen?\'', 'Sie'],
  ["de:'Ich muss dir etwas sagen'", "de:'Ich muss Ihnen etwas sagen'", 'Sie — the safeguarding-adjacent card'],
  ["de:'Darf ich es dir lieber zeigen?'", "de:'Darf ich es Ihnen lieber zeigen?'", 'Sie'],
  ["de:'Ich muss auf die Toilette'", "de:'Darf ich auf die Toilette?'", 'the child-to-PARENT register; at school the child asks'],
  ["de:'Halt'", "de:'Stopp'", 'Halt is a shout about danger; Stopp is the word the Stopp-Regel already taught the whole class'],
  ["de:'Ist jetzt Schluss?'", "de:'Ist die Schule aus?'", 'one intonation from a common German scolding'],
  ["de:'Ich arbeite noch'", "de:'Ich bin noch nicht fertig'", 'the exact negation of the done card, which is what makes the pair learnable'],
  ["de:'Wann kommt jemand von zu Hause?'", "de:'Wann werde ich abgeholt?'", 'cold and unidiomatic'],
  ["de:'Laut vorlesen'", "de:'Laut sagen'", 'vorlesen is an adult reading aloud TO someone — it inverts the tool thesis in its own settings panel'],
  ['Sie zu schreiben und zu benutzen ist immer kostenlos.', 'Sätze zu schreiben und zu benutzen ist immer kostenlos.',
   'sentence-initial Sie meaning THEM inside a product that addresses the reader as Sie'],

  /* ── FRENCH: vouvoiement, gender, one romantic reading ─────────── */
  ['fr:\'Regarde-moi, s’il te plaît\'', 'fr:\'Regardez-moi, s’il vous plaît\'', 'vous'],
  ['fr:\'Répète, s’il te plaît\'', 'fr:\'Répétez, s’il vous plaît\'', 'vous'],
  ['fr:\'Dis-le lentement, s’il te plaît\'', 'fr:\'Parlez plus lentement, s’il vous plaît\'', 'vous'],
  ['fr:\'Montre-moi, s’il te plaît\'', 'fr:\'Montrez-moi, s’il vous plaît\'', 'vous'],
  ['fr:\'Écris-le, s’il te plaît\'', 'fr:\'Écrivez-le, s’il vous plaît\'', 'vous'],
  ['fr:\'Je ne t’entends pas\'', 'fr:\'Je ne vous entends pas\'', 'vous'],
  ['fr:\'Tu peux m’aider à commencer ?\'', 'fr:\'Vous pouvez m’aider à commencer ?\'', 'vous'],
  ['fr:\'J’ai quelque chose à te dire\'', 'fr:\'J’ai quelque chose à vous dire\'', 'vous'],
  ['fr:\'Est-ce que je peux te le montrer à la place ?\'', 'fr:\'Est-ce que je peux vous le montrer ?\'', 'vous'],
  ['fr:\'Tu veux être avec moi ?\'', 'fr:\'Tu veux te mettre avec moi ?\'', 'etre avec moi reads as a romantic proposition'],
  ["fr:'Je veux jouer tout seul'", "fr:'Je veux jouer dans mon coin'", 'gender'],
  ["fr:'Je suis nouveau ici'", 'fr:\'Je viens d’arriver\'', 'gender'],
  ['fr:\'J’ai besoin de vêtements secs\'', 'fr:\'J’ai besoin de vêtements de rechange\'',
   'de rechange is the French school term and is event-neutral; SECS implies the current ones are wet, i.e. it names the event'],
  ['fr:\'Arrête\'', "fr:'Stop'", 'Arrete is tutoiement aimed at an adult'],
  ['fr:\'C’est quand le déjeuner ?\'', 'fr:\'C’est quand le repas ?\'', 'le dejeuner is the meal at home'],
  ["fr:'Je dois aller aux toilettes'", 'fr:\'Est-ce que je peux aller aux toilettes ?\'',
   'a declarative does not obtain permission, and a newcomer cannot follow it up'],

  /* ── DUTCH: groep is the school YEAR ───────────────────────────── */
  ["nl:'Welke groep?'", "nl:'In welke rubriek?'", 'groep means the school year in a basisschool'],
  ["nl:'Kies er een groep bij.'", "nl:'Kies er een rubriek bij.'", 'same'],
  ["nl:'Deze groep bevat al {n} van je zinnen.'", "nl:'In deze rubriek staan al {n} van je zinnen.'", 'same'],
  ["nl:'Het zegbord'", "nl:'Het praatbord'", 'zegbord is not a Dutch word; praatbord is the established term for this object'],
  ["nl:'Ik heb een kleine pauze nodig'", "nl:'Ik heb even rust nodig'", 'pauze is the timetabled playground break'],
  ["nl:'Dit mag ik niet eten'", "nl:'Dit kan ik niet eten'", 'mag declares a rule or a religion, which the card must never do'],
  ["nl:'Zeg dat nog eens, alsjeblieft'", "nl:'Kun je het nog een keer zeggen?'", 'standalone alsjeblieft also means HERE YOU ARE'],
  ["nl:'Zeg het langzaam, alsjeblieft'", "nl:'Kun je het langzamer zeggen?'", 'same'],
  ["nl:'Laat het me zien, alsjeblieft'", "nl:'Kun je het laten zien?'", 'same'],
  ["nl:'Schrijf het op, alsjeblieft'", "nl:'Kun je het opschrijven?'", 'same'],
  ["nl:'Kijk alsjeblieft naar mij'", "nl:'Kijk eens naar mij'", 'same'],
  ["nl:'Ik heb een zakdoek nodig'", "nl:'Ik heb een zakdoekje nodig'", 'a zakdoek is a cloth handkerchief; the icon is a tissue'],
  ["nl:'Wil jij met mij samen?'", "nl:'Wil je mijn maatje zijn?'", 'incomplete; maatje is the shipped NL school word'],
  ["nl:'Wanneer komt er iemand voor mij?'", "nl:'Wanneer word ik opgehaald?'", 'ophalen is the standard NL school verb'],

  /* ── ITALIAN: the tool was named after a plank ──────────────────── */
  ['La tavola per farsi capire', 'La tabella per farsi capire', 'tavola is a plank, a surfboard or the dinner table'],
  ['la tavola mostra ogni scheda', 'la tabella mostra ogni scheda', 'same'],
  ['La tavola parla sempre come il bambino', 'La tabella parla sempre come il bambino', 'same'],
  ['già sulla tavola', 'già sulla tabella', 'same'],
  ['Mettila sulla tavola', 'Mettila sulla tabella', 'same'],
  ['Torna alla tavola', 'Torna alla tabella', 'same'],
  ["it:'Dillo piano, per favore'", 'it:\'Dillo più lentamente, per favore\'',
   'PIANO MEANS QUIETLY FIRST — the card asked the teacher to lower her voice, the opposite of what a newcomer needs'],
  ["it:'Ho voglia di vomitare'", "it:'Mi viene da vomitare'", 'avere voglia di means to FANCY — the card said the child would LIKE to vomit'],
  ["it:'Me ne sono dimenticato'", "it:'Non mi ricordo'", 'the participle agrees with the speaker gender'],
  ["it:'Voglio giocare da solo'", "it:'Voglio giocare per conto mio'", 'gender'],
  ["it:'Sono nuovo qui'", 'it:\'È il mio primo giorno qui\'', 'gender'],
  ["it:'Vuoi fare con me?'", "it:'Ti metti con me?'", 'fare has no object — the sentence is incomplete'],
  ['it:\'Qualcuno non è gentile con me\'', "it:'Qualcuno mi tratta male'", 'litotes is adult register and blunts a safeguarding cue'],

  /* ── BRAZILIAN PORTUGUESE ──────────────────────────────────────── */
  ['o vosso filho', 'seu filho', 'VOSSO DOES NOT EXIST IN BRAZIL, and it is on the sheet a family holds'],
  ['o escreveu para si', 'escreveu para você', 'si is reflexive in BR, so it read as WROTE IT FOR HIMSELF'],
  ["pt:'Pare'", "pt:'Para!'", 'formal imperative'],
  ["pt:'Olhe para mim, por favor'", "pt:'Olha pra mim, por favor'", 'formal imperative'],
  ["pt:'Repita, por favor'", "pt:'Fala de novo, por favor'", 'repita is what a receptionist says'],
  ["pt:'Fale devagar, por favor'", "pt:'Fala mais devagar, por favor'", 'formal imperative'],
  ["pt:'Mostre-me, por favor'", "pt:'Me mostra, por favor'", 'formal imperative AND enclisis — the most European string in the set'],
  ["pt:'Escreva, por favor'", "pt:'Escreve pra mim, por favor'", 'formal imperative'],
  ["pt:'Espere por mim'", "pt:'Me espera!'", 'formal imperative, said to a PEER'],
  ['pt:\'O que é isto?\'', 'pt:\'O que é isso?\'', 'isto is not spoken Brazilian'],
  ["pt:'Como se diz isto?'", "pt:'Como se fala isso?'", 'same'],
  ['pt:\'Isto eu não posso comer\'', 'pt:\'Não posso comer isso\'', 'same'],
  ["pt:'Isto eu sei fazer'", "pt:'Isso eu sei fazer'", 'same'],
  ['pt:\'Isto eu não quero fazer\'', 'pt:\'Isso eu não quero fazer\'', 'same'],
  ["pt:'Do que eu preciso para isto?'", "pt:'Do que eu preciso para isso?'", 'same'],
  ["pt:'Quer fazer comigo?'", "pt:'Quer fazer dupla comigo?'", 'fazer has no object; dupla is THE Brazilian school word'],
  ['pt:\'Alguém está sendo malvado comigo\'', 'pt:\'Alguém está mexendo comigo\'', 'malvado is a storybook villain'],
  ["pt:'Eu sou novo aqui'", 'pt:\'É o meu primeiro dia aqui\'', 'gender'],
  ["pt:'Quero brincar sozinho'", 'pt:\'Quero brincar só eu\'', 'gender'],
  ["pt:'Preciso ir ao banheiro'", "pt:'Posso ir ao banheiro?'", 'the Brazilian school register for this is permission, universally'],
  ["pt:'Ainda estou trabalhando'", "pt:'Ainda estou fazendo'", 'Brazilian children do not TRABALHAR on schoolwork'],
  ["pt:'Preciso de uma pausinha'", "pt:'Preciso descansar um pouco'", 'pausa is not in a Brazilian six-year-old school vocabulary'],
  ['pt:\'Preciso de um lenço\'', 'pt:\'Preciso de um lenço de papel\'', 'bare lenco is also a headscarf'],
];

let applied = 0;
const missed = [];
FIX.forEach(([a, b]) => {
  if (s.indexOf(a) >= 0) { s = s.replace(a, b); applied++; }
  else missed.push(a);
});

if (!DRY) fs.writeFileSync(P, s, 'utf8');
console.log(`  applied ${applied}/${FIX.length} panel corrections${DRY ? ' (dry run)' : ''}`);
if (missed.length) {
  /* ⚠ A NEEDLE THAT NO LONGER MATCHES IS A FAULT, NOT A SKIP. */
  console.error(`\n  ${missed.length} needle(s) did not match — these corrections were NOT applied:`);
  missed.forEach((m) => console.error('    ' + m));
  process.exit(1);
}
