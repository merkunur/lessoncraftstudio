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
        animation: 'blogBannerFadeIn 0.6s ease-out both',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #030305 0%, #0a0a1a 40%, #0f0f2a 60%, #0a1628 80%, #051020 100%)',
          padding: '48px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          minHeight: '200px',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        {/* Cyan orb */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            left: '-5%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            animation: 'blogBannerOrb1 8s ease-in-out infinite',
          }}
        />

        {/* Purple orb */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '10%',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            animation: 'blogBannerOrb2 8s ease-in-out infinite',
          }}
        />

        {/* Keyframe animation styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blogBannerFadeIn {
            from { transform: translateY(12px); }
            to { transform: translateY(0); }
          }
          @keyframes blogBannerOrb1 {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @keyframes blogBannerOrb2 {
            0%, 100% { transform: scale(1.1); }
            50% { transform: scale(1); }
          }
          @media (max-width: 768px) {
            .blog-banner-inner { flex-direction: column !important; text-align: center !important; padding: 32px 24px !important; }
            .blog-banner-icon { display: none !important; }
            .blog-banner-buttons { justify-content: center !important; }
          }
        `}} />

        {/* Left content */}
        <div className="blog-banner-inner" style={{ position: 'relative', zIndex: 1, flex: 1 }}>
          {/* Badge pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '100px',
            backgroundColor: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.2)',
            marginBottom: '16px',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#06b6d4',
              boxShadow: '0 0 8px rgba(6,182,212,0.6)',
              animation: 'blogBannerOrb1 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#06b6d4',
              letterSpacing: '0.3px',
            }}>
              {content.badge}
            </span>
          </div>

          <h2 style={{
            fontSize: '26px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px',
            lineHeight: 1.3,
            letterSpacing: '-0.3px',
          }}>
            {content.headline}
          </h2>

          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 24px',
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
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                (e.target as HTMLElement).style.boxShadow = '0 6px 24px rgba(139,92,246,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(139,92,246,0.3)';
              }}
            >
              {content.viewSamplesBtn}
              <span aria-hidden="true" style={{ fontSize: '14px' }}>&#8595;</span>
            </a>

            <Link
              href={appsUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'transparent',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                (e.target as HTMLElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
              }}
            >
              {content.browseAllBtn}
              <span aria-hidden="true" style={{ fontSize: '14px' }}>&#8594;</span>
            </Link>
          </div>
        </div>

        {/* Right side: SVG worksheet illustration */}
        <div className="blog-banner-icon" style={{
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
          width: '140px',
          height: '170px',
          opacity: 0.85,
        }}>
          <svg
            viewBox="0 0 140 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Document shape */}
            <rect x="10" y="10" width="110" height="145" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            {/* Header bar */}
            <rect x="22" y="24" width="86" height="6" rx="3" fill="rgba(6,182,212,0.4)" />
            {/* Content lines */}
            <rect x="22" y="42" width="74" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
            <rect x="22" y="54" width="86" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x="22" y="66" width="60" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            {/* Separator */}
            <line x1="22" y1="82" x2="108" y2="82" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* More lines */}
            <rect x="22" y="92" width="86" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x="22" y="104" width="70" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            {/* Checkmark circle */}
            <circle cx="90" cy="130" r="16" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
            <path d="M82 130l5 5 11-11" stroke="rgba(16,185,129,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
