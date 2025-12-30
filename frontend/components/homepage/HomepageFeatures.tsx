'use client';

import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

// Real features only - no fake information
const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Create in Under 3 Minutes',
    description: 'Generate complete worksheets instantly. Select your theme, customize settings, and download professional PDFs ready for printing.',
    highlighted: false,
  },
  {
    icon: '🎨',
    title: '3000+ Child-Friendly Images',
    description: 'Browse our curated library organized by themes: animals, food, vehicles, nature, seasons, and more. Search or filter to find exactly what you need.',
    highlighted: false,
  },
  {
    icon: '🌍',
    title: '11 Languages Supported',
    description: 'Create worksheets in English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish.',
    highlighted: false,
  },
  {
    icon: '✏️',
    title: 'Full Canvas Editing',
    description: 'Every element is editable. Drag to move, resize with handles, rotate freely. Add custom text with 7 fonts. Upload your own images.',
    highlighted: false,
  },
  {
    icon: '💰',
    title: 'Commercial License Included',
    description: 'Sell your worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP. No attribution required. No extra licensing fees.',
    highlighted: true,
  },
  {
    icon: '🖨️',
    title: '300 DPI Print Quality',
    description: 'Export high-resolution PDFs perfect for classroom printing and commercial publishing. Answer keys included automatically.',
    highlighted: true,
  },
];

export default function HomepageFeatures() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #fffbeb 0%,
            #fef3c7 30%,
            #fde68a 60%,
            #fef3c7 100%
          )`,
        }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-200/50 border border-amber-300"
          >
            <span className="text-amber-700">🌟</span>
            <span className="text-sm font-medium text-amber-800">Platform Features</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Everything You Need
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Professional tools designed for educators. Create worksheets that look like they took hours, in just minutes.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                className={`
                  relative p-6 rounded-2xl h-full transition-all duration-300
                  ${feature.highlighted
                    ? 'bg-gradient-to-br from-amber-100 via-white to-orange-50 border-2 border-amber-300 shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg'
                  }
                `}
                whileHover={{
                  y: -5,
                  boxShadow: feature.highlighted
                    ? '0 25px 50px -12px rgba(245,158,11,0.25)'
                    : '0 20px 40px -10px rgba(0,0,0,0.1)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Highlighted badge */}
                {feature.highlighted && (
                  <div className="absolute -top-3 left-6">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                      ⭐ Key Feature
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`
                    w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                    ${feature.highlighted
                      ? 'bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg'
                      : 'bg-gradient-to-br from-amber-100 to-orange-100'
                    }
                  `}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className={`
                    text-xl font-bold mb-3
                    ${feature.highlighted ? 'text-stone-900' : 'text-stone-800'}
                  `}
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${feature.highlighted ? 'text-stone-700' : 'text-stone-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200/50 p-6">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No per-worksheet fees</span>
              </div>
              <div className="w-px h-5 bg-stone-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited downloads</span>
              </div>
              <div className="w-px h-5 bg-stone-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Auto-generated answer keys</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
