/**
 * License Delivery Email Template
 * Sent after a WarriorPlus purchase to deliver the license key and access instructions.
 */

import {
  Button,
  Heading,
  Hr,
  Section,
  Text,
  Link,
} from '@react-email/components';
import * as React from 'react';
import { BaseLayout } from './base-layout';

interface LicenseDeliveryEmailProps {
  buyerName: string;
  licenseKey: string;
  productName: string;
  appsAccess: string[];
  memberUrl: string;
}

export const LicenseDeliveryEmail = ({
  buyerName = 'there',
  licenseKey = 'LCS-XXXXX-XXXXX-XXXXX-XXXXX',
  productName = 'Printable Worksheet Empire',
  appsAccess = [],
  memberUrl = 'https://www.lessoncraftstudio.com/member',
}: LicenseDeliveryEmailProps) => {
  const appCount = appsAccess.length || 33;

  return (
    <BaseLayout preview={`Your ${productName} license key is ready!`}>
      <Heading style={heading}>Your Purchase is Ready!</Heading>

      <Text style={paragraph}>Hi {buyerName},</Text>

      <Text style={paragraph}>
        Thank you for purchasing <strong>{productName}</strong>! Your license key
        and access instructions are below.
      </Text>

      <Section style={licenseBox}>
        <Text style={licenseLabel}>Your License Key</Text>
        <Text style={licenseKeyStyle}>{licenseKey}</Text>
        <Text style={licenseNote}>
          Save this key somewhere safe. You will need it to access your tools.
        </Text>
      </Section>

      <Section style={stepsBox}>
        <Heading as="h2" style={stepsHeading}>
          Get Started in 3 Steps
        </Heading>

        <Text style={stepItem}>
          <strong>Step 1:</strong> Go to your Member Portal
        </Text>
        <Text style={stepItem}>
          <strong>Step 2:</strong> Enter your license key or email to log in
        </Text>
        <Text style={stepItem}>
          <strong>Step 3:</strong> Start creating worksheets immediately!
        </Text>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href={memberUrl}>
          Access Your Tools Now
        </Button>
      </Section>

      <Section style={includesBox}>
        <Heading as="h2" style={includesHeading}>
          What You Got
        </Heading>
        <ul style={featureList}>
          <li style={featureItem}>{appCount} professional worksheet generators</li>
          <li style={featureItem}>Unlimited worksheet creation</li>
          <li style={featureItem}>High-quality PDF export</li>
          <li style={featureItem}>Custom themes, borders, and backgrounds</li>
          <li style={featureItem}>Lifetime access (no recurring fees)</li>
        </ul>
      </Section>

      <Hr style={hr} />

      <Heading as="h3" style={subheading}>
        Need Help?
      </Heading>
      <Text style={paragraph}>
        If you have any questions or need assistance, simply reply to this email
        or visit our{' '}
        <Link href="https://www.lessoncraftstudio.com/en/support" style={link}>
          support page
        </Link>.
      </Text>

      <Text style={signoff}>
        Happy creating!
        <br />
        The LessonCraftStudio Team
      </Text>
    </BaseLayout>
  );
};

export default LicenseDeliveryEmail;

// Styles
const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0 0 20px',
};

const subheading = {
  fontSize: '20px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '20px 0 10px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  margin: '16px 0',
};

const licenseBox = {
  backgroundColor: '#EBF5FF',
  border: '2px solid #3B82F6',
  borderRadius: '8px',
  padding: '24px',
  margin: '30px 0',
  textAlign: 'center' as const,
};

const licenseLabel = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#3B82F6',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 8px',
};

const licenseKeyStyle = {
  fontSize: '24px',
  fontWeight: '700',
  fontFamily: 'monospace',
  color: '#1E40AF',
  letterSpacing: '2px',
  margin: '8px 0',
  padding: '12px',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  border: '1px dashed #93C5FD',
};

const licenseNote = {
  fontSize: '13px',
  color: '#6B7280',
  margin: '8px 0 0',
  fontStyle: 'italic' as const,
};

const stepsBox = {
  backgroundColor: '#F0FDF4',
  border: '1px solid #22C55E',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const stepsHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#166534',
  margin: '0 0 12px',
};

const stepItem = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#166534',
  margin: '4px 0',
};

const includesBox = {
  backgroundColor: '#F8FAFC',
  border: '1px solid #E2E8F0',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const includesHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '0 0 12px',
};

const featureList = {
  margin: '0',
  padding: '0 0 0 20px',
  color: '#484848',
};

const featureItem = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '6px 0',
};

const buttonContainer = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#3B82F6',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const link = {
  color: '#3B82F6',
  textDecoration: 'underline',
};

const signoff = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#484848',
  margin: '20px 0 0',
  lineHeight: '26px',
};
