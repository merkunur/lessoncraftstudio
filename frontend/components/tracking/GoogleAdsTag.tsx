'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Google Ads Conversion ID
const GOOGLE_ADS_ID = 'AW-17919257835';

// Declare gtag on window
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Track Google Ads events
export function trackGoogleAdsEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

// Google Ads conversion event helpers for LessonCraftStudio
export const googleAdsEvents = {
  // Track subscription purchase conversion
  conversion: (conversionLabel: string, value?: number, currency?: string) => {
    trackGoogleAdsEvent('conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      ...(value && { value }),
      ...(currency && { currency }),
    });
  },

  // Track signup as a conversion
  signup: () => {
    trackGoogleAdsEvent('sign_up', {
      method: 'email',
    });
  },

  // Track when user starts checkout
  beginCheckout: (plan: string, value: number) => {
    trackGoogleAdsEvent('begin_checkout', {
      currency: 'USD',
      value,
      items: [{ item_name: plan }],
    });
  },

  // Track successful purchase
  purchase: (plan: string, value: number, transactionId?: string) => {
    trackGoogleAdsEvent('purchase', {
      currency: 'USD',
      value,
      transaction_id: transactionId,
      items: [{ item_name: plan, price: value }],
    });
  },
};

export function GoogleAdsTag() {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GOOGLE_ADS_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        id="google-ads-tag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `,
        }}
      />
    </>
  );
}

export default GoogleAdsTag;
