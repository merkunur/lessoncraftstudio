---
name: project-de-nl-gender-audit-complete
description: "DE+NL gender-code audit in image-vocabulary.js is COMPLETE (136 corrections, 5 commits); the carry-forward list of held twijfel/lemma/plural items is the next-eligible work."
metadata: 
  node_type: memory
  type: project
  originSessionId: 70f9425b-c95e-4a21-82d9-cdfbc4162c00
---

The **DE+NL gender-code audit** of `REFERENCE TRANSLATIONS/image-vocabulary.js` is **COMPLETE** (2026-06). It is the successor to the Nordic gender arc (sv/da/no, 242 corrections) — the two confirmed neuter-bearing locales surfaced during the K.MD.A.1 fan-out's passive probe (DE Lineal, NL Potlood). The neuter-bearing-locale scope (DE+NL after Nordic) is now fully discharged. Romance (fr/es/it/pt) is clean (m/f, no neuter). Method + doctrine live in CLAUDE.md **§A.13.58**; see also [[project-phonics-safety-pipeline]] (gender lives only in image-vocabulary.js, the §6 canonical).

**136 corrections, 5 serial commits, all on `pivot/printable-business-toolkit`:**
- DE = 58 (three-directional): `7bef6173` reverse cluster (5, f→m: der-Schuh/-Stift masculines mis-coded f) · `3735199c` scatter residual (2: Gemüse f→n, Gipsverband n→m — explicit "third-direction residual" micro-commit) · `7aa69cde` default-to-m wave (51, m→n/f: the dominant bug).
- NL = 78 (two-directional): `5310b329` het→d reverse cluster (12: animals + 6 `-hoek` polygons + doos/kist + science/toast) · `c7de1a40` d→het neuter wave (66: the dominant neuter-as-common bug).

**Conventions (per-locale authority, never cross-applied):** DE `m/f/n` = der/die/das (3-gender); NL `d/h` = de(common)/het(neuter) (2-gender). Proof they differ: `rectangle` = das Rechteck (de=`n`) but de rechthoek (nl=`d`).

**Method (all 5 commits):** layered gates (recall-union → same-head-noun sweep → dictionary re-verify Duden/Van Dale) → native re-confirm per batch → surgical per-key line-scoped node rewrite of ONLY the changed locale's gender field → scripted diff (exactly-N keys, that locale field only, all 10 other locales byte-identical) → commit. **image-vocabulary.js-only; no DB/seed/raw-mirror; no re-gate; no pool/rule touch (de/nl pools untracked); no deploy** (gender is generation-time reference, not a live per-request surface).

**Carry-forward (NOT gender defects — held by design; the next-eligible word-quality/content pass):**
- DE: `golf` (der/das twijfel), `pretzels` (lemma-rebuild: singular field holds a plural + duplicates `pretzel`); does-more plurals driftwood Treibholze→Treibhölzer / diamond Diamanten→Rauten / grasshopper Grashüpfer→Heuschrecken (gender shipped, plural held); `diamond` rhombus-vs-gem art-content Q; lotus Lotusblüten lemma; deer Hirsch/Rehe.
- NL: sports twijfel (football/golf/hockey/tennis/table-tennis) + tape + apron/plesiosaurus/grapefruit (all stayed `de`); 8 does-more plurals (calf Kalven→kalveren, padlock Hangslotten→hangsloten, trillium Driebladden→driebladen, trail Padden→paden, medical-chart→medische dossiers, salt Zouten→mass, thunderstorm Onweren→mass, dragon-fruit→uncountable).
- Cross-arc: the rock="boulder"/Felsen wrong-for-purpose set from the fan-out.
