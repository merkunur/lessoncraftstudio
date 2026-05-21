/* =====================================================================
   TEN FRAME — ACTIVITY   (ten-frame-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of ten-frame. Reuses the shared core in
   ten-frame-core.js (DOM, paint, setCount, settings, CSS). This file
   declares the tasks the kid works through; the shell renders the task
   chrome (prompt / Check / feedback / Next / progress).

   Two task families:
     • "Make N"   — answerType:'state'  — kid taps cells; check reads tool.count
     • "How many?" — answerType:'number' — cells locked; kid enters a number

   This is the reference activity tool. The seam between core and variant
   is ~60 LOC: a strings dict + a tasks array. Add a new task by adding
   one object to the array; no shell changes, no core changes.
   ===================================================================== */
var ACTIVITY_STRINGS = {
  taskMake:     {en:'Make {n}',de:'Mache {n}',fr:'Fais {n}',it:'Fai {n}',es:'Haz {n}',pt:'Faça {n}',nl:'Maak {n}',sv:'Gör {n}',da:'Lav {n}',no:'Lag {n}',fi:'Tee {n}'},
  taskHowMany:  {en:'How many?',de:'Wie viele?',fr:'Combien ?',it:'Quanti?',es:'¿Cuántos?',pt:'Quantos?',nl:'Hoeveel?',sv:'Hur många?',da:'Hvor mange?',no:'Hvor mange?',fi:'Kuinka monta?'},
  hintAddMore:  {en:'Add more',de:'Mehr hinzufügen',fr:'Ajoute encore',it:'Aggiungi ancora',es:'Añade más',pt:'Adicione mais',nl:'Voeg meer toe',sv:'Lägg till fler',da:'Tilføj flere',no:'Legg til flere',fi:'Lisää enemmän'},
  hintTakeAway: {en:'Take some away',de:'Weniger nehmen',fr:'Enlève quelques-uns',it:'Togli qualcuno',es:'Quita algunos',pt:'Tire alguns',nl:'Haal er een paar weg',sv:'Ta bort några',da:'Fjern nogle',no:'Ta bort noen',fi:'Poista joitakin'}
};

var TenFrameActivity = Object.assign({}, TenFrameCore, {
  id: 'ten-frame-activity',
  strings: Object.assign({}, TenFrameCore.strings, ACTIVITY_STRINGS, {
    /* Override the manipulative's title + instruction with activity-flavour ones. */
    title:       {en:'Ten Frame Activity',de:'Zehnerfeld-Aufgaben',fr:'Cadre de dix — activités',it:'Tabella del dieci — attività',es:'Marco de diez — actividades',pt:'Quadro de dez — atividades',nl:'Tienraam-oefeningen',sv:'Tioram-uppgifter',da:'Tierramme-opgaver',no:'Tierramme-oppgaver',fi:'Kymmenruudukko-tehtävät'},
    instruction: {en:'Follow the prompt. Tap Check when you’re ready.',de:'Folge der Aufforderung. Tippe Prüfen, wenn du fertig bist.',fr:'Suis la consigne. Tape Vérifier quand tu es prêt.',it:'Segui l’istruzione. Tocca Verifica quando sei pronto.',es:'Sigue la indicación. Toca Comprobar cuando estés listo.',pt:'Siga a instrução. Toque em Verificar quando estiver pronto.',nl:'Volg de opdracht. Tik op Controleer als je klaar bent.',sv:'Följ uppmaningen. Tryck på Kontrollera när du är klar.',da:'Følg opgaven. Tryk på Tjek, når du er klar.',no:'Følg oppgaven. Trykk på Sjekk når du er klar.',fi:'Seuraa ohjetta. Paina Tarkista, kun olet valmis.'}
  }),

  /* Five tasks: 3× Make-N (interactive), 2× How-many? (read-only). */
  tasks: [
    { id:'make-3', promptKey:'taskMake', promptArgs:{n:3}, answerType:'state',
      setup:   function (tool) { tool.readOnly = false; tool.setCount(0); },
      check:   function (tool) { return tool.count === 3; },
      hintKey: function (tool) { return tool.count < 3 ? 'hintAddMore' : 'hintTakeAway'; } },

    { id:'make-7', promptKey:'taskMake', promptArgs:{n:7}, answerType:'state',
      setup:   function (tool) { tool.readOnly = false; tool.setCount(0); },
      check:   function (tool) { return tool.count === 7; },
      hintKey: function (tool) { return tool.count < 7 ? 'hintAddMore' : 'hintTakeAway'; } },

    { id:'make-10', promptKey:'taskMake', promptArgs:{n:10}, answerType:'state',
      setup:   function (tool) { tool.readOnly = false; tool.setCount(0); },
      check:   function (tool) { return tool.count === 10; },
      hintKey: function (tool) { return tool.count < 10 ? 'hintAddMore' : 'hintTakeAway'; } },

    { id:'count-4', promptKey:'taskHowMany', answerType:'number', answerMin:0, answerMax:10,
      setup: function (tool) { tool.setCount(4); tool.readOnly = true; },
      check: function (tool, answer) { return parseInt(answer, 10) === tool.count; } },

    { id:'count-8', promptKey:'taskHowMany', answerType:'number', answerMin:0, answerMax:10,
      setup: function (tool) { tool.setCount(8); tool.readOnly = true; },
      check: function (tool, answer) { return parseInt(answer, 10) === tool.count; } }
  ]
});

TenFrameCore.injectCSS();
