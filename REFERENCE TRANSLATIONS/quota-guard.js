/**
 * Quota Guard — free-tier 2/day cap for worksheet-generator app downloads
 *
 * Loaded by every worksheet generator app via:
 *   <script src="/worksheet-generators/js/quota-guard.js?v=1"></script>
 *
 * Intercepts clicks on the user-facing "Download Interactive HTML" button
 * (#downloadInteractiveHtmlBtn) in capture phase. Posts to
 * /api/quota/check-and-increment with the shared lcs_anon_id cookie.
 * Subscribers + bots bypass (server-side); operators bypass (client-side via
 * accessGuard signals); everyone else gets a unified 2/day cap with the
 * catalog gate per CLAUDE.md §7.
 *
 * On HTTP 402 (quota exceeded): show inline subscribe overlay; original
 * click handler does NOT fire.
 *
 * On HTTP 200: re-fire the click programmatically; original handler fires
 * normally (via the __quotaPassed flag to short-circuit re-interception).
 *
 * Operator-only `#exportToCatalogBtn` is intentionally NOT gated.
 *
 * No external dependencies. Vanilla JS + DOM. English-only overlay copy
 * (localization deferred per Tier-1+2-first rollout pattern).
 */
(function () {
  'use strict';

  // Operator-bypass detection. Mirrors access-guard.js conventions.
  function isOperatorContext() {
    try {
      if (window.__accessGuardOperatorMode === true) return true;
      // Tier URL param: operators pass tier != 'free' (see access-guard.js line 18)
      var urlParams = new URLSearchParams(window.location.search);
      var tier = urlParams.get('tier');
      if (tier && tier !== 'free') return true;
      // Stored access token (per access-guard.js localStorage convention)
      var token = (window.localStorage && window.localStorage.getItem('accessToken')) || '';
      if (token && token.length > 0) return true;
    } catch (_) {
      // localStorage may throw under sandboxed iframes; treat as non-operator
    }
    return false;
  }

  var QUOTA_API = '/api/quota/check-and-increment';
  var GATE_SELECTOR = '#downloadInteractiveHtmlBtn';
  var SUBSCRIBE_URL = 'https://www.lessoncraftstudio.com/en#subscription';

  function findGateTarget(el) {
    while (el && el !== document) {
      if (el.matches && el.matches(GATE_SELECTOR)) return el;
      el = el.parentNode;
    }
    return null;
  }

  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'lcs-quota-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:99999',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'background:rgba(0,0,0,0.6)',
      'backdrop-filter:blur(4px)',
      'padding:16px',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    ].join(';');

    var card = document.createElement('div');
    card.style.cssText = [
      'background:#FFF8F0',
      'border-radius:16px',
      'box-shadow:0 20px 50px rgba(0,0,0,0.25)',
      'max-width:480px',
      'width:100%',
      'padding:28px',
    ].join(';');

    var title = document.createElement('h2');
    title.textContent = 'Daily limit reached';
    title.style.cssText = [
      'margin:0 0 12px',
      'font-size:24px',
      'font-weight:600',
      'color:#1A1A1A',
    ].join(';');

    var body = document.createElement('p');
    body.textContent =
      'Free users can download 2 resources per day. Subscribe for unlimited access — $69 per year, cancel anytime.';
    body.style.cssText = [
      'margin:0 0 24px',
      'font-size:16px',
      'line-height:1.5',
      'color:#4A4A4A',
    ].join(';');

    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap';

    var subscribeBtn = document.createElement('a');
    subscribeBtn.href = SUBSCRIBE_URL;
    subscribeBtn.textContent = 'Subscribe — $69/year';
    subscribeBtn.style.cssText = [
      'flex:1',
      'min-width:160px',
      'display:inline-flex',
      'align-items:center',
      'justify-content:center',
      'padding:14px 20px',
      'background:#E07856',
      'color:#FFF8F0',
      'font-weight:500',
      'border-radius:8px',
      'text-decoration:none',
      'cursor:pointer',
    ].join(';');
    subscribeBtn.addEventListener('mouseover', function () {
      subscribeBtn.style.background = '#C76344';
    });
    subscribeBtn.addEventListener('mouseout', function () {
      subscribeBtn.style.background = '#E07856';
    });

    var dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.textContent = 'Maybe later';
    dismissBtn.style.cssText = [
      'flex:1',
      'min-width:120px',
      'padding:14px 20px',
      'background:#E8DDD0',
      'color:#3C3C3C',
      'font-weight:500',
      'border:none',
      'border-radius:8px',
      'cursor:pointer',
      'font-size:16px',
    ].join(';');
    dismissBtn.addEventListener('click', function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    });

    btnRow.appendChild(subscribeBtn);
    btnRow.appendChild(dismissBtn);
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(btnRow);
    overlay.appendChild(card);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.parentNode.removeChild(overlay);
      }
    });

    return overlay;
  }

  function showQuotaOverlay() {
    if (document.getElementById('lcs-quota-overlay')) return;
    var overlay = buildOverlay();
    document.body.appendChild(overlay);
  }

  function onClickGate(e) {
    var btn = findGateTarget(e.target);
    if (!btn) return; // not a download click; passive

    // Re-fire pass-through: original click already validated by quota
    if (btn.__quotaPassed) {
      btn.__quotaPassed = false;
      return; // allow event to propagate to app's listener
    }

    // Operator bypass
    if (isOperatorContext()) return;

    // Re-entry guard during async check
    if (btn.__quotaGateInFlight) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    // Stop the app's handler from firing; we'll re-fire if allowed
    e.preventDefault();
    e.stopImmediatePropagation();
    btn.__quotaGateInFlight = true;

    fetch(QUOTA_API, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'app-gen' }),
    })
      .then(function (res) {
        if (res.status === 402) {
          showQuotaOverlay();
          return null;
        }
        if (!res.ok) {
          // Fail-open on unexpected non-2xx (e.g., 5xx from server outage)
          console.warn('[quota-guard] check failed; failing open', res.status);
        }
        // Allow the download: re-fire click with passed flag
        btn.__quotaPassed = true;
        try {
          btn.click();
        } catch (_) {
          // Some browsers throw on synthetic click; fall back to dispatching
          btn.dispatchEvent(
            new MouseEvent('click', { bubbles: true, cancelable: true })
          );
        }
        return null;
      })
      .catch(function (err) {
        console.warn('[quota-guard] fetch failed; failing open', err);
        btn.__quotaPassed = true;
        try {
          btn.click();
        } catch (_) {
          btn.dispatchEvent(
            new MouseEvent('click', { bubbles: true, cancelable: true })
          );
        }
      })
      .then(function () {
        btn.__quotaGateInFlight = false;
      });
  }

  document.addEventListener('click', onClickGate, true);

  // Diagnostic surface — operator can inspect via console
  window.__LCSQuotaGuard = {
    version: '2',
    selector: GATE_SELECTOR,
    api: QUOTA_API,
    subscribeUrl: SUBSCRIBE_URL,
    isOperatorContext: isOperatorContext,
    showOverlay: showQuotaOverlay,
  };

  // Boot diagnostic — visible in browser console. If operator doesn't see
  // this on app page load, the quota-guard.js script didn't load (stale
  // browser cache, network error, or script tag missing from the HTML).
  try {
    console.log(
      '[quota-guard] loaded v2',
      { isOperator: isOperatorContext(), gateSelector: GATE_SELECTOR, api: QUOTA_API }
    );
  } catch (_) {}
})();
