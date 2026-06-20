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

## 2. Request indexing on a few top pages (5 minutes) — accelerates recovery
This nudges Google to re-crawl your most important pages immediately (the rest follow on
their own). Do ~10 total:
- Top of the screen there's a **search bar** ("Inspect any URL"). Paste a URL → Enter →
  wait → click **Request Indexing**.
- Paste a few of your **most popular printable PDFs** (these were the pages that lost the
  most traffic — they were blocked from Google and are now un-blocked). Example shape:
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
