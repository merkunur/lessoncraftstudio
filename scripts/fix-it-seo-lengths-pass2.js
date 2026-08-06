#!/usr/bin/env node
/**
 * Pass 2: Fix remaining Italian SEO issues (metas that ended up too short, 1 title too short)
 */
const fs = require('fs');
const path = require('path');
const CONFIG = path.join(__dirname, '..', 'frontend', 'config');

function extractStringField(raw, fieldName) {
  const fieldPattern = new RegExp(fieldName + ':\\s*\\n?\\s*');
  const fieldMatch = fieldPattern.exec(raw);
  if (!fieldMatch) return { value: '', start: -1, end: -1 };
  const startIdx = fieldMatch.index + fieldMatch[0].length;
  const quoteChar = raw[startIdx];
  if (quoteChar !== "'" && quoteChar !== '"' && quoteChar !== '`') return { value: '', start: -1, end: -1 };
  let result = '';
  let i = startIdx + 1;
  while (i < raw.length) {
    if (raw[i] === '\\' && i + 1 < raw.length) { result += raw[i + 1]; i += 2; }
    else if (raw[i] === quoteChar) { break; }
    else { result += raw[i]; i++; }
  }
  return { value: result.replace(/\n\s*/g, ' ').trim(), start: startIdx, end: i + 1, quoteChar };
}

const titleFixes = {
  'guide-content/it/create-odd-one-out-puzzles': 'Creare Schede Trova l\\\'Intruso | Guida Creazione Etsy',
};

const metaFixes = {
  // APP-CONTENT
  'app-content/it/matching': 'Crea schede di abbinamento per Etsy, KDP e TPT. Quattro modalità di abbinamento, foglio risposte automatico, 104 temi, coppie configurabili. Prova gratuita.',
  'app-content/it/missing-pieces': 'Crea puzzle di pezzi mancanti da vendere su Etsy, KDP e TPT. 6 forme di pezzo, difficoltà configurabile, foglio risposte automatico. Prova gratuita con filigrana.',
  'app-content/it/odd-one-out': 'Crea schede trova l\\\'intruso da vendere su Etsy, KDP e TPT. Due modalità di generazione, foglio risposte con cerchi rossi, 104 temi. Prova gratuita con filigrana.',
  'app-content/it/picture-sort': 'Crea schede di classificazione immagini da vendere su Etsy, KDP e TPT. Due categorie, foglio risposte automatico, 104 temi, 4-12 immagini. Prova con filigrana.',
  'app-content/it/shadow-match': 'Crea schede di abbinamento ombre da vendere su Etsy, KDP e TPT. Modalità Ombra e Completa, silhouette automatiche, 104 temi, export PDF. Prova con filigrana.',

  // TOOL-CONTENT
  'tool-content/it/big-small': 'Genera schede di confronto dimensioni con cinque tipi di domanda, modalità immagini identiche e diverse, 104 temi. Export PDF ad alta risoluzione disponibile.',
  'tool-content/it/drawing-lines': 'Crea schede di pregrafismo con otto modelli SVG, oltre 3.100 illustrazioni colorate in 104 temi e riempimento automatico delle coppie di immagini tematiche.',
  'tool-content/it/pattern-train': 'Genera schede treno delle sequenze: cinque tipi di schema, 11 vagoni tematici, conteggio indizi regolabile e chiave di risposta automatica per ogni scheda.',
  'tool-content/it/shadow-match': 'Crea schede di abbinamento ombre con silhouette pixel-level e modalità Completa, chiavi di risposta automatiche e 104 temi illustrati. Prova con filigrana.',
  'tool-content/it/word-scramble': 'Genera schede parole mescolate con tessere lettere, indizi immagine, codifica vocali-consonanti, quattro livelli di difficoltà e supporto per 11 lingue.',

  // GUIDE-CONTENT
  'guide-content/it/create-addition-worksheets': 'Crea schede di addizione per bambini. Guida passo passo: scegli temi, imposta la difficoltà, genera fogli risposte ed esporta PDF da vendere su Etsy e KDP.',
  'guide-content/it/create-alphabet-worksheets': 'Crea schede treno dell\\\'alfabeto con vagoni colorati, due modalità di creazione, difficoltà configurabile e abbinamento lettere multilingue. Guida per Etsy e KDP.',
  'guide-content/it/create-counting-worksheets': 'Come creare schede di conteggio con grafici per immagini, chiavi di risposta automatiche e 104 temi. Guida passo passo per vendere stampabili su Etsy e KDP.',
  'guide-content/it/create-missing-pieces-puzzles': 'Crea schede puzzle pezzi mancanti con sei forme di pezzo, estrazione intelligente, pezzi distrattori e chiavi di risposta automatiche. Guida per Etsy e KDP.',
  'guide-content/it/create-sorting-worksheets': 'Crea schede di classificazione a due categorie con 4-12 immagini, griglie di ritaglio mescolate e chiavi di risposta automatiche. Guida per vendere su Etsy.',
  'guide-content/it/kdp-vs-etsy-printables': 'KDP o Etsy per venditori di stampabili? Confronta strutture tariffarie, formati prodotto, meccaniche di traffico e strategie multi-piattaforma per il business.',
  'guide-content/it/multilingual-printable-business': 'Costruisci un business di stampabili multilingue espandendoti nei mercati internazionali. Scopri quali lingue puntare, flussi di traduzione e strategie.',
  'guide-content/it/scale-printable-business-guide': 'Come scalare il tuo business di stampabili con produzione in batch, espansione multi-piattaforma, crescita del catalogo, mercati multilingue e automazione.',
  'guide-content/it/social-media-printable-marketing': 'Marketing sui social media per venditori di stampabili: scelta delle piattaforme, contenuti visivi, costruzione del pubblico e coinvolgimento per il traffico.',

  // IDEA-CONTENT (extend those too short to 150-160)
  'idea-content/it/birds-printable-ideas': 'Idee redditizie di stampabili sugli uccelli da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/bulk-licensing-printable-ideas': 'Idee per la licenza in volume di stampabili a scuole, distretti e organizzazioni educative. Strategie di licenza collettiva e prezzi per venditori di schede.',
  'idea-content/it/camping-printable-ideas': 'Idee di stampabili a tema campeggio da vendere su Etsy, Amazon KDP e TPT. Concetti outdoor, strategie per piattaforma e consigli di nicchia per venditori.',
  'idea-content/it/christmas-printable-ideas': 'Idee di stampabili natalizi da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto natalizi, strategie stagionali e consigli per venditori di schede.',
  'idea-content/it/construction-printable-ideas': 'Idee di stampabili sull\\\'edilizia da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema veicoli da cantiere e attrezzi, strategie per piattaforma e venditori.',
  'idea-content/it/custom-worksheet-service-ideas': 'Idee per servizi di schede didattiche personalizzate per venditori Etsy e freelance. Stampabili educativi su misura con strategie di prezzo premium online.',
  'idea-content/it/digital-download-printable-ideas': 'Idee di schede didattiche in download digitale per venditori Etsy, Gumroad e TPT. Business stampabili senza inventario con PDF educativi a consegna rapida.',
  'idea-content/it/dinosaur-printable-ideas': 'Idee redditizie di stampabili sui dinosauri da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/easter-printable-ideas': 'Idee di stampabili di Pasqua da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto primaverili, strategie stagionali e consigli per venditori online.',
  'idea-content/it/esl-printable-ideas': 'Idee di stampabili ESL per inglese come lingua straniera su Etsy, Amazon KDP e TPT. Strategie per insegnanti, tutor e studenti di lingue nel mondo intero.',
  'idea-content/it/fairy-tale-printable-ideas': 'Idee di stampabili a tema fiaba da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema fiabesco, schede didattiche e strategie di nicchia per venditori online.',
  'idea-content/it/farm-animals-printable-ideas': 'Idee di stampabili sugli animali della fattoria da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto, strategie di prezzo e consigli per venditori.',
  'idea-content/it/first-grade-printable-ideas': 'Idee di stampabili per la prima classe da vendere su Etsy, Amazon KDP e TPT. Concetti e strategie per venditori nel mercato della prima elementare online.',
  'idea-content/it/food-cooking-printable-ideas': 'Idee di stampabili su cibo e cucina da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema ricette e alimentazione, strategie per piattaforma e venditori.',
  'idea-content/it/forest-animals-printable-ideas': 'Idee di stampabili sugli animali del bosco da vendere su Etsy, Amazon KDP e TPT. Prodotti creature forestali, strategie per piattaforma e consigli venditori.',
  'idea-content/it/halloween-printable-ideas': 'Idee di stampabili di Halloween da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema spaventoso, strategie stagionali e consigli per venditori di schede.',
  'idea-content/it/homeschool-printable-ideas': 'Idee di stampabili per istruzione domestica da vendere su Etsy, Amazon KDP e TPT. Strategie per venditori che puntano ai genitori con curricula homeschool.',
  'idea-content/it/insects-printable-ideas': 'Idee di stampabili a tema insetti da vendere su Etsy, Amazon KDP e TPT. Prodotti su farfalle e insetti, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/kindergarten-printable-ideas': 'Idee di stampabili per la scuola materna da vendere su Etsy, Amazon KDP e TPT. Concetti per il livello materna e strategie di nicchia per venditori online.',
  'idea-content/it/math-facts-printable-ideas': 'Idee di stampabili sulle operazioni matematiche da vendere su Etsy, Amazon KDP e TPT. Strategie per venditori che puntano a insegnanti con schede pratiche.',
  'idea-content/it/music-printable-ideas': 'Idee di stampabili sulla musica da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema strumenti musicali, strategie e consigli per nicchia sempreverde online.',
  'idea-content/it/ocean-animals-printable-ideas': 'Idee di stampabili sugli animali dell\\\'oceano da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema marino, strategie per piattaforma e consigli per venditori.',
  'idea-content/it/parents-day-printable-ideas': 'Idee di stampabili per la Festa della Mamma e del Papà su Etsy, Amazon KDP e TPT. Prodotti per l\\\'apprezzamento dei genitori e consigli per venditori online.',
  'idea-content/it/party-supply-printable-ideas': 'Idee di articoli stampabili per feste per venditori Etsy. Pacchetti attività a tema, giochi per feste, pagine da colorare e materiali per compleanni e feste.',
  'idea-content/it/pets-printable-ideas': 'Idee di stampabili sugli animali domestici da vendere su Etsy, Amazon KDP e TPT. Prodotti su cani, gatti e piccoli animali con strategie per venditori online.',
  'idea-content/it/physical-printable-product-ideas': 'Idee di prodotti stampabili fisici per venditori Etsy e fiere dell\\\'artigianato. Costruisci un business premium stampando e spedendo prodotti didattici tangibili.',
  'idea-content/it/pirates-printable-ideas': 'Idee di stampabili a tema pirata da vendere su Etsy, Amazon KDP e TPT. Prodotti avventura piratesca, schede didattiche e strategie di nicchia per venditori.',
  'idea-content/it/preschool-printable-ideas': 'Idee di stampabili per la prescuola da vendere su Etsy, Amazon KDP e TPT. Concetti per l\\\'età prescolare e strategie di nicchia per venditori e imprenditori.',
  'idea-content/it/print-on-demand-printable-ideas': 'Idee di stampabili print-on-demand per venditori Etsy, KDP e Shopify. Business senza inventario con quaderni di esercizi, pacchetti attività e libri puzzle.',
  'idea-content/it/safari-animals-printable-ideas': 'Idee di stampabili sugli animali del safari da vendere su Etsy, Amazon KDP e TPT. Prodotti sulla fauna africana e consigli per piattaforma per i venditori.',
  'idea-content/it/second-grade-printable-ideas': 'Idee di stampabili per la seconda classe da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto e strategie per venditori nella seconda elementare online.',
  'idea-content/it/space-printable-ideas': 'Idee di stampabili sullo spazio da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto a tema spaziale, strategie STEM e consigli per venditori online.',
  'idea-content/it/special-education-printable-ideas': 'Idee di stampabili per educazione speciale su Etsy, Amazon KDP e TPT. Prodotti per insegnanti di sostegno, terapisti e genitori di alunni con bisogni educativi.',
  'idea-content/it/sports-printable-ideas': 'Idee di stampabili sullo sport da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema atletico, strategie per piattaforma e consigli per nicchia sempreverde.',
  'idea-content/it/spring-printable-ideas': 'Idee di stampabili primaverili da vendere su Etsy, Amazon KDP e TPT. Concetti di prodotto stagionali, strategie marzo-maggio e consigli per venditori online.',
  'idea-content/it/subscription-box-printable-ideas': 'Idee di stampabili per box in abbonamento su Etsy, Gumroad e Patreon. Entrate ricorrenti con pacchetti mensili curati di schede didattiche e collezioni.',
  'idea-content/it/summer-learning-printable-ideas': 'Idee di stampabili per apprendimento estivo da vendere su Etsy, Amazon KDP e TPT. Prodotti stagionali per genitori, insegnanti e coordinatori centri estivi.',
  'idea-content/it/summer-printable-ideas': 'Idee di stampabili estivi da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema spiaggia e sole, strategie stagionali e consigli per venditori stampabili.',
  'idea-content/it/thanksgiving-printable-ideas': 'Idee di stampabili per il Giorno del Ringraziamento da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema raccolto, strategie stagionali per i venditori.',
  'idea-content/it/third-grade-printable-ideas': 'Idee di stampabili per la terza classe da vendere su Etsy, Amazon KDP e TPT. Strategie di nicchia per venditori nel mercato della terza elementare online.',
  'idea-content/it/transportation-printable-ideas': 'Idee di stampabili sui trasporti da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema veicoli, strategie per piattaforma e consigli per venditori stampabili.',
  'idea-content/it/underwater-printable-ideas': 'Idee di stampabili subacquei da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema oceano, schede sulle creature marine e consigli di nicchia per venditori.',
  'idea-content/it/valentines-day-printable-ideas': 'Idee di stampabili di San Valentino da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema amore e amicizia, strategie stagionali e consigli per i venditori.',
  'idea-content/it/winter-printable-ideas': 'Idee di stampabili invernali da vendere su Etsy, Amazon KDP e TPT. Prodotti a tema freddo con forte domanda da novembre a febbraio per venditori stampabili.',

  // START-CONTENT
  'start-content/it/printable-business-blueprint': 'Trasforma le idee per stampabili in un piano strutturato. Pianifica la linea prodotti, scegli le piattaforme, imposta i prezzi e lancia il tuo business.',
};

let fixed = 0;
let warnings = [];

for (const [key, newTitle] of Object.entries(titleFixes)) {
  const filePath = path.join(CONFIG, key + '.ts');
  let raw = fs.readFileSync(filePath, 'utf8');
  const field = extractStringField(raw, 'titleTag');
  if (field.start === -1) { warnings.push('titleTag not found: ' + key); continue; }
  raw = raw.substring(0, field.start) + "'" + newTitle + "'" + raw.substring(field.end);
  fs.writeFileSync(filePath, raw, 'utf8');
  const len = newTitle.replace(/\\'/g, "'").length;
  if (len < 50 || len > 60) warnings.push('Title ' + key + ': ' + len + ' chars');
  fixed++;
}

for (const [key, newMeta] of Object.entries(metaFixes)) {
  const filePath = path.join(CONFIG, key + '.ts');
  let raw = fs.readFileSync(filePath, 'utf8');
  const field = extractStringField(raw, 'metaDescription');
  if (field.start === -1) { warnings.push('metaDescription not found: ' + key); continue; }
  raw = raw.substring(0, field.start) + "'" + newMeta + "'" + raw.substring(field.end);
  fs.writeFileSync(filePath, raw, 'utf8');
  const len = newMeta.replace(/\\'/g, "'").length;
  if (len < 150 || len > 160) warnings.push('Meta ' + key + ': ' + len + ' chars');
  fixed++;
}

console.log('Pass 2: Fixed ' + fixed + ' fields');
if (warnings.length > 0) {
  console.log(warnings.length + ' warnings:');
  warnings.forEach(w => console.log('  - ' + w));
}
