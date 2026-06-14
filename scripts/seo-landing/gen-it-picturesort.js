#!/usr/bin/env node
/* IT picture-sort "-vs-" PAIRS × scuola dell'infanzia, READINESS (Raggruppare e classificare).
 * The de-orphan's content side, ported to Italian (cloned from gen-sv-picturesort.js). Each page sorts
 * the pictures of TWO themes (A,B) into two groups; the body references BOTH themes' concrete nouns.
 *
 * render2 is PURE SUBSTITUTION (no morphology in code):
 *   {A_NPL}/{B_NPL} -> nPl                    bare concrete-noun list ("con {A_NPL}", "tra {A_NPL}")
 *   {A_GRP}/{B_GRP} -> genArt + ' ' + gen     definite collective ("gli accessori") — object/subject/
 *                                              after con/tra/da una parte; NEVER after a/di/su/in/da
 *   {A_H1}/{B_H1}   -> h1                      display (only h1/carousel, built by the gen)
 *
 * NO `standard` key (readiness). CHART-COUNT FENCE: sort/group lexicon only, NEVER count-framing
 * (no conta/quante/quanti/quanto/numero/quantità as an instruction; only negated "non si conta, si ordina").
 * DIGIT-FREE body. 12×8=96 cells > 71 pairs (§22.1 cell-space invariant): the coprime bijection gives
 * every pair a DISTINCT (SKEL,P2) cell so no two pairs share a template.
 * Usage: node scripts/seo-landing/gen-it-picturesort.js
 */
'use strict';
const fs = require('fs');
const _itThemes = require('./it-themes');           // it-themes exports THEMES directly (module.exports = THEMES)
const THEMES = _itThemes.THEMES || _itThemes;       // tolerate both {THEMES} and direct-export shapes
const IT = 'frontend/content/seo-landing/it.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/it-picture-sort-coordinates.json', 'utf8')).coordinates;

// PURE SUBSTITUTION — Italian agreement lives in the stored values, never computed; literal placeholder->value.
function render2(tpl, vals) {
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vals[k]);
  });
  return s;
}
// preposition+article contractions, keyed by the theme's stored plural article (i/gli/le)
const PREP_A = { i: 'ai', gli: 'agli', le: 'alle' };
const PREP_DA = { i: 'dai', gli: 'dagli', le: 'dalle' };

// ===== Frames (T1 native it; {A_NPL}/{B_NPL} bare lists, {A_GRP}/{B_GRP} definite collectives).
// Warm parent register ("il bambino"/"il piccolo"/"tuo figlio"), scuola dell'infanzia.
// Both themes referenced in every frame. SORT/GROUP mechanic; counting only as the negated divergence. =====
const SKEL = [
  'Su questa scheda per la scuola dell\'infanzia, le immagini di {A_NPL} e di {B_NPL} sono tutte mescolate sullo stesso foglio, una accanto all\'altra senza alcun ordine. Il compito del bambino è semplice e bello: mettere ogni immagine nel suo gruppo, raggruppando {A_GRP} da una parte e {B_GRP} dall\'altra. Qui non si conta, si ordina: il piccolo guarda con calma ogni figura e si chiede a quale gruppo appartiene, che cosa va insieme e che cosa fa parte della stessa categoria. Così impara a dividere le cose in due gruppi e a classificare in base a ciò che le immagini hanno in comune, una capacità preziosa in vista della scuola. Tutto al ritmo tranquillo di tuo figlio, con tanti elogi.',
  'Che bel pasticcio allegro! Le immagini di {A_NPL} e di {B_NPL} sono finite alla rinfusa su un unico foglio. Il bambino osserva con calma ogni figura e la mette dove appartiene: {A_GRP} insieme, {B_GRP} insieme. Non deve numerare nulla, deve solo riconoscere che cosa va insieme e che cosa è della stessa categoria. Proprio questo, ordinare e classificare, è una vera capacità dell\'infanzia: il piccolo nota le somiglianze, confronta e divide in due gruppi. Questo esercizio sereno di guardare e mettere insieme rafforza il pensiero logico senza fretta, senza cronometro e senza mai contare. Loda ogni immagine che trova il gruppo giusto.',
  'Immagina un foglio in cui le immagini di {A_NPL} e di {B_NPL} stanno sparse alla rinfusa, l\'una vicino all\'altra. È proprio quello che trovi qui, e tocca a tuo figlio rimettere ordine. Guarda ogni figura e decide: appartiene {A_TO} oppure {B_TO}? Immagine dopo immagine, ciascuna raggiunge il suo gruppo giusto. Quando il bambino ordina, esercita il classificare: riconosce ciò che è della stessa categoria, confronta e raggruppa secondo ciò che va insieme. Questa capacità è un mattoncino importante per la scuola. E la cosa più bella: qui si guarda e si ordina, non si conta mai. Ogni figura sistemata bene merita una festa.',
  '«A quale gruppo appartiene questa figura?» È la domanda che accompagna tutta la scheda. Le immagini di {A_NPL} e di {B_NPL} sono mescolate, e il bambino le divide con gli occhi: {A_GRP} da una parte, {B_GRP} dall\'altra. Si ferma su ogni figura e riflette su che cosa va insieme e che cosa forma una categoria a sé. Ordinare così significa classificare, una capacità che più avanti aiuterà tuo figlio a mettere in ordine sia le idee sia i compiti. Qui non si conta niente; il piccolo guarda, riconosce ciò che è della stessa categoria e raggruppa. Un esercizio calmo e affettuoso, senza cronometro, tutto al ritmo del bambino.',
  'Mettere insieme le cose che vanno insieme: ecco il cuore di questa scheda. Le immagini di {A_NPL} e di {B_NPL} si sono mescolate per bene, ed è ora di ordinarle. Il bambino raggruppa ogni figura nel posto giusto: {A_GRP} formano una categoria, {B_GRP} un\'altra. A ogni immagine si chiede che cosa va insieme e che cosa va tenuto da parte. Così nasce la comprensione delle categorie e dei tratti comuni, ordinare e classificare come una capacità autentica in vista della scuola. Qui nessuno conta nulla; si tratta solo di guardare, confrontare e mettere insieme. Senza pressioni e senza punteggi, al ritmo di tuo figlio e con tanti incoraggiamenti.',
  'Su questo foglio dell\'infanzia, le immagini di {A_NPL} e di {B_NPL} aspettano, mescolate, di essere ordinate. Il bambino prende ogni figura e la mette nel suo gruppo: {A_GRP} insieme e {B_GRP} insieme. Che cosa va insieme, e che cosa forma una categoria a sé? Proprio questo confrontare e raggruppare è classificare, una capacità che più tardi aiuterà tuo figlio a ordinare pensieri e attività. Niente si conta; il piccolo guarda, riconosce ciò che è della stessa categoria e ordina. Un esercizio tranquillo e gentile, senza cronometro: si guarda e si ordina, non si conta, tutto al ritmo del bambino.',
  'Sul foglio vedi le immagini di {A_NPL} e di {B_NPL} allegramente sparse l\'una accanto all\'altra. Il bambino le ordina in due gruppi: tutto ciò che appartiene {A_TO} da una parte, tutto ciò che appartiene {B_TO} dall\'altra. Guarda con attenzione ogni figura e riflette su che cosa va insieme. Questo ordinare esercita il classificare: notare i tratti distintivi e formare le categorie. È una capacità importante per la scuola. Qui non si conta nulla; conta solo la domanda a quale gruppo appartiene un\'immagine. Gli elogi e la pazienza rendono l\'esercizio ancora più bello, e ogni figura sistemata bene merita un sorriso.',
  'Niente paura se all\'inizio sembra un gran disordine: è proprio quello il bello. Sul foglio le immagini di {A_NPL} e di {B_NPL} sono mescolate, e il bambino rimette tutto a posto. Ordina ogni figura nel gruppo giusto: {A_GRP} da una parte e {B_GRP} dall\'altra. Quali cose vanno insieme, che cosa è della stessa categoria? Mentre ordina e classifica, il piccolo impara a riconoscere le somiglianze e a dividere in due gruppi secondo i tratti comuni, una capacità di base per il pensiero strutturato a scuola. Nessuno deve contare qui; si tratta di guardare, confrontare e mettere al posto giusto, senza fretta e con un elogio per ogni gruppo completato.',
  'Un allegro brulichio accoglie tuo figlio su questo foglio dell\'infanzia: le immagini di {A_NPL} e di {B_NPL} stanno l\'una sull\'altra e chiedono di essere ordinate. Con gli occhi come unico strumento, il bambino le divide in due gruppi: {A_GRP} si raccolgono in un punto, {B_GRP} in un altro. A ogni figura si ferma e si domanda che cosa va insieme e che cosa forma una categoria a sé. Ordinare così è classificare: il piccolo nota i tratti distintivi, confronta e raggruppa per somiglianza. Passo dopo passo rafforza il pensiero logico in vista della scuola. Non c\'è mai nulla da contare, solo un tranquillo guardare e ordinare, al ritmo di tuo figlio e con un elogio per ogni figura azzeccata.',
  'Una pagina intera di immagini di {A_NPL} e di {B_NPL} tutte mescolate, senza alcun ordine: ecco la sfida gentile di oggi. Qui il bambino diventa colui che rimette le cose a posto. Con calma e metodo sposta ogni figura dove appartiene: {A_GRP} nel loro gruppo, {B_GRP} nel loro. Che cosa unisce le cose di un gruppo, e che cosa le distingue dall\'altro? Questo gioco dell\'ordinare allena la capacità di classificare: vedere gli schemi, confrontare e dividere secondo i tratti distintivi. È un mattoncino che porterà tuo figlio lontano a scuola. Su questo foglio non si deve contare niente; importa solo a quale gruppo appartiene ogni immagine. Siediti vicino, fai piccole domande e festeggia ogni figura ben sistemata.',
  'Questa scheda comincia con un bel disordine: le immagini di {A_NPL} e di {B_NPL} sono mescolate in lungo e in largo. Il bambino mette ordine ordinando figura per figura in due gruppi chiari, {A_GRP} da una parte e {B_GRP} dall\'altra. Che cosa è della stessa categoria, e che cosa non va insieme? Quando il piccolo raggruppa in questo modo esercita il classificare: riconoscere i tratti comuni e dividere di conseguenza. Quella capacità aiuta tuo figlio a pensare in modo ordinato all\'infanzia e poi a scuola. Qui si guarda e si ordina, non si conta mai. Lascia che l\'esercizio prenda il tempo che gli serve, senza cronometro e senza punteggi, con tanti incoraggiamenti lungo il cammino.',
  'Due tipi di immagini, un unico foglio in disordine: le immagini di {A_NPL} e di {B_NPL} stanno alla rinfusa e aspettano tuo figlio. Con lo sguardo il bambino smonta il caos e ordina ogni figura nel suo gruppo: {A_GRP} hanno casa in un punto, {B_GRP} in un altro. A ogni soggetto riflette: va di qua o di là, che cosa è della stessa categoria? Ordinare e classificare così pone le basi del pensiero logico, ed è una vera capacità dell\'infanzia prima dell\'inizio della scuola. Non serve contare nulla; l\'unica cosa importante è guardare, confrontare e mettere al posto giusto. Un momento gentile e calmo insieme, senza pressioni e con un elogio per ogni gruppo che si completa.',
];
const P2 = [
  'Ecco come si fa: il bambino guarda le immagini mescolate e mette ciascuna in uno dei due gruppi, {A_GRP} oppure {B_GRP}. A ogni figura decide che cosa va insieme. Potete riflettere insieme: «A quale gruppo appartiene questa?» Loda ogni scelta, anche quando tuo figlio ha bisogno di pensarci un poco. Non c\'è limite di tempo né punteggio: solo guardare, confrontare e ordinare al vostro ritmo.',
  'Sedetevi insieme con calma e osservate le immagini mescolate. Il bambino le ordina in due gruppi: {A_GRP} da una parte, {B_GRP} dall\'altra. Chiedi pure: «Che cosa hanno in comune queste cose?» Così tuo figlio impara a riconoscere e a confrontare i tratti distintivi. Niente si conta, conta solo che cosa è della stessa categoria. Del tutto senza pressioni, con tanta pazienza ed elogi.',
  'Questo esercizio è bello e semplice: guarda l\'immagine, rifletti, mettila nel gruppo giusto. Il bambino separa {A_GRP} {B_FROM} e sistema ogni figura dove appartiene. Puoi accompagnarlo ragionando insieme su che cosa va insieme. Se qualcosa finisce nel gruppo sbagliato non è un problema: si guarda di nuovo, con dolcezza. Nessun conteggio, nessun cronometro, solo un tranquillo ordinare e classificare.',
  'Lascia che tuo figlio lavori al suo ritmo. Guarda ogni immagine e decide se appartiene {A_TO} o {B_TO}. Mentre ordina consolida il classificare, una capacità importante dell\'infanzia. Fai piccole domande: «Perché questa va qui?» Così l\'ordinare diventa una piccola conversazione. Qui non si tratta mai di contare, ma sempre di quali cose vanno insieme e formano un gruppo.',
  'Rendetevelo facile e bello: il bambino guarda, confronta e ordina. Divide le immagini mescolate in due categorie, {A_GRP} e {B_GRP}. Ogni figura trova il suo posto nel gruppo giusto. Gli elogi aiutano più delle correzioni, perciò festeggia ogni scelta azzeccata. Non ci sono punteggi né tempo che scorre: solo il calmo mettere in ordine secondo i tratti distintivi, senza mai contare.',
  'Qui il bambino si allena a guardare con attenzione: quali immagini appartengono {A_TO}, quali {B_TO}? Figura per figura raggruppa ogni soggetto nel suo gruppo. Potete riflettere insieme su che cosa unisce le cose di un gruppo. Così cresce il senso delle categorie e dei tratti comuni. Questo esercizio di ordinamento se la cava benissimo senza cifre: conta solo che cosa va insieme, non quanto è grande qualcosa.',
  'Un\'occupazione tranquilla per un momento: il bambino prende le immagini mescolate e le ordina in due gruppi: {A_GRP} si mettono insieme, {B_GRP} si mettono insieme. Accompagnalo con domande gentili e tanti elogi. Se qualcosa si confonde, basta guardare di nuovo con calma. Nessuna pressione di tempo, niente conteggio: solo guardare e ordinare, non contare, al ritmo di tuo figlio.',
  'Mettetevi comodi e lascia guidare tuo figlio. Sceglie un\'immagine, ci riflette un attimo e la mette presso {A_GRP} oppure presso {B_GRP}. Puoi sostenerlo con piccole domande come «Secondo te a chi appartiene questa?» Ogni scelta merita un elogio, anche quelle che richiedono un po\' più di tempo. Qui non si tratta mai di numerare, solo di riconoscere che cosa è della stessa categoria e dividere in due gruppi, al ritmo del bambino.',
];
const P3 = 'Quando tuo figlio ha ordinato con impegno {A_GRP} e {B_GRP} nei loro gruppi, puoi essere davvero orgoglioso, perché ordinare e classificare è una capacità autentica in vista della scuola. Con ogni immagine che finisce nel gruppo giusto, il bambino si allena a guardare con attenzione, confrontare e mettere in ordine. Volete continuare? Nella nostra raccolta gratuita per l\'infanzia trovate molte altre schede di ordinamento con le immagini più diverse, sempre da guardare e ordinare, mai da contare. Scegliete insieme la prossima scheda e godetevi il momento tranquillo dell\'ordinare. Gli elogi e la pazienza sono la ricompensa più bella. Buon divertimento con l\'ordinare!';

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L = THEMES[co.left], R = THEMES[co.right];
  if (!L || !R) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_NPL: L.nPl, B_NPL: R.nPl,
    A_GRP: L.genArt + ' ' + L.gen, B_GRP: R.genArt + ' ' + R.gen,
    // contracted prep+article+collective ("a"+gli=agli, "da"+i=dai): a noun-phrase that
    // contracts the preposition with the stored article (the it-render PREP discipline).
    A_TO: PREP_A[L.genArt] + ' ' + L.gen, B_TO: PREP_A[R.genArt] + ' ' + R.gen,
    A_FROM: PREP_DA[L.genArt] + ' ' + L.gen, B_FROM: PREP_DA[R.genArt] + ' ' + R.gen,
    A_H1: L.h1, B_H1: R.h1,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'infanzia' },
    eyebrow: 'Scheda: Ordina le immagini',
    h1: 'Ordina le immagini: ' + L.h1 + ' e ' + R.h1 + ' – per la scuola dell\'infanzia',
    strand: 'Raggruppare e classificare',
    slotTokens: [L.nPl, R.nPl, L.h1, R.h1, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'infanzia', 'ordina'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Ordina le immagini: ' + nL.h1 + ' e ' + nR.h1, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(IT, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(IT, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); it.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY, no `standard` key, BOTH themes' nouns present, no count-FRAMING leak.
// CHART-COUNT FENCE: count-framing as an INSTRUCTION is forbidden; the negated/anti-count divergence
// ("non si conta, si ordina") is the only allowed use of any count word. Every conta*/quant* occurrence
// must sit inside a negation window. "numero"/"quantità" hard-forbidden outright.
const FENCE_HARD = ['numero', 'quantità', 'diagramma']; // count-framing tokens forbidden even negated
function inNegationWindow(lc, idx) {
  // negator BEFORE within ~28 chars: "non/mai/senza/niente/nessun/né ... conta/quante"
  const pre = lc.slice(Math.max(0, idx - 28), idx);
  if (/(non|mai|senza|niente|nessun\w*|né)\b[^.!?]*$/.test(pre)) return true;
  // negator AFTER (inversion): "conta nulla", "conta niente", "conta mai", "si conta ..., si ordina"
  const post = lc.slice(idx, idx + 30);
  return /^(cont\w*|quant\w*)[^.!?]*\b(nulla|niente|mai|nessun\w*|non)\b/.test(post);
}
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if (/[0-9]/.test(body)) { dig++; console.log('  BODY-DIGIT ' + e.slug); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  // FENCE: hard count-framing tokens forbidden outright
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  // any count-verb "cont*" (conta/contare/contiamo...) must sit in a negation window (the sort-not-count
  // divergence). Skip the benign Italian collisions that merely START with "cont": continu* (continuare),
  // content* (contento/contentezza), conto/racconto (story), incontr* (meet) — none are count-framing.
  let p = 0, m;
  while ((m = lc.indexOf('cont', p)) >= 0) {
    const tail = lc.slice(m);
    const benign = /^cont(inu|ent|raccont|o\b|i\b)/.test(tail) || /\bin?conto?\b/.test(lc.slice(Math.max(0, m - 2), m + 7)) || /^contorn/.test(tail);
    if (!benign && !inNegationWindow(lc, m)) { fence++; console.log('  CONTA-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, m - 18), m + 8).trim() + '"'); }
    p = m + 4;
  }
  // any "quant*" (quante/quanti/quanto) must sit in a negation window
  let q = 0, mq;
  while ((mq = lc.indexOf('quant', q)) >= 0) {
    if (!inNegationWindow(lc, mq)) { fence++; console.log('  QUANT-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, mq - 18), mq + 9).trim() + '"'); }
    q = mq + 5;
  }
  const co = COORDS.find(c => c.canonical === e.slug);
  const Lnpl = THEMES[co.left].nPl.toLowerCase();
  const Rnpl = THEMES[co.right].nPl.toLowerCase();
  const Lgen = THEMES[co.left].gen.toLowerCase();
  const Rgen = THEMES[co.right].gen.toLowerCase();
  const hasL = lc.includes(Lnpl) || lc.includes(Lgen);
  const hasR = lc.includes(Rnpl) || lc.includes(Rgen);
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' FENCE-LEAK' : 'no count-framing leak')
);
