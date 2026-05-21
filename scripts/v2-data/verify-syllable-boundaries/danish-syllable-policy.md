# Danish Syllable Teaching Policy (K-3)

**Version:** 1.0
**Locked:** 2026-05-21
**Authored by:** CC + operator (one-time strategic decision)

## Context

Danish orthography is opaque — many written words have stød / weakened consonants / vocalized post-vocalic /r/ that a beginning reader cannot derive from the spelling. Example: the written word **hund** ("dog") is pronounced [hunˀ] — the final `d` is silent. A K-1 child sees four letters but hears three sounds.

The phonics safety-verification pipeline auto-detects this class of words via the **da-quarantine regex** (5 criteria over NST IPA: stød on V, final-stop weakening, post-vocalic /r/, s-stop unaspiration, ld/nd/rd deletion).

These words are NOT rejected — they enter a **policy-managed quarantine**. This document defines the teaching policy applied to that class.

## The policy (default)

**For Danish K-1 (børnehaveklasse + 1. klasse):**
- Teach **orthographic syllables** — the kid spells `hund` as h-u-n-d (all four letters).
- TTS reads the canonical Danish pronunciation [hunˀ] via the SpeechSynthesis API — the kid hears native pronunciation while building the orthographic form.
- The activity prompt frames the task as "spell what you see" (matching the picture's word in writing), NOT "spell what you hear."

**For Danish grade 2:**
- Introduce **phonemic-divergence awareness** — show that some letters in Danish words are silent or weakened in speech. This is taught as a meta-skill on top of established orthographic spelling, not as a replacement.
- Activities at this level may include explicit "Find the silent letter" exercises using the same quarantined words.

**For Danish grade 3:**
- Continue grade-2 awareness work. No additional curriculum requirement at this stage from this policy doc.

## Editorial source

This policy aligns with **Elbro's lydrethed-first methodology** (Elbro & Pallesen 1991/2003 + Gellert & Elbro 2017). Lydrethed-first means starting K-1 with phonologically transparent (lydrette) words and orthographic spelling, then progressively introducing opaque (ikke-lydrette) patterns as meta-skills.

This is one of two recognized Danish K-1 phonics camps. The alternative — **traditional orthographic-first with awareness deferred to grade 2-3** — is also common and gives substantially similar K-1 classroom experience. Either camp is pedagogically defensible. The default above defers to Elbro because his Center for Læseforskning at KU has the strongest cited research base in modern Danish literacy.

## How the pipeline applies the policy

For each Danish word that the da-quarantine regex flags:
- The word IS included in `approved-words-da.json` (the activity-authoring source of truth).
- The entry carries a `policy_managed: true` field + a `quarantine_reasons` array listing which of the 5 criteria triggered.
- Activity authoring may filter on `policy_managed` to control which words appear at which grade level. K-1 activities can include `policy_managed: true` words as long as the activity TYPE is consistent with the policy (orthographic spelling tasks, not phonemic decomposition).

Words that DON'T trip the regex (the lydrette class) carry `policy_managed: false` and are available for all grades + all activity types.

## How to revisit this policy

Revisiting requires:
1. Operator commission of a new `danish-syllable-policy.md` version.
2. CC reads the new policy + updates the pipeline's policy-application logic (no code change required — the policy is encoded as a runtime config read by the pipeline, NOT hardcoded).
3. Re-run the pipeline → `approved-words-da.json` regenerates with the new policy. Activity authoring re-reads the updated file on next build.

No engine rebuild required. Policy revision is a documentation-and-rerun operation, not a code commission.

## Related files

- `da-grapheme-phoneme.json` — the Danish G-P correspondence table (Juul/Elbro-cited)
- `da-quarantine.js` — the regex-based quarantine detector
- `output/approved-words-da.json` — gated output with policy_managed flags (populated on next pipeline run; SV + FI are the proof locales for this commission)
