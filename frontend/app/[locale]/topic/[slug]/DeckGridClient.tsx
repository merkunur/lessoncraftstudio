'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { wwwImg } from '@/lib/img-host';
import AddToCollectionButton from '@/components/catalog/AddToCollectionButton';
import ShareDeckButton from '@/components/catalog/ShareDeckButton';
import BulkSelectModeToggle from '@/components/catalog/BulkSelectModeToggle';
import DeckCardCheckbox from '@/components/catalog/DeckCardCheckbox';
import BulkSelectToolbar, { BulkAction } from '@/components/catalog/BulkSelectToolbar';
import BulkAddToCollectionPicker from '@/components/catalog/BulkAddToCollectionPicker';
import ShareLinkResultModal, { ShareLinkResult } from '@/components/catalog/ShareLinkResultModal';
import { useQuotaModal } from '@/components/quota/QuotaExceededModal';
import { meterAction } from '@/lib/client-meter';

// Tool 5A — client wrapper extraction from the topic page's inline grid.
// Owns bulk-mode state + selection state + per-card affordances. Per §17.4
// SEO doctrine, the parent server component still SSRs the page chrome,
// header, hreflang, and the schema.org JSON-LD. Only the deck grid + bulk
// affordances become client. Per Q-r: in-page selection only — selection
// clears on navigation away.

export interface TopicDeckCardData {
  id: string;
  slug: string;
  language: string;
  title: string;
  /**
   * Richer image-search-friendly alt text composed server-side by
   * `buildDeckRichAlt` (frontend/lib/deck-seo.ts) from the deck's
   * exercise-type + theme + educational-level taxonomy entries. Falls
   * back to the bare title when taxonomy lookup fails. Added 2026-05-27
   * per external SEO audit (image-search query alignment).
   */
  richAlt: string;
  href: string;
  thumbnailUrl: string;
  pdfUrl: string;
  answerKeyUrl: string | null;
}

interface DeckGridClientProps {
  decks: TopicDeckCardData[];
  labels: {
    playLink: string;
    pdfLink: string;
    answerKeyLink: string;
  };
}

export default function DeckGridClient({
  decks,
  labels,
}: DeckGridClientProps) {
  const t = useTranslations('bulk');
  // Per-deck-card aria-labels for the thumbnail link, Play link, PDF link,
  // and answer-key link. Same-card surfaces all link to different resources;
  // without aria-labels screen readers and image-search crawlers can't
  // disambiguate "PDF" vs "answer key" vs "play" on the same card. Added
  // 2026-05-27 per external SEO audit (accessibility + image-search SEO).
  const tCard = useTranslations('topicPage.deckCard');

  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDeckIds, setSelectedDeckIds] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [shareResults, setShareResults] = useState<{
    results: ShareLinkResult[];
    skippedCount: number;
  } | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Quota-gated click handler for the Play link. POSTs to
  // /api/quota/check-and-increment; on 200 (allowed) navigates to the deck
  // page; on 402 (blocked) shows the QuotaExceededModal without navigation.

  const { showQuotaModal, QuotaModalElement } = useQuotaModal();

  const flashConfirmation = useCallback((msg: string) => {
    setConfirmation(msg);
    setTimeout(() => setConfirmation(null), 2500);
  }, []);

  // Metered PLAY: intercept the deck-page navigation, meter, then proceed or
  // show the wall. Metering is off (env) until the launch flip → proceed always.
  const handlePlay = useCallback(
    async (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      const { proceed, detail } = await meterAction('play');
      if (proceed) window.location.href = href;
      else showQuotaModal(detail);
    },
    [showQuotaModal]
  );

  // Topic-pack ZIP (Teacher plan): zips the SELECTED decks' printable PDFs
  // client-side with the already-shipped JSZip (no new dependency, no server
  // endpoint — each PDF is individually free; the pack is convenience).
  const PACK_MAX = 30;
  async function handleDownloadPack() {
    const ids = Array.from(selectedDeckIds);
    if (ids.length === 0) return;
    if (ids.length > PACK_MAX) {
      flashConfirmation(t('packTooMany', { max: PACK_MAX }));
      return;
    }
    // Client-side entitlement check (honest gate: content itself stays free).
    setBusy(true);
    try {
      const token = localStorage.getItem('accessToken');
      const me = token
        ? await fetch('/api/verify-app-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ appId: 'addition' }),
          }).then(r => r.json()).catch(() => null)
        : null;
      const entitled = !!(me && (me.tier === 'subscriber' || me.tier === 'admin'));
      if (!entitled) {
        flashConfirmation(t('packUpsell'));
        try { (window as unknown as { umami?: { track: (e: string) => void } }).umami?.track('pack-locked-click'); } catch { /* no-op */ }
        return;
      }

      // Load JSZip on demand from the shipped asset.
      const w = window as unknown as { JSZip?: new () => { file: (n: string, d: Blob) => void; generateAsync: (o: object) => Promise<Blob> } };
      if (!w.JSZip) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = '/worksheet-generators/js/jszip-3.10.1.min.js';
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('jszip'));
          document.head.appendChild(s);
        });
      }
      if (!w.JSZip) throw new Error('jszip');

      const zip = new w.JSZip();
      const selected = decks.filter(d => selectedDeckIds.has(d.id));
      for (const d of selected) {
        const res = await fetch(d.pdfUrl);
        if (!res.ok) continue;
        zip.file(`${d.slug}.pdf`, await res.blob());
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'lessoncraftstudio-pack.zip';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      try { (window as unknown as { umami?: { track: (e: string, d?: object) => void } }).umami?.track('pack-downloaded', { count: selected.length }); } catch { /* no-op */ }
      flashConfirmation(t('packDone', { count: selected.length }));
    } catch {
      flashConfirmation(t('errorGeneric'));
    } finally {
      setBusy(false);
    }
  }

  function toggleBulkMode() {
    if (bulkMode) {
      setSelectedDeckIds(new Set());
    }
    setBulkMode(b => !b);
  }

  function toggleDeckSelection(deckId: string) {
    setSelectedDeckIds(prev => {
      const next = new Set(prev);
      if (next.has(deckId)) next.delete(deckId);
      else next.add(deckId);
      return next;
    });
  }

  function clearSelection() {
    setSelectedDeckIds(new Set());
    setBulkMode(false);
  }

  async function handleAction(action: BulkAction) {
    if (action === 'addToCollection') {
      setPickerOpen(true);
      return;
    }
    if (action === 'downloadPack') {
      await handleDownloadPack();
      return;
    }
    if (action === 'shareLinks') {
      const ids = Array.from(selectedDeckIds);
      setBusy(true);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('/api/play-links/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
          body: JSON.stringify({ deckIds: ids }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const titleByDeckId = new Map(decks.map(d => [d.id, d.title]));
        const results: ShareLinkResult[] = data.playLinks.map(
          (p: { deckId: string; linkId: string; url: string; existing: boolean }) => ({
            deckId: p.deckId,
            deckTitle: titleByDeckId.get(p.deckId) ?? p.deckId,
            url: p.url,
            existing: p.existing,
          })
        );
        setShareResults({
          results,
          skippedCount: Array.isArray(data.skipped) ? data.skipped.length : 0,
        });
      } catch {
        flashConfirmation(t('errorGeneric'));
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <BulkSelectModeToggle active={bulkMode} onToggle={toggleBulkMode} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map(deck => {
          const selected = selectedDeckIds.has(deck.id);
          const interactive = bulkMode;
          return (
            <li
              key={deck.id}
              className={`relative border rounded-lg overflow-hidden bg-white shadow-sm transition ${
                interactive && selected
                  ? 'border-leaf-600 ring-2 ring-leaf-600'
                  : 'border-cream-300 hover:shadow-md'
              }`}
            >
              {bulkMode && (
                <DeckCardCheckbox
                  selected={selected}
                  onToggle={() => toggleDeckSelection(deck.id)}
                  ariaLabel={t('checkboxAria', { title: deck.title })}
                />
              )}

              {bulkMode ? (
                <button
                  type="button"
                  onClick={() => toggleDeckSelection(deck.id)}
                  aria-label={tCard('ariaThumbnail', { title: deck.title })}
                  className="block w-full text-left"
                >
                  <Image
                    src={wwwImg(deck.thumbnailUrl)}
                    alt={deck.richAlt}
                    width={480}
                    height={620}
                    loading="lazy"
                    sizes="(max-width:639px) 45vw, (max-width:1023px) 30vw, 240px"
                    className="w-full h-auto bg-cream-50"
                  />
                </button>
              ) : (
                <a
                  href={deck.href}
                  aria-label={tCard('ariaThumbnail', { title: deck.title })}
                  className="block"
                >
                  <Image
                    src={wwwImg(deck.thumbnailUrl)}
                    alt={deck.richAlt}
                    width={480}
                    height={620}
                    loading="lazy"
                    sizes="(max-width:639px) 45vw, (max-width:1023px) 30vw, 240px"
                    className="w-full h-auto bg-cream-50"
                  />
                </a>
              )}

              <div className="p-4">
                <h2 className="font-display text-base font-semibold text-ink-900 mb-2 line-clamp-2">
                  {bulkMode ? (
                    <button
                      type="button"
                      onClick={() => toggleDeckSelection(deck.id)}
                      className="text-left hover:text-leaf-700"
                    >
                      {deck.title}
                    </button>
                  ) : (
                    <a href={deck.href} className="hover:text-leaf-700">
                      {deck.title}
                    </a>
                  )}
                </h2>
                {!bulkMode && (
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <a
                      href={deck.href}
                      onClick={(e) => handlePlay(e, deck.href)}
                      aria-label={tCard('ariaPlay', { title: deck.title })}
                      className="text-leaf-700 font-semibold hover:underline"
                    >
                      {labels.playLink}
                    </a>
                    <span className="text-ink-300" aria-hidden="true">·</span>
                    {/* Metered DOWNLOAD: the proxy route does the server-side
                        meter + 302 (or 302→signup/pricing); crawlers/subscribers
                        pass straight through. Off until the flip. */}
                    <a
                      href={`/api/quota/pdf/${deck.id}`}
                      aria-label={tCard('ariaPdf', { title: deck.title })}
                      className="text-ink-600 hover:text-ink-900"
                      target="_blank"
                      rel="noopener"
                    >
                      {labels.pdfLink}
                    </a>
                    {deck.answerKeyUrl && (
                      <>
                        <span className="text-ink-300" aria-hidden="true">·</span>
                        <a
                          href={`/api/quota/answer-key/${deck.id}`}
                          aria-label={tCard('ariaAnswerKey', { title: deck.title })}
                          className="text-ink-600 hover:text-ink-900"
                          target="_blank"
                          rel="noopener"
                        >
                          {labels.answerKeyLink}
                        </a>
                      </>
                    )}
                    <AddToCollectionButton deckId={deck.id} />
                    <ShareDeckButton deckId={deck.id} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <BulkSelectToolbar
        count={selectedDeckIds.size}
        actions={['addToCollection', 'shareLinks', 'downloadPack']}
        busy={busy}
        onAction={handleAction}
        onCancel={clearSelection}
      />

      {QuotaModalElement}

      <BulkAddToCollectionPicker
        open={pickerOpen}
        deckIds={Array.from(selectedDeckIds)}
        onClose={() => setPickerOpen(false)}
        onSuccess={result => {
          setPickerOpen(false);
          flashConfirmation(
            t('addedConfirmation', {
              count: result.added,
              collectionName: result.collectionName,
            })
          );
          clearSelection();
        }}
      />

      {shareResults && (
        <ShareLinkResultModal
          results={shareResults.results}
          skippedCount={shareResults.skippedCount}
          onClose={() => {
            setShareResults(null);
            clearSelection();
          }}
        />
      )}

      {confirmation && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-md bg-ink-900 text-cream-50 text-sm shadow-lg"
        >
          {confirmation}
        </div>
      )}
    </>
  );
}
