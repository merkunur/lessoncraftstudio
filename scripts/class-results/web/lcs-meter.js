/**
 * lcs-meter.js — the wall of an interactive deck page. WRITTEN BY scripts/publish-cli/build-lcs-meter.js: change
 * that script (or the two text files it reads), never this file.
 * Every static deck.html loads this one file (scripts/publish-cli/inject-meter.js put the tag there).
 *
 * Playing on screen needs a free account whose e-mail is confirmed; a free account plays 10 times a day
 * (frontend/lib/quota.ts; operator rulings of 2026-11-12). Subscribers and search crawlers are let through on the
 * server and never see a wall. On load the script asks the meter and, when the play is refused, covers the page:
 *   401 signup_required  no account                      -> "make a free account", with the way to sign in
 *   401 verify_required  the e-mail is not confirmed     -> "confirm your email", to the account page
 *   402 quota_exceeded   the day's plays are used        -> the Teacher plan
 * Any error lets the page play (the meter must never break a deck).
 *
 * WHERE THE PAGE IS SHOWN:
 *   - on its own address, or inside a page of OUR site (the player of a worksheet page): asked as above. Until
 *     2026-11-12 every framed deck was let through, so the player of 30,000 worksheet pages was never counted.
 *   - inside a page of ANOTHER site (a teacher's blog, a school site): never asked. The children there cannot
 *     sign in, and the embed is how the site is passed on.
 *   - inside OUR HOMEPAGE: never asked. It is the one sample the page that sells the product shows.
 *
 * CLASS LINKS (docs/daily-teaching-system/PART-9-DESIGN.md): when the page address carries a class attempt token
 * after '#' (#lcs=<20 chars>) a child opened this page from a teacher's class page. The token is sent with the play
 * check — a live class of a subscribed teacher is not metered — and the class reporter (lcs-class.js) is loaded.
 * Without the token nothing here changes and lcs-class.js is never requested.
 */
(function () {
  'use strict';
  try {
    var framed = false, ours = false, parentPath = '';
    try { framed = (window.top !== window.self); } catch (e) { framed = true; }
    if (framed) {
      // readable only when the page around us is of our own site
      try { ours = window.parent.location.hostname === window.location.hostname; parentPath = String(window.parent.location.pathname || ''); } catch (e) { ours = false; }
      if (!ours) return;                                   // another site: the embed stays open
      if (/^\/(?:[a-z]{2}\/?)?$/.test(parentPath)) return;  // our homepage: the one sample
    }

    var LOC = (function () {
      try {
        if (window.DECK_BUNDLE && DECK_BUNDLE.contentLanguage) return String(DECK_BUNDLE.contentLanguage).slice(0, 2);
      } catch (e) {}
      return (document.documentElement.lang || 'en').slice(0, 2);
    })();

    var COPY = {"en":{"used":{"t":"You've used your free plays for today","b":"Come back tomorrow, or unlock unlimited play with a Teacher plan.","c":"See the Teacher plan"},"signup":{"t":"Make a free account to play","b":"Interactive worksheets, activities, and classroom tools need a free account. It gives you 10 plays a day. Create one in seconds — no credit card needed.","c":"Sign up free","s":"I have an account: sign in"},"verify":{"t":"Confirm your email to continue","b":"We sent a link to the address you signed up with. Open it, and your free account is ready to use.","c":"Go to my account"}},"de":{"used":{"t":"Deine kostenlosen Runden für heute sind aufgebraucht","b":"Komm morgen wieder – oder schalte mit dem Lehrkraft-Abo unbegrenztes Spielen frei.","c":"Zum Lehrkraft-Abo"},"signup":{"t":"Erstelle ein kostenloses Konto zum Spielen","b":"Für interaktive Arbeitsblätter, Aufgaben und Tools brauchst du ein kostenloses Konto. Damit kannst du sie 10-mal am Tag nutzen. In Sekunden erstellt – ohne Kreditkarte.","c":"Kostenlos registrieren","s":"Ich habe ein Konto: anmelden"},"verify":{"t":"Bestätige deine E-Mail-Adresse, um weiterzumachen","b":"Wir haben dir einen Link an die Adresse geschickt, mit der du dich registriert hast. Öffne ihn, dann kannst du dein kostenloses Konto nutzen.","c":"Zu meinem Konto"}},"fr":{"used":{"t":"Vous avez utilisé vos essais gratuits du jour","b":"Revenez demain, ou débloquez le jeu illimité avec l'abonnement Enseignant.","c":"Voir l'abonnement Enseignant"},"signup":{"t":"Créez un compte gratuit pour jouer","b":"Les fiches interactives, les activités et les outils de classe nécessitent un compte gratuit. Il donne droit à 10 utilisations par jour. Créez-en un en quelques secondes, sans carte bancaire.","c":"Inscription gratuite","s":"J'ai déjà un compte : se connecter"},"verify":{"t":"Confirmez votre adresse e-mail pour continuer","b":"Nous avons envoyé un lien à l'adresse utilisée pour votre inscription. Ouvrez-le, et votre compte gratuit est prêt.","c":"Aller à mon compte"}},"es":{"used":{"t":"Has usado tus jugadas gratis de hoy","b":"Vuelve mañana, o desbloquea juego ilimitado con el plan Docente.","c":"Ver el plan Docente"},"signup":{"t":"Crea una cuenta gratis para jugar","b":"Las hojas de trabajo interactivas, las actividades y las herramientas de clase requieren una cuenta gratis. Con ella tienes 10 usos al día. Créala en segundos, sin tarjeta.","c":"Registrarse gratis","s":"Ya tengo cuenta: iniciar sesión"},"verify":{"t":"Confirma tu correo para continuar","b":"Enviamos un enlace al correo con el que te registraste. Ábrelo y tu cuenta gratis queda lista.","c":"Ir a mi cuenta"}},"pt":{"used":{"t":"Você usou suas jogadas gratuitas de hoje","b":"Volte amanhã, ou libere jogo ilimitado com o plano Professor.","c":"Ver o plano Professor"},"signup":{"t":"Crie uma conta grátis para jogar","b":"As fichas interativas, as atividades e as ferramentas de sala de aula precisam de uma conta grátis. Com ela, você tem 10 usos por dia. Crie a sua em segundos, sem cartão.","c":"Cadastro grátis","s":"Já tenho conta: entrar"},"verify":{"t":"Confirme seu e-mail para continuar","b":"Enviamos um link para o e-mail que você usou no cadastro. Abra o link e sua conta grátis estará pronta.","c":"Ir para minha conta"}},"it":{"used":{"t":"Hai usato le tue prove gratuite di oggi","b":"Torna domani, o sblocca il gioco illimitato con il piano Insegnante.","c":"Vedi il piano Insegnante"},"signup":{"t":"Crea un account gratuito per giocare","b":"Le schede interattive, le attività e gli strumenti per la classe richiedono un account gratuito. Con l'account hai 10 utilizzi al giorno. Creane uno in pochi secondi, senza carta di credito.","c":"Registrati gratis","s":"Ho già un account: accedi"},"verify":{"t":"Conferma il tuo indirizzo e-mail per continuare","b":"Abbiamo inviato un link all'indirizzo usato per la registrazione. Aprilo e il tuo account gratuito è pronto.","c":"Vai al mio account"}},"nl":{"used":{"t":"Je hebt je gratis speelbeurten van vandaag gebruikt","b":"Kom morgen terug, of ontgrendel onbeperkt spelen met het Leerkracht-abonnement.","c":"Bekijk het Leerkracht-abonnement"},"signup":{"t":"Maak een gratis account om te spelen","b":"Voor interactieve werkbladen, activiteiten en hulpmiddelen heb je een gratis account nodig. Daarmee kun je ze 10 keer per dag gebruiken. In een paar seconden aangemaakt, zonder creditcard.","c":"Gratis aanmelden","s":"Ik heb al een account: inloggen"},"verify":{"t":"Bevestig je e-mailadres om verder te gaan","b":"We hebben een link gestuurd naar het adres waarmee je je hebt aangemeld. Open de link en je gratis account is klaar voor gebruik.","c":"Naar mijn account"}},"sv":{"used":{"t":"Du har använt dagens gratisomgångar","b":"Kom tillbaka i morgon, eller lås upp obegränsat spel med Lärarplanen.","c":"Se Lärarplanen"},"signup":{"t":"Skapa ett gratiskonto för att spela","b":"Interaktiva arbetsblad, aktiviteter och verktyg kräver ett gratiskonto. Med det kan du använda dem 10 gånger per dag. Skapa ett på några sekunder, utan betalkort.","c":"Registrera dig gratis","s":"Jag har ett konto: logga in"},"verify":{"t":"Bekräfta din e-postadress för att fortsätta","b":"Vi har skickat en länk till adressen du registrerade dig med. Öppna den, så är ditt gratiskonto klart att använda.","c":"Till mitt konto"}},"da":{"used":{"t":"Du har brugt dagens gratis spil","b":"Kom tilbage i morgen, eller lås op for ubegrænset spil med Lærerplanen.","c":"Se Lærerplanen"},"signup":{"t":"Opret en gratis konto for at spille","b":"Interaktive arbejdsark, aktiviteter og værktøjer kræver en gratis konto. Med den kan du bruge dem 10 gange om dagen. Opret en på få sekunder, uden betalingskort.","c":"Tilmeld dig gratis","s":"Jeg har en konto: log ind"},"verify":{"t":"Bekræft din e-mailadresse for at fortsætte","b":"Vi har sendt et link til den adresse, du tilmeldte dig med. Åbn det, så er din gratis konto klar til brug.","c":"Til min konto"}},"no":{"used":{"t":"Du har brukt dagens gratisrunder","b":"Kom tilbake i morgen, eller lås opp ubegrenset spill med Lærerplanen.","c":"Se Lærerplanen"},"signup":{"t":"Opprett en gratis konto for å spille","b":"Interaktive arbeidsark, aktiviteter og verktøy krever en gratis konto. Med den kan du bruke dem 10 ganger om dagen. Opprett en på noen sekunder, uten betalingskort.","c":"Registrer deg gratis","s":"Jeg har en konto: logg inn"},"verify":{"t":"Bekreft e-postadressen din for å fortsette","b":"Vi har sendt en lenke til adressen du registrerte deg med. Åpne den, så er gratiskontoen din klar til bruk.","c":"Til kontoen min"}},"fi":{"used":{"t":"Olet käyttänyt tämän päivän ilmaiset pelikerrat","b":"Palaa huomenna, tai avaa rajaton pelaaminen Opettaja-tilauksella.","c":"Katso Opettaja-tilaus"},"signup":{"t":"Luo ilmainen tili pelataksesi","b":"Interaktiiviset työarkit, tehtävät ja työkalut vaativat ilmaisen tilin. Sillä saat 10 käyttökertaa päivässä. Luo tili muutamassa sekunnissa – maksukorttia ei tarvita.","c":"Rekisteröidy ilmaiseksi","s":"Minulla on tili: kirjaudu sisään"},"verify":{"t":"Vahvista sähköpostiosoitteesi jatkaaksesi","b":"Lähetimme linkin osoitteeseen, jolla rekisteröidyit. Avaa se, niin ilmainen tilisi on valmis käyttöön.","c":"Omalle tilille"}}};
    var C = COPY[LOC] || COPY.en;
    var HOST = 'https://www.lessoncraftstudio.com';

    var CLASS_TOKEN = (function () {
      var m = /[#&]lcs=([a-z2-9]{20})(?:&|$)/.exec(window.location.hash || '');
      return m ? m[1] : null;
    })();
    function loadClassReporter() {
      if (!CLASS_TOKEN || document.getElementById('lcs-class-js')) return;
      var s = document.createElement('script');
      s.id = 'lcs-class-js';
      s.defer = true;
      s.src = HOST + '/worksheet-generators/js/lcs-class.js?v=1';
      document.head.appendChild(s);
    }

    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    // the page a teacher is sent back to after she has made her account (the site reads it once)
    function remember() {
      try { var w = ours ? window.parent : window; w.sessionStorage.setItem('lcs-return', w.location.pathname); } catch (e) {}
    }
    function showWall(kind) {
      if (document.getElementById('lcs-play-wall')) return;
      var c = C[kind] || C.used;
      var href = kind === 'signup' ? '/' + LOC + '/auth/signup?from=play' : kind === 'verify' ? '/' + LOC + '/workspace?verify=1' : '/' + LOC + '/pricing?from=deck-wall';
      var o = document.createElement('div');
      o.id = 'lcs-play-wall';
      o.setAttribute('data-wall', kind);
      o.setAttribute('role', 'dialog');
      o.setAttribute('aria-modal', 'true');
      o.setAttribute('style', 'position:fixed;inset:0;z-index:2147483647;background:rgba(14,84,74,.96);display:flex;align-items:center;justify-content:center;padding:24px;font-family:Nunito,system-ui,sans-serif;text-align:center;overflow:auto;');
      o.innerHTML =
        '<div style="max-width:460px;color:#FBF3E4;">' +
        '<h2 style="font-family:\'Baloo 2\',Nunito,sans-serif;font-size:1.6rem;line-height:1.25;margin:0 0 10px;">' + esc(c.t) + '</h2>' +
        '<p style="font-size:1.05rem;line-height:1.5;margin:0 0 20px;">' + esc(c.b) + '</p>' +
        '<a data-wall-main target="_top" href="' + HOST + href + '" style="display:inline-flex;align-items:center;min-height:48px;background:#F2784B;color:#2A1206;padding:12px 24px;border-radius:999px;font-weight:700;text-decoration:none;">' + esc(c.c) + '</a>' +
        (kind === 'signup' ? '<p style="margin:10px 0 0;"><a data-wall-signin target="_top" href="' + HOST + '/' + LOC + '/auth/signin?from=play" style="display:inline-flex;align-items:center;min-height:44px;color:#FBF3E4;font-weight:600;text-decoration:underline;text-underline-offset:4px;">' + esc(c.s) + '</a></p>' : '') +
        '</div>';
      document.body.appendChild(o);
      var links = o.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) links[i].addEventListener('click', remember);
    }

    function run() {
      loadClassReporter();
      fetch(HOST + '/api/quota/check-and-increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(CLASS_TOKEN ? { kind: 'play', classToken: CLASS_TOKEN } : { kind: 'play' }),
        // a class visit names nobody: no cookie travels with it (legal decision 2026-11-14, E6)
        credentials: CLASS_TOKEN ? 'omit' : 'include',
        cache: 'no-store'
      }).then(function (res) {
        if (res.status === 402) return showWall('used');
        if (res.status !== 401) return; // 200 / anything else: the deck plays
        return res.json().then(function (j) { showWall(j && j.reason === 'verify_required' ? 'verify' : j && j.reason === 'signup_required' ? 'signup' : 'used'); }, function () { showWall('used'); });
      }).catch(function () { /* network error: the deck plays */ });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
  } catch (e) { /* the meter must never break a deck */ }
})();
