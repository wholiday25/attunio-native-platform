// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
// Motion animations removed - use react-native-reanimated for animations

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <View className="min-h-screen bg-background">
      {/* Hero Section */}
      <View className="container mx-auto px-4 pt-20 pb-32">
        <View className="max-w-7xl mx-auto">
          <View className="grid lg:grid-cols-2 gap-16 items-center">
            <View initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                Research-Backed ADHD Tracking
              </Badge>
              <Text className="text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                Every Rep Counts. Make It Matter With <Text className="text-primary">Attunio.</Text>
              </Text>
              <Text className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Attunio is designed for individuals and families who want to quantify ADHD patterns using wearable data.
                Whether you're seeking diagnosis, optimizing treatment, or improving daily focus, we help turn data into
                actionable insights.
              </Text>
              <View className="flex flex-col sm:flex-row gap-4">
                <TouchableOpacity
                  size="lg"
                  onPress={onGetStarted}
                  className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 rounded-full"
                >
                  Get Started
                </TouchableOpacity>
                <TouchableOpacity size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 bg-transparent">
                  Schedule Free Demo
                </TouchableOpacity>
              </View>
            </View>

            <View
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <View className="relative mx-auto max-w-sm aspect-[9/19] bg-card rounded-[3rem] border-8 border-border shadow-2xl overflow-hidden">
                <View className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 p-6 overflow-y-auto">
                  <View className="space-y-6">
                    <View>
                      <Text className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Your Real-Time</Text>
                      <Text className="text-3xl font-bold text-foreground">Focus Score</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-6 border border-border shadow-lg">
                      <View className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center mx-auto mb-4">
                        <Text className="text-4xl font-bold text-primary">78</Text>
                      </View>
                      <Text className="text-center text-sm text-muted-foreground">Good Focus Today</Text>
                    </View>

                    <View className="space-y-3">
                      <View className="bg-card rounded-xl p-4 border border-border">
                        <View className="flex justify-between items-center mb-2">
                          <Text className="text-sm text-muted-foreground">Sleep Quality</Text>
                          <Text className="text-sm font-bold">72%</Text>
                        </View>
                        <View className="h-2 bg-muted rounded-full overflow-hidden">
                          <View className="h-full bg-primary rounded-full" style={{ width: "72%" }} />
                        </View>
                      </View>

                      <View className="bg-card rounded-xl p-4 border border-border">
                        <View className="flex justify-between items-center mb-2">
                          <Text className="text-sm text-muted-foreground">Activity Level</Text>
                          <Text className="text-sm font-bold">45%</Text>
                        </View>
                        <View className="h-2 bg-muted rounded-full overflow-hidden">
                          <View className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
                        </View>
                      </View>

                      <View className="bg-card rounded-xl p-4 border border-border">
                        <View className="flex justify-between items-center mb-2">
                          <Text className="text-sm text-muted-foreground">Stress Management</Text>
                          <Text className="text-sm font-bold">68%</Text>
                        </View>
                        <View className="h-2 bg-muted rounded-full overflow-hidden">
                          <View className="h-full bg-primary rounded-full" style={{ width: "68%" }} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View className="bg-primary/5 py-20">
        <View className="container mx-auto px-4">
          <View className="max-w-5xl mx-auto">
            <View className="grid md:grid-cols-3 gap-12 text-center">
              <View>
                <Text className="text-6xl font-bold text-primary mb-3">89%</Text>
                <Text className="text-lg text-foreground font-medium">ML Accuracy</Text>
                <Text className="text-sm text-muted-foreground mt-2">
                  Using Random Forest classification on wearable data
                </Text>
              </View>
              <View>
                <Text className="text-6xl font-bold text-primary mb-3">150+</Text>
                <Text className="text-lg text-foreground font-medium">Devices Supported</Text>
                <Text className="text-sm text-muted-foreground mt-2">Fitbit, Oura, Garmin, Apple Health, and more</Text>
              </View>
              <View>
                <Text className="text-6xl font-bold text-primary mb-3">24/7</Text>
                <Text className="text-lg text-foreground font-medium">Passive Tracking</Text>
                <Text className="text-sm text-muted-foreground mt-2">Continuous monitoring without manual input</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Our Core Value Section */}
      <View className="py-32 container mx-auto px-4">
        <View className="max-w-5xl mx-auto text-center mb-20">
          <Text className="text-5xl font-bold text-foreground mb-6">Our Core Value</Text>
          <Text className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Attunio combines validated biomarkers with real-time wearable data to help you understand, track, and
            optimize your ADHD patterns.
          </Text>
        </View>

        <View className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Feature Card 1 */}
          <View className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <View className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </View>
            <Text className="text-2xl font-bold text-foreground mb-4">Biomarker Dashboard</Text>
            <Text className="text-muted-foreground leading-relaxed">
              Track HRV, sleep architecture, activity patterns, and stress markers validated by peer-reviewed research
              with up to 89% accuracy for ADHD prediction.
            </Text>
          </View>

          {/* Feature Card 2 */}
          <View className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <View className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </View>
            <Text className="text-2xl font-bold text-foreground mb-4">Real-Time Focus Score</Text>
            <Text className="text-muted-foreground leading-relaxed">
              Get a daily Focus Score combining sleep quality, activity level, stress management, and glucose stability
              to understand your optimal performance windows.
            </Text>
          </View>

          {/* Feature Card 3 */}
          <View className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <View className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </View>
            <Text className="text-2xl font-bold text-foreground mb-4">Lab Result Integration</Text>
            <Text className="text-muted-foreground leading-relaxed">
              Connect blood work results for thyroid, iron, vitamin D, and other ADHD-relevant markers to complete your
              health picture alongside wearable data.
            </Text>
          </View>

          {/* Feature Card 4 */}
          <View className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <View className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </View>
            <Text className="text-2xl font-bold text-foreground mb-4">Medication Tracking</Text>
            <Text className="text-muted-foreground leading-relaxed">
              Log medication timing and dosage, then see how your biomarkers respond over time to optimize your
              treatment with data-driven insights.
            </Text>
          </View>
        </View>
      </View>

      {/* Real-Time Progress Tracking Section */}
      <View className="bg-primary/5 py-32">
        <View className="container mx-auto px-4">
          <View className="max-w-5xl mx-auto">
            <View className="grid lg:grid-cols-2 gap-16 items-center">
              <View>
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Pattern Recognition</Badge>
                <Text className="text-5xl font-bold text-foreground mb-6">
                  Real-Time Progress Tracking — Monitor Your Focus Journey In 4 Easy Steps
                </Text>
                <Text className="text-lg text-muted-foreground leading-relaxed">
                  Attunio continuously analyzes your wearable data to identify patterns, detect improvements, and alert
                  you to changes that matter for ADHD management.
                </Text>
              </View>

              <View className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Connect Your Device",
                    description: "Link your Fitbit, Oura, Garmin, or Apple Health in seconds",
                  },
                  {
                    step: "02",
                    title: "Track Automatically",
                    description: "Passive monitoring captures sleep, activity, HRV, and stress markers 24/7",
                  },
                  {
                    step: "03",
                    title: "Get Insights",
                    description: "AI-powered analysis highlights patterns and suggests actionable improvements",
                  },
                  {
                    step: "04",
                    title: "Share With Providers",
                    description: "Export reports for doctors, therapists, or family members",
                  },
                ].map((item, index) => (
                  <View
                    key={index}
                    className="flex items-start gap-6 bg-card rounded-2xl p-6 border border-border shadow-sm"
                  >
                    <View className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {item.step}
                    </View>
                    <View>
                      <Text className="text-xl font-bold text-foreground mb-2">{item.title}</Text>
                      <Text className="text-muted-foreground">{item.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Track Your Fitness Journey Section */}
      <View className="py-32 container mx-auto px-4">
        <View className="max-w-5xl mx-auto">
          <View className="grid lg:grid-cols-2 gap-16 items-center">
            <View className="order-2 lg:order-1 space-y-8">
              {[
                {
                  title: "Connect Your Wearable",
                  description: "Supports 150+ devices including Fitbit, Oura, Garmin, Apple Watch, and more",
                },
                {
                  title: "Log Medications",
                  description: "Track medication timing, dosage, and side effects to correlate with biomarker changes",
                },
                {
                  title: "Upload Lab Results",
                  description: "Add blood work for thyroid, iron, vitamin D, and other ADHD-relevant markers",
                },
              ].map((item, index) => (
                <View key={index} className="flex items-start gap-4">
                  <View className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </View>
                  <View>
                    <Text className="text-xl font-bold text-foreground mb-2">{item.title}</Text>
                    <Text className="text-muted-foreground">{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View className="order-1 lg:order-2">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">All-In-One Platform</Badge>
              <Text className="text-5xl font-bold text-foreground mb-6">Track Your Fitness Journey In 3 Easy Ways</Text>
              <Text className="text-lg text-muted-foreground leading-relaxed">
                Attunio is your all-in-one hub for ADHD health tracking, combining wearable data, medication logs, and
                lab results in one place.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Testimonials Section */}
      <View className="bg-primary/5 py-32">
        <View className="container mx-auto px-4">
          <View className="max-w-5xl mx-auto text-center mb-20">
            <Text className="text-5xl font-bold text-foreground mb-6">What Our Members Are Saying</Text>
            <Text className="text-xl text-muted-foreground">
              Real stories from people using Attunio to understand and manage their ADHD
            </Text>
          </View>

          <View className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  '"I\'ve never felt in control of my ADHD until Attunio. Seeing my patterns in real data changed everything."',
                name: "— Sarah M, 28",
                role: "Software Engineer",
              },
              {
                quote:
                  '"My doctor was impressed with the biomarker reports. It made our treatment conversations so much more productive."',
                name: "— Marcus T, 35",
                role: "Marketing Director",
              },
              {
                quote:
                  '"Finally, a tool that doesn\'t require constant manual input. My Fitbit does the work, and Attunio makes sense of it."',
                name: "— Alex K, 42",
                role: "Parent & Educator",
              },
            ].map((testimonial, index) => (
              <View key={index} className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                <View className="mb-6">
                  <svg className="w-10 h-10 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                    <Textath d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </View>
                <Text className="text-lg text-foreground mb-6 leading-relaxed">{testimonial.quote}</Text>
                <View className="border-t border-border pt-6">
                  <Text className="font-bold text-foreground">{testimonial.name}</Text>
                  <Text className="text-sm text-muted-foreground">{testimonial.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Watch Video Section */}
      <View className="py-32 container mx-auto px-4">
        <View className="max-w-5xl mx-auto text-center mb-12">
          <Text className="text-5xl font-bold text-foreground mb-6">Watch How Attunio Works</Text>
          <Text className="text-xl text-muted-foreground">
            See how easy it is to track your ADHD patterns with wearable data
          </Text>
        </View>

        <View className="max-w-4xl mx-auto">
          <View className="relative aspect-video bg-muted rounded-3xl border border-border overflow-hidden shadow-2xl">
            <View className="absolute inset-0 flex items-center justify-center">
              <TouchableOpacity className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <Textath d="M8 5v14l11-7z" />
                </svg>
              </TouchableOpacity>
            </View>
            <Image
              source={require("/person-using-health-tracking-app-on-phone.jpg")}
              alt="Attunio Demo Video"
              className="w-full h-full object-cover opacity-60"
            />
          </View>
        </View>
      </View>

      {/* Pricing Section */}
      <View className="bg-primary/5 py-32">
        <View className="container mx-auto px-4">
          <View className="max-w-5xl mx-auto text-center mb-20">
            <Text className="text-5xl font-bold text-foreground mb-6">Choose Your Attunio Plan</Text>
            <Text className="text-xl text-muted-foreground">Select the plan that fits your ADHD tracking needs</Text>
          </View>

          <View className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Essential Plan */}
            <View className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <Badge className="mb-4 bg-muted text-foreground">Essential</Badge>
              <View className="mb-6">
                <Text className="text-5xl font-bold text-foreground mb-2">
                  $19<Text className="text-xl text-muted-foreground font-normal">/month</Text>
                </Text>
                <Text className="text-muted-foreground">For individuals starting their tracking journey</Text>
              </View>

              <View className="space-y-4 mb-8">
                {[
                  "Basic biomarker dashboard",
                  "Focus Score calculation",
                  "1 wearable device connection",
                  "7-day data history",
                  "Weekly insights email",
                ].map((feature, index) => (
                  <View key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <Text className="text-foreground">{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity size="lg" variant="outline" className="w-full rounded-full border-2 bg-transparent">
                Get Started
              </TouchableOpacity>
            </View>

            {/* Pro Plan */}
            <View className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl transform scale-105 relative">
              <View className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-white text-primary">Most Popular</Badge>
              </View>
              <Badge className="mb-4 bg-white/20 text-white border-0">Pro</Badge>
              <View className="mb-6">
                <Text className="text-5xl font-bold mb-2">
                  $49<Text className="text-xl font-normal opacity-80">/month</Text>
                </Text>
                <Text className="opacity-90">For serious ADHD management</Text>
              </View>

              <View className="space-y-4 mb-8">
                {[
                  "Everything in Essential",
                  "Advanced biomarker analysis",
                  "Unlimited device connections",
                  "90-day data history",
                  "Medication tracking",
                  "Lab result integration",
                  "Exportable reports for doctors",
                  "Priority support",
                ].map((feature, index) => (
                  <View key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <Text>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity size="lg" className="w-full rounded-full bg-white text-primary hover:bg-white/90">
                Get Started
              </TouchableOpacity>
            </View>

            {/* Complete Plan */}
            <View className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <Badge className="mb-4 bg-muted text-foreground">Complete</Badge>
              <View className="mb-6">
                <Text className="text-5xl font-bold text-foreground mb-2">
                  $99<Text className="text-xl text-muted-foreground font-normal">/month</Text>
                </Text>
                <Text className="text-muted-foreground">For families and comprehensive care</Text>
              </View>

              <View className="space-y-4 mb-8">
                {[
                  "Everything in Pro",
                  "Up to 4 family member profiles",
                  "Unlimited data history",
                  "Glucose tracking integration",
                  "Custom biomarker alerts",
                  "Video consultation credits",
                  "Research participation opportunities",
                  "White-glove onboarding",
                ].map((feature, index) => (
                  <View key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <Text className="text-foreground">{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity size="lg" variant="outline" className="w-full rounded-full border-2 bg-transparent">
                Get Started
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View className="py-32 container mx-auto px-4">
        <View className="max-w-5xl mx-auto text-center mb-20">
          <Text className="text-5xl font-bold text-foreground mb-6">Still Have Questions?</Text>
          <Text className="text-xl text-muted-foreground">We've Got The Top Concerns Covered.</Text>
        </View>

        <View className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "What devices does Attunio support?",
              answer:
                "Attunio supports 150+ wearable devices including Fitbit, Oura Ring, Garmin, Apple Watch, Whoop, and any device that syncs with Apple Health or Google Fit.",
            },
            {
              question: "Is Attunio a medical diagnostic tool?",
              answer:
                "No. Attunio is a wellness tracking tool that uses research-validated biomarkers. It is not FDA-approved and should not replace professional medical advice, diagnosis, or treatment.",
            },
            {
              question: "How accurate is the Focus Score?",
              answer:
                "Our Focus Score is based on algorithms derived from peer-reviewed studies showing up to 89% accuracy for ADHD pattern recognition using wearable data. However, individual results may vary.",
            },
            {
              question: "Can I share my data with my doctor?",
              answer:
                "Yes! Attunio allows you to export comprehensive reports in PDF format that you can share with your healthcare provider to support treatment discussions.",
            },
            {
              question: "What if I don't have a wearable device?",
              answer:
                "While wearables provide the most comprehensive data, you can still manually log sleep, activity, and symptoms. We recommend investing in an affordable fitness tracker for best results.",
            },
          ].map((faq, index) => (
            <View key={index} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <Text className="text-xl font-bold text-foreground mb-3">{faq.question}</Text>
              <Text className="text-muted-foreground leading-relaxed">{faq.answer}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Attunio In Your Pocket Section */}
      <View className="bg-primary text-primary-foreground py-32">
        <View className="container mx-auto px-4">
          <View className="max-w-5xl mx-auto">
            <View className="grid lg:grid-cols-2 gap-16 items-center">
              <View>
                <Text className="text-5xl font-bold mb-6">Attunio In Your Pocket — Track ADHD Anywhere, Anytime.</Text>
                <Text className="text-xl mb-8 opacity-90 leading-relaxed">
                  Download the Attunio app for iOS and Android to access your biomarker dashboard, Focus Score, and
                  insights on the go.
                </Text>
                <View className="flex flex-col sm:flex-row gap-4">
                  <TouchableOpacity size="lg" className="h-14 px-8 bg-white text-primary hover:bg-white/90 rounded-full">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <Textath d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    App Store
                  </TouchableOpacity>
                  <TouchableOpacity size="lg" className="h-14 px-8 bg-white text-primary hover:bg-white/90 rounded-full">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <Textath d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    Google Play
                  </TouchableOpacity>
                </View>
              </View>

              <View className="relative">
                <View className="relative mx-auto max-w-xs aspect-[9/19] bg-white rounded-[3rem] border-8 border-white/20 shadow-2xl overflow-hidden">
                  <Image
                    source={require("/mobile-app-showing-adhd-health-tracking-dashboard-.jpg")}
                    alt="Attunio Mobile App"
                    className="w-full h-full object-cover"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* From The Attunio Blog */}
      <View className="py-32 container mx-auto px-4">
        <View className="max-w-5xl mx-auto mb-12">
          <View className="flex items-center justify-between">
            <Text className="text-5xl font-bold text-foreground">From The Attunio Blog</Text>
            <TouchableOpacity variant="ghost" className="text-primary">
              View All Articles →
            </TouchableOpacity>
          </View>
        </View>

        <View className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              image: "/person-sleeping-peacefully-with-wearable-device.jpg",
              title: "REM Sleep Disruption: The ADHD Sleep Connection",
              excerpt:
                "Research shows individuals with ADHD often have reduced REM sleep. Learn how to track and improve your sleep architecture.",
              date: "Dec 15, 2024",
            },
            {
              image: "/heart-rate-variability-graph-on-smartwatch.jpg",
              title: "Heart Rate Variability: A Window Into ADHD",
              excerpt:
                "HRV is one of the most validated biomarkers for ADHD. Discover what your HRV reveals about your nervous system.",
              date: "Dec 10, 2024",
            },
            {
              image: "/doctor-reviewing-health-data-with-patient.jpg",
              title: "Sharing Wearable Data With Your Doctor: Best Practices",
              excerpt:
                "Tips for exporting and presenting your biomarker reports to healthcare providers for more productive conversations.",
              date: "Dec 5, 2024",
            },
          ].map((post, index) => (
            <View
              key={index}
              className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow"
            >
              <View className="aspect-video bg-muted overflow-hidden">
                <Image source={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </View>
              <View className="p-6">
                <Text className="text-sm text-muted-foreground mb-3">{post.date}</Text>
                <Text className="text-xl font-bold text-foreground mb-3">{post.title}</Text>
                <Text className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</Text>
                <TouchableOpacity variant="ghost" className="text-primary p-0 hover:bg-transparent">
                  Read More →
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Final CTA Section */}
      <View className="bg-primary/5 py-32">
        <View className="container mx-auto px-4">
          <View className="max-w-4xl mx-auto text-center">
            <Text className="text-6xl font-bold text-foreground mb-6">Start Tracking Your ADHD Patterns Today</Text>
            <Text className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of individuals using Attunio to understand, track, and optimize their ADHD with wearable
              data.
            </Text>
            <View className="flex flex-col sm:flex-row gap-4 justify-center">
              <TouchableOpacity
                size="lg"
                onPress={onGetStarted}
                className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 rounded-full"
              >
                Get Started Free
              </TouchableOpacity>
              <TouchableOpacity size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full border-2 bg-transparent">
                Schedule a Demo
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-muted-foreground mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="bg-foreground text-background py-16">
        <View className="container mx-auto px-4">
          <View className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
            <View>
              <Text className="text-2xl font-bold mb-4">Attunio</Text>
              <Text className="text-sm opacity-80">Research-backed ADHD tracking using wearable biomarkers.</Text>
            </View>
            <View>
              <Text className="font-bold mb-4">Product</Text>
              <View className="space-y-2 text-sm opacity-80">
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Features
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Pricing
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    FAQ
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Devices
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-bold mb-4">Company</Text>
              <View className="space-y-2 text-sm opacity-80">
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    About
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Blog
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Research
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Contact
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-bold mb-4">Legal</Text>
              <View className="space-y-2 text-sm opacity-80">
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Privacy Policy
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Terms of Service
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity href="#" className="hover:opacity-100">
                    Disclaimer
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View className="max-w-6xl mx-auto mt-12 pt-8 border-t border-background/20 text-center text-sm opacity-60">
            <Text>
              © 2025 Attunio. All rights reserved. This tool is not a medical device and is not intended to diagnose,
              treat, cure, or prevent any disease.
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
