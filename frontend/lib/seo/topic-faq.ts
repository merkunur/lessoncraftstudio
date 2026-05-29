import { getTranslations } from 'next-intl/server';

// Thin-page structural floor (Part 2) — FAQ resolution for catalog pages.
//
// Each catalog page gets 3 Q&A. Authored overrides (sparse, like topicProse)
// win when present; otherwise a per-variant fallback is built from ICU
// templates so NO page is ever FAQ-less. The visible <dl> in TopicFaq.tsx and
// the FAQPage JSON-LD are built from the SAME items array (Google requires the
// rendered text and the structured data to match).

export interface FaqItem {
  question: string;
  answer: string;
}

export type FaqVariant = 'single' | 'intersection' | 'activity' | 'standards';

/**
 * Read authored FAQ overrides for a key from `topicFaq.overrides.<key>`.
 * Overrides are arrays of `{ q, a }` (or `{ question, answer }`) objects.
 * Returns null when absent/empty (long-tail falls through to the fallback) —
 * mirrors the null-guard discipline in TopicProseContainer.lookupTopicProse.
 */
function readOverrides(
  messages: Record<string, unknown> | null,
  key: string | undefined,
): FaqItem[] | null {
  if (!messages || typeof messages !== 'object' || !key) return null;
  const ns = (messages as Record<string, unknown>).topicFaq;
  if (!ns || typeof ns !== 'object') return null;
  const overrides = (ns as Record<string, unknown>).overrides;
  if (!overrides || typeof overrides !== 'object') return null;
  const arr = (overrides as Record<string, unknown>)[key];
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const items: FaqItem[] = [];
  for (const it of arr) {
    if (it && typeof it === 'object') {
      const rec = it as Record<string, unknown>;
      const q = (rec.q ?? rec.question) as unknown;
      const a = (rec.a ?? rec.answer) as unknown;
      if (typeof q === 'string' && typeof a === 'string' && q && a) {
        items.push({ question: q, answer: a });
      }
    }
  }
  return items.length ? items : null;
}

async function fallbackItems(
  locale: string,
  variant: FaqVariant,
  vars: Record<string, string | number>,
): Promise<FaqItem[]> {
  const t = await getTranslations({ locale, namespace: `topicFaq.fallback.${variant}` });
  return [1, 2, 3].map((n) => ({
    question: t(`q${n}`, vars),
    answer: t(`a${n}`, vars),
  }));
}

export async function resolveTopicFaq(
  messages: Record<string, unknown> | null,
  locale: string,
  opts: { axisKey?: string; topicName?: string; count?: number },
): Promise<FaqItem[]> {
  const override = readOverrides(messages, opts.axisKey);
  if (override) return override;
  return fallbackItems(locale, 'single', {
    topic: opts.topicName ?? '',
    count: opts.count ?? 0,
  });
}

export async function resolveIntersectionFaq(
  messages: Record<string, unknown> | null,
  locale: string,
  opts: { axisKey1?: string; axisKey2?: string; name1?: string; name2?: string; count?: number },
): Promise<FaqItem[]> {
  let key: string | undefined;
  if (opts.axisKey1 && opts.axisKey2) {
    key = [opts.axisKey1, opts.axisKey2].sort().join('__');
  }
  const override = readOverrides(messages, key);
  if (override) return override;
  return fallbackItems(locale, 'intersection', {
    primary: opts.name1 ?? '',
    secondary: opts.name2 ?? '',
    count: opts.count ?? 0,
  });
}

export async function resolveActivityFaq(
  locale: string,
  opts: { title?: string; grade?: string; strand?: string },
): Promise<FaqItem[]> {
  return fallbackItems(locale, 'activity', {
    title: opts.title ?? '',
    grade: opts.grade ?? '',
    strand: opts.strand ?? '',
  });
}

export async function resolveStandardsFaq(
  locale: string,
  opts: { code?: string; strand?: string; grade?: string },
): Promise<FaqItem[]> {
  return fallbackItems(locale, 'standards', {
    code: opts.code ?? '',
    strand: opts.strand ?? '',
    grade: opts.grade ?? '',
  });
}
