'use client';

interface TeacherTestimonial {
  quote: string;
  name: string;
  role: string;
  school: string;
}

interface TeacherTestimonialsProps {
  testimonials: TeacherTestimonial[];
}

export default function TeacherTestimonials({ testimonials }: TeacherTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">What Educators Say</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">Trusted by teachers across the country</p>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <svg className="w-8 h-8 text-gray-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 italic">
                {t.quote}
              </blockquote>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}, {t.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
