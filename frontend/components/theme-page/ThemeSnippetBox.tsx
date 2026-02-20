import { labelQuickAnswer, labelLearnMore } from '@/config/theme-page-labels';

interface ThemeSnippetBoxProps {
  snippetDefinition: string;
  themeName: string;
  locale: string;
}

export default function ThemeSnippetBox({
  snippetDefinition,
  themeName,
  locale,
}: ThemeSnippetBoxProps) {
  const questionHeading =
    locale === 'en'
      ? `What are ${themeName} worksheets?`
      : `${themeName} ${(labelQuickAnswer[locale] || labelQuickAnswer.en).toLowerCase()}`;

  return (
    <aside
      role="complementary"
      className="py-8"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 150px' }}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {labelQuickAnswer[locale] || labelQuickAnswer.en}
          </span>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            {questionHeading}
          </h2>
          <p className="text-gray-700 leading-relaxed">{snippetDefinition}</p>
          <a
            href="#educational-overview"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium mt-3 transition-colors"
          >
            {labelLearnMore[locale] || labelLearnMore.en}
            <span className="ml-1" aria-hidden="true">
              &darr;
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}
