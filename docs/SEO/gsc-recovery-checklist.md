# Google Search Console — recovery checklist (operator)

After the SEO recovery work (Parts 1, 1.5, 2 — June 2026), the technical SEO is healthy
and the fixes are live. Google now needs to **re-crawl** to reflect them. These are the
only steps that need YOU (I have no access to your Search Console). None are urgent — the
recrawl happens on its own — but these accelerate it and let you watch the recovery.

Open Google Search Console: https://search.google.com/search-console (sign in with the
account that owns the site). Pick the **`www.lessoncraftstudio.com`** property. One
property covers all 11 languages (they're folders like `/de/`, `/es/` under the same site).

## 1. Re-submit the sitemap (1 minute) — do this first
The sitemap just grew (≈13,000 worksheet pages were wrongly hidden from Google and are now
back in it). Make Google re-read it:
- Left menu → **Sitemaps**.
- If `sitemap.xml` is already listed: click the **⋮** next to it → **Remove**, then re-add
  it (re-adding forces a fresh read). If it's not listed, just add it.
- In the "Add a new sitemap" box type **`sitemap.xml`** → **Submit**.
- Over the next days it should show "Success" with a rising "Discovered URLs" count.

## 2. Request indexing — START WITH THE WORKSHEET-MAKER PAGES (highest priority)
This nudges Google to re-crawl pages immediately (Google allows ~10/day). Do the
worksheet-maker pages FIRST — they were your **single biggest traffic source** before the
pivot accidentally told Google they were permanently gone (a 410), which deleted them from
the index. They were rebuilt 6 days ago and are now technically perfect, but Google is slow
to revisit pages it was told were gone — so they need a manual nudge. **This is likely your
biggest single recovery opportunity.**

- Top of the screen there's a **search bar** ("Inspect any URL"). Paste a URL → Enter →
  wait → click **Request Indexing**.
- **Day 1 — the ~10 maker pages you most want back** (English first; they rank fastest):
  `https://www.lessoncraftstudio.com/en/tools/addition-worksheet-maker`
  …then `subtraction-worksheet-maker`, `wordsearch-maker`, `crossword-maker`,
  `sudoku-maker`, `cryptogram-maker`, `matching-worksheet-maker`, `bingo-maker`,
  `coloring-worksheet-maker`, `tracing-worksheet-maker` (same `/en/tools/<name>` shape;
  if unsure of a name, open `https://www.lessoncraftstudio.com/en/worksheet-makers` and
  copy the links).
- **Day 2+** — repeat with the German/Spanish/French versions of your top makers
  (e.g. `/de/tools/additions-arbeitsblatt-ersteller`, `/es/tools/generador-fichas-suma`),
  and a few more makers, ~10/day. The other ~340 maker pages will be re-found automatically
  via the sitemap over the following weeks — the manual requests just speed up the top ones.
- **Then the printable PDFs** (the other big lost-traffic group — now un-blocked):
  `https://www.lessoncraftstudio.com/en/decks/addition-image-image/addition-image-image-printable.pdf`
- And a few **worksheet pages**, e.g. `https://www.lessoncraftstudio.com/en/worksheets/...`
- (If you don't know your top URLs, use the **Performance** report → sort by Clicks → pick
  the top few and request indexing on each.)

## 3. Watch these three reports over the next 2–6 weeks
Recovery is gradual (Google re-crawls over days→weeks). Check weekly:

**a) Performance** (left menu → **Performance** → "Search results"):
- Total **Clicks** is the headline number — it should trend back up toward ~80/day.
- Click the **+ New** filter → **Search appearance** or filter the **Pages** tab by
  `/decks/` and by `.pdf` to see the PDF traffic returning specifically.

**b) Pages** (left menu → **Indexing → Pages**):
- The bucket **"Excluded by 'noindex' tag"** should **shrink** (your PDFs were in here; as
  Google re-crawls them, they leave it and become indexed).
- Watch **"Crawled – currently not indexed"** — some long-tail worksheets sit here; it's
  normal for a large site, but it shouldn't balloon.

**c) Sitemaps** (left menu → **Sitemaps**):
- "Discovered URLs" should rise as Google reads the bigger sitemap.

## 4. Page-speed check (5 minutes) — gives me data to optimize
Page speed is a Google ranking factor I couldn't measure myself (Google's automated tool
blocks repeated requests without a paid key). Please run it manually — it's free and easy:

- Go to **https://pagespeed.web.dev**
- Paste each of these 3 URLs, one at a time, and click **Analyze** (wait ~30s each):
  1. `https://www.lessoncraftstudio.com/en`  (homepage)
  2. `https://www.lessoncraftstudio.com/en/worksheets/addition-image-image-animals-kindergarten`  (a worksheet page)
  3. `https://www.lessoncraftstudio.com/en/decks/chart-count-winter/`  (a printable deck)
- Make sure the **Mobile** tab is selected (top of the results).
- For each, tell me **just 4 numbers** from the results:
  - the big **Performance** score (0–100, the colored circle)
  - **LCP** (Largest Contentful Paint, in seconds)
  - **INP** (Interaction to Next Paint, in milliseconds) — may say "no data"
  - **CLS** (Cumulative Layout Shift, a small decimal)
- Paste those back to me. If any score is poor (Performance under ~70, LCP over 2.5s,
  CLS over 0.1), I'll do a targeted speed‑optimization pass on the exact problem. If
  they're green, we leave speed alone.

## What's normal (so you don't worry)
- **PDFs**: re-index over days to a few weeks. This is the biggest single recovery lever
  (they were the main lost traffic) — expect the clearest improvement here.
- **Worksheet pages**: these are newer URLs; ranking them takes longer (weeks→months) —
  that's Google deciding they deserve ranking, not a bug.
- You do **not** need to do anything else technical. If clicks haven't started recovering
  after ~4 weeks, tell me and we'll dig into the Performance data together.

## Background: what was fixed (for reference)
- **Part 1**: your printable PDFs were accidentally blocked from Google (`noindex`) since
  ~May 31 — that's what dropped clicks 80→15. Un-blocked. Also fixed ~8,900 PDFs whose
  download links were broken (404).
- **Part 1.5**: every PDF now has proper keyword-rich, localized titles/descriptions
  (the only text Google can read inside an image-based PDF).
- **Part 2**: ~13,000 worksheet pages were wrongly hidden from the sitemap — restored.

---

## Update — 2026-06-25 (deck-card PDF/404 + indexation fixes)
Three more fixes are now live. **Re-submit the sitemap again** (Section 1) so Google reads them; otherwise no new action is required — these clear on their own as Google re-crawls.

1. **~8,800 deck-card PDF + answer-key links were 404** (the link pointed at an old filename; the file had been renamed). Fixed everywhere, AND the ~17,000 old PDF URLs Google already knew now **redirect (301)** to the working file. → In **Indexing → Pages**, the **"Not found (404)"** bucket (the PDF/answer-key 404s you saw) should **shrink** over the coming weeks.
2. **Two new things are in the sitemap now:** (a) the **worksheet-maker hub pages** (`/<lang>/worksheet-makers`) — the category page for your #1 traffic source — were missing; (b) your **worksheet (landing) pages now carry their image** in the sitemap (helps Google Images show the worksheet thumbnail). Both picked up automatically when you re-submit the sitemap.
3. **About the "Duplicate, Google chose different canonical" count** in **Indexing → Pages**: this is **NORMAL and healthy**, not an error. Each worksheet has ONE page Google indexes (its `/worksheets/…` page); the matching `/decks/…` page intentionally points at it so the same worksheet doesn't appear twice. You don't need to fix these.

**Request-Indexing priority (Section 2), revised order:** (1) the worksheet-maker pages + the **`/en/worksheet-makers` hub**; (2) your top printable PDFs; (3) a few top `/worksheets/…` pages. **Checkpoint:** if clicks haven't started climbing by **~July 10**, tell me and we'll look at the Performance data together (the worksheet pages are newer URLs and can take several weeks to rank).
