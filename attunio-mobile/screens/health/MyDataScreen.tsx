// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from "react"

interface MyDataScreenProps {
  onBiomarkerClick: (biomarker: string) => void
  onScheduleDoctorReview?: () => void
}

export function MyDataScreen({ onBiomarkerClick, onScheduleDoctorReview }: MyDataScreenProps) {
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<string[]>([])
  const [biomarkerData, setBiomarkerData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCardsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Fetch real biomarker data from API
  useEffect(() => {
    async function loadBiomarkers() {
      try {
        const response = await fetch('/api/biomarkers/latest?days=30');
        
        if (response.ok) {
          const data = await response.json();
          console.log('[My Data] ✅ Loaded biomarker data:', data);
          setBiomarkerData(data.data || []);
          setUseMockData(false);
        } else {
          console.log('[My Data] ⚠️ Using mock data (API unavailable)');
          setUseMockData(true);
        }
      } catch (error) {
        console.error('[My Data] Error loading biomarkers:', error);
        setUseMockData(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBiomarkers();
  }, [])

  // Transform real API data into priority biomarkers display format
  const getPriorityBiomarkers = () => {
    if (useMockData || biomarkerData.length === 0) {
      return mockPriorityBiomarkers;
    }

    // Calculate averages from recent data
    const recent = biomarkerData.slice(0, 7);
    const avgHRV = recent.reduce((sum, d) => sum + (d.hrv || 0), 0) / recent.length;
    const avgSleepEff = recent.reduce((sum, d) => sum + (d.sleepEfficiency || 0), 0) / recent.length;
    const avgRHR = recent.reduce((sum, d) => sum + (d.restingHeartRate || 0), 0) / recent.length;
    const avgActive = recent.reduce((sum, d) => sum + (d.activeMinutes || 0), 0) / recent.length;

    return [
      {
        name: "Heart Rate Variability",
        value: `${Math.round(avgHRV)} ms`,
        status: avgHRV < 40 ? "Needs Attention" : avgHRV < 50 ? "Improving" : "Good",
        color: avgHRV < 40 ? "chart-1" : avgHRV < 50 ? "chart-3" : "chart-2",
        importance: "Critical for ADHD - 85.5% accuracy",
        change: biomarkerData.length > 7 ? `${Math.round(((avgHRV - biomarkerData[7].hrv) / biomarkerData[7].hrv) * 100)}%` : "N/A",
        trend: avgHRV > (biomarkerData[7]?.hrv || 0) ? "improving" : "declining",
        percentile: Math.min(95, Math.round((avgHRV / 100) * 100)),
        optimalRange: "50-100 ms",
      },
      {
        name: "Sleep Efficiency",
        value: `${Math.round(avgSleepEff)}%`,
        status: avgSleepEff < 75 ? "Needs Work" : avgSleepEff < 85 ? "Improving" : "Good",
        color: avgSleepEff < 75 ? "chart-1" : avgSleepEff < 85 ? "chart-3" : "chart-2",
        importance: "Core sleep quality metric",
        change: biomarkerData.length > 7 ? `${Math.round(avgSleepEff - biomarkerData[7].sleepEfficiency)}%` : "N/A",
        trend: avgSleepEff > (biomarkerData[7]?.sleepEfficiency || 0) ? "improving" : "declining",
        percentile: Math.round(avgSleepEff),
        optimalRange: "85-95%",
      },
      {
        name: "Resting Heart Rate",
        value: `${Math.round(avgRHR)} bpm`,
        status: avgRHR > 80 ? "Elevated" : avgRHR > 70 ? "Normal" : "Good",
        color: avgRHR > 80 ? "chart-1" : avgRHR > 70 ? "chart-3" : "chart-2",
        importance: "Autonomic nervous system health",
        change: biomarkerData.length > 7 ? `${Math.round(avgRHR - biomarkerData[7].restingHeartRate)}` : "N/A",
        trend: avgRHR < (biomarkerData[7]?.restingHeartRate || 0) ? "improving" : "stable",
        percentile: Math.min(95, 100 - Math.round((avgRHR - 60) * 2)),
        optimalRange: "60-70 bpm",
      },
      {
        name: "Activity Level",
        value: `${Math.round(avgActive)} min`,
        status: avgActive < 30 ? "Low" : avgActive < 60 ? "Moderate" : "Good",
        color: avgActive < 30 ? "chart-1" : avgActive < 60 ? "chart-3" : "chart-2",
        importance: "Physical activity helps ADHD symptoms",
        change: biomarkerData.length > 7 ? `${Math.round(avgActive - biomarkerData[7].activeMinutes)} min` : "N/A",
        trend: avgActive > (biomarkerData[7]?.activeMinutes || 0) ? "improving" : "stable",
        percentile: Math.min(95, Math.round((avgActive / 150) * 100)),
        optimalRange: "60-150 min/day",
      },
    ];
  };

  const mockPriorityBiomarkers = [
    {
      name: "Heart Rate Variability",
      value: "42 ms",
      status: "Needs Attention",
      color: "chart-1",
      importance: "Critical for ADHD - 85.5% accuracy",
      change: "-8%",
      trend: "declining",
      percentile: 35,
      optimalRange: "50-100 ms",
    },
    {
      name: "Glucose Stability",
      value: "68% in range",
      status: "Needs Work",
      color: "chart-3",
      importance: "Brain energy & dopamine production",
      change: "-5%",
      trend: "stable",
      percentile: 68,
      optimalRange: "70-80%",
    },
    {
      name: "REM Sleep",
      value: "14%",
      status: "Below Target",
      color: "chart-1",
      importance: "ADHD linked to REM disruption",
      change: "-12%",
      trend: "improving",
      percentile: 42,
      optimalRange: "20-25%",
    },
    {
      name: "Sleep Efficiency",
      value: "72%",
      status: "Improving",
      color: "chart-3",
      importance: "Core sleep quality metric",
      change: "+3%",
      trend: "improving",
      percentile: 62,
      optimalRange: "85-95%",
    },
  ]

  const priorityBiomarkers = getPriorityBiomarkers();

  const clinicalBiomarkers = [
    {
      name: "Vitamin D",
      value: "22 ng/mL",
      status: "Low",
      color: "chart-1",
      importance: "Affects dopamine",
      adhdInfo:
        "Vitamin D deficiency is 2x more common in ADHD. It affects dopamine receptor gene expression and prefrontal cortex function. Low levels worsen focus, mood regulation, and executive function.",
      normal: "30-50 ng/mL optimal for ADHD",
      trend: "improving",
      optimalRange: "30-50 ng/mL",
    },
    {
      name: "Ferritin",
      value: "15 ng/mL",
      status: "Low",
      color: "chart-1",
      importance: "Focus & energy",
      adhdInfo:
        "Iron deficiency (ferritin <30) is linked to restless legs and poor focus. Iron is required for dopamine synthesis. Studies show 84% of ADHD children have low ferritin.",
      normal: "50-100 ng/mL optimal for ADHD",
      trend: "stable",
      optimalRange: "50-100 ng/mL",
    },
    {
      name: "Magnesium",
      value: "1.8 mg/dL",
      status: "Borderline",
      color: "chart-3",
      importance: "Calms nervous system",
      adhdInfo:
        "Magnesium deficiency causes hyperactivity and poor concentration. It regulates NMDA receptors and supports GABA production. 95% of ADHD patients have suboptimal magnesium.",
      normal: "2.0-2.6 mg/dL optimal",
      trend: "stable",
      optimalRange: "2.0-2.6 mg/dL",
    },
    {
      name: "TSH",
      value: "3.8 mIU/L",
      status: "Borderline",
      color: "chart-3",
      importance: "Mimics ADHD",
      adhdInfo:
        "Subclinical hypothyroidism (TSH >2.5) causes brain fog, fatigue, and poor focus that mimic ADHD. Thyroid hormones regulate neurotransmitter production and brain metabolism.",
      normal: "0.5-2.5 mIU/L optimal range",
      trend: "stable",
      optimalRange: "0.5-2.5 mIU/L",
    },
    {
      name: "Hemoglobin A1C",
      value: "5.4%",
      status: "Good",
      color: "chart-4",
      importance: "Long-term glucose control",
      adhdInfo: "Hemoglobin A1C provides insight into long-term glucose levels, affecting energy and focus.",
      normal: "4.0-5.6% optimal",
      trend: "stable",
      optimalRange: "4.0-5.6%",
    },
    {
      name: "Cortisol",
      value: "18 μg/dL",
      status: "Elevated",
      color: "chart-3",
      importance: "Stress hormone",
      adhdInfo: "Elevated cortisol levels can lead to increased stress and affect focus and mood.",
      normal: "6-18 μg/dL optimal",
      trend: "declining",
      optimalRange: "6-18 μg/dL",
    },
  ]

  const supportingBiomarkers = [
    { name: "Step Variability", value: "47 CV%", status: "High", color: "chart-3", change: "+5%", trend: "stable" },
    { name: "Respiratory Rate", value: "18 bpm", status: "Elevated", color: "chart-3", change: "±0%", trend: "stable" },
    {
      name: "Sleep Latency",
      value: "45 min",
      status: "Extended",
      color: "chart-3",
      change: "-2min",
      trend: "improving",
    },
    { name: "WASO", value: "65 min", status: "Monitor", color: "chart-3", change: "+8min", trend: "declining" },
  ]

  const generalBiomarkers = [
    { name: "Resting Heart Rate", value: "78 bpm", status: "Good", color: "chart-4", trend: "stable" },
    { name: "Active Minutes", value: "28 min", status: "Low", color: "chart-3", trend: "improving" },
    { name: "Deep Sleep", value: "18%", status: "Good", color: "chart-2", trend: "stable" },
    { name: "Light Sleep", value: "68%", status: "High", color: "chart-3", trend: "stable" },
    { name: "Total Sleep Time", value: "5.8 hrs", status: "Low", color: "chart-1", trend: "improving" },
    { name: "Sedentary Time", value: "11.3 hrs", status: "High", color: "chart-3", trend: "declining" },
    { name: "Energy Expenditure", value: "1850 kcal", status: "Good", color: "chart-2", trend: "stable" },
    { name: "Sleep Onset", value: "11:23 PM", status: "Normal", color: "chart-2", trend: "stable" },
  ]

  const correlations = [
    {
      biomarker1: "Heart Rate Variability",
      biomarker2: "Inattention Score",
      correlation: -0.277,
      strength: "Moderate",
      insight: "Lower HRV correlates with higher inattention. Improving HRV through stress management may help focus.",
      research: "Verified in peer-reviewed ADHD studies",
    },
    {
      biomarker1: "Glucose Stability",
      biomarker2: "Focus Score",
      correlation: 0.62,
      strength: "Strong",
      insight: "Better glucose stability significantly improves sustained attention and reduces impulsivity.",
      research: "Novel correlation - groundbreaking Attunio finding",
    },
    {
      biomarker1: "REM Sleep",
      biomarker2: "Executive Function",
      correlation: 0.54,
      strength: "Strong",
      insight: "REM sleep disruption directly impacts working memory and decision-making abilities.",
      research: "81.4% sensitivity in multimodal studies",
    },
    {
      biomarker1: "Ferritin",
      biomarker2: "Restless Legs",
      correlation: -0.71,
      strength: "Strong",
      insight: "Low ferritin strongly predicts restless leg syndrome, affecting sleep quality and next-day focus.",
      research: "84% of ADHD patients show correlation",
    },
    {
      biomarker1: "Vitamin D",
      biomarker2: "Mood Regulation",
      correlation: 0.48,
      strength: "Moderate",
      insight: "Vitamin D deficiency linked to emotional dysregulation and mood swings in ADHD.",
      research: "2x more common deficiency in ADHD",
    },
  ]

  const toggleBiomarkerSelection = (biomarkerName: string) => {
    if (selectedBiomarkers.includes(biomarkerName)) {
      setSelectedBiomarkers(selectedBiomarkers.filter((b) => b !== biomarkerName))
    } else if (selectedBiomarkers.length < 2) {
      setSelectedBiomarkers([...selectedBiomarkers, biomarkerName])
    }
  }

  const findCorrelation = (bio1: string, bio2: string) => {
    return correlations.find(
      (c) =>
        (c.biomarker1 === bio1 && c.biomarker2 === bio2) || (c.biomarker1 === bio2 && c.biomarker2 === bio1)
    )
  }

  const handleDownloadPDF = () => {
    const reportData = {
      name: "Alex",
      dateOfBirth: "January 15, 1995",
      patientId: "ATN-2024-001",
      dateRange: "Last 30 days",
      focusScore: 58,
      focusScoreTrend: "improving",
      biomarkers: [
        // Priority Biomarkers
        {
          name: "Heart Rate Variability",
          value: "42 ms",
          status: "Needs Attention",
          category: "priority",
          trend: "declining",
          percentile: 35,
          optimalRange: "50-100 ms",
        },
        {
          name: "Glucose Stability",
          value: "68% in range",
          status: "Needs Work",
          category: "priority",
          trend: "stable",
          percentile: 68,
          optimalRange: "70-80%",
        },
        {
          name: "REM Sleep",
          value: "14%",
          status: "Below Target",
          category: "priority",
          trend: "improving",
          percentile: 42,
          optimalRange: "20-25%",
        },
        {
          name: "Sleep Efficiency",
          value: "72%",
          status: "Improving",
          category: "priority",
          trend: "improving",
          percentile: 62,
          optimalRange: "85-95%",
        },

        // Clinical Biomarkers
        {
          name: "Vitamin D",
          value: "22 ng/mL",
          status: "Low",
          category: "clinical",
          trend: "improving",
          optimalRange: "30-50 ng/mL",
        },
        {
          name: "Ferritin",
          value: "15 ng/mL",
          status: "Low",
          category: "clinical",
          trend: "stable",
          optimalRange: "50-100 ng/mL",
        },
        {
          name: "Magnesium",
          value: "1.8 mg/dL",
          status: "Borderline",
          category: "clinical",
          trend: "stable",
          optimalRange: "2.0-2.6 mg/dL",
        },
        {
          name: "TSH",
          value: "3.8 mIU/L",
          status: "Borderline",
          category: "clinical",
          trend: "stable",
          optimalRange: "0.5-2.5 mIU/L",
        },
        {
          name: "Hemoglobin A1C",
          value: "5.4%",
          status: "Good",
          category: "clinical",
          trend: "stable",
          optimalRange: "4.0-5.6%",
        },
        {
          name: "Cortisol",
          value: "18 μg/dL",
          status: "Elevated",
          category: "clinical",
          trend: "declining",
          optimalRange: "6-18 μg/dL",
        },

        // Supporting Biomarkers
        { name: "Step Variability", value: "47 CV%", status: "High", category: "supporting", trend: "stable" },
        { name: "Respiratory Rate", value: "18 bpm", status: "Elevated", category: "supporting", trend: "stable" },
        { name: "Sleep Latency", value: "45 min", status: "Extended", category: "supporting", trend: "improving" },
        { name: "WASO", value: "65 min", status: "Monitor", category: "supporting", trend: "declining" },

        // General Health
        { name: "Resting Heart Rate", value: "78 bpm", status: "Good", category: "general", trend: "stable" },
        { name: "Active Minutes", value: "28 min", status: "Low", category: "general", trend: "improving" },
        { name: "Deep Sleep", value: "18%", status: "Good", category: "general", trend: "stable" },
        { name: "Light Sleep", value: "68%", status: "High", category: "general", trend: "stable" },
        { name: "Total Sleep Time", value: "5.8 hrs", status: "Low", category: "general", trend: "improving" },
        { name: "Sedentary Time", value: "11.3 hrs", status: "High", category: "general", trend: "declining" },
        { name: "Energy Expenditure", value: "1850 kcal", status: "Good", category: "general", trend: "stable" },
        { name: "Sleep Onset", value: "11:23 PM", status: "Normal", category: "general", trend: "stable" },
      ],
      trends: [
        {
          biomarker: "HRV",
          change: "+15%",
          significance: "Moderate improvement in stress resilience and autonomic balance",
        },
        {
          biomarker: "Sleep Quality",
          change: "+8%",
          significance: "Better sleep efficiency correlates with improved next-day focus",
        },
        {
          biomarker: "Vitamin D",
          change: "+22 ng/mL",
          significance: "Moved from deficient to sufficient range, supporting dopamine function",
        },
        {
          biomarker: "REM Sleep",
          change: "+3%",
          significance: "Incremental improvement in sleep architecture quality",
        },
      ],
      clinicianNotes:
        "Patient shows consistent improvement in sleep metrics and vitamin D levels following supplementation protocol. Continue current treatment plan with focus on maintaining sleep schedule. Consider retesting ferritin in 6 weeks to assess iron supplementation efficacy. HRV trends suggest stress management techniques are having positive impact.",
    }

    downloadHealthReport(reportData)
  }

  return (
    <View className="pb-24 min-h-screen bg-white">
      {/* Header */}
      <View className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 pt-6 pb-8 max-w-6xl mx-auto">
        <Text className="text-xs uppercase tracking-wider text-slate-500 mb-2">(My Data)</Text>
        <Text className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Biomarkers</Text>
        <Text className="text-slate-600 text-sm sm:text-base">ADHD-focused health metrics from your wearable</Text>

        <View className="mt-6 flex gap-3 flex-wrap">
          <TouchableOpacity
            onPress={() => {
              setCompareMode(!compareMode)
              setSelectedBiomarkers([])
            }}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              compareMode
                ? "bg-[#f38660] text-white shadow-lg"
                : "bg-white border-2 border-slate-300 text-slate-700 hover:border-[#f38660] hover:text-[#f38660]"
            }`}
          >
            {compareMode ? "Exit Compare Mode" : "Compare & Correlate"}
          </TouchableOpacity>
          <TouchableOpacity className="px-5 py-2.5 rounded-full text-sm font-medium bg-white border-2 border-slate-300 text-slate-700 hover:border-[#f38660] hover:text-[#f38660] transition-all">
            Share with Doctor
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownloadPDF}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-white border-2 border-slate-300 text-slate-700 hover:border-[#f38660] hover:text-[#f38660] transition-all"
          >
            Download PDF
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onScheduleDoctorReview}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f38660] text-white hover:bg-[#e07550] transition-all shadow-sm"
          >
            Schedule Doctor Review
          </TouchableOpacity>
        </View>

        {/* Compare Mode Instructions */}
        {compareMode && (
          <View className="mt-6 bg-[#fff8f2] border border-[#f38660] rounded-2xl p-4">
            <View className="flex gap-3">
              <View className="w-10 h-10 rounded-full bg-[#f38660] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </View>
              <View>
                <Text className="text-sm font-semibold text-[#172334] mb-1">
                  Compare Mode Active ({selectedBiomarkers.length}/2 selected)
                </Text>
                <Text className="text-sm text-[#6b7280]">
                  Select 2 biomarkers to see research-backed correlations and how they influence each other.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Correlation Analysis */}
        {compareMode && selectedBiomarkers.length === 2 && (
          <View className="mt-6 bg-gradient-to-br from-[#fff8f2] to-white border-2 border-[#f38660] rounded-2xl p-6">
            <View className="flex items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#f38660] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </View>
              <View>
                <Text className="text-lg font-bold text-[#172334]">Correlation Analysis</Text>
                <Text className="text-sm text-[#6b7280]">
                  {selectedBiomarkers[0]} ↔ {selectedBiomarkers[1]}
                </Text>
              </View>
            </View>

            {(() => {
              const correlation = findCorrelation(selectedBiomarkers[0], selectedBiomarkers[1])
              if (correlation) {
                return (
                  <View className="space-y-4">
                    <View className="flex items-center gap-4">
                      <View className="flex-1">
                        <View className="flex items-center justify-between mb-2">
                          <Text className="text-sm font-medium text-[#6b7280]">Correlation Strength</Text>
                          <Badge className="bg-[#f38660] text-white border-0">{correlation.strength}</Badge>
                        </View>
                        <View className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <View
                            className="h-full bg-[#f38660] rounded-full transition-all duration-1000"
                            style={{ width: `${Math.abs(correlation.correlation) * 100}%` }}
                          />
                        </View>
                      </View>
                      <View className="text-right">
                        <View className="text-2xl font-bold text-[#172334]">{correlation.correlation.toFixed(2)}</View>
                        <View className="text-xs text-[#6b7280]">r-value</View>
                      </View>
                    </View>

                    <View className="bg-white rounded-xl p-4 border border-[#f38660]/30">
                      <Text className="text-sm font-semibold text-[#172334] mb-2">Research Insight</Text>
                      <Text className="text-sm text-[#6b7280] mb-3">{correlation.insight}</Text>
                      <View className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#f38660]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <Textath d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <Textath
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <Text className="text-xs text-[#6b7280]">{correlation.research}</Text>
                      </View>
                    </View>
                  </View>
                )
              } else {
                return (
                  <View className="bg-white rounded-xl p-4 border border-slate-200">
                    <Text className="text-sm text-[#6b7280] text-center">
                      No direct correlation data available for these biomarkers. Try selecting different metrics from
                      our research-validated pairs.
                    </Text>
                  </View>
                )
              }
            })()}
          </View>
        )}

        {/* Alert */}
        {!compareMode && (
          <View className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <View className="flex gap-3">
              <View className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </View>
              <View>
                <Text className="text-sm font-semibold text-slate-900 mb-1">3 biomarkers need attention</Text>
                <Text className="text-sm text-slate-700">
                  Your HRV and REM sleep are below optimal. Focus on sleep hygiene for the biggest impact.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-6xl mx-auto">
        {/* Research-Backed Correlations */}
        {!compareMode && (
          <View className="bg-gradient-to-br from-[#fff8f2] to-white border-2 border-[#f38660] rounded-2xl p-6">
            <View className="flex items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-[#f38660] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </View>
              <View>
                <Text className="text-xl font-bold text-[#172334]">Key Correlations Detected</Text>
                <Text className="text-sm text-[#6b7280]">Research-backed relationships in your data</Text>
              </View>
            </View>

            <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {correlations.slice(0, 4).map((corr, idx) => (
                <View key={idx} className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
                  <View className="flex items-start justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-xs font-semibold text-[#f38660] mb-1">{corr.strength} Correlation</Text>
                      <Text className="text-sm font-medium text-[#172334]">
                        {corr.biomarker1} ↔ {corr.biomarker2}
                      </Text>
                    </View>
                    <View className="text-lg font-bold text-[#172334]">{corr.correlation.toFixed(2)}</View>
                  </View>
                  <Text className="text-xs text-[#6b7280]">{corr.insight}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setCompareMode(true)}
              className="mt-4 w-full px-5 py-3 rounded-full text-sm font-medium bg-[#f38660] text-white hover:bg-[#e07550] transition-all"
            >
              Explore All Correlations →
            </TouchableOpacity>
          </View>
        )}

        {/* Time Period Selector */}
        <View className="flex gap-2">
          {["7d", "30d", "90d"].map((period) => (
            <TouchableOpacity
              key={period}
              className="px-8 py-3 rounded-full text-sm font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              {period}
            </TouchableOpacity>
          ))}
        </View>

        {/* Clinical Biomarkers */}
        <View>
          <View className="flex items-center justify-between mb-4">
            <Text className="text-xl sm:text-2xl font-bold text-slate-900">Clinical Biomarkers</Text>
            <Badge className="bg-purple-100 text-purple-700 border-0">Blood Tests</Badge>
          </View>
          <Text className="text-slate-600 mb-5 text-sm">Lab results that affect ADHD symptoms and are treatable</Text>

          <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {clinicalBiomarkers.map((biomarker, index) => (
              <View
                key={biomarker.name}
                className={`bg-white rounded-2xl p-4 border-2 transition-all duration-300 cursor-pointer relative ${
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${
                  compareMode && selectedBiomarkers.includes(biomarker.name)
                    ? "border-[#f38660] shadow-lg scale-105"
                    : "border-slate-200 hover:shadow-md hover:scale-[1.02]"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
                onPress={() => {
                  if (compareMode) {
                    toggleBiomarkerSelection(biomarker.name)
                  } else {
                    onBiomarkerClick(biomarker.name)
                  }
                }}
              >
                {compareMode && selectedBiomarkers.includes(biomarker.name) && (
                  <View className="absolute -top-2 -right-2 w-6 h-6 bg-[#f38660] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                )}

                <View className="flex items-start justify-between mb-2">
                  <View className="flex items-center gap-1.5">
                    <Text className="text-sm font-medium text-slate-600">{biomarker.name}</Text>
                    <View
                      className="relative"
                      onMouseEnter={() => setHoveredInfo(biomarker.name)}
                      onMouseLeave={() => setHoveredInfo(null)}
                      onPress={(e) => e.stopPropagation()}
                    >
                      <View className="w-4 h-4 rounded-full bg-slate-200 hover:bg-[#f38660] flex items-center justify-center cursor-help transition-colors">
                        <Text className="text-[10px] font-bold text-slate-600 hover:text-white">i</Text>
                      </View>

                      {hoveredInfo === biomarker.name && (
                        <View className="absolute z-50 w-72 p-4 bg-slate-900 text-white text-xs rounded-xl shadow-2xl -top-2 left-6 animate-in fade-in slide-in-from-left-2 duration-200">
                          <View className="absolute -left-1.5 top-3 w-3 h-3 bg-slate-900 rotate-45" />
                          <Text className="font-semibold mb-2 text-[#f38660]">{biomarker.name} & ADHD</Text>
                          <Text className="leading-relaxed mb-3">{biomarker.adhdInfo}</Text>
                          <Text className="text-[#f38660] font-medium">Normal: {biomarker.normal}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Badge className="bg-red-100 text-red-700 border-0 text-xs">{biomarker.status}</Badge>
                </View>
                <Text className="text-2xl font-bold text-slate-900 mb-2">{biomarker.value}</Text>
                <Text className="text-xs text-slate-600">{biomarker.importance}</Text>
              </View>
            ))}
          </View>

          {/* Attunio Lab Analysis */}
          <View className="bg-[#fff8f2] border border-[#f38660]/50 rounded-2xl p-6">
            <View className="flex items-center gap-3 mb-4">
              <View className="w-10 h-10 rounded-full bg-[#f38660]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </View>
              <Text className="text-lg font-semibold text-slate-900">Attunio Lab Analysis</Text>
            </View>
            <Text className="text-sm text-slate-700 mb-4">
              Upload lab PDFs and get instant ADHD-specific analysis powered by Attunio's proprietary AI (4,200+
              biomarkers supported)
            </Text>
            <TouchableOpacity className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f38660] hover:bg-[#e07550] text-white transition-all">
              View Lab Results →
            </TouchableOpacity>
          </View>
        </View>

        {/* Priority Biomarkers */}
        <View>
          <View className="flex items-center justify-between mb-4">
            <Text className="text-xl sm:text-2xl font-bold text-slate-900">Priority Biomarkers</Text>
            <Badge className="bg-red-100 text-red-700 border-0">ADHD-Critical</Badge>
          </View>
          <Text className="text-slate-600 mb-5 text-sm">Metrics with strongest research correlation to ADHD</Text>

          <View className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {priorityBiomarkers.map((biomarker, index) => (
              <View
                key={biomarker.name}
                className={`bg-white rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer ${
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${
                  compareMode && selectedBiomarkers.includes(biomarker.name)
                    ? "border-[#f38660] shadow-lg scale-105"
                    : "border-slate-200 hover:shadow-lg hover:scale-[1.02]"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
                onPress={() => {
                  if (compareMode) {
                    toggleBiomarkerSelection(biomarker.name)
                  } else {
                    onBiomarkerClick(biomarker.name)
                  }
                }}
              >
                {compareMode && selectedBiomarkers.includes(biomarker.name) && (
                  <View className="absolute -top-2 -right-2 w-6 h-6 bg-[#f38660] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                )}

                <View className="flex items-start justify-between mb-3">
                  <View>
                    <View className="flex items-center gap-2 mb-2">
                      <Text className="text-base font-semibold text-slate-900">{biomarker.name}</Text>
                      {biomarker.change && (
                        <Text
                          className={`text-sm font-medium ${biomarker.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {biomarker.change}
                        </Text>
                      )}
                    </View>
                    <Text className="text-3xl font-bold text-slate-900 mb-2">{biomarker.value}</Text>
                    <Text className="text-sm text-slate-600">{biomarker.importance}</Text>
                  </View>
                  <Badge className="bg-orange-100 text-orange-700 border-0">{biomarker.status}</Badge>
                </View>

                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View
                    className={`h-full bg-[#f38660] rounded-full transition-all duration-1000 ease-out ${
                      cardsVisible ? "" : "!w-0"
                    }`}
                    style={{
                      width:
                        biomarker.name === "Heart Rate Variability"
                          ? "40%"
                          : biomarker.name === "Glucose Stability"
                            ? "68%"
                            : biomarker.name === "REM Sleep"
                              ? "56%"
                              : "72%",
                      transitionDelay: `${500 + index * 100}ms`,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Supporting Biomarkers */}
        <View>
          <View className="flex items-center justify-between mb-4">
            <Text className="text-xl sm:text-2xl font-bold text-slate-900">Supporting Biomarkers</Text>
            <Badge className="bg-teal-100 text-teal-700 border-0">ADHD-Relevant</Badge>
          </View>
          <Text className="text-slate-600 mb-5 text-sm">Additional metrics that inform ADHD symptom patterns</Text>

          <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportingBiomarkers.map((biomarker) => (
              <View
                key={biomarker.name}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                onPress={() => {
                  if (compareMode) {
                    toggleBiomarkerSelection(biomarker.name)
                  } else {
                    onBiomarkerClick(biomarker.name)
                  }
                }}
              >
                {compareMode && selectedBiomarkers.includes(biomarker.name) && (
                  <View className="absolute -top-2 -right-2 w-6 h-6 bg-[#f38660] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                )}

                <View className="flex items-start justify-between mb-2">
                  <View className="flex items-center gap-1.5">
                    <Text className="text-sm font-medium text-slate-600">{biomarker.name}</Text>
                    {biomarker.change && <Text className="text-sm text-slate-600">{biomarker.change}</Text>}
                  </View>
                </View>
                <Text className="text-2xl font-bold text-slate-900 mb-2">{biomarker.value}</Text>
                <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">{biomarker.status}</Badge>
              </View>
            ))}
          </View>
        </View>

        {/* General Health - More Data */}
        <View>
          <View className="flex items-center justify-between mb-4">
            <Text className="text-xl sm:text-2xl font-bold text-slate-900">General Health</Text>
            <TouchableOpacity className="text-teal-600 text-sm font-medium hover:underline">View All</TouchableOpacity>
          </View>
          <Text className="text-slate-600 mb-5 text-sm">Overall wellness metrics from your wearable</Text>

          <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {generalBiomarkers.map((biomarker) => (
              <View
                key={biomarker.name}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                onPress={() => {
                  if (compareMode) {
                    toggleBiomarkerSelection(biomarker.name)
                  } else {
                    onBiomarkerClick(biomarker.name)
                  }
                }}
              >
                {compareMode && selectedBiomarkers.includes(biomarker.name) && (
                  <View className="absolute -top-2 -right-2 w-6 h-6 bg-[#f38660] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                )}

                <View className="flex items-center justify-between">
                  <View>
                    <Text className="text-sm font-medium text-slate-600 mb-1">{biomarker.name}</Text>
                    <Text className="text-xl font-bold text-slate-900">{biomarker.value}</Text>
                  </View>
                  <Badge
                    className={`border-0 text-xs ${
                      biomarker.status === "Good"
                        ? "bg-teal-100 text-teal-700"
                        : biomarker.status === "Low"
                          ? "bg-red-100 text-red-700"
                          : biomarker.status === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {biomarker.status}
                  </Badge>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
