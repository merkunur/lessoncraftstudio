/**
 * worksheet-host.js — "Save interactive worksheet" (hosted URL) client.
 * 2026-07 subscription launch flagship. Loaded by access-guard.js into every
 * worksheet-generator app (single shared file — no per-app HTML edits).
 *
 * Repurposes #downloadInteractiveHtmlBtn: instead of downloading a file, a
 * subscriber's click renders the app's standalone interactive HTML in memory
 * (the existing page-global downloadInteractiveHtml(canvas, name,
 * {returnString:true})) and POSTs it to /api/worksheets/hosted, receiving a
 * durable /play/w/<linkId> URL + QR, managed from the workspace.
 *
 * States:
 *   admin/subscriber → button revealed + active ("Save interactive worksheet")
 *   anonymous/free   → LAUNCHED=false: button stays hidden (pre-flip dark);
 *                      LAUNCHED=true: button revealed in locked state → upsell.
 * The PDF/JPEG download buttons are untouched — free stays free.
 */
(function () {
  'use strict';

  // Flipped 2026-07-12 together with PRICING_PUBLIC (frontend/config/
  // subscription-launch.ts) — the Teacher plan is LIVE: non-entitled users see
  // the locked save button with the adult-facing upsell.
  var LAUNCHED = true;

  var API_BASE = '';
  var btn = null;
  var tier = 'anonymous';
  var saveEnabled = false;

  var LOCALE = (function () {
    try {
      var m = /[?&]lang=([a-z]{2})/.exec(window.location.search);
      if (m) return m[1];
    } catch (e) {}
    return (document.documentElement.lang || 'en').slice(0, 2);
  })();

  var STRINGS_ALL = {
    en: { save: 'Save interactive worksheet', locked: 'Save interactive worksheet', titlePrompt: 'Name this worksheet', saving: 'Saving…', savedTitle: 'Your worksheet is online', copy: 'Copy link', copied: 'Copied!', open: 'Open', workspace: 'Manage in your workspace', close: 'Close', upsellTitle: 'A Teacher-plan feature', upsellBody: 'Save the worksheets you make and share them with your class by link and QR code.', signIn: 'Sign in', seePlans: 'See the Teacher plan', quota: 'Storage limit reached — delete old worksheets in your workspace.', generateFirst: 'Generate a worksheet first.', error: 'Saving failed — please try again.', brokenImages: 'This worksheet has an image that could not be captured. Try a different theme or regenerate it, then save again.' },
    de: { save: 'Interaktives Arbeitsblatt speichern', locked: 'Interaktives Arbeitsblatt speichern', titlePrompt: 'Name für dieses Arbeitsblatt', saving: 'Wird gespeichert…', savedTitle: 'Dein Arbeitsblatt ist online', copy: 'Link kopieren', copied: 'Kopiert!', open: 'Öffnen', workspace: 'Im Arbeitsbereich verwalten', close: 'Schließen', upsellTitle: 'Eine Funktion des Teacher-Plans', upsellBody: 'Speichere deine Arbeitsblätter und teile sie per Link und QR-Code mit deiner Klasse.', signIn: 'Anmelden', seePlans: 'Zum Teacher-Plan', quota: 'Speicherlimit erreicht — lösche alte Arbeitsblätter im Arbeitsbereich.', generateFirst: 'Erstelle zuerst ein Arbeitsblatt.', error: 'Speichern fehlgeschlagen — bitte erneut versuchen.', brokenImages: 'Dieses Arbeitsblatt enthält ein Bild, das nicht erfasst werden konnte. Wähle ein anderes Thema oder erstelle es neu und speichere erneut.' },
    fr: { save: 'Enregistrer la fiche interactive', locked: 'Enregistrer la fiche interactive', titlePrompt: 'Nom de cette fiche', saving: 'Enregistrement…', savedTitle: 'Votre fiche est en ligne', copy: 'Copier le lien', copied: 'Copié !', open: 'Ouvrir', workspace: 'Gérer dans votre espace', close: 'Fermer', upsellTitle: 'Une fonction du plan Enseignant', upsellBody: 'Enregistrez vos fiches et partagez-les avec votre classe par lien et QR code.', signIn: 'Se connecter', seePlans: 'Voir le plan Enseignant', quota: 'Limite de stockage atteinte — supprimez d’anciennes fiches dans votre espace.', generateFirst: 'Générez d’abord une fiche.', error: 'Échec de l’enregistrement — réessayez.', brokenImages: 'Cette fiche contient une image qui n’a pas pu être capturée. Choisissez un autre thème ou régénérez-la, puis enregistrez de nouveau.' },
    es: { save: 'Guardar ficha interactiva', locked: 'Guardar ficha interactiva', titlePrompt: 'Nombre de esta ficha', saving: 'Guardando…', savedTitle: 'Tu ficha está en línea', copy: 'Copiar enlace', copied: '¡Copiado!', open: 'Abrir', workspace: 'Gestionar en tu espacio', close: 'Cerrar', upsellTitle: 'Una función del plan Teacher', upsellBody: 'Guarda las fichas que creas y compártelas con tu clase por enlace y código QR.', signIn: 'Iniciar sesión', seePlans: 'Ver el plan Teacher', quota: 'Límite de almacenamiento alcanzado: elimina fichas antiguas en tu espacio.', generateFirst: 'Genera primero una ficha.', error: 'No se pudo guardar. Inténtalo de nuevo.', brokenImages: 'Esta ficha tiene una imagen que no se pudo capturar. Prueba con otro tema o vuelve a generarla y guarda de nuevo.' },
    pt: { save: 'Salvar atividade interativa', locked: 'Salvar atividade interativa', titlePrompt: 'Nome desta atividade', saving: 'Salvando…', savedTitle: 'Sua atividade está online', copy: 'Copiar link', copied: 'Copiado!', open: 'Abrir', workspace: 'Gerenciar no seu espaço', close: 'Fechar', upsellTitle: 'Um recurso do plano Teacher', upsellBody: 'Salve as atividades que você cria e compartilhe com a turma por link e QR code.', signIn: 'Entrar', seePlans: 'Ver o plano Teacher', quota: 'Limite de armazenamento atingido — exclua atividades antigas no seu espaço.', generateFirst: 'Gere uma atividade primeiro.', error: 'Falha ao salvar — tente novamente.', brokenImages: 'Esta atividade tem uma imagem que não pôde ser capturada. Tente outro tema ou gere-a novamente e salve de novo.' },
    it: { save: 'Salva la scheda interattiva', locked: 'Salva la scheda interattiva', titlePrompt: 'Nome di questa scheda', saving: 'Salvataggio…', savedTitle: 'La tua scheda è online', copy: 'Copia link', copied: 'Copiato!', open: 'Apri', workspace: 'Gestisci nel tuo spazio', close: 'Chiudi', upsellTitle: 'Una funzione del piano Teacher', upsellBody: 'Salva le schede che crei e condividile con la classe con link e codice QR.', signIn: 'Accedi', seePlans: 'Vedi il piano Teacher', quota: 'Limite di archiviazione raggiunto: elimina vecchie schede nel tuo spazio.', generateFirst: 'Genera prima una scheda.', error: 'Salvataggio non riuscito — riprova.', brokenImages: 'Questa scheda ha un’immagine che non è stato possibile acquisire. Prova un altro tema o rigenerala, poi salva di nuovo.' },
    nl: { save: 'Interactief werkblad opslaan', locked: 'Interactief werkblad opslaan', titlePrompt: 'Naam van dit werkblad', saving: 'Opslaan…', savedTitle: 'Je werkblad staat online', copy: 'Link kopiëren', copied: 'Gekopieerd!', open: 'Openen', workspace: 'Beheren in je werkruimte', close: 'Sluiten', upsellTitle: 'Een functie van het Teacher-plan', upsellBody: 'Sla je werkbladen op en deel ze met je klas via link en QR-code.', signIn: 'Inloggen', seePlans: 'Bekijk het Teacher-plan', quota: 'Opslaglimiet bereikt — verwijder oude werkbladen in je werkruimte.', generateFirst: 'Maak eerst een werkblad.', error: 'Opslaan mislukt — probeer opnieuw.', brokenImages: 'Dit werkblad bevat een afbeelding die niet kon worden vastgelegd. Kies een ander thema of maak het opnieuw en sla opnieuw op.' },
    sv: { save: 'Spara interaktivt arbetsblad', locked: 'Spara interaktivt arbetsblad', titlePrompt: 'Namn på arbetsbladet', saving: 'Sparar…', savedTitle: 'Ditt arbetsblad är online', copy: 'Kopiera länk', copied: 'Kopierad!', open: 'Öppna', workspace: 'Hantera i din arbetsyta', close: 'Stäng', upsellTitle: 'En funktion i Teacher-planen', upsellBody: 'Spara arbetsbladen du skapar och dela dem med klassen via länk och QR-kod.', signIn: 'Logga in', seePlans: 'Se Teacher-planen', quota: 'Lagringsgränsen nådd — ta bort gamla arbetsblad i din arbetsyta.', generateFirst: 'Skapa ett arbetsblad först.', error: 'Det gick inte att spara — försök igen.', brokenImages: 'Det här arbetsbladet har en bild som inte kunde fångas. Prova ett annat tema eller skapa det på nytt och spara igen.' },
    da: { save: 'Gem interaktivt arbejdsark', locked: 'Gem interaktivt arbejdsark', titlePrompt: 'Navn på dette arbejdsark', saving: 'Gemmer…', savedTitle: 'Dit arbejdsark er online', copy: 'Kopiér link', copied: 'Kopieret!', open: 'Åbn', workspace: 'Administrér i dit arbejdsområde', close: 'Luk', upsellTitle: 'En funktion i Teacher-planen', upsellBody: 'Gem de arbejdsark du laver, og del dem med din klasse via link og QR-kode.', signIn: 'Log ind', seePlans: 'Se Teacher-planen', quota: 'Lagergrænsen er nået — slet gamle arbejdsark i dit arbejdsområde.', generateFirst: 'Lav først et arbejdsark.', error: 'Kunne ikke gemme — prøv igen.', brokenImages: 'Dette arbejdsark har et billede, der ikke kunne fanges. Prøv et andet tema, eller lav det igen, og gem på ny.' },
    no: { save: 'Lagre interaktivt arbeidsark', locked: 'Lagre interaktivt arbeidsark', titlePrompt: 'Navn på dette arbeidsarket', saving: 'Lagrer…', savedTitle: 'Arbeidsarket ditt er på nett', copy: 'Kopier lenke', copied: 'Kopiert!', open: 'Åpne', workspace: 'Administrer i arbeidsområdet ditt', close: 'Lukk', upsellTitle: 'En funksjon i Teacher-planen', upsellBody: 'Lagre arbeidsarkene du lager, og del dem med klassen via lenke og QR-kode.', signIn: 'Logg inn', seePlans: 'Se Teacher-planen', quota: 'Lagringsgrensen er nådd — slett gamle arbeidsark i arbeidsområdet ditt.', generateFirst: 'Lag et arbeidsark først.', error: 'Kunne ikke lagre — prøv igjen.', brokenImages: 'Dette arbeidsarket har et bilde som ikke kunne fanges. Prøv et annet tema eller lag det på nytt, og lagre igjen.' },
    fi: { save: 'Tallenna interaktiivinen tehtävä', locked: 'Tallenna interaktiivinen tehtävä', titlePrompt: 'Tehtävän nimi', saving: 'Tallennetaan…', savedTitle: 'Tehtäväsi on verkossa', copy: 'Kopioi linkki', copied: 'Kopioitu!', open: 'Avaa', workspace: 'Hallitse työtilassasi', close: 'Sulje', upsellTitle: 'Teacher-tilauksen ominaisuus', upsellBody: 'Tallenna tekemäsi tehtävät ja jaa ne luokallesi linkillä ja QR-koodilla.', signIn: 'Kirjaudu', seePlans: 'Katso Teacher-tilaus', quota: 'Tallennustila täynnä — poista vanhoja tehtäviä työtilassasi.', generateFirst: 'Luo ensin tehtävä.', error: 'Tallennus epäonnistui — yritä uudelleen.', brokenImages: 'Tässä tehtävässä on kuva, jota ei voitu tallentaa. Kokeile toista teemaa tai luo se uudelleen ja tallenna sitten uudestaan.' },
  };
  var S = STRINGS_ALL[LOCALE] || STRINGS_ALL.en;
  function T(k) { return S[k] || STRINGS_ALL.en[k] || k; }

  function appId() {
    try {
      var f = decodeURIComponent(window.location.pathname.split('/').pop() || '');
      if (/\.html$/.test(f)) return f.replace(/\.html$/, '').replace(/ /g, '-');
    } catch (e) {}
    return null;
  }

  function token() {
    try { return localStorage.getItem('accessToken'); } catch (e) { return null; }
  }

  function track(event, data) {
    try { if (window.umami && window.umami.track) window.umami.track(event, data || {}); } catch (e) {}
  }

  /* ------------------------------ modal ------------------------------ */
  var modalEl = null;
  function closeModal() { if (modalEl) { modalEl.remove(); modalEl = null; } }
  function openModal(innerHtml) {
    closeModal();
    modalEl = document.createElement('div');
    modalEl.setAttribute('style', 'position:fixed;inset:0;z-index:99999;background:rgba(14,84,74,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Nunito,system-ui,sans-serif;');
    var card = document.createElement('div');
    card.setAttribute('style', 'background:#FBF3E4;color:#146B5E;border-radius:16px;max-width:420px;width:100%;padding:24px;box-shadow:0 12px 40px rgba(0,0,0,.25);text-align:center;');
    card.innerHTML = innerHtml;
    modalEl.appendChild(card);
    modalEl.addEventListener('click', function (e) { if (e.target === modalEl) closeModal(); });
    document.body.appendChild(modalEl);
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var BTN_STYLE = 'display:inline-block;margin:6px 4px 0;padding:10px 18px;border-radius:999px;border:0;cursor:pointer;font-weight:700;font-size:.95rem;text-decoration:none;';
  var CORAL = 'background:#F2784B;color:#fff;' + BTN_STYLE;
  var TEAL_OUTLINE = 'background:transparent;color:#146B5E;border:2px solid #146B5E;' + BTN_STYLE;

  function showUpsell() {
    track('save-upsell-shown', { app: appId(), tier: tier });
    openModal(
      '<h2 style="margin:0 0 8px;font-size:1.3rem;">' + esc(T('upsellTitle')) + '</h2>' +
      '<p style="margin:0 0 12px;line-height:1.5;">' + esc(T('upsellBody')) + '</p>' +
      (tier === 'anonymous'
        ? '<a href="/' + LOCALE + '/auth/signin" style="' + TEAL_OUTLINE + '">' + esc(T('signIn')) + '</a>'
        : '') +
      '<a href="/' + LOCALE + '/pricing" data-lcs-pricing style="' + CORAL + '">' + esc(T('seePlans')) + '</a>' +
      '<div><button data-lcs-close style="' + TEAL_OUTLINE + 'margin-top:12px;">' + esc(T('close')) + '</button></div>'
    );
    var p = modalEl.querySelector('[data-lcs-pricing]');
    if (p) p.addEventListener('click', function () { track('save-upsell-pricing-click', { app: appId() }); });
    modalEl.querySelector('[data-lcs-close]').addEventListener('click', closeModal);
  }

  function showSaved(result) {
    openModal(
      '<h2 style="margin:0 0 8px;font-size:1.3rem;">' + esc(T('savedTitle')) + '</h2>' +
      '<img src="' + esc(result.qrUrl) + '" alt="QR" width="160" height="160" style="border-radius:8px;background:#fff;padding:6px;" />' +
      '<p style="margin:12px 0 4px;word-break:break-all;font-size:.9rem;background:#fff;border-radius:8px;padding:8px;">' + esc(result.url) + '</p>' +
      '<button data-lcs-copy style="' + CORAL + '">' + esc(T('copy')) + '</button>' +
      '<a href="' + esc(result.url) + '" target="_blank" rel="noopener" style="' + TEAL_OUTLINE + '">' + esc(T('open')) + '</a>' +
      '<div style="margin-top:12px;"><a href="/' + LOCALE + '/workspace" style="color:#146B5E;font-size:.9rem;">' + esc(T('workspace')) + '</a></div>' +
      '<div><button data-lcs-close style="' + TEAL_OUTLINE + 'margin-top:10px;">' + esc(T('close')) + '</button></div>'
    );
    var copyBtn = modalEl.querySelector('[data-lcs-copy]');
    copyBtn.addEventListener('click', function () {
      try { navigator.clipboard.writeText(result.url); copyBtn.textContent = T('copied'); } catch (e) {}
    });
    modalEl.querySelector('[data-lcs-close]').addEventListener('click', closeModal);
  }

  function showNotice(text) {
    openModal(
      '<p style="margin:0 0 12px;line-height:1.5;">' + esc(text) + '</p>' +
      '<button data-lcs-close style="' + TEAL_OUTLINE + '">' + esc(T('close')) + '</button>'
    );
    modalEl.querySelector('[data-lcs-close]').addEventListener('click', closeModal);
  }

  /* ------------------------------ save flow ------------------------------ */
  function defaultTitle() {
    var base = (document.title || appId() || 'Worksheet').split('-')[0].trim();
    var d = new Date();
    return base + ' · ' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  async function doSave() {
    // Primary path: the per-app closure bridge (window.__lcsWorksheetHost,
    // installed next to each app's download wiring — the app's canvas and
    // exporter are closure-scoped, NOT window globals). Fallback: the rare
    // apps that do attach globals (prepositions).
    var getHtml = null;
    if (window.__lcsWorksheetHost && typeof window.__lcsWorksheetHost.getHtml === 'function') {
      getHtml = window.__lcsWorksheetHost.getHtml;
    } else if (typeof window.downloadInteractiveHtml === 'function' && window.worksheetCanvas) {
      getHtml = function () {
        return window.downloadInteractiveHtml(window.worksheetCanvas, '', { returnString: true });
      };
    }
    if (!getHtml) { showNotice(T('error')); return; }

    var title = window.prompt(T('titlePrompt'), defaultTitle());
    if (title === null) return; // cancelled
    title = title.trim() || defaultTitle();

    var original = btn.textContent;
    btn.textContent = T('saving');
    btn.disabled = true;
    try {
      var html;
      try {
        html = await getHtml();
      } catch (ge) {
        // getHtml (the app's interactive-HTML export) threw — surface WHY.
        console.error('[lcs-save] getHtml failed:', ge);
        var gm = String((ge && ge.message) || ge);
        if (/generate/i.test(gm)) { showNotice(T('generateFirst')); return; }
        if (/tainted|securityerror|snapshot is empty/i.test(gm) || (ge && ge.name === 'SecurityError')) {
          showNotice(T('brokenImages') || 'This worksheet has an image that could not be captured. Try a different theme or regenerate it, then save again.');
          return;
        }
        showNotice(T('error') + ' (' + ((ge && ge.name) || 'Error') + ': ' + gm.slice(0, 120) + ')');
        return;
      }
      if (typeof html !== 'string' || html.length < 50) {
        console.error('[lcs-save] getHtml returned empty/invalid output, length=', html && html.length);
        showNotice(T('brokenImages') || 'This worksheet could not be captured. Try regenerating it, then save again.');
        return;
      }
      var res = await fetch(API_BASE + '/api/worksheets/hosted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token(),
        },
        body: JSON.stringify({ appId: appId(), title: title, locale: LOCALE, html: html }),
      });
      if (res.status === 401 || res.status === 403) { showUpsell(); return; }
      if (res.status === 413) { showNotice(T('quota')); track('worksheet-save-blocked', { reason: 'quota' }); return; }
      if (!res.ok) {
        var body = null;
        try { body = await res.json(); } catch (pe) {}
        var serverErr = (body && body.error) ? body.error : ('HTTP ' + res.status);
        console.error('[lcs-save] server rejected save:', res.status, serverErr);
        showNotice(T('error') + ' (' + serverErr + ')');
        return;
      }
      var data = await res.json();
      track('worksheet-saved', { app: appId(), locale: LOCALE });
      showSaved(data);
    } catch (e) {
      console.error('[lcs-save] unexpected:', e);
      showNotice(T('error') + ' (' + ((e && e.name) || 'Error') + ')');
    } finally {
      btn.textContent = original;
      btn.disabled = false;
      updateLabel();
    }
  }

  /* ------------------------------ wiring ------------------------------ */
  function updateLabel() {
    if (!btn) return;
    var entitled = tier === 'subscriber' || tier === 'admin';
    btn.textContent = (entitled ? '🔗 ' : '🔒 ') + T(entitled ? 'save' : 'locked');
  }

  function activate() {
    btn.classList.remove('lcs-admin-only');
    btn.removeAttribute('disabled'); // generation-state re-disables via app logic
    updateLabel();
    btn.addEventListener(
      'click',
      function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var entitled = tier === 'subscriber' || tier === 'admin';
        if (!entitled) { showUpsell(); return; }
        doSave();
      },
      true // capture phase — suppresses the original download listener
    );
  }

  async function init() {
    btn = document.getElementById('downloadInteractiveHtmlBtn');
    if (!btn || !appId()) return; // PDF-only apps have no interactive export

    var t = token();
    if (t) {
      try {
        var res = await fetch('/api/verify-app-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t },
          body: JSON.stringify({ appId: appId() }),
        });
        var data = await res.json();
        tier = data.tier || 'free';
        saveEnabled = !!(data.features && data.features.saveInteractive);
      } catch (e) { tier = 'free'; }
    }

    var entitled = tier === 'admin' || saveEnabled;
    if (entitled) {
      activate();
    } else if (LAUNCHED) {
      activate(); // locked state: visible, click → upsell
    }
    // !LAUNCHED && !entitled → button stays hidden (pre-flip dark).
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }

  /* ===================================================================
   * Generator DOWNLOAD meter (2026-07-12 metered paywall): PDF / answer-key
   * / JPEG exports count against the 3/month download allowance (free account
   * required — anon → signup). Subscribers/admin bypass. Shared button IDs
   * across all 29 apps (downloadPdfBtn / downloadAnswerKeyPdfBtn /
   * downloadJpegBtn) → one capture-phase intercept, no per-app edits. Server
   * enforces (returns allowed when METERING_ENABLED is off → dark-safe).
   * =================================================================== */
  var DL_BTN_IDS = { downloadPdfBtn: 1, downloadAnswerKeyPdfBtn: 1, downloadJpegBtn: 1 };
  var _bypassMeterClick = false;

  function downloadWall(reason) {
    if (reason !== 'signup_required') { showUpsell(); return; }
    // Anonymous download → the education.com free-account gate.
    openModal(
      '<h2 style="margin:0 0 8px;font-size:1.3rem;">' + esc(T('upsellTitle')) + '</h2>' +
      '<p style="margin:0 0 12px;line-height:1.5;">' + esc(T('upsellBody')) + '</p>' +
      '<a href="/' + LOCALE + '/auth/signup?from=download" style="' + CORAL + '">' + esc(T('signIn')) + '</a>' +
      '<div><button data-lcs-close style="' + TEAL_OUTLINE + 'margin-top:12px;">' + esc(T('close')) + '</button></div>'
    );
    modalEl.querySelector('[data-lcs-close]').addEventListener('click', closeModal);
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('button') : null;
    if (!el || !DL_BTN_IDS[el.id]) return;
    if (_bypassMeterClick) { _bypassMeterClick = false; return; } // our re-dispatch
    if (tier === 'subscriber' || tier === 'admin') return; // unlimited — never intercept
    e.preventDefault();
    e.stopImmediatePropagation();
    fetch('/api/quota/check-and-increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'download' }),
      credentials: 'include', cache: 'no-store'
    }).then(function (res) {
      if (res.ok) { _bypassMeterClick = true; el.click(); return; } // allowed → run the app's own handler
      return res.json().then(function (d) {
        try { if (window.umami) window.umami.track('meter-wall-shown', { kind: 'download', reason: d && d.reason }); } catch (x) {}
        downloadWall(d && d.reason);
      });
    }).catch(function () { _bypassMeterClick = true; el.click(); }); // fail-open
  }, true);
})();
