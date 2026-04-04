/**
 * Access Guard - Server-Side Watermark Verification
 *
 * This script MUST be loaded by every worksheet generator app.
 * It verifies with the server that the user actually purchased the app
 * before allowing watermark-free exports.
 *
 * Default behavior: WATERMARK ON (safe default)
 * Only removes watermark after positive server verification.
 *
 * Three states:
 *   __accessVerified = false  (default, watermark on)
 *   __accessVerified = true   (server confirmed, watermark off)
 *   __accessPending = true    (verification in progress)
 */
(function() {
  'use strict';

  // Global flags
  window.__accessVerified = false;
  window.__accessPending = false;
  // Promise that resolves when verification is complete
  window.__accessReady = Promise.resolve(false);

  var urlParams = new URLSearchParams(window.location.search);
  var tier = urlParams.get('tier') || 'free';

  // If tier is free, no verification needed
  if (tier === 'free') {
    return;
  }

  // For any non-free tier, verify with server
  var token = null;
  try {
    token = localStorage.getItem('accessToken');
  } catch (e) {
    // localStorage not available
  }

  if (!token) {
    console.warn('[Access Guard] No auth token found. Watermark enforced.');
    return;
  }

  // Determine appId from the current filename
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

  var appId = filenameToAppId[filename];
  if (!appId) {
    console.warn('[Access Guard] Unknown app: ' + filename + '. Watermark enforced.');
    return;
  }

  // Mark as pending and start verification
  window.__accessPending = true;

  window.__accessReady = fetch('/api/verify-app-access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'X-Device-Id': (function() { try { return localStorage.getItem('lcs_device_id_v2') || ''; } catch(e) { return ''; } })()
    },
    body: JSON.stringify({ appId: appId })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    window.__accessPending = false;
    if (data && data.error === 'session_expired') {
      try { window.dispatchEvent(new CustomEvent('session-expired')); } catch(e) {}
      window.__accessVerified = false;
      return false;
    }
    if (data && data.hasAccess === true) {
      window.__accessVerified = true;
      console.log('[Access Guard] Access verified for: ' + appId);
      return true;
    } else {
      window.__accessVerified = false;
      console.warn('[Access Guard] Access DENIED for: ' + appId);
      return false;
    }
  })
  .catch(function(err) {
    window.__accessPending = false;
    window.__accessVerified = false;
    console.warn('[Access Guard] Verification failed. Watermark enforced.', err);
    return false;
  });
})();
