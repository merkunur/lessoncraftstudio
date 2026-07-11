/**
 * lcs-meter.js — the deck.html play wall (2026-07-12 metered paywall).
 * Injected into every static deck.html (scripts/publish-cli/inject-meter.js).
 *
 * Interactive play is metered at 10/day for anonymous + free users; subscribers
 * and crawler UAs bypass server-side (they never see the wall). This script:
 *   1. Does NOTHING when the deck is EMBEDDED (window.top !== window OR
 *      body.lcs-embedded) — the embed/backlink flywheel stays free forever.
 *   2. On load, POSTs /api/quota/check-and-increment {kind:'play'} (same-origin,
 *      credentialed). Allowed (incl. metering-off → 200, crawlers, subscribers)
 *      → nothing happens, the deck plays.
 *   3. Blocked (402/401) → a full-cover overlay with a kid-safe line + an
 *      adult CTA to the localized pricing page. Fail-OPEN on any error.
 *
 * Optimistic by design (IXL-style: you play, then meet the wall) — the server
 * has already counted the play; the overlay is the nudge, not a hard lock.
 */
(function () {
  'use strict';
  try {
    // Embed exemption — the flywheel stays free.
    var embedded = false;
    try { embedded = (window.top !== window.self); } catch (e) { embedded = true; }
    if (embedded || (document.body && document.body.classList.contains('lcs-embedded'))) return;

    var LOC = (function () {
      try {
        if (window.DECK_BUNDLE && DECK_BUNDLE.contentLanguage) return String(DECK_BUNDLE.contentLanguage).slice(0, 2);
      } catch (e) {}
      return (document.documentElement.lang || 'en').slice(0, 2);
    })();

    var COPY = {
      en: { t: "You've used your free plays for today", b: 'Come back tomorrow, or unlock unlimited play with a Teacher plan.', c: 'See the Teacher plan' },
      de: { t: 'Deine kostenlosen Runden für heute sind aufgebraucht', b: 'Komm morgen wieder – oder schalte mit dem Lehrkraft-Abo unbegrenztes Spielen frei.', c: 'Zum Lehrkraft-Abo' },
      fr: { t: 'Vous avez utilisé vos essais gratuits du jour', b: "Revenez demain, ou débloquez le jeu illimité avec l'abonnement Enseignant.", c: "Voir l'abonnement Enseignant" },
      es: { t: 'Has usado tus jugadas gratis de hoy', b: 'Vuelve mañana, o desbloquea juego ilimitado con el plan Docente.', c: 'Ver el plan Docente' },
      pt: { t: 'Você usou suas jogadas gratuitas de hoje', b: 'Volte amanhã, ou libere jogo ilimitado com o plano Professor.', c: 'Ver o plano Professor' },
      it: { t: 'Hai usato le tue prove gratuite di oggi', b: 'Torna domani, o sblocca il gioco illimitato con il piano Insegnante.', c: 'Vedi il piano Insegnante' },
      nl: { t: 'Je hebt je gratis speelbeurten van vandaag gebruikt', b: 'Kom morgen terug, of ontgrendel onbeperkt spelen met het Leerkracht-abonnement.', c: 'Bekijk het Leerkracht-abonnement' },
      sv: { t: 'Du har använt dagens gratisomgångar', b: 'Kom tillbaka i morgon, eller lås upp obegränsat spel med Lärarplanen.', c: 'Se Lärarplanen' },
      da: { t: 'Du har brugt dagens gratis spil', b: 'Kom tilbage i morgen, eller lås op for ubegrænset spil med Lærerplanen.', c: 'Se Lærerplanen' },
      no: { t: 'Du har brukt dagens gratisrunder', b: 'Kom tilbake i morgen, eller lås opp ubegrenset spill med Lærerplanen.', c: 'Se Lærerplanen' },
      fi: { t: 'Olet käyttänyt tämän päivän ilmaiset pelikerrat', b: 'Palaa huomenna, tai avaa rajaton pelaaminen Opettaja-tilauksella.', c: 'Katso Opettaja-tilaus' }
    };
    var C = COPY[LOC] || COPY.en;
    var HOST = 'https://www.lessoncraftstudio.com';

    function showWall() {
      var o = document.createElement('div');
      o.setAttribute('style', 'position:fixed;inset:0;z-index:2147483647;background:rgba(14,84,74,.94);display:flex;align-items:center;justify-content:center;padding:24px;font-family:Nunito,system-ui,sans-serif;text-align:center;');
      o.innerHTML =
        '<div style="max-width:460px;color:#FBF3E4;">' +
        '<h2 style="font-family:\'Baloo 2\',Nunito,sans-serif;font-size:1.6rem;margin:0 0 10px;">' + C.t + '</h2>' +
        '<p style="font-size:1.05rem;line-height:1.5;margin:0 0 20px;">' + C.b + '</p>' +
        '<a href="' + HOST + '/' + LOC + '/pricing?from=deck-wall" style="display:inline-block;background:#F2784B;color:#fff;padding:12px 24px;border-radius:999px;font-weight:700;text-decoration:none;">' + C.c + '</a>' +
        '</div>';
      document.body.appendChild(o);
    }

    function run() {
      fetch(HOST + '/api/quota/check-and-increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'play' }),
        credentials: 'include',
        cache: 'no-store'
      }).then(function (res) {
        if (res.status === 402 || res.status === 401) showWall();
        // 200 / anything else → deck plays (fail-open).
      }).catch(function () { /* network error → fail open */ });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
  } catch (e) { /* metering must never break a deck */ }
})();
