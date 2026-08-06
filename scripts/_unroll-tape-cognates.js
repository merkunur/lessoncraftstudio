/* =====================================================================
   _unroll-tape-cognates.js — the ONE auditable exemption list
   ---------------------------------------------------------------------
   Three separate gates assert "no non-EN string is identical to the
   English", because an identical string is normally an untranslated leak.
   It is also, sometimes, a genuine cognate — and a ban that rejects
   correct native prose teaches a panel to reword AROUND it rather than
   report it. This program has bought that defect five times.

   ⚠ THE RULE LIVED IN THREE FILES AND WOULD HAVE BEEN FIXED IN ONE.
   `apply-unroll-tape-locales.js`, `smoke-unroll-tape-locales.js` and the
   generator all carry the same check; the exemption has to travel with
   the ban or the next locale hits it again in whichever file was missed.

   Every entry carries its reason and must be re-justified if this grows.
   An entry is NOT permission to be lazy: it is a claim that the two
   languages genuinely spell the word the same way.
   ===================================================================== */

'use strict';

module.exports = {
  /* Norwegian bokmål for an egg IS "egg". Danish is "Æg" and Swedish is
     "Ägg", so of the eleven only Norwegian collides — which is exactly
     the shape of a real cognate rather than a copy-paste. */
  'no.shapeEgg': 'bokmål for an egg is "egg"; da is Æg and sv is Ägg, so only no collides'
};
