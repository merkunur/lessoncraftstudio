/**
 * flashcard-render.ts — Pillar 4 Arc 1 Phase 2 HTML/CSS template builder + PDF render.
 *
 * Sky+v2 design implementation:
 *   - 2:3 portrait card; 60% image; 18% word-band auto-fit; 13% sentence-band; footer
 *   - Theme-color top accent rule (3-4mm)
 *   - Reserved word-band auto-fit horizontal scaling (CSS clamp)
 *   - Soft-hyphen substrate via hyphens: auto + U+00AD soft-hyphen markers
 *   - Sentence: Lexend Deca Regular (NOT italic) + curly quotes + 6% indent + left rule
 *   - Word color #1f2937 (warm slate-800)
 *
 * Emits two HTML kinds:
 *   - Digital viewer (deck-overview strip + single-card-focus modal; vanilla JS nav)
 *   - Print HTML (6-up or 9-up A4 grid with cut guides; piped to Playwright for PDF)
 *
 * PDF render uses Playwright chromium at A4 paper format.
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { chromium, type Browser } from 'playwright';
import { Locale, VocabEntry, buildSentence, displayWord, themeColor } from './flashcard-data';

export interface FlashcardCard {
  vocabKey: string;
  imagePath: string;       // absolute filesystem path to PNG
  themeDir: string;        // image library theme dir name (drives accent color)
  vocab: VocabEntry;
  locale: Locale;
}

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Lexend+Deca:wght@400;500&display=swap" rel="stylesheet">`;

// Convert image to base64 data-URL so HTML deliverables are self-contained
// (no relative-path breakage when sharing or printing via Playwright).
//
// Resize via Sharp to MAX_DIM (default 600px) before embed; preserves aspect
// ratio + transparency. PNG output retained (lossless preserves clean
// flashcard image quality at K-3 reading distance). At 600×600 max with
// PNG-8 quantization, typical embed is ~30-100KB vs raw library PNGs
// at 1-2MB each — keeps validation batch + Arc 2 production output
// manageable for git commit + Cloudflare distribution.
const MAX_DIM = 600;
const _imageCache = new Map<string, string>();
async function imageToDataUrl(imagePath: string): Promise<string> {
  // Cache by content hash so the same source image embedded across multiple
  // locales/decks reuses one Sharp-processed result.
  const stat = fs.statSync(imagePath);
  const cacheKey = `${imagePath}:${stat.mtimeMs}:${stat.size}`;
  const cached = _imageCache.get(cacheKey);
  if (cached) return cached;

  const buf = await sharp(imagePath)
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  const dataUrl = `data:image/png;base64,${buf.toString('base64')}`;
  _imageCache.set(cacheKey, dataUrl);
  return dataUrl;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ----- Common card markup (shared between digital + print) -----

interface PreparedCard extends FlashcardCard {
  dataUrl: string;
}

async function prepareCards(cards: FlashcardCard[]): Promise<PreparedCard[]> {
  const out: PreparedCard[] = [];
  for (const c of cards) {
    const dataUrl = await imageToDataUrl(c.imagePath);
    out.push({ ...c, dataUrl });
  }
  return out;
}

function renderCard(card: PreparedCard): string {
  const word = displayWord(card.vocabKey, card.vocab, card.locale);
  const sentence = buildSentence(card.vocab, card.locale);
  const accent = themeColor(card.themeDir);

  return `
    <article class="card" data-key="${escapeHtml(card.vocabKey)}" data-locale="${card.locale}">
      <div class="accent" style="background:${accent}"></div>
      <div class="image-band"><img src="${card.dataUrl}" alt="${escapeHtml(word)}"></div>
      <div class="word-band"><h2 class="word" lang="${card.locale}">${escapeHtml(word)}</h2></div>
      <div class="sentence-band"><p class="sentence" lang="${card.locale}">&ldquo;${escapeHtml(sentence)}&rdquo;</p></div>
      <div class="footer">LessonCraftStudio</div>
    </article>`;
}

// ----- Sky+v2 base CSS (shared between digital + print) -----

const CARD_CSS = `
  :root {
    --card-border: #e1e4eb;
    --card-bg: #ffffff;
    --card-corner: 8px;
    --word-color: #1f2937;
    --sentence-color: #4a5568;
    --sentence-rule: #cbd2dc;
    --footer-color: #94a3b8;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; color: #222; }

  .card {
    aspect-ratio: 2 / 3;
    background: var(--card-bg);
    border: 2px solid var(--card-border);
    border-radius: var(--card-corner);
    overflow: hidden;
    display: grid;
    grid-template-rows: 4mm 60% 18% 13% 1fr;
    container-type: inline-size;
  }
  .card .accent { width: 100%; }
  .card .image-band {
    display: flex; align-items: center; justify-content: center;
    padding: 8% 12%;
  }
  .card .image-band img {
    max-width: 100%; max-height: 100%; object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
  }
  .card .word-band {
    display: flex; align-items: center; justify-content: center;
    padding: 0 6%;
    overflow: hidden;
  }
  .card .word {
    font-family: 'Fredoka', sans-serif;
    font-weight: 600;
    color: var(--word-color);
    font-size: clamp(14pt, 9cqw, 32pt);
    line-height: 1.05;
    margin: 0;
    text-align: center;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    -webkit-hyphens: auto;
  }
  .card .sentence-band {
    display: flex; align-items: center;
    margin: 0 6%;
    padding-left: 4%;
    border-left: 1px solid var(--sentence-rule);
  }
  .card .sentence {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    color: var(--sentence-color);
    font-size: clamp(9pt, 4.2cqw, 14pt);
    line-height: 1.3;
    margin: 0;
  }
  .card .footer {
    text-align: center;
    font-size: 8pt;
    color: var(--footer-color);
    letter-spacing: 0.04em;
    padding-top: 1mm;
  }
`;

// ----- Digital viewer HTML -----

export interface DeckMetadata {
  title: string;
  locale: Locale;
  packageSlug?: string;
}

export async function renderDigitalViewer(cards: FlashcardCard[], meta: DeckMetadata): Promise<string> {
  const prepared = await prepareCards(cards);
  const cardsHtml = prepared.map((c, i) => `
    <div class="card-wrap" data-idx="${i}">
      ${renderCard(c)}
    </div>`).join('');

  const cardsData = prepared.map((c, i) => ({
    idx: i,
    vocabKey: c.vocabKey,
    word: displayWord(c.vocabKey, c.vocab, c.locale),
  }));

  const css = `
    ${CARD_CSS}
    body { background: #f4f6fa; min-height: 100vh; }
    header {
      padding: 24px;
      display: flex; justify-content: space-between; align-items: baseline;
      border-bottom: 1px solid #e1e4eb;
      background: #ffffff;
    }
    header h1 { font-family: 'Fredoka', sans-serif; font-weight: 600; margin: 0; font-size: 22px; color: #1f2937; }
    header .meta { font-size: 13px; color: #6b7280; }

    /* Deck overview — horizontal scroll strip */
    .deck-overview {
      display: flex;
      overflow-x: auto;
      gap: 16px;
      padding: 24px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .deck-overview .card-wrap {
      flex: 0 0 240px;
      scroll-snap-align: center;
    }
    .deck-overview .card { cursor: pointer; transition: transform 0.15s ease; }
    .deck-overview .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

    /* Modal — single-card-focus primary */
    .modal {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(15, 23, 42, 0.85);
      display: none;
      align-items: center; justify-content: center;
    }
    .modal[data-open="true"] { display: flex; }
    .modal-card {
      width: min(70vw, 540px);
      max-height: 90vh;
      animation: fadeIn 0.18s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }

    .modal-nav {
      position: fixed; top: 50%; transform: translateY(-50%);
      width: 56px; height: 56px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.94);
      border: none; font-size: 28px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s ease;
    }
    .modal-nav:hover { background: #ffffff; }
    .modal-prev { left: 24px; }
    .modal-next { right: 24px; }
    .modal-close {
      position: fixed; top: 16px; right: 16px;
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.94); border: none;
      font-size: 22px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .modal-counter {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
      letter-spacing: 0.05em;
    }

    /* Mobile responsive */
    @media (max-width: 640px) {
      .deck-overview .card-wrap { flex: 0 0 200px; }
      .modal-card { width: 92vw; }
      .modal-nav { width: 44px; height: 44px; font-size: 22px; }
      .modal-prev { left: 8px; }
      .modal-next { right: 8px; }
    }
  `;

  return `<!DOCTYPE html>
<html lang="${meta.locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(meta.title)} — LessonCraftStudio</title>
  ${FONT_LINK}
  <style>${css}</style>
</head>
<body>
  <header>
    <h1>${escapeHtml(meta.title)}</h1>
    <div class="meta">${cards.length} cards · ${meta.locale.toUpperCase()}</div>
  </header>

  <main class="deck-overview" role="list">${cardsHtml}</main>

  <div class="modal" data-open="false" role="dialog" aria-modal="true" aria-label="Flashcard viewer">
    <button class="modal-close" aria-label="Close">×</button>
    <button class="modal-nav modal-prev" aria-label="Previous card">‹</button>
    <div class="modal-card" id="modalSlot"></div>
    <button class="modal-nav modal-next" aria-label="Next card">›</button>
    <div class="modal-counter" id="modalCounter"></div>
  </div>

  <script>
  (function(){
    const cardsData = ${JSON.stringify(cardsData)};
    const modal = document.querySelector('.modal');
    const modalSlot = document.getElementById('modalSlot');
    const modalCounter = document.getElementById('modalCounter');
    const cardWraps = document.querySelectorAll('.deck-overview .card-wrap');
    let currentIdx = 0;

    function openModal(idx){
      currentIdx = idx;
      const sourceCard = cardWraps[idx].querySelector('.card');
      modalSlot.innerHTML = sourceCard.outerHTML;
      modalCounter.textContent = (idx + 1) + ' / ' + cardsData.length;
      modal.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(){
      modal.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    }
    function nav(delta){
      const n = cardsData.length;
      const next = (currentIdx + delta + n) % n;
      openModal(next);
    }

    cardWraps.forEach(function(wrap){
      wrap.addEventListener('click', function(){
        const idx = parseInt(wrap.getAttribute('data-idx'), 10);
        openModal(idx);
      });
    });

    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-prev').addEventListener('click', function(){ nav(-1); });
    document.querySelector('.modal-next').addEventListener('click', function(){ nav(1); });
    modal.addEventListener('click', function(e){
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e){
      if (modal.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') nav(-1);
      else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nav(1); }
    });

    // Touch swipe
    let touchStartX = 0;
    modal.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; });
    modal.addEventListener('touchend', function(e){
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) < 50) return;
      nav(dx > 0 ? -1 : 1);
    });
  })();
  </script>
</body>
</html>`;
}

// ----- Print HTML (6-up + 9-up; piped to Playwright for PDF) -----

export async function renderPrintHtml(cards: FlashcardCard[], opts: { perPage: 6 | 9; locale: Locale }): Promise<string> {
  const { perPage, locale } = opts;
  const prepared = await prepareCards(cards);
  const cols = 3;
  const rows = perPage === 6 ? 2 : 3;

  // A4 = 210mm × 297mm. Page margin 10mm; gap between cards 4mm; cut-line guides
  // are 0.5px solid #cbd2dc lines extending into the gap area for cutting reference.
  const css = `
    ${CARD_CSS}
    @page { size: A4; margin: 10mm; }
    body { background: #ffffff; }

    .grid {
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      grid-template-rows: repeat(${rows}, 1fr);
      gap: 4mm;
      width: 190mm;     /* A4 width 210 - 2×10 margin */
      height: 277mm;    /* A4 height 297 - 2×10 margin */
      page-break-after: always;
    }
    .grid:last-child { page-break-after: auto; }

    /* Cut-line guides — print as faint dashed cross-marks at card corners */
    .card { position: relative; }
    .card::before, .card::after {
      content: '';
      position: absolute;
      width: 4mm; height: 4mm;
      pointer-events: none;
    }
    .card::before {
      top: -2mm; left: -2mm;
      border-top: 0.5px dashed #cbd2dc;
      border-left: 0.5px dashed #cbd2dc;
    }
    .card::after {
      bottom: -2mm; right: -2mm;
      border-bottom: 0.5px dashed #cbd2dc;
      border-right: 0.5px dashed #cbd2dc;
    }

    /* Print-specific tweaks */
    .card .word { font-size: clamp(14pt, 8cqw, ${perPage === 6 ? 30 : 22}pt); }
    .card .sentence { font-size: clamp(8pt, 3.6cqw, ${perPage === 6 ? 13 : 10}pt); }
    .card .footer { font-size: ${perPage === 6 ? 8 : 6}pt; }
  `;

  // Group cards into pages
  const pages: PreparedCard[][] = [];
  for (let i = 0; i < prepared.length; i += perPage) {
    pages.push(prepared.slice(i, i + perPage));
  }

  const pagesHtml = pages.map(pageCards => {
    const cardCells = pageCards.map(c => renderCard(c)).join('');
    // Pad with empty cells if last page short
    const padding = Array(perPage - pageCards.length).fill('<div></div>').join('');
    return `<div class="grid">${cardCells}${padding}</div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <title>Print flashcards ${perPage}-up</title>
  ${FONT_LINK}
  <style>${css}</style>
</head>
<body>${pagesHtml}</body>
</html>`;
}

// ----- PDF render via Playwright -----

let _browserCache: Browser | null = null;
async function getBrowser(): Promise<Browser> {
  if (_browserCache) return _browserCache;
  _browserCache = await chromium.launch({ headless: true });
  return _browserCache;
}

export async function closeBrowser(): Promise<void> {
  if (_browserCache) {
    await _browserCache.close();
    _browserCache = null;
  }
}

export async function renderPdf(html: string, outPath: string): Promise<void> {
  const browser = await getBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  // Allow webfont load
  await page.evaluate(() => (document as any).fonts && (document as any).fonts.ready);
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
  await context.close();
}

export async function writeDigitalViewer(cards: FlashcardCard[], meta: DeckMetadata, outPath: string): Promise<void> {
  const html = await renderDigitalViewer(cards, meta);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf-8');
}

export async function writePrintPdf(cards: FlashcardCard[], opts: { perPage: 6 | 9; locale: Locale }, outPath: string): Promise<void> {
  const html = await renderPrintHtml(cards, opts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
