---
name: project-activities-north-star
description: Activities are THE product. Target 500+ K-3 Common Core activities (Math+ELA) at full coverage across 11 locales; 2-builder workflow with non-technical operator.
metadata: 
  node_type: memory
  type: project
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**North star.** Activities are THE product. Target: full K-3 Common Core coverage across BOTH **Math and Literacy/ELA — 500+ activities, uncapped**. Roughly ~250-300 distinct engine-instances, ~4,880 instance-equivalents at one base locale × 11 locales.

**11 locales, canonical Latin-script codes:** en, de, fr, it, es, pt (**Brazilian canonical — NEVER pt-BR**), nl, sv, da, no, fi. Codes are the CONTRACT for slug URLs + manifest keys.

**Two-builder workflow.** A separate Claude instance acts as project manager and writes prompts; this CC instance builds + deploys. The human operator is **non-technical and wants decisions made for him**. Surface only:
1. Live pages to approve (he opens the live URL himself)
2. Genuine business forks (assets he must supply; audience priority; pricing)

**Cadence: one prompt → one activity → one engine at a time.** Each must be 100% complete + deployed + operator-approved before the next starts. Nothing accumulates. Nothing batches.

**Operator-strategic decisions that have already been locked:**
- No timer / no score / no SmartScore / no streak / no countdown anywhere in any activity ([[feedback-activities-approval-cadence]])
- Direction A card design is the approved aesthetic ([[project-activities-architecture]])
- Color-only image assets; localized B&W markers per locale ([[feedback-activities-asset-rules]])
- DA phonics policy: orthographic syllables for K-1, phonemic-divergence awareness grade 2 ([[project-phonics-safety-pipeline]])

**The product is not yet at scale.** Current live surface is ~3 manipulatives + ~14 activities ([[project-activities-live-inventory]]). The next 500+ are the workstream. Build queue triage at [[project-activities-master-queue]].

**Origin:** CC-MEMORY-UPDATE-PROMPT.md commission 2026-05-22.
