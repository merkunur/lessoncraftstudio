'use client';

/**
 * Metering wall modal (2026-07-12 metered paywall). Triggers when a metered
 * action returns 402 (quota_exceeded) or 401 (signup_required — anon download)
 * from /api/quota/*. Two variants share the shell:
 *   - 'quota_exceeded' → adult CTA to /pricing (the Teacher plan).
 *   - 'signup_required' → CTA to /auth/signup (education.com's free-account gate).
 * Kid-safe copy; adult-facing action; the page itself is never blocked, only
 * the metered action.
 *
 * Usage:
 *   const { showQuotaModal, QuotaModalElement } = useQuotaModal();
 *   if (res.status === 402 || res.status === 401) { showQuotaModal(await res.json()); return; }
 *   return <>…{QuotaModalElement}</>;
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export interface QuotaDetail {
  reason?: 'quota_exceeded' | 'signup_required';
  used?: number;
  remaining?: number | 'unlimited';
  resetAt?: string;
}

interface ModalProps {
  open: boolean;
  detail?: QuotaDetail;
  onDismiss: () => void;
}

export function QuotaExceededModal({ open, detail, onDismiss }: ModalProps) {
  const t = useTranslations('quotaWall');
  const locale = useLocale();
  if (!open) return null;

  const signup = detail?.reason === 'signup_required';
  const title = signup ? t('signupTitle') : t('exceededTitle');
  const body = signup ? t('signupBody') : t('exceededBody');
  const cta = signup ? t('signupCta') : t('subscribeCta');
  const href = signup ? `/${locale}/auth/signup?from=download` : `/${locale}/pricing?from=wall`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4"
      onClick={onDismiss}
    >
      <div
        className="bg-cream-50 rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="quota-modal-title" className="font-display font-semibold text-2xl text-ink-900 mb-3">
          {title}
        </h2>
        <p className="text-base text-ink-600 leading-relaxed mb-6">{body}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={href}
            className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-medium rounded-lg transition-colors"
          >
            {cta}
          </a>
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-cream-200 hover:bg-cream-300 text-ink-700 font-medium rounded-lg transition-colors"
          >
            {t('dismissCta')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useQuotaModal() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<QuotaDetail | undefined>();

  const showQuotaModal = useCallback((d?: QuotaDetail) => {
    setDetail(d);
    setOpen(true);
  }, []);
  const onDismiss = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const QuotaModalElement = <QuotaExceededModal open={open} detail={detail} onDismiss={onDismiss} />;
  return { showQuotaModal, QuotaModalElement };
}
