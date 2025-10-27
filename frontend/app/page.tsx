import { redirect } from 'next/navigation';

// This is the root page that redirects to the default locale
// Required for next-intl with localePrefix: 'always'
export default function RootPage() {
  // Redirect to default locale
  redirect('/en');
}
