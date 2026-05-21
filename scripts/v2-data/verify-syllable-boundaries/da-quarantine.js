/* =====================================================================
   DANISH QUARANTINE-CLASS DETECTOR
   ---------------------------------------------------------------------
   Per the approved Danish verdict, words tripping any of 5 IPA-regex
   criteria enter the policy-managed quarantine. The verdict identified:

     1. Stød `ˀ` on a vowel with no consonant cue
        e.g., ko [kʰoˀ], sø [sœˀ], bro [bʁoˀ]
     2. Final orthographic stop NOT realized as that stop
        e.g., hund [hunˀ] (d silent), æg [ɛˀg]~[ɛˀ] (g weak/silent),
              bog [bɔˀw] (g → [w]), brød [bʁœðˀ] (d → [ð])
     3. Post-vocalic <r> realized as [ɐ̯] (vocalized)
        e.g., bjørn [bjœɐ̯n], bord [boɐ̯ˀ], mor, far
     4. Initial unaspirated stop after <s> (st/sk → [sd/sg])
        e.g., stol [sdoˀl], sko, ski
     5. Word containing <ld nd rd> clusters with deletion
        e.g., hold, lande, hård

   These words can still be APPROVED for activities — they go to a
   "policy-managed quarantine" rather than rejection. The Danish
   curriculum policy doc (danish-syllable-policy.md) defines how each
   class is handled (default: orthographic syllables for K-1, phonemic
   awareness in grade 2). Pipeline marks the word as policy-managed +
   includes per-criterion flags so activity authoring can filter.
   ===================================================================== */

'use strict';

/* Operates on NST SAMPA strings (preferred) OR Wiktionary IPA strings.
   SAMPA → IPA conversion is approximate but stødt and reduction markers
   are preserved. For Danish NST, stød is marked with `'` (apostrophe
   immediately after the stressed vowel/syllable). We detect that. */

function detectStodOnVowelNoConsonantCue(ipa, orthographicWord) {
  if (!ipa) return false;
  // Stød (ˀ in IPA, ' in SAMPA) on a vowel where the corresponding written
  // word has no final consonant. Very short words like ko, sø, bro, fri.
  const hasStod = /[ˀ']/.test(ipa);
  if (!hasStod) return false;
  // Heuristic: written word is V+ final (no consonant at end) — e.g., 'ko' or 'sø'
  // OR written word is CV (one consonant + one vowel) — also a stød trap
  if (typeof orthographicWord !== 'string') return false;
  const lower = orthographicWord.toLowerCase();
  const lastChar = lower.charAt(lower.length - 1);
  const vowels = /^[aeiouyæøå]$/;
  return vowels.test(lastChar);
}

function detectFinalStopNotRealized(ipa, orthographicWord) {
  if (!ipa || !orthographicWord) return false;
  const lower = orthographicWord.toLowerCase();
  const lastChar = lower.charAt(lower.length - 1);
  // Written word ends in d, g, t (final stop)
  if (!'dgt'.includes(lastChar)) return false;
  // Check if the IPA reveals weakening: final ð, ɣ, w, ∅ instead of d/g/t
  // SAMPA equivalents: d → D|w|∅, g → w|G|∅, t → D|∅
  const lastIpaSegment = ipa.replace(/[ˀ'\[\]\/]/g, '').slice(-3);
  if (lastChar === 'd' && /[Dðw]|^[^dt]+$/i.test(lastIpaSegment)) return true;
  if (lastChar === 'g' && /[Gɣwj]|^[^gk]+$/i.test(lastIpaSegment)) return true;
  if (lastChar === 't' && /[Dðd]|^[^t]+$/i.test(lastIpaSegment)) return true;
  return false;
}

function detectPostVocalicR(ipa, orthographicWord) {
  if (!ipa || !orthographicWord) return false;
  // Written word has post-vocalic r (VrX or Vr-final)
  const hasPostVocR = /[aeiouyæøå]r/i.test(orthographicWord);
  if (!hasPostVocR) return false;
  // IPA vocalized [ɐ̯] OR SAMPA [6] in that position
  return /ɐ̯|6/i.test(ipa);
}

function detectSStopCluster(ipa, orthographicWord) {
  if (!ipa || !orthographicWord) return false;
  // Written word starts with s + stop (sk, st, sp)
  if (!/^s[ktp]/i.test(orthographicWord)) return false;
  // IPA realizes as [sg], [sd], [sb] — unaspirated stop after s
  return /^sg|^sd|^sb|^sG|^sD|^sB/i.test(ipa.replace(/[\[\]\/]/g, ''));
}

function detectLdNdRdDeletion(ipa, orthographicWord) {
  if (!ipa || !orthographicWord) return false;
  // Written word has ld, nd, rd cluster
  if (!/(ld|nd|rd)/i.test(orthographicWord)) return false;
  // IPA shows deletion of the d
  // Look for the cluster in written form and a matching deletion in IPA
  // Approximate: count d's in written vs IPA — if written has more, deletion happened
  const writtenDs = (orthographicWord.toLowerCase().match(/d/g) || []).length;
  const ipaCleaned = ipa.replace(/[\[\]\/ˀ'ː.\s]/g, '');
  const ipaDs = (ipaCleaned.match(/[dD]/gi) || []).length;
  return writtenDs > ipaDs;
}

/**
 * Apply all 5 quarantine criteria to a Danish word.
 * @param {string} orthographicWord  the written Danish word
 * @param {string} ipa                NST SAMPA or Wiktionary IPA string
 * @returns {{ flagged: bool, reasons: string[] }}
 */
function checkDanishQuarantine(orthographicWord, ipa) {
  const reasons = [];
  if (detectStodOnVowelNoConsonantCue(ipa, orthographicWord)) reasons.push('stod_on_vowel_no_consonant_cue');
  if (detectFinalStopNotRealized(ipa, orthographicWord)) reasons.push('final_stop_not_realized');
  if (detectPostVocalicR(ipa, orthographicWord)) reasons.push('post_vocalic_r_vocalized');
  if (detectSStopCluster(ipa, orthographicWord)) reasons.push('s_stop_cluster_unaspirated');
  if (detectLdNdRdDeletion(ipa, orthographicWord)) reasons.push('ld_nd_rd_cluster_deletion');
  return { flagged: reasons.length > 0, reasons };
}

module.exports = {
  checkDanishQuarantine,
  detectStodOnVowelNoConsonantCue,
  detectFinalStopNotRealized,
  detectPostVocalicR,
  detectSStopCluster,
  detectLdNdRdDeletion
};
