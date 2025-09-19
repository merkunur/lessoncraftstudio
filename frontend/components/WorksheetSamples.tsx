'use client';

import { useState, useEffect } from 'react';

interface WorksheetSample {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  difficulty: string;
  ageRange: string;
}

interface SamplesContent {
  samples: WorksheetSample[];
  sectionTitle: string;
  sectionSubtitle: string;
  ctaText: string;
  ctaUrl?: string;
  categories?: Record<string, string>;
  difficulties?: Record<string, string>;
  modalLabels?: {
    ageRange?: string;
    difficulty?: string;
    category?: string;
  };
}

interface WorksheetSamplesProps {
  locale?: string;
}

export default function WorksheetSamples({ locale = 'en' }: WorksheetSamplesProps) {
  const [content, setContent] = useState<SamplesContent>({
    samples: [],
    sectionTitle: 'Worksheet Samples Gallery',
    sectionSubtitle: 'Click on any worksheet to see a larger preview.',
    ctaText: 'Explore All 33 Worksheet Generators →',
    ctaUrl: `/${locale}/apps`,
    categories: {},
    difficulties: {},
    modalLabels: {
      ageRange: 'Age Range',
      difficulty: 'Difficulty',
      category: 'Category'
    }
  });
  const [selectedSample, setSelectedSample] = useState<WorksheetSample | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSamples();
  }, [locale]);

  const fetchSamples = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/homepage/content?locale=${locale}`);

      if (response.ok) {
        const data = await response.json();
        const apiContent = data.content;

        if (apiContent?.samples && apiContent.samples.length > 0) {
          // Transform the samples data
          const transformedSamples = apiContent.samples.map((sample: any, index: number) => ({
            id: sample.id || `sample-${index}`,
            name: sample.name || 'Untitled',
            category: sample.category || 'general',
            image: sample.image || sample.image_url || '/worksheet-samples/placeholder.png',
            description: sample.description || 'No description available',
            difficulty: sample.difficulty || 'Easy',
            ageRange: sample.ageRange || sample.age_range || '5-7 years'
          }));

          // Update all content
          setContent({
            samples: transformedSamples,
            sectionTitle: apiContent.samplesSection?.title || 'Worksheet Samples Gallery',
            sectionSubtitle: apiContent.samplesSection?.subtitle || 'Click on any worksheet to see a larger preview.',
            ctaText: apiContent.samplesSection?.cta || 'Explore All 33 Worksheet Generators →',
            ctaUrl: `/${locale}/apps`,
            categories: apiContent.samplesSection?.categories || {},
            difficulties: apiContent.samplesSection?.difficulties || {},
            modalLabels: {
              ageRange: apiContent.samplesSection?.modalLabels?.ageRange || 'Age Range',
              difficulty: apiContent.samplesSection?.modalLabels?.difficulty || 'Difficulty',
              category: apiContent.samplesSection?.modalLabels?.category || 'Category'
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch worksheet samples:', error);
      // Use fallback samples
      setContent(prev => ({ ...prev, samples: fallbackSamples }));
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback samples in case API fails
  const fallbackSamples: WorksheetSample[] = [
    {
      id: 'alphabet',
      name: 'Alphabet Train',
      category: 'literacy',
      image: '/worksheet-samples/alphabet.png',
      description: 'Fun alphabet learning with colorful train cars',
      difficulty: 'Easy',
      ageRange: '3-5 years'
    },
    {
      id: 'code-addition',
      name: 'Code Addition',
      category: 'math',
      image: '/worksheet-samples/code-addition.png',
      description: 'Crack the code with addition puzzles',
      difficulty: 'Medium',
      ageRange: '6-8 years'
    },
    {
      id: 'graph',
      name: 'Chart & Count',
      category: 'math',
      image: '/worksheet-samples/graph.png',
      description: 'Learn graphing and data visualization',
      difficulty: 'Medium',
      ageRange: '7-10 years'
    },
    {
      id: 'hidden-object',
      name: 'Hidden Objects',
      category: 'puzzle',
      image: '/worksheet-samples/hidden-object.png',
      description: 'Find hidden objects in detailed scenes',
      difficulty: 'Easy',
      ageRange: '5-8 years'
    },
    {
      id: 'i-spy',
      name: 'I Spy Game',
      category: 'puzzle',
      image: '/worksheet-samples/i-spy.png',
      description: 'Classic I Spy searching game',
      difficulty: 'Easy',
      ageRange: '4-7 years'
    },
    {
      id: 'train',
      name: 'Pattern Train',
      category: 'logic',
      image: '/worksheet-samples/train.png',
      description: 'Complete the pattern sequences',
      difficulty: 'Medium',
      ageRange: '5-8 years'
    }
  ];

  // Helper function for difficulty colors
  const getDifficultyColor = (difficulty: string) => {
    const diffLower = difficulty.toLowerCase();
    if (diffLower === 'easy' || diffLower === 'einfach' || diffLower === 'lätt') {
      return 'bg-green-100 text-green-700';
    } else if (diffLower === 'hard' || diffLower === 'schwer' || diffLower === 'svår') {
      return 'bg-red-100 text-red-700';
    } else {
      return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.sectionSubtitle}
            </p>
          </div>

          {/* Simple Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.samples.map((sample) => (
              <div
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Image */}
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <img
                    src={sample.image}
                    alt={sample.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="20"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {sample.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {sample.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {sample.ageRange}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      getDifficultyColor(sample.difficulty)
                    }`}>
                      {content.difficulties?.[sample.difficulty.toLowerCase()] || sample.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <a
              href={content.ctaUrl || `/${locale}/apps`}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Simple Modal */}
      {selectedSample && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSample(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedSample.name}</h3>
              <button
                onClick={() => setSelectedSample(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedSample.image}
                alt={selectedSample.name}
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="24"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="mt-4">
                <p className="text-gray-600 mb-2">{selectedSample.description}</p>
                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>{content.modalLabels?.ageRange || 'Age Range'}:</strong> {selectedSample.ageRange}
                  </span>
                  <span>
                    <strong>{content.modalLabels?.difficulty || 'Difficulty'}:</strong> {
                      content.difficulties?.[selectedSample.difficulty.toLowerCase()] || selectedSample.difficulty
                    }
                  </span>
                  {selectedSample.category && (
                    <span>
                      <strong>{content.modalLabels?.category || 'Category'}:</strong> {
                        content.categories?.[selectedSample.category.toLowerCase()] || selectedSample.category
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}