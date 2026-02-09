'use client';

import Link from 'next/link';

interface BlogSampleBannerProps {
  locale: string;
  appsUrl: string;
}

const BANNER_CONTENT: Record<string, { badge: string; headline: string; viewSamplesBtn: string; browseAllBtn: string }> = {
  en: {
    badge: 'Free Worksheets',
    headline: 'Printable Worksheet Samples Inside',
    viewSamplesBtn: 'View Samples',
    browseAllBtn: 'Browse All Worksheets',
  },
  de: {
    badge: 'Kostenlose Arbeitsbl\u00e4tter',
    headline: 'Druckbare Arbeitsblatt-Beispiele enthalten',
    viewSamplesBtn: 'Beispiele ansehen',
    browseAllBtn: 'Alle Arbeitsbl\u00e4tter',
  },
  fr: {
    badge: 'Fiches gratuites',
    headline: 'Exemples de fiches imprimables inclus',
    viewSamplesBtn: 'Voir les exemples',
    browseAllBtn: 'Toutes les fiches',
  },
  es: {
    badge: 'Fichas gratis',
    headline: 'Ejemplos de fichas imprimibles incluidos',
    viewSamplesBtn: 'Ver ejemplos',
    browseAllBtn: 'Todas las fichas',
  },
  pt: {
    badge: 'Fichas gr\u00e1tis',
    headline: 'Exemplos de fichas imprim\u00edveis inclu\u00eddos',
    viewSamplesBtn: 'Ver exemplos',
    browseAllBtn: 'Todas as fichas',
  },
  it: {
    badge: 'Schede gratuite',
    headline: 'Esempi di schede stampabili inclusi',
    viewSamplesBtn: 'Vedi gli esempi',
    browseAllBtn: 'Tutte le schede',
  },
  nl: {
    badge: 'Gratis werkbladen',
    headline: 'Afdrukbare werkblad-voorbeelden inbegrepen',
    viewSamplesBtn: 'Bekijk voorbeelden',
    browseAllBtn: 'Alle werkbladen',
  },
  sv: {
    badge: 'Gratis arbetsblad',
    headline: 'Utskrivbara arbetsbladsexempel inkluderade',
    viewSamplesBtn: 'Visa exempel',
    browseAllBtn: 'Alla arbetsblad',
  },
  da: {
    badge: 'Gratis arbejdsark',
    headline: 'Udskrivbare arbejdsark-eksempler inkluderet',
    viewSamplesBtn: 'Se eksempler',
    browseAllBtn: 'Alle arbejdsark',
  },
  no: {
    badge: 'Gratis arbeidsark',
    headline: 'Utskrivbare arbeidsark-eksempler inkludert',
    viewSamplesBtn: 'Se eksempler',
    browseAllBtn: 'Alle arbeidsark',
  },
  fi: {
    badge: 'Ilmaiset teht\u00e4v\u00e4t',
    headline: 'Tulostettavia teht\u00e4v\u00e4esimerkkej\u00e4 sis\u00e4ll\u00e4',
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
        maxWidth: '900px',
        margin: '16px auto',
        padding: '0 24px',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-banner-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        @supports not (backdrop-filter: blur(16px)) {
          .blog-banner-card { background: rgba(30, 25, 60, 0.8); }
        }
        .blog-banner-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #D6AC47 0%, #c49b3a 100%);
          color: #1a1a2e;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s ease, box-shadow 0.2s ease;
        }
        .blog-banner-primary-btn:hover {
          opacity: 0.9;
          box-shadow: 0 2px 12px rgba(214,172,71,0.4);
        }
        .blog-banner-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.5);
          background: transparent;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .blog-banner-secondary-btn:hover {
          background-color: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.7);
        }
        @media (max-width: 768px) {
          .blog-banner-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 20px !important;
            gap: 14px !important;
          }
          .blog-banner-buttons { justify-content: center !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-banner-card { animation: none !important; }
        }
      `}} />

      <div className="blog-banner-card">
        {/* Left content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badge pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '4px 12px',
            borderRadius: '100px',
            backgroundColor: 'rgba(214,172,71,0.15)',
            marginBottom: '10px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#D6AC47',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#D6AC47',
              letterSpacing: '0.3px',
            }}>
              {content.badge}
            </span>
          </div>

          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.4,
          }}>
            {content.headline}
          </h2>
        </div>

        {/* Buttons */}
        <div className="blog-banner-buttons" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}>
          <a
            href="#blog-sample-gallery"
            onClick={handleSmoothScroll}
            className="blog-banner-primary-btn"
          >
            {content.viewSamplesBtn}
            <span aria-hidden="true" style={{ fontSize: '13px' }}>&#8595;</span>
          </a>

          <Link
            href={appsUrl}
            className="blog-banner-secondary-btn"
          >
            {content.browseAllBtn}
            <span aria-hidden="true" style={{ fontSize: '13px' }}>&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
