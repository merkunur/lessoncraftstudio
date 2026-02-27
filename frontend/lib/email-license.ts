/**
 * License Delivery Email Functions
 *
 * Handles sending license keys and access instructions to buyers.
 */

import { render } from '@react-email/render';
import { sendEmail } from './email';
import { LicenseDeliveryEmail } from './email/templates/license-delivery-email';
import { ALL_APPS } from '@/config/warriorplus-products';
import type { AppId } from '@/config/warriorplus-products';

interface SendLicenseDeliveryOptions {
  to: string;
  buyerName: string;
  licenseKey: string;
  productName: string;
  productId: string;
  appsAccess: string[];
  memberUrl: string;
}

export async function sendLicenseDeliveryEmail(options: SendLicenseDeliveryOptions): Promise<void> {
  const {
    to,
    buyerName,
    licenseKey,
    productName,
    appsAccess,
    memberUrl,
  } = options;

  // Map app IDs to display names
  const appNames = appsAccess
    .filter(id => id in ALL_APPS)
    .map(id => ALL_APPS[id as AppId].name);

  const html = await render(
    LicenseDeliveryEmail({
      buyerName,
      licenseKey,
      productName,
      appsAccess: appNames,
      memberUrl,
    })
  );

  await sendEmail(
    {
      to,
      subject: `Your ${productName} License Key - LessonCraftStudio`,
      html,
      replyTo: 'support@lessoncraftstudio.com',
    },
    {
      immediate: true, // Send immediately, don't queue
      priority: 'high',
    }
  );
}
