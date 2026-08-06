const fs = require('fs');
const path = require('path');

const content = `import type { GuideContent } from '../types';

const content: GuideContent = {
  seo: {
    primaryKeyword: 'schede trova l\\'intruso puzzle visivi',
    secondaryKeywords: [
      'creare puzzle trova l\\'intruso da vendere',
      'generatore schede discriminazione visiva intruso',
      'schede stampabili trova l\\'intruso per Etsy e KDP',
      'puzzle trova il diverso per venditori Etsy e KDP',
    ],
    lsiKeywords: [
      'generatore trova l\\'intruso doppia modalit\u00e0 identico simile',
      'override modalit\u00e0 per esercizio puzzle visivi',
      'chiave di risposta automatica cerchio rosso schede',
      'vendere schede trova l\\'intruso su Etsy',
      'quaderni discriminazione visiva Amazon KDP',
      'strumento trova l\\'intruso con licenza commerciale',
    ],
    titleTag: 'Schede Trova l\\'Intruso \u2014 Guida Creazione',
    metaDescription: 'Crea schede trova l\\'intruso con modalit\u00e0 Identico e Simile, override per esercizio e chiavi di risposta automatiche. Guida per venditori Etsy e KDP.',
  },

  hero: {
    title: 'Come Creare Puzzle Trova l\\'Intruso',
    tagline: 'Tutorial passo passo per creare schede di discriminazione visiva con doppia modalit\u00e0 di generazione, override per esercizio, chiavi di risposta auto-generate con marcatori cerchio rosso e puzzle puramente visivi da vendere in tutto il mondo su Etsy, Amazon KDP e Teachers Pay Teachers',
    description: 'I puzzle trova l\\'intruso sono tra le attivit\u00e0 educative pi\u00f9 universalmente accessibili perch\u00e9 non richiedono lettura, comprensione linguistica o competenze matematiche. Gli studenti osservano quattro immagini e identificano quella che non appartiene al gruppo. Questo formato puramente visivo rende le schede trova l\\'intruso vendibili in ogni paese senza traduzione. I genitori le usano per la pratica di percezione visiva a casa. Gli insegnanti le usano per riscaldamenti di pensiero critico e attivit\u00e0 di classificazione. I centri di tutoraggio le usano per esercizi di sviluppo cognitivo. Questa guida ti accompagna nell\\'intero processo di creazione usando il Generatore Schede Trova l\\'Intruso \u2014 dalla scelta tra le modalit\u00e0 di generazione Identico e Simile alla configurazione degli override per esercizio, generazione di chiavi di risposta automatiche con marcatori cerchio rosso e esportazione di file pronti per la produzione. Che tu stia creando il tuo primo prodotto di puzzle visivi o espandendo un catalogo esistente di schede, avrai un prodotto finito pronto per la pubblicazione alla fine di questo tutorial.',
  },

  introduction: 'La discriminazione visiva \u00e8 una delle competenze cognitive fondamentali nello sviluppo della prima infanzia. Prima che i bambini imparino a leggere, devono prima imparare a osservare le differenze \u2014 distinguere una forma da un\\'altra, una lettera da una simile, un oggetto da un gruppo. I puzzle trova l\\'intruso allenano questa competenza direttamente presentando quattro immagini e chiedendo agli studenti di identificare quella che non corrisponde alle altre. Questo rende le schede trova l\\'intruso un prodotto fondamentale con domanda che va dall\\'et\u00e0 prescolare alla scuola elementare.\\n\\nCi\u00f2 che rende le schede trova l\\'intruso particolarmente efficaci come prodotto stampabile \u00e8 il formato puramente visivo. A differenza delle schede di vocabolario, pagine di comprensione della lettura o problemi di matematica che richiedono testo specifico per lingua, i puzzle trova l\\'intruso contengono solo immagini. Quattro figure in una riga, tre che appartengono insieme e una che non appartiene. Nessuna parola, nessun numero, nessuna barriera linguistica. Una scheda creata in una singola sessione si vende identicamente su ogni marketplace internazionale senza traduzione o localizzazione. Questa portabilit\u00e0 globale senza sforzo per ogni lingua \u00e8 un vantaggio competitivo significativo per i venditori.\\n\\nIl Generatore Schede Trova l\\'Intruso gestisce la complessit\u00e0 della creazione di queste attivit\u00e0 attraverso due modalit\u00e0 di generazione distinte. La modalit\u00e0 Identico posiziona tre cloni della stessa identica immagine accanto a un\\'immagine diversa dello stesso tema \u2014 gli studenti individuano il non-duplicato confrontando dettagli visivi fini. La modalit\u00e0 Simile preleva tre immagini dal Tema A e un\\'immagine dal Tema B \u2014 gli studenti identificano l\\'intruso tematico riconoscendo differenze categoriali. Ogni modalit\u00e0 si rivolge a una competenza cognitiva diversa, e l\\'override modalit\u00e0 per esercizio ti permette di mescolare entrambe le modalit\u00e0 su una singola scheda per difficolt\u00e0 progressiva. Il generatore produce chiavi di risposta automatiche con marcatori cerchio rosso dimensionati rispetto all\\'immagine, gestisce il layout a colonne adattivo per cinque-dieci esercizi per pagina e esporta quattro file pronti per la produzione per sessione. Tu ti concentri sulla strategia di prodotto \u2014 quali combinazioni di modalit\u00e0 usare, quali abbinamenti tematici targettizzare, come bundlare e prezzare \u2014 mentre il generatore gestisce layout, mescolamento e creazione della chiave di risposta.\\n\\nTutte le funzionalit\u00e0 menzionate in questa guida sono disponibili nella prova gratuita con filigrana. Puoi creare schede trova l\\'intruso campione, testare entrambe le modalit\u00e0 di generazione, sperimentare con gli override per esercizio e valutare la qualit\u00e0 dell\\'output prima di acquistare una licenza commerciale.',

  tutorial: [
    {
      heading: 'Apri il Generatore Schede Trova l\\'Intruso',
      content: 'Vai alla pagina del Generatore Schede Trova l\\'Intruso e clicca il pulsante di avvio per aprire il generatore nel tuo browser. Lo strumento si carica istantaneamente con una barra laterale delle impostazioni a sinistra e un canvas a doppia scheda a destra \u2014 una scheda per la scheda di lavoro, una per la chiave di risposta. Nessuna creazione di account, nessun download di software, nessuna installazione richiesta.\\n\\nIl canvas a doppia scheda \u00e8 il cuore del generatore Trova l\\'Intruso. La scheda della scheda di lavoro mostra le carte esercizio che gli studenti useranno, mentre la scheda della chiave di risposta mostra lo stesso layout con marcatori cerchio rosso che identificano l\\'elemento intruso in ogni riga. Entrambe le schede si generano simultaneamente quando clicchi Genera, quindi non hai mai bisogno di creare chiavi di risposta manualmente.\\n\\nPrenditi un momento per esplorare i pannelli della barra laterale. Il pannello Configurazione Esercizio controlla la modalit\u00e0 di generazione, il numero di esercizi e gli override per esercizio. Il pannello Libreria Immagini fornisce accesso alle collezioni tematiche con il sistema di selezione a due temi. Il pannello Impostazione Pagina gestisce le opzioni di layout e decorazione. Questi tre pannelli contengono tutto il necessario per configurare una scheda trova l\\'intruso completa.',
    },
    {
      heading: 'Scegli la Modalit\u00e0 di Generazione',
      content: 'Il Generatore Schede Trova l\\'Intruso offre due modalit\u00e0 di generazione distinte, e scegliere quella giusta determina la sfida cognitiva che la tua scheda presenta.\\n\\nLa modalit\u00e0 Identico \u00e8 progettata per la discriminazione visiva di base. Il generatore posiziona tre cloni della stessa identica immagine accanto a un\\'immagine diversa dello stesso tema. Gli studenti devono individuare il non-duplicato confrontando dettagli visivi fini all\\'interno di una singola categoria tematica. Tre gatti identici e un cane, tre mele identiche e una banana \u2014 la sfida \u00e8 riconoscere quale immagine non \u00e8 una copia. Questa modalit\u00e0 funziona meglio per i bambini pi\u00f9 piccoli che stanno sviluppando competenze di osservazione fondamentali.\\n\\nLa modalit\u00e0 Simile \u00e8 progettata per il ragionamento categoriale. Il generatore preleva tre immagini dal Tema A e un\\'immagine dal Tema B. Gli studenti devono identificare l\\'intruso tematico riconoscendo che un\\'immagine appartiene a una categoria diversa. Tre animali e un veicolo, tre frutti e un utensile \u2014 la sfida \u00e8 capire perch\u00e9 un elemento non appartiene al gruppo. Questa modalit\u00e0 produce puzzle pi\u00f9 difficili perch\u00e9 tutte e quattro le immagini sono visivamente diverse, e lo studente deve ragionare sull\\'appartenenza categoriale piuttosto che sull\\'abbinamento visivo.\\n\\nLa modalit\u00e0 Identico \u00e8 il tuo strumento di accessibilit\u00e0 per il pubblico pi\u00f9 giovane. La modalit\u00e0 Simile \u00e8 il tuo strumento di sfida per studenti pi\u00f9 grandi e prodotti pi\u00f9 avanzati. I venditori di schede trova l\\'intruso di maggior successo usano entrambe le modalit\u00e0: Identico per prodotti per et\u00e0 prescolare e scuola dell\\'infanzia, Simile per prodotti di livello scuola elementare, e override per esercizio per mescolare entrambe le modalit\u00e0 su schede a difficolt\u00e0 progressiva.',
    },
    {
      heading: 'Imposta il Numero di Esercizi e gli Override per Esercizio',
      content: 'Imposta il numero di esercizi da cinque a dieci usando il pannello Configurazione Esercizio. Il valore predefinito \u00e8 sei esercizi per scheda. Ogni esercizio contiene sempre esattamente quattro immagini \u2014 tre elementi comuni e un elemento intruso \u2014 con la posizione dell\\'intruso mescolata casualmente all\\'interno della riga.\\n\\nPer i prodotti per et\u00e0 prescolare, usa da cinque a sei esercizi. Meno esercizi significano carte immagine pi\u00f9 grandi con pi\u00f9 spaziatura, rendendo pi\u00f9 facile per i bambini piccoli concentrarsi su ogni riga e cerchiare la loro risposta. Per i prodotti per la scuola elementare, usa da otto a dieci esercizi per maggiore densit\u00e0 di contenuto e pi\u00f9 sfida per pagina.\\n\\nL\\'override modalit\u00e0 per esercizio \u00e8 ci\u00f2 che distingue questo generatore. Ogni riga di esercizio include il proprio selettore a discesa della modalit\u00e0, permettendoti di sovrascrivere la modalit\u00e0 globale per ogni singolo esercizio. Imposta la modalit\u00e0 globale su Identico, poi passa gli ultimi tre esercizi a Simile \u2014 creando una scheda che inizia facile e diventa progressivamente pi\u00f9 difficile. Oppure alterna Identico e Simile per sfida variata. Il pulsante \\\"Cancella Selezioni\\\" reimposta tutti gli override per esercizio alla modalit\u00e0 globale, rendendo la sperimentazione rapida.\\n\\nAttiva i campi nome e data per la gestione in classe. Attiva i numeri degli esercizi per visualizzare i numeri sul lato sinistro di ogni carta esercizio con larghezza di venticinque pixel e quindici pixel di distanza dal contenuto della carta. I numeri degli esercizi facilitano la revisione in classe e permettono agli insegnanti di fare riferimento a righe specifiche.',
    },
    {
      heading: 'Seleziona Temi e Immagini dalla Libreria o Carica Personalizzate',
      content: 'Il pannello Libreria Immagini ti d\u00e0 accesso a centoquattro collezioni tematiche con oltre tremilacento illustrazioni. Nella modalit\u00e0 Simile, il sistema a due temi rende i puzzle cross-categoria senza sforzo. Seleziona il Tema A dal menu a discesa per le tre immagini comuni e il Tema B per il singolo elemento intruso. Abbina animali con cibo, veicoli con natura, professioni con sport \u2014 qualsiasi combinazione dei temi disponibili crea un set di puzzle distinto.\\n\\nNella modalit\u00e0 Identico, serve un solo tema poich\u00e9 sia i cloni comuni che l\\'immagine intrusa provengono dalla stessa collezione. Il generatore seleziona automaticamente tre copie di un\\'immagine e un\\'immagine diversa da quel tema.\\n\\nSfoglia i temi usando il menu a discesa o cerca per parola chiave per trovare l\\'abbinamento giusto. Per la modalit\u00e0 Simile, scegli abbinamenti tematici con differenze categoriali ovvie per i bambini pi\u00f9 piccoli \u2014 animali contro veicoli, cibo contro utensili. Per prodotti avanzati, usa abbinamenti pi\u00f9 sottili dove i temi condividono somiglianze visive \u2014 animali della fattoria contro animali dello zoo, frutta contro verdura.\\n\\nPuoi anche caricare immagini personalizzate in formato PNG, JPG o GIF per creare puzzle trova l\\'intruso personalizzati. I caricamenti personalizzati ti permettono di creare schede con foto di classe, illustrazioni specifiche del brand o opere d\\'arte personalizzate che nessun concorrente pu\u00f2 replicare. Questo \u00e8 particolarmente prezioso per creare prodotti di nicchia rivolti a curricula specifici o temi educativi non coperti dalla libreria integrata.',
    },
    {
      heading: 'Imposta il Layout della Pagina e le Decorazioni',
      content: 'Nella sezione Impostazione Pagina, seleziona il formato della pagina. Le opzioni includono US Letter Verticale, US Letter Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato (milleduecento per milleduecento pixel) e dimensioni personalizzate. US Letter \u00e8 lo standard per gli acquirenti nordamericani. A4 \u00e8 lo standard per i mercati europei e internazionali. Creare entrambe le versioni raddoppia la tua portata di mercato con uno sforzo aggiuntivo minimo.\\n\\nI temi di sfondo e bordo funzionano indipendentemente, ciascuno con il proprio cursore di opacit\u00e0 da zero a uno con incrementi di zero virgola zero cinque. Applica un motivo di sfondo sottile al quindici-venticinque percento di opacit\u00e0 per un calore visivo senza distrarre dal contenuto del puzzle. Sovrapponi un bordo decorativo all\\'ottanta-cento percento di opacit\u00e0 per una cornice rifinita. Combinazioni coerenti di sfondo e bordo in un bundle creano un aspetto di prodotto coeso che gli acquirenti associano alla qualit\u00e0.\\n\\nPersonalizza il testo con sette opzioni di font tra cui Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial e Verdana. Aggiungi un contorno del testo da zero a dieci per uno stile aggiuntivo. Queste opzioni ti permettono di aggiungere titoli personalizzati o branding alle tue schede trova l\\'intruso. Il canvas Fabric.js offre sei opzioni di allineamento pi\u00f9 centra-sulla-pagina, livelli con blocco e sblocco, zoom dal venticinque al trecento percento e annulla/ripristina con venti stati.',
    },
    {
      heading: 'Genera la Scheda Trova l\\'Intruso',
      content: 'Clicca Genera per creare le carte esercizio. Ogni carta mostra quattro immagini in una riga orizzontale \u2014 tre elementi comuni e un elemento intruso con la sua posizione mescolata casualmente. Il mescolamento casuale si ricalcola a ogni generazione, quindi rigenerare con le stesse impostazioni produce posizioni diverse dell\\'intruso.\\n\\nIl layout si adatta automaticamente in base all\\'orientamento della pagina e al numero di esercizi. Le pagine verticali con sette o pi\u00f9 esercizi passano a un layout a due colonne per una spaziatura ottimale. Le pagine orizzontali usano sempre due colonne. Le pagine con cinque-sei esercizi in orientamento verticale usano una singola colonna con carte immagine pi\u00f9 grandi. Questo sistema adattivo assicura schede pulite e leggibili indipendentemente dalla combinazione di numero di esercizi e formato pagina.\\n\\nUn\\'intestazione stilizzata si genera automaticamente in cima alla pagina con la scritta \\\"Trova l\\'Intruso\\\" con un bordo esterno corallo, sezione interna ambra e sfondo turchese. Il titolo appare in font Fredoka teal scuro e le istruzioni in font Quicksand rosso. Il testo dell\\'intestazione si traduce automaticamente in tutte le undici lingue supportate, ma il contenuto del puzzle rimane puramente visivo \u2014 solo immagini, nessun testo specifico per lingua.\\n\\nEsamina l\\'anteprima attentamente: verifica che le immagini siano chiaramente visibili in ogni riga di esercizio, che l\\'intruso sia genuinamente diverso dagli elementi comuni e che il layout complessivo appaia equilibrato. Se qualcosa necessita di aggiustamento, modifica le impostazioni e rigenera istantaneamente.',
    },
    {
      heading: 'Controlla la Chiave di Risposta Auto-Generata',
      content: 'Clicca la scheda Chiave di Risposta per vedere la soluzione auto-generata. La chiave di risposta riproduce l\\'esatto layout della scheda e disegna un contorno cerchio rosso attorno all\\'elemento intruso in ogni riga di esercizio. Lo spessore del tratto del cerchio si adatta dinamicamente alla dimensione dell\\'immagine \u2014 calcolato come il massimo tra la dimensione dell\\'immagine moltiplicata per zero virgola zero quattro o tre pixel \u2014 garantendo visibilit\u00e0 coerente su tutti i formati di pagina dal Quadrato al US Letter Orizzontale.\\n\\nPassa dalla scheda Scheda di Lavoro alla Chiave di Risposta per confrontare e verificare che l\\'elemento corretto sia contrassegnato in ogni riga. La chiave di risposta si genera simultaneamente con la scheda \u2014 nessun passaggio di creazione manuale, nessun processo di design separato, nessuna possibilit\u00e0 di risposte non corrispondenti. Questa generazione simultanea \u00e8 un notevole risparmio di tempo nella creazione di bundle di grandi dimensioni.\\n\\nPer le inserzioni sui marketplace, la chiave di risposta \u00e8 un punto di vendita efficace. I prodotti che includono chiavi di risposta con marcatori visivi chiari vendono costantemente pi\u00f9 delle inserzioni di soli puzzle perch\u00e9 insegnanti e genitori vogliono materiali auto-verificanti. I marcatori cerchio rosso sono immediatamente riconoscibili e rendono la verifica istantanea. Menziona sempre \\\"include chiave di risposta con marcatori cerchio rosso\\\" nei titoli e nelle descrizioni delle tue inserzioni per differenziarti dai concorrenti che vendono puzzle senza soluzioni.',
    },
    {
      heading: 'Scarica Tutti e Quattro i File',
      content: 'Il Generatore Schede Trova l\\'Intruso produce quattro file per sessione: scheda JPEG, scheda PDF, chiave di risposta JPEG e chiave di risposta PDF. Ogni scheda ha la propria coppia di pulsanti di download. Tutti i file vengono renderizzati a trecento DPI per output pronto per la stampa.\\n\\nAttiva la scala di grigi prima del download per versioni a risparmio d\\'inchiostro ideali per la stampa in classe e gli interni Amazon KDP. Le schede trova l\\'intruso in scala di grigi mantengono la chiarezza visiva perch\u00e9 i puzzle si basano sulle differenze di forma e aspetto piuttosto che sul colore, rendendoli particolarmente adatti alla stampa in bianco e nero.\\n\\nPer le inserzioni sui marketplace, esporta sia il PDF (come prodotto consegnabile) che un JPEG (per le immagini di anteprima dell\\'inserzione). Mostra sia la scheda che la chiave di risposta con i marcatori cerchio rosso nelle immagini dell\\'inserzione cos\u00ec gli acquirenti vedano esattamente cosa stanno acquistando.\\n\\nPer costruire un bundle di prodotti completo, cambia temi, regola il numero di esercizi, alterna tra le modalit\u00e0 Identico e Simile o usa gli override per esercizio e rigenera. Ogni generazione produce un nuovo set di quattro file con un nuovo mescolamento casuale delle posizioni dell\\'intruso. Dieci sessioni di generazione ti danno quaranta file pronti per la produzione \u2014 un bundle completo di puzzle trova l\\'intruso pronto per la pubblicazione.\\n\\nImportante: la prova gratuita con filigrana produce esportazioni completamente funzionali con una filigrana sovrapposta. Questo ti permette di valutare la qualit\u00e0 di stampa, verificare la formattazione e creare stampe di prova prima di acquistare una licenza commerciale. La licenza commerciale rimuove la filigrana da tutte le esportazioni, producendo file puliti pronti per la vendita.',
    },
  ],

  platformTips: [
    {
      heading: 'Vendere Schede Trova l\\'Intruso su Etsy',
      content: 'Etsy \u00e8 un marketplace forte per le schede trova l\\'intruso perch\u00e9 genitori e insegnanti cercano tipi specifici di puzzle. Titoli come \\\"Schede Trova l\\'Intruso \u2014 Attivit\u00e0 Trova il Diverso \u2014 Puzzle Discriminazione Visiva \u2014 Con Chiave di Risposta\\\" catturano traffico di ricerca mirato.\\n\\nDai ai tuoi prodotti nomi usando la modalit\u00e0 del puzzle e l\\'abbinamento tematico piuttosto che titoli generici. \\\"Puzzle Trova l\\'Intruso Animali vs Cibo \u2014 20 Schede con Chiavi di Risposta\\\" supera \\\"Trova l\\'Intruso per Bambini\\\" perch\u00e9 corrisponde a query di ricerca specifiche degli acquirenti e comunica esattamente cosa contiene il prodotto.\\n\\nTag: usa tutti i tredici tag di Etsy. Combina termini ampi e specifici: \\\"schede trova l\\'intruso,\\\" \\\"trova il diverso,\\\" \\\"discriminazione visiva,\\\" \\\"puzzle trova la differenza,\\\" \\\"schede pensiero critico,\\\" \\\"puzzle et\u00e0 prescolare,\\\" \\\"puzzle stampabili per bambini,\\\" \\\"attivit\u00e0 classificazione,\\\" e variazioni che corrispondono al tuo abbinamento tematico specifico.\\n\\nImmagini dell\\'inserzione: mostra la scheda completa con le righe di esercizio a quattro immagini, un primo piano dell\\'intestazione stilizzata corallo-ambra-turchese, la chiave di risposta con i marcatori cerchio rosso chiaramente visibili e un mockup della scheda stampata e in uso. Il formato a quattro immagini in riga \u00e8 visivamente distintivo e crea miniature efficaci.\\n\\nPrezzi: set individuali di trova l\\'intruso da dieci a quindici schede con chiavi di risposta si vendono a $2,99\u2013$5,99. Bundle per modalit\u00e0 specifica da venti a trenta schede si vendono a $6,99\u2013$12,99. Collezioni complete con entrambe le modalit\u00e0 su temi multipli si vendono a $14,99\u2013$24,99.',
    },
    {
      heading: 'Vendere Schede Trova l\\'Intruso su Amazon KDP',
      content: 'Amazon KDP serve il mercato dei quaderni di discriminazione visiva. Compila da cinquanta a ottanta schede trova l\\'intruso in un formato di quaderno rilegato con difficolt\u00e0 progressiva strutturata per modalit\u00e0 di generazione.\\n\\nStruttura il tuo quaderno in capitoli per difficolt\u00e0: i capitoli iniziali usano la modalit\u00e0 Identico per sfide semplici di individuare il non-duplicato con cinque-sei esercizi per pagina, i capitoli intermedi usano la modalit\u00e0 Simile con contrasti tematici ovvi come animali contro veicoli con sette-otto esercizi, e i capitoli avanzati usano la modalit\u00e0 Simile con distinzioni tematiche pi\u00f9 sottili come animali della fattoria contro animali dello zoo con nove-dieci esercizi. Includi pagine con chiave di risposta alla fine di ogni capitolo mostrando i marcatori cerchio rosso.\\n\\nTitolo e sottotitolo: esempio di titolo: \\\"Puzzle Trova l\\'Intruso per Bambini.\\\" Esempio di sottotitolo: \\\"80 Schede di Discriminazione Visiva con Chiavi di Risposta per Et\u00e0 3\u20138 \u2014 Trova il Diverso, Individua l\\'Intruso, Sfide Modalit\u00e0 Identico e Simile.\\\"\\n\\nParole chiave: KDP fornisce sette slot per parole chiave. Usa frasi specifiche: \\\"schede trova l\\'intruso,\\\" \\\"quaderno attivit\u00e0 discriminazione visiva,\\\" \\\"puzzle trova il diverso bambini,\\\" \\\"individua l\\'intruso stampabile,\\\" \\\"quaderno pensiero critico et\u00e0 prescolare,\\\" \\\"attivit\u00e0 percezione visiva,\\\" \\\"puzzle classificazione per bambini.\\\"\\n\\nIl formato puramente visivo \u00e8 un grande vantaggio per KDP. Un singolo file interno funziona su ogni marketplace internazionale Amazon senza traduzione. Attiva la scala di grigi per un output a risparmio d\\'inchiostro che stampa in modo pulito in bianco e nero e mantiene bassi i costi di stampa KDP.',
    },
    {
      heading: 'Vendere Schede Trova l\\'Intruso su Teachers Pay Teachers',
      content: 'Teachers Pay Teachers \u00e8 ideale per le schede trova l\\'intruso perch\u00e9 discriminazione visiva e pensiero critico sono competenze trasversali al curriculum. Gli insegnanti di scienze usano i puzzle trova l\\'intruso per riscaldamenti di classificazione. Gli insegnanti di matematica li usano per attivit\u00e0 di riconoscimento di pattern. Gli insegnanti di sostegno li usano per lo sviluppo della percezione visiva.\\n\\nLe descrizioni dei prodotti su TpT dovrebbero includere: fascia d\\'et\u00e0 scolastica, competenze cognitive specifiche esercitate (discriminazione visiva, ragionamento categoriale, pensiero critico), numero di schede, se le chiavi di risposta sono incluse, modalit\u00e0 di generazione usate (Identico, Simile o miste) e abbinamenti tematici coperti. Menziona che le schede includono campi nome e data e numeri degli esercizi per la gestione della classe.\\n\\nFile di anteprima: TpT ti permette di caricare un file di anteprima. Includi da due a tre schede campione trova l\\'intruso che mostrano sia la modalit\u00e0 Identico che Simile, pi\u00f9 una pagina di chiave di risposta con i marcatori cerchio rosso. Mostra l\\'override modalit\u00e0 per esercizio in azione con una scheda a difficolt\u00e0 mista.\\n\\nBundling su TpT: gli insegnanti acquistano bundle per intere unit\u00e0. Un \\\"Bundle Completo Discriminazione Visiva\\\" con schede trova l\\'intruso in entrambe le modalit\u00e0 pi\u00f9 schede di abbinamento ombre e pezzi mancanti d\u00e0 agli insegnanti risorse per molteplici lezioni di percezione visiva. Usa gli override per esercizio per creare versioni differenziate \u2014 esercizi facili in modalit\u00e0 Identico per studenti in difficolt\u00e0 che passano a esercizi pi\u00f9 difficili in modalit\u00e0 Simile per studenti avanzati sulla stessa pagina.\\n\\nParole chiave specifiche per TpT: \\\"attivit\u00e0 trova l\\'intruso,\\\" \\\"scheda trova il diverso,\\\" \\\"discriminazione visiva,\\\" \\\"puzzle pensiero critico,\\\" \\\"puzzle lavoro del mattino,\\\" \\\"attivit\u00e0 per chi finisce prima,\\\" \\\"riscaldamento classificazione.\\\" Questi termini corrispondono a come gli insegnanti cercano risorse di percezione visiva.',
    },
  ],

  monetization: [
    {
      heading: 'Stabilire i Prezzi per i Prodotti Trova l\\'Intruso',
      content: 'I prezzi delle schede trova l\\'intruso seguono schemi prevedibili attraverso i marketplace. Ecco le fasce che funzionano bene:\\n\\nSet a modalit\u00e0 singola da dieci a quindici schede con chiavi di risposta: $2,99\u2013$5,99. Questi servono come prodotti di ingresso. Ogni set si concentra su una modalit\u00e0 di generazione e uno-due abbinamenti tematici, come puzzle trova l\\'intruso in modalit\u00e0 Identico con animali o puzzle in modalit\u00e0 Simile animali contro cibo.\\n\\nBundle a doppia modalit\u00e0 da venti a trenta schede che coprono sia la modalit\u00e0 Identico che Simile su tre-quattro abbinamenti tematici: $6,99\u2013$12,99. Gli acquirenti percepiscono un forte valore perch\u00e9 ottengono due tipi di attivit\u00e0 distinti con chiavi di risposta per ogni scheda.\\n\\nCollezioni complete da quaranta a sessanta schede che coprono entrambe le modalit\u00e0, abbinamenti tematici multipli e difficolt\u00e0 progressiva usando gli override per esercizio: $14,99\u2013$24,99. Posiziona questi come librerie complete di discriminazione visiva per un intero anno scolastico.\\n\\nNon svalutare il mercato. Le schede trova l\\'intruso con chiavi di risposta auto-generate con marcatori cerchio rosso sono un prodotto premium. Le due modalit\u00e0 di generazione e il sistema di override per esercizio creano variet\u00e0 genuina che i concorrenti con strumenti pi\u00f9 semplici non possono replicare. Prezza di conseguenza.',
    },
    {
      heading: 'Strategie di Bundling per le Schede Trova l\\'Intruso',
      content: 'I bundle sono dove il fatturato si moltiplica per i prodotti trova l\\'intruso. Il sistema a doppia modalit\u00e0 crea opportunit\u00e0 di bundling naturali che moltiplicano la variet\u00e0 del prodotto.\\n\\nBundle per modalit\u00e0 specifica: raggruppa da quindici a venti schede per modalit\u00e0 di generazione. \\\"Trova l\\'Intruso Modalit\u00e0 Identico \u2014 Puzzle Individua il Non-Duplicato\\\" e \\\"Trova l\\'Intruso Modalit\u00e0 Simile \u2014 Puzzle Discriminazione Cross-Tema\\\" targettizzano esigenze diverse degli acquirenti con posizionamento di prodotto chiaro.\\n\\nBundle con progressione di difficolt\u00e0: combina schede in modalit\u00e0 Identico con cinque esercizi, schede in modalit\u00e0 Simile con otto esercizi e pagine a difficolt\u00e0 progressiva con modalit\u00e0 miste e dieci esercizi. Commercializza questi come \\\"set completi di discriminazione visiva\\\" che crescono con il bambino dall\\'et\u00e0 prescolare alla scuola elementare.\\n\\nBundle per abbinamento tematico: compila schede trova l\\'intruso per combinazione di categorie. La \\\"Collezione Animali\\\" include animali contro cibo, animali contro veicoli, fattoria contro selvaggi e animali domestici contro zoo. Ogni abbinamento tematico produce sfide di discriminazione uniche.\\n\\nBundle globali: poich\u00e9 le schede trova l\\'intruso sono puramente visive senza testo specifico per lingua nell\\'output, ogni scheda si vende identicamente in tutto il mondo. Crea un bundle e pubblicalo su pi\u00f9 marketplace internazionali senza traduzione.\\n\\nPubblica sempre sia set individuali che bundle. Le inserzioni individuali catturano combinazioni specifiche di parole chiave mentre i bundle generano fatturato pi\u00f9 alto per transazione.',
    },
    {
      heading: 'Vendite Globali Senza Traduzione',
      content: 'Il formato puramente visivo delle schede trova l\\'intruso crea un vantaggio competitivo significativo che la maggior parte dei venditori ignora. Ogni scheda che crei contiene solo immagini \u2014 quattro figure per riga senza testo specifico per lingua nel contenuto del puzzle. L\\'intestazione auto-generata si traduce in tutte le undici lingue supportate, ma gli esercizi sono universalmente leggibili.\\n\\nQuesto significa che una singola sessione di creazione produce un prodotto vendibile globalmente. Lo stesso file PDF funziona per acquirenti anglofoni negli Stati Uniti, acquirenti germanofoni in Europa, acquirenti giapponesi in Asia e ogni altro mercato. Nessuna versione linguistica separata, nessun costo di traduzione, nessuna manutenzione per lingua.\\n\\nPer sfruttare questo vantaggio: pubblica gli stessi prodotti trova l\\'intruso su negozi Etsy che targettizzano paesi diversi. Traduci solo i titoli e le descrizioni delle inserzioni (non il prodotto stesso) per corrispondere ai termini di ricerca locali. Pubblica gli stessi interni KDP su tutti i marketplace internazionali Amazon. Pubblica su TpT per insegnanti internazionali che cercano attivit\u00e0 indipendenti dalla lingua.\\n\\nMentre i concorrenti che creano schede con molto testo devono produrre versioni separate per ogni mercato linguistico, i tuoi puzzle visivi servono ogni acquirente da un singolo set di file. Questo riduce drasticamente il tempo di produzione per mercato e ti permette di espanderti a livello internazionale con zero sforzo aggiuntivo di creazione.',
    },
  ],

  examples: [
    {
      heading: 'Variazioni di Prodotto per Modalit\u00e0 e Numero di Esercizi',
      content: 'Ecco esempi concreti di prodotto che puoi creare con il Generatore Schede Trova l\\'Intruso, organizzati per modalit\u00e0 di generazione e numero di esercizi.\\n\\nLivello et\u00e0 prescolare \u2014 modalit\u00e0 Identico con cinque esercizi: usa un tema alla volta con immagini altamente riconoscibili. Tre gatti identici e un cane, tre mele identiche e un\\'auto. Cinque esercizi per pagina con carte immagine grandi danno ai bambini piccoli ampio spazio visivo per identificare il non-duplicato. Il layout a singola colonna su pagine verticali crea schede chiare e ordinate. Confeziona da otto a dieci schede per set con chiavi di risposta incluse.\\n\\nLivello scuola dell\\'infanzia \u2014 modalit\u00e0 Simile con sei-sette esercizi: usa abbinamenti tematici ovvi come animali contro veicoli o cibo contro utensili. Tre animali e un veicolo per riga crea una sfida di ragionamento categoriale accessibile per bambini di cinque-sei anni. Sei-sette esercizi aumentano la densit\u00e0 del contenuto mantenendo dimensioni delle immagini confortevoli. Confeziona da dodici a quindici schede per set con abbinamenti tematici progressivi.\\n\\nLivello scuola elementare \u2014 modalit\u00e0 mista con otto-dieci esercizi: usa gli override per esercizio per iniziare con tre righe in modalit\u00e0 Identico come riscaldamento, poi passa a cinque-sette righe in modalit\u00e0 Simile con abbinamenti tematici pi\u00f9 sottili come animali della fattoria contro animali dello zoo o frutta contro verdura. Otto-dieci esercizi su pagine verticali attivano il layout a due colonne per massima densit\u00e0 di contenuto. Confeziona da quindici a venti schede a difficolt\u00e0 mista per set, commercializzate come sfide progressive di discriminazione visiva.',
    },
    {
      heading: 'Progettazione di Schede a Difficolt\u00e0 Progressiva',
      content: 'Il sistema di override modalit\u00e0 per esercizio consente la difficolt\u00e0 progressiva all\\'interno di una singola scheda \u2014 un approccio di progettazione del prodotto che giustifica prezzi premium perch\u00e9 serve livelli multipli di abilit\u00e0 su una sola pagina.\\n\\nSchema di progettazione uno \u2014 dal riscaldamento alla sfida: imposta la modalit\u00e0 globale su Identico, poi sovrascrivi gli ultimi tre esercizi a Simile. Gli esercizi da uno a quattro presentano puzzle di individuazione del non-duplicato che costruiscono sicurezza. Gli esercizi da cinque a sette passano alla discriminazione categoriale cross-tema che richiede un ragionamento pi\u00f9 profondo. Etichetta questi prodotti come \\\"con supporto guidato\\\" o \\\"a difficolt\u00e0 progressiva\\\" nelle tue inserzioni.\\n\\nSchema di progettazione due \u2014 modalit\u00e0 alternata: alterna esercizi Identico e Simile lungo tutta la scheda. L\\'esercizio uno \u00e8 Identico, l\\'esercizio due \u00e8 Simile, l\\'esercizio tre \u00e8 Identico e cos\u00ec via. Questo mantiene gli studenti mentalmente flessibili cambiando costantemente tra abbinamento visivo e ragionamento categoriale. Commercializza queste come schede \\\"a sfida mista.\\\"\\n\\nSchema di progettazione tre \u2014 progressione tematica: usa la modalit\u00e0 Simile per tutta la scheda ma aumenta la somiglianza tematica attraverso gli esercizi. Inizia con abbinamenti ovvi (animali contro veicoli) e progredisci verso abbinamenti sottili (animali della fattoria contro animali dello zoo). Ogni esercizio all\\'interno di una singola scheda diventa progressivamente pi\u00f9 difficile mantenendo lo stesso formato.\\n\\nQueste progettazioni progressive sono difficili da creare manualmente ma senza sforzo con il sistema di override per esercizio. Questa differenziazione integrata \u00e8 un vero valore aggiunto che giustifica prezzi pi\u00f9 alti rispetto alle schede di puzzle a modalit\u00e0 singola.',
    },
  ],

  faq: [
    {
      question: 'Quali sono le due modalit\u00e0 di generazione nel Generatore Schede Trova l\\'Intruso?',
      answer: 'Il generatore offre la modalit\u00e0 Identico e la modalit\u00e0 Simile. La modalit\u00e0 Identico posiziona tre cloni della stessa identica immagine accanto a un\\'immagine diversa dello stesso tema \u2014 gli studenti individuano il non-duplicato confrontando dettagli visivi. La modalit\u00e0 Simile preleva tre immagini dal Tema A e un\\'immagine dal Tema B \u2014 gli studenti identificano l\\'intruso tematico riconoscendo differenze categoriali. Ogni modalit\u00e0 crea una sfida cognitiva fondamentalmente diversa. Puoi sovrascrivere la modalit\u00e0 per esercizio usando il selettore a discesa di ogni riga per mescolare entrambe le modalit\u00e0 su una singola scheda.',
    },
    {
      question: 'Come funziona l\\'override modalit\u00e0 per esercizio?',
      answer: 'Ogni riga di esercizio include il proprio selettore a discesa della modalit\u00e0, permettendoti di sovrascrivere la modalit\u00e0 globale per ogni singolo esercizio. Imposta la modalit\u00e0 globale su Identico, poi passa singoli esercizi a Simile \u2014 o viceversa. Questo crea schede a difficolt\u00e0 mista dove alcuni esercizi sono pi\u00f9 facili (Identico) e altri pi\u00f9 difficili (Simile) sulla stessa pagina. Il pulsante \\\"Cancella Selezioni\\\" reimposta tutti gli override per esercizio alla modalit\u00e0 globale.',
    },
    {
      question: 'Quanti esercizi posso includere in ogni scheda?',
      answer: 'Ogni scheda supporta da cinque a dieci esercizi, con il valore predefinito impostato a sei. Ogni esercizio contiene sempre esattamente quattro immagini \u2014 tre elementi comuni e un elemento intruso con la posizione dell\\'intruso mescolata casualmente. Il layout si adatta automaticamente: le pagine verticali con sette o pi\u00f9 esercizi passano a un layout a due colonne, e le pagine orizzontali usano sempre due colonne. Meno esercizi creano carte immagine pi\u00f9 grandi per i bambini pi\u00f9 piccoli; pi\u00f9 esercizi aumentano la densit\u00e0 del contenuto per studenti pi\u00f9 grandi.',
    },
    {
      question: 'Come funziona la chiave di risposta auto-generata con cerchi rossi?',
      answer: 'Il sistema a doppio canvas genera sia la scheda che la chiave di risposta simultaneamente. La chiave di risposta riproduce l\\'esatto layout della scheda e disegna un contorno cerchio rosso attorno all\\'elemento intruso in ogni riga di esercizio. Lo spessore del tratto del cerchio si adatta dinamicamente alla dimensione dell\\'immagine \u2014 calcolato come il massimo tra la dimensione dell\\'immagine moltiplicata per zero virgola zero quattro o tre pixel \u2014 garantendo visibilit\u00e0 coerente su tutti i formati di pagina. Ottieni quattro file di download per sessione: scheda JPEG, scheda PDF, chiave di risposta JPEG e chiave di risposta PDF.',
    },
    {
      question: 'Le schede trova l\\'intruso sono sensibili alla lingua?',
      answer: 'No. Trova l\\'intruso \u00e8 un formato di puzzle puramente visivo \u2014 nessun testo appare nel contenuto della scheda. Le quattro immagini per riga, il layout degli esercizi e i marcatori cerchio rosso nella chiave di risposta sono tutti universali. L\\'unico elemento dipendente dalla lingua \u00e8 il testo dell\\'intestazione auto-generata, che si traduce in tutte le undici lingue supportate. Questo rende le schede trova l\\'intruso vendibili universalmente su tutti i mercati senza traduzione.',
    },
    {
      question: 'Posso vendere le schede trova l\\'intruso su Etsy e Amazon KDP?',
      answer: 'S\u00ec. Una licenza commerciale ti d\u00e0 pieni diritti per vendere le schede trova l\\'intruso generate su qualsiasi piattaforma inclusi Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad e il tuo sito web. Non ci sono royalty o costi per vendita. Mantieni il cento percento del tuo fatturato di vendita al netto delle commissioni del marketplace.',
    },
    {
      question: 'Qual \u00e8 la politica di rimborso per le licenze commerciali?',
      answer: 'Ogni generatore offre una prova gratuita con filigrana cos\u00ec puoi testare tutte le funzionalit\u00e0, creare schede trova l\\'intruso campione in entrambe le modalit\u00e0 di generazione, sperimentare con gli override per esercizio e valutare la qualit\u00e0 dell\\'output prima dell\\'acquisto. Poich\u00e9 puoi valutare completamente il prodotto prima di comprare, non offriamo rimborsi. Questa \u00e8 la prassi standard per strumenti di prodotti digitali dove il prodotto completo pu\u00f2 essere visionato prima dell\\'acquisto.',
    },
  ],

  nextSteps: [
    {
      slug: 'creare-schede-discriminazione-visiva',
      title: 'Creare Schede di Discriminazione Visiva',
      description: 'Un complemento di percezione visiva al trova l\\'intruso. Le schede di abbinamento ombre sviluppano competenze di riconoscimento delle sagome, completando il focus sulla discriminazione visiva dei puzzle trova l\\'intruso.',
    },
    {
      slug: 'creare-puzzle-pezzi-mancanti',
      title: 'Creare Puzzle Pezzi Mancanti',
      description: 'Un altro formato di discriminazione visiva. I puzzle di pezzi mancanti sfidano gli studenti a trovare ci\u00f2 che manca da un\\'immagine, esercitando competenze di osservazione correlate.',
    },
    {
      slug: 'creare-schede-classificazione',
      title: 'Creare Schede di Classificazione per Categorie',
      description: 'Un complemento di classificazione al trova l\\'intruso. Le schede di classificazione chiedono agli studenti di categorizzare le immagini in gruppi, rinforzando le stesse competenze di ragionamento categoriale usate nella modalit\u00e0 Simile.',
    },
  ],

  internalLinks: [
    { pageType: 'start', slug: 'guida-completa-attivita-stampabili', anchorText: 'Guida Completa per Avviare un\\'Attivit\u00e0 di Stampabili' },
    { pageType: 'start', slug: 'creare-schede-che-vendono', anchorText: 'Come Creare Schede Professionali che Vendono' },
    { pageType: 'start', slug: 'attivita-stampabili-etsy', anchorText: 'Masterclass Attivit\u00e0 Stampabili su Etsy' },
    { pageType: 'start', slug: 'libri-attivita-amazon-kdp', anchorText: 'Guida Libri di Attivit\u00e0 Amazon KDP' },
    { pageType: 'start', slug: 'guida-licenza-commerciale', anchorText: 'Guida alla Licenza Commerciale' },
    { pageType: 'app', slug: 'trova-intruso-schede', anchorText: 'Generatore Schede Trova l\\'Intruso \u2014 Dettagli Completi' },
    { pageType: 'app', slug: 'abbinamento-ombre-schede', anchorText: 'Generatore Schede Abbinamento Ombre \u2014 Dettagli Completi' },
    { pageType: 'tool', slug: 'generatore-schede-intruso', anchorText: 'Prova il Generatore Schede Trova l\\'Intruso' },
  ],

  toolsRecommended: [
    {
      appId: 'odd-one-out',
      title: 'Generatore Schede Trova l\\'Intruso',
      description: 'Lo strumento principale per questa guida. Crea schede trova l\\'intruso a doppia modalit\u00e0 con generazione Identico e Simile, override per esercizio per difficolt\u00e0 mista e chiavi di risposta auto-generate con marcatori cerchio rosso dimensionati rispetto all\\'immagine.',
    },
    {
      appId: 'shadow-match',
      title: 'Generatore Schede Discriminazione Visiva',
      description: 'Un complemento di percezione visiva che crea attivit\u00e0 di abbinamento sagome. L\\'abbinamento ombre targettizza competenze cognitive correlate e si abbina naturalmente ai puzzle trova l\\'intruso per linee di prodotti complete di discriminazione visiva.',
    },
    {
      appId: 'missing-pieces',
      title: 'Generatore Schede Pezzi Mancanti',
      description: 'Un cugino della discriminazione visiva dove gli studenti trovano parti mancanti delle immagini. Gli esercizi di pezzi mancanti sviluppano competenze di osservazione simili e si abbinano bene ai puzzle trova l\\'intruso in bundle di percezione visiva.',
    },
    {
      appId: 'picture-sort',
      title: 'Generatore Schede Classificazione Immagini',
      description: 'Un complemento di classificazione che crea attivit\u00e0 di ordinamento a due categorie. La classificazione per categoria si collega direttamente alla discriminazione basata sul tema della modalit\u00e0 Simile, rendendo schede di classificazione e trova l\\'intruso partner di bundling naturali.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/english/odd one out/Find the Odd One Out (1).webp', alt: 'Scheda trova l\\'intruso con quattro immagini per riga di esercizio mostrando tre elementi comuni e un intruso con intestazione corallo-ambra-turchese' },
    samples: [
      { src: '/samples/english/odd one out/Find the Odd One Out (1).webp', alt: 'Scheda trova l\\'intruso che mostra carte esercizio con quattro immagini per riga e intestazione stilizzata Trova l\\'Intruso', caption: 'Scheda trova l\\'intruso con righe di esercizio a quattro immagini e layout a colonne adattivo' },
      { src: '/samples/english/odd one out/Find the Odd One Out answer-key.webp', alt: 'Chiave di risposta auto-generata con contorni cerchio rosso attorno all\\'elemento intruso in ogni riga di esercizio', caption: 'Chiave di risposta auto-generata con marcatori cerchio rosso che identificano l\\'intruso in ogni riga' },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Come Creare Puzzle Trova l\\'Intruso \u2014 Tutorial Completo',
  },

  themeImages: [
    { src: '/image-library/vegetables/asparagus.webp', alt: 'Asparago \u2014 immagine educativa tematica', caption: 'Asparago' },
    { src: '/image-library/vegetables/beetroot.webp', alt: 'Barbabietola \u2014 immagine educativa tematica', caption: 'Barbabietola' },
    { src: '/image-library/vegetables/bell%20pepper.webp', alt: 'Peperone \u2014 immagine educativa tematica', caption: 'Peperone' },
    { src: '/image-library/vegetables/broccoli.webp', alt: 'Broccoli \u2014 immagine educativa tematica', caption: 'Broccoli' },
    { src: '/image-library/vegetables/cabbage.webp', alt: 'Cavolo \u2014 immagine educativa tematica', caption: 'Cavolo' },
  ],
};

export default content;
`;

const outPath = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'it', 'create-odd-one-out-puzzles.ts');
fs.writeFileSync(outPath, content, 'utf8');
console.log('Written to:', outPath);

// Verify no \uXXXX escapes
const written = fs.readFileSync(outPath, 'utf8');
const escapeMatches = written.match(/\\u[0-9a-fA-F]{4}/g);
if (escapeMatches) {
  console.error('ERROR: Found \\uXXXX escapes:', [...new Set(escapeMatches)]);
  process.exit(1);
} else {
  console.log('OK: No \\uXXXX escapes found');
}

// Check titleTag length
const titleMatch = written.match(/titleTag:\s*'([^']+)'/);
if (titleMatch) {
  console.log(`titleTag: "${titleMatch[1]}" (${titleMatch[1].length} chars, max 60)`);
}

// Check metaDescription length
const metaMatch = written.match(/metaDescription:\s*'([^']+)'/);
if (metaMatch) {
  console.log(`metaDescription: "${metaMatch[1]}" (${metaMatch[1].length} chars, target 150-160)`);
}

// Check refund FAQ
if (written.includes('non offriamo rimborsi')) {
  console.log('OK: Refund policy present with "non offriamo rimborsi"');
} else {
  console.error('ERROR: Missing refund policy');
}

// Check image paths
const requiredPaths = [
  '/samples/english/odd one out/Find the Odd One Out (1).webp',
  '/samples/english/odd one out/Find the Odd One Out answer-key.webp',
  '/image-library/vegetables/asparagus.webp',
];
for (const p of requiredPaths) {
  if (written.includes(p)) {
    console.log(`OK: Found path ${p}`);
  } else {
    console.error(`ERROR: Missing path ${p}`);
  }
}

// Check youtubeId
if (written.includes("youtubeId: '0R6WFUfY7Mk'")) {
  console.log('OK: youtubeId correct');
} else {
  console.error('ERROR: youtubeId missing or wrong');
}

console.log('Done.');
