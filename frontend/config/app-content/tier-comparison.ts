export function getBundleTierComparison(locale: string) {
  return {
    title: 'Compare Plans',
    commercialTitle: 'Commercial Pack',
    commercialPrice: '$27',
    fullAccessTitle: 'Full Access Pack',
    fullAccessPrice: '$47',
    features: [] as { feature: string; commercial: string; fullAccess: string }[],
    footnote: '',
  };
}
