#!/usr/bin/env node
/**
 * Fix Italian SEO title tags and meta descriptions to target ranges:
 *   - titleTag: 50–60 characters
 *   - metaDescription: 150–160 characters
 *
 * Usage: node scripts/fix-it-seo-lengths.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'frontend', 'config');

// ── Helper: extract string field handling escaped quotes ──
function extractStringField(raw, fieldName) {
  const fieldPattern = new RegExp(fieldName + ':\\s*\\n?\\s*');
  const fieldMatch = fieldPattern.exec(raw);
  if (!fieldMatch) return { value: '', start: -1, end: -1, rawValue: '' };

  const startIdx = fieldMatch.index + fieldMatch[0].length;
  const quoteChar = raw[startIdx];
  if (quoteChar !== "'" && quoteChar !== '"' && quoteChar !== '`') {
    return { value: '', start: -1, end: -1, rawValue: '' };
  }

  let result = '';
  let rawResult = '';
  let i = startIdx + 1;
  while (i < raw.length) {
    if (raw[i] === '\\' && i + 1 < raw.length) {
      result += raw[i + 1];
      rawResult += raw[i] + raw[i + 1];
      i += 2;
    } else if (raw[i] === quoteChar) {
      break;
    } else {
      result += raw[i];
      rawResult += raw[i];
      i++;
    }
  }
  return {
    value: result.replace(/\n\s*/g, ' ').trim(),
    start: startIdx,
    end: i + 1,
    rawValue: rawResult,
    quoteChar,
  };
}

// ── Title corrections (explicit for SEO quality) ──
const titleCorrections = {
  // APP-CONTENT (all too short)
  'app-content/it/addition': 'Generatore Schede di Addizione | Crea e Vendi Online',
  'app-content/it/alphabet-train': 'Generatore Treno dell\\\'Alfabeto | Crea e Vendi Schede',
  'app-content/it/big-small': 'Generatore Schede Grande e Piccolo | Crea Stampabili',
  'app-content/it/bingo': 'Generatore Cartelle Bingo con Immagini | Crea e Vendi',
  'app-content/it/coloring': 'Generatore Pagine da Colorare | Crea e Vendi Stampabili',
  'app-content/it/crossword': 'Generatore Cruciverba con Immagini | Crea e Vendi Online',
  'app-content/it/cryptogram': 'Generatore Schede Crittogramma | Crea e Vendi Online',
  'app-content/it/drawing-lines': 'Generatore Schede di Pregrafismo | Crea e Vendi Online',
  'app-content/it/find-and-count': 'Generatore Schede Cerca e Conta | Crea e Vendi Online',
  'app-content/it/find-objects': 'Generatore Schede Cerca Oggetti | Crea e Vendi Online',
  'app-content/it/grid-match': 'Generatore Puzzle a Griglia | Crea e Vendi Stampabili',
  'app-content/it/matching': 'Generatore Schede di Abbinamento | Crea e Vendi Online',
  'app-content/it/math-worksheet': 'Puzzle Algebrici Illustrati | Creare e Vendere Stampabili',
  'app-content/it/more-less': 'Generatore Schede Più o Meno | Crea e Vendi Stampabili',
  'app-content/it/picture-path': 'Generatore Schede Labirinti | Crea Percorsi Stampabili',
  'app-content/it/prepositions': 'Generatore Schede Preposizioni | Crea e Vendi Online',
  'app-content/it/shadow-match': 'Generatore Schede Abbinamento Ombre | Crea Stampabili',
  'app-content/it/subtraction': 'Generatore Schede di Sottrazione | Crea e Vendi Online',
  'app-content/it/sudoku': 'Generatore Sudoku con Immagini | Crea e Vendi Stampabili',
  'app-content/it/wordsearch': 'Generatore Schede Cerca Parole | Crea e Vendi Stampabili',
  'app-content/it/writing': 'Generatore Schede di Scrittura | Crea e Vendi Online',

  // TOOL-CONTENT (mostly too short)
  'tool-content/it/alphabet-train': 'Generatore Treno dell\\\'Alfabeto | Vendi Stampabili Online',
  'tool-content/it/big-small': 'Generatore Schede Grande e Piccolo | Crea e Vendi Online',
  'tool-content/it/bingo': 'Generatore Cartelle Bingo Illustrato | Crea Stampabili',
  'tool-content/it/cryptogram': 'Generatore Crittogrammi Stampabili | Crea e Vendi Puzzle',
  'tool-content/it/draw-and-color': 'Generatore Schede Disegno su Griglia | Crea e Vendi',
  'tool-content/it/find-and-count': 'Generatore Cerca e Conta | Schede Vedo Vedo Stampabili',
  'tool-content/it/image-subtraction': 'Generatore Schede Sottrazione Visiva | Cancella e Conta',
  'tool-content/it/matching': 'Generatore Schede Abbinamento | Traccia una Linea Maker',
  'tool-content/it/math-puzzle': 'Generatore Puzzle Matematici | Vendi Stampabili Online',
  'tool-content/it/math-worksheet': 'Generatore Esercizi di Matematica | Algebra Visuale Maker',
  'tool-content/it/more-less': 'Schede Maggiore Minore Uguale | Vendi Stampabili Online',
  'tool-content/it/odd-one-out': 'Generatore Schede Intruso | Trova l\\\'Intruso Stampabile',
  'tool-content/it/pattern-train': 'Generatore Treno delle Sequenze | Vendi Stampabili Online',
  'tool-content/it/pattern-worksheet': 'Generatore Schede Sequenze e Pattern | Crea e Vendi',
  'tool-content/it/picture-path': 'Generatore Percorso Immagini | Schede Labirinto Maker',
  'tool-content/it/prepositions': 'Generatore Schede Preposizioni | Vendi Stampabili Online',
  'tool-content/it/treasure-hunt': 'Generatore Caccia al Tesoro Stampabile | Prova Gratuita',
  'tool-content/it/word-guess': 'Generatore Schede Indovina la Parola | Crea Stampabili',
  'tool-content/it/word-scramble': 'Generatore Schede Parole Mescolate | Crea Stampabili',
  'tool-content/it/writing': 'Generatore Schede di Scrittura | Crea e Vendi Online',

  // GUIDE-CONTENT
  'guide-content/it/automate-printable-business': 'Automatizzare il Business di Stampabili | Guida Pratica',
  'guide-content/it/best-kdp-activity-book-niches': 'Migliori Nicchie Libri Attività KDP | Guida Completa',
  'guide-content/it/copyright-printable-sellers': 'Copyright per Venditori di Stampabili | Guida alle Basi',
  'guide-content/it/create-addition-worksheets': 'Creare Schede di Addizione | Guida Passo Passo per KDP',
  'guide-content/it/create-alphabet-worksheets': 'Creare Schede Treno dell\\\'Alfabeto | Guida per Venditori',
  'guide-content/it/create-bingo-cards': 'Creare Cartelle Bingo con Immagini | Guida Passo Passo',
  'guide-content/it/create-chart-count-worksheets': 'Creare Schede Grafici con Immagini | Guida per Venditori',
  'guide-content/it/create-coloring-pages': 'Creare Pagine da Colorare Stampabili | Guida per Etsy',
  'guide-content/it/create-counting-worksheets': 'Creare Schede di Conteggio e Grafici | Guida Completa',
  'guide-content/it/create-crossword-puzzles': 'Creare Cruciverba per Bambini | Guida Passo Passo Etsy',
  'guide-content/it/create-cryptogram-puzzles': 'Creare Crittogrammi Stampabili | Guida per Venditori',
  'guide-content/it/create-drawing-worksheets': 'Creare Schede Disegno e Simmetria | Guida per Venditori',
  'guide-content/it/create-etsy-worksheet-bundles': 'Creare Pacchetti di Schede per Etsy | Guida per Venditori',
  'guide-content/it/create-handwriting-sheets': 'Creare Schede di Scrittura a Mano | Guida Passo Passo',
  'guide-content/it/create-matching-worksheets': 'Creare Schede di Abbinamento Prescolare | Guida Completa',
  'guide-content/it/create-maze-worksheets': 'Creare Schede Labirinti per Bambini | Guida Completa',
  'guide-content/it/create-missing-pieces-puzzles': 'Creare Puzzle Pezzi Mancanti | Guida Passo Passo Etsy',
  'guide-content/it/create-odd-one-out-puzzles': 'Creare Schede Trova l\\\'Intruso | Guida Passo Passo',
  'guide-content/it/create-picture-sudoku': 'Creare Sudoku con Immagini per Bambini | Guida Vendita',
  'guide-content/it/create-preposition-worksheets': 'Creare Schede Preposizioni Spaziali | Guida per Venditori',
  'guide-content/it/create-printable-product-line': 'Creare una Linea di Prodotti Stampabili | Guida Completa',
  'guide-content/it/create-sell-tpt-resources': 'Creare e Vendere Risorse su TPT | Guida per Venditori',
  'guide-content/it/create-shadow-matching-worksheets': 'Creare Schede Discriminazione Visiva Ombre | Guida Etsy',
  'guide-content/it/create-sorting-worksheets': 'Creare Schede Classificazione Categorie | Guida Completa',
  'guide-content/it/create-subtraction-worksheets': 'Creare Schede di Sottrazione | Guida Passo Passo per KDP',
  'guide-content/it/create-treasure-hunt-worksheets': 'Creare Schede Caccia al Tesoro | Guida Passo Passo Etsy',
  'guide-content/it/create-word-search-puzzles': 'Creare Puzzle Cerca Parole | Guida Passo Passo per Etsy',
  'guide-content/it/create-worksheet-bundles': 'Creare Pacchetti di Schede Che Vendono | Guida Completa',
  'guide-content/it/customer-support-digital-products': 'Assistenza Clienti per Prodotti Digitali | Guida Completa',
  'guide-content/it/etsy-seo-educational-printables': 'SEO Etsy per Stampabili Educativi | Guida per Venditori',
  'guide-content/it/kdp-formatting-worksheets': 'Formattazione KDP per Schede Didattiche | Guida Completa',
  'guide-content/it/kdp-vs-etsy-printables': 'KDP o Etsy per Vendere Stampabili | Guida al Confronto',
  'guide-content/it/make-money-kdp-activity-books': 'Guadagnare con Libri di Attività KDP | Guida Completa',
  'guide-content/it/math-activity-books-kdp': 'Creare Libri di Attività Matematica per KDP | Guida',
  'guide-content/it/niche-selection-printables': 'Selezione della Nicchia per Venditori di Stampabili',
  'guide-content/it/price-etsy-printables': 'Prezzi Stampabili Etsy | Guida alla Strategia dei Prezzi',
  'guide-content/it/publish-puzzle-books-kdp': 'Pubblicare Libri di Puzzle su Amazon KDP | Guida Pratica',
  'guide-content/it/scale-printable-business-guide': 'Scalare il Business di Stampabili | Guida alla Crescita',
  'guide-content/it/sell-educational-printables-etsy': 'Vendere Stampabili Didattici su Etsy | Guida Completa',
  'guide-content/it/sell-math-worksheets-etsy': 'Vendere Schede di Matematica su Etsy | Guida Completa',
  'guide-content/it/sell-printables-gumroad': 'Come Vendere Stampabili su Gumroad | Guida per Venditori',
  'guide-content/it/sell-word-search-etsy': 'Vendere Cerca Parole su Etsy | Guida per Venditori KDP',
  'guide-content/it/start-etsy-printable-shop': 'Aprire un Negozio Etsy di Stampabili da Zero | Guida',
  'guide-content/it/sudoku-books-kdp': 'Libri Sudoku per Amazon KDP | Guida alla Pubblicazione',
  'guide-content/it/tpt-store-optimization': 'Ottimizzazione del Negozio TPT | Vendi Più Risorse',
  'guide-content/it/word-search-books-kdp': 'Creare Libri Cerca Parole per Amazon KDP | Guida Pratica',

  // IDEA-CONTENT (all too long — restructure to shorter form)
  'idea-content/it/back-to-school-printable-ideas': 'Stampabili Ritorno a Scuola da Vendere | Guida di Nicchia',
  'idea-content/it/birds-printable-ideas': 'Idee Stampabili sugli Uccelli da Vendere | Guida Nicchia',
  'idea-content/it/camping-printable-ideas': 'Idee Stampabili sul Campeggio da Vendere | Guida Nicchia',
  'idea-content/it/construction-printable-ideas': 'Idee Stampabili sull\\\'Edilizia da Vendere | Guida Nicchia',
  'idea-content/it/custom-worksheet-service-ideas': 'Servizio Schede Personalizzate da Vendere | Guida Nicchia',
  'idea-content/it/digital-download-printable-ideas': 'Schede in Download Digitale da Vendere | Guida Nicchia',
  'idea-content/it/dinosaur-printable-ideas': 'Idee Stampabili sui Dinosauri da Vendere | Guida Nicchia',
  'idea-content/it/esl-printable-ideas': 'Stampabili ESL Inglese Lingua Straniera | Guida Nicchia',
  'idea-content/it/farm-animals-printable-ideas': 'Stampabili Animali della Fattoria da Vendere | Guida',
  'idea-content/it/first-grade-printable-ideas': 'Idee Stampabili per la Prima Classe | Guida di Nicchia',
  'idea-content/it/food-cooking-printable-ideas': 'Idee Stampabili Cibo e Cucina da Vendere | Guida Nicchia',
  'idea-content/it/forest-animals-printable-ideas': 'Stampabili Animali del Bosco da Vendere | Guida Nicchia',
  'idea-content/it/halloween-printable-ideas': 'Idee Stampabili di Halloween da Vendere | Guida Nicchia',
  'idea-content/it/homeschool-printable-ideas': 'Stampabili per Istruzione Domestica | Guida di Nicchia',
  'idea-content/it/insects-printable-ideas': 'Idee Stampabili sugli Insetti da Vendere | Guida Nicchia',
  'idea-content/it/kindergarten-printable-ideas': 'Idee Stampabili per la Scuola Materna | Guida di Nicchia',
  'idea-content/it/math-facts-printable-ideas': 'Stampabili Operazioni Matematiche da Vendere | Guida',
  'idea-content/it/music-printable-ideas': 'Idee Stampabili sulla Musica da Vendere | Guida Nicchia',
  'idea-content/it/ocean-animals-printable-ideas': 'Stampabili Animali dell\\\'Oceano da Vendere | Guida Nicchia',
  'idea-content/it/parents-day-printable-ideas': 'Stampabili Festa Mamma e Papà da Vendere | Guida Nicchia',
  'idea-content/it/pets-printable-ideas': 'Stampabili Animali Domestici da Vendere | Guida di Nicchia',
  'idea-content/it/preschool-printable-ideas': 'Idee Stampabili per la Prescuola da Vendere | Guida',
  'idea-content/it/safari-animals-printable-ideas': 'Stampabili Animali del Safari da Vendere | Guida Nicchia',
  'idea-content/it/second-grade-printable-ideas': 'Idee Stampabili per la Seconda Classe | Guida di Nicchia',
  'idea-content/it/space-printable-ideas': 'Idee Stampabili sullo Spazio da Vendere | Guida Nicchia',
  'idea-content/it/special-education-printable-ideas': 'Stampabili per Educazione Speciale | Guida di Nicchia',
  'idea-content/it/subscription-box-printable-ideas': 'Stampabili per Box in Abbonamento | Guida di Nicchia',
  'idea-content/it/summer-learning-printable-ideas': 'Stampabili Apprendimento Estivo da Vendere | Guida',
  'idea-content/it/thanksgiving-printable-ideas': 'Stampabili Giorno del Ringraziamento | Guida di Nicchia',
  'idea-content/it/third-grade-printable-ideas': 'Idee Stampabili per la Terza Classe | Guida di Nicchia',
  'idea-content/it/transportation-printable-ideas': 'Idee Stampabili sui Trasporti da Vendere | Guida Nicchia',
  'idea-content/it/valentines-day-printable-ideas': 'Idee Stampabili di San Valentino | Guida di Nicchia',

  // BUNDLE-CONTENT
  'bundle-content/it/search-bundle': 'Pacchetto Cerca e Trova | 4 Generatori Schede Stampabili',

  // START-CONTENT
  'start-content/it/create-multilingual-worksheets': 'Generatore Schede Multilingue in 11 Lingue | Guida Pratica',
  'start-content/it/etsy-printable-business': 'Vendere Stampabili su Etsy | Masterclass Guida Completa',
  'start-content/it/marketing-printable-business': 'Come Promuovere Schede Stampabili Online | Guida Pratica',
  'start-content/it/printable-business-blueprint': 'Blueprint per Guadagnare con Stampabili | Idee e Guida',
  'start-content/it/tools-for-printable-business': 'Strumenti per Venditori di Stampabili | Guida Completa',
};

// ── Meta description corrections ──
// For metas that are too long, we trim. For too short, we expand.
// Each entry: new meta description string
const metaCorrections = {
  // APP-CONTENT (too long)
  'app-content/it/bingo': 'Crea cartelle bingo con immagini da vendere su Etsy, KDP e TPT. Lotti di cartelle uniche, export ZIP, fogli di richiamo. Prova gratuita con filigrana.',
  'app-content/it/matching': 'Crea schede di abbinamento per Etsy, KDP e TPT. 4 modalità, foglio risposte automatico, 104 temi, coppie configurabili. Prova gratuita con filigrana.',
  'app-content/it/missing-pieces': 'Crea puzzle pezzi mancanti da vendere su Etsy, KDP e TPT. 6 forme di pezzo, foglio risposte automatico, 104 temi. Prova gratuita con filigrana.',
  'app-content/it/odd-one-out': 'Crea schede trova l\\\'intruso per Etsy, KDP e TPT. Due modalità, foglio risposte automatico con cerchi rossi, 104 temi. Prova gratuita con filigrana.',
  'app-content/it/picture-sort': 'Crea schede classificazione immagini per Etsy, KDP e TPT. Due categorie, foglio risposte automatico, 104 temi. Prova gratuita con filigrana.',
  'app-content/it/shadow-match': 'Crea schede abbinamento ombre per Etsy, KDP e TPT. Modi Ombra e Completa, silhouette automatiche, 104 temi in PDF. Prova gratuita con filigrana.',

  // TOOL-CONTENT (too long)
  'tool-content/it/big-small': 'Genera schede confronto dimensioni con cinque tipi di domanda, modalità identiche e diverse, 104 temi. Esporta PDF. Prova gratuita con filigrana.',
  'tool-content/it/drawing-lines': 'Crea schede pregrafismo con otto modelli SVG, oltre 3.100 illustrazioni in 104 temi e riempimento automatico coppie. Prova gratuita con filigrana.',
  'tool-content/it/pattern-train': 'Genera schede treno sequenze: 5 tipi di schema, 11 vagoni tematici, indizi regolabili e chiave di risposta automatica. Prova gratuita con filigrana.',
  'tool-content/it/shadow-match': 'Crea schede abbinamento ombre con silhouette pixel-level, modalità Completa, chiavi di risposta automatiche, 104 temi. Prova gratuita con filigrana.',
  'tool-content/it/word-scramble': 'Genera schede parole mescolate con tessere lettere, indizi immagine, codifica vocali-consonanti, 4 livelli, 11 lingue. Prova gratuita con filigrana.',

  // GUIDE-CONTENT (too long)
  'guide-content/it/automate-printable-business': 'Automatizza il tuo business di stampabili con produzione batch, sistemi di template e flussi di lavoro sistematici. Scala la produzione su più piattaforme.',
  'guide-content/it/copyright-printable-sellers': 'Le basi del copyright per venditori di stampabili: elementi tutelabili, vantaggi registrazione, enforcement e come evitare violazioni nel tuo business.',
  'guide-content/it/create-addition-worksheets': 'Crea schede addizione per bambini. Guida passo passo: temi, difficoltà, fogli risposte ed esporta PDF da vendere su Etsy e Amazon KDP per venditori.',
  'guide-content/it/create-alphabet-worksheets': 'Crea schede treno alfabeto con vagoni colorati, due modalità, difficoltà configurabile e abbinamento lettere multilingue. Guida per Etsy e KDP.',
  'guide-content/it/create-counting-worksheets': 'Crea schede conteggio con grafici per immagini, chiavi di risposta automatiche e 104 temi. Guida passo passo per vendere su Etsy, KDP e TpT.',
  'guide-content/it/create-missing-pieces-puzzles': 'Crea puzzle pezzi mancanti con 6 forme pezzo, estrazione intelligente, pezzi distrattori e chiavi di risposta. Guida passo passo per Etsy e KDP.',
  'guide-content/it/create-sorting-worksheets': 'Crea schede classificazione a due categorie con 4-12 immagini, griglie ritaglio mescolate e chiavi di risposta automatiche. Vendi su Etsy e KDP.',
  'guide-content/it/customer-support-digital-products': 'Strategie di assistenza clienti per venditori digitali. Prevenzione problemi, modelli di risposta, gestione rimborsi e sistemi scalabili per il tuo shop.',
  'guide-content/it/email-marketing-printables': 'Email marketing per venditori di stampabili. Costruisci la lista iscritti, crea lead magnet, automatizza le sequenze e genera vendite ricorrenti online.',
  'guide-content/it/get-reviews-printable-products': 'Strategie per ottenere recensioni sui prodotti stampabili. Costruisci prova sociale, ottieni feedback autentico e rafforza la credibilità del negozio.',
  'guide-content/it/kdp-vs-etsy-printables': 'KDP o Etsy per venditori di stampabili. Confronta tariffe, formati, traffico e strategie multi-piattaforma per il tuo business di prodotti digitali.',
  'guide-content/it/multilingual-printable-business': 'Costruisci un business stampabili multilingue espandendoti nei mercati internazionali. Lingue target, flussi traduzione e strategie di ricavo.',
  'guide-content/it/passive-income-worksheets': 'Costruisci ricavi ricorrenti con le schede didattiche: cataloghi evergreen, distribuzione multi-piattaforma, espansione linguistica e crescita composta.',
  'guide-content/it/pinterest-marketing-worksheets': 'Marketing Pinterest per venditori di schede stampabili. Traffico a lungo termine con ottimizzazione pin, strategia bacheche e contenuti con parole chiave.',
  'guide-content/it/research-profitable-niches': 'Ricerca nicchie redditizie per stampabili con dati marketplace, analisi parole chiave, studio concorrenza, segnali di domanda e validazione sistematica.',
  'guide-content/it/scale-printable-business-guide': 'Scala il business stampabili con produzione batch, espansione multi-piattaforma, crescita catalogo, mercati multilingue e strategie di automazione.',
  'guide-content/it/seasonal-marketing-printables': 'Pianifica campagne stagionali per stampabili allineate ai cicli della domanda. Calendario venditori con tempistiche, parole chiave e strategie di picco.',
  'guide-content/it/social-media-printable-marketing': 'Marketing social media per venditori di stampabili: scelta piattaforme, contenuti visivi, costruzione pubblico e coinvolgimento che genera traffico.',
  'guide-content/it/understanding-commercial-licenses': 'Le licenze commerciali per stampabili spiegate. Tipi di licenza, errori comuni e come una licenza corretta protegge la tua attività di vendita online.',

  // IDEA-CONTENT (all too long — trim to 150-160)
  'idea-content/it/back-to-school-printable-ideas': 'Idee stampabili ritorno a scuola da vendere su Etsy, KDP e TPT. Concetti di prodotto per la classe, strategie luglio-settembre e consigli per venditori.',
  'idea-content/it/birds-printable-ideas': 'Idee redditizie di stampabili sugli uccelli da vendere su Etsy, KDP e TPT. Concetti di prodotto, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/bulk-licensing-printable-ideas': 'Idee per la licenza in volume di stampabili a scuole, distretti e organizzazioni. Strategie di licenza collettiva e prezzi per venditori di schede.',
  'idea-content/it/camping-printable-ideas': 'Idee stampabili a tema campeggio da vendere su Etsy, KDP e TPT. Concetti outdoor, strategie per piattaforma e consigli di nicchia per venditori.',
  'idea-content/it/christmas-printable-ideas': 'Idee stampabili di Natale da vendere su Etsy, KDP e TPT. Concetti natalizi, strategie stagionali e consigli per piattaforma per venditori di schede.',
  'idea-content/it/construction-printable-ideas': 'Idee stampabili sull\\\'edilizia da vendere su Etsy, KDP e TPT. Prodotti a tema veicoli da cantiere, attrezzi, strategie per piattaforma e consigli.',
  'idea-content/it/custom-worksheet-service-ideas': 'Idee per servizi di schede personalizzate per venditori Etsy e freelance. Stampabili educativi su misura con strategie di prezzo premium per ordine.',
  'idea-content/it/digital-download-printable-ideas': 'Idee di schede in download digitale per venditori Etsy, Gumroad e TPT. Business stampabili senza inventario con PDF educativi a consegna istantanea.',
  'idea-content/it/dinosaur-printable-ideas': 'Idee redditizie di stampabili sui dinosauri da vendere su Etsy, KDP e TPT. Concetti di prodotto, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/easter-printable-ideas': 'Idee stampabili di Pasqua da vendere su Etsy, KDP e TPT. Concetti prodotto primaverili, strategie stagionali e consigli per venditori di stampabili.',
  'idea-content/it/esl-printable-ideas': 'Idee stampabili ESL per inglese lingua straniera su Etsy, KDP e TPT. Strategie di nicchia per insegnanti, tutor e studenti di lingue nel mondo.',
  'idea-content/it/fairy-tale-printable-ideas': 'Idee stampabili a tema fiaba da vendere su Etsy, KDP e TPT. Prodotti a tema fiabesco, schede didattiche e strategie di nicchia per venditori.',
  'idea-content/it/farm-animals-printable-ideas': 'Idee stampabili sugli animali della fattoria da vendere su Etsy, KDP e TPT. Concetti di prodotto, strategie di prezzo e consigli per venditori.',
  'idea-content/it/first-grade-printable-ideas': 'Idee stampabili per la prima classe da vendere su Etsy, KDP e TPT. Concetti di prodotto e strategie per venditori nel mercato della prima elementare.',
  'idea-content/it/food-cooking-printable-ideas': 'Idee stampabili su cibo e cucina da vendere su Etsy, KDP e TPT. Prodotti a tema ricette, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/forest-animals-printable-ideas': 'Idee stampabili animali del bosco da vendere su Etsy, KDP e TPT. Prodotti creature del bosco, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/halloween-printable-ideas': 'Idee stampabili di Halloween da vendere su Etsy, KDP e TPT. Prodotti a tema spaventoso, strategie stagionali e consigli per venditori di schede.',
  'idea-content/it/homeschool-printable-ideas': 'Idee stampabili per istruzione domestica da vendere su Etsy, KDP e TPT. Strategie per venditori che puntano ai genitori con curricula homeschool.',
  'idea-content/it/insects-printable-ideas': 'Idee stampabili a tema insetti da vendere su Etsy, KDP e TPT. Prodotti su farfalle e insetti, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/kindergarten-printable-ideas': 'Idee stampabili per la scuola materna da vendere su Etsy, KDP e TPT. Concetti per il livello materna e strategie di nicchia per venditori online.',
  'idea-content/it/math-facts-printable-ideas': 'Idee stampabili operazioni matematiche da vendere su Etsy, KDP e TPT. Strategie per venditori che puntano a insegnanti e genitori con schede pratiche.',
  'idea-content/it/music-printable-ideas': 'Idee stampabili sulla musica da vendere su Etsy, KDP e TPT. Prodotti a tema strumenti musicali, strategie e consigli per questa nicchia sempreverde.',
  'idea-content/it/ocean-animals-printable-ideas': 'Idee stampabili animali dell\\\'oceano da vendere su Etsy, KDP e TPT. Prodotti a tema marino, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/parents-day-printable-ideas': 'Idee stampabili Festa della Mamma e del Papà su Etsy, KDP e TPT. Prodotti per l\\\'apprezzamento dei genitori e consigli per venditori di schede.',
  'idea-content/it/party-supply-printable-ideas': 'Idee articoli stampabili per feste per venditori Etsy. Pacchetti attività a tema, giochi, pagine da colorare e materiali per compleanni e celebrazioni.',
  'idea-content/it/pets-printable-ideas': 'Idee stampabili sugli animali domestici da vendere su Etsy, KDP e TPT. Prodotti su cani, gatti e piccoli animali con strategie per venditori.',
  'idea-content/it/physical-printable-product-ideas': 'Idee prodotti stampabili fisici per venditori Etsy e fiere. Costruisci un business premium stampando, plastificando e spedendo prodotti didattici.',
  'idea-content/it/pirates-printable-ideas': 'Idee stampabili a tema pirata da vendere su Etsy, KDP e TPT. Prodotti avventura piratesca, schede didattiche e strategie di nicchia per venditori.',
  'idea-content/it/preschool-printable-ideas': 'Idee stampabili per la prescuola da vendere su Etsy, KDP e TPT. Concetti per età prescolare e strategie di nicchia per venditori e imprenditori.',
  'idea-content/it/print-on-demand-printable-ideas': 'Idee stampabili print-on-demand per venditori Etsy, KDP e Shopify. Business senza inventario con quaderni, pacchetti attività e libri di puzzle.',
  'idea-content/it/safari-animals-printable-ideas': 'Idee stampabili sugli animali del safari da vendere su Etsy, KDP e TPT. Prodotti sulla fauna africana e consigli per piattaforma per venditori.',
  'idea-content/it/second-grade-printable-ideas': 'Idee stampabili per la seconda classe da vendere su Etsy, KDP e TPT. Concetti e strategie per venditori nel mercato della seconda elementare.',
  'idea-content/it/space-printable-ideas': 'Idee stampabili sullo spazio da vendere su Etsy, KDP e TPT. Prodotti a tema spaziale, strategie STEM e consigli per venditori di stampabili.',
  'idea-content/it/special-education-printable-ideas': 'Idee stampabili per educazione speciale su Etsy, KDP e TPT. Prodotti per insegnanti di sostegno, terapisti e genitori di alunni con bisogni speciali.',
  'idea-content/it/sports-printable-ideas': 'Idee stampabili sullo sport da vendere su Etsy, KDP e TPT. Prodotti a tema atletico, strategie per piattaforma e consigli per nicchia sempreverde.',
  'idea-content/it/spring-printable-ideas': 'Idee stampabili primaverili da vendere su Etsy, KDP e TPT. Concetti prodotto stagionali, strategie marzo-maggio e consigli per venditori di schede.',
  'idea-content/it/subscription-box-printable-ideas': 'Idee stampabili per box in abbonamento su Etsy, Gumroad e Patreon. Entrate ricorrenti con pacchetti mensili di schede didattiche e collezioni.',
  'idea-content/it/summer-learning-printable-ideas': 'Idee stampabili apprendimento estivo da vendere su Etsy, KDP e TPT. Prodotti stagionali per genitori, insegnanti e coordinatori centri estivi.',
  'idea-content/it/summer-printable-ideas': 'Idee stampabili estivi da vendere su Etsy, KDP e TPT. Prodotti a tema spiaggia e sole, strategie stagionali e consigli per venditori di schede.',
  'idea-content/it/thanksgiving-printable-ideas': 'Idee stampabili Giorno del Ringraziamento da vendere su Etsy, KDP e TPT. Prodotti a tema raccolto, strategie stagionali e consigli per venditori.',
  'idea-content/it/third-grade-printable-ideas': 'Idee stampabili per la terza classe da vendere su Etsy, KDP e TPT. Strategie di nicchia per venditori nel mercato della terza elementare e oltre.',
  'idea-content/it/transportation-printable-ideas': 'Idee stampabili sui trasporti da vendere su Etsy, KDP e TPT. Prodotti a tema veicoli, strategie per piattaforma e consigli per venditori online.',
  'idea-content/it/underwater-printable-ideas': 'Idee stampabili subacquei da vendere su Etsy, KDP e TPT. Prodotti a tema oceano, schede creature marine e consigli di nicchia per venditori.',
  'idea-content/it/valentines-day-printable-ideas': 'Idee stampabili San Valentino da vendere su Etsy, KDP e TPT. Prodotti a tema amore e amicizia, strategie stagionali invernali e consigli venditori.',
  'idea-content/it/winter-printable-ideas': 'Idee stampabili invernali da vendere su Etsy, KDP e TPT. Prodotti a tema freddo con forte domanda da novembre a febbraio per venditori di schede.',

  // START-CONTENT (too long)
  'start-content/it/printable-business-blueprint': 'Trasforma le idee stampabili in un piano strutturato. Pianifica prodotti, scegli piattaforme, imposta prezzi e lancia con i generatori di schede.',
};

// ── Apply corrections ──
function applyCorrections() {
  let totalFixed = 0;
  let errors = [];

  for (const [key, newTitle] of Object.entries(titleCorrections)) {
    const filePath = path.join(CONFIG, key + '.ts');
    if (!fs.existsSync(filePath)) {
      errors.push(`File not found: ${filePath}`);
      continue;
    }

    let raw = fs.readFileSync(filePath, 'utf8');
    const field = extractStringField(raw, 'titleTag');
    if (field.start === -1) {
      errors.push(`titleTag not found in: ${key}`);
      continue;
    }

    // Replace the entire titleTag value (including quotes)
    const oldFull = raw.substring(field.start, field.end);
    const newFull = `'${newTitle}'`;
    raw = raw.substring(0, field.start) + newFull + raw.substring(field.end);

    fs.writeFileSync(filePath, raw, 'utf8');

    // Calculate the display length (without backslash escapes)
    const displayLen = newTitle.replace(/\\'/g, "'").length;
    if (displayLen < 50 || displayLen > 60) {
      errors.push(`WARNING: ${key} title is ${displayLen} chars (target 50-60): ${newTitle.replace(/\\'/g, "'")}`);
    }
    totalFixed++;
  }

  for (const [key, newMeta] of Object.entries(metaCorrections)) {
    const filePath = path.join(CONFIG, key + '.ts');
    if (!fs.existsSync(filePath)) {
      errors.push(`File not found: ${filePath}`);
      continue;
    }

    let raw = fs.readFileSync(filePath, 'utf8');
    const field = extractStringField(raw, 'metaDescription');
    if (field.start === -1) {
      errors.push(`metaDescription not found in: ${key}`);
      continue;
    }

    const oldFull = raw.substring(field.start, field.end);

    // Detect if the original used multiline format
    const newFull = `'${newMeta}'`;
    raw = raw.substring(0, field.start) + newFull + raw.substring(field.end);

    fs.writeFileSync(filePath, raw, 'utf8');

    const displayLen = newMeta.replace(/\\'/g, "'").length;
    if (displayLen < 150 || displayLen > 160) {
      errors.push(`WARNING: ${key} meta is ${displayLen} chars (target 150-160): ${newMeta.replace(/\\'/g, "'")}`);
    }
    totalFixed++;
  }

  console.log(`\nFixed ${totalFixed} fields across ${Object.keys(titleCorrections).length + Object.keys(metaCorrections).length} entries.`);

  if (errors.length > 0) {
    console.log(`\n${errors.length} warnings/errors:`);
    for (const e of errors) {
      console.log(`  - ${e}`);
    }
  }
}

applyCorrections();
