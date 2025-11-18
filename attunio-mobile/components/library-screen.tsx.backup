import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
"use client"





interface LibraryScreenProps {
  onLearnMore: (topic: string) => void
}

export function LibraryScreen({ onLearnMore }: LibraryScreenProps) {
  const featuredContent = [
    {
      category: "Understanding ADHD",
      title: "Your Complete Guide to ADHD & Biomarkers",
      src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=3431&auto=format&fit=crop",
      content: (
        <View className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-8 rounded-3xl mb-4">
          <Text className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            <Text className="font-bold text-neutral-700 dark:text-neutral-200">
              Track what matters for ADHD management.
            </Text>{" "}
            Learn how wearable biomarkers like HRV, sleep architecture, and activity patterns provide research-validated
            insights into your ADHD symptoms.
          </Text>
          <TouchableOpacity
            onPress={() => onLearnMore("What is ADHD?")}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-2 text-sm"
          >
            Start Learning
          </TouchableOpacity>
        </View>
      ),
    },
    {
      category: "Sleep & ADHD",
      title: "Optimize your sleep for better focus",
      src: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=3540&auto=format&fit=crop",
      content: (
        <View className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-8 rounded-3xl mb-4">
          <Text className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            <Text className="font-bold text-neutral-700 dark:text-neutral-200">
              Sleep quality directly impacts ADHD symptoms.
            </Text>{" "}
            Discover how REM sleep disruption, sleep latency, and fragmentation affect your focus, and learn
            evidence-based strategies.
          </Text>
          <TouchableOpacity
            onPress={() => onLearnMore("ADHD and Sleep")}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-2 text-sm"
          >
            Improve Your Sleep
          </TouchableOpacity>
        </View>
      ),
    },
    {
      category: "Research & Science",
      title: "The science behind our tracking",
      src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=3540&auto=format&fit=crop",
      content: (
        <View className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-8 rounded-3xl mb-4">
          <Text className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            <Text className="font-bold text-neutral-700 dark:text-neutral-200">
              Research-validated biomarker tracking.
            </Text>{" "}
            Our platform uses peer-reviewed machine learning models with 89% accuracy for ADHD pattern detection.
          </Text>
          <TouchableOpacity
            onPress={() => onLearnMore("89% Accuracy Study")}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-2 text-sm"
          >
            View Research
          </TouchableOpacity>
        </View>
      ),
    },
  ]

  const cards = featuredContent.map((card, index) => <Card key={card.src} card={card} index={index} />)

  const educationalContent = [
    {
      category: "Understanding ADHD",
      articles: [
        {
          title: "What is ADHD?",
          description: "Learn about Attention-Deficit/Hyperactivity Disorder and how it affects focus and behavior.",
          readTime: "5 min",
          tag: "Basics",
        },
        {
          title: "ADHD and Sleep",
          description: "Discover the connection between sleep quality and ADHD symptoms.",
          readTime: "7 min",
          tag: "Sleep",
        },
        {
          title: "Exercise and ADHD",
          description: "How physical activity can improve focus and reduce hyperactivity.",
          readTime: "6 min",
          tag: "Lifestyle",
        },
      ],
    },
    {
      category: "Biomarkers Explained",
      articles: [
        {
          title: "Heart Rate Variability (HRV)",
          description: "Understand how HRV measures stress and autonomic nervous system activity.",
          readTime: "8 min",
          tag: "HRV",
        },
        {
          title: "Sleep Architecture",
          description: "Learn about REM, deep, and light sleep stages and their impact on ADHD.",
          readTime: "10 min",
          tag: "Sleep",
        },
        {
          title: "Activity Patterns",
          description: "How movement patterns and step variability relate to ADHD symptoms.",
          readTime: "7 min",
          tag: "Activity",
        },
      ],
    },
    {
      category: "Research & Science",
      articles: [
        {
          title: "89% Accuracy Study",
          description: "The Fitbit-based machine learning research predicting ADHD with high accuracy.",
          readTime: "12 min",
          tag: "Research",
        },
        {
          title: "HRV and ADHD Detection",
          description: "Multiparametric physiological models achieving 85.5% accuracy.",
          readTime: "10 min",
          tag: "Research",
        },
        {
          title: "Digital Phenotyping",
          description: "How wearables enable continuous ADHD monitoring outside the clinic.",
          readTime: "9 min",
          tag: "Technology",
        },
      ],
    },
  ]

  return (
    <View className="pb-24 min-h-screen bg-[#F8F7F4]">
      <View className="bg-white border-b border-slate-200 p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8">
        <View className="max-w-6xl mx-auto">
          <Text className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-3 sm:mb-4 font-semibold">(Library)</Text>
          <Text className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
            Library
          </Text>
          <Text className="text-base sm:text-lg text-slate-600">
            Learn about ADHD, biomarkers, and how to optimize your focus
          </Text>
        </View>
      </View>

      <View className="w-full py-6 md:py-8">
        <View className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">Featured Content</Text>
          <Carousel items={cards} />
        </View>
      </View>

      <View className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 mt-16">
        {educationalContent.map((section) => (
          <View key={section.category}>
            <Text className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
              {section.category}
            </Text>
            <View className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {section.articles.map((article) => (
                <View
                  key={article.title}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onPress={() => onLearnMore(article.title)}
                >
                  <View className="flex items-start justify-between gap-4">
                    <View className="flex-1">
                      <View className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Text className="text-base sm:text-lg font-semibold text-slate-900">{article.title}</Text>
                        <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">{article.tag}</Badge>
                      </View>
                      <Text className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                        {article.description}
                      </Text>
                      <View className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <Textath
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {article.readTime} read
                      </View>
                    </View>
                    <svg
                      className="w-5 h-5 text-slate-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View className="bg-teal-50 border border-teal-200 rounded-3xl p-6 sm:p-8 lg:p-10 text-center shadow-sm">
          <Text className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
            Can't find what you're looking for?
          </Text>
          <Text className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6">
            Submit a question and we'll add it to our library
          </Text>
          <TouchableOpacity className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6">
            Ask a Question
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
