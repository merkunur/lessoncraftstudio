/**
 * Reusable Buy Button for Lemon Squeezy checkout.
 * Use on app detail pages, tool pages, guides, ideas, etc.
 */

import { getCheckoutUrl, getBundleCheckoutUrl } from '@/config/lemonsqueezy-products';
import type { AppId, CategoryId } from '@/config/products';

const BUY_TEXT: Record<string, { app: string; bundle: string; removeWatermark: string }> = {
  en: { app: 'Buy for $49', bundle: 'Buy Bundle for $149', removeWatermark: 'Remove Watermark - $49' },
  de: { app: 'Kaufen fur $49', bundle: 'Paket kaufen fur $149', removeWatermark: 'Wasserzeichen entfernen - $49' },
  fr: { app: 'Acheter pour $49', bundle: 'Acheter le pack pour $149', removeWatermark: 'Supprimer le filigrane - $49' },
  es: { app: 'Comprar por $49', bundle: 'Comprar paquete por $149', removeWatermark: 'Quitar marca de agua - $49' },
  pt: { app: 'Comprar por $49', bundle: 'Comprar pacote por $149', removeWatermark: 'Remover marca d\'agua - $49' },
  it: { app: 'Acquista per $49', bundle: 'Acquista pacchetto per $149', removeWatermark: 'Rimuovi filigrana - $49' },
  nl: { app: 'Kopen voor $49', bundle: 'Bundel kopen voor $149', removeWatermark: 'Watermerk verwijderen - $49' },
  sv: { app: 'Kop for $49', bundle: 'Kop paket for $149', removeWatermark: 'Ta bort vattenstampel - $49' },
  da: { app: 'Kob for $49', bundle: 'Kob pakke for $149', removeWatermark: 'Fjern vandmaerke - $49' },
  no: { app: 'Kjop for $49', bundle: 'Kjop pakke for $149', removeWatermark: 'Fjern vannmerke - $49' },
  fi: { app: 'Osta hintaan $49', bundle: 'Osta paketti hintaan $149', removeWatermark: 'Poista vesileima - $49' },
};

interface BuyButtonProps {
  appId?: AppId;
  categoryId?: CategoryId;
  locale: string;
  variant?: 'default' | 'watermark' | 'compact';
  className?: string;
}

export default function BuyButton({ appId, categoryId, locale, variant = 'default', className = '' }: BuyButtonProps) {
  const texts = BUY_TEXT[locale] || BUY_TEXT.en;

  if (categoryId) {
    return (
      <a
        href={getBundleCheckoutUrl(categoryId)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all ${className}`}
      >
        {texts.bundle}
      </a>
    );
  }

  if (appId) {
    const href = getCheckoutUrl(appId);

    if (variant === 'watermark') {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all ${className}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          {texts.removeWatermark}
        </a>
      );
    }

    if (variant === 'compact') {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all ${className}`}
        >
          $49
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </a>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all ${className}`}
      >
        {texts.app}
      </a>
    );
  }

  return null;
}
