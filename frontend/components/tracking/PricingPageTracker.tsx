'use client';

import { useEffect } from 'react';
import { pinterestEvents } from './PinterestTag';

/**
 * Client component to track pricing page views for Pinterest conversion tracking.
 * This fires a 'lead' event when users view the pricing page, indicating purchase intent.
 */
export function PricingPageTracker() {
  useEffect(() => {
    // Track pricing page view as a lead event
    pinterestEvents.pricingView();
  }, []);

  // This component renders nothing - it only tracks
  return null;
}

export default PricingPageTracker;
