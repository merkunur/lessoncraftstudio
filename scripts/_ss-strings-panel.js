#!/usr/bin/env node
/* THROWAWAY — applies the German and French/Finnish native panels' string
   rulings to mini tools/syllable-splitter.js. Asserts every key it touches
   actually existed, and refuses to write if any assertion fails. */
'use strict';
const fs = require('fs');
const P = 'mini tools/syllable-splitter.js';
let s = fs.readFileSync(P, 'utf8');
const orig = s;
const L = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function body(vals) {
  if (vals.length !== 11) throw new Error('need 11 values, got ' + vals.length);
  return L.map((l, i) => l + ":'" + vals[i].replace(/'/g, "\\'") + "'").join(',');
}
function setKey(key, vals, note) {
  const re = new RegExp('^(\\s*)' + key + ':(\\s*)\\{[^\\n]*\\},?$', 'm');
  const m = re.exec(s);
  if (!m) throw new Error('missing key: ' + key);
  let line = m[1] + key + ':' + m[2] + '{' + body(vals) + '},';
  if (note) line = note + '\n' + line;
  s = s.slice(0, m.index) + line + s.slice(m.index + m[0].length);
  console.log('  set  ' + key);
}
function addAfter(anchor, key, vals, note) {
  const re = new RegExp('^(\\s*)' + anchor + ':(\\s*)\\{[^\\n]*\\},?$', 'm');
  const m = re.exec(s);
  if (!m) throw new Error('missing anchor: ' + anchor);
  let line = m[1] + key + ': {' + body(vals) + '},';
  if (note) line = note + '\n' + line;
  const at = m.index + m[0].length;
  s = s.slice(0, at) + '\n' + line + s.slice(at);
  console.log('  add  ' + key);
}

/* ⭐ label:value — agreement-free at every value of {i}. Both panels found
   "1 claps so far" / "1 taputusta" / "1 frappes" independently, in their
   own languages, before comparing notes. */
setKey('beatCount', [
  'Claps so far: {i}', 'Bisher geklatscht: {i}', 'Frappes jusqu’ici : {i}', 'Battiti finora: {i}',
  'Palmadas hasta ahora: {i}', 'Palmas até agora: {i}', 'Klappen tot nu toe: {i}', 'Klapp hittills: {i}',
  'Klap indtil nu: {i}', 'Klapp så langt: {i}', 'Taputuksia tähän mennessä: {i}'
], `    /* ⚠ LABEL:VALUE, DELIBERATELY. The natural phrasing "{i} claps so
       far" renders "1 claps so far" on the FIRST tap of every
       multi-syllable word — the most frequent announcement the tool makes.
       BOTH native panels found it independently: Finnish "1 taputusta" is
       ungrammatical (a numeral takes partitive singular above one) and
       French gives "1 frappes". \`penOne\` exists three keys away precisely
       to dodge this, and it was missed here. Label:value needs no
       agreement in any of the eleven. */`);

addAfter('seamHint', 'seamLabel', [
  'Syllable break', 'Silbengrenze', 'Coupure de syllabe', 'Divisione di sillaba', 'Corte de sílaba',
  'Divisão de sílaba', 'Klankgroepgrens', 'Stavelsegräns', 'Stavelsesgrænse', 'Stavelsesgrense', 'Tavuraja'
], `    /* the per-seam accessible name. \`seamHint\` is the panel's instruction
       PARAGRAPH, and naming every seam with it made up to 23 controls in
       one word announce the same full sentence — a screen-reader user
       could not tell seam 1 from seam 4. */`);

addAfter('listFull', 'tooLong', [
  'That word is too long for the letter row.', 'Dieses Wort ist zu lang für die Buchstabenreihe.',
  'Ce mot est trop long pour la rangée de lettres.', 'Questa parola è troppo lunga per la riga di lettere.',
  'Esa palabra es demasiado larga para la fila de letras.', 'Essa palavra é comprida demais para a linha de letras.',
  'Dat woord is te lang voor de letterrij.', 'Det ordet är för långt för bokstavsraden.',
  'Det ord er for langt til bogstavrækken.', 'Det ordet er for langt for bokstavraden.',
  'Tuo sana on liian pitkä kirjainriville.'
], `    /* ⚠ THESE TWO USED TO BE A BARE \`continue\`: the word vanished out of
       the box and the teacher was told nothing, which is indistinguishable
       from the tool being broken. German is where it bites — a
       Sachunterricht topic word is routinely over the letter cap. */`);

addAfter('tooLong', 'duplicateSkip', [
  'That word is already in the list.', 'Dieses Wort steht schon in der Liste.', 'Ce mot est déjà dans la liste.',
  'Questa parola è già nell’elenco.', 'Esa palabra ya está en la lista.', 'Essa palavra já está na lista.',
  'Dat woord staat al in de lijst.', 'Det ordet finns redan i listan.', 'Det ord står allerede på listen.',
  'Det ordet står allerede i lista.', 'Tuo sana on jo listalla.'
]);

addAfter('duplicateSkip', 'copyFailed', [
  'The link could not be copied.', 'Der Link konnte nicht kopiert werden.', 'Le lien n’a pas pu être copié.',
  'Non è stato possibile copiare il link.', 'No se pudo copiar el enlace.', 'Não foi possível copiar o link.',
  'De link kon niet worden gekopieerd.', 'Länken kunde inte kopieras.', 'Linket kunne ikke kopieres.',
  'Lenken kunne ikke kopieres.', 'Linkkiä ei voitu kopioida.'
]);

setKey('listFull', [
  'The list is full. Delete a word to add another.', 'Die Liste ist voll – bitte zuerst ein Wort löschen.',
  'La liste est pleine. Retirez un mot pour en ajouter un autre.', 'L’elenco è pieno. Elimina una parola per aggiungerne un’altra.',
  'La lista está llena. Elimina una palabra para añadir otra.', 'A lista está cheia. Exclua uma palavra para adicionar outra.',
  'De lijst is vol. Verwijder een woord om er een toe te voegen.', 'Listan är full. Ta bort ett ord för att lägga till ett nytt.',
  'Listen er fuld. Slet et ord for at tilføje et nyt.', 'Lista er full. Slett et ord for å legge til et nytt.',
  'Lista on täynnä. Poista jokin sana, niin voit lisätä uuden.'
]);

setKey('deviceOnly', [
  'Your words stay in this browser, on this device.', 'Gespeichert wird nur in diesem Browser, auf diesem Gerät.',
  'Vos mots restent dans ce navigateur, sur cet appareil.', 'Le vostre parole restano in questo browser, su questo dispositivo.',
  'Tus palabras se quedan en este navegador, en este dispositivo.', 'As suas palavras ficam neste navegador, neste aparelho.',
  'Je woorden blijven in deze browser, op dit apparaat.', 'Dina ord stannar i den här webbläsaren, på den här enheten.',
  'Dine ord bliver i denne browser, på denne enhed.', 'Ordene dine blir i denne nettleseren, på denne enheten.',
  'Sanasi säilyvät vain tässä selaimessa tällä laitteella.'
], `    /* ⚠ BROWSER, not merely device. localStorage is per-browser: the same
       teacher on the same laptop in a different browser sees nothing. The
       sibling Heart Words already said this correctly. */`);

setKey('printHint', [
  'One page of pictures and words. The class claps, then draws an arc under each part.',
  'Eine Seite mit den Wörtern der gewählten Sammlung. Die Klasse klatscht und malt dann unter jede Silbe einen Bogen.',
  'Une page d’images et de mots. La classe frappe, puis trace un arc sous chaque partie.',
  'Una pagina di immagini e parole. La classe batte e poi traccia un archetto sotto ogni parte.',
  'Una página de dibujos y palabras. La clase da palmadas y luego traza un arco bajo cada parte.',
  'Uma página de figuras e palavras. A turma bate palmas e depois traça um arco sob cada parte.',
  'Eén pagina met plaatjes en woorden. De klas klapt en tekent daarna een boog onder elk deel.',
  'En sida med bilder och ord. Klassen klappar och ritar sedan en båge under varje del.',
  'En side med billeder og ord. Klassen klapper og tegner derefter en bue under hver del.',
  'En side med bilder og ord. Klassen klapper og tegner så en bue under hver del.',
  'Sivullinen kuvia ja sanoja. Luokka taputtaa ja piirtää sitten kaaren jokaisen osan alle.'
]);

setKey('printSheet', [
  'Print a worksheet', 'Arbeitsblatt drucken', 'Imprimer une fiche', 'Stampa una scheda', 'Imprimir una ficha',
  'Imprimir uma ficha', 'Werkblad afdrukken', 'Skriv ut ett arbetsblad', 'Udskriv et arbejdsark',
  'Skriv ut et arbeidsark', 'Tulosta tehtäväsivu'
]);

setKey('backToPile', [
  'Send them all back', 'Alle zurücklegen', 'Tout renvoyer', 'Rimanda tutte indietro', 'Devolver todas',
  'Devolver todas', 'Alles terugleggen', 'Skicka tillbaka alla', 'Send dem alle tilbage', 'Send alle tilbake',
  'Palauta kaikki'
], `    /* ⚠ the handler is \`penOf = {}\` — it empties EVERY pen. "Back to the
       pile" described returning ONE card, and tapping the pile already does
       exactly that, so the tool had two gestures under one name and the
       button was the destructive one. */`);

setKey('addWords', [
  'Add the words', 'Diese Wörter übernehmen', 'Ajouter les mots', 'Aggiungi le parole', 'Agregar las palabras',
  'Adicionar as palavras', 'De woorden toevoegen', 'Lägg till orden', 'Tilføj ordene', 'Legg til ordene', 'Lisää sanat'
]);

setKey('copied', [
  'Link copied', 'Kopiert', 'Lien copié', 'Link copiato', 'Enlace copiado', 'Link copiado', 'Link gekopieerd',
  'Länken kopierad', 'Linket kopieret', 'Lenken kopiert', 'Linkki kopioitu'
]);

setKey('seamHint', [
  'Tap between the letters where you hear a new clap. Tap again to undo it.',
  'Tippen Sie zwischen die Buchstaben, wo Sie eine neue Silbe hören. Noch einmal tippen löst die Trennung.',
  'Touchez entre les lettres, là où vous entendez une nouvelle frappe. Touchez à nouveau pour annuler.',
  'Toccate tra le lettere dove sentite un nuovo battito. Toccate di nuovo per annullare.',
  'Toquen entre las letras donde oigan una palmada nueva. Toquen otra vez para deshacerlo.',
  'Toquem entre as letras onde ouvirem uma palma nova. Toquem outra vez para desfazer.',
  'Tik tussen de letters waar u een nieuwe klap hoort. Tik nogmaals om het ongedaan te maken.',
  'Tryck mellan bokstäverna där ni hör ett nytt klapp. Tryck igen för att ångra.',
  'Tryk mellem bogstaverne, hvor I hører et nyt klap. Tryk igen for at fortryde.',
  'Trykk mellom bokstavene der dere hører et nytt klapp. Trykk igjen for å angre.',
  'Napauta kirjainten väliä siitä kohdasta, jossa uusi taputus alkaa. Napauta uudelleen, niin jako poistuu.'
], `    /* the control TOGGLES; the shipped sentence described only one
       direction, so a teacher who mis-tapped had no stated way back.
       ⚠ AND THE DESK IS AN ADULT SURFACE — it takes the formal address in
       every locale that has one. The shipped German and French used the
       children's form here, on a panel the class never sees. */`);

setKey('ownWordsNote', [
  'These are your words, split the way you split them — we don’t check them.',
  'Das sind Ihre Wörter, so getrennt, wie Sie sie trennen – wir prüfen das nicht nach.',
  'Ce sont vos mots, découpés comme vous les découpez : nous ne les vérifions pas.',
  'Queste sono le vostre parole, divise come le dividete voi: noi non le controlliamo.',
  'Estas son sus palabras, separadas como usted las separa: nosotros no las comprobamos.',
  'Estas são as suas palavras, divididas como você as divide — nós não as verificamos.',
  'Dit zijn uw woorden, verdeeld zoals u ze verdeelt — wij controleren ze niet.',
  'Det här är dina ord, delade som du delar dem – vi kontrollerar dem inte.',
  'Det er dine ord, delt som du deler dem – vi tjekker dem ikke.',
  'Dette er dine ord, delt slik du deler dem – vi kontrollerer dem ikke.',
  'Nämä ovat sinun sanasi ja sinun tavujakosi – emme tarkista niitä.'
]);

setKey('sortHint', [
  'Tap a picture, then tap the field it belongs in.',
  'Tippt ein Bild an und dann den Korb, in den es gehört.',
  'Touchez une image, puis l’enclos où elle va.',
  'Toccate un’immagine, poi il recinto in cui va.',
  'Toquen una imagen y luego el corral al que pertenece.',
  'Toquem numa figura e depois no curral a que ela pertence.',
  'Tik op een plaatje en dan op de wei waar het hoort.',
  'Tryck på en bild och sedan på hagen där den hör hemma.',
  'Tryk på et billede, og tryk så på den fold, det hører til.',
  'Trykk på et bilde, og trykk så på innhegningen det hører hjemme i.',
  'Napauta kuvaa ja sitten aitausta, johon se kuuluu.'
], `    /* ⚠ ENGLISH SAYS "field", NOT "pen". In a tool full of letters and
       writing, \`pen\` lands on the writing instrument first — and \`hoop\`
       and \`ring\` are owned by the sibling Sorting Hoops. The other ten
       locales escaped this by accident, because Gehege / enclos / recinto /
       corral / hage / fold / aitaus are unambiguous. Both panels found it
       independently. */`);

/* ⚠ DEAD STRING. Declared in eleven locales, referenced nowhere — the
   fossil of the persistence gate that was never built, and precisely how
   the false `gatePremium` claim survived review. A15: no dead strings. */
const before = s;
s = s.replace(/\n[^\n]*saveWords:\s*\{[^\n]*\},?/, '');
if (s === before) throw new Error('saveWords not removed');
if (/saveWords/.test(s)) throw new Error('saveWords still referenced');
console.log('  del  saveWords (dead)');

fs.writeFileSync(P, s);
console.log('\nwritten; changed = ' + (s !== orig));
