/* =====================================================================
   SPROCKET'S CLOCK — READ ANALOG → DIGITAL — ACTIVITY SKIN  (clock-digital-activity.js)
   ---------------------------------------------------------------------
   1.MD.B.3 (+2.MD.C.7 / 3.MD.A.1 by granularity) · read the analog clock, tap
   the matching DIGITAL time. The lcs-shell skin over clock-digital-core.js.
   answerType:'state'. EN-ONLY pilot (404 non-EN). The TIME-EXPANSION engine —
   reused by the reading + matching granularity variants. 0 lines to any core /
   lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ClockDigitalCore;
  var NS = 'http://www.w3.org/2000/svg';
  var C = { FACE: '#FFFDF6', RIM: '#146B5E', TICK: '#0F4A40', HOUR: '#146B5E', MIN: '#F2784B', NUM: '#0F4A40' };

  var L = {
    en: {
      q: 'What time is it?',
      qMatch: 'Which clock shows this time?',
      win: 'That\'s right — it\'s {t}.',
      hint: 'Look where the short hand points — that is the hour.',
      hintMatch: 'Check the short hand first — it should be at the hour number or just past it, then check the long hand.',
      hintFive: 'Start at the 12 and count on in fives — 5, 10, 15 — until you reach the long hand.',
      hintMinute: 'Count in fives to the last long mark the hand has passed, then count on one for each small mark.',
      instructionMatch: 'Read the time, then tap the clock that matches.',
      hintHalf: 'The long hand at the 6 is half way round — that is 30 minutes. The short hand is half way too, so the hour is the number behind it.',
      hintQuarter: 'The long hand at the 3 is 15 minutes, and at the 9 it is 45 — and the hour is still the number the short hand has passed.',
      markOne: 'one mark',
      markMany: '{n} marks',
      srReadOnHour: ' The short hand is on the {hh} and the long hand is on the 12.',
      srReadBetween: ' The short hand is between the {hh} and the {hn}. The long hand is on the {mk}.',
      srReadOffMark: ' The short hand is between the {hh} and the {hn}. The long hand is {nt} past the {mk}.',
      srChoices: ' The choices are: {ds}.',
      srMatchHead: ' The time is {t}. Here are the clocks, in order.',
      srItemOnHour: 'Clock {i}: short hand on the {hh}, long hand on the 12',
      srItemBetween: 'Clock {i}: short hand between the {hh} and the {hn}, long hand on the {mk}',
      srItemOffMark: 'Clock {i}: short hand between the {hh} and the {hn}, long hand {nt} past the {mk}',
      srJoin: '; '
    },
    de: {
      q: 'Wie spät ist es?',
      qMatch: 'Welche Uhr zeigt diese Uhrzeit?',
      win: 'Genau! Es ist {t}.',
      hint: 'Schau, wo der kleine Zeiger steht – er zeigt die Stunde.',
      hintMatch: 'Prüfe zuerst den kleinen Zeiger – er steht bei der ersten Zahl. Dann schau, wohin der große Zeiger zeigt.',
      hintFive: 'Zähl von der 12 aus in Fünferschritten weiter – jede große Zahl ist fünf Minuten mehr.',
      hintMinute: 'Zähl vom letzten langen Strich in Einerschritten weiter – jeder kleine Strich ist eine Minute.',
      srReadOnHour: 'Der kleine Zeiger steht auf der {hh}, der große Zeiger auf der 12.',
      srReadBetween: 'Der kleine Zeiger steht zwischen der {hh} und der {hn}, der große Zeiger auf der {mk}.',
      srReadOffMark: 'Der kleine Zeiger steht zwischen der {hh} und der {hn}, der große Zeiger {nt} nach der {mk}.',
      srChoices: 'Zur Auswahl: {ds}.',
      srItemOnHour: 'Uhr Nummer {i}: kleiner Zeiger auf der {hh}, großer Zeiger auf der 12',
      srItemBetween: 'Uhr Nummer {i}: kleiner Zeiger zwischen der {hh} und der {hn}, großer Zeiger auf der {mk}',
      srItemOffMark: 'Uhr Nummer {i}: kleiner Zeiger zwischen der {hh} und der {hn}, großer Zeiger {nt} nach der {mk}',
      srMatchHead: 'Gesucht ist die Uhrzeit {t}. Zur Auswahl:',
      srJoin: '; ',
      markOne: 'einen Strich',
      markMany: '{n} Striche',
      instructionMatch: 'Lies die Uhrzeit und tippe dann auf die passende Uhr.',
      hintHalf: 'Der große Zeiger steht auf der 6 – wir sagen dann „halb“ und die nächste Zahl, aber die Ziffern beginnen mit der kleineren.',
      hintQuarter: 'Ein Viertel sind 15 Minuten – der große Zeiger steht auf der 3 oder auf der 9. Bei „Viertel vor“ beginnen die Ziffern mit der kleineren Zahl.'
    },
    /* FR — native ensemble (linguiste + pédagogue CE1). « horloge à aiguilles » /
       petite (heures) + grande (minutes) aiguille / « l'heure pile » / « et demie ». */
    fr: {
      q: 'Quelle heure est-il ?',
      qMatch: 'Quelle horloge montre cette heure ?',
      win: 'C\'est ça ! Il est {t}.',
      hint: 'Regarde la petite aiguille : elle indique l\'heure.',
      hintMatch: 'Commence par la petite aiguille : elle est sur le nombre écrit avant le h, ou un peu après. Vérifie ensuite la grande aiguille.',
      hintFive: 'Compte de 5 en 5 sur les nombres du cadran : la grande aiguille indique les minutes.',
      hintMinute: 'Compte les traits autour du cadran : chacun vaut une minute.',
      srReadOnHour: 'Sur le cadran, la petite aiguille est sur le {hh} et la grande aiguille est sur le 12.',
      srReadBetween: 'Sur le cadran, la petite aiguille est entre le {hh} et le {hn}, et la grande aiguille est sur le {mk}.',
      srReadOffMark: 'Sur le cadran, la petite aiguille est entre le {hh} et le {hn}, et la grande aiguille est {nt} après le {mk}.',
      srChoices: 'Les choix sont : {ds}.',
      srItemOnHour: 'Horloge {i} : petite aiguille sur le {hh}, grande aiguille sur le 12',
      srItemBetween: 'Horloge {i} : petite aiguille entre le {hh} et le {hn}, grande aiguille sur le {mk}',
      srItemOffMark: 'Horloge {i} : petite aiguille entre le {hh} et le {hn}, grande aiguille {nt} après le {mk}',
      srMatchHead: ' Il est {t}. Voici les horloges proposées :',
      srJoin: ' ; ',
      markOne: 'un trait',
      markMany: '{n} traits',
      instructionMatch: 'Lis l\'heure écrite en chiffres, puis touche l\'horloge qui la montre.',
      hintHalf: 'Quand la grande aiguille est sur le 6, c\'est la demie : 30 minutes. La petite aiguille est alors entre deux nombres : garde celui qu\'elle vient de dépasser.',
      hintQuarter: 'Quand la grande aiguille est sur le 3, c\'est 15 minutes ; sur le 9, c\'est 45 minutes. La petite aiguille est alors entre deux nombres : garde celui qu\'elle vient de dépasser, même si elle en est déjà loin.'
    },
    /* es-MX — native ensemble (lingüista + pedagoga de primaria). "reloj de manecillas";
       "manecilla corta (la hora) / larga (los minutos)". {t} = frase autónoma capitalizada
       de spoken() (empieza oración). Tono cálido, sin marcador; "Casi/Fíjate", nunca "mal". */
    es: {
      q: '¿Qué hora es?',
      qMatch: '¿Cuál reloj marca esta hora?',
      win: '¡Sí, {t}!',
      hint: 'Fíjate a qué número apunta la manecilla corta: ese número es la hora.',
      hintMatch: 'Busca primero los relojes donde la manecilla corta marca esa hora; luego compara la larga.',
      hintFive: 'Cuenta de 5 en 5 desde el 12: la manecilla larga marca los minutos.',
      hintMinute: 'Cuenta de 5 en 5 hasta el último número y luego las rayitas que faltan.',
      srReadOnHour: 'En este reloj la manecilla corta está en el {hh} y la manecilla larga está en el 12.',
      srReadBetween: 'En este reloj la manecilla corta está entre el {hh} y el {hn} y la manecilla larga está en el {mk}.',
      srReadOffMark: 'En este reloj la manecilla corta está entre el {hh} y el {hn} y la manecilla larga está {nt} después del {mk}.',
      srChoices: 'Las opciones son: {ds}.',
      srItemOnHour: 'reloj {i}, con la manecilla corta en el {hh} y la larga en el 12',
      srItemBetween: 'reloj {i}, con la manecilla corta entre el {hh} y el {hn} y la larga en el {mk}',
      srItemOffMark: 'reloj {i}, con la manecilla corta entre el {hh} y el {hn} y la larga {nt} después del {mk}',
      srMatchHead: 'Busca esta hora: {t}.',
      srJoin: '; ',
      markOne: 'una rayita',
      markMany: '{n} rayitas',
      instructionMatch: 'Lee la hora en números y luego toca el reloj que la marca.',
      hintHalf: 'La manecilla larga en el 6 quiere decir y media. La corta queda entre dos números: fíjate en el que ya pasó, no en el que sigue.',
      hintQuarter: 'La manecilla larga en el 3 es y cuarto; en el 9 falta un cuarto para la hora que sigue. Pero fíjate: la corta todavía no llega a ese número.'
    },
    /* pt-BR — native ensemble. "relógio de ponteiros"; ponteiro pequeno (horas) / grande (minutos).
       Só horas + meia hora no #8; hintFive/hintMinute só disparam nas variantes de 2º/3º (en+fr). */
    pt: {
      q: 'Que horas são?',
      qMatch: 'Qual relógio marca esta hora?',
      win: 'Isso! {t}.',
      hint: 'Veja o ponteiro curto — a hora é o número que ele já passou.',
      hintMatch: 'Comece pelo ponteiro curto: ele fica no primeiro número da hora ou logo depois dele. Só então confira o ponteiro grande.',
      hintFive: 'Conte de 5 em 5 a partir do 12 — o ponteiro grande indica os minutos.',
      hintMinute: 'Conte de 5 em 5 até o número mais próximo e depois conte os risquinhos — cada um é um minuto.',
      srReadOnHour: ' O ponteiro curto está no {hh} e o ponteiro grande está no 12.',
      srReadBetween: ' O ponteiro curto está entre o {hh} e o {hn}, e o ponteiro grande está no {mk}.',
      srReadOffMark: ' O ponteiro curto está entre o {hh} e o {hn}, e o ponteiro grande está {nt} depois do {mk}.',
      srChoices: ' As opções são: {ds}.',
      srItemOnHour: 'relógio {i}: ponteiro curto no {hh} e ponteiro grande no 12',
      srItemBetween: 'relógio {i}: ponteiro curto entre o {hh} e o {hn} e ponteiro grande no {mk}',
      srItemOffMark: 'relógio {i}: ponteiro curto entre o {hh} e o {hn} e ponteiro grande {nt} depois do {mk}',
      srMatchHead: ' A hora escrita é {t}. As opções são:',
      srJoin: '; ',
      markOne: 'um risquinho',
      markMany: '{n} risquinhos',
      instructionMatch: 'Leia a hora em números e depois toque no relógio que corresponde.',
      hintHalf: 'Na meia hora o ponteiro grande está no 6 e o ponteiro curto fica no meio do caminho — a hora é o número que ele já passou, não o que está à frente.',
      hintQuarter: 'No quarto de hora o ponteiro grande está no 3 ou no 9 — são 15 minutos ou 45 minutos.'
    },
    /* it — native ensemble (linguist + classe prima/seconda pedagogue). "orologio a lancette";
       lancetta corta (delle ore) / lancetta lunga (dei minuti). Romance current-hour + half in
       spoken(): "in punto" / "e mezza" (see the it branch). srReadBody restructured (pt/es shape)
       since {t} is a full capitalized sentence. Data-nucleo strand (Relazioni, dati e previsioni). */
    it: {
      q: 'Che ore sono?',
      qMatch: 'Quale orologio segna questo orario?',
      win: 'Sì! {t}.',
      hint: 'Guarda dove punta la lancetta corta: quel numero è l\'ora.',
      hintMatch: 'Guarda prima le lancette corte: tieni gli orologi con l\'ora giusta, poi confronta quelle lunghe.',
      hintFive: 'Conta di cinque in cinque partendo dal 12: ogni numero vale cinque minuti.',
      hintMinute: 'Conta di cinque in cinque fino al numero prima della lancetta lunga, poi conta le tacche piccole una alla volta.',
      srReadOnHour: ' La lancetta corta punta esattamente sul numero {hh}. La lancetta lunga punta sul numero 12.',
      srReadBetween: ' La lancetta corta è tra i numeri {hh} e {hn}. La lancetta lunga punta sul numero {mk}.',
      srReadOffMark: ' La lancetta corta è tra i numeri {hh} e {hn}. La lancetta lunga si trova {nt} dopo il numero {mk}.',
      srChoices: ' Le scelte sono: {ds}.',
      srItemOnHour: 'orologio {i}: lancetta corta esattamente sul numero {hh}, lancetta lunga sul numero 12',
      srItemBetween: 'orologio {i}: lancetta corta tra i numeri {hh} e {hn}, lancetta lunga sul numero {mk}',
      srItemOffMark: 'orologio {i}: lancetta corta tra i numeri {hh} e {hn}, lancetta lunga {nt} dopo il numero {mk}',
      srMatchHead: ' L\'ora da trovare: {t}. Ecco le lancette di ogni orologio:',
      srJoin: '; ',
      markOne: 'una tacca',
      markMany: '{n} tacche',
      instructionMatch: 'Leggi l\'ora scritta in numeri, poi tocca l\'orologio giusto.',
      hintHalf: 'La lancetta lunga sul 6 vuol dire trenta minuti: la corta è a metà strada, e l\'ora è il numero che ha già passato.',
      hintQuarter: 'Sul 3 sono quindici minuti, sul 9 quarantacinque: anche se diciamo «meno un quarto», l\'ora è il numero che la lancetta corta ha già passato.'
    },
    /* nl — native ensemble (linguïst + pedagoog groep 3/4 klokkijken). "de grote wijzer"
       (minuten, lang) / "de kleine wijzer" (uren, kort). spoken() spelt het uur als WOORD
       zodat "half vier" (=3:30, halverwege naar het volgende uur) niet terugvalt op cijfer-
       matchen; "één" met accenten. Digitale tegels houden de dubbele punt "3:30". */
    nl: {
      q: 'Hoe laat is het?',
      qMatch: 'Welke klok laat deze tijd zien?',
      win: 'Ja! De klok staat op {t}.',
      hint: 'Kijk naar de kleine wijzer — het getal dat hij al voorbij is, is het uur.',
      hintMatch: 'Kijk eerst naar de kleine wijzer — die staat bij het eerste getal. Kijk pas daarna of de grote wijzer bij de minuten past.',
      hintFive: 'Tel vanaf de 12 met sprongen van vijf — de grote wijzer geeft de minuten aan.',
      hintMinute: 'Tel verder vanaf het laatste lange streepje — elk klein streepje is een minuut.',
      instructionMatch: 'Lees de tijd en tik op de klok die erbij hoort.',
      hintHalf: 'Bij \'half\' staat de grote wijzer altijd op de 6. Half vier is 3:30 — de kleine wijzer is nog onderweg naar de 4, dus vooraan staat de 3 en niet de 4.',
      hintQuarter: 'Bij \'kwart over\' staat de grote wijzer op de 3, bij \'kwart voor\' op de 9. Kwart voor vier is 3:45 — de kleine wijzer is nog onderweg naar de 4, dus vooraan staat de 3 en niet de 4.',
      srReadOnHour: 'De kleine wijzer staat op de {hh}. De grote wijzer staat op de 12.',
      srReadBetween: 'De kleine wijzer staat tussen de {hh} en de {hn}. De grote wijzer staat op de {mk}.',
      srReadOffMark: 'De kleine wijzer staat tussen de {hh} en de {hn}. De grote wijzer staat {nt} voorbij de {mk}.',
      srChoices: 'De keuzes zijn: {ds}.',
      srMatchHead: 'De tijd is {t}. De wijzers van de klokken staan zo:',
      srItemOnHour: 'klok {i}: kleine wijzer op de {hh}, grote wijzer op de 12',
      srItemBetween: 'klok {i}: kleine wijzer tussen de {hh} en de {hn}, grote wijzer op de {mk}',
      srItemOffMark: 'klok {i}: kleine wijzer tussen de {hh} en de {hn}, grote wijzer {nt} voorbij de {mk}',
      srJoin: '; ',
      markOne: 'één streepje',
      markMany: '{n} streepjes'
    },
    /* sv — native panel (lingvist + lågstadielärare åk 1–2). Visarordet är låst av
       clock-core: "den korta visaren är timmen, den långa visaren är minuterna".
       Halvtimmen går mot NÄSTA timme (halv fyra = 3:30) — se spoken(). {t} är en
       färdig, versal mening från spoken(), därför är srReadBody omstrukturerad
       (samma grepp som es/pt/it).
       ⚠ hintMinute säger INTE "små streck": den fina minutringen ritas bara på
       icke-femtalen (48 av 60), så ett barn som räknar "små" streck tappar ett på
       var femte. Engelskan har den buggen; svenskan ärver den inte.
       ⚠ hintMatch är en STRATEGI, inte en omskrivning av frågan som i engelskan. */
    sv: {
      q: 'Vad är klockan?',
      qMatch: 'Vilken klocka visar den här tiden?',
      win: 'Just det! Klockan är {t}.',
      hint: 'Den korta visaren visar timmen. Står den mellan två siffror är det siffran den nyss har passerat som gäller.',
      hintMatch: 'Ta en visare i taget. Den korta visaren visar timmen — den första siffran. Kolla den långa visaren efteråt.',
      hintFive: 'Börja vid 12 och räkna fem i taget åt det håll visarna går, ända fram till den långa visaren.',
      hintMinute: 'Räkna fem i taget till det långa strecket närmast före den långa visaren, och lägg sedan till de små strecken som är kvar.',
      srReadOnHour: 'Den korta visaren står på {hh} och den långa visaren står rakt upp på 12.',
      srReadBetween: 'Den korta visaren står mellan {hh} och {hn}, och den långa visaren står på {mk}.',
      srReadOffMark: 'Den korta visaren står mellan {hh} och {hn}, och den långa visaren står {nt} efter {mk}.',
      srChoices: 'Du kan välja mellan: {ds}.',
      srItemOnHour: 'klocka {i} har den korta visaren på {hh} och den långa visaren rakt upp på 12',
      srItemBetween: 'klocka {i} har den korta visaren mellan {hh} och {hn}, och den långa visaren på {mk}',
      srItemOffMark: 'klocka {i} har den korta visaren mellan {hh} och {hn}, och den långa visaren {nt} efter {mk}',
      srMatchHead: 'Tiden är {t}. Så här står visarna på klockorna:',
      srJoin: '; ',
      markOne: 'ett streck',
      markMany: '{n} streck',
      instructionMatch: 'Läs av tiden som står med siffror och tryck sedan på den klocka som stämmer.',
      hintHalf: 'När den långa visaren står rakt ner på 6 är klockan halv. Halv fyra betyder att den korta visaren är på väg mot fyran men inte framme än — klockan är 3:30, inte 4:30.',
      hintQuarter: 'Kvart över betyder att den långa visaren står på 3, och kvart i att den står på 9. Kvart i fyra är 3:45 — den korta visaren är nästan framme vid fyran, men timmen är fortfarande 3.'
    }
  };
  var LANG = 'en';
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function elNS(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }
  function wrapH(n) { return n > 12 ? n - 12 : n; }
  /* the hand facts a description needs, and nothing more — deliberately NO minute value:
     the minute IS the answer, and a placeholder that exists will eventually be reached for. */
  function handFacts(tm) {
    var h = tm.h, m = tm.m;
    var mk = Math.floor(m / 5); if (mk === 0) mk = 12;      /* preceding heavy numeral */
    return { hh: h, hn: wrapH(h + 1), mk: mk, r: m % 5, onHour: m === 0, onMark: m % 5 === 0 };
  }
  /* "one mark" / "N marks" — a separate singular string per locale, because sv needs the
     NEUTER numeral (ett, not en), it needs `una tacca` vs `quattro tacche`, and nl needs
     `één streepje` with both acutes or it means "a mark". */
  function markPhrase(n) { return n === 1 ? txt('markOne') : txt('markMany', { n: n }); }
  /* join sentence fragments on exactly one space, whatever padding the author used */
  function joinParts() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) {
      var s = String(arguments[i] == null ? '' : arguments[i]).replace(/^\s+|\s+$/g, '');
      if (s) out.push(s);
    }
    return out.join(' ');
  }
  /* pick the true description for one time; `key` prefixes read- vs item- shapes */
  function describeHands(tm, pre, extra) {
    var f = handFacts(tm);
    var a = { hh: f.hh, hn: f.hn, mk: f.mk, nt: markPhrase(f.r) };
    if (extra) { for (var k in extra) { if (extra.hasOwnProperty(k)) a[k] = extra[k]; } }
    return txt(pre + (f.onHour ? 'OnHour' : (f.onMark ? 'Between' : 'OffMark')), a);
  }
  /* the dial, named in the reader's own language. Words taken verbatim from the sibling
     engines clock-read / clock-elapsed, which already localize this exact label; sv added
     (clock-core's Swedish calls the dial "urtavla"). Anything else falls back to English,
     as the siblings do — this engine ships 8 locales. */
  var CLOCK_FACE = {
    de: 'Zifferblatt', fr: 'cadran de l’horloge', es: 'carátula del reloj',
    pt: 'mostrador do relógio', it: 'il quadrante', nl: 'de wijzerplaat',
    sv: 'urtavla', en: 'clock face'
  };
  function clockFaceLabel() { return CLOCK_FACE[LANG] || CLOCK_FACE.en; }
  /* Digital-time chip/readout format. FR writes « 3 h 30 » (lowercase h, spaces,
     keep 00, NO colon — the Anglo-Saxon „3:30" is wrong for a French child);
     en/de keep the core's colon form. 0 lines to the core. */
  function fmtDigital(t) { return LANG === 'fr' ? (t.h + ' h ' + (t.m < 10 ? '0' : '') + t.m) : Core.digitalStr(t); }
  /* a friendly spoken-time phrase for the win note / aria / sr (locale-aware: German uses „N Uhr" / „halb (N+1)" / „Viertel nach·vor"; French „N heures et demie") */
  function spoken(t) {
    var hh = t.h, mm = t.m;
    /* es-MX — native ensemble. El idioma de la hora en México: "y media" = hora EN CURSO
       (3:30 = "las tres y media"), y el "cuarto para" mexicano (3:45 = "un cuarto para las
       cuatro", NUNCA el peninsular "menos cuarto"). El verbo+artículo van DENTRO de la frase
       para resolver "Es la una" vs "Son las tres" (y "…para la una" al pasar de 12→1). */
    if (LANG === 'es') {
      var HRS = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];
      var one = (hh === 1), verbo = one ? 'Es' : 'Son', art = one ? 'la' : 'las', hp = HRS[hh];
      if (mm === 0) return verbo + ' ' + art + ' ' + hp + ' en punto';
      if (mm === 30) return verbo + ' ' + art + ' ' + hp + ' y media';
      if (mm === 15) return verbo + ' ' + art + ' ' + hp + ' y cuarto';
      if (mm === 45) { var nx = (hh === 12) ? 1 : hh + 1, nart = (nx === 1) ? 'la' : 'las'; return 'Es un cuarto para ' + nart + ' ' + HRS[nx]; }
      var mmS = mm < 10 ? '0' + mm : '' + mm;
      return verbo + ' ' + art + ' ' + hh + ':' + mmS;
    }
    if (LANG === 'fr') {
      if (mm === 0) return hh + (hh === 1 ? ' heure' : ' heures');                 /* « 3 heures », « 1 heure », « 12 heures » (douze, not midi) */
      if (mm === 30) return hh + (hh === 1 ? ' heure et demie' : ' heures et demie'); /* feminine „demie" (agrees with heure) */
      if (mm === 15) return hh + (hh === 1 ? ' heure et quart' : ' heures et quart');
      if (mm === 45) { var n = wrapH(hh + 1); return n + (n === 1 ? ' heure moins le quart' : ' heures moins le quart'); }
      return fmtDigital(t);
    }
    /* sv — native panel. Svensk halvtimme går MOT nästa timme (3:30 = "halv fyra"),
       precis som clock-core timeExpr ("halv 8" = 7:30). ⚠ Timmen skrivs som ORD, inte
       siffra: strängen läses upp bredvid en ruta där det står "3:30", och "halv 4"
       intill "3:30" bygger just den missuppfattning aktiviteten ska bryta (nl-panelen
       gjorde samma val). ⚠ Hel mening + versal eftersom {t} används ENSAM som
       aria-label (rad ~375) och direkt efter "Just det!" — es/pt/it-mönstret i den här
       filen; ett ensamt "tre" vore den enda icke-självbeskrivande aria-etiketten.
       ⚠ "ett", aldrig "en": klockan ett, halv ett. wrapH(13) → 1, så 12:30 → halv ett. */
    if (LANG === 'sv') {
      var HRSsv = ['', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'];
      var nxSv = wrapH(hh + 1);
      if (mm === 0) return 'Klockan är ' + HRSsv[hh];
      if (mm === 30) return 'Klockan är halv ' + HRSsv[nxSv];
      if (mm === 15) return 'Klockan är kvart över ' + HRSsv[hh];
      if (mm === 45) return 'Klockan är kvart i ' + HRSsv[nxSv];
      return 'Klockan är ' + Core.digitalStr(t);
    }
    if (LANG === 'de') {
      if (mm === 0) return hh + ' Uhr';
      if (mm === 30) return 'halb ' + wrapH(hh + 1);
      if (mm === 15) return 'Viertel nach ' + hh;
      if (mm === 45) return 'Viertel vor ' + wrapH(hh + 1);
      return Core.digitalStr(t);
    }
    /* pt-BR — native ensemble. Romance "hora em curso + meia" (3:30 = "são três e meia"; NUNCA o
       "halb" germânico). Concordância: é (1) vs são (2+); cardinais FEMININOS uma/duas (hora/horas).
       12:00 = "São doze horas" (não meio-dia — mostrador de 12h sem AM/PM). :45 = "quinze para as". */
    if (LANG === 'pt') {
      var HRS = ['', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze'];
      var one = (hh === 1), verbo = one ? 'É' : 'São', hp = HRS[hh];
      if (mm === 0) return one ? 'É uma hora' : verbo + ' ' + hp + ' horas';
      if (mm === 30) return one ? 'É uma e meia' : verbo + ' ' + hp + ' e meia';
      if (mm === 15) return one ? 'É uma e quinze' : verbo + ' ' + hp + ' e quinze';
      if (mm === 45) { var nx = (hh === 12) ? 1 : hh + 1; return nx === 1 ? 'É quinze para a uma' : 'São quinze para as ' + HRS[nx]; }
      return Core.digitalStr(t);
    }
    /* it — native ensemble. Romance "ora in corso + mezza" (3:30 = "Sono le tre e mezza"; MAI il
       "halb" tedesco). è (1) vs sono (2+); "È l'una" (elisione) vs "Sono le" + HRS. "in punto" per
       le ore intere, "e mezza" (femminile, forma scolastica) per la mezz'ora. 12:00 = "Sono le
       dodici in punto" (mostrador 12h, niente mezzogiorno/mezzanotte). :45 = "meno un quarto" (ora
       successiva). Le due attività usano solo mm 0/30; :15/:45 forniti per completezza. */
    if (LANG === 'it') {
      var HRS = ['', 'una', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici'];
      var head = (hh === 1) ? 'È l\'una' : 'Sono le ' + HRS[hh];
      if (mm === 0) return head + ' in punto';
      if (mm === 30) return head + ' e mezza';
      if (mm === 15) return head + ' e un quarto';
      if (mm === 45) { var nx = (hh === 12) ? 1 : hh + 1; return (nx === 1 ? 'È l\'una' : 'Sono le ' + HRS[nx]) + ' meno un quarto'; }
      return Core.digitalStr(t);
    }
    /* nl — native ensemble. Uur als WOORD ("drie uur"); halve uur naar het VOLGENDE uur
       ("half vier" = 3:30); "één" met accenten. Verzonden variant gebruikt alleen mm 0/30;
       :15/:45 + 5-min (relatief t.o.v. het halve uur) forward-compat; per-minuut → cijfers. */
    if (LANG === 'nl') {
      var HRS = ['', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'];
      var nx = wrapH(hh + 1);
      if (mm === 0) return HRS[hh] + ' uur';
      if (mm === 30) return 'half ' + HRS[nx];
      if (mm === 15) return 'kwart over ' + HRS[hh];
      if (mm === 45) return 'kwart voor ' + HRS[nx];
      if (mm % 5 === 0) {
        if (mm < 15) return HRS[mm] + ' over ' + HRS[hh];
        if (mm < 30) return HRS[30 - mm] + ' voor half ' + HRS[nx];
        if (mm < 45) return HRS[mm - 30] + ' over half ' + HRS[nx];
        return HRS[60 - mm] + ' voor ' + HRS[nx];
      }
      return Core.digitalStr(t);
    }
    if (mm === 0) return hh + " o'clock";
    if (mm === 30) return 'half past ' + hh;
    if (mm === 15) return 'quarter past ' + hh;
    if (mm === 45) return 'quarter to ' + (hh === 12 ? 1 : hh + 1);
    return Core.digitalStr(t);
  }

  function clockSVG(h, m, opts) {
    var svg = elNS('svg', { viewBox: '0 0 100 100', class: 'cd-clock', role: 'img', 'aria-label': clockFaceLabel() });
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 46, fill: C.FACE, stroke: C.RIM, 'stroke-width': 3.5 }));
    /* minute-tick ring (only for the to-the-minute activity): ALL 60 marks.
       ⚠ This used to skip the multiples of 5 (`if (mm % 5 === 0) continue;`), which left
       a gap in the rim at every five minutes while the hour ticks sat further in, on a
       different radius — so "count the little marks, each one is a minute" was false and
       a child counting the rim lost one mark in every five. Every minute now has a mark;
       the five-minute positions are drawn longer and heavier so they still read as the
       landmarks that hintFive ("count by fives") tells the child to use. */
    if (opts && opts.minuteTicks) {
      for (var mm = 0; mm < 60; mm++) {
        var ma = mm * 6 * Math.PI / 180;
        var isFive = (mm % 5 === 0);
        var inner = isFive ? 41.5 : 43.5;
        svg.appendChild(elNS('line', {
          x1: (50 + 46 * Math.sin(ma)).toFixed(2), y1: (50 - 46 * Math.cos(ma)).toFixed(2),
          x2: (50 + inner * Math.sin(ma)).toFixed(2), y2: (50 - inner * Math.cos(ma)).toFixed(2),
          stroke: C.TICK, 'stroke-width': isFive ? 1.6 : 0.7, 'stroke-linecap': 'round'
        }));
      }
    }
    /* 12 hour ticks + numerals */
    for (var n = 1; n <= 12; n++) {
      var a = n * 30 * Math.PI / 180;
      var x1 = 50 + 42 * Math.sin(a), y1 = 50 - 42 * Math.cos(a);
      var x2 = 50 + 37 * Math.sin(a), y2 = 50 - 37 * Math.cos(a);
      svg.appendChild(elNS('line', { x1: x1.toFixed(2), y1: y1.toFixed(2), x2: x2.toFixed(2), y2: y2.toFixed(2), stroke: C.TICK, 'stroke-width': 2, 'stroke-linecap': 'round' }));
      var nx = 50 + 32 * Math.sin(a), ny = 50 - 32 * Math.cos(a);
      var tx = elNS('text', { x: nx.toFixed(2), y: ny.toFixed(2), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.NUM, 'font-family': 'Baloo 2,Nunito,sans-serif', 'font-weight': '800', 'font-size': '9' });
      tx.textContent = String(n);
      svg.appendChild(tx);
    }
    var ang = Core.handAngles(h, m);
    /* minute hand (LONG, thin, coral) — reaches toward the numbers (length 36) */
    svg.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 14, stroke: C.MIN, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + ang.minute.toFixed(2) + ' 50 50)' }));
    /* hour hand (SHORT, thick, teal) — clearly ~55% of the minute hand (length 20) so the short/long cue is unmistakable */
    svg.appendChild(elNS('line', { x1: 50, y1: 50, x2: 50, y2: 30, stroke: C.HOUR, 'stroke-width': 4.8, 'stroke-linecap': 'round', transform: 'rotate(' + ang.hour.toFixed(2) + ' 50 50)' }));
    svg.appendChild(elNS('circle', { cx: 50, cy: 50, r: 3.4, fill: C.RIM }));
    return svg;
  }

  function sprocketSVG() {
    /* Sprocket — a rooster (red comb + wattle, orange beak), crows the hours */
    return '<svg class="cd-sprocket-svg" viewBox="0 0 48 46" width="40" height="38" aria-hidden="true">' +
      '<path d="M14 12 q3 -7 6 0 q3 -7 6 0 q3 -6 5 1" fill="#E2574B" stroke="#B5392F" stroke-width="1.2"/>' +   /* comb */
      '<circle cx="24" cy="26" r="13" fill="#F0CE8C" stroke="#B98A3C" stroke-width="1.6"/>' +
      '<path d="M11 26 l-7 3 l7 3z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +   /* beak (left) */
      '<path d="M11 33 q-2 4 1 6" fill="none" stroke="#E2574B" stroke-width="2.4" stroke-linecap="round"/>' +   /* wattle */
      '<g class="cd-eyes-open"><circle cx="18" cy="23" r="2" fill="#2B2B2B"/></g>' +
      '<g class="cd-eyes-happy"><path d="M16 23 q2 -2.4 4 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M36 22 q9 4 5 16 q-6 -2 -9 -9z" fill="#3E7C5A" stroke="#2A5740" stroke-width="1.2"/></svg>';   /* tail */
  }

  var ClockDigitalActivity = {
    id: 'clock-digital-activity',
    strings: {
      title: { en: "Sprocket's Clock", de: 'Sprockets Uhr', fr: 'L\'horloge de Sprocket', es: 'El reloj de Sprocket', pt: 'O relógio do Sprocket', it: 'L\'orologio di Sprocket', nl: 'De klok van Kukel', sv: 'Tores klocka' },
      instruction: { en: 'Read the clock, then tap the time that matches.', de: 'Lies die Uhr ab und tippe dann auf die passende Uhrzeit.', fr: 'Lis l\'horloge, puis touche l\'heure qui correspond.', es: 'Lee el reloj y luego toca la hora que coincida.', pt: 'Leia o relógio e depois toque na hora que corresponde.', it: 'Leggi l\'orologio, poi tocca l\'ora giusta.', nl: 'Lees de klok en tik op de tijd die erbij hoort.', sv: 'Läs av klockan och tryck sedan på den tid som stämmer.' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._round = null; this._resolved = false; this._token = 0;
      this._nonAns = {}; this._lit = -1; this._optOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('cd-style')) return;
      var s = el('style'); s.id = 'cd-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.cd-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,460px);margin:0 auto;}',
        '.cd-clock{width:min(58vw,230px);height:auto;display:block;}',
        '.cd-row{display:flex;gap:9px;width:100%;justify-content:center;}',
        '.cd-choice{flex:1 1 0;min-width:0;max-width:128px;min-height:54px;border:3px solid #C9B98E;border-radius:14px;background:#FFFDF6;cursor:pointer;display:flex;align-items:center;justify-content:center;font:800 1.5rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;padding:8px 6px;}',
        '.cd-choice.dim{opacity:.4;}',
        '.cd-choice.lit{border-color:#F2784B;box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.cd-readout{font:800 2.6rem/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;letter-spacing:.5px;text-align:center;}',
        '.cd-root.cd-match{max-width:min(96vw,560px);}',                 /* wider row so the 3 analog cards read on desktop */
        '.cd-choice.cd-clockcard{padding:6px;min-height:0;max-width:175px;}',
        '.cd-clockcard .cd-clock{width:100%;max-width:165px;}',
        '.cd-say{display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:34px;}',
        '.cd-sprocket{flex:0 0 auto;line-height:0;}',
        '.cd-msg{flex:0 1 auto;min-height:1.1em;text-align:center;font:700 .86rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;max-width:320px;}',
        '.cd-msg.miss{color:#C2410C;}',
        '.cd-sprocket-svg .cd-eyes-happy{display:none;}.cd-sprocket[data-pose=happy] .cd-eyes-open{display:none;}.cd-sprocket[data-pose=happy] .cd-eyes-happy{display:block;}',
        '.cd-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.cd-root{gap:7px;}.cd-clock{width:42vw;}.cd-row{gap:7px;}.cd-choice{font-size:1.3rem;min-height:50px;}.cd-readout{font-size:2.1rem;}.cd-clockcard .cd-clock{max-width:96px;}}',
        '.lcs-app:not(.sprocket-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'clock-digital.read-hour.1-md-b-3';
      var tries = ['/mini-tools/clock-digital-activities.json', 'clock-digital-activities.json', '../mini tools/clock-digital-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._applyDirectionInstruction();
            self._pool = (row && row.params && row.params.rounds) || [];
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    /* A1: swap in the direction-true instruction for the digital-to-analog row, on the
       visible <p> AND inside the container's accessible name. Touches only nodes the
       shell already rendered; 0 lines to lcs-shell.js. */
    _applyDirectionInstruction: function () {
      var row = this._activityRow;
      if (!row || !row.params || row.params.direction !== 'digital-to-analog') return;
      /* prefer a dedicated imperative when a locale has authored one; otherwise reuse
         qMatch, which is already native in all 8 locales and true of this row. */
      var txt2 = (L[LANG] && L[LANG].instructionMatch) || (L.en && L.en.instructionMatch) || txt('qMatch');
      if (!txt2) return;
      var app = this._app; if (!app) return;
      var p = app.querySelector('.lcs-instruction');
      if (!p) {
        /* the header may not be rendered yet — retry rather than give up silently, which
           would look exactly like the defect this method exists to fix */
        var self2 = this;
        if (!this._instrRetries) this._instrRetries = 0;
        if (this._instrRetries++ < 20) { setTimeout(function () { self2._applyDirectionInstruction(); }, 16); }
        return;
      }
      var old = p && p.textContent;
      if (p) p.textContent = txt2;
      var lbl = app.getAttribute('aria-label');
      /* replace the old sentence inside the composed label rather than rebuilding it,
         so the shell's own chrome template stays the single source of that wording */
      if (lbl && old && lbl.indexOf(old) !== -1) app.setAttribute('aria-label', lbl.split(old).join(txt2));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      var dir = (this._activityRow && this._activityRow.params && this._activityRow.params.direction) || 'analog-to-digital';
      var promptText = dir === 'digital-to-analog' ? txt('qMatch') : txt('q');
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: promptText }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonAns = {}; this._lit = -1;
      this._optOrder = this._shuffle((round.options || []).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('sprocket-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var self = this, tok = this._token;
      var params = (this._activityRow && this._activityRow.params) || {};
      var _gran = params.granularity || 'hour';
      var _dir = params.direction || 'analog-to-digital';

      var root = el('div', 'cd-root' + (_dir === 'digital-to-analog' ? ' cd-match' : ''));

      if (_dir === 'digital-to-analog') {
        /* stimulus = big DIGITAL readout */
        var ro = el('div', 'cd-readout'); ro.textContent = fmtDigital(round.target); root.appendChild(ro);
      } else {
        /* stimulus = analog clock (minute ticks only for the to-the-minute activity) */
        root.appendChild(clockSVG(round.target.h, round.target.m, { minuteTicks: _gran === 'minute' }));
      }

      var row = el('div', 'cd-row');
      var order = this._optOrder || (round.options || []).map(function (_, i) { return i; });
      order.forEach(function (oi, _pos) {
        var t = round.options[oi];
        var isClockCard = _dir === 'digital-to-analog';
        var b = el('button', 'cd-choice' + (isClockCard ? ' cd-clockcard' : '') + (self._nonAns[oi] ? ' dim' : '') + (self._lit === oi ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-oi', oi);
        if (isClockCard) {
          /* ⚠ no visible text, so the button carries the name — and it must be the HANDS.
             Naming it spoken(t) let a blind child string-match the question against the
             button labels and never read a clock at all — the same answer-leak the sr
             block had, and untouched by rewriting the sr block, because both came from
             this one call. Same fragment as the sr list item, so the two cannot drift. */
          b.setAttribute('aria-label', joinParts(describeHands(t, 'srItem', { i: _pos + 1 })));
          var face = clockSVG(t.h, t.m);
          face.setAttribute('aria-hidden', 'true'); face.removeAttribute('role');
          b.appendChild(face);                               /* choice = analog clock face */
        } else {
          /* WCAG 2.5.3: the visible "3:00" IS the accessible name. An aria-label of
             spoken(t) ("3 o'clock") would hide the visible label from voice control. */
          b.textContent = fmtDigital(t);                     /* choice = digital time text */
        }
        b.addEventListener('click', function () {
          if (self._resolved || self._nonAns[oi] || self._token !== tok) return;
          if (Core.isAnswer(round, oi)) { self._lit = oi; self._resolve(); }
          else { self._nonAns[oi] = 1; self._nudge(); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);

      var say = el('div', 'cd-say');
      var sp = el('div', 'cd-sprocket'); sp.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sp.innerHTML = sprocketSVG();
      var msg = el('p', 'cd-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(sp, msg); root.appendChild(say); this._sprocket = sp;

      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _resolve: function () {
      this._resolved = true;
      if (this._app) this._app.classList.add('sprocket-resolved');
      var round = this._round;
      this.render();
      var line = this._api.stage.querySelector('.cd-msg');
      var note = txt('win', { t: spoken(round.target) });
      if (line) { line.textContent = note; line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(note);
    },
    _nudge: function () {
      var params = (this._activityRow && this._activityRow.params) || {};
      var gran = params.granularity || 'hour';
      var msgText = params.direction === 'digital-to-analog'
        ? txt('hintMatch')
        : txt(gran === 'hour' ? 'hint'
            : (gran === 'five' ? 'hintFive'
            : (gran === 'minute' ? 'hintMinute'
            /* ⚠ half and quarter shared one generic hint. In de/nl/sv the spoken form of
               3:30 is "half four" and of 3:45 "quarter to four" — word and digits share NO
               number — so these are the two rounds that most need a hint of their own. */
            : (gran === 'half' ? 'hintHalf'
            /* the default arm. Every granularity the manifest ships is named above, so this
               is unreachable today; it falls back to `hint` rather than to a key of its own,
               because a key reachable only in theory cannot be told from a live one. */
            : (gran === 'quarter' ? 'hintQuarter' : 'hint')))));
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.cd-msg');
      if (line) { line.textContent = msgText; line.classList.add('miss'); }
      this._api.announce && this._api.announce(msgText);
    },

    _srMirror: function (round) {
      var wrap = el('div', 'cd-sronly'); wrap.setAttribute('aria-live', 'polite');
      var dir = (this._activityRow && this._activityRow.params && this._activityRow.params.direction) || 'analog-to-digital';
      /* ⚠ the SAME order render() draws in — _optOrder is a per-round shuffle, and reading
         raw round.options here put the spoken list out of step with the buttons. */
      var _opts = round.options || [];
      var _ord = this._optOrder || _opts.map(function (_, i) { return i; });
      if (dir === 'digital-to-analog') {
        /* ⚠ each clock is described BY ITS HANDS, never by its time — naming the times is
           what handed the answer over. Indexed, so the child can say which clock. */
        var cs = _ord.map(function (oi, i) { return describeHands(_opts[oi], 'srItem', { i: i + 1 }); }).join(txt('srJoin'));
        wrap.innerHTML = '<p>' + joinParts(txt('qMatch'), txt('srMatchHead', { t: fmtDigital(round.target) }), cs) + '</p>';
      } else {
        /* the target is described by its HANDS. A blind child cannot read the dial, so the
           text cannot simply be deleted — but it must not state the time either. */
        var ds = _ord.map(function (oi) { return fmtDigital(_opts[oi]); }).join(', ');
        wrap.innerHTML = '<p>' + joinParts(txt('q'), describeHands(round.target, 'srRead'), txt('srChoices', { ds: ds })) + '</p>';
      }
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ClockDigitalActivity = ClockDigitalActivity;

}(typeof window !== 'undefined' ? window : this));
