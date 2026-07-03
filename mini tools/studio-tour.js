/* ============================================================================
   studio-tour.js — the Story Studio's first-run coach marks (teacher mode).

   Five dismissible steps over the real UI, shown once per browser
   (localStorage 'studio.toured'). No library; a scrim + one bubble anchored
   to each step's element. Skipped entirely in operator mode.
   ========================================================================= */
(function (global) {
  'use strict';

  function tourSteps(de) {
    return de ? [
      { sel: '#stu-rail', title: 'Ihre Seiten', body: 'Jede Geschichte besteht aus Seiten. Hier fügen Sie Seiten hinzu und wechseln zwischen ihnen.' },
      { sel: '#stu-canvas-host', title: 'Die Bühne', body: 'Ziehen Sie Figuren dorthin, wo sie stehen sollen. Mit dem runden Griff ändern Sie ihre Größe.' },
      { sel: '#stu-panel', title: 'Schritt für Schritt zur Seite', body: 'Arbeiten Sie die Schritte durch: Bild → Figuren → Erzähltext → Aufgabe. Alles wird automatisch gespeichert.' },
      { sel: null, title: 'Arbeitsblatt-Aufgaben', body: 'Unter „Aufgabe auswählen“ finden Sie auch alle Arbeitsblatt-Generatoren – gestalten Sie ein Arbeitsblatt, und daraus wird eine spielbare Aufgabe.' },
      { sel: '#stu-topbar', title: 'Vorschau', body: 'Mit „Aus Schülersicht ansehen“ erleben Sie die Geschichte genau wie Ihre Klasse. Viel Freude!' }
    ] : [
      { sel: '#stu-rail', title: 'Your pages', body: 'A story is a stack of pages. Add pages and hop between them here.' },
      { sel: '#stu-canvas-host', title: 'The stage', body: 'Drag characters where you want them. The round handle changes their size.' },
      { sel: '#stu-panel', title: 'The page recipe', body: 'Work down the steps: picture → characters → story lines → activity. Everything saves automatically.' },
      { sel: null, title: 'Worksheet activities', body: 'Inside "Choose an activity" you\'ll also find every worksheet maker — design a worksheet and it becomes a playable activity.' },
      { sel: '#stu-topbar', title: 'Preview', body: '"Preview as a student" shows the story exactly as your class will see it. Have fun!' }
    ];
  }

  function start(force) {
    var teacher = false;
    try { teacher = new URLSearchParams(global.location.search).get('mode') === 'teacher'; } catch (e) {}
    if (!teacher && !force) return;
    try { if (!force && localStorage.getItem('studio.toured')) return; } catch (e) {}

    var de = (global.Studio && global.Studio.state && global.Studio.state.storyLocale) === 'de';
    var steps = tourSteps(de);
    var idx = 0;

    var scrim = document.createElement('div');
    scrim.className = 'stu-tour-scrim';
    var bubble = document.createElement('div');
    bubble.className = 'stu-tour-bubble';
    document.body.appendChild(scrim);
    document.body.appendChild(bubble);

    function done() {
      try { localStorage.setItem('studio.toured', '1'); } catch (e) {}
      scrim.remove(); bubble.remove();
    }

    function show() {
      var st = steps[idx];
      bubble.innerHTML = '';
      var h = document.createElement('h4'); h.textContent = st.title;
      var p = document.createElement('p'); p.textContent = st.body;
      var row = document.createElement('div'); row.className = 'stu-tour-row';
      var skip = document.createElement('button'); skip.className = 'stu-btn stu-btn-small';
      skip.textContent = de ? 'Überspringen' : 'Skip';
      skip.addEventListener('click', done);
      var next = document.createElement('button'); next.className = 'stu-btn stu-btn-small stu-btn-primary';
      next.textContent = idx === steps.length - 1 ? (de ? 'Los geht’s!' : 'Let\'s go!') : (de ? 'Weiter' : 'Next');
      next.addEventListener('click', function () {
        idx++;
        if (idx >= steps.length) done(); else show();
      });
      row.appendChild(skip); row.appendChild(next);
      bubble.appendChild(h); bubble.appendChild(p); bubble.appendChild(row);
      bubble.appendChild(makeCounter());

      /* anchor near the step's element (or center) */
      var target = st.sel && document.querySelector(st.sel);
      if (target) {
        var r = target.getBoundingClientRect();
        var bx = Math.min(Math.max(12, r.left + 20), window.innerWidth - 340);
        var by = Math.min(Math.max(12, r.top + 24), window.innerHeight - 220);
        bubble.style.left = bx + 'px';
        bubble.style.top = by + 'px';
        bubble.style.transform = 'none';
      } else {
        bubble.style.left = '50%';
        bubble.style.top = '40%';
        bubble.style.transform = 'translate(-50%,-50%)';
      }
    }
    function makeCounter() {
      var c = document.createElement('div');
      c.className = 'stu-tour-count';
      c.textContent = (idx + 1) + ' / ' + steps.length;
      return c;
    }

    scrim.addEventListener('click', done);
    show();
  }

  global.StudioTour = { start: start };

  /* auto-start once the Studio has loaded a story */
  var boot = setInterval(function () {
    if (global.Studio && global.Studio.state && global.Studio.state.doc) {
      clearInterval(boot);
      setTimeout(function () { start(false); }, 600);
    }
  }, 400);
  setTimeout(function () { clearInterval(boot); }, 30000);
}(typeof window !== 'undefined' ? window : this));
