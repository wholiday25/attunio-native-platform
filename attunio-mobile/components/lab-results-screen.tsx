// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import type React from "react"

import { useState, useEffect } from "react"

export function LabResultsScreen() {
  const [hasLabs, setHasLabs] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [labResults, setLabResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load lab results from API
  useEffect(() => {
    async function loadLabResults() {
      try {
        const response = await fetch('/api/labs/results');
        
        if (response.ok) {
          const data = await response.json();
          console.log('[Lab Results] ✅ Loaded lab data:', data);
          setLabResults(data.results || []);
          setHasLabs(data.hasResults);
        } else {
          console.log('[Lab Results] ⚠️ No results available');
          setHasLabs(false);
        }
      } catch (error) {
        console.error('[Lab Results] Error loading:', error);
        setHasLabs(false);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadLabResults();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(20)

    try {
      const formData = new FormData();
      formData.append('file', file);

      setUploadProgress(40);

      const response = await fetch('/api/labs/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(80);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      console.log('[Lab Results] ✅ Upload successful:', result);

      setUploadProgress(100);
      setHasLabs(true);

      // Reload lab results
      setTimeout(async () => {
        const resultsResponse = await fetch('/api/labs/results');
        if (resultsResponse.ok) {
          const data = await resultsResponse.json();
          setLabResults(data.results || []);
        }
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);

    } catch (error: any) {
      console.error('[Lab Results] ❌ Upload error:', error);
      alert(error.message || 'Failed to upload lab results');
      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  // Demo lab results - will be replaced by real data from labResults state once backend is fully implemented
  const displayResults = labResults.length > 0 ? labResults : [
    {
      name: "Vitamin D",
      value: "22 ng/mL",
      status: "Low",
      color: "chart-1",
      optimal: "30-50 ng/mL",
      adhdContext: "60% of adults with ADHD are deficient. Low Vitamin D affects dopamine production.",
      action: "Consider 5000 IU daily supplementation",
    },
    {
      name: "Ferritin (Iron Storage)",
      value: "15 ng/mL",
      status: "Low",
      color: "chart-1",
      optimal: "50-150 ng/mL",
      adhdContext: "Low iron linked to restless legs, poor focus, and hyperactivity in ADHD.",
      action: "Iron supplementation may improve symptoms",
    },
    {
      name: "HbA1c (Glucose Control)",
      value: "5.8%",
      status: "Borderline",
      color: "chart-3",
      optimal: "<5.7%",
      adhdContext: "Research shows glucose dysregulation correlates with ADHD symptoms. HbA1c reflects 3-month glucose average.",
      action: "Monitor glucose variability with CGM for ADHD symptom correlation",
    },
    {
      name: "Magnesium",
      value: "1.8 mg/dL",
      status: "Borderline",
      color: "chart-3",
      optimal: "1.7-2.2 mg/dL",
      adhdContext: "Magnesium calms the nervous system. Deficiency worsens ADHD symptoms.",
      action: "Monitor and consider supplementation",
    },
    {
      name: "TSH (Thyroid)",
      value: "3.8 mIU/L",
      status: "Borderline",
      color: "chart-3",
      optimal: "0.5-2.5 mIU/L",
      adhdContext: "Hypothyroidism can mimic ADHD symptoms (fatigue, brain fog).",
      action: "Discuss with doctor - may need thyroid panel",
    },
    {
      name: "Free T4 (Thyroxine)",
      value: "1.1 ng/dL",
      status: "Normal",
      color: "chart-2",
      optimal: "0.8-1.8 ng/dL",
      adhdContext: "Thyroid hormones affect cognitive function. Low T4 can cause attention and memory issues mimicking ADHD.",
      action: "Continue monitoring with annual thyroid panel",
    },
    {
      name: "Zinc",
      value: "68 μg/dL",
      status: "Low",
      color: "chart-1",
      optimal: "80-120 μg/dL",
      adhdContext: "Zinc deficiency linked to inattention and impulsivity. Essential for dopamine metabolism.",
      action: "Zinc supplementation (30mg daily) may improve symptoms",
    },
    {
      name: "Omega-3 Index",
      value: "4.2%",
      status: "Low",
      color: "chart-1",
      optimal: ">8%",
      adhdContext: "Low Omega-3 associated with poor attention, mood regulation, and hyperactivity in ADHD.",
      action: "Increase fish oil supplementation (2000mg EPA/DHA daily)",
    },
  ]

  return (
    <View className="pb-24">
      <View className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 mb-6">
        <Text className="text-3xl font-bold text-foreground mb-2">Lab Results</Text>
        <Text className="text-muted-foreground mb-6">Clinical biomarkers for ADHD management</Text>

        {isUploading && (
          <View className="bg-card rounded-2xl p-6 border border-border mb-6">
            <View className="flex items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-2">Processing lab report...</Text>
                <View className="w-full bg-muted rounded-full h-2">
                  <View
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </View>
                <Text className="text-xs text-muted-foreground mt-1">Analyzing your biomarkers</Text>
              </View>
            </View>
          </View>
        )}

        {!hasLabs ? (
          <View className="bg-card rounded-2xl p-6 border border-border text-center">
            <View className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </View>
            <Text className="text-lg font-bold text-foreground mb-2">No Lab Results Yet</Text>
            <Text className="text-sm text-muted-foreground mb-4">
              Add your blood test results to get ADHD-specific insights
            </Text>
            <View className="flex flex-col gap-2">
              <Text // htmlFor="lab-upload" className="cursor-pointer">
                <TouchableOpacity className="rounded-full bg-primary w-full" asChild>
                  <Text>Upload Lab Results (PDF)</Text>
                </TouchableOpacity>
              </Text>
              <TextInput
                id="lab-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChangeText={handleFileUpload}
              />
              <TouchableOpacity variant="outline" className="rounded-full bg-transparent">
                Order ADHD Panel ($149)
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <View className="flex items-start gap-4">
              <View className="w-10 h-10 rounded-full bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-chart-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-1">4 biomarkers below optimal</Text>
                <Text className="text-xs text-muted-foreground leading-relaxed">
                  Vitamin D, Iron, HbA1c, and Zinc deficiencies are common in ADHD and treatable with supplementation.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {hasLabs && (
        <View className="px-4 space-y-8">
          <View>
            <View className="flex items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-foreground">ADHD-Essential Panel</Text>
              <Text className="text-xs text-muted-foreground">Last tested: Dec 15, 2024</Text>
            </View>
            <Text className="text-sm text-muted-foreground mb-4">
              Blood biomarkers that commonly affect ADHD symptoms and are actionable
            </Text>

            <View className="space-y-3">
              {displayResults.map((lab) => (
                <View
                  key={lab.name}
                  className="bg-card rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all"
                >
                  <View className="flex items-start justify-between gap-4 mb-4">
                    <View className="flex-1">
                      <View className="flex items-center gap-2 mb-2">
                        <Text className="text-base font-semibold text-foreground">{lab.name}</Text>
                        <Badge className={`bg-${lab.color}/10 text-${lab.color} border-0 text-xs`}>{lab.status}</Badge>
                      </View>
                      <Text className="text-3xl font-bold text-foreground mb-1">{lab.value}</Text>
                      <Text className="text-xs text-muted-foreground">Optimal: {lab.optimal}</Text>
                    </View>
                  </View>

                  <View className="bg-muted/30 rounded-xl p-4 border border-border space-y-3">
                    <View>
                      <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        ADHD Context
                      </Text>
                      <Text className="text-sm text-foreground/80 leading-relaxed">{lab.adhdContext}</Text>
                    </View>
                    <View>
                      <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Recommended Action
                      </Text>
                      <Text className="text-sm text-primary font-medium">{lab.action}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
            <View className="flex items-start gap-4">
              <View className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </View>
              <View>
                <Text className="text-base font-bold text-foreground mb-2">Correlation Insight</Text>
                <Text className="text-sm text-muted-foreground mb-2">
                  Your low Vitamin D (22 ng/mL), low Iron (15 ng/mL), borderline HbA1c (5.8%), and low Zinc (68 μg/dL)
                  correlate with your low Focus Score (42/100) and poor sleep quality.
                </Text>
                <Text className="text-sm text-primary font-medium">
                  Correcting these deficiencies may improve focus by 15-25% based on research.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex gap-3">
            <Text // htmlFor="lab-upload-retest" className="flex-1">
              <TouchableOpacity variant="outline" className="w-full rounded-full bg-transparent" asChild>
                <Text>Upload New Results</Text>
              </TouchableOpacity>
            </Text>
            <TextInput
              id="lab-upload-retest"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChangeText={handleFileUpload}
            />
            <TouchableOpacity className="flex-1 rounded-full bg-primary">Order Retest ($149)</TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}
