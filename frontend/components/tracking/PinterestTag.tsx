'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Pinterest Tag ID - set in environment variable
const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

// Declare pintrk on window
declare global {
  interface Window {
    pintrk?: (action: string, event?: string, data?: Record<string, unknown>) => void;
    _pinterestAsyncTracker?: boolean;
  }
}

// Pinterest conversion event types
export type PinterestEvent =
  | 'pagevisit'
  | 'signup'
  | 'lead'
  | 'checkout'
  | 'addtocart'
  | 'watchvideo'
  | 'custom';

// Track Pinterest events
export function trackPinterestEvent(
  event: PinterestEvent,
  data?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.pintrk) {
    window.pintrk('track', event, data);
  }
}

// Specific event helpers for LessonCraftStudio conversions
export const pinterestEvents = {
  // Track free account signup
  signup: (email?: string) => {
    trackPinterestEvent('signup', {
      lead_type: 'free_account',
      ...(email && { em: email })
    });
  },

  // Track when user views pricing page (lead intent)
  pricingView: () => {
    trackPinterestEvent('lead', {
      lead_type: 'pricing_page_view'
    });
  },

  // Track subscription checkout started
  checkoutStarted: (plan: string, value: number) => {
    trackPinterestEvent('checkout', {
      value,
      currency: 'USD',
      line_items: [{ product_name: plan }]
    });
  },

  // Track subscription purchase completed
  subscriptionPurchase: (plan: string, value: number, orderId?: string) => {
    trackPinterestEvent('checkout', {
      value,
      currency: 'USD',
      order_id: orderId,
      line_items: [{ product_name: plan, product_price: value }]
    });
  },

  // Track worksheet generation (engagement metric)
  worksheetGenerated: (worksheetType: string) => {
    trackPinterestEvent('custom', {
      event_name: 'worksheet_generated',
      worksheet_type: worksheetType
    });
  },

  // Track video watch (for tutorial videos)
  videoWatch: (videoTitle: string) => {
    trackPinterestEvent('watchvideo', {
      video_title: videoTitle
    });
  }
};

/** A visit through a class link: the children's class page, or an address that carries a class attempt (#lcs=<token>).
 *  No advertising tag loads there and nothing is sent (legal decision of 2026-11-14, condition E3c). */
const CLASS_VISIT = "(/^\\/c\\//.test(location.pathname)||/[#&]lcs=[a-z2-9]{20}(?:&|$)/.test(location.hash||''))";

export function PinterestTag() {
  const pathname = usePathname();

  // Track page visits on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'pagevisit');
    }
  }, [pathname]);

  // Don't render if no Pinterest Tag ID
  if (!PINTEREST_TAG_ID) {
    return null;
  }

  return (
    <>
      {/* Pinterest Base Tag */}
      <Script
        id="pinterest-base-tag"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            if(!${CLASS_VISIT}){
            !function(e){if(!window.pintrk){window.pintrk=function(){
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};
            var n=window.pintrk;n.queue=[],n.version="3.0";
            var t=document.createElement("script");t.async=!0,t.src=e;
            var r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}
            ("https://s.pinimg.com/ct/core.js");
            pintrk('load', '${PINTEREST_TAG_ID}');
            pintrk('page');
            }
          `,
        }}
      />

      {/* (No noscript image: it would be fetched from Pinterest on every page, a class visit included, and a script
          cannot hold it back. Without scripts no page of the site counts a visit.) */}
    </>
  );
}

export default PinterestTag;
