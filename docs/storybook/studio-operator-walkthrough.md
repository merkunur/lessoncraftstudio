# Storybook Studio — Operator Acceptance Walkthrough

**Purpose.** This is your 20–30 minute hands-on acceptance test of the Storybook Studio. It is the one gate a machine cannot sign off for you: *does the tool feel right to use, and does what you see on screen match what you intend?* Work through the steps in order. At each step there is a **✅ What you should see** line and a **🚩 Report if** line. If anything in a 🚩 line happens, stop and note the step number + what you saw — that is a defect to fix.

You do not need to be technical. Every action is one click or one drag. Nothing you do here can break production — the Studio saves to a scratch story, and nothing deploys.

---

## Before you start

1. Open the Studio in your browser at **`/mini-tools/storybook-studio.html?story=scratch-acceptance`** (the automated suite uses this same page). If a login prompt appears, sign in as you normally would for the admin tools.
2. Have the placeholder art ready — the Studio ships with a built-in placeholder scene + the Pip character, so you can author a whole story without any new art. You will use those.

✅ **What you should see:** a three-part screen — a **page rail** down one side (thumbnails of the story's pages), a large **stage** in the middle showing the current page, and a **properties panel** with the page's settings.
🚩 **Report if:** the page is blank, the stage never loads, or you see a raw error message instead of the editor.

---

## Step 1 — Compose: place, scale, and order a character

1. On the stage, **drag Pip** from where he stands to a new spot (say, the lower-left).
2. In the properties panel, **change Pip's scale** (make him a bit bigger, then a bit smaller).
3. If the page has more than one character or prop, **drag one in front of another** to change the stacking order.

✅ **What you should see:** Pip moves exactly where you drop him (his *feet* land where you point — he is anchored at the feet, not the middle); resizing changes his size smoothly; the one you bring forward covers the one behind.
🚩 **Report if:** Pip jumps to a different spot than where you dropped him, the size snaps to something you didn't choose, or the front/back order doesn't change.

---

## Step 2 — Draw the interaction zone

1. Find the **"draw zone"** (or interaction-area) control and **drag a rectangle** on the stage where the exercise should live — roughly the middle of the page is fine.

✅ **What you should see:** a clearly outlined box appears exactly where you dragged; you can resize it by its corners; the box stays put when you click elsewhere.
🚩 **Report if:** the box appears somewhere other than where you drew it, snaps to a tiny size, or you cannot resize it.

---

## Step 3 — Configure one mechanic

1. On the same page, open the **mechanic (activity) picker** and choose a simple one — **"Listen"** (narration/tap-to-hear) is the quickest.
2. Fill in the small form it shows (for Listen, just confirm the narration line).

✅ **What you should see:** the picker applies your choice and the form fields for that mechanic appear; what you type/pick is kept.
🚩 **Report if:** the picker does nothing, applies the wrong mechanic, or the form is empty/broken.

---

## Step 4 — Edit narration + strings

1. Change the **narration text** for the page (the words Pip "says").
2. If there is a page title or label field, change that too.

✅ **What you should see:** your new words show up on the page immediately (or in the preview at Step 6); the old text is gone.
🚩 **Report if:** your edit doesn't save, or the page still shows the old words after you move away and come back.

---

## Step 5 — Place one Storybook Exercise (SEP)

This is the piece that links the Studio to the 29 worksheet generators.

1. Open the **"place exercise" / SEP** control and add one prepared exercise artifact into the zone you drew in Step 2 (pick any available one — a fill-in, a tap, a drag, or a bar-chart; they all work).

✅ **What you should see:** the exercise drops into your zone and is sized to fit it; the picture/letters/grid look sharp and sit inside the box you drew.
🚩 **Report if:** the exercise lands outside the zone, is squashed/blurry, overlaps Pip, or shows a blank box where the puzzle should be.

---

## Step 6 — Live preview (the real player)

1. Click **"Preview"** (or "Play").

✅ **What you should see:** the page plays exactly like a finished storybook — Pip animates in, the narration plays (or shows as text if sound is off), and the exercise from Step 5 is **fully playable**: you can tap/drag/fill it and it responds, and a friendly "well done" appears when you complete it. No score, no timer, no red X's — just encouragement.
🚩 **Report if:** the preview looks different from the editor (things move or resize), the exercise isn't playable, or you see a score/timer/countdown anywhere.

---

## Step 7 — Export

1. Click **"Export"** (or "Publish to story").

✅ **What you should see:** the export completes with a success message. (Under the hood it runs the same validator the automated suite uses; a green export means the story is structurally sound.)
🚩 **Report if:** export fails with an error you can't act on, or it silently does nothing.

---

## Step 8 — Reopen (round-trip)

1. **Reload the page** (or close and reopen the same `?story=scratch-acceptance` URL).

✅ **What you should see:** everything you did — Pip's new position/size, the zone, the mechanic, your narration edits, the placed exercise — is **still there, exactly as you left it**. Your work auto-saved.
🚩 **Report if:** anything you did is missing, reset, or in a different place after reload.

---

## What "accepted" means

If every ✅ held and no 🚩 fired, the Studio is accepted: composing, zones, mechanics, narration, SEP placement, live preview, export, and round-trip all behave the way you'd expect, and the child-facing rules (no free typing where it shouldn't be, big tap targets, no scores/timers, encouragement-only) held in the preview.

If any 🚩 fired, jot down the **step number, what you did, and what you saw instead** — that list is exactly what gets fixed next.

---

## How this maps to the automated tests (for reference)

You are checking the *feel*; a machine already checks the *mechanics* on every change, so you don't have to:

| This walkthrough | Automated coverage |
|---|---|
| Step 1 place/scale/order | `prove-studio.js` m1 (feet-at-anchor fidelity) + m2 (drag → snapped, saved, undo) |
| Step 2 draw zone / Step 5 SEP | m5 (coordinate invariant: a placed target keeps its spot through moves) |
| Step 3 mechanic | m4 (mechanic picker applies the chosen form) |
| Step 6 preview / Step 7 export | the exercise plays + `validate-story.js` passes (the same gate the 29 apps clear) |
| Step 8 reopen | m2 (persistence + timestamped backup + stale-save rejected) |
| Full re-author of Pip's Picnic | `prove-studio-m7.js` |

Run the automated side yourself any time with:
`node scripts/storybook/prove-studio.js` and `node scripts/storybook/prove-studio-m7.js`.
