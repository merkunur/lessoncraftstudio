import type { FAQ } from './types';

// Commercial-intent FAQs prepended to every /[locale]/apps/[slug] page's FAQ
// section. These focus on licensing, platforms, refunds, team use, and
// language expansion — topics that differentiate the commercial /apps/*
// pages from the informational /tools/*-maker pages.
//
// Only EN is populated today. Other locales fall back to EN (same question
// text rendered in English). Translations queued in
// docs/seo-translation-queue-2026-04.md.
export const sharedCommercialFAQs: Record<string, FAQ[]> = {
  en: [
    {
      question: 'What does the commercial license include?',
      answer:
        'Every worksheet you generate comes with a full commercial license — no attribution required, no royalties, no unit caps. You can sell the worksheets you create on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, Your Own Store, or any other marketplace. The one-time $49 license covers unlimited commercial use for a single seller or business.',
    },
    {
      question: 'Can I sell worksheets on Etsy, Amazon KDP, Teachers Pay Teachers, and Gumroad?',
      answer:
        'Yes, all four platforms are covered under the commercial license. You can sell digital downloads on Etsy, compile worksheets into printed puzzle and activity books for Amazon KDP, offer classroom bundles on Teachers Pay Teachers, and distribute printables via Gumroad or your own ecommerce store. The license does not restrict which marketplace you sell on.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'We offer a 30-day refund window. If you decide the generator is not the right fit for your product line within the first 30 days, email support and we will process a full refund. After 30 days, refunds are handled case-by-case for material defects or issues with the tool.',
    },
    {
      question: 'Can I share the license with team members or employees?',
      answer:
        'A single license covers one seller account or business. If you operate as a sole proprietor, the license covers you and any virtual assistants working under your business. For teams of 3 or more people generating worksheets independently, contact support about team licensing — we offer discounted multi-seat packages.',
    },
    {
      question: 'Can I sell the same worksheet in 11 languages as separate products?',
      answer:
        'Yes. The generator supports 11 languages (English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish), and each language-specific version counts as a distinct product under your license. Many sellers multiply revenue per theme by exporting the same worksheet in each language and listing them as separate SKUs on Etsy or KDP.',
    },
  ],
};

export function getSharedCommercialFAQs(locale: string): FAQ[] {
  return sharedCommercialFAQs[locale] || sharedCommercialFAQs.en;
}
