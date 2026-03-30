/**
 * Section I: Quick Stats Bar
 * Pure CSS stats strip — no images. Breaks up text sections with credibility numbers.
 */

const statsData: Record<string, { generators: string; images: string; languages: string; dpi: string }> = {
  en: { generators: '33 Generators', images: '3,000+ Images', languages: '11 Languages', dpi: '300 DPI Export' },
  de: { generators: '33 Generatoren', images: '3.000+ Bilder', languages: '11 Sprachen', dpi: '300 DPI Export' },
  fr: { generators: '33 Générateurs', images: '3 000+ Images', languages: '11 Langues', dpi: 'Export 300 DPI' },
  es: { generators: '33 Generadores', images: '3.000+ Imágenes', languages: '11 Idiomas', dpi: 'Exportar 300 DPI' },
  pt: { generators: '33 Geradores', images: '3.000+ Imagens', languages: '11 Idiomas', dpi: 'Exportar 300 DPI' },
  it: { generators: '33 Generatori', images: '3.000+ Immagini', languages: '11 Lingue', dpi: 'Esportazione 300 DPI' },
  nl: { generators: '33 Generators', images: '3.000+ Afbeeldingen', languages: '11 Talen', dpi: '300 DPI Export' },
  sv: { generators: '33 Generatorer', images: '3 000+ Bilder', languages: '11 Språk', dpi: '300 DPI Export' },
  da: { generators: '33 Generatorer', images: '3.000+ Billeder', languages: '11 Sprog', dpi: '300 DPI Eksport' },
  no: { generators: '33 Generatorer', images: '3 000+ Bilder', languages: '11 Språk', dpi: '300 DPI Eksport' },
  fi: { generators: '33 Generaattoria', images: '3 000+ Kuvaa', languages: '11 Kieltä', dpi: '300 DPI Vienti' },
};

const icons = [
  // Grid/generators icon
  <svg key="gen" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  // Photo/images icon
  <svg key="img" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>,
  // Globe/languages icon
  <svg key="lang" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  // Printer/DPI icon
  <svg key="dpi" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m0 0a48.103 48.103 0 0110.5 0m-10.5 0V5.625A2.25 2.25 0 019 3.375h6A2.25 2.25 0 0117.25 5.625v1.609" /></svg>,
];

interface StatsBarProps {
  locale: string;
}

export default function StatsBar({ locale }: StatsBarProps) {
  const data = statsData[locale] || statsData.en;
  const values = [data.generators, data.images, data.languages, data.dpi];

  return (
    <section className="py-8 md:py-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-4xl mx-auto">
          {values.map((text, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="text-emerald-400">
                {icons[i]}
              </div>
              <span className="text-sm md:text-base font-semibold text-white">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
