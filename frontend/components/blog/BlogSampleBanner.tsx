'use client';

import Link from 'next/link';

interface BlogSampleBannerProps {
  locale: string;
  appsUrl: string;
}

const BANNER_CONTENT: Record<string, { badge: string; headline: string; subtitle: string; viewSamplesBtn: string; browseAllBtn: string }> = {
  en: {
    badge: 'Free Worksheets',
    headline: 'Printable Worksheet Samples Inside',
    subtitle: 'This article includes free downloadable worksheets. Discover even more on our product pages.',
    viewSamplesBtn: 'View Samples',
    browseAllBtn: 'Browse All Worksheets',
  },
  de: {
    badge: 'Kostenlose Arbeitsbl\u00e4tter',
    headline: 'Druckbare Arbeitsblatt-Beispiele enthalten',
    subtitle: 'Dieser Artikel enth\u00e4lt kostenlose Arbeitsbl\u00e4tter zum Herunterladen. Entdecke noch mehr auf unseren Produktseiten.',
    viewSamplesBtn: 'Beispiele ansehen',
    browseAllBtn: 'Alle Arbeitsbl\u00e4tter',
  },
  fr: {
    badge: 'Fiches gratuites',
    headline: 'Exemples de fiches imprimables inclus',
    subtitle: 'Cet article contient des fiches gratuites \u00e0 t\u00e9l\u00e9charger. D\u00e9couvrez-en encore plus sur nos pages produits.',
    viewSamplesBtn: 'Voir les exemples',
    browseAllBtn: 'Toutes les fiches',
  },
  es: {
    badge: 'Fichas gratis',
    headline: 'Ejemplos de fichas imprimibles incluidos',
    subtitle: 'Este art\u00edculo incluye fichas gratuitas para descargar. Encuentra a\u00fan m\u00e1s en nuestras p\u00e1ginas de productos.',
    viewSamplesBtn: 'Ver ejemplos',
    browseAllBtn: 'Todas las fichas',
  },
  pt: {
    badge: 'Fichas gr\u00e1tis',
    headline: 'Exemplos de fichas imprim\u00edveis inclu\u00eddos',
    subtitle: 'Este artigo inclui fichas gratuitas para download. Encontre ainda mais nas nossas p\u00e1ginas de produtos.',
    viewSamplesBtn: 'Ver exemplos',
    browseAllBtn: 'Todas as fichas',
  },
  it: {
    badge: 'Schede gratuite',
    headline: 'Esempi di schede stampabili inclusi',
    subtitle: 'Questo articolo include schede gratuite da scaricare. Scopri ancora di pi\u00f9 nelle nostre pagine prodotti.',
    viewSamplesBtn: 'Vedi gli esempi',
    browseAllBtn: 'Tutte le schede',
  },
  nl: {
    badge: 'Gratis werkbladen',
    headline: 'Afdrukbare werkblad-voorbeelden inbegrepen',
    subtitle: 'Dit artikel bevat gratis downloadbare werkbladen. Ontdek nog meer op onze productpagina\'s.',
    viewSamplesBtn: 'Bekijk voorbeelden',
    browseAllBtn: 'Alle werkbladen',
  },
  sv: {
    badge: 'Gratis arbetsblad',
    headline: 'Utskrivbara arbetsbladsexempel inkluderade',
    subtitle: 'Den h\u00e4r artikeln inneh\u00e5ller gratis nedladdningsbara arbetsblad. Hitta \u00e4nnu fler p\u00e5 v\u00e5ra produktsidor.',
    viewSamplesBtn: 'Visa exempel',
    browseAllBtn: 'Alla arbetsblad',
  },
  da: {
    badge: 'Gratis arbejdsark',
    headline: 'Udskrivbare arbejdsark-eksempler inkluderet',
    subtitle: 'Denne artikel indeholder gratis arbejdsark til download. Find endnu flere p\u00e5 vores produktsider.',
    viewSamplesBtn: 'Se eksempler',
    browseAllBtn: 'Alle arbejdsark',
  },
  no: {
    badge: 'Gratis arbeidsark',
    headline: 'Utskrivbare arbeidsark-eksempler inkludert',
    subtitle: 'Denne artikkelen inneholder gratis arbeidsark for nedlasting. Finn enda flere p\u00e5 v\u00e5re produktsider.',
    viewSamplesBtn: 'Se eksempler',
    browseAllBtn: 'Alle arbeidsark',
  },
  fi: {
    badge: 'Ilmaiset teht\u00e4v\u00e4t',
    headline: 'Tulostettavia teht\u00e4v\u00e4esimerkkej\u00e4 sis\u00e4ll\u00e4',
    subtitle: 'T\u00e4m\u00e4 artikkeli sis\u00e4lt\u00e4\u00e4 ilmaisia ladattavia teht\u00e4vi\u00e4. L\u00f6yd\u00e4 viel\u00e4 lis\u00e4\u00e4 tuotesivuiltamme.',
    viewSamplesBtn: 'Katso esimerkit',
    browseAllBtn: 'Kaikki teht\u00e4v\u00e4t',
  },
};

export default function BlogSampleBanner({ locale, appsUrl }: BlogSampleBannerProps) {
  const content = BANNER_CONTENT[locale] || BANNER_CONTENT.en;

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('blog-sample-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-label={content.badge}
      style={{
        maxWidth: '1200px',
        margin: '24px auto 0',
        padding: '0 24px',
        animation: 'blogBannerFadeIn 0.5s ease-out both',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blogBannerFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blog-banner-primary-btn:hover {
          background-color: #c49b3a !important;
          box-shadow: 0 2px 8px rgba(214,172,71,0.3) !important;
        }
        .blog-banner-secondary-btn:hover {
          background-color: #480005 !important;
          color: #ffffff !important;
        }
        @media (max-width: 768px) {
          .blog-banner-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 28px 24px !important;
          }
          .blog-banner-icon-wrap { display: none !important; }
          .blog-banner-buttons { justify-content: center !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-banner-fade { animation: none !important; }
        }
      `}} />

      <div
        className="blog-banner-card"
        style={{
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          borderLeft: '4px solid #3B82F6',
          padding: '32px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '36px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Left content */}
        <div style={{ flex: 1 }}>
          {/* Badge pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '5px 12px',
            borderRadius: '100px',
            backgroundColor: '#EFF6FF',
            marginBottom: '14px',
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#1E40AF',
              letterSpacing: '0.2px',
            }}>
              {content.badge}
            </span>
          </div>

          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: '0 0 8px',
            lineHeight: 1.35,
          }}>
            {content.headline}
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            margin: '0 0 22px',
            lineHeight: 1.6,
            maxWidth: '520px',
          }}>
            {content.subtitle}
          </p>

          {/* Buttons */}
          <div className="blog-banner-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#blog-sample-gallery"
              onClick={handleSmoothScroll}
              className="blog-banner-primary-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '11px 22px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#D6AC47',
                color: '#480005',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {content.viewSamplesBtn}
              <span aria-hidden="true" style={{ fontSize: '14px' }}>&#8595;</span>
            </a>

            <Link
              href={appsUrl}
              className="blog-banner-secondary-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '11px 22px',
                borderRadius: '8px',
                border: '1.5px solid #480005',
                backgroundColor: 'transparent',
                color: '#480005',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
            >
              {content.browseAllBtn}
              <span aria-hidden="true" style={{ fontSize: '14px' }}>&#8594;</span>
            </Link>
          </div>
        </div>

        {/* Right side: SVG worksheet illustration */}
        <div className="blog-banner-icon-wrap" style={{
          flexShrink: 0,
          width: '120px',
          height: '148px',
        }}>
          <svg
            viewBox="0 0 120 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Document shape */}
            <rect x="8" y="8" width="96" height="126" rx="6" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1.5" />
            {/* Header bar */}
            <rect x="20" y="22" width="72" height="5" rx="2.5" fill="#93C5FD" />
            {/* Content lines */}
            <rect x="20" y="38" width="62" height="3.5" rx="1.75" fill="#E5E7EB" />
            <rect x="20" y="48" width="72" height="3.5" rx="1.75" fill="#E5E7EB" />
            <rect x="20" y="58" width="50" height="3.5" rx="1.75" fill="#E5E7EB" />
            {/* Separator */}
            <line x1="20" y1="72" x2="92" y2="72" stroke="#E5E7EB" strokeWidth="1" />
            {/* More lines */}
            <rect x="20" y="82" width="72" height="3.5" rx="1.75" fill="#E5E7EB" />
            <rect x="20" y="92" width="58" height="3.5" rx="1.75" fill="#E5E7EB" />
            {/* Checkmark circle */}
            <circle cx="76" cy="114" r="14" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5" />
            <path d="M69 114l4.5 4.5 9.5-9.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
