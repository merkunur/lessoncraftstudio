#!/usr/bin/env node
/**
 * gen-it-chartcount.js — generate the it chart-count (Conta nel diagramma) landing
 * entries on the countable catalog (the facts minus 8 culled non-countable/locale-
 * invalid themes that match the validity gate).
 *
 * Honest-count binding: per-category count = facts.count (= rendered bar height,
 * the manifest icon occurrences). The native-Italian singular/plural is resolved
 * from an OVERRIDE map authored + verified by a native scuola-primaria educator
 * (vocab gaps, icon-misdepictions, mechanical errors) FIRST, else from the native-
 * verified it vocabulary. Prose p2 counts AND practiceProblems answers both draw
 * from the SAME facts → agree by construction with the chart. Operator gate: ZERO
 * mismatches.
 *
 * Ledger: K.MD.B.3 (recognition), strand Relazioni, dati e previsioni (Indicazioni
 * nazionali — Matematica), classe-prima (talnumbers within 10), "Quante/Quanti
 * {plural} ci sono?" framing (count-framing required: chart-count side).
 *
 * Reads:  scripts/seo-landing/_it-cc-facts.json      (Stage-A server dump)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (it [sing,plural,gender])
 *         frontend/config/topics-taxonomy.json        (axes.theme.<key>.name.it)
 * Writes: filter OUT existing chart-count landings in it.json, append the new set
 *         (idempotent), preserve the rest.
 *
 * Usage: node scripts/seo-landing/gen-it-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');

const DRY = process.argv.includes('--dry-run');
const IT = 'frontend/content/seo-landing/it.json';

// Cull: themes the validity gate excludes for "count how many objects" — non-
// countable-discrete (activities=verbs/sports, emotions=faces, weather/seasons=
// abstract, body_parts per operator, 4th_of_july per operator). Decks stay /decks/,
// no landing. These match the 8 NOT in the valid coords.
const CULL_THEMES = new Set([
  '4th_of_july', 'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
  // farm_animals: two distinct "cat" image-variant bars (locName "Gatto" + "Gatto 2")
  // both resolve to plural "gatti" -> ambiguous honest-count prose ("3 gatti ... 2 gatti");
  // merging would break the chart-prose binding (chart has two cat bars, not one). Deck stays /decks/.
  'farm_animals',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_it-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// [singular, plural, gender] override map — resolved by nounKey, checked BEFORE the
// it vocabulary. Authored + verified by a native it scuola-primaria educator. Three
// classes:
//  (a) VOCAB GAPS — VOCAB[key].it is null/missing (tree species, dragonfruit, octogon,
//      musical note, spanner, rocker).
//  (b) ICON-MISDEPICTIONS — the facts label mis-describes the rendered ICON (translated
//      from the es/sv icon-verified OVERRIDE: same thumbnails). The same icons the sv
//      OVERRIDE fixed, translated to native Italian.
//  (c) MECHANICAL/GAP PLURAL ERRORS — only where the it vocab plural is genuinely wrong
//      for the icon. The it vocab is native-verified, so this class is small.
const OVERRIDE_IT = {
  // (a) vocab gaps — tree theme (icon = a TREE) + dragonfruit + octogon + note + tools
  palm:        ['Palma', 'Palme', 'f'],            // una palma → palme
  fir:         ['Abete', 'Abeti', 'm'],            // un abete → abeti
  oak:         ['Quercia', 'Querce', 'f'],         // una quercia → querce
  cedar:       ['Cedro', 'Cedri', 'm'],            // un cedro → cedri
  walnut:      ['Noce', 'Noci', 'f'],              // una noce → noci (also "albero di noce")
  maple:       ['Acero', 'Aceri', 'm'],            // un acero → aceri
  dragonfruit: ['Frutto del drago', 'Frutti del drago', 'm'], // un frutto del drago → frutti del drago
  octogon:     ['Ottagono', 'Ottagoni', 'm'],      // un ottagono → ottagoni
  note:        ['Nota musicale', 'Note musicali', 'f'], // icon: musical note
  spanner:     ['Chiave inglese', 'Chiavi inglesi', 'f'], // icon: wrench/spanner tool
  rocker:      ['Sedia a dondolo', 'Sedie a dondolo', 'f'], // icon: rocking chair

  // (b) icon-misdepictions — verified against the deck thumbnail (es/sv-parity icons)
  liberty:       ['Statua della Libertà', 'Statue della Libertà', 'f'], // icon: Statue of Liberty (NOT "libertà")
  'uncle-sam':   ['Zio Sam', 'Zii Sam', 'm'],
  uncle_sam:     ['Zio Sam', 'Zii Sam', 'm'],
  autumn:        ['Albero autunnale', 'Alberi autunnali', 'm'], // icon: autumn-foliage tree (NOT "autunno")
  delivery:      ['Postino', 'Postini', 'm'],      // icon: mail-carrier person (NOT "consegna")
  santa:         ['Babbo Natale', 'Babbo Natale', 'm'], // invariant
  'santa-claus': ['Babbo Natale', 'Babbo Natale', 'm'],
  santa_claus:   ['Babbo Natale', 'Babbo Natale', 'm'],
  stamp:         ['Francobollo', 'Francobolli', 'm'], // icon: postage stamp (NOT "timbro"=rubber stamp)
  truck:         ['Furgone postale', 'Furgoni postali', 'm'], // post_office icon: mail truck
  bed:           ["Letto d'ospedale", "Letti d'ospedale", 'm'], // hospital bed
  bracelet:      ['Braccialetto', 'Braccialetti', 'm'], // hospital identification bracelet
  cape:          ['Mantello', 'Mantelli', 'm'],    // superhero cape (NOT "capo")
  pliers:        ['Pinza', 'Pinze', 'f'],          // tool; it vocab gave plural "Pinze" — fix singular
  cymbals:       ['Piatto', 'Piatti', 'm'],        // musical cymbals; it vocab gave plural "Piatti" — fix singular
  earmuffs:      ['Paraorecchie', 'Paraorecchie', 'f'], // invariable plural (locName "Paraorecchii" was a wrong plural)
  garlic:        ['Aglio', 'Agli', 'm'],           // mass noun mis-counted as "4 aglio"; "agli" = garlic bulbs, valid for counting
  pomegranate:   ['Melagrana', 'Melagrane', 'f'],  // icon: pomegranate FRUIT (f, le melagrane); facts locName "Melograno" was the masculine tree → wrong gender

  // (c) mechanical/gap plural errors — corrected to the standard it plural
  'tyrannosaurus-rex': ['Tyrannosaurus rex', 'Tyrannosaurus rex', 'm'], // invariant (NOT "Rex")
};

function resolveIt(nounKey) {
  const base = nounKey.replace(/-\d+$/, '');
  if (OVERRIDE_IT[nounKey]) return OVERRIDE_IT[nounKey];
  if (OVERRIDE_IT[base]) return OVERRIDE_IT[base];
  if (OVERRIDE_IT[base.replace(/-/g, '_')]) return OVERRIDE_IT[base.replace(/-/g, '_')];
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, '')];
  if (base !== nounKey) cands.push(base, base.replace(/-/g, '_'), base.replace(/-/g, ''));
  for (const k of cands) { if (VOCAB[k] && VOCAB[k].it) return VOCAB[k].it; }
  return null;
}

// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set([
  'Babbo Natale', 'Statua della Libertà', 'Statue della Libertà',
  'Zio Sam', 'Zii Sam', 'Tyrannosaurus rex', 'USA',
]);
const lc = (s) => PROPER.has(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

function themeDisplay(themeKey) {
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.it) ? e.name.it : themeKey;
}

// list-join: "3 mele, 4 banane e 5 pere"
function itList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' e ' + items[items.length - 1];
}

// --- native-it prose, parent register ("tuo figlio"), classify-count-represent
// (data), warm/no-shame, talnumbers 0–10, no timer/points. theme + the deck's own
// nouns woven through. ex = 2–3 of the deck's category nouns (plural, lowercased).
// COUNT-FRAMING REQUIRED (chart-count side: "conta / quante"). ---
function p1(T, ex, i) {
  const [a, b, c] = ex;
  return [
    // 0 — question opening
    `Quante ${a.bare} ci sono in questa scheda a tema ${T}? È proprio questa la domanda da cui parte tuo figlio. Prima raggruppa le immagini uguali, poi conta una per una e colora una casella nella colonna giusta. Mentre la colonna ${a.di} cresce accanto a quella ${b.di}, il bambino legge il diagramma con un solo sguardo e capisce quale gruppo ne ha di più. È il primo passo per organizzare i dati: classificare, contare e confrontare le quantità entro il 10, con calma e senza fretta.`,
    // 1 — scene opening
    `Sul tavolo del tema ${T} sono sparse tante figurine: ${a.bare}, ${b.bare} e ${c.bare} mescolate insieme. Il compito di tuo figlio è mettere ordine – ${a.bare} con ${a.bare}, ${b.bare} con ${b.bare} – e contare quante ce ne sono di ogni tipo. Per ogni immagine colora una casella, e poco alla volta nasce un pittogramma con una colonna per categoria. Quando il diagramma è completo, basta guardarlo per vedere quale gruppo è il più numeroso. Così il bambino allena conteggio e classificazione in modo concreto, con i suoi tempi tranquilli.`,
    // 2 — skill-statement opening
    `Classificare per categoria, contare e confrontare: sono le tre abilità che questa scheda a tema ${T} allena insieme. Tuo figlio osserva ${a.def} e ${b.def}, mette da parte quelle uguali, conta ogni gruppo e colora le caselle finché ogni colonna si alza. Anche ${c.def} trovano la loro colonna nel diagramma. Alla fine il bambino vede subito quale categoria ne ha di più e quale di meno, tutto nell'ambito dei numeri entro il 10 e senza nessuna fretta.`,
    // 3 — invitation opening
    `Vieni a contare con tuo figlio in questa scheda a tema ${T}! Insieme guardate le immagini, raccogliete ${a.def} da una parte e ${b.def} dall'altra, e contate quante ce ne sono di ciascun tipo. Per ogni figurina si colora una casella nella colonna giusta, così il pittogramma cresce riga dopo riga. Quando anche ${c.def} hanno la loro colonna, confrontate insieme le altezze e scoprite il gruppo più numeroso. Un modo concreto e sereno per ordinare i dati e contare entro il 10.`,
    // 4 — "Immagina…" opening
    `Immagina di dover mettere ordine in un mucchio di immagini a tema ${T}: ${a.bare}, ${b.bare}, ${c.bare} tutte insieme. È quello che fa tuo figlio in questa scheda. Prima divide le figurine per tipo, poi conta ogni gruppo e colora una casella per ciascuna immagine, finché ogni colonna del diagramma è completa. Vedere ${a.def} e ${b.def} affiancate aiuta il bambino a confrontare le quantità con un colpo d'occhio. Si lavora con calma, entro il 10, senza orologi e senza punteggi.`,
    // 5 — category-noun lead
    `${a.def.charAt(0).toUpperCase() + a.def.slice(1)}, ${b.bare} e ${c.bare}: in questa scheda a tema ${T} le immagini vanno prima raggruppate per tipo e poi contate. Tuo figlio mette insieme quelle uguali, conta quante ce ne sono in ogni gruppo e colora una casella per ognuna, costruendo casella dopo casella un pittogramma. Quando le colonne sono pronte, il bambino legge il diagramma e capisce quale categoria è la più numerosa. È un primo, concreto incontro con l'organizzazione dei dati, sempre entro i numeri fino al 10.`,
    // 6 — reassurance opening
    `Nessuna fretta e nessun voto: questa scheda a tema ${T} è solo un modo tranquillo per imparare a contare e a ordinare i dati. Tuo figlio raggruppa ${a.def} con ${a.def}, ${b.def} con ${b.def}, conta ogni gruppo e colora una casella per immagine nella colonna giusta. Mano a mano cresce un diagramma in cui anche ${c.def} hanno il loro posto. Se ricontare una colonna serve, va benissimo: si guarda di nuovo con calma. Tutto resta entro il 10, ben gestibile per un bambino di prima.`,
    // 7 — "Hai mai…" opening
    `Hai mai provato a contare quante figurine ci sono di ogni tipo? In questa scheda a tema ${T} tuo figlio fa proprio questo: separa ${a.def} ${b.da}, conta ogni gruppo e colora le caselle finché il pittogramma è pieno. ${c.def.charAt(0).toUpperCase() + c.def.slice(1)} occupano la loro colonna accanto alle altre, e così il diagramma mostra a colpo d'occhio quale categoria vince per numero. Il bambino indica ogni immagine mentre conta, senza saltarne nessuna, con tutto il tempo che gli serve e senza pressione.`,
    // 8 — process-step opening
    `Si comincia osservando: in questa scheda a tema ${T} tuo figlio guarda le immagini e decide quali vanno insieme. ${a.def.charAt(0).toUpperCase() + a.def.slice(1)} formano un gruppo, ${b.def} un altro, e così via. Poi conta quante ce ne sono di ciascuno e colora una casella per ogni figurina, riempiendo le colonne del diagramma. Quando anche ${c.def} sono al loro posto, il pittogramma si legge in un attimo e svela il gruppo più numeroso. Conteggio e classificazione si allenano qui in modo concreto, entro il 10.`,
    // 9 — purpose / "Serve a…" opening
    `A che cosa serve questa scheda a tema ${T}? A insegnare a tuo figlio a raccogliere i dati e a leggerli. Il bambino classifica le immagini – ${a.bare}, ${b.bare}, ${c.bare} – le conta gruppo per gruppo e colora una casella per ognuna, finché ogni colonna del diagramma è completa. Confrontando l'altezza della colonna ${a.di} con quella ${b.di}, capisce subito quale categoria ne ha di più. È un esercizio sereno e concreto, sempre nell'ambito dei numeri entro il 10 e senza nessun cronometro.`,
    // 10 — "Guarda bene…" / observation opening
    `Guarda bene le immagini della scheda a tema ${T}: alcune sono uguali, altre diverse. Tuo figlio le ordina per tipo, raccoglie ${a.def} insieme e ${b.def} a parte, e conta quante ce ne sono in ogni gruppo. Poi colora una casella per ciascuna figurina, e così cresce un pittogramma con una colonna per categoria. Anche ${c.def} avranno la loro. Alla fine il bambino confronta le quantità con un solo sguardo, lavorando con calma entro il 10 e senza punteggi da inseguire.`,
    // 11 — game-framing opening
    `Contare può diventare un piccolo gioco: in questa scheda a tema ${T} tuo figlio cerca tutte ${a.def}, poi tutte ${b.def}, le raggruppa e le conta. Per ogni immagine colora una casella nella colonna giusta, e il diagramma si riempie pian piano, comprese le colonne ${c.di}. Quando tutto è completo, il bambino guarda quale colonna è la più alta e scopre la categoria più numerosa. Un modo concreto e divertente per classificare, contare e confrontare entro il 10, con i propri tempi.`,
  ][i % 12];
}

function p3(T, top, ex, i) {
  const [a, b] = ex;
  return [
    // 0 — print-first practical
    `La scheda a tema ${T} si può stampare in PDF per lavorare sulla carta, oppure si può fare direttamente sullo schermo – sempre gratis e senza registrarsi. Non ci sono cronometri né punteggi: tuo figlio decide il proprio ritmo, senza vergogna se sbaglia a contare, perché ricontare una colonna – guardare ancora una volta la colonna ${top.di}, per esempio – fa parte dell'imparare. L'attività si collega alle Indicazioni nazionali e all'ambito Relazioni, dati e previsioni della matematica, e va benissimo per la classe prima, intorno ai 6 anni. Come passo successivo potete contare di nuovo ${a.def} e confrontare le colonne.`,
    // 1 — download-online
    `Puoi scaricare il PDF a tema ${T} per stamparlo, oppure fare la versione interattiva online – gratis e senza account. Niente orologio e niente punti: ogni bambino procede con i suoi tempi, con calore e senza pressione. L'attività si collega alle Indicazioni nazionali nell'ambito Relazioni, dati e previsioni (matematica) ed è pensata per la classe prima, intorno ai 6 anni. Quando tuo figlio ha finito di contare ${a.def} e ${b.def}, è bello confrontare le colonne e vedere se quella ${top.di} è la più alta.`,
    // 2 — "tutto gratis" lead
    `Tutto gratis: stampa la scheda a tema ${T} per lavorare sulla carta, oppure falla online senza bisogno di registrarti. Non ci sono cronometri né punteggi; rivedere e ricontare ${a.def} è anch'esso un modo di imparare. La scheda si collega alle Indicazioni nazionali, all'ambito Relazioni, dati e previsioni (matematica), e va bene per i bambini della classe prima, intorno ai 6 anni. Il passo successivo è confrontare quale categoria ha più immagini – forse sono ${top.def}?`,
    // 3 — diagram lead
    `Questo diagramma a tema ${T} è gratis, da stampare in PDF o da fare online, senza registrazione. Niente orologi e niente punti: tuo figlio sceglie il proprio ritmo, con un tono gentile. La scheda si collega alle Indicazioni nazionali, nell'ambito Relazioni, dati e previsioni (matematica), e va benissimo per la classe prima, intorno ai 6 anni. Alla fine potete confrontare le colonne ${a.di} e ${b.di} – e vedere se quella ${top.di} è la più alta – consolidando insieme la lettura del pittogramma.`,
    // 4 — "a casa" / home extension
    `A casa puoi stampare la scheda a tema ${T} in PDF, oppure aprirla online: in ogni caso è gratuita e non serve registrarsi. Senza cronometri e senza voti, tuo figlio conta con calma e, se vuole, ricontrolla la colonna ${a.di}. La scheda è in linea con le Indicazioni nazionali, ambito Relazioni, dati e previsioni della matematica, ed è adatta alla classe prima, intorno ai 6 anni. Dopo, potete cercare in casa altri oggetti come ${b.def} e provare a contarli allo stesso modo.`,
    // 5 — collaborative parent lead
    `Sedetevi vicini: stampate la scheda a tema ${T} oppure fatela online, è gratis e senza account. Niente orologio, niente punteggio, solo il piacere di contare insieme ${a.def} e ${b.def}. L'attività richiama le Indicazioni nazionali nell'ambito Relazioni, dati e previsioni (matematica) ed è pensata per la classe prima, verso i 6 anni. Come continuazione, chiedi a tuo figlio quale colonna è la più alta – se sono ${top.def} – e perché.`,
    // 6 — "quando serve" flexible
    `Quando ti serve, hai la scheda a tema ${T} pronta da stampare in PDF o da usare online, sempre gratis e senza registrazione. Non c'è alcun timer e nessun punteggio: ricontare ${a.def} con calma è soltanto un altro modo di imparare. La scheda si collega alle Indicazioni nazionali, ambito Relazioni, dati e previsioni (matematica), ed è adatta alla classe prima, intorno ai 6 anni. Poi potete confrontare le colonne e scoprire se ${top.def} sono davvero il gruppo più numeroso.`,
    // 7 — next-step lead
    `Come passo successivo, dopo aver contato ${a.def} e ${b.def}, tuo figlio può confrontare tutte le colonne del diagramma a tema ${T}. La scheda è gratuita: si stampa in PDF o si usa online senza account. Nessun cronometro e nessun voto accompagnano il lavoro, così il bambino procede sereno. L'attività è in linea con le Indicazioni nazionali, ambito Relazioni, dati e previsioni della matematica, ed è adatta alla classe prima, verso i 6 anni. La domanda finale è semplice: la colonna ${top.di} è la più alta?`,
    // 8 — reassurance / no-shame lead
    `Sbagliare a contare non è un problema: in questa scheda a tema ${T} si può sempre ricontare la colonna ${a.di} con tutta la calma necessaria, perché non ci sono orologi né punteggi. La scheda è gratis, da stampare in PDF o da fare online senza registrarsi. Si collega alle Indicazioni nazionali, all'ambito Relazioni, dati e previsioni (matematica), e va benissimo per la classe prima, intorno ai 6 anni. Per continuare, confrontate ${b.def} con le altre categorie e cercate il gruppo più numeroso.`,
    // 9 — printable-PDF practical lead
    `Il PDF a tema ${T} si stampa in un attimo per lavorare sul quaderno, ma puoi anche usare la versione online: entrambe sono gratuite e senza account. Tuo figlio conta a modo suo, senza timer e senza voti, e se vuole ricontrolla quante sono ${a.def}. La scheda richiama le Indicazioni nazionali, ambito Relazioni, dati e previsioni della matematica, ed è adatta alla classe prima, intorno ai 6 anni. Poi confrontate le colonne ${b.di} e delle altre categorie per trovare la più alta.`,
    // 10 — question-to-extend lead
    `Quale gruppo avrà vinto, ${top.def} o un altro? Dopo aver completato il diagramma a tema ${T}, tuo figlio confronta le colonne e lo scopre. La scheda è gratuita, da stampare in PDF o da fare online senza registrazione, e senza alcun cronometro o punteggio. Si collega alle Indicazioni nazionali, ambito Relazioni, dati e previsioni (matematica), ed è pensata per la classe prima, verso i 6 anni. Come gioco in più, provate a contare di nuovo ${a.def} e ${b.def} a voce alta.`,
    // 11 — gentle-rhythm lead
    `Con i suoi tempi e in tutta serenità, tuo figlio porta a termine la scheda a tema ${T}, che puoi stampare in PDF o aprire online gratis e senza account. Niente orologio e niente stelline: contare ${a.def} e ${b.def} resta un piacere tranquillo. L'attività è in linea con le Indicazioni nazionali, ambito Relazioni, dati e previsioni della matematica, ed è adatta alla classe prima, intorno ai 6 anni. Alla fine, confrontate insieme le colonne e guardate se sono ${top.def} la categoria più numerosa.`,
  ][i % 12];
}

function buildEntry(deck, i, report) {
  const T = themeDisplay(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    const it = resolveIt(c.nounKey);
    if (!it) { report.unresolved.push(`${c.nounKey} (${deck.themeKey})`); continue; }
    cats.push({ sing: it[0], plural: it[1], gender: it[2] || 'm', count: c.count });
  }
  if (cats.length < 2) { report.droppedDecks.push(`${deck.slug} (only ${cats.length} resolved cats)`); return null; }

  // p2: HONEST-COUNT weave — "3 mele, 4 banane e 5 pere" (count + lc sing/plural)
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = itList(items);
  // gender-articled forms per category noun, computed from c.gender + phonetics.
  // Masculine plural article is "gli" before vowel / s-impura / z / gn / ps / pn / x / y / i+vowel,
  // else "i"; di/da contract accordingly (degli/dei, dagli/dai). Feminine plural is always "le".
  //   bare = "carrelli"/"mele" (no article — count/genitive position)
  //   def  = "i carrelli"/"gli avocado"/"le mele" (definite-article position)
  //   di   = "dei carrelli"/"degli avocado"/"delle mele" (di+article position)
  //   da   = "dai carrelli"/"dagli avocado"/"dalle mele" (da+article position)
  const mascPlArt = (noun) => {
    const w = noun.trim().toLowerCase();
    if (/^[aeiouàèéìòóùâêîôû]/.test(w)) return 'gli';        // vowel
    if (/^s[bcdfgklmnpqrtvwxz]/.test(w)) return 'gli';       // s-impura
    if (/^(z|gn|ps|pn|x|y)/.test(w)) return 'gli';           // z / gn / ps / pn / x / y
    if (/^i[aeiouàèéìòóù]/.test(w)) return 'gli';            // semiconsonant i+vowel
    return 'i';
  };
  const articled = (c) => {
    const bare = lc(c.plural);
    let art, di, da;
    if (c.gender === 'm') {
      const m = mascPlArt(bare);
      art = m;
      di = m === 'gli' ? 'degli' : 'dei';
      da = m === 'gli' ? 'dagli' : 'dai';
    } else {
      art = 'le';
      di = 'delle';
      da = 'dalle';
    }
    return { bare, def: art + ' ' + bare, di: di + ' ' + bare, da: da + ' ' + bare };
  };
  const ex = cats.map(articled);
  const top = articled([...cats].sort((a, b) => b.count - a.count)[0]);

  const p2 = [
    // 0
    `In questa scheda tuo figlio conta ${list}. Mentre colora una casella per ogni immagine, la colonna più alta mostra con un solo sguardo quale gruppo ne ha di più e quale di meno. Indicare con il dito ogni immagine mentre si conta aiuta tuo figlio a non perdere il conto e a controllare la risposta.`,
    // 1
    `Qui tuo figlio conta ${list}. Ogni gruppo ha la sua colonna, così quando la scheda è completa si vede subito quale categoria è diventata la più alta e quale la più bassa. Contare e nello stesso tempo indicare ogni immagine fa sì che tuo figlio non ne salti nessuna e possa rivedere la risposta con calma.`,
    // 2
    `Nel diagramma di questa scheda tuo figlio conta ${list}. Una casella colorata per ogni figurina fa salire la colonna giusta, e a colpo d'occhio il bambino confronta le altezze e capisce quale gruppo è il più numeroso. Toccare ogni immagine mentre la conta lo aiuta a tenere il segno e a non sbagliare il totale.`,
    // 3
    `Contiamo insieme: in questa scheda tuo figlio conta ${list}. Man mano che colora le caselle, le colonne crescono e raccontano una piccola storia di quantità, in cui si legge subito chi ne ha di più e chi di meno. Indicare le immagini una a una mentre si conta gli permette di ricontrollare con tranquillità ogni colonna.`,
    // 4
    `Il compito di conteggio è chiaro: tuo figlio conta ${list}. Ogni categoria riempie la propria colonna del pittogramma, perciò appena la scheda è completa il confronto tra i gruppi diventa immediato. Seguire con il dito ogni figurina mentre la conta è il piccolo trucco che evita di saltarne qualcuna e rende la verifica serena.`,
    // 5
    `In questa attività tuo figlio conta ${list}. Colorando una casella per immagine fa crescere le colonne del diagramma, e così vede con un solo sguardo quale gruppo è il più alto e quale il più basso. Contare indicando ogni figurina lo aiuta a non perdere il conto e a riguardare con calma il risultato.`,
  ][i % 6];

  // practiceProblems — "Quanti/Quante {plural} ci sono?" (agree with plural gender)
  const pp = cats.map((c) => ({
    q: `${c.gender === 'm' ? 'Quanti' : 'Quante'} ${lc(c.plural)} ci sono?`,
    a: String(c.count),
  }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: 'classe-prima' },
    levels: ['infanzia', 'classe-prima'],
    eyebrow: 'Scheda: Conta nel diagramma',
    h1: `Conta e completa il diagramma: ${T} – per la classe prima`,
    strand: 'Relazioni, dati e previsioni',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), T, 'Classe prima'],
    p1: p1(T, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], i),
    p2,
    p3: p3(T, top, [ex[0], ex[1] || ex[0]], i),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
    ...(deck.siblings.length > 1 ? { collapseSiblings: deck.siblings } : {}),
  };
}

// --- build ---
const culled = facts.filter((d) => CULL_THEMES.has(d.themeKey)).map((d) => d.themeKey);
const targets = facts.filter((d) => !CULL_THEMES.has(d.themeKey));
const report = { unresolved: [], droppedDecks: [] };
const entries = [];
targets.forEach((d, i) => { const e = buildEntry(d, i, report); if (e) entries.push(e); });

// --- summary ---
console.log('=== gen-it-chartcount summary ===');
console.log('themes processed (countable):', targets.length, '/ facts', facts.length);
console.log('culled (non-countable, ' + culled.length + '):', culled.join(', '));
console.log('categories skipped (unresolved, ' + report.unresolved.length + '):', report.unresolved.join(', ') || '(none)');
console.log('decks dropped (<2 cats, ' + report.droppedDecks.length + '):', report.droppedDecks.join(', ') || '(none)');
console.log('total entries built:', entries.length);
if (entries.length) {
  const s = entries[0];
  console.log('--- sample entry [' + s.slug + '] ---');
  console.log('  h1:', s.h1);
  console.log('  p2:', s.p2);
  console.log('  practiceProblems:', JSON.stringify(s.practiceProblems));
}

// --- honest-count assertion: every practiceProblem answer must appear with the same
// number in p2's count list (defence in depth — both come from facts but assert it).
// Strip the "Quante |Quanti " prefix and " ci sono?" suffix, match "(\d+) <noun>". ---
let mismatch = 0;
for (const e of entries) {
  for (const pp of e.practiceProblems) {
    const noun = pp.q.replace(/^(Quante|Quanti) /, '').replace(/ ci sono\?$/, '');
    const re = new RegExp('(\\d+) ' + noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const m = e.p2.match(re);
    if (m && m[1] !== pp.a) { console.error('  HONEST-COUNT MISMATCH ' + e.slug + ': p2 "' + m[0] + '" vs pp a=' + pp.a); mismatch++; }
  }
}
if (mismatch) { console.error('HONEST-COUNT: ' + mismatch + ' mismatch(es) — halting.'); process.exit(1); }
console.log('honest-count assertion: clean (p2 counts ↔ practiceProblems answers agree)');

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// --- read / filter-out existing chart-count / append / write (idempotent) ---
let cur = { _note: 'IT landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(IT, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged)); // validate serializable
fs.writeFileSync(IT, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; it.json total landings now ' + merged.landings.length);
