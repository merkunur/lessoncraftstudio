---
name: Verification — coverage dimensions emerge from postmortems, not from upfront enumeration
description: After a bug postmortem, the missed coverage dimension joins the verification taxonomy permanently. Each new surfaced bug class adds a dimension; verification design accumulates dimensions over time rather than enumerating them upfront. Image source (theme vs user-upload) is the third dimension surfaced in the Brief A 5A bug-family postmortems.
type: feedback
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
Verification dimensions cannot be enumerated upfront. They emerge from bug postmortems. After a bug exposes a missed dimension, that dimension joins the verification taxonomy permanently and future verifications must declare it. The taxonomy is **accumulated**, not designed in advance.

**Current taxonomy (Brief A 5A bug-family postmortems):**

1. **Shape correctness** — does the actually-observed data match the expected format? Derive assertions from 2–3 real bundle dumps, not from theoretical expectations. (Surfaced by Brief A 5A.2's 5/5 spot-check failures — bundle field shapes were inferred from source-side data construction grep, not from real deck.html DECK_BUNDLE dumps.)

2. **Code-path coverage** — does the test deck exercise the code path under test? A field shape can look right while the test deck silently doesn't trigger the code that would expose a bug. Lucky PASSes mask coverage gaps. (Surfaced by Brief A 5A.3 redo verification round — math-worksheet PASSed shape correctness because the verified deck happened to be a symbol-only puzzle with empty `imageMap`, so the populated-image code path never executed.)

3. **Image source (theme vs user-upload)** — does the test deck use theme-library images (canonical bare-key filenames like `cat.png`) or user-uploaded images (timestamp+hash-suffixed filenames like `camel-1769386104282-2351c8c4.png`)? Both produce valid bundle data but differ in how downstream key-resolution helpers behave. (Surfaced by Brief A 5A.3 Commit 2 spot-check — more-less / prepositions / shadow-match all PASSed shape AND coverage but produced suffixed-key sr-only output because the spot-check decks used theme images while the failing path was user-uploads. Same `LCSImageRef.parseImagePath().key` vs `ImageVocab.keyFromPath()` distinction surfaced once each in math-worksheet — fixed in commit `85f8ff41`, then again in three more apps in commit `eb510be4`, then again in addition + word-scramble in eb510be4.1.)

4. **Path encoding (real URL vs data URL)** — within the user-upload category, image objects can carry either a server-stored `/images/<theme>/<file>` URL path (FileReader.readAsDataURL was NOT used; file went through a server upload endpoint) or a client-side `data:image/...;base64,...` data URL (FileReader → image is never persisted to disk, just embedded inline). Both `keyFromPath` and `parseImagePath` operate on path components that don't exist in data URLs and produce garbage like `wmgyns+6hx4zwaaaabjru5erkjggg==` (base64 fragment with padding chars). The fix is image-object-aware: prefer `img.word || img.name` (the original filename the upload form captured) when `img.path` is a data URL. (Surfaced by Brief A 5A.3 eb510be4 render-verification — operator's deck mixed theme + FileReader uploads; theme images rendered correctly, FileReader uploads produced base64 fragments. eb510be4 fix had handled real-URL uploads only. Resolved in eb510be4.2 via shared `LCSCatalogExport.vocabKeyFromImage(img)` helper that dispatches across all 3 forms.)

5. **Upload-source-vs-Set-membership linkage loss** — even when the upload code captures `{path, word}` correctly into a script-scope array (e.g. `uploadedImages` in more-less), an intermediate UI Set / Map keyed on path-only can sever the path→word linkage before the row data flows into the bundle. Result: the bundle helper gets a bare data-URL string with no recoverable filename, falls through to `null`, and downstream produces empty sr-only text (the worst failure mode — silent rather than visibly garbled). The fix is per-app: at bundle-extraction time, re-pair the bare string against the original upload array to recover `{path, word}` before handing to `vocabKeyFromImage`. (Surfaced by Brief A 5A.3 eb510be4.2 render-verification — more-less Q1 + Q6 produced "Compare the groups of  and ." because the user uploaded via FileReader, the upload handler set `word` correctly, but `selectedImages.add(image.path)` stored only the path. Other apps may have analogous architectures: any place a `Set<path>` or `Map<path, x>` mediates between upload capture and bundle consumption is a candidate failure site. Resolved in eb510be4.3 with a per-app `_reattachUploadWord` helper in more-less; sweep needed for find-and-count, prepositions, shadow-match, addition, word-scramble, math-worksheet to confirm whether their UI mediation layers preserve or sever the linkage.)

6. **Structural-vs-identity coverage** — does the bundle expose enough identity data for downstream consumers to render meaningful descriptions, or only positional/structural data? A bundle can be shape-correct (dim 1), code-path-covered (dim 2), image-source-clean (dim 3), path-encoding-handled (dim 4), and linkage-loss-free (dim 5) — yet still be **structurally undescribable** in screen-reader text because it tells you WHERE puzzle elements are without telling you WHAT they are. Recovery requires bundle-extension code to source the identity-mapping data from the puzzle generator's working state (script-scope variables, source-side assigned-image globals) at extract time. Not derivable from canvas state alone.

   Surfaced by Group B Phase 1 across all three single-puzzle apps:
   - sudoku — bundle had `correctImageIndex` per blank cell but no `imageIndex → vocabKey` dictionary; fix: `uniqueImageKeys` field sourced from script-scope `lastGeneratedImages` (commit `9b54ae4b`)
   - cryptogram — bundle had `cipherLetter` per slot but no `letter → vocabKey` dictionary; fix: `cipherMap` field filtered to legend's used letters and sourced from script-scope `assignedImages` (commits `ac573fe4` → `5775b9c1`)
   - picture-path — bundle had `startCell`/`endCell` positions but no `position → vocabKey` for what's AT those cells; fix: `startCellImage`/`endCellImage`/`legend.items[].vocabKey` sourced from per-mode meta-build sites (commits `5bfa496c` → `8fc9f522`)

   Two of three required asymmetric-verification-budget iteration rounds (the brief anticipated this — novel-shape commits get tighter rounds), confirming the dimension's edge cases include "where exactly in the source-side puzzle generator does the identity data live, and is that location uniform across modes?" The picture-path source-side data-shape fragility (mode-conditional return shapes from generators) is documented separately as refactor-eligible work in `project_deferred_items_queue.md`.

   Companion to dim 5's user-upload linkage loss: dim 5 catches identity loss INSIDE the bundle pipeline (Set/Map keying severs path→word linkage); dim 6 catches identity NEVER ENTERING the bundle pipeline (puzzle generator's working state has the identity but the bundle code didn't capture it).

**The unifying root pattern (the bug family):**

All three dimensions trace to the same root: **code written against the expected/inferred contract rather than the verified contract.**

- Shape correctness fails when the writer infers field shapes from source-side data construction sites instead of dumping real bundles.
- Coverage fails when the writer assumes the test deck exercises all code paths instead of explicitly enumerating which paths the deck triggers.
- Image-source coverage fails when the writer assumes one filename pattern (theme images) covers all real-world inputs instead of testing user-upload inputs separately.

In every case the fix is to verify against a real, representative input — not against an expected-behavior model.

**How to apply:**

1. **Before declaring a verification PASS**, explicitly state which dimensions the test exercised:
   - Shape: did 2+ real bundle dumps drive the assertions?
   - Coverage: which code paths did the test deck trigger? Which did it skip?
   - Image source: did the test deck use theme images, user-uploaded images, or both? If only one, surface as **partial PASS** and request a follow-up deck for the other source.

2. **When a new bug surfaces a missed dimension**, write a memory entry naming the dimension. Add it to the taxonomy. Future verifications declare it. Do not try to retroactively design a complete taxonomy upfront — bug postmortems will surface dimensions you couldn't anticipate.

3. **For sites resolving image keys for vocab lookup specifically:**
   - `LCSImageRef.parseImagePath(path).key` preserves the user-upload filename suffix (`-<13digit>-<hash>` and `-N` numeric variants). Suitable for image-loading paths (webpURL fallback handles the 404), unsuitable for vocab lookup.
   - `ImageVocab.keyFromPath(path)` strips both suffix patterns and returns the canonical bare key. Required for any site that feeds the result into `ImageVocab.singular()` / `.plural()` / `.gender()`.
   - When auditing a new app's bundle-extension code, grep for `parseImagePath` and check each call site: does the resulting `.key` flow into ImageVocab? If yes, switch to `keyFromPath`. If it flows into `imageRefs[theme + '/' + key]` (set+get internally consistent within the bundle), leaving it is functionally OK — runtime falls back to PNG when WebP variant 404s.

4. **Two distinct non-fix categories** (don't conflate when reviewing):
   - **Latent** — no current consumer reads the buggy field, so no visible defect today. Bug becomes real the moment any consumer adds a vocab lookup against the field. **Risk shape: consumer-additive** (someone adds a reader and trips the bug). Decay: stays latent indefinitely until a new reader appears.
   - **Self-consistent** — same code path sets AND reads the field, and a downstream fallback (e.g. webpURL → PNG) silently handles the suffix-bearing case. Bug becomes real if one side is edited without the other. **Risk shape: editor-coupling** (someone changes the set side without the get side, or vice versa). Decay: stays self-consistent until refactored.
   - Future maintainers: when leaving a parseImagePath().key site unfixed, document which category and why. "This is fine" without category-naming invites the next reader to make a different call.

**Don't:**
- Don't try to enumerate every coverage dimension upfront — you'll miss the ones bugs will surface.
- Don't claim PASS on a single image-source category. The deck used theme images? PASS on theme images, partial on the apps' image-source coverage. Request user-upload follow-up.
- Don't retroactively widen old PASS claims to "PASS on all image sources" — they were partial and that's okay; the work is to add the missing dimension to future verifications.

**Originating bugs in this family:**
- Brief A 5A.2 — 5/5 spot-check failures from source-side bundle inference. Methodology change: dump real DECK_BUNDLE.
- Brief A 5A.3 first attempt — verifier regex written against theoretical token types ("expected only letters and operators") missed digit literals in math-worksheet expressions.
- Brief A 5A.3 Commit 2 spot-check — image-source coverage gap. Theme-image deck PASSed; user-uploaded-image deck would have FAILed three more apps that used the same `parseImagePath().key` → vocab lookup pattern.

**Pairs with:** [feedback_bundle_shape_investigation_methodology.md](feedback_bundle_shape_investigation_methodology.md) and [feedback_verification_regex_from_real_samples.md](feedback_verification_regex_from_real_samples.md) — the three entries form one accumulated taxonomy.
