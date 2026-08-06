const fs = require('fs');

const content = `import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'caccia al tesoro stampabile',
    secondaryKeywords: [
      'generatore caccia al tesoro per venditori',
      'creare puzzle caccia al tesoro da vendere',
      'generatore caccia al tesoro stampabile uso commerciale',
      'creatore caccia al tesoro per KDP e Etsy',
    ],
    lsiKeywords: [
      'due tipi di direzione base cardinale griglia coordinate creatore',
      'indizi direzionali localizzati sensibile alla lingua 11 lingue',
      'chiave di risposta automatica cella tesoro evidenziata sistema doppio canvas',
    ],
    titleTag: 'Generatore Caccia al Tesoro \u2014 Prova Gratuita',
    metaDescription: 'Crea schede caccia al tesoro su griglia 5\u00d75 con due tipi di direzione, punti di riferimento tematici, chiavi di risposta automatiche e 104 temi. Prova gratuita con filigrana.',
  },

  hero: {
    title: 'Generatore Caccia al Tesoro',
    tagline: 'Generatore di schede caccia al tesoro con griglia fissa 5\u00d75 di coordinate (righe A\u2013E, colonne 1\u20135), due tipi di direzione (Base: su/gi\u00f9/sinistra/destra per prescuola fino alla 1\u00aa classe, e Cardinale: nord/sud/est/ovest per la 2\u00aa classe in su), 6 immagini tematiche come punti di riferimento, esattamente 4 mosse direzionali per puzzle, chiave di risposta generata automaticamente con cella tesoro evidenziata in giallo pallido tramite sistema doppio canvas, indizi direzionali completamente localizzati in 11 lingue e intestazione a tema tesoro teal (#2C8C7C) con titolo dorato Fredoka su 104 collezioni tematiche',
    description: 'Crea schede caccia al tesoro professionali dove gli studenti seguono indizi direzionali sequenziali per localizzare il tesoro nascosto su una griglia 5\u00d75 di coordinate etichettata con righe di lettere (A\u2013E) e colonne di numeri (1\u20135). Ogni puzzle disperde 6 immagini tematiche sulla griglia come punti di riferimento visivi, poi genera una posizione di partenza e esattamente 4 mosse direzionali che conducono alla cella del tesoro. La scheda visualizza 5 righe di istruzioni: \\'Inizia alla cella [cella]\\' seguito da 4 \\'Muovi [direzione] [numero] casella/e\\', terminando con \\'Dov\\'\\u00e8 il tesoro?\\' Scegli tra due tipi di direzione che servono diverse fasce d\\'et\u00e0 e obiettivi didattici. La modalit\u00e0 Base usa su, gi\u00f9, sinistra e destra \u2014 parole direzionali familiari ideali per la prescuola fino alla 1\u00aa classe per costruire il vocabolario spaziale fondamentale. La modalit\u00e0 Cardinale usa nord, sud, est e ovest \u2014 direzioni della bussola adatte alla 2\u00aa classe e oltre, introducendo competenze di lettura delle mappe e orientamento geografico. Entrambi i tipi di direzione producono la stessa struttura puzzle a 4 mosse sulla stessa griglia 5\u00d75, permettendoti di creare set a difficolt\u00e0 progressiva all\\'interno di un singolo pacchetto. Il Generatore Caccia al Tesoro \u00e8 sensibile alla lingua in due modi: il testo degli indizi direzionali e il contenuto delle immagini cambiano entrambi quando cambi lingua. Tutte le direzioni sono completamente tradotte nelle 11 lingue supportate \u2014 \\'Inizia a,\\' \\'Muovi,\\' \\'casella/e\\' e \\'Dov\\'\\u00e8 il tesoro?\\' si localizzano insieme al vocabolario direzionale Base e Cardinale. Questo produce autentiche schede caccia al tesoro in lingua madre, non puzzle in inglese con intestazioni tradotte. Il sistema doppio canvas genera sia una scheda foglio di lavoro che una scheda chiave di risposta. La chiave di risposta riproduce l\\'esatto layout del puzzle ed evidenzia la cella del tesoro finale in giallo pallido (rgba(255, 250, 205, 0.8)) con un contorno grigio scuro \u2014 nessuna marcatura manuale necessaria. Ogni puzzle include un\\'intestazione a tema tesoro generata automaticamente con sfondo teal (#2C8C7C), bordo esterno ambra (#D4A574), bordo interno beige sabbia (#F4E4C1) e titolo dorato (#D4A017) in font Fredoka (peso 700, dimensionamento adattivo 36\u201348px). La descrizione viene renderizzata in marrone scuro (#5C4033) in Quicksand (peso 500). La modalit\u00e0 verticale mostra un\\'intestazione completa (altezza 100px); la modalit\u00e0 orizzontale usa un layout compatto (altezza 70px). Il testo dell\\'intestazione si traduce automaticamente in tutte le 11 lingue. Sfoglia 104 collezioni tematiche con oltre 3.100 illustrazioni o carica immagini personalizzate tramite tre metodi di input: Genera per Tema (seleziona automaticamente 6), Selezione Manuale Immagini (sfoglia e clicca) e Carica Immagini Personalizzate (JPEG/PNG/GIF/WebP). Applica temi di sfondo e bordo con cursori di opacit\u00e0 indipendenti (0\u20131, passo 0,05). Esporta PDF pronti per la stampa (moltiplicatore 3\u00d7) e JPEG (moltiplicatore 6\u00d7) a 300 DPI in Lettera Verticale, Lettera Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato (1200\u00d71200) o dimensioni personalizzate. Attiva la scala di grigi per output ottimizzato per l\\'inchiostro. La prova gratuita include tutte le funzionalit\u00e0 con filigrana sui download. Acquista una licenza per rimuovere la filigrana e vendere commercialmente.',
  },

  tutorial: {
    title: 'Come Creare Schede Caccia al Tesoro in 8 Passaggi',
    steps: [
      {
        title: 'Apri il Generatore Caccia al Tesoro',
        description: 'Clicca \\'Prova Gratuita\\' per avviare il generatore di schede caccia al tesoro nel tuo browser. Lo strumento si carica istantaneamente con una barra laterale delle impostazioni a sinistra e un canvas a doppia scheda a destra \u2014 una scheda per la scheda caccia al tesoro, una per la chiave di risposta. Nessuna creazione di account, nessun download di software, nessuna installazione necessaria \u2014 inizia a creare puzzle caccia al tesoro immediatamente.',
      },
      {
        title: 'Imposta il Layout della Pagina',
        description: 'Apri il pannello Impostazioni Pagina e scegli un formato: Lettera Verticale, Lettera Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato (1200\u00d71200) o inserisci una dimensione personalizzata. Scegli un colore di sfondo della pagina con il selettore colori. Seleziona un tema di sfondo e regola la sua opacit\u00e0 (0\u20131 con passo 0,05), poi scegli un tema di bordo con il suo controllo di opacit\u00e0 indipendente. Queste scelte di layout incorniciano il tuo puzzle caccia al tesoro prima di configurare qualsiasi contenuto o tipo di direzione.',
      },
      {
        title: 'Scegli il Tipo di Direzione',
        description: 'Alterna tra due vocabolari direzionali nel pannello Impostazioni Puzzle. La modalit\u00e0 Base usa su, gi\u00f9, sinistra e destra \u2014 parole direzionali familiari ideali per la prescuola fino alla 1\u00aa classe per costruire il vocabolario spaziale fondamentale. La modalit\u00e0 Cardinale usa nord, sud, est e ovest \u2014 direzioni della bussola adatte alla 2\u00aa classe e oltre, introducendo competenze di lettura delle mappe e orientamento geografico. Entrambi i tipi di direzione generano la stessa struttura puzzle a 4 mosse sulla stessa griglia 5\u00d75, cos\u00ec puoi creare set a difficolt\u00e0 progressiva iniziando con Base e avanzando a Cardinale.',
      },
      {
        title: 'Seleziona la Lingua del Contenuto',
        description: 'Scegli la lingua del contenuto per controllare il testo degli indizi direzionali che appare sulla scheda. Il Generatore Caccia al Tesoro \u00e8 sensibile alla lingua \u2014 tutte le direzioni sono completamente tradotte nelle 11 lingue supportate. \\'Inizia a,\\' \\'Muovi,\\' \\'casella/e\\' e \\'Dov\\'\\u00e8 il tesoro?\\' si localizzano insieme al vocabolario direzionale Base e Cardinale. Anche il contenuto delle immagini si aggiorna in base alla lingua selezionata. Il livello Commerciale include il contenuto in inglese; l\\'Accesso Completo sblocca tutte le 11 lingue per autentiche schede caccia al tesoro in lingua madre che puoi vendere sui mercati internazionali.',
      },
      {
        title: 'Seleziona le Immagini per la Griglia 5\u00d75',
        description: 'Scegli come popolare la griglia di coordinate con 6 immagini tematiche come punti di riferimento usando uno dei tre metodi di input. Genera per Tema (predefinito) seleziona automaticamente 6 immagini casuali dal tema scelto e le disperde sulla griglia. La Selezione Manuale Immagini ti permette di sfogliare 104 collezioni tematiche con oltre 3.100 illustrazioni colorate \u2014 animali, cibo, veicoli, natura, festivi\u00e0, professioni, sport, stagioni e decine di altri \u2014 e cliccare per selezionare esattamente 6 immagini. Il Caricamento Immagini Personalizzate ti permette di aggiungere i tuoi file JPEG, PNG, GIF o WebP insieme al contenuto della libreria.',
      },
      {
        title: 'Genera il Puzzle Caccia al Tesoro',
        description: 'Clicca Genera per creare il puzzle sulla griglia 5\u00d75 di coordinate (righe A\u2013E, colonne 1\u20135). Il generatore disperde le tue 6 immagini selezionate sulle 25 celle come punti di riferimento visivi, sceglie una cella di partenza casuale e crea esattamente 4 mosse direzionali che restano all\\'interno dei limiti della griglia. La scheda visualizza 5 righe di istruzioni: \\'Inizia alla cella [cella]\\' seguito da 4 \\'Muovi [direzione] [numero] casella/e\\', terminando con \\'Dov\\'\\u00e8 il tesoro?\\' Un\\'intestazione a tema tesoro appare in alto con sfondo teal (#2C8C7C), titolo dorato (#D4A017) in Fredoka e descrizione marrone scuro (#5C4033) in Quicksand. Clicca Genera di nuovo per produrre un nuovo puzzle con diverso posizionamento casuale delle immagini, posizione di partenza e sequenza di mosse.',
      },
      {
        title: 'Rivedi la Chiave di Risposta Generata Automaticamente',
        description: 'Clicca la scheda Chiave di Risposta per vedere la soluzione con la cella del tesoro finale evidenziata in giallo pallido (rgba(255, 250, 205, 0.8)) e un contorno grigio scuro. La chiave di risposta riproduce l\\'esatto layout del puzzle \u2014 stessa griglia, stesse immagini disperse, stessa intestazione \u2014 e segna chiaramente la destinazione del tesoro. Nessuna marcatura manuale, nessuna creazione di file separato, nessuna possibilit\u00e0 di soluzioni non corrispondenti. Passa tra le schede Foglio di Lavoro e Chiave di Risposta per confrontare. La chiave di risposta si genera simultaneamente al puzzle, quindi ogni caccia al tesoro che crei viene con la sua pagina soluzione pronta da stampare.',
      },
      {
        title: 'Scarica Tutti e Quattro i File',
        description: 'Attiva la scala di grigi per versioni ottimizzate per l\\'inchiostro ideali per la stampa in classe e gli interni KDP. Scarica tutti e quattro i file da una singola sessione: JPEG foglio di lavoro, JPEG chiave di risposta, PDF foglio di lavoro e PDF chiave di risposta \u2014 tutti renderizzati a 300 DPI (moltiplicatore 6\u00d7 per JPEG, moltiplicatore 3\u00d7 per PDF). Ogni scheda ha la sua coppia di pulsanti di download nel menu a tendina. Tutte le esportazioni sono pronte per la produzione per inserzioni Etsy, interni Amazon KDP e risorse TpT senza necessit\u00e0 di post-elaborazione. Cambia temi, lingue e tipi di direzione, poi genera di nuovo per una creazione rapida di variet\u00e0 su 104 collezioni tematiche.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Pacchetti Caccia al Tesoro a Tema per Collezione di Immagini',
      description: 'Crea pacchetti caccia al tesoro organizzati per tema utilizzando le 104 collezioni \u2014 cacce al tesoro di animali, oceano, spazio, dinosauri, festivi\u00e0 e decine di altri. Genera per Tema seleziona automaticamente 6 immagini casuali e crea posizioni di partenza e sequenze di mosse uniche ad ogni generazione, cos\u00ec ogni clic produce un puzzle completamente diverso dallo stesso tema. Prepara 10\u201320 schede caccia al tesoro per tema con chiavi di risposta generate automaticamente incluse. Mescola i tipi di direzione Base e Cardinale all\\'interno di ogni pacchetto per una difficolt\u00e0 progressiva che cresce con il livello dello studente.',
    },
    {
      title: 'Quaderni Progressivi di Competenze Direzionali',
      description: 'Costruisci quaderni strutturati che insegnano il vocabolario direzionale attraverso puzzle caccia al tesoro. Inizia con schede a direzione Base (su, gi\u00f9, sinistra, destra) per il vocabolario spaziale fondamentale, poi avanza a schede a direzione Cardinale (nord, sud, est, ovest) per la preparazione alla bussola. La stessa griglia 5\u00d75 e il formato puzzle a 4 mosse restano coerenti tra entrambi i tipi di direzione, cos\u00ec gli studenti costruiscono su meccaniche familiari imparando nuovo vocabolario direzionale. Organizza i capitoli per tipo di direzione e tema per un programma completo di competenze direzionali che genitori e insegnanti apprezzano.',
    },
    {
      title: 'Set Caccia al Tesoro Multilingue per Mercati Internazionali',
      description: 'Sfrutta gli indizi direzionali completamente localizzati per creare schede caccia al tesoro in tutte le 11 lingue supportate dalle stesse strutture puzzle. Cambiare lingua modifica tutto il testo direzionale \u2014 \\'Inizia a,\\' \\'Muovi,\\' \\'casella/e,\\' vocabolario direzionale e \\'Dov\\'\\u00e8 il tesoro?\\' \u2014 in contenuto autentico in lingua madre. Anche il contenuto delle immagini si aggiorna per lingua. Crea pacchetti caccia al tesoro specifici per lingua per classi ESL/EFL che insegnano vocabolario direzionale, famiglie bilingui che praticano le direzioni della bussola e programmi homeschool internazionali. Un singolo design di puzzle genera 11 versioni linguistiche vendibili.',
    },
    {
      title: 'Quaderni KDP di Attivit\u00e0 con Griglia di Coordinate',
      description: 'Compila 40\u201380 schede caccia al tesoro in quaderni stampati per Amazon KDP. La griglia 5\u00d75 lettera-numero di coordinate (righe A\u2013E, colonne 1\u20135) introduce gli studenti alle competenze di riferimento sulla griglia usate in geografia, matematica e scienze. Struttura i capitoli per progressione: i capitoli iniziali usano direzioni Base con temi familiari, i capitoli avanzati usano direzioni Cardinali con collezioni variate. Includi le pagine delle chiavi di risposta in fondo con celle del tesoro evidenziate in giallo pallido. Attiva la scala di grigi per output ottimizzato per interni in bianco e nero. I quaderni di ricerca del percorso occupano una nicchia unica nel mercato KDP dei libri di attivit\u00e0.',
    },
    {
      title: 'Collezioni Stagionali di Caccia al Tesoro',
      description: 'Crea collezioni stagionali a rotazione utilizzando temi festivi e naturali dalla libreria di 104 temi. Cacce al tesoro di Natale, puzzle di percorso di Halloween, attivit\u00e0 caccia al tesoro di Pasqua, sfide di coordinate di San Valentino, schede direzionali per il ritorno a scuola e set estivi a tema supportano ciascuno pacchetti stagionali dedicati. Includi sia tipi di direzione Base che Cardinale in ogni collezione stagionale per massima variet\u00e0. Pubblica ogni collezione 4\u20136 settimane prima della festivit\u00e0 per massima visibilit\u00e0 sul marketplace. Il formato caccia al tesoro aggiunge un elemento narrativo avvincente ai prodotti di schede stagionali.',
    },
    {
      title: 'Mega Pacchetti di Navigazione e Competenze Spaziali Multi-Formato',
      description: 'Abbina schede caccia al tesoro con labirinti percorso immagini, schede di abbinamento e attivit\u00e0 cerca e conta usando temi coordinati tra pi\u00f9 generatori. Le cacce al tesoro costruiscono vocabolario direzionale e alfabetizzazione della griglia di coordinate attraverso indizi di movimento sequenziali. I labirinti percorso immagini sviluppano competenze di tracciamento visivo del percorso. Le schede di abbinamento rafforzano la discriminazione visiva. Ogni formato mira a una diversa competenza spaziale o cognitiva mantenendo la coerenza tematica. I pacchetti multi-formato ottengono prezzi premium perch\u00e9 genitori e insegnanti apprezzano collezioni complete di competenze spaziali.',
    },
  ],

  businessIdeas: [
    {
      title: 'Negozio Etsy di Caccia al Tesoro a Tema',
      description: 'Apri un negozio Etsy specializzato in pacchetti caccia al tesoro organizzati per tema utilizzando le 104 collezioni di immagini. Cacce al tesoro di animali, puzzle di percorso festivi, sfide di coordinate oceaniche \u2014 ogni tema diventa un\\'inserzione separata con 10\u201320 puzzle unici inclusi entrambi i tipi di direzione Base e Cardinale. Ogni pacchetto include chiavi di risposta generate automaticamente con celle del tesoro evidenziate in giallo pallido. Genera per Tema produce puzzle unici ad ogni clic, rendendo la produzione in serie veloce. Prezzo dei pacchetti singoli a 3\u20135\u20ac e pacchetti premium multi-tema a 7\u201312\u20ac.',
      platform: 'Etsy',
    },
    {
      title: 'Serie di Quaderni KDP di Competenze Direzionali',
      description: 'Compila 40\u201380 schede caccia al tesoro in quaderni tematici per Amazon KDP. Struttura una serie per progressione e argomento: \\'Cacce al Tesoro a Direzione Base\\' con su/gi\u00f9/sinistra/destra per i pi\u00f9 piccoli, \\'Avventure a Direzione Cardinale\\' con nord/sud/est/ovest per studenti avanzati e \\'Sfida Definitiva Caccia al Tesoro\\' mescolando entrambi i tipi di direzione tra capitoli tematici. Includi le pagine delle chiavi di risposta in fondo con celle del tesoro evidenziate. Attiva la scala di grigi per output ottimizzato. I due tipi di direzione e i 104 temi forniscono abbastanza variet\u00e0 per una serie di quaderni estesa.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Pacchetti Attivit\u00e0 Griglia di Coordinate e Vocabolario Direzionale per TpT',
      description: 'Carica pacchetti attivit\u00e0 caccia al tesoro su TpT per insegnanti che cercano risorse di griglia di coordinate e vocabolario direzionale. La griglia 5\u00d75 lettera-numero introduce competenze di riferimento sulla griglia allineate con standard di matematica e geografia. Gli insegnanti che cercano attivit\u00e0 di seguire le direzioni apprezzano schede con istruzioni sequenziali strutturate e chiavi di risposta stampate. Crea set differenziati per livello: cacce al tesoro a direzione Base per classi di scuola dell\\'infanzia e 1\u00aa e versioni a direzione Cardinale per classi 2\u00aa\u20134\u00aa. Includi schede per studenti e chiavi di risposta in formato PDF e JPEG.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Business di Vocabolario Direzionale Multilingue',
      description: 'Gli indizi direzionali completamente localizzati creano autentici puzzle caccia al tesoro in lingua madre quando cambi lingua. Tutto il testo delle istruzioni \u2014 \\'Inizia a,\\' \\'Muovi,\\' parole direzionali, \\'casella/e\\' e \\'Dov\\'\\u00e8 il tesoro?\\' \u2014 si traduce nelle 11 lingue supportate. Crea pacchetti caccia al tesoro specifici per lingua per insegnanti ESL/EFL che praticano il vocabolario direzionale, programmi di educazione bilingue e famiglie homeschool internazionali. Vendi su negozi Etsy mirati a paesi specifici, inserisci su TpT per insegnanti internazionali o crea mega-pacchetti multilingue a prezzi premium. Un singolo design di puzzle genera 11 prodotti vendibili.',
      platform: 'Etsy / TpT',
    },
    {
      title: 'Funnel Pinterest di Schede Caccia al Tesoro',
      description: 'Le schede caccia al tesoro con griglie di coordinate colorate e immagini tematiche disperse creano pin Pinterest visivamente accattivanti che genitori e insegnanti riconoscono come attivit\u00e0 educative. Pubblica schede di esempio mostrando la griglia 5\u00d75 con indizi direzionali e punti di riferimento tematici. Crea serie separate di pin per \\'schede caccia al tesoro per bambini,\\' \\'attivit\u00e0 direzionali stampabili\\' e \\'puzzle griglia di coordinate.\\' Includi anteprime della chiave di risposta che mostrano la cella del tesoro evidenziata in giallo pallido. Collega ogni pin alle tue inserzioni Etsy o TpT per conversione diretta.',
      platform: 'Pinterest',
    },
    {
      title: 'Toolkit Completo Caccia al Tesoro su Gumroad',
      description: 'Raggruppa puzzle caccia al tesoro di tutti i 104 temi, entrambi i tipi di direzione e pi\u00f9 lingue in un toolkit completo su Gumroad. Includi oltre 200 schede caccia al tesoro che coprono le modalit\u00e0 direzione Base e Cardinale con difficolt\u00e0 progressiva tra collezioni tematiche. Ogni scheda include la sua chiave di risposta generata automaticamente con cella del tesoro evidenziata, raddoppiando il conteggio dei file a oltre 400 totali. I due tipi di direzione, gli indizi localizzati in 11 lingue e le 104 collezioni tematiche producono pi\u00f9 variet\u00e0 di qualsiasi concorrente che offre semplici schede direzionali. Il formato toolkit giustifica un prezzo premium perch\u00e9 gli acquirenti ottengono una libreria completa di puzzle caccia al tesoro.',
      platform: 'Gumroad',
    },
  ],

  proTips: [
    {
      title: 'Usa Entrambi i Tipi di Direzione per Difficolt\u00e0 Progressiva in Ogni Pacchetto',
      description: 'Includi sia schede a direzione Base (su/gi\u00f9/sinistra/destra) che Cardinale (nord/sud/est/ovest) in ogni pacchetto. Inizia con cacce al tesoro a direzione Base per puzzle pi\u00f9 facili e prosegui con versioni a direzione Cardinale usando gli stessi temi. Questa progressione da parole direzionali familiari a vocabolario della bussola crea una crescita strutturata della difficolt\u00e0 che genitori e insegnanti apprezzano. Etichetta chiaramente ogni scheda con il suo tipo di direzione cos\u00ec gli acquirenti possono assegnare pagine appropriate all\\'et\u00e0.',
    },
    {
      title: 'Clicca Genera Ripetutamente per Produzione in Serie Rapida',
      description: 'Ogni clic del pulsante Genera crea un puzzle caccia al tesoro completamente unico \u2014 diverso posizionamento casuale delle immagini, diversa posizione di partenza e diversa sequenza di mosse \u2014 anche con lo stesso tema e tipo di direzione selezionati. Produci in serie oltre 10 cacce al tesoro uniche per tema in pochi minuti senza cambiare nessuna impostazione. Alterna tra tipi di direzione Base e Cardinale tra le generazioni per costruire variet\u00e0 all\\'interno di una singola sessione di produzione.',
    },
    {
      title: 'Sfrutta le Direzioni Localizzate per Prodotti Caccia al Tesoro Multilingue',
      description: 'La stessa struttura puzzle produce autentiche schede caccia al tesoro in lingua madre quando cambi lingua. Tutto il testo degli indizi direzionali si traduce completamente \u2014 non solo l\\'intestazione, ma \\'Inizia a,\\' \\'Muovi,\\' parole direzionali, \\'casella/e\\' e \\'Dov\\'\\u00e8 il tesoro?\\' si localizzano nelle 11 lingue supportate. Crea un set tematico e genera cacce al tesoro in tutte le 11 lingue per 11 prodotti vendibili da una singola sessione di contenuto. I pacchetti multilingue di vocabolario direzionale servono insegnanti ESL/EFL e famiglie internazionali a prezzi premium.',
    },
    {
      title: 'Evidenzia la Chiave di Risposta in Ogni Anteprima dell\\'Inserzione',
      description: 'La chiave di risposta generata automaticamente con la cella del tesoro evidenziata in giallo pallido \u00e8 il tuo pi\u00f9 forte elemento differenziante. Includi sempre le anteprime della chiave di risposta nelle tue inserzioni \u2014 mostra chiaramente la destinazione del tesoro evidenziata nelle foto del prodotto. I prodotti che includono chiavi di risposta vendono costantemente di pi\u00f9 rispetto alle inserzioni con solo puzzle perch\u00e9 insegnanti e genitori vogliono materiali auto-verificabili. Il sistema doppio canvas genera entrambe le versioni simultaneamente, quindi includere la chiave di risposta non costa nulla in termini di tempo di produzione.',
    },
    {
      title: 'Posiziona le Cacce al Tesoro come Attivit\u00e0 di Apprendimento sulla Griglia di Coordinate',
      description: 'La griglia 5\u00d75 lettera-numero (righe A\u2013E, colonne 1\u20135) insegna le stesse competenze di riferimento sulla griglia usate in geografia, matematica e lettura delle mappe. Includi parole chiave relative alle coordinate nelle tue inserzioni \u2014 \\'attivit\u00e0 griglia di coordinate,\\' \\'scheda riferimento griglia\\' e \\'pratica competenze cartografiche\\' insieme a \\'scheda caccia al tesoro.\\' Questo espande la visibilit\u00e0 di ricerca del tuo prodotto oltre gli acquirenti di caccia al tesoro verso insegnanti che cercano specificamente attivit\u00e0 di ragionamento spaziale e coordinate.',
    },
    {
      title: 'Usa la Scala di Grigi per Prodotti KDP e per la Classe',
      description: 'Attiva la scala di grigi per creare schede caccia al tesoro ottimizzate per l\\'inchiostro specificamente per interni KDP print-on-demand e stampa in classe. La stampa a colori costa significativamente di pi\u00f9 per KDP e molti insegnanti stampano su stampanti in bianco e nero. Crea pacchetti doppio formato che includono sia versioni a colori (per download digitali) che versioni in scala di grigi (per la stampa) \u2014 gli acquirenti percepiscono questo come doppio valore. La griglia di coordinate, gli indizi direzionali e le immagini tematiche si rendono tutti chiaramente in scala di grigi.',
    },
    {
      title: 'Abbina Cacce al Tesoro con Labirinti Percorso Immagini per Pacchetti di Navigazione Completi',
      description: 'Combina schede caccia al tesoro con attivit\u00e0 labirinti percorso immagini usando gli stessi temi per pacchetti coerenti di competenze di navigazione. Le cacce al tesoro costruiscono il seguimento sequenziale delle direzioni e l\\'alfabetizzazione della griglia di coordinate. I labirinti percorso immagini sviluppano competenze di tracciamento visivo del percorso e pianificazione del tragitto. Entrambi i formati mirano al ragionamento spaziale da angolazioni diverse. I pacchetti multi-formato di navigazione ottengono prezzi pi\u00f9 alti perch\u00e9 coprono pi\u00f9 obiettivi di apprendimento rispetto ai pacchetti con una singola attivit\u00e0.',
    },
  ],

  faq: [
    {
      question: '\u00c8 disponibile una prova gratuita?',
      answer: 'S\u00ec. Lo strumento offre una prova gratuita con tutte le funzionalit\u00e0 sbloccate \u2014 entrambi i tipi di direzione (Base e Cardinale), la griglia 5\u00d75 di coordinate, generazione puzzle a 6 immagini con esattamente 4 mosse direzionali, la chiave di risposta generata automaticamente con cella del tesoro evidenziata in giallo pallido, la libreria completa di immagini con 104 collezioni tematiche e oltre 3.100 illustrazioni, tre metodi di input per le immagini, temi di sfondo e bordo con opacit\u00e0 indipendente, selezione lingua per 11 set di direzioni localizzati, attivazione scala di grigi e tutti i formati di download. Nessuna registrazione, nessuna carta di credito richiesta. I download della prova gratuita includono una filigrana. Acquista una licenza commerciale per rimuovere la filigrana e sbloccare i diritti di vendita.',
    },
    {
      question: 'Cos\\'\\u00e8 una scheda caccia al tesoro e come funziona il puzzle?',
      answer: 'Una scheda caccia al tesoro \u00e8 un puzzle di ricerca del percorso su una griglia fissa 5\u00d75 di coordinate etichettata con righe di lettere (A\u2013E) e colonne di numeri (1\u20135). Sei immagini tematiche sono disperse sulle 25 celle come punti di riferimento visivi che rendono la griglia coinvolgente e aiutano gli studenti a orientarsi. La scheda fornisce 5 righe di istruzioni: una posizione di partenza (\\'Inizia alla cella [cella]\\'), esattamente 4 mosse direzionali (\\'Muovi [direzione] [numero] casella/e\\') e una domanda finale \\'Dov\\'\\u00e8 il tesoro?\\' Gli studenti seguono gli indizi sequenziali sulla griglia per determinare quale cella contiene il tesoro. Tutte le mosse restano all\\'interno dei limiti della griglia per puzzle validi e risolvibili ogni volta.',
    },
    {
      question: 'Quali sono i due tipi di direzione e come differiscono?',
      answer: 'La modalit\u00e0 Base usa su, gi\u00f9, sinistra e destra \u2014 parole direzionali familiari ideali per la prescuola fino alla 1\u00aa classe per costruire il vocabolario spaziale fondamentale. La modalit\u00e0 Cardinale usa nord, sud, est e ovest \u2014 direzioni della bussola adatte alla 2\u00aa classe e oltre, introducendo competenze di lettura delle mappe e orientamento geografico. Entrambi i tipi di direzione generano la stessa struttura puzzle a 4 mosse sulla stessa griglia 5\u00d75. L\\'interruttore del tipo di direzione ti permette di creare difficolt\u00e0 progressiva: inizia con cacce al tesoro a direzione Base e avanza a versioni a direzione Cardinale usando temi e immagini identici.',
    },
    {
      question: 'Come funziona la chiave di risposta generata automaticamente?',
      answer: 'Il generatore utilizza un sistema doppio canvas con una scheda Foglio di Lavoro e una scheda Chiave di Risposta. Il foglio di lavoro mostra la griglia 5\u00d75 con immagini disperse e indizi direzionali \u2014 pronto per essere risolto dagli studenti. La chiave di risposta riproduce il layout identico ed evidenzia la cella del tesoro finale in giallo pallido (rgba(255, 250, 205, 0.8)) con un contorno grigio scuro, rendendo la destinazione immediatamente visibile. Entrambe le versioni si esportano separatamente usando quattro pulsanti di download dedicati: JPEG foglio di lavoro, JPEG chiave di risposta, PDF foglio di lavoro e PDF chiave di risposta. La chiave di risposta si genera simultaneamente al puzzle, quindi non c\\'\\u00e8 nessun passaggio di marcatura manuale e nessuna possibilit\u00e0 di soluzioni non corrispondenti.',
    },
    {
      question: 'Il Generatore Caccia al Tesoro \u00e8 sensibile alla lingua?',
      answer: 'S\u00ec, in due modi. Primo, tutto il testo degli indizi direzionali \u2014 \\'Inizia a,\\' \\'Muovi,\\' vocabolario direzionale (sia Base che Cardinale), \\'casella/e\\' e \\'Dov\\'\\u00e8 il tesoro?\\' \u2014 \u00e8 completamente tradotto in tutte le 11 lingue supportate: inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese. Secondo, il contenuto delle immagini caricato dalla libreria si aggiorna in base alla lingua selezionata. Cambiare lingua produce autentiche schede caccia al tesoro in lingua madre con direzioni e immagini localizzate \u2014 non puzzle in inglese con intestazioni tradotte. Il livello Commerciale include l\\'inglese; l\\'Accesso Completo sblocca tutte le 11 lingue.',
    },
    {
      question: 'Perch\u00e9 ogni puzzle ha esattamente 4 mosse su una griglia 5\u00d75?',
      answer: 'La struttura costante a 4 mosse su una griglia fissa 5\u00d75 (righe A\u2013E, colonne 1\u20135) crea un formato puzzle standardizzato che funziona in modo affidabile per attivit\u00e0 di ricerca del percorso. Quattro mosse forniscono sufficiente complessit\u00e0 per sfide direzionali significative senza sopraffare gli studenti pi\u00f9 piccoli. Ogni puzzle segue lo stesso formato a 5 righe di istruzioni: posizione di partenza, 4 mosse sequenziali e la domanda \\'Dov\\'\\u00e8 il tesoro?\\' Questa coerenza rende le schede caccia al tesoro prevedibili per gli studenti e facili da confezionare in set di attivit\u00e0 strutturati per i venditori.',
    },
    {
      question: 'Quali sono i tre metodi di input per le immagini?',
      answer: 'Genera per Tema (predefinito) seleziona automaticamente 6 immagini casuali dal tema scelto e le disperde sulla griglia 5\u00d75 come punti di riferimento visivi \u2014 il modo pi\u00f9 veloce per ottenere un puzzle completo. La Selezione Manuale Immagini ti permette di sfogliare 104 collezioni tematiche con oltre 3.100 illustrazioni e cliccare per scegliere esattamente 6 immagini per un controllo preciso sul contenuto della griglia. Il Caricamento Immagini Personalizzate ti permette di aggiungere i tuoi file JPEG, PNG, GIF o WebP insieme al contenuto della libreria. Tutti e tre i metodi popolano la stessa griglia 5\u00d75 di coordinate con 6 immagini come punti di riferimento.',
    },
    {
      question: 'Come funziona l\\'intestazione a tema tesoro?',
      answer: 'Ogni scheda generata include un\\'intestazione a tema tesoro con sfondo teal (#2C8C7C), bordo esterno ambra (#D4A574), bordo interno beige sabbia (#F4E4C1) e titolo dorato (#D4A017) in font Fredoka (peso 700, dimensionamento adattivo 36\u201348px). La descrizione viene renderizzata in marrone scuro (#5C4033) usando Quicksand (peso 500). La modalit\u00e0 verticale mostra un\\'intestazione completa (altezza 100px); la modalit\u00e0 orizzontale usa un layout compatto (altezza 70px). Il titolo \\'Caccia al Tesoro\\' e la descrizione \\'Segui gli indizi e trova il tesoro!\\' si traducono automaticamente in tutte le 11 lingue supportate.',
    },
    {
      question: 'Quali formati di pagina e di esportazione sono disponibili?',
      answer: 'I formati di pagina includono Lettera Verticale, Lettera Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato (1200\u00d71200) e dimensioni personalizzate. Esporta come JPEG ad alta risoluzione (moltiplicatore 6\u00d7) o PDF pronti per la stampa (moltiplicatore 3\u00d7) a 300 DPI. Attiva la scala di grigi per output ottimizzato per l\\'inchiostro. Ogni generazione produce quattro file di download: JPEG foglio di lavoro, JPEG chiave di risposta, PDF foglio di lavoro e PDF chiave di risposta. Tutte le esportazioni sono pronte per la produzione per download digitali, quaderni stampati e materiali per la classe.',
    },
    {
      question: 'Posso vendere commercialmente le schede caccia al tesoro create con questo strumento?',
      answer: 'S\u00ec. Con una licenza commerciale, hai pieni diritti per vendere schede caccia al tesoro come download digitali su Etsy, quaderni stampati su Amazon KDP, risorse per la classe su TpT o attraverso qualsiasi altro canale di vendita. I due tipi di direzione, la griglia 5\u00d75 di coordinate, gli indizi direzionali completamente localizzati in 11 lingue, le chiavi di risposta generate automaticamente con celle del tesoro evidenziate, tre metodi di input per le immagini e le 104 collezioni di immagini tematiche ti forniscono tutto il necessario per creare prodotti caccia al tesoro professionali che competono nelle categorie di schede di attivit\u00e0 su ogni marketplace principale.',
    },
    {
      question: 'Qual \u00e8 la vostra politica di rimborso?',
      answer: 'Prova prima di acquistare con la nostra prova gratuita \u2014 tutte le funzionalit\u00e0 sono disponibili cos\u00ec puoi valutare completamente lo strumento prima dell\\'acquisto. Poich\u00e9 la prova gratuita ti d\u00e0 accesso completo a entrambi i tipi di direzione, la griglia 5\u00d75 di coordinate, generazione puzzle a 6 immagini con 4 mosse direzionali, la chiave di risposta generata automaticamente con cella del tesoro evidenziata, tutti i 104 temi, tre metodi di input per le immagini, temi di sfondo e bordo, selezione lingua per 11 set di direzioni localizzati, esportazione in scala di grigi e ogni formato di download, non offriamo rimborsi sugli acquisti di licenze. Assicurati che lo strumento soddisfi le tue esigenze usando la prova gratuita prima dell\\'acquisto.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'caccia-tesoro-schede', anchorText: 'Caccia al Tesoro \u2014 Dettagli Completi del Prodotto' },
    { pageType: 'tool', slug: 'generatore-cruciverba-immagini', anchorText: 'Generatore Cruciverba con Immagini' },
    { pageType: 'tool', slug: 'generatore-cerca-e-conta', anchorText: 'Generatore Cerca e Conta' },
    { pageType: 'tool', slug: 'generatore-cerca-oggetti', anchorText: 'Generatore Cerca Oggetti' },
    { pageType: 'tool', slug: 'generatore-cerca-parole', anchorText: 'Generatore Cerca Parole' },
    { pageType: 'tool', slug: 'generatore-percorso-immagini', anchorText: 'Generatore Percorso Immagini' },
    { pageType: 'tool', slug: 'generatore-schede-abbinamento', anchorText: 'Generatore Schede Abbinamento' },
    { pageType: 'tool', slug: 'generatore-puzzle-matematici', anchorText: 'Generatore Puzzle Matematici' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/italian/treasure%20hunt/Caccia%20al%20Tesoro%201.webp',
      primaryAlt: 'Scheda caccia al tesoro con griglia 5 per 5 di coordinate, 6 immagini tematiche disperse come punti di riferimento, indizi direzionali e intestazione a tema tesoro teal con titolo dorato',
    },
    sampleGallery: [
      {
        src: '/samples/italian/treasure%20hunt/Caccia%20al%20Tesoro%202.webp',
        alt: 'Scheda puzzle caccia al tesoro con indizi a direzione Cardinale nord sud est ovest su griglia 5 per 5 di coordinate',
        caption: 'Modalit\u00e0 direzione Cardinale \u2014 direzioni della bussola per ragionamento spaziale avanzato e competenze cartografiche',
      },
      {
        src: '/samples/italian/treasure%20hunt/Caccia%20al%20Tesoro%201%20answer_key.webp',
        alt: 'Chiave di risposta caccia al tesoro con cella del tesoro finale evidenziata in giallo pallido sulla griglia 5 per 5 di coordinate',
        caption: 'Chiave di risposta generata automaticamente \u2014 evidenziazione giallo pallido segna la destinazione del tesoro per auto-verifica',
      },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'Come Creare Schede Caccia al Tesoro con Indizi Direzionali, Due Tipi di Direzione e Chiavi di Risposta Automatiche \u2014 Tutorial Passo-Passo',
  },
};

export default content;
`;

fs.writeFileSync('frontend/config/tool-content/it/treasure-hunt.ts', content, 'utf8');
console.log('Written: frontend/config/tool-content/it/treasure-hunt.ts');
console.log('File size:', fs.statSync('frontend/config/tool-content/it/treasure-hunt.ts').size, 'bytes');
