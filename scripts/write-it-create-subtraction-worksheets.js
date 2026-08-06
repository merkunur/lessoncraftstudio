const fs = require('fs');
const path = require('path');

const content = `import type { GuideContent } from '../types';

const content: GuideContent = {
  seo: {
    primaryKeyword: 'creare schede di sottrazione',
    secondaryKeywords: [
      'creare schede sottrazione per bambini',
      'generatore schede sottrazione',
      'schede sottrazione stampabili da vendere',
      'schede esercizi sottrazione personalizzate',
    ],
    lsiKeywords: [
      'schede sottrazione con immagini barrate',
      'sottrazione visiva per scuola dell\\'infanzia',
      'esercizi sottrazione prima elementare',
      'vendere schede sottrazione su Etsy',
      'libri attivit\u00e0 sottrazione Amazon KDP',
      'strumento schede licenza commerciale',
    ],
    titleTag: 'Creare Schede di Sottrazione \u2014 Guida Passo Passo',
    metaDescription: 'Come creare schede di sottrazione per bambini con immagini barrate e temi visivi. Guida passo passo per vendere su Etsy, Amazon KDP e TpT.',
  },

  hero: {
    title: 'Come Creare Schede di Sottrazione per Bambini',
    tagline: 'Tutorial passo passo per creare schede di sottrazione tematiche con immagini barrate, difficolt\u00e0 configurabile ed esportazioni pronte per la stampa da vendere su Etsy, Amazon KDP e Teachers Pay Teachers',
    description: 'Le schede di sottrazione sono il secondo passo naturale in ogni programma di matematica. Una volta che i bambini padroneggiano l\\'addizione, la sottrazione segue immediatamente \u2014 e cos\u00ec la domanda di materiali per esercitarsi. Genitori, insegnanti e tutor hanno tutti bisogno di risorse di sottrazione adatte al livello di difficolt\u00e0 dei loro studenti. Questa guida ti accompagna attraverso l\\'intero processo di creazione usando il Generatore di Schede di Sottrazione \u2014 dall\\'impostazione del Minuendo Massimo e dalla scelta del tema visivo all\\'esportazione di PDF pronti per la stampa con fogli risposte automatici. La caratteristica distintiva del generatore di sottrazione \u00e8 la modalit\u00e0 Barra, dove i bambini vedono un gruppo di immagini tematiche con alcune visivamente barrate e devono determinare quante ne restano. Che tu stia aggiungendo prodotti di sottrazione a una linea esistente di schede matematiche o creando il tuo primo prodotto stampabile, avrai una scheda finita pronta da pubblicare entro la fine di questo tutorial.',
  },

  introduction: 'La sottrazione \u00e8 la seconda operazione aritmetica che i bambini imparano, e segue l\\'addizione in ogni programma scolastico al mondo. Questa sequenza crea un modello di domanda affidabile: ovunque le schede di addizione vendano, le schede di sottrazione vendono subito dopo. Gli acquirenti che acquistano i tuoi prodotti di addizione cercheranno attivamente materiali di sottrazione corrispondenti, rendendo questa un\\'espansione naturale del catalogo con un pubblico gi\u00e0 integrato.\\n\\nCi\u00f2 che rende le schede di sottrazione distintive come prodotto stampabile \u00e8 l\\'elemento visivo. Mentre le schede di addizione mostrano due gruppi che si combinano, le schede di sottrazione mostrano elementi che vengono rimossi \u2014 tipicamente attraverso immagini barrate. Questa rappresentazione visiva del \\"togliere\\" \u00e8 il modo in cui i bambini comprendono per la prima volta la sottrazione concettualmente, e rende le schede di sottrazione immediatamente riconoscibili e attraenti nelle miniature dei marketplace.\\n\\nIl Generatore di Schede di Sottrazione gestisce tutta la complessit\u00e0 tecnica della creazione di questi elementi visivi. Posiziona le immagini tematiche sul canvas, contrassegna il numero corretto come barrato, genera l\\'equazione corrispondente e produce un foglio risposte automatico. Il generatore supporta quattro modalit\u00e0 di esercizio \u2014 Barra, Immagine \u2013 Numero, Trova il Sottraendo e Modalit\u00e0 Mista \u2014 ognuna dedicata a diverse fasi di apprendimento ed esigenze degli acquirenti. La difficolt\u00e0 \u00e8 controllata attraverso l\\'impostazione del Minuendo Massimo, che determina il numero pi\u00f9 grande da cui i bambini sottraggono.\\n\\nTutte le funzionalit\u00e0 menzionate in questa guida sono disponibili nella prova gratuita con filigrana. Puoi creare schede di esempio, testare ogni configurazione e valutare la qualit\u00e0 dell\\'output prima di acquistare una licenza commerciale.',

  tutorial: [
    {
      heading: 'Scegli il Gruppo d\\'Et\u00e0 e Imposta il Minuendo Massimo',
      content: 'Il controllo Minuendo Massimo \u00e8 l\\'impostazione principale di difficolt\u00e0 per le schede di sottrazione. Il minuendo \u00e8 il numero da cui si sottrae \u2014 in \\"7 \u2013 3 = 4\\", il minuendo \u00e8 7. Impostare il Minuendo Massimo determina il problema pi\u00f9 difficile che pu\u00f2 apparire sulla scheda.\\n\\nEcco come il Minuendo Massimo si mappa alle fasce d\\'et\u00e0 per le schede di sottrazione:\\n\\nEt\u00e0 prescolare (4\u20135 anni): Minuendo Massimo di 5. Problemi come \\"3 \u2013 1 = 2\\" o \\"5 \u2013 2 = 3\\". I bambini a questo stadio stanno appena imparando che togliere riduce una quantit\u00e0. Usa la modalit\u00e0 Barra esclusivamente cos\u00ec possono vedere le immagini rimosse. La sottrazione tipicamente inizia leggermente dopo l\\'addizione a questo livello, quindi le schede dovrebbero essere molto visive con immagini grandi.\\n\\nScuola dell\\'infanzia (5\u20136 anni): Minuendo Massimo di 10. Problemi fino a \\"10 \u2013 4 = 6\\". I bambini stanno sviluppando il senso del numero e possono gestire scenari di rimozione leggermente pi\u00f9 complessi. Alterna le modalit\u00e0 Barra e Immagine \u2013 Numero per iniziare a collegare le immagini con i numeri.\\n\\nPrima elementare (6\u20137 anni): Minuendo Massimo di 15. Problemi fino a \\"15 \u2013 8 = 7\\". La modalit\u00e0 Trova il Sottraendo diventa preziosa qui, dove i bambini vedono \\"9 \u2013 ? = 4\\" e devono determinare cosa \u00e8 stato tolto. Questo sviluppa il ragionamento algebrico precoce.\\n\\nSeconda elementare (7\u20138 anni): Minuendo Massimo di 20. La gamma completa di problemi di sottrazione. La Modalit\u00e0 Mista combina tutti i tipi di esercizio per una valutazione completa. I bambini a questo livello gestiscono la sottrazione astratta ma traggono ancora beneficio dal rinforzo visivo.\\n\\nNel generatore, individua il cursore del Minuendo Massimo e impostalo in base al tuo gruppo d\\'et\u00e0 target. Questo singolo controllo assicura che ogni problema generato resti nell\\'intervallo di difficolt\u00e0 appropriato.',
    },
    {
      heading: 'Seleziona un Tema Visivo per le Tue Schede',
      content: 'Le schede di sottrazione tematiche vendono drasticamente pi\u00f9 delle schede con soli numeri. Le immagini barrate che definiscono le schede di sottrazione sono intrinsecamente visive, quindi la scelta del tema conta ancora pi\u00f9 che per i prodotti di addizione. Una scheda che mostra dinosauri barrati o animali della fattoria che scompaiono crea una miniatura immediatamente accattivante.\\n\\nIl Generatore di Schede di Sottrazione include un selettore di temi con set di immagini organizzati per categoria. Con una licenza commerciale, hai accesso a 10 set di immagini tematiche. La licenza Full Access sblocca oltre 100 set di immagini tematiche che coprono animali, cibo, veicoli, natura, festivit\u00e0, professioni e decine di altre categorie.\\n\\nPer selezionare un tema, usa il menu Seleziona Tema nella sezione Configurazione Esercizi. Il generatore usa le immagini del tema scelto per tutti i problemi di sottrazione. Un tema \\"creature marine\\" mostra pesci, delfini, stelle marine e cavallucci marini con alcuni barrati. Un tema \\"dolci\\" mostra cupcake, ciambelle, biscotti e gelati che vengono tolti.\\n\\nLa selezione del tema \u00e8 una decisione strategica di prodotto. Ogni tema crea un prodotto distinto con parole chiave di ricerca uniche. \\"Schede sottrazione dinosauri\\" e \\"Schede sottrazione animali fattoria\\" puntano a query di ricerca completamente diverse e attraggono acquirenti diversi. Un singolo livello di difficolt\u00e0 con 10 temi ti d\u00e0 10 prodotti unici.\\n\\nPuoi anche configurare temi di sfondo e bordo indipendentemente usando la sezione Impostazioni Pagina. Bordi decorativi sottili e motivi di sfondo leggeri aggiungono un tocco professionale che distingue le tue schede dalla concorrenza con layout bianchi semplici.',
    },
    {
      heading: 'Scegli la Modalit\u00e0 di Esercizio',
      content: 'Il Generatore di Schede di Sottrazione offre quattro modalit\u00e0 di esercizio, ognuna progettata per una diversa fase di apprendimento. Comprendere queste modalit\u00e0 ti aiuta a creare prodotti mirati per segmenti specifici di acquirenti.\\n\\nLa modalit\u00e0 Barra \u00e8 l\\'esercizio distintivo della sottrazione. La scheda mostra un gruppo di immagini tematiche con alcune visivamente barrate con una X. I bambini contano le immagini rimanenti e scrivono la risposta. \u00c8 il formato di sottrazione pi\u00f9 intuitivo per i piccoli perch\u00e9 rappresenta direttamente il \\"togliere\\". La modalit\u00e0 Barra funziona meglio per l\\'et\u00e0 prescolare e la scuola dell\\'infanzia. Esempio: sette farfalle con tre barrate \u2014 quante ne restano?\\n\\nLa modalit\u00e0 Immagine \u2013 Numero mostra un gruppo di immagini meno un numero. Questo colma il divario tra sottrazione visiva e astratta, aiutando i bambini a passare dal conteggio di immagini barrate al lavoro con i numeri. Funziona bene per la scuola dell\\'infanzia e l\\'inizio della prima elementare. Esempio: un gruppo di sei auto meno il numero 2, quante ne restano?\\n\\nLa modalit\u00e0 Trova il Sottraendo presenta un\\'equazione con il numero sottratto mancante. I bambini devono capire quanti sono stati tolti. \u00c8 la modalit\u00e0 pi\u00f9 impegnativa e sviluppa il pensiero algebrico. Funziona meglio per la prima e seconda elementare. Esempio: 8 \u2013 ? = 5.\\n\\nLa Modalit\u00e0 Mista combina tutti e tre i tipi di esercizio in una singola scheda. \u00c8 ideale per schede di valutazione, fogli di ripasso e prodotti destinati a bambini che necessitano di esercizio variegato. Gli insegnanti apprezzano particolarmente le schede in modalit\u00e0 mista per valutare la comprensione degli studenti su pi\u00f9 concetti di sottrazione.\\n\\nSeleziona la modalit\u00e0 dal menu Modalit\u00e0 Esercizio. Per la creazione di prodotti, considera di creare prodotti separati per ogni modalit\u00e0 a ogni livello di difficolt\u00e0 per massimizzare il tuo catalogo.',
    },
    {
      heading: 'Configura il Layout della Scheda',
      content: 'La configurazione del layout determina l\\'aspetto della scheda di sottrazione quando viene stampata e quanti problemi entrano in ogni pagina.\\n\\nNumero di Esercizi controlla il numero di problemi per scheda, da 1 a 10. Per schede di sottrazione prescolari con grandi immagini barrate, 4\u20136 problemi per pagina funziona meglio \u2014 i segni di barratura hanno bisogno di spazio sufficiente per essere chiaramente visibili. Per bambini pi\u00f9 grandi, 8\u201310 problemi per pagina \u00e8 lo standard.\\n\\nLe opzioni Dimensione Pagina includono US Letter Verticale, US Letter Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato e dimensioni personalizzate. US Letter \u00e8 lo standard per gli acquirenti nordamericani. A4 \u00e8 lo standard per i mercati europei e internazionali. Offrire entrambe le versioni amplia la tua base clienti con uno sforzo aggiuntivo minimo.\\n\\nOpzioni di layout aggiuntive includono:\\n\\nCampi Nome e Data: Aggiunge righe per nome e data dello studente in cima alla scheda. Gli insegnanti preferiscono fortemente le schede con questi campi \u2014 includili sempre per prodotti destinati all\\'uso in classe.\\n\\nNumeri Esercizi: Numera ogni problema in sequenza. Mantieni questa opzione attiva per la maggior parte dei prodotti cos\u00ec bambini e insegnanti possono fare riferimento a problemi specifici.\\n\\nCasella Risposta a Misura di Bambino: Usa una casella arrotondata e visivamente distinta per scrivere le risposte. Questo rende la scheda pi\u00f9 coinvolgente e aiuta i bambini piccoli a trovare dove scrivere la risposta.\\n\\nColore Pagina ti permette di impostare il colore di sfondo. Il bianco \u00e8 lo standard per le schede stampate. Pastelli chiari possono aggiungere calore ai prodotti per uso digitale o collezioni tematiche.',
    },
    {
      heading: 'Genera e Visualizza l\\'Anteprima della Scheda',
      content: 'Con le impostazioni configurate, clicca il pulsante Genera per creare la tua scheda di sottrazione. Il generatore posiziona le immagini tematiche sul canvas, applica i segni di barratura secondo la modalit\u00e0 di esercizio e dispone tutto secondo le tue preferenze di layout.\\n\\nL\\'anteprima appare nell\\'area canvas principale. Esaminala attentamente prima di esportare:\\n\\nControlla le immagini barrate: Nella modalit\u00e0 Barra, verifica che i segni X sulle immagini barrate siano chiari e distinti. I bambini devono poter facilmente distinguere quali immagini sono \\"tolte\\" e quali restano. Se i segni di barratura sono difficili da vedere, prova un tema diverso con immagini a contrasto pi\u00f9 alto.\\n\\nControlla il posizionamento delle immagini: Le immagini sono disposte chiaramente? C\\'\u00e8 abbastanza spazio tra i problemi? Il layout sembra affollato o troppo scarno?\\n\\nControlla l\\'accuratezza della difficolt\u00e0: Conta le immagini totali e quelle barrate in diversi problemi per verificare che corrispondano all\\'impostazione del Minuendo Massimo. Una scheda per la scuola dell\\'infanzia con Minuendo Massimo di 10 non dovrebbe mostrare problemi che richiedono sottrazioni da 15.\\n\\nControlla la visibilit\u00e0 del segno meno: Assicurati che il simbolo di sottrazione sia chiaramente visibile tra i gruppi di immagini o tra immagini e numeri.\\n\\nSe qualcosa necessita di aggiustamento, modifica le impostazioni e rigenera. Il canvas si aggiorna istantaneamente, permettendo iterazioni rapide. Prova diversi numeri di esercizi per pagina per trovare la densit\u00e0 ottimale per il tuo gruppo d\\'et\u00e0 target.\\n\\nPuoi anche usare gli strumenti di testo per aggiungere titoli personalizzati come \\"Esercizi di Sottrazione \u2014 Togli da 10\\" o istruzioni come \\"Conta quanti ne restano e scrivi il numero\\".',
    },
    {
      heading: 'Controlla il Foglio Risposte Automatico',
      content: 'Ogni scheda di sottrazione generata include un foglio risposte automatico. Clicca la scheda Foglio Risposte per visualizzarlo.\\n\\nIl foglio risposte rispecchia il layout della scheda ma mostra le risposte corrette compilate. Questo serve due segmenti cruciali di acquirenti:\\n\\nGli insegnanti usano i fogli risposte per una correzione efficiente. I problemi di sottrazione con immagini barrate possono richiedere tempo per la verifica manuale, specialmente quando si correggono 20\u201330 schede di studenti. Un foglio risposte elimina questo peso.\\n\\nI genitori usano i fogli risposte per verificare il lavoro dei figli. I genitori che fanno homeschool e gestiscono pi\u00f9 materie apprezzano particolarmente i fogli risposte perch\u00e9 riducono il carico cognitivo di verificare i risultati di sottrazione mentre insegnano altre materie.\\n\\nIl foglio risposte viene calcolato automaticamente in base alle operazioni matematiche di ogni esercizio. La risposta di ogni problema \u00e8 elaborata dal generatore \u2014 non devi mai calcolare o verificare le risposte manualmente.\\n\\nIncludi sempre i fogli risposte nei tuoi prodotti. Su ogni marketplace, \\"con foglio risposte\\" \u00e8 un qualificatore frequentemente cercato per le schede di matematica. Includilo nel titolo e nella descrizione del prodotto. La tua inserzione pu\u00f2 evidenziare \\"Foglio risposte automatico incluso per ogni scheda\\" come punto di forza prominente.',
    },
    {
      heading: 'Esporta come PDF e JPEG Pronti per la Stampa',
      content: 'La sezione esportazione offre opzioni di download sia per la scheda che per il foglio risposte.\\n\\nJPEG Scheda: Un file immagine ad alta risoluzione utile per miniature delle inserzioni, marketing sui social media e consegna digitale. I file JPEG sono universalmente compatibili e facili da stampare.\\n\\nPDF Scheda: Lo standard professionale per prodotti stampabili. I file PDF mantengono la formattazione esatta su tutti i dispositivi e stampanti. La maggior parte degli acquirenti dei marketplace si aspetta schede scaricabili in formato PDF.\\n\\nJPEG e PDF Foglio Risposte: File di esportazione separati per il foglio risposte in entrambi i formati.\\n\\nPer le inserzioni sui marketplace, esporta il PDF come prodotto consegnabile e un JPEG per le immagini di anteprima. Gli acquirenti devono vedere il formato delle immagini barrate prima dell\\'acquisto \u2014 \u00e8 la firma visiva di una scheda di sottrazione e comunica immediatamente cos\\'\u00e8 il prodotto.\\n\\nImportante: la prova gratuita con filigrana produce esportazioni completamente funzionali con una filigrana visibile sovrapposta. Questo ti permette di valutare la qualit\u00e0 di stampa, verificare che i segni di barratura vengano renderizzati chiaramente e creare stampe di prova prima di acquistare una licenza commerciale. La licenza commerciale rimuove la filigrana da tutte le esportazioni, producendo file puliti pronti per la vendita.',
    },
    {
      heading: 'Crea Variazioni per una Linea di Prodotti Completa',
      content: 'I venditori di stampabili di maggior successo costruiscono linee di prodotti sistematiche da un singolo generatore. Le schede di sottrazione si prestano a variazioni estese perch\u00e9 le modalit\u00e0 di esercizio, i livelli di difficolt\u00e0 e i temi si combinano in modo moltiplicativo.\\n\\nVariazioni di difficolt\u00e0: Crea la stessa scheda tematica a quattro livelli di difficolt\u00e0 \u2014 Minuendo Massimo 5, 10, 15 e 20. Un set \\"Sottrazione Animali della Fattoria\\" con quattro livelli di difficolt\u00e0 ti d\u00e0 quattro prodotti o un bundle progressivo.\\n\\nVariazioni di tema: Mantieni la stessa difficolt\u00e0 ma cambia tema. Dieci temi a difficolt\u00e0 scuola dell\\'infanzia (Minuendo Massimo 10) ti danno dieci prodotti unici, ognuno con termini di ricerca diversi sui marketplace.\\n\\nVariazioni di modalit\u00e0: Crea un set di schede in modalit\u00e0 Barra e un altro in modalit\u00e0 Trova il Sottraendo per lo stesso tema e difficolt\u00e0. Diverse modalit\u00e0 servono diversi obiettivi didattici e attraggono acquirenti diversi.\\n\\nVariazioni di dimensione pagina: Crea versioni US Letter e A4 di ogni scheda. Questo raddoppia la tua portata sui mercati internazionali con uno sforzo minimo. Pubblicale separatamente o raggruppa entrambe le dimensioni insieme.\\n\\nBundle addizione-sottrazione: Questo \u00e8 il vantaggio pi\u00f9 forte della sottrazione per il bundling. Abbina le tue schede di sottrazione con schede di addizione corrispondenti dal Generatore di Schede di Addizione. Un \\"Bundle Matematica Animali della Fattoria \u2014 Addizione e Sottrazione\\" a $9.99\u2013$14.99 \u00e8 un prodotto di alto valore destinato agli acquirenti che vogliono esercizi matematici completi. Ogni prodotto di addizione che gi\u00e0 vendi ha un naturale complemento di sottrazione.\\n\\nCollezioni stagionali: Crea schede di sottrazione a tema festivit\u00e0 e pubblicale 4\u20136 settimane prima di ogni festivit\u00e0. Halloween, Natale, San Valentino e Pasqua creano tutti picchi di domanda prevedibili.',
    },
  ],

  platformTips: [
    {
      heading: 'Vendere Schede di Sottrazione su Etsy',
      content: 'Etsy \u00e8 il pi\u00f9 grande marketplace per schede stampabili, e le schede di sottrazione beneficiano dell\\'essere abbinate alle schede di addizione che molti venditori Etsy gi\u00e0 offrono.\\n\\nOttimizzazione del titolo: Includi la parola chiave principale all\\'inizio. Esempi efficaci: \\"Schede Sottrazione Scuola dell\\'Infanzia \u2014 Immagini Barrate Tema Animali \u2014 Togli da 10 \u2014 Con Foglio Risposte\\" o \\"Esercizi Sottrazione Prima Elementare \u2014 Sottrazione Visiva \u2014 Tema Dinosauri \u2014 PDF Scaricabile\\". I titoli Etsy possono essere fino a 140 caratteri \u2014 usa tutto lo spazio con parole chiave pertinenti.\\n\\nTag: Usa tutti i 13 tag che Etsy permette. Combina ampi e specifici: \\"schede sottrazione\\", \\"matematica scuola infanzia\\", \\"schede togliere\\", \\"sottrazione visiva\\", \\"conteggio immagini barrate\\", \\"esercizi matematica bambini\\", \\"sottrazione homeschool\\", \\"schede matematica stampabili\\", \\"sottrazione con immagini\\" e variazioni simili.\\n\\nImmagini inserzione: Il formato delle immagini barrate \u00e8 il tuo punto di forza visivo. La prima immagine della tua inserzione dovrebbe mostrare chiaramente le immagini barrate cos\u00ec gli acquirenti capiscano subito il formato del prodotto. Includi un\\'anteprima a pagina intera, un primo piano dell\\'esercizio con barrature, il foglio risposte e idealmente un mockup della scheda stampata.\\n\\nPrezzi: Le singole schede di sottrazione si vendono a $1.49\u2013$2.99. Bundle di 10\u201320 schede a $4.99\u2013$9.99. Bundle combinati addizione-sottrazione a $7.99\u2013$14.99. Crea sempre bundle accanto alle inserzioni singole.',
    },
    {
      heading: 'Vendere Schede di Sottrazione su Amazon KDP',
      content: 'Amazon KDP \u00e8 ideale per compilare schede di sottrazione in formato quaderno rilegato. I quaderni di sottrazione funzionano particolarmente bene quando abbinati con l\\'addizione in un unico volume.\\n\\nFormato prodotto: Crea un quaderno con 50\u2013100 schede di sottrazione pi\u00f9 fogli risposte alla fine. Struttura il libro con difficolt\u00e0 progressiva \u2014 inizia con la modalit\u00e0 Barra a Minuendo Massimo 5 e aumenta gradualmente attraverso la modalit\u00e0 Immagine \u2013 Numero fino alla modalit\u00e0 Trova il Sottraendo a Minuendo Massimo 20. Questa progressione racconta una storia di apprendimento che giustifica il formato libro.\\n\\nTitolo e sottotitolo: Esempio titolo: \\"Schede di Sottrazione per Bambini 5\u20138 Anni\\". Esempio sottotitolo: \\"100 Pagine di Esercizi Sottrazione Visiva con Immagini Barrate, Figure Tematiche e Fogli Risposte per la Scuola dell\\'Infanzia Fino alla Seconda Elementare\\".\\n\\nParole chiave: Usa tutti i 7 slot parole chiave KDP. Punta a frasi specifiche: \\"esercizi sottrazione scuola infanzia\\", \\"schede togliere con immagini\\", \\"quaderno sottrazione visiva\\", \\"esercizi conteggio immagini barrate\\", \\"libro attivit\u00e0 matematica prima elementare\\", \\"sottrazione con immagini bambini\\", \\"quaderno sottrazione homeschool\\".\\n\\nLibri combinati: Un singolo volume che copre sia addizione che sottrazione allo stesso livello di difficolt\u00e0 \u00e8 un forte prodotto KDP. \\"Esercizi Addizione e Sottrazione \u2014 200 Schede per la Scuola dell\\'Infanzia\\" combina l\\'output di entrambi i generatori in un quaderno completo.\\n\\nPrezzi: I quaderni KDP con 50\u2013100 pagine si vendono tipicamente a $5.99\u2013$9.99. I quaderni combinati addizione-sottrazione possono avere un prezzo leggermente pi\u00f9 alto a $7.99\u2013$12.99.',
    },
    {
      heading: 'Vendere Schede di Sottrazione su Teachers Pay Teachers',
      content: 'Teachers Pay Teachers si rivolge agli educatori scolastici che necessitano di risorse allineate al curriculum. Le schede di sottrazione funzionano bene su TpT quando fanno chiaramente riferimento a livelli scolastici e obiettivi di apprendimento.\\n\\nLe descrizioni dei prodotti dovrebbero specificare: livello scolastico, competenze esercitate (sottrazione entro 10, trovare il sottraendo, togliere visivo), numero di pagine incluse, disponibilit\u00e0 del foglio risposte e qualsiasi allineamento a standard comuni. La sottrazione entro 10 si allinea a K.OA.A.1 e la sottrazione entro 20 si allinea a 1.OA.A.1 \u2014 fare riferimento a questi standard aiuta gli insegnanti a trovare i tuoi prodotti.\\n\\nFile di anteprima: Carica 2\u20133 pagine di esempio che mostrano il formato delle immagini barrate. Gli insegnanti vogliono vedere esattamente come viene presentata la sottrazione visiva prima dell\\'acquisto. Lo stile delle immagini barrate \u00e8 abbastanza distintivo che un\\'anteprima forte converte i visitatori in acquirenti.\\n\\nBundle su TpT: Gli insegnanti comprano bundle per intere unit\u00e0 o periodi di valutazione. Un \\"Bundle Padronanza Sottrazione \u2014 Modalit\u00e0 Barra, Immagine \u2013 Numero e Trova il Sottraendo\\" che copre tutti i tipi di esercizio per un singolo livello scolastico \u00e8 un prodotto forte su TpT. Un bundle ancora pi\u00f9 forte combina addizione e sottrazione per un pacchetto \\"Operazioni Matematiche Complete\\".\\n\\nParole chiave specifiche TpT: Usa terminologia educativa: \\"centro matematico\\", \\"lavoro del mattino\\", \\"valutazione sottrazione\\", \\"esercizio togliere\\", \\"sottrazione differenziata\\", \\"fluenza nei fatti\\". Questi corrispondono a come gli insegnanti cercano risorse per la classe.\\n\\nTempistiche: Abbi i tuoi bundle di sottrazione pubblicati prima di agosto per la domanda del ritorno a scuola. Le operazioni matematiche vengono insegnate all\\'inizio dell\\'anno scolastico, rendendo settembre\u2013novembre un periodo di picco delle vendite per i materiali di sottrazione.',
    },
  ],

  monetization: [
    {
      heading: 'Prezzi per i Tuoi Prodotti di Schede di Sottrazione',
      content: 'I prezzi delle schede di sottrazione seguono schemi simili a quelli dell\\'addizione, con un vantaggio: gli acquirenti che hanno gi\u00e0 acquistato i tuoi prodotti di addizione sono predisposti a comprare materiali di sottrazione corrispondenti ai prezzi stabiliti.\\n\\nSingole schede con foglio risposte: $1.49\u2013$2.49. Prodotti d\\'ingresso che generano traffico nel negozio e costruiscono familiarit\u00e0 con gli acquirenti.\\n\\nMini-bundle tematici (5\u201310 schede): $2.99\u2013$5.99. Il punto ideale per Etsy. Ogni bundle copre un tema a un livello di difficolt\u00e0 con tutte le modalit\u00e0 di esercizio.\\n\\nBundle per livello scolastico (20\u201330 schede): $6.99\u2013$12.99. Risorse complete per un gruppo d\\'et\u00e0 specifico. Includono tutti i temi e tutte le modalit\u00e0 di esercizio a quel livello di difficolt\u00e0.\\n\\nCollezioni complete di sottrazione (50\u2013100+ schede): $14.99\u2013$29.99. Posizionale come soluzioni \\"tutto ci\u00f2 che ti serve\\". Coprono pi\u00f9 livelli di difficolt\u00e0, temi e modalit\u00e0 di esercizio.\\n\\nBundle combinati addizione-sottrazione: $9.99\u2013$19.99. I prodotti di maggior valore nella tua linea di schede matematiche. Combina schede di addizione e sottrazione abbinate allo stesso livello di difficolt\u00e0 e tema. Questi bundle attraggono insegnanti e genitori che necessitano di esercizi matematici completi che coprono entrambe le operazioni fondamentali.\\n\\nEvita di sottoquotare. La complessit\u00e0 visiva delle immagini barrate conferisce alle schede di sottrazione un valore percepito di produzione superiore rispetto alle schede con soli numeri. Prezza alla media di mercato o sopra.',
    },
    {
      heading: 'Creare Bundle di Sottrazione con Prodotti di Addizione',
      content: 'La strategia di ricavo pi\u00f9 forte per le schede di sottrazione \u00e8 abbinarle con prodotti di addizione. Questo perch\u00e9 addizione e sottrazione sono operazioni inverse \u2014 ogni insegnante e genitore che ha bisogno dell\\'una ha bisogno dell\\'altra.\\n\\nBundle tematici abbinati: Combina \\"Addizione Animali della Fattoria\\" con \\"Sottrazione Animali della Fattoria\\" in un singolo bundle matematico. Il tema abbinato crea coerenza visiva e le operazioni combinate creano completezza educativa.\\n\\nBundle a progressione di difficolt\u00e0: Compila schede di sottrazione facili, medie e difficili insieme alla stessa progressione in addizione. Commercializzali come \\"esercizi completi sui fatti matematici\\" che portano i bambini da semplici somme a problemi complessi di sottrazione.\\n\\nMega-bundle per livello scolastico: Combina tutte le schede di addizione e sottrazione appropriate per un livello scolastico specifico. \\"Matematica Completa Scuola dell\\'Infanzia \u2014 Addizione e Sottrazione \u2014 200 Schede\\" \u00e8 un prodotto premium a $19.99\u2013$29.99.\\n\\nBundle per modalit\u00e0 di esercizio: Raggruppa modalit\u00e0 simili tra le operazioni. Un bundle \\"Esercizi Matematica Visiva\\" che combina Immagine + Immagine dell\\'addizione con la modalit\u00e0 Barra della sottrazione punta allo stesso stile di apprendimento. Un bundle \\"Sfida Numero Mancante\\" che combina Trova l\\'Addendo dell\\'addizione con Trova il Sottraendo della sottrazione punta all\\'esercizio del pensiero algebrico.\\n\\nPromozione incrociata: Ogni inserzione di prodotto di addizione dovrebbe menzionare i tuoi prodotti di sottrazione e viceversa. Crea link tra le inserzioni ovunque il marketplace lo permetta. Gli acquirenti che ti hanno trovato attraverso termini di ricerca sull\\'addizione diventano clienti di sottrazione con uno sforzo di marketing aggiuntivo minimo.',
    },
    {
      heading: 'Domanda Stagionale e Costante',
      content: 'Le schede di sottrazione condividono gli stessi modelli di domanda costante dell\\'addizione ma con un leggero sfasamento temporale. Poich\u00e9 la sottrazione viene insegnata dopo l\\'addizione nella maggior parte dei programmi, il picco di domanda inizia circa 2\u20134 settimane dopo nell\\'anno scolastico.\\n\\nRitorno a scuola (settembre\u2013ottobre): La domanda di sottrazione aumenta dopo la conclusione delle unit\u00e0 di addizione, tipicamente 2\u20134 settimane dall\\'inizio dell\\'anno scolastico. Abbi i tuoi prodotti pubblicati entro agosto cos\u00ec sono indicizzati e visibili quando gli insegnanti iniziano a cercare.\\n\\nStagioni festive: Crea schede di sottrazione a tema Halloween, Natale, San Valentino e Pasqua. Pubblicale 4\u20136 settimane prima di ogni festivit\u00e0. Immagini festive barrate (zucche, fiocchi di neve, cuori, uova) creano schede visivamente accattivanti che si distinguono nei risultati di ricerca dei marketplace.\\n\\nApprendimento estivo (giugno\u2013luglio): I genitori che cercano \\"ripasso matematica estivo\\" hanno bisogno sia di esercizi di addizione che di sottrazione. I bundle estivi che combinano entrambe le operazioni sono particolarmente efficaci perch\u00e9 i genitori vogliono materiali di ripasso completi, non esercizi su singole operazioni.\\n\\nAnno nuovo (gennaio): La mentalit\u00e0 del \\"nuovo inizio\\" spinge gli acquisti educativi. Genitori e insegnanti fissano obiettivi matematici per il nuovo semestre, creando domanda di materiali per esercitarsi in modo strutturato.\\n\\nDomanda di base costante: Centri di tutoring, famiglie che fanno homeschool e programmi doposcuola acquistano materiali di sottrazione tutto l\\'anno. Questa domanda di base assicura vendite costanti al di fuori dei picchi stagionali.',
    },
  ],

  examples: [
    {
      heading: 'Variazioni di Prodotto per Livello di Difficolt\u00e0',
      content: 'Ecco esempi concreti di prodotti di sottrazione che puoi creare con il Generatore di Schede di Sottrazione, organizzati per impostazione di difficolt\u00e0 del Minuendo Massimo.\\n\\nLivello prescolare (Minuendo Massimo 5): Usa la modalit\u00e0 Barra esclusivamente con 4\u20136 problemi per pagina. Scegli temi facilmente riconoscibili come frutta, animali domestici o giocattoli. Immagini grandi con segni X chiari sugli elementi barrati. Queste schede introducono il concetto di \\"togliere\\" visivamente. Crea 8\u201310 schede per tema.\\n\\nLivello scuola dell\\'infanzia (Minuendo Massimo 10): Alterna le modalit\u00e0 Barra e Immagine \u2013 Numero con 6\u20138 problemi per pagina. Includi campi nome e data per l\\'uso in classe. La transizione da sottrazione puramente visiva a semi-astratta \u00e8 il valore educativo chiave. Crea 10\u201315 schede per tema. Questo \u00e8 il livello di difficolt\u00e0 con il volume pi\u00f9 alto per i prodotti di sottrazione.\\n\\nLivello prima elementare (Minuendo Massimo 15): Introduci la modalit\u00e0 Trova il Sottraendo insieme a Barra e Immagine \u2013 Numero. 8\u201310 problemi per pagina. Il tipo di esercizio \\"trova cosa \u00e8 stato tolto\\" sviluppa il ragionamento algebrico e differenzia i tuoi prodotti dalle schede di sottrazione basilari. Crea 15\u201320 schede per tema con progressione di difficolt\u00e0.\\n\\nLivello seconda elementare (Minuendo Massimo 20): Usa la Modalit\u00e0 Mista per combinare tutti i tipi di esercizio in singole schede. 8\u201310 problemi per pagina. Queste schede complete servono come strumenti di valutazione e ripasso. Gli insegnanti le usano per verificare se gli studenti hanno padroneggiato la sottrazione a tutti i livelli concettuali. Crea 20+ schede per tema.',
    },
    {
      heading: 'Combinazioni di Temi e Modalit\u00e0 ad Alte Prestazioni',
      content: 'Certe combinazioni di tema, difficolt\u00e0 e modalit\u00e0 di esercizio funzionano costantemente bene in base ai modelli di ricerca dei marketplace e al comportamento degli acquirenti.\\n\\nAnimali + Barra + Scuola dell\\'infanzia: I temi animali sono la categoria pi\u00f9 cercata per materiali matematici per bambini. Le immagini di animali barrate creano schede visivamente accattivanti. Animali della fattoria, creature marine, animali della giungla e animali domestici producono ciascuno prodotti distinti con parole chiave di ricerca uniche.\\n\\nDinosauri + Trova il Sottraendo + Prima elementare: I materiali educativi a tema dinosauri hanno comunit\u00e0 di acquirenti dedicate. La modalit\u00e0 Trova il Sottraendo (\\"8 dinosauri \u2013 ? = 3 dinosauri\\") aggiunge un elemento puzzle coinvolgente. Genitori e insegnanti cercano specificamente \\"schede sottrazione dinosauri\\".\\n\\nCibo + Barra + Et\u00e0 prescolare: Frutta, dolci e snack sono immediatamente riconoscibili per i bambini piccoli. Immagini di cibo barrate (cupcake con segni X, biscotti \\"mangiati\\") creano storie visive intuitive sulla sottrazione.\\n\\nVeicoli + Immagine \u2013 Numero + Scuola dell\\'infanzia: Auto, camion e aerei attraggono una fascia demografica specifica. La modalit\u00e0 Immagine \u2013 Numero aggiunge rigore educativo mantenendo il coinvolgimento visivo.\\n\\nTemi stagionali + Qualsiasi modalit\u00e0: Zucche barrate per Halloween, fiocchi di neve che si sciolgono per l\\'inverno, cuori spezzati per San Valentino. Le schede di sottrazione stagionali raccontano una storia visiva che le schede con soli numeri non possono eguagliare. Pubblica questi prodotti 4\u20136 settimane prima di ogni festivit\u00e0.\\n\\nLa strategia per scegliere i temi \u00e8 la stessa dell\\'addizione: cerca il tema sul tuo marketplace target, nota i livelli di concorrenza e il volume di ricerca, e crea prodotti dove la domanda supera l\\'offerta.',
    },
  ],

  faq: [
    {
      question: 'Quali modalit\u00e0 di esercizio supporta il Generatore di Schede di Sottrazione?',
      answer: 'Il generatore supporta quattro modalit\u00e0 di esercizio. La modalit\u00e0 Barra mostra un gruppo di immagini tematiche con alcune visivamente barrate, e i bambini contano gli elementi rimanenti. Immagine \u2013 Numero mostra immagini meno un numero per collegare sottrazione visiva e astratta. Trova il Sottraendo presenta equazioni come \\"8 \u2013 ? = 3\\" dove i bambini determinano il numero mancante. La Modalit\u00e0 Mista combina tutti e tre i tipi in una singola scheda per un esercizio completo.',
    },
    {
      question: 'Cos\\'\u00e8 il Minuendo Massimo e come controlla la difficolt\u00e0?',
      answer: 'Il Minuendo Massimo imposta il numero pi\u00f9 grande da cui i bambini sottraggono. Nel problema \\"7 \u2013 3 = 4\\", il minuendo \u00e8 7. Imposta il Minuendo Massimo a 5 per l\\'et\u00e0 prescolare, 10 per la scuola dell\\'infanzia, 15 per la prima elementare o 20 per la seconda elementare. Il generatore assicura che tutti i problemi restino entro questo intervallo.',
    },
    {
      question: 'In cosa si differenzia la modalit\u00e0 Barra dalle altre modalit\u00e0?',
      answer: 'La modalit\u00e0 Barra \u00e8 il formato distintivo della sottrazione. Mostra un gruppo di immagini tematiche con alcune contrassegnate da una X visibile. I bambini contano le immagini non barrate e scrivono il numero rimanente. \u00c8 il modo pi\u00f9 visivo e intuitivo per insegnare la sottrazione perch\u00e9 rappresenta direttamente il \\"togliere\\". Le altre modalit\u00e0 usano numeri o valori mancanti invece di elementi visivi barrati.',
    },
    {
      question: 'Il generatore crea fogli risposte automaticamente?',
      answer: 'S\u00ec. Ogni scheda di sottrazione include un foglio risposte automatico che rispecchia il layout della scheda con le risposte corrette compilate. Il foglio risposte si esporta sia in PDF che in JPEG. Questo \u00e8 essenziale per gli insegnanti che correggono le schede di pi\u00f9 studenti e per i genitori che verificano il lavoro dei figli a casa.',
    },
    {
      question: 'Posso creare bundle di schede di sottrazione con quelle di addizione?',
      answer: 'S\u00ec, e questa \u00e8 una delle strategie di vendita pi\u00f9 forti per le schede di matematica. Crea schede di sottrazione e addizione abbinate con lo stesso tema e livello di difficolt\u00e0, poi raggruppale come pacchetto \\"Esercizi Matematica Completi\\". Questi bundle combinati hanno prezzi pi\u00f9 alti e attraggono acquirenti che necessitano di materiali matematici completi.',
    },
    {
      question: 'Posso vendere le schede che creo su Etsy, Amazon KDP e TpT?',
      answer: 'S\u00ec. Una licenza commerciale ti d\u00e0 pieni diritti per vendere le schede generate su qualsiasi piattaforma inclusi Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Fabrica e il tuo sito web. Non ci sono royalty o commissioni per vendita. Tieni il 100% dei tuoi ricavi di vendita dopo le commissioni del marketplace.',
    },
    {
      question: 'Qual \u00e8 la politica di rimborso per le licenze commerciali?',
      answer: 'Ogni generatore offre una prova gratuita con filigrana cos\u00ec puoi testare tutte le funzionalit\u00e0, creare schede di esempio e valutare la qualit\u00e0 dell\\'output prima dell\\'acquisto. Poich\u00e9 puoi valutare completamente il prodotto prima di comprare, non offriamo rimborsi per le vendite di licenze commerciali. Questa \u00e8 una pratica standard per gli strumenti di prodotti digitali dove il prodotto completo pu\u00f2 essere visionato prima dell\\'acquisto.',
    },
  ],

  nextSteps: [
    {
      slug: 'creare-schede-addizione',
      title: 'Creare Schede di Addizione',
      description: 'Se non l\\'hai ancora fatto, costruisci il lato addizione del tuo catalogo di schede matematiche. I prodotti di addizione e sottrazione si raggruppano perfettamente insieme per offerte di maggior valore.',
    },
    {
      slug: 'creare-schede-puzzle-matematici',
      title: 'Creare Schede di Puzzle Matematici',
      description: 'Aggiungi variet\u00e0 al tuo catalogo matematico con coinvolgenti problemi in formato puzzle che si distinguono dai layout tradizionali delle schede.',
    },
    {
      slug: 'creare-cerca-parole',
      title: 'Creare Cerca Parole',
      description: 'Espanditi oltre la matematica nella categoria ad alta domanda dei cerca parole. I puzzle cerca parole sono uno dei prodotti stampabili pi\u00f9 venduti su tutte le piattaforme.',
    },
  ],

  internalLinks: [
    { pageType: 'start', slug: 'guida-completa-attivita-stampabili', anchorText: 'Guida Completa per Avviare un\\'Attivit\u00e0 di Stampabili' },
    { pageType: 'start', slug: 'creare-schede-che-vendono', anchorText: 'Come Creare Schede Professionali Che Vendono' },
    { pageType: 'start', slug: 'attivita-stampabili-etsy', anchorText: 'Masterclass Attivit\u00e0 Stampabili Etsy' },
    { pageType: 'start', slug: 'libri-attivita-amazon-kdp', anchorText: 'Guida Business Libri Attivit\u00e0 Amazon KDP' },
    { pageType: 'start', slug: 'guida-licenza-commerciale', anchorText: 'Guida alla Licenza Commerciale' },
    { pageType: 'app', slug: 'sottrazione-schede', anchorText: 'Generatore Schede Sottrazione \u2014 Dettagli Completi' },
    { pageType: 'app', slug: 'matematica-schede', anchorText: 'Generatore Schede Matematica \u2014 Dettagli Completi' },
    { pageType: 'tool', slug: 'generatore-schede-sottrazione', anchorText: 'Prova il Generatore di Schede di Sottrazione' },
  ],

  toolsRecommended: [
    {
      appId: 'subtraction',
      title: 'Generatore di Schede di Sottrazione',
      description: 'Lo strumento principale per questa guida. Crea schede di sottrazione basate su immagini con elementi visivi barrati, quattro modalit\u00e0 di esercizio, difficolt\u00e0 configurabile tramite Minuendo Massimo e fogli risposte automatici.',
    },
    {
      appId: 'addition',
      title: 'Generatore di Schede di Addizione',
      description: 'Il complemento naturale alla sottrazione. Raggruppa prodotti di addizione e sottrazione insieme per offerte di esercizi matematici di maggior valore che coprono entrambe le operazioni fondamentali.',
    },
    {
      appId: 'math-worksheet',
      title: 'Generatore di Schede di Matematica',
      description: 'Uno strumento pi\u00f9 ampio per operazioni matematiche che supporta addizione, sottrazione e operazioni miste. Utile per creare bundle completi di esercizi matematici.',
    },
    {
      appId: 'code-addition',
      title: 'Generatore di Schede Addizione in Codice',
      description: 'Una variante a codice segreto delle schede di matematica dove i bambini risolvono problemi per decifrare messaggi segreti. Aggiunge variet\u00e0 al tuo catalogo di schede matematiche.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/english/subtraction/Subtraction Fun 1.webp', alt: 'Scheda di sottrazione con immagini tematiche barrate che mostra esercizi di togliere per bambini' },
    samples: [
      { src: '/samples/english/subtraction/Subtraction Fun 1.webp', alt: 'Scheda di sottrazione basata su immagini con animali barrati per la scuola dell\\'infanzia', caption: 'Scheda di sottrazione per la scuola dell\\'infanzia con modalit\u00e0 Barra e immagini tematiche' },
      { src: '/samples/english/subtraction/Subtraction Fun 1.webp', alt: 'Scheda di sottrazione con foglio risposte che mostra le soluzioni corrette', caption: 'Foglio risposte automatico generato insieme a ogni scheda di sottrazione' },
    ],
    youtubeId: 'til2mrWMUxk',
    videoTitle: 'Come Creare Schede di Sottrazione \u2014 Tutorial Completo',
  },

  themeImages: [
    { src: '/image-library/birds/eagle.webp', alt: 'Aquila \u2014 immagine educativa tematica', caption: 'Aquila' },
    { src: '/image-library/birds/flamingo.webp', alt: 'Fenicottero \u2014 immagine educativa tematica', caption: 'Fenicottero' },
    { src: '/image-library/birds/hornbill.webp', alt: 'Bucero \u2014 immagine educativa tematica', caption: 'Bucero' },
    { src: '/image-library/birds/macaw.webp', alt: 'Ara \u2014 immagine educativa tematica', caption: 'Ara' },
    { src: '/image-library/birds/ostrich.webp', alt: 'Struzzo \u2014 immagine educativa tematica', caption: 'Struzzo' },
  ],
};

export default content;
`;

const outPath = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'it', 'create-subtraction-worksheets.ts');
fs.writeFileSync(outPath, content, 'utf8');
console.log('Written:', outPath);
console.log('Size:', fs.statSync(outPath).size, 'bytes');
