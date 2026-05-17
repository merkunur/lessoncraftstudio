/**
 * Sign-in Guard — replaces quota-guard.js per CLAUDE.md §7
 * (post-subscription-pivot, 2026-05-17).
 *
 * Loaded by every worksheet generator app via:
 *   <script src="/worksheet-generators/js/signin-guard.js?v=1"></script>
 *
 * Intercepts clicks on the user-facing "Download Interactive HTML" button
 * (#downloadInteractiveHtmlBtn) in capture phase. If the user is signed
 * in (operator-context detection mirrors access-guard.js conventions),
 * the click passes through. Otherwise the user is redirected to the
 * signup page with the current app URL preserved as ?redirect=.
 *
 * No daily cap, no quota counter — the platform is free for any signed-in
 * teacher. The signup gate exists to prevent bots from abusing the
 * downloads endpoint.
 *
 * Operator-only #exportToCatalogBtn is intentionally NOT gated.
 */
(function () {
  'use strict';

  // Signed-in detection. Mirrors access-guard.js + auth-context conventions.
  function isSignedIn() {
    try {
      // Operator-context bypass (admin path)
      if (window.__accessGuardOperatorMode === true) return true;
      var urlParams = new URLSearchParams(window.location.search);
      var tier = urlParams.get('tier');
      if (tier && tier !== 'free') return true;
      // localStorage token check — auth-context stores accessToken
      var token = (window.localStorage && window.localStorage.getItem('accessToken')) || '';
      if (token && token.length > 0) return true;
    } catch (_) {
      // localStorage may throw in sandboxed contexts
    }
    return false;
  }

  var GATE_SELECTOR = '#downloadInteractiveHtmlBtn';
  var SIGNUP_PATH = '/en/auth/signup';

  function findGateTarget(el) {
    while (el && el !== document) {
      if (el.matches && el.matches(GATE_SELECTOR)) return el;
      el = el.parentNode;
    }
    return null;
  }

  function redirectToSignup() {
    var currentUrl = window.location.pathname + window.location.search;
    var dest = SIGNUP_PATH + '?redirect=' + encodeURIComponent(currentUrl);
    window.location.href = dest;
  }

  function onClickGate(e) {
    var btn = findGateTarget(e.target);
    if (!btn) return;

    if (isSignedIn()) {
      // Pass-through — let the app's existing listener run
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
    redirectToSignup();
  }

  document.addEventListener('click', onClickGate, true);

  window.__LCSSignInGuard = {
    version: '1',
    selector: GATE_SELECTOR,
    signupPath: SIGNUP_PATH,
    isSignedIn: isSignedIn,
  };

  try {
    console.log('[signin-guard] loaded v1', {
      signedIn: isSignedIn(),
      gateSelector: GATE_SELECTOR,
    });
  } catch (_) {}
})();
