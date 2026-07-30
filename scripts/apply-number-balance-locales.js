#!/usr/bin/env node
/* =====================================================================
   apply-number-balance-locales.js — the locale pass for Number Balance.

   ⚠ CURATION: builder drafts written IN the locale, never machine-
   translated, corrected in place by the per-locale native 3-agent
   ensembles (§A.13.48). [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6.

   ⚠ `equalsFrame` IS THE MOAT AND IT IS NOT A TRANSLATION. Every locale
   has a canonical way of SAYING the equals sign to a child, and the wrong
   one is what plants the misconception:
     de  "ist gleich"     — never "gibt", the read-aloud trap that turns
                            the equals sign into "and here comes the answer"
     nl  "is evenveel als" — literally "is as much as", the Dutch K-1 frame
     sv  "ar lika med"    · da "er lig med" · no "er lik"
     fi  "on yhta paljon kuin" — "is as much as", the Finnish frame
   These are the phrases the ensembles own; they are not derived from the
   English line.

   Usage: node scripts/apply-number-balance-locales.js [--write]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const P = path.join(__dirname, '..', 'mini tools', 'number-balance.js');
const WRITE = process.argv.includes('--write');
const LOC = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* key: [de, fr, it, es, pt, nl, sv, da, no, fi] */
const L = {
  title: ['Zahlenwaage', 'Balance des nombres', 'Bilancia dei numeri', 'Balanza numérica', 'Balança numérica', 'Getallenbalans', 'Talvåg', 'Talvægt', 'Tallvekt', 'Lukuvaaka'],
  instruction: ['Legt Zahlen in die Schalen. Der Balken ist nur waagerecht, wenn beide Seiten gleich viel wert sind.', 'Mettez des nombres dans les plateaux. Le fléau n’est horizontal que si les deux côtés valent la même chose.', 'Mettete i numeri nei piatti. L’asta è dritta solo quando i due lati valgono la stessa cosa.', 'Poned números en los platillos. El brazo solo queda recto cuando los dos lados valen lo mismo.', 'Coloquem números nos pratos. O braço só fica reto quando os dois lados valem a mesma coisa.', 'Leg getallen in de schalen. De balk is alleen recht als beide kanten evenveel waard zijn.', 'Lägg tal i skålarna. Balken är rak bara när båda sidorna är värda lika mycket.', 'Læg tal i skålene. Bjælken er kun lige, når begge sider er lige meget værd.', 'Legg tall i skålene. Bjelken er bare rett når begge sidene er verdt like mye.', 'Laittakaa lukuja vaakakuppeihin. Vipu on suorassa vain silloin, kun molemmat puolet ovat yhtä arvokkaat.'],
  trayLabel: ['Zahlen', 'Nombres', 'Numeri', 'Números', 'Números', 'Getallen', 'Tal', 'Tal', 'Tall', 'Luvut'],
  panLeft: ['Linke Schale', 'Plateau de gauche', 'Piatto di sinistra', 'Platillo izquierdo', 'Prato da esquerda', 'Linkerschaal', 'Vänster skål', 'Venstre skål', 'Venstre skål', 'Vasen kuppi'],
  panRight: ['Rechte Schale', 'Plateau de droite', 'Piatto di destra', 'Platillo derecho', 'Prato da direita', 'Rechterschaal', 'Höger skål', 'Højre skål', 'Høyre skål', 'Oikea kuppi'],
  hold: ['Balken festhalten', 'Bloquer le fléau', 'Tieni ferma l’asta', 'Sujetar el brazo', 'Segurar o braço', 'Balk vasthouden', 'Håll balken', 'Hold bjælken', 'Hold bjelken', 'Pidä vipua paikallaan'],
  letGo: ['Loslassen', 'Lâcher', 'Lascia andare', 'Soltar', 'Soltar', 'Loslaten', 'Släpp', 'Slip', 'Slipp', 'Päästä irti'],
  heldNote: ['Der Balken wird festgehalten. Wohin wird er kippen?', 'Le fléau est bloqué. De quel côté va-t-il pencher ?', 'L’asta è ferma. Da che parte penderà?', 'El brazo está sujeto. ¿Hacia dónde se va a inclinar?', 'O braço está preso. Para que lado vai pender?', 'De balk wordt vastgehouden. Welke kant gaat hij op?', 'Balken hålls fast. Åt vilket håll kommer den att luta?', 'Bjælken holdes fast. Hvilken vej vipper den?', 'Bjelken holdes fast. Hvilken vei kommer den til å vippe?', 'Vipua pidetään paikallaan. Kummalle puolelle se kallistuu?'],
  coverLeft: ['Linke Schale zudecken', 'Couvrir le plateau de gauche', 'Copri il piatto di sinistra', 'Tapar el platillo izquierdo', 'Tapar o prato da esquerda', 'Linkerschaal afdekken', 'Täck vänster skål', 'Dæk venstre skål', 'Dekk til venstre skål', 'Peitä vasen kuppi'],
  coverRight: ['Rechte Schale zudecken', 'Couvrir le plateau de droite', 'Copri il piatto di destra', 'Tapar el platillo derecho', 'Tapar o prato da direita', 'Rechterschaal afdekken', 'Täck höger skål', 'Dæk højre skål', 'Dekk til høyre skål', 'Peitä oikea kuppi'],
  uncover: ['Tuch wegnehmen', 'Enlever le tissu', 'Togli il telo', 'Quitar la tela', 'Tirar o pano', 'Doek weghalen', 'Ta bort tyget', 'Tag klædet af', 'Ta bort kledet', 'Ota liina pois'],
  coveredNote: ['Was muss unter dem Tuch liegen, damit es waagerecht wird?', 'Que faut-il sous le tissu pour que ce soit horizontal ?', 'Che cosa deve esserci sotto il telo perché sia dritta?', '¿Qué tiene que haber debajo de la tela para que quede recto?', 'O que tem de estar debaixo do pano para ficar reto?', 'Wat moet er onder de doek liggen om het recht te krijgen?', 'Vad måste ligga under tyget för att den ska bli rak?', 'Hvad skal der ligge under klædet, for at den bliver lige?', 'Hva må ligge under kledet for at den skal bli rett?', 'Mitä liinan alla pitää olla, jotta vipu on suorassa?'],
  showTotals: ['Zeigen, wie viel jede Schale wert ist', 'Montrer ce que vaut chaque plateau', 'Mostra quanto vale ogni piatto', 'Mostrar cuánto vale cada platillo', 'Mostrar quanto vale cada prato', 'Laten zien hoeveel elke schaal waard is', 'Visa vad varje skål är värd', 'Vis, hvad hver skål er værd', 'Vis hva hver skål er verdt', 'Näytä, paljonko kumpikin kuppi on arvoltaan'],
  showNotation: ['Aufschreiben, was der Balken macht', 'Écrire ce que fait le fléau', 'Scrivi che cosa fa l’asta', 'Escribir lo que hace el brazo', 'Escrever o que o braço faz', 'Opschrijven wat de balk doet', 'Skriv vad balken gör', 'Skriv, hvad bjælken gør', 'Skriv hva bjelken gjør', 'Kirjoita, mitä vipu tekee'],
  clearPans: ['Schalen leeren', 'Vider les plateaux', 'Svuota i piatti', 'Vaciar los platillos', 'Esvaziar os pratos', 'Schalen leegmaken', 'Töm skålarna', 'Tøm skålene', 'Tøm skålene', 'Tyhjennä kupit'],
  sayIt: ['Laut vorlesen', 'Le dire à voix haute', 'Dillo ad alta voce', 'Decirlo en voz alta', 'Dizer em voz alta', 'Hardop zeggen', 'Säg det högt', 'Sig det højt', 'Si det høyt', 'Sano se ääneen'],
  andWord: ['und', 'et', 'e', 'y', 'e', 'en', 'och', 'og', 'og', 'ja'],
  /* ⚠ THE MOAT — the canonical spoken equals-sign frame per locale */
  equalsFrame: ['{left} ist gleich {right}', '{left} est égal à {right}', '{left} è uguale a {right}', '{left} es igual a {right}', '{left} é igual a {right}', '{left} is evenveel als {right}', '{left} är lika med {right}', '{left} er lig med {right}', '{left} er lik {right}', '{left} on yhtä paljon kuin {right}'],
  heavierFrame: ['{heavy} ist mehr als {light}', '{heavy} est plus que {light}', '{heavy} è più di {light}', '{heavy} es más que {light}', '{heavy} é mais do que {light}', '{heavy} is meer dan {light}', '{heavy} är mer än {light}', '{heavy} er mere end {light}', '{heavy} er mer enn {light}', '{heavy} on enemmän kuin {light}'],
  emptyPan: ['nichts', 'rien', 'niente', 'nada', 'nada', 'niets', 'ingenting', 'ingenting', 'ingenting', 'ei mitään'],
  gateBig: ['Zahlen über zehn gehören zum Lehrer-Paket.', 'Les nombres au-delà de dix font partie de l’offre Enseignant.', 'I numeri oltre il dieci fanno parte del piano Insegnante.', 'Los números por encima de diez son parte del plan Docente.', 'Os números acima de dez fazem parte do plano Professor.', 'Getallen boven de tien horen bij het Leerkracht-pakket.', 'Tal över tio ingår i Lärarpaketet.', 'Tal over ti er en del af Lærerpakken.', 'Tall over ti er en del av Lærerpakken.', 'Kymmentä suuremmat luvut kuuluvat Opettaja-tilaukseen.'],
  gatePrint: ['Das Drucken gehört zum Lehrer-Paket.', 'L’impression fait partie de l’offre Enseignant.', 'La stampa fa parte del piano Insegnante.', 'La impresión es parte del plan Docente.', 'A impressão faz parte do plano Professor.', 'Afdrukken hoort bij het Leerkracht-pakket.', 'Utskrift ingår i Lärarpaketet.', 'Udskrivning er en del af Lærerpakken.', 'Utskrift er en del av Lærerpakken.', 'Tulostus kuuluu Opettaja-tilaukseen.'],
  printBtn: ['Waage drucken', 'Imprimer la balance', 'Stampa la bilancia', 'Imprimir la balanza', 'Imprimir a balança', 'Balans afdrukken', 'Skriv ut vågen', 'Udskriv vægten', 'Skriv ut vekta', 'Tulosta vaaka'],
  unlock: ['Lehrer-Paket ansehen', 'Voir l’offre Enseignant', 'Vedi il piano Insegnante', 'Ver el plan Docente', 'Ver o plano Professor', 'Bekijk het Leerkracht-pakket', 'Se Lärarpaketet', 'Se Lærerpakken', 'Se Lærerpakken', 'Katso Opettaja-tilaus'],
  privacyLine: ['Hier wird nichts gespeichert, gezählt oder irgendwohin gesendet.', 'Rien ici n’est enregistré, compté ni envoyé où que ce soit.', 'Qui non si salva, non si conta e non si invia nulla.', 'Aquí no se guarda, no se cuenta ni se envía nada.', 'Aqui nada é guardado, contado nem enviado para lugar nenhum.', 'Hier wordt niets bewaard, geteld of ergens naartoe gestuurd.', 'Ingenting här sparas, räknas eller skickas någonstans.', 'Intet her bliver gemt, talt eller sendt nogen steder hen.', 'Ingenting her blir lagret, talt eller sendt noe sted.', 'Täällä ei tallenneta, lasketa eikä lähetetä mitään.'],
  setSpeak: ['Die Zahl sagen, wenn ein Plättchen gelegt wird', 'Dire le nombre quand on pose un jeton', 'Di’ il numero quando si mette una tessera', 'Decir el número al poner una ficha', 'Dizer o número ao pôr uma peça', 'Het getal zeggen als je een fiche neerlegt', 'Säg talet när en bricka läggs i', 'Sig tallet, når en brik lægges i', 'Si tallet når en brikke legges i', 'Sano luku, kun laatta asetetaan']
};

let src = fs.readFileSync(P, 'utf8');
let done = 0;
const problems = [];

Object.keys(L).forEach((key) => {
  const re = new RegExp('^(\\s*' + key + ':\\s*)\\{ en: (\'(?:[^\'\\\\]|\\\\.)*\') \\},?$', 'm');
  const m = re.exec(src);
  if (!m) { problems.push('no en-only line for ' + key); return; }
  const vals = L[key];
  if (vals.length !== 10) { problems.push(key + ': expected 10 locales, got ' + vals.length); return; }
  const parts = ['en: ' + m[2]];
  LOC.slice(1).forEach((loc, i) => {
    const v = vals[i];
    if (/'/.test(v)) { problems.push(key + '.' + loc + ' has a straight apostrophe'); return; }
    parts.push(loc + ": '" + v + "'");
  });
  src = src.replace(re, m[1] + '{ ' + parts.join(', ') + ' },');
  done++;
});

/* every placeholder in en must survive into every locale */
['equalsFrame', 'heavierFrame'].forEach((key) => {
  const want = key === 'equalsFrame' ? ['{left}', '{right}'] : ['{heavy}', '{light}'];
  L[key].forEach((v, i) => {
    want.forEach((ph) => { if (v.indexOf(ph) === -1) problems.push(`${key}.${LOC[i + 1]} is missing ${ph}`); });
  });
});

const enOnly = (src.match(/^\s*([a-zA-Z]+):\s*\{ en: '(?:[^'\\]|\\.)*' \},?$/gm) || [])
  .map((s) => s.trim().split(':')[0]);
if (enOnly.length) problems.push('still en-only: ' + enOnly.join(', '));

if (problems.length) { console.error('HALT:\n  ' + problems.join('\n  ')); process.exit(1); }
console.log(`${done} keys localised into ${LOC.length} locales; every placeholder survived`);
if (!WRITE) { console.log('(dry run — pass --write)'); process.exit(0); }
fs.writeFileSync(P, src, 'utf8');
console.log('written');
