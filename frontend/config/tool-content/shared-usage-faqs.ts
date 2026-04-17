interface FAQ { question: string; answer: string }

// Usage-intent FAQs prepended to every /[locale]/tools/[slug] page's FAQ
// section. These focus on the free browser experience: no signup, file
// formats, device compatibility, print settings, session persistence —
// topics that differentiate the informational /tools/*-maker pages from
// the commercial /apps/* pages.
//
// Only EN is populated today. Other locales fall back to EN. Translations
// queued in docs/seo-translation-queue-2026-04.md.
export const sharedUsageFAQs: Record<string, FAQ[]> = {
  en: [
    {
      question: 'Is there really no signup required?',
      answer:
        'Correct — you can open the generator, pick a theme, customize the page layout, and download a watermarked PDF or JPEG without creating an account. No email, no credit card, no trial period. The watermark is a small label in the corner; the underlying worksheet content is identical to the paid version. A one-time $49 license removes the watermark and unlocks commercial selling rights.',
    },
    {
      question: 'What file formats can I download?',
      answer:
        'Every worksheet exports as a print-ready PDF at 400+ DPI and a high-resolution JPEG. The PDF preserves vector text and sharp images for crisp printing at any size. The JPEG is useful for quick previews, social media posts, and platforms that prefer raster images. Both formats download instantly after you click Export.',
    },
    {
      question: 'Will it work on a tablet, Chromebook, or older browser?',
      answer:
        'The generator runs in any modern browser: Chrome, Safari, Firefox, and Edge — all version 90 or later. It works on Chromebooks, iPads, and Android tablets as well as desktops. Older browsers (Internet Explorer, Chrome pre-90) are not supported because the generator uses modern canvas and font-rendering features. If you hit a rendering issue, updating the browser usually fixes it.',
    },
    {
      question: 'What page sizes are supported? How do I print on A4 vs Letter?',
      answer:
        'The Page Setup panel offers Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square, and custom dimensions. Pick the size that matches your intended printer or target market (A4 for most of Europe and Asia, Letter for North America). The PDF export preserves the exact dimensions you chose, so it will print true-to-size on any printer.',
    },
    {
      question: 'Do my worksheets save if I close the tab?',
      answer:
        'Your current worksheet layout is held in browser memory only. Closing the tab clears it. To preserve a worksheet across sessions, download the PDF and JPEG before closing — re-importing the exact same configuration is not supported in the free browser version. If you frequently create batches of related worksheets, purchasing a license also gives you access to saved templates.',
    },
  ],
};

export function getSharedUsageFAQs(locale: string): FAQ[] {
  return sharedUsageFAQs[locale] || sharedUsageFAQs.en;
}
