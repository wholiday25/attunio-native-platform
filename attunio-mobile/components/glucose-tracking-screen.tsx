// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
interface GlucoseTrackingScreenProps {
  onBack?: () => void
}

export function GlucoseTrackingScreen({ onBack }: GlucoseTrackingScreenProps) {
  const glucoseData = [
    { time: "6AM", value: 82, focus: 45, label: "Fasted" },
    { time: "7AM", value: 88, focus: 52, label: "Morning" },
    { time: "8AM", value: 145, focus: 38, label: "Breakfast Spike" },
    { time: "9AM", value: 128, focus: 42, label: "Post-meal" },
    { time: "10AM", value: 95, focus: 68, label: "Optimal" },
    { time: "11AM", value: 92, focus: 72, label: "Stable" },
    { time: "12PM", value: 158, focus: 35, label: "Lunch Spike" },
    { time: "1PM", value: 142, focus: 40, label: "Post-lunch" },
    { time: "2PM", value: 72, focus: 28, label: "Crash" },
    { time: "3PM", value: 68, focus: 22, label: "Low Energy" },
    { time: "4PM", value: 88, focus: 55, label: "Recovery" },
    { time: "5PM", value: 95, focus: 62, label: "Stable" },
    { time: "6PM", value: 135, focus: 48, label: "Dinner" },
    { time: "7PM", value: 108, focus: 58, label: "Evening" },
    { time: "8PM", value: 95, focus: 65, label: "Settled" },
  ]

  const mealImpacts = [
    {
      meal: "Breakfast (8:00 AM)",
      type: "Cereal + OJ",
      spike: "+57 mg/dL",
      duration: "2.5 hrs",
      focusImpact: "-38% focus",
      color: "chart-1",
    },
    {
      meal: "Lunch (12:00 PM)",
      type: "Sandwich + Chips",
      spike: "+66 mg/dL",
      duration: "3 hrs",
      focusImpact: "-45% focus",
      color: "chart-1",
    },
    {
      meal: "Dinner (6:00 PM)",
      type: "Protein + Veggies",
      spike: "+40 mg/dL",
      duration: "1.5 hrs",
      focusImpact: "-18% focus",
      color: "chart-3",
    },
  ]

  const insights = [
    {
      title: "Glucose Crashes Predict Brain Fog",
      description:
        "Your focus drops to 22% when glucose falls below 70 mg/dL. ADHD brains are especially sensitive to glucose variability.",
      action: "Eat protein + fat snacks every 3-4 hours",
      severity: "high",
    },
    {
      title: "High-Carb Breakfasts Cause Afternoon Crashes",
      description:
        "Cereal + juice spikes glucose to 145 mg/dL, followed by a crash 4 hours later. This pattern worsens ADHD symptoms.",
      action: "Try eggs + avocado for stable energy",
      severity: "high",
    },
    {
      title: "Protein-Rich Meals Optimize Focus",
      description:
        "Your focus score is 68% when glucose stays 80-100 mg/dL. Protein + fat meals keep you in this optimal range longer.",
      action: "Add protein to every meal",
      severity: "medium",
    },
  ]

  const maxGlucose = Math.max(...glucoseData.map((d) => d.value))
  const maxFocus = Math.max(...glucoseData.map((d) => d.focus))

  return (
    <View className="pb-24">
      {onBack && (
        <TouchableOpacity onPress={onBack} className="flex items-center gap-2 text-primary mb-4 hover:underline">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </TouchableOpacity>
      )}

      <View className="bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-background p-8 mb-6 rounded-2xl">
        <View className="flex items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-bold text-foreground mb-2">Glucose & Focus</Text>
            <Text className="text-muted-foreground">How blood sugar affects your ADHD symptoms</Text>
          </View>
          <Badge className="bg-orange-500/10 text-orange-600 border-0 text-base px-4 py-2">
            <View className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
            Demo CGM
          </Badge>
        </View>

        <View className="grid grid-cols-3 gap-4 mt-6">
          <View className="bg-card rounded-xl p-4 border border-border">
            <Text className="text-xs text-muted-foreground mb-1">Current</Text>
            <Text className="text-3xl font-bold text-foreground">
              95 <Text className="text-lg text-muted-foreground font-normal">mg/dL</Text>
            </Text>
            <Badge className="bg-chart-2/10 text-chart-2 border-0 mt-2 text-xs">Optimal</Badge>
          </View>
          <View className="bg-card rounded-xl p-4 border border-border">
            <Text className="text-xs text-muted-foreground mb-1">Time in Range</Text>
            <Text className="text-3xl font-bold text-foreground">
              68<Text className="text-lg text-muted-foreground font-normal">%</Text>
            </Text>
            <Text className="text-xs text-muted-foreground mt-2">Target: 70-120 mg/dL</Text>
          </View>
          <View className="bg-card rounded-xl p-4 border border-border">
            <Text className="text-xs text-muted-foreground mb-1">Variability</Text>
            <Text className="text-3xl font-bold text-foreground">
              28<Text className="text-lg text-muted-foreground font-normal">SD</Text>
            </Text>
            <Badge className="bg-chart-3/10 text-chart-3 border-0 mt-2 text-xs">Moderate</Badge>
          </View>
        </View>
      </View>

      <View className="px-4 space-y-6">
        <View className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20">
          <View className="flex items-start gap-3">
            <View className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground mb-1">Terra API CGM Integration</Text>
              <Text className="text-xs text-muted-foreground leading-relaxed">
                Connect your CGM device (Dexcom, Freestyle Libre, etc.) via Terra API to get real-time glucose data and
                ADHD-specific insights. Demo data shown below.
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-card rounded-2xl p-6 border border-border shadow-lg">
          <View className="flex items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-foreground">Today's Glucose Pattern</Text>
            <View className="flex gap-2">
              <Badge className="bg-orange-500/10 text-orange-600 border-0 text-xs">Glucose</Badge>
              <Badge className="bg-primary/10 text-primary border-0 text-xs">Focus Score</Badge>
            </View>
          </View>

          {/* Simplified line chart visualization */}
          <View className="relative h-64 bg-muted/30 rounded-xl p-4 mb-4">
            <View className="absolute inset-4 flex items-end justify-between gap-1">
              {glucoseData.map((point, i) => (
                <View key={i} className="flex-1 flex flex-col items-center gap-1">
                  {/* Glucose bar */}
                  <View
                    className="w-full bg-orange-500 rounded-t transition-all hover:bg-orange-600"
                    style={{ height: `${(point.value / maxGlucose) * 100}%` }}
                    title={`${point.time}: ${point.value} mg/dL`}
                  />
                  {/* Time label */}
                  {i % 3 === 0 && <Text className="text-[10px] text-muted-foreground mt-1">{point.time}</Text>}
                </View>
              ))}
            </View>
            {/* Reference lines */}
            <View className="absolute left-4 right-4 top-[25%] border-t border-dashed border-red-400/50" />
            <Text className="absolute left-6 top-[23%] text-[10px] text-red-600">High (120)</Text>
            <View className="absolute left-4 right-4 top-[60%] border-t border-dashed border-red-400/50" />
            <Text className="absolute left-6 top-[58%] text-[10px] text-red-600">Low (70)</Text>
          </View>

          <View className="mt-4 bg-muted/30 rounded-xl p-4 border border-border">
            <Text className="text-sm text-foreground leading-relaxed">
              <strong>Pattern:</strong> Your focus drops significantly during glucose spikes and crashes. Stable glucose
              (80-100 mg/dL) correlates with your highest focus scores.
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-4">Meal Impact Analysis</Text>
          <Text className="text-sm text-muted-foreground mb-4">How different meals affect your glucose and focus</Text>

          <View className="space-y-3">
            {mealImpacts.map((meal) => (
              <View key={meal.meal} className="bg-card rounded-xl p-5 border border-border shadow-sm">
                <View className="flex items-start justify-between mb-3">
                  <View>
                    <Text className="text-sm font-semibold text-foreground mb-1">{meal.meal}</Text>
                    <Text className="text-xs text-muted-foreground">{meal.type}</Text>
                  </View>
                  <Badge className={`bg-${meal.color}/10 text-${meal.color} border-0`}>
                    {meal.spike.startsWith("+4") || meal.spike.startsWith("+5") || meal.spike.startsWith("+6")
                      ? "High Spike"
                      : "Moderate"}
                  </Badge>
                </View>

                <View className="grid grid-cols-3 gap-3">
                  <View>
                    <Text className="text-xs text-muted-foreground mb-1">Spike</Text>
                    <Text className="text-base font-bold text-foreground">{meal.spike}</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-muted-foreground mb-1">Duration</Text>
                    <Text className="text-base font-bold text-foreground">{meal.duration}</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-muted-foreground mb-1">Focus Impact</Text>
                    <Text className="text-base font-bold text-chart-1">{meal.focusImpact}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-4">Glucose Insights</Text>

          <View className="space-y-3">
            {insights.map((insight) => (
              <View
                key={insight.title}
                className={`bg-card rounded-xl p-5 border ${
                  insight.severity === "high" ? "border-chart-1/30 bg-chart-1/5" : "border-border"
                } shadow-sm`}
              >
                <View className="flex items-start gap-3 mb-3">
                  <View
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      insight.severity === "high" ? "bg-chart-1/10" : "bg-chart-3/10"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${insight.severity === "high" ? "text-chart-1" : "text-chart-3"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <Textath
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground mb-2">{insight.title}</Text>
                    <Text className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.description}</Text>
                    <View className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <Text className="text-xs font-medium text-primary">Action: {insight.action}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
          <View className="flex items-start gap-4">
            <View className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-foreground mb-3">Why Glucose Matters for ADHD</Text>
              <View className="space-y-2.5">
                <View className="flex items-start gap-3 text-sm text-foreground/80">
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <Text>
                    <strong>Brain Energy Crisis:</strong> ADHD brains show reduced glucose metabolism in the prefrontal
                    cortex (executive function area)
                  </Text>
                </View>
                <View className="flex items-start gap-3 text-sm text-foreground/80">
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <Text>
                    <strong>Dopamine Connection:</strong> Glucose fluctuations prevent dopamine production, worsening
                    ADHD symptoms
                  </Text>
                </View>
                <View className="flex items-start gap-3 text-sm text-foreground/80">
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <Text>
                    <strong>Medication Synergy:</strong> Stimulant meds work by normalizing glucose utilization in the
                    brain
                  </Text>
                </View>
                <View className="flex items-start gap-3 text-sm text-foreground/80">
                  <View className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <Text>
                    <strong>Symptom Prediction:</strong> Spikes cause hyperactivity/restlessness; crashes cause brain
                    fog/inattention
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                variant="outline"
                className="mt-4 rounded-full border-purple-500 text-purple-600 text-sm h-9 bg-transparent"
              >
                Read Research Studies →
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <Text className="text-lg font-bold text-foreground mb-2">Connect Your CGM</Text>
          <Text className="text-sm text-muted-foreground mb-4">
            Get real-time glucose data and personalized ADHD insights from your continuous glucose monitor
          </Text>
          <View className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-card text-foreground border border-border">Dexcom G7</Badge>
            <Badge className="bg-card text-foreground border border-border">Freestyle Libre</Badge>
            <Badge className="bg-card text-foreground border border-border">Levels</Badge>
            <Badge className="bg-card text-foreground border border-border">Nutrisense</Badge>
          </View>
          <TouchableOpacity className="rounded-full bg-primary text-white w-full">Connect CGM Device</TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
