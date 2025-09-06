import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default async function HomePage() {
  const t = await getTranslations('homepage');
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6 text-gray-900">
              {t('hero.title')}
            </h1>
            <p className="text-body-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                {t('hero.cta.tryFree')}
              </Button>
              <Button size="lg" variant="ghost">
                {t('hero.cta.viewApps')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-h1 text-center mb-12 text-gray-900">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-h3 mb-2">{t('features.items.apps.title')}</h3>
                <p className="text-gray-600">{t('features.items.apps.description')}</p>
              </div>
            </Card>
            
            <Card hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-h3 mb-2">{t('features.items.images.title')}</h3>
                <p className="text-gray-600">{t('features.items.images.description')}</p>
              </div>
            </Card>
            
            <Card hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-h3 mb-2">{t('features.items.languages.title')}</h3>
                <p className="text-gray-600">{t('features.items.languages.description')}</p>
              </div>
            </Card>
            
            <Card hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-h3 mb-2">{t('features.items.pod.title')}</h3>
                <p className="text-gray-600">{t('features.items.pod.description')}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-h1 text-center mb-12 text-gray-900">
            {t('pricing.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card padding="large">
              <div className="text-center">
                <h3 className="text-h2 mb-2">{t('pricing.free.name')}</h3>
                <p className="text-display mb-6">{t('pricing.free.price')}</p>
                <ul className="space-y-3 mb-8 text-left">
                  {['Word Search Generator', 'Limited image library', 'Watermarked output', 'Basic support'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button fullWidth variant="ghost">
                  {t('pricing.free.cta')}
                </Button>
              </div>
            </Card>

            {/* Core Bundle */}
            <Card padding="large">
              <div className="text-center">
                <h3 className="text-h2 mb-2">{t('pricing.core.name')}</h3>
                <p className="text-display mb-6">
                  {t('pricing.core.price')}
                  <span className="text-body text-gray-600">/mo</span>
                </p>
                <ul className="space-y-3 mb-8 text-left">
                  {['10 most popular apps', 'Full image library access', 'No watermarks', 'POD commercial license', 'Priority support'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button fullWidth variant="secondary">
                  {t('pricing.core.cta')}
                </Button>
              </div>
            </Card>

            {/* Full Access */}
            <Card padding="large" className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                  {t('pricing.full.popular')}
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-h2 mb-2">{t('pricing.full.name')}</h3>
                <p className="text-display mb-6">
                  {t('pricing.full.price')}
                  <span className="text-body text-gray-600">/mo</span>
                </p>
                <ul className="space-y-3 mb-8 text-left">
                  {['All 33 apps', 'Full image library access', 'No watermarks', 'POD commercial license', 'Priority support', 'Early access to new apps'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button fullWidth>
                  {t('pricing.full.cta')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}