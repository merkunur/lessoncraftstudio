/**
 * Access Guard - Watermark Verification + Session Limiting
 *
 * Loaded by every worksheet generator app.
 *
 * Verifies with the server ON EVERY EXPORT (not just page load).
 * This catches session invalidation that happens after the page loaded.
 *
 * Default: WATERMARK ON. Only removed after positive server confirmation.
 */
(function() {
  'use strict';

  window.__accessVerified = false;
  window.__accessPending = false;

  var urlParams = new URLSearchParams(window.location.search);
  var tier = urlParams.get('tier') || 'free';

  // Determine appId from filename
  var path = window.location.pathname;
  var filename = decodeURIComponent(path.split('/').pop() || '');

  var filenameToAppId = {
    'addition.html': 'addition',
    'subtraction.html': 'subtraction',
    'code addition.html': 'code-addition',
    'more less.html': 'more-less',
    'math puzzle.html': 'math-puzzle',
    'math worksheet.html': 'math-worksheet',
    'alphabet train.html': 'alphabet-train',
    'prepositions.html': 'prepositions',
    'word guess.html': 'word-guess',
    'word scramble.html': 'word-scramble',
    'wordsearch.html': 'wordsearch',
    'cryptogram.html': 'cryptogram',
    'writing.html': 'writing',
    'big small.html': 'big-small',
    'pattern train.html': 'pattern-train',
    'pattern worksheet.html': 'pattern-worksheet',
    'draw and color.html': 'draw-and-color',
    'drawing lines.html': 'drawing-lines',
    'coloring.html': 'coloring',
    'chart count.html': 'chart-count',
    'matching.html': 'matching',
    'grid match.html': 'grid-match',
    'shadow match.html': 'shadow-match',
    'bingo.html': 'bingo',
    'picture sort.html': 'picture-sort',
    'missing pieces.html': 'missing-pieces',
    'odd one out.html': 'odd-one-out',
    'sudoku.html': 'sudoku',
    'picture path.html': 'picture-path',
    'find and count.html': 'find-and-count',
    'find objects.html': 'find-objects',
    'crossword.html': 'crossword',
    'treasure hunt.html': 'treasure-hunt'
  };

  var appId = filenameToAppId[filename] || null;

  /**
   * Show blocking modal when session is invalidated.
   */
  function showSessionExpiredModal() {
    if (document.getElementById('session-expired-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'session-expired-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);';

    var card = document.createElement('div');
    card.style.cssText = 'background:#fff;border-radius:16px;padding:40px;max-width:440px;width:90%;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);';

    var title = document.createElement('h2');
    title.style.cssText = 'font-size:20px;font-weight:700;color:#111827;margin:0 0 12px;line-height:1.3;font-family:system-ui,-apple-system,sans-serif;';
    title.textContent = 'Session Active on Another Device';

    var body = document.createElement('p');
    body.style.cssText = 'font-size:15px;color:#6B7280;line-height:1.6;margin:0 0 28px;font-family:system-ui,-apple-system,sans-serif;';
    body.textContent = 'Your account is currently being used on another device. Only one device can be active at a time. To continue on this device, sign in again.';

    var btn = document.createElement('a');
    btn.href = '/member';
    btn.style.cssText = 'display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#fff;background:#3B82F6;border-radius:10px;text-decoration:none;font-family:system-ui,-apple-system,sans-serif;';
    btn.textContent = 'Sign In Again';

    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(btn);
    overlay.appendChild(card);

    if (document.body) {
      document.body.appendChild(overlay);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(overlay);
      });
    }
  }

  /**
   * Called by export functions via `await waitForAccessCheck()`.
   * Makes a FRESH server call every time to catch session changes.
   */
  window.__accessReady = (function verifyNow() {
    if (tier === 'free' || !appId) {
      window.__accessVerified = false;
      return Promise.resolve(false);
    }

    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch(e) {}
    if (!token) {
      window.__accessVerified = false;
      return Promise.resolve(false);
    }

    window.__accessPending = true;

    return fetch('/api/verify-app-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ appId: appId })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      window.__accessPending = false;
      if (data && data.error === 'session_expired') {
        window.__accessVerified = false;
        showSessionExpiredModal();
        return false;
      }
      if (data && data.hasAccess === true) {
        window.__accessVerified = true;
        return true;
      }
      window.__accessVerified = false;
      return false;
    })
    .catch(function() {
      window.__accessPending = false;
      window.__accessVerified = false;
      return false;
    });
  })();

  /**
   * Re-verify on every export. This is the key function called by
   * `await waitForAccessCheck()` in each app's export functions.
   * Makes a FRESH API call each time — catches session invalidation
   * that happened after page load.
   */
  window.__verifyAccessNow = function() {
    if (tier === 'free' || !appId) {
      window.__accessVerified = false;
      return Promise.resolve();
    }

    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch(e) {}
    if (!token) {
      window.__accessVerified = false;
      return Promise.resolve();
    }

    return fetch('/api/verify-app-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ appId: appId })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && data.error === 'session_expired') {
        window.__accessVerified = false;
        showSessionExpiredModal();
        // Throw to ABORT the export — do not continue with watermark
        throw new Error('SESSION_EXPIRED');
      }
      if (data && data.hasAccess === true) {
        window.__accessVerified = true;
      } else {
        window.__accessVerified = false;
      }
    })
    .catch(function(err) {
      if (err && err.message === 'SESSION_EXPIRED') throw err;
      window.__accessVerified = false;
    });
  };

  /* ── Admin-only UI reveal ───────────────────────────────────────────
     Additive — does NOT touch the watermark / session-limit / tier flow
     above. The worksheet apps tag #exportToCatalogBtn and
     #downloadInteractiveHtmlBtn with class="lcs-admin-only" and hide them
     (plus the adjacent <hr> separators) via a static <style> in the page,
     so they are hidden by default even if this script never runs
     (fail-closed). We REVEAL them only when the server confirms the user is
     an admin, via the same admin-only /api/verify-app-access endpoint the
     watermark gate uses. Token-only (NOT tier-gated) so an admin sees the
     controls regardless of how the app was opened. */
  (function revealAdminControls() {
    function reveal() {
      var els = document.querySelectorAll('.lcs-admin-only');
      for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('lcs-admin-only');
      }
    }
    var atok = null;
    try { atok = localStorage.getItem('accessToken'); } catch (e) {}
    if (!atok) return;                       // no token → stay hidden
    fetch('/api/verify-app-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + atok
      },
      body: JSON.stringify({ appId: appId })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && data.hasAccess === true) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', reveal);
        } else {
          reveal();
        }
      }
    })
    .catch(function() { /* stay hidden on any error */ });
  })();
})();
