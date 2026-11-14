#!/usr/bin/env node
/**
 * Writes lcs-meter.js, the ONE script every interactive deck page loads (inject-meter.js put its tag into the
 * decks; the file itself is served from /worksheet-generators/js/ and replaced in place with update-worksheet.sh,
 * so no deck page is rewritten when it changes).
 *
 *   node scripts/publish-cli/build-lcs-meter.js          writes REFERENCE TRANSLATIONS/lcs-meter.js and
 *                                                        scripts/class-results/web/lcs-meter.js (the same bytes)
 *   node scripts/publish-cli/build-lcs-meter.js --check  exit 1 when the two files are not what this script writes
 *
 * The three walls are in eleven languages. Two of them come from files a native reader has seen, so the deck wall
 * and the site say the same words: content/play-wall/ui.json (no account) and content/verify-email/ui.json (an
 * account whose e-mail is not confirmed). The third (the day's plays are used) is the text the script has carried
 * since 2026-07-12.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const wall = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'play-wall', 'ui.json'), 'utf8'));
const verify = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'verify-email', 'ui.json'), 'utf8'));
const USED = {
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
  fi: { t: 'Olet käyttänyt tämän päivän ilmaiset pelikerrat', b: 'Palaa huomenna, tai avaa rajaton pelaaminen Opettaja-tilauksella.', c: 'Katso Opettaja-tilaus' },
};
const COPY = {};
for (const loc of LOCS) {
  const w = wall[loc], v = verify[loc];
  if (!w || !v) throw new Error(loc + ': a wall text is missing');
  COPY[loc] = { used: USED[loc], signup: { t: w.title, b: w.body, c: w.cta, s: w.signIn }, verify: { t: v.panelTitle, b: v.panelBody, c: v.panelCta } };
}

const SOURCE = `/**
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
      if (/^\\/(?:[a-z]{2}\\/?)?$/.test(parentPath)) return;  // our homepage: the one sample
    }

    var LOC = (function () {
      try {
        if (window.DECK_BUNDLE && DECK_BUNDLE.contentLanguage) return String(DECK_BUNDLE.contentLanguage).slice(0, 2);
      } catch (e) {}
      return (document.documentElement.lang || 'en').slice(0, 2);
    })();

    var COPY = ${JSON.stringify(COPY)};
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
        '<h2 style="font-family:\\'Baloo 2\\',Nunito,sans-serif;font-size:1.6rem;line-height:1.25;margin:0 0 10px;">' + esc(c.t) + '</h2>' +
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
`;

const targets = [path.join(REPO, 'REFERENCE TRANSLATIONS', 'lcs-meter.js'), path.join(REPO, 'scripts', 'class-results', 'web', 'lcs-meter.js')];
// a script that requires this file (the gate) gets SOURCE and COPY; only a direct run writes or checks
if (require.main !== module) { /* required: nothing is written */ } else if (process.argv.includes('--check')) {
  const off = targets.filter((t) => !fs.existsSync(t) || fs.readFileSync(t, 'utf8').replace(/\r\n/g, '\n') !== SOURCE);
  if (off.length) { console.log('lcs-meter.js is not what build-lcs-meter.js writes: ' + off.map((t) => path.relative(REPO, t)).join(', ') + ' (run node scripts/publish-cli/build-lcs-meter.js)'); process.exit(1); }
  console.log('lcs-meter.js: both copies are the build of today\'s texts');
} else {
  for (const t of targets) fs.writeFileSync(t, SOURCE);
  console.log('wrote ' + targets.length + ' copies of lcs-meter.js (' + SOURCE.length + ' bytes)');
}
module.exports = { SOURCE, COPY };
