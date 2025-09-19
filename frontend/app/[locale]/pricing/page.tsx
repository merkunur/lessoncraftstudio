import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Perfect for trying out our platform',
    features: [
      '3 Basic Apps',
      'Watermarked output',
      'Basic image library',
      'Basic templates',
      'Community support',
      'Personal use only'
    ],
    limitations: [
      'Watermark on all worksheets',
      'No commercial license',
      'Limited customization'
    ],
    apps: ['Word Search', 'Addition', 'Coloring'],
    cta: 'Start Free',
    ctaLink: '/auth/signup',
    variant: 'free'
  },
  {
    name: 'Core Bundle',
    price: '$9',
    period: '/month',
    yearlyPrice: '$90',
    description: 'Most popular apps for professional teachers',
    features: [
      '10 Most Popular Apps',
      'No watermarks',
      'Full image library (141+ images)',
      'All templates and styles',
      'POD commercial license',
      'Standard email support',
      'Export to PDF and PNG',
      'Save and reuse worksheets'
    ],
    apps: [
      'All Free apps +', 'Subtraction', 'Alphabet Train',
      'Find and Count', 'Matching', 'Crossword',
      'Sudoku', 'Shadow Match'
    ],
    cta: 'Start 7-Day Trial',
    ctaLink: '/auth/signup?plan=core',
    variant: 'core',
    popular: true
  },
  {
    name: 'Full Access',
    price: '$19',
    period: '/month',
    yearlyPrice: '$190',
    description: 'Complete toolkit for serious educators',
    features: [
      'All 33 Apps',
      'Everything in Core Bundle',
      'Priority email support',
      'Early access to new apps',
      'Advanced customization options',
      'Bulk worksheet generation',
      'Custom branding options',
      'API access (coming soon)',
      'Team collaboration (coming soon)'
    ],
    apps: [
      'All 33 worksheet generators including:',
      'Math Puzzle', 'Word Scramble', 'Chart Count',
      'Cryptogram', 'Treasure Hunt', 'Bingo',
      'And 20+ more advanced tools!'
    ],
    newApps: [
      'Plus 23 additional apps including:',
      'Image Crossword, Sudoku, Pattern Train',
      'Math Puzzles, Story Dice, and more!'
    ],
    cta: 'Start 7-Day Trial',
    ctaLink: '/auth/signup?plan=full',
    variant: 'full'
  }
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default async function PricingPage() {
  const t = await getTranslations('pricing');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your educational content creation needs
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-2 bg-white rounded-md shadow-sm font-medium text-gray-900">
                Monthly
              </button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                Yearly <span className="text-green-600 text-sm ml-1">(Save 20%)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl ${
                  plan.popular 
                    ? 'ring-2 ring-primary shadow-xl scale-105' 
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                    {plan.yearlyPrice && (
                      <p className="text-sm text-gray-500 mt-2">
                        or {plan.yearlyPrice}/year
                      </p>
                    )}
                  </div>
                  
                  <Link href={plan.ctaLink}>
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.variant === 'core' 
                        ? 'bg-primary text-white hover:bg-primary-700'
                        : plan.variant === 'full'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      {plan.cta}
                    </button>
                  </Link>
                  
                  <div className="mt-8 space-y-4">
                    <h4 className="font-semibold text-gray-900">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon />
                          <span className="ml-3 text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations && (
                      <>
                        <h4 className="font-semibold text-gray-900 mt-6">Limitations:</h4>
                        <ul className="space-y-3">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <XIcon />
                              <span className="ml-3 text-gray-600 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {plan.apps && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Apps included:</h4>
                        <div className="flex flex-wrap gap-2">
                          {plan.apps.map((app, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {plan.newApps && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">{plan.newApps[0]}</p>
                        <p className="text-sm text-gray-500 italic">{plan.newApps[1]}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare Plans
          </h2>
          
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">Free</div>
                    <div className="text-sm text-gray-500">$0</div>
                  </th>
                  <th className="text-center py-4 px-6 bg-blue-50">
                    <div className="font-semibold text-gray-900">Core Bundle</div>
                    <div className="text-sm text-gray-500">$15/mo</div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">Full Access</div>
                    <div className="text-sm text-gray-500">$25/mo</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">Number of Apps</td>
                  <td className="text-center py-4 px-6">1</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-semibold">10</td>
                  <td className="text-center py-4 px-6 font-semibold">33</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">Watermark</td>
                  <td className="text-center py-4 px-6"><XIcon /></td>
                  <td className="text-center py-4 px-6 bg-blue-50"><CheckIcon /></td>
                  <td className="text-center py-4 px-6"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">Commercial License</td>
                  <td className="text-center py-4 px-6"><XIcon /></td>
                  <td className="text-center py-4 px-6 bg-blue-50"><CheckIcon /></td>
                  <td className="text-center py-4 px-6"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">Image Library Size</td>
                  <td className="text-center py-4 px-6">10 images</td>
                  <td className="text-center py-4 px-6 bg-blue-50">100+ themes</td>
                  <td className="text-center py-4 px-6">100+ themes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">Support</td>
                  <td className="text-center py-4 px-6">Community</td>
                  <td className="text-center py-4 px-6 bg-blue-50">Email</td>
                  <td className="text-center py-4 px-6">Priority Email</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">Early Access</td>
                  <td className="text-center py-4 px-6"><XIcon /></td>
                  <td className="text-center py-4 px-6 bg-blue-50"><XIcon /></td>
                  <td className="text-center py-4 px-6"><CheckIcon /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <FAQAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Teaching Materials?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of educators creating professional worksheets with LessonCraftStudio
          </p>
          <Link href="/auth/signup">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </button>
          </Link>
          <p className="text-white/80 text-sm mt-4">No credit card required</p>
        </div>
      </section>
    </div>
  );
}