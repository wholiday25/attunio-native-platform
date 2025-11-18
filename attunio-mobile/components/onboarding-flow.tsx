// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from "react"

import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
// Confetti removed - use react-native-confetti-cannon if needed

// 
// 
// 
// 
// 

type OnboardingStep =
  | "welcome"
  | "assessment"
  | "treatment-plan"
  | "checkout"
  | "create-account" // Added new step for password creation after payment
  | "health-profile"
  | "disclaimer"
  | "connect-device"
  | "connect-cgm" // Added new step for optional CGM connection
  | "sync"
  | "complete"

interface OnboardingFlowProps {
  onComplete: (userData: {
    userJourney: "diagnosed" | "exploring" | "monitoring"
    membership: "essential" | "pro" | "complete"
    acceptedTerms: boolean
    connectedDevice: boolean
    healthProfile: HealthProfile // Legacy field
    assessmentData?: {
      primaryConcern?: string | null;
      severity?: string | null;
      timeline?: string | null;
      medicationStatus?: string | null;
    };
    userData?: { 
      firstName: string; 
      lastName: string;
      email: string; 
      phone: string;
      dob: { month: string; day: string; year: string };
      biologicalSex: string;
      userId?: string;
    };
    // New comprehensive fields
    adhdJourneyType?: 'newly_diagnosed' | 'currently_treated' | 'exploring';
    primaryConcern?: string;
    concernSeverity?: 'mild' | 'moderate' | 'severe';
    concernDuration?: string;
    currentMedications?: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      prescribingProvider?: string;
      diagnosisDate?: string;
    }>;
    reportedSymptoms?: string[];
    treatmentGoals?: string[];
    allergies?: string[];
    chronicConditions?: string[];
    familyHistory?: string[];
    connectedDevices?: {
      wearable?: {
        type: string;
        provider: string;
        connectedAt: string;
        dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
      };
      cgm?: {
        type: string;
        provider: string;
        connectedAt: string;
        dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
      };
    };
  }) => void
}

interface HealthProfile {
  adhd_diagnosed: boolean
  diagnosis_date?: string
  
  // Medication tracking (structured)
  current_medication?: string // Medication name
  medication_dosage?: string
  medication_frequency?: string // "daily" | "twice daily" | "as needed"
  medication_duration?: string // How long they've been taking it
  diagnosing_provider?: string // Who prescribed it
  
  // Symptoms and goals
  symptoms: string[]
  goals: string[]
  
  // Medical history
  allergies?: string[]
  chronicConditions?: string[]
  familyHistory?: string[]
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [userJourney, setUserJourney] = useState<"diagnosed" | "exploring" | "monitoring" | null>(null)
  const [selectedMembership, setSelectedMembership] = useState<"essential" | "pro" | "complete">("pro")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  // Device connection metadata
  const [deviceConnections, setDeviceConnections] = useState<{
    wearable?: {
      type: string;
      provider: string;
      connectedAt: string;
      dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
    };
    cgm?: {
      type: string;
      provider: string;
      connectedAt: string;
      dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
    };
  }>({})

  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false)
  // const { savedProgress, saveProgress, clearProgress } = useOnboardingProgress()
  const [showResumePrompt, setShowResumePrompt] = useState(false)
  const [savedProgress, setSavedProgress] = useState<any>(null) // Mock savedProgress for now

  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const [assessmentAnswers, setAssessmentAnswers] = useState({
    primaryConcern: null as string | null,
    severity: null as string | null,
    timeline: null as string | null,
    medicationStatus: null as string | null,
  })

  const [healthProfile, setHealthProfile] = useState<HealthProfile>({
    adhd_diagnosed: false,
    symptoms: [],
    goals: [],
    allergies: [],
    chronicConditions: [],
    familyHistory: [],
  })

  // State for checkout data and account creation form
  const [checkoutData, setCheckoutData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: { month: string; day: string; year: string };
    biologicalSex: string;
  } | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Check if returning from Terra and restore state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const terraConnected = localStorage.getItem('terra_connected')
      const savedProgressStr = localStorage.getItem('attunio_onboarding_progress')
      
      if (terraConnected === 'true' && savedProgressStr) {
        try {
          const savedProgress = JSON.parse(savedProgressStr)
          console.log('[v0] ✅ Restoring onboarding state after Terra connection:', savedProgress)
          
          // Restore all state
          if (savedProgress.userJourney) setUserJourney(savedProgress.userJourney)
          if (savedProgress.selectedMembership) setSelectedMembership(savedProgress.selectedMembership)
          if (savedProgress.healthProfile) setHealthProfile(savedProgress.healthProfile)
          if (savedProgress.checkoutData) setCheckoutData(savedProgress.checkoutData)
          
          // Continue to CGM step after Terra connection
          setCurrentStep('connect-cgm')
          
          // Clear Terra connected flag so we don't restore again
          localStorage.removeItem('terra_connected')
        } catch (error) {
          console.error('[v0] Failed to restore progress:', error)
        }
      }
    }
  }, [])

  // Mock saveProgress and clearProgress
  const saveProgress = (progressData: any) => {
    // Save to localStorage so we can resume if interrupted
    if (typeof window !== 'undefined') {
      localStorage.setItem('attunio_onboarding_progress', JSON.stringify({
        ...progressData,
        timestamp: Date.now()
      }));
      console.log("Saving progress to localStorage:", progressData);
    }
    setSavedProgress(progressData);
  }

  const clearProgress = () => {
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('attunio_onboarding_progress');
      console.log("Clearing progress from localStorage");
    }
    setSavedProgress(null);
  }

  useEffect(() => {
    console.log(`[v0] Onboarding step changed to: ${currentStep}`)
  }, [currentStep])

  // Load checkout data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCheckoutData = localStorage.getItem('attunio_checkout_data')
      if (savedCheckoutData) {
        try {
          const parsed = JSON.parse(savedCheckoutData)
          setCheckoutData(parsed)
          console.log('[v0] Loaded checkout data from localStorage:', parsed)
        } catch (error) {
          console.error('[v0] Failed to parse checkout data:', error)
        }
      }
    }
  }, [])

  // Pre-fill email field when checkoutData is available
  useEffect(() => {
    if (checkoutData?.email && !formData.email) {
      setFormData(prev => ({
        ...prev,
        email: checkoutData.email
      }))
      console.log('[v0] Pre-filled email from checkout:', checkoutData.email)
    }
  }, [checkoutData])

  useEffect(() => {
    if (savedProgress && currentStep === "welcome") {
      setShowResumePrompt(true)
    }
  }, [savedProgress, currentStep])

  useEffect(() => {
    if (currentStep !== "welcome" && currentStep !== "complete") {
      saveProgress({
        step: currentStep,
        assessment: assessmentAnswers,
        membership: selectedMembership,
        healthProfile,
        checkoutData, // Include checkout data with userId
        userJourney,
      })
    }
  }, [currentStep, assessmentAnswers, selectedMembership, healthProfile, checkoutData, userJourney])

  useEffect(() => {
    if (currentStep === "welcome" || currentStep === "complete") return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger near top of screen (trying to close tab/window)
      if (e.clientY <= 10 && !hasShownExitIntent) {
        setShowExitIntent(true)
        setHasShownExitIntent(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [currentStep, hasShownExitIntent])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (currentStep === "complete") {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const restoreProgress = () => {
    if (savedProgress) {
      setCurrentStep(savedProgress.step as OnboardingStep)
      setAssessmentAnswers(savedProgress.assessment)
      setSelectedMembership(savedProgress.membership as any)
      setHealthProfile(savedProgress.healthProfile)
      setShowResumePrompt(false)
    }
  }

  const handleDeviceConnect = () => {
    setCurrentStep("sync")
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setSyncProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => setCurrentStep("complete"), 500)
      }
    }, 300)
  }

  const handleComplete = () => {
    // Make sure we have the checkout data (user info) before completing
    if (!checkoutData) {
      console.error('[v0] ❌ Cannot complete onboarding - missing user data');
      alert('Missing user information. Please restart the onboarding process.');
      return;
    }

    // Build medication array from health profile
    const currentMedications = healthProfile.current_medication ? [
      {
        name: healthProfile.current_medication,
        dosage: healthProfile.medication_dosage || '',
        frequency: healthProfile.medication_frequency || 'daily',
        duration: healthProfile.medication_duration || '',
        prescribingProvider: healthProfile.diagnosing_provider || undefined,
        diagnosisDate: healthProfile.diagnosis_date || undefined,
      }
    ] : [];

    // Map assessment answers to proper field names
    const adhdJourneyType = assessmentAnswers.primaryConcern === 'diagnosed' 
      ? 'currently_treated' as const
      : assessmentAnswers.primaryConcern === 'exploring'
      ? 'exploring' as const
      : 'newly_diagnosed' as const;

    console.log('[v0] Building complete onboarding data:', {
      assessmentAnswers,
      healthProfile,
      deviceConnections,
      checkoutData
    });

    onComplete({
      userJourney: userJourney!,
      membership: selectedMembership,
      acceptedTerms,
      connectedDevice: true,
      healthProfile, // Legacy field
      assessmentData: assessmentAnswers, // Legacy field
      userData: checkoutData,
      
      // ===== NEW: Complete ADHD Assessment Data =====
      adhdJourneyType,
      primaryConcern: assessmentAnswers.primaryConcern || undefined,
      concernSeverity: (assessmentAnswers.severity as 'mild' | 'moderate' | 'severe') || undefined,
      concernDuration: assessmentAnswers.timeline || undefined,
      
      // ===== NEW: Medication History (Structured Array) =====
      currentMedications,
      
      // ===== NEW: Symptoms & Goals =====
      reportedSymptoms: healthProfile.symptoms || [],
      treatmentGoals: healthProfile.goals || [],
      
      // ===== NEW: Medical History =====
      allergies: healthProfile.allergies || [],
      chronicConditions: healthProfile.chronicConditions || [],
      familyHistory: healthProfile.familyHistory || [],
      
      // ===== NEW: Connected Devices with Metadata =====
      connectedDevices: deviceConnections,
    })
  }

  const stepNumbers: Record<OnboardingStep, number> = {
    welcome: 0,
    assessment: 1,
    "treatment-plan": 2,
    checkout: 3,
    "create-account": 4, // Added step number
    "health-profile": 5, // Updated numbering
    disclaimer: 6, // Updated numbering
    "connect-device": 7, // Updated numbering
    "connect-cgm": 8, // Updated numbering
    sync: 9, // Updated numbering
    complete: 9, // Updated numbering
  }

  const showProgress = currentStep !== "welcome" && currentStep !== "complete"

  // Welcome Screen
  if (currentStep === "welcome") {
    console.log(`[v0] Rendering welcome screen`)
    return (
      <View className="min-h-screen bg-[#fff8f2] flex items-center justify-center p-4 sm:p-6 md:py-24 lg:py-32 relative overflow-hidden">
        <Card className="max-w-5xl w-full p-8 sm:p-12 lg:p-16 text-center shadow-lg border border-[#e5e7eb] bg-white rounded-2xl relative z-10">
          {showResumePrompt && savedProgress && (
            <View className="bg-[#f5f5f5] border border-[#e575eb] rounded-xl p-5 mb-10 max-w-2xl mx-auto">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-3 text-left">
                  <View className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
                    <RefreshCw className="w-6 h-6 text-[#f38660]" />
                  </View>
                  <View>
                    <Text className="font-semibold text-sm text-[#172334]">Welcome back!</Text>
                    <Text className="text-xs text-[#6b7280]">
                      Continue where you left off (Step {stepNumbers[savedProgress.step as OnboardingStep]} of 7)
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={restoreProgress}
                  size="lg"
                  className="bg-[#f38660] hover:bg-[#e57550] flex-shrink-0 rounded-lg shadow-sm hover:shadow transition-all text-sm"
                >
                  Continue
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View className="mb-10 flex justify-center">
            <Image source={require("/attunio-logo.png")} alt="Attunio" width={200} height={50} className="h-12 w-auto" />
          </View>

          <Text className="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#172334] mb-5 leading-[1.1] tracking-tight">
            See your <Text className="text-[#f38660]">ADHD</Text>
            <br />
            in high definition
          </Text>

          <Text className="text-base sm:text-lg text-[#6b7280] mb-10 leading-relaxed max-w-2xl mx-auto">
            A complete wellness membership designed to give you the answers, clarity, and care you deserve
          </Text>

          <TouchableOpacity
            onPress={() => setCurrentStep("assessment")}
            size="lg"
            className="bg-[#f38660] hover:bg-[#e57550] text-white px-10 h-12 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
          >
            Get Started
          </TouchableOpacity>

          <Text className="text-sm text-[#6b7280] mt-5 font-normal">Takes about 5 minutes to complete</Text>

          <View className="text-center text-sm text-[#6b7280] mt-14 pt-10 border-t border-[#e577eb]">
            <View className="flex items-center justify-center gap-3">
              <View className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f38660] to-[#e57550] border-2 border-white shadow-sm"
                  />
                ))}
              </View>
              <View className="text-left">
                <Text className="font-semibold text-[#172334] text-sm">2,347 people joined this week</Text>
                <Text className="text-xs text-[#6b7280]">Join the community</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    )
  }

  if (currentStep === "assessment") {
    console.log(`[v0] Rendering assessment screen`)
    return (
      <View className="min-h-screen bg-[#fff8f2] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        <Card className="max-w-3xl w-full p-8 sm:p-12 lg:p-16 shadow-lg border border-[#e5e7eb] bg-white rounded-2xl relative z-10">
          <View className="mb-8">
            <TouchableOpacity
              onPress={() => setCurrentStep("welcome")}
              className="group text-[#6b7280] hover:text-[#f38660] flex items-center gap-2 text-sm font-medium transition-all duration-200"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </TouchableOpacity>
          </View>

          <View className="mb-12">
            <Text className="text-xs uppercase tracking-widest text-[#f38660] font-semibold mb-4">QUICK ASSESSMENT</Text>
            <Text className="text-4xl sm:text-5xl font-bold text-[#172334] mb-4 leading-tight">
              Tell us about your journey
            </Text>
            <Text className="text-lg text-[#6b7280]">This helps us recommend the right plan for you</Text>
          </View>

          <View className="space-y-8">
            {/* Question 1 */}
            <View className="animate-fade-in">
              <Text className="text-base font-semibold text-[#172334] mb-4 block">What brings you to Attunio?</Text>
              <View className="space-y-3">
                {[
                  { value: "exploring", label: "I'm exploring if I might have ADHD", icon: "/images/scanner-image.svg" },
                  { value: "diagnosed", label: "I'm diagnosed and tracking treatment", icon: "/images/dashboard-01.svg" },
                  { value: "optimizing", label: "I want to optimize my focus & performance", icon: "/images/icon-17.svg" },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      setAssessmentAnswers({ ...assessmentAnswers, primaryConcern: option.value })
                      if (option.value === "diagnosed") setUserJourney("diagnosed")
                      else if (option.value === "exploring") setUserJourney("exploring")
                      else setUserJourney("monitoring")
                    }}
                    className={`group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                      assessmentAnswers.primaryConcern === option.value
                        ? "border-[#f38660] bg-[#fff8f2] shadow-md"
                        : "border-[#e5e7eb] hover:border-[#f38660] bg-white hover:shadow-sm"
                    }`}
                  >
                    <View className="flex items-center gap-4">
                      <View className="w-8 h-8 relative flex-shrink-0">
                        <Image source={option.icon} alt="" width={32} height={32} className="object-contain" />
                      </View>
                      <Text className="flex-1 text-sm font-medium text-[#172334]">{option.label}</Text>
                      <View
                        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          assessmentAnswers.primaryConcern === option.value
                            ? "border-[#f38660] bg-[#f38660]"
                            : "border-[#e5e7eb] group-hover:border-[#f38660]"
                        }`}
                      >
                        {assessmentAnswers.primaryConcern === option.value && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Question 2 */}
            {assessmentAnswers.primaryConcern && (
              <View className="animate-fade-in">
                <Text className="text-base font-semibold text-[#172334] mb-4 block">
                  How would you describe your focus challenges?
                </Text>
                <View className="space-y-3">
                  {[
                    { value: "mild", label: "Mild - occasional difficulty focusing", icon: "🌱" },
                    { value: "moderate", label: "Moderate - impacts daily tasks", icon: "🌿" },
                    { value: "severe", label: "Severe - significantly affects work/life", icon: "🌳" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => setAssessmentAnswers({ ...assessmentAnswers, severity: option.value })}
                      className={`group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        assessmentAnswers.severity === option.value
                          ? "border-[#f38660] bg-[#fff8f2] shadow-md"
                          : "border-[#e5e7eb] hover:border-[#f38660] bg-white hover:shadow-sm"
                      }`}
                    >
                      <View className="flex items-center gap-4">
                        <Text className="text-2xl">{option.icon}</Text>
                        <Text className="flex-1 text-sm font-medium text-[#172334]">{option.label}</Text>
                        <View
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            assessmentAnswers.severity === option.value
                              ? "border-[#f38660] bg-[#f38660]"
                              : "border-[#e5e7eb] group-hover:border-[#f38660]"
                          }`}
                        >
                          {assessmentAnswers.severity === option.value && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Question 3 */}
            {assessmentAnswers.severity && (
              <View className="animate-fade-in">
                <Text className="text-base font-semibold text-[#172334] mb-4 block">
                  How long have you experienced these challenges?
                </Text>
                <View className="space-y-3">
                  {[
                    { value: "recent", label: "Less than 6 months", icon: "📅" },
                    { value: "ongoing", label: "6 months to a few years", icon: "📆" },
                    { value: "lifelong", label: "Most of my life", icon: "🗓️" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => setAssessmentAnswers({ ...assessmentAnswers, timeline: option.value })}
                      className={`group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        assessmentAnswers.timeline === option.value
                          ? "border-[#f38660] bg-[#fff8f2] shadow-md"
                          : "border-[#e5e7eb] hover:border-[#f38660] bg-white hover:shadow-sm"
                      }`}
                    >
                      <View className="flex items-center gap-4">
                        <Text className="text-2xl">{option.icon}</Text>
                        <Text className="flex-1 text-sm font-medium text-[#172334]">{option.label}</Text>
                        <View
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            assessmentAnswers.timeline === option.value
                              ? "border-[#f38660] bg-[#f38660]"
                              : "border-[#e5e7eb] group-hover:border-[#f38660]"
                          }`}
                        >
                          {assessmentAnswers.timeline === option.value && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Question 4 */}
            {assessmentAnswers.timeline && (
              <View className="animate-fade-in">
                <Text className="text-base font-semibold text-[#172334] mb-4 block">
                  Are you currently taking ADHD medication?
                </Text>
                <View className="space-y-3">
                  {[
                    { value: "yes-stable", label: "Yes, on a stable dose", icon: "/images/icon-10.svg" },
                    { value: "yes-adjusting", label: "Yes, but adjusting or switching", icon: "/images/icon-52.svg" },
                    { value: "no-interested", label: "No, but interested in trying", icon: "/images/icon-43.svg" },
                    { value: "no-preference", label: "No, prefer non-medication approaches", icon: "/images/icon-40.svg" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => setAssessmentAnswers({ ...assessmentAnswers, medicationStatus: option.value })}
                      className={`group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        assessmentAnswers.medicationStatus === option.value
                          ? "border-[#f38660] bg-[#fff8f2] shadow-md"
                          : "border-[#e5e7eb] hover:border-[#f38660] bg-white hover:shadow-sm"
                      }`}
                    >
                      <View className="flex items-center gap-4">
                        <View className="w-8 h-8 relative flex-shrink-0">
                          <Image source={option.icon} alt="" width={32} height={32} className="object-contain" />
                        </View>
                        <Text className="flex-1 text-sm font-medium text-[#172334]">{option.label}</Text>
                        <View
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            assessmentAnswers.medicationStatus === option.value
                              ? "border-[#f38660] bg-[#f38660]"
                              : "border-[#e5e7eb] group-hover:border-[#f38660]"
                          }`}
                        >
                          {assessmentAnswers.medicationStatus === option.value && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {assessmentAnswers.medicationStatus && (
            <View className="animate-fade-in mt-12">
              <TouchableOpacity
                onPress={() => setCurrentStep("treatment-plan")}
                size="lg"
                className="w-full bg-[#f38660] hover:bg-[#e57550] text-white h-14 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Continue to Treatment Plans
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TouchableOpacity>
            </View>
          )}
        </Card>
      </View>
    )
  }

  // Treatment Plan Selection Screen
  if (currentStep === "treatment-plan") {
    console.log(`[v0] Rendering treatment-plan screen`)
    return (
      <TreatmentPlanScreen
        assessmentAnswers={assessmentAnswers}
        onSelectPlan={(plan) => {
          setSelectedMembership(plan)
          setCurrentStep("checkout")
        }}
        onBack={() => setCurrentStep("assessment")}
      />
    )
  }

  // Checkout Screen
  if (currentStep === "checkout") {
    console.log(`[v0] Rendering checkout screen`)
    return (
      <>
        <CheckoutScreen
          selectedPackage={selectedMembership}
          onComplete={(data) => {
            console.log('[v0] Checkout complete, storing data:', data)
            setCheckoutData(data)  // Store in component state
            if (typeof window !== 'undefined') {
              localStorage.setItem('attunio_checkout_data', JSON.stringify(data))  // Store in localStorage
            }
            setCurrentStep("create-account")
          }}
          onBack={() => setCurrentStep("treatment-plan")}
        />
        <View className="max-w-4xl mx-auto px-4 pb-8">{/* <TrustBadges /> */}</View>
      </>
    )
  }

  if (currentStep === "create-account") {
    console.log(`[v0] Rendering create-account screen`)
    return (
      <View className="min-h-screen bg-[#fff8f2] flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-md w-full p-6 sm:p-8 lg:p-12 shadow-sm border-0 bg-white rounded-2xl">
          <View className="mb-8">
            <View className="w-16 h-16 rounded-full bg-[#f38660]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v1V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </View>
            <Text className="text-2xl sm:text-3xl font-semibold text-[#172334] mb-2 text-center tracking-tight">
              Create Your Account
            </Text>
            <Text className="text-[#6b7280] text-center text-sm sm:text-base">
              Set up your password to access your personalized dashboard
            </Text>
          </View>

          <View className="space-y-5">
            <View>
              <Text // htmlFor="email-display" className="text-sm font-medium text-[#172334] mb-2 block">
                Email Address
              </Text>
              <TextInput
                id="email-display"
                type="email"
                value={formData.email}
                disabled
                className="bg-slate-50 text-slate-600"
              />
              <Text className="text-xs text-[#6b7280] mt-1">We'll send your login credentials to this email</Text>
            </View>

            <View>
              <Text // htmlFor="password" className="text-sm font-medium text-[#172334] mb-2 block">
                Create Password
              </Text>
              <TextInput
                id="password"
                type="password"
                value={formData.password}
                onChangeText={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter a secure password"
                className="h-12"
              />
              <Text className="text-xs text-[#6b7280] mt-1">Must be at least 8 characters with one number</Text>
            </View>

            <View>
              <Text // htmlFor="confirm-password" className="text-sm font-medium text-[#172334] mb-2 block">
                Confirm Password
              </Text>
              <TextInput
                id="confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChangeText={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter your password"
                className="h-12"
              />
            </View>

            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <View className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <Textath fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <Text className="text-sm text-red-700">Passwords do not match</Text>
              </View>
            )}

            {formData.password && formData.password.length >= 8 && /\d/.test(formData.password) && formData.password === formData.confirmPassword && (
              <View className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <Textath fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <Text className="text-sm text-green-700">Password is strong and matches!</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={async () => {
              if (!checkoutData) {
                console.error('[v0] No checkout data available!');
                alert('Missing user information. Please go back and complete the checkout form.');
                return;
              }

              try {
                console.log('[v0] Creating user account with data:', {
                  email: checkoutData.email,
                  firstName: checkoutData.firstName,
                  lastName: checkoutData.lastName,
                });

                const response = await fetch('/api/users/create', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: checkoutData.email,           // From checkout
                    password: formData.password,          // From password form
                    firstName: checkoutData.firstName,    // From checkout
                    lastName: checkoutData.lastName,      // From checkout
                    phone: checkoutData.phone,            // From checkout
                    dob: checkoutData.dob,                // From checkout
                    biologicalSex: checkoutData.biologicalSex, // From checkout
                  }),
                });

                if (!response.ok) {
                  const errorData = await response.json();
                  console.error('[v0] Account creation failed:', errorData);
                  alert(`Failed to create account: ${errorData.error || 'Unknown error'}`);
                  return;
                }

                const result = await response.json();
                console.log('[v0] Account created successfully:', result);

                // Save userId to checkoutData for later use
                const updatedCheckoutData = {
                  ...checkoutData,
                  userId: result.userId
                };
                setCheckoutData(updatedCheckoutData);
                console.log('[v0] Updated checkout data with userId:', updatedCheckoutData);
                console.log('[v0] ✅ User is now auto-signed in (cookie set by API)');

                // IMPORTANT: Save onboarding progress AFTER account creation
                // This ensures page.tsx knows the user is still mid-onboarding
                if (typeof window !== 'undefined') {
                  const progressData = {
                    step: 'health-profile',
                    userJourney,
                    selectedMembership,
                    healthProfile,
                    checkoutData: updatedCheckoutData, // Include userId
                    timestamp: Date.now()
                  };
                  localStorage.setItem('attunio_onboarding_progress', JSON.stringify(progressData));
                  console.log('[v0] Saved onboarding progress after account creation:', progressData);
                  
                  // Clear checkout data from localStorage (no longer needed)
                  localStorage.removeItem('attunio_checkout_data');
                }

                setCurrentStep("health-profile");
              } catch (error) {
                console.error('[v0] Error creating account:', error);
                alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
              }
            }}
            disabled={
              !formData.password ||
              !formData.confirmPassword ||
              formData.password !== formData.confirmPassword ||
              formData.password.length < 8 ||
              !/\d/.test(formData.password) ||
              !checkoutData
            }
            className="w-full bg-[#f38660] hover:bg-[#e57550] text-white h-12 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account & Continue
          </TouchableOpacity>

          <View className="mt-6 pt-6 border-t border-slate-100">
            <View className="flex items-center gap-2 text-xs text-[#6b7280]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <Textath fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <Text>Your data is encrypted and HIPAA-compliant</Text>
            </View>
          </View>
        </Card>
      </View>
    )
  }

  // Health Profile Collection (AFTER checkout)
  if (currentStep === "health-profile") {
    console.log(`[v0] Rendering health-profile screen`)
    return (
      <View className="min-h-screen bg-[#fff8f2] flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-2xl w-full p-6 sm:p-8 lg:p-12 shadow-sm border-0 bg-white rounded-2xl">
          <Text className="text-2xl sm:text-3xl font-semibold text-[#172334] mb-2 sm:mb-3 tracking-tight">
            Complete your profile
          </Text>
          <Text className="text-[#6b7280] mb-6 sm:mb-8 text-sm sm:text-base">This helps us personalize your insights</Text>

          <View className="space-y-5 sm:space-y-6">
            {/* ADHD Diagnosis Status */}
            <View>
              <Text className="text-sm font-medium text-[#172334] mb-3 block">
                Have you been diagnosed with ADHD?
              </Text>
              <View className="space-y-2">
                <TouchableOpacity
                  onPress={() => setHealthProfile({ ...healthProfile, adhd_diagnosed: true })}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    healthProfile.adhd_diagnosed
                      ? "border-[#f38660] bg-[#fff8f2]"
                      : "border-[#e57eb] hover:border-[#f38660]"
                  }`}
                >
                  <Text className="font-normal text-[#172334] text-sm sm:text-base">
                    Yes, I have a formal diagnosis
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setHealthProfile({ ...healthProfile, adhd_diagnosed: false })}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    !healthProfile.adhd_diagnosed
                      ? "border-[#f38660] bg-[#fff8f2]"
                      : "border-[#e5e7eb] hover:border-[#f38660]"
                  }`}
                >
                  <Text className="font-normal text-[#172334] text-sm sm:text-base">
                    No, I'm exploring or self-identifying
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="space-y-3">
              <Text // htmlFor="medication" className="text-sm font-medium text-[#172334]">
                Current ADHD Medication (optional)
              </Text>
              <TextInput
                id="medication"
                placeholder="e.g., Adderall XR, Vyvanse, Strattera"
                value={healthProfile.current_medication || ""}
                onChangeText={(e) => setHealthProfile({ ...healthProfile, current_medication: e.target.value })}
                className="h-11 sm:h-12"
              />
              <TextInput
                id="dosage"
                placeholder="Dosage (e.g., 20mg)"
                value={healthProfile.medication_dosage || ""}
                onChangeText={(e) => setHealthProfile({ ...healthProfile, medication_dosage: e.target.value })}
                className="h-11 sm:h-12"
              />
              <TextInput
                id="frequency"
                placeholder="How often? (e.g., daily, twice daily)"
                value={healthProfile.medication_frequency || ""}
                onChangeText={(e) => setHealthProfile({ ...healthProfile, medication_frequency: e.target.value })}
                className="h-11 sm:h-12"
              />
              <TextInput
                id="duration"
                placeholder="How long have you been taking it? (e.g., 2 years)"
                value={healthProfile.medication_duration || ""}
                onChangeText={(e) => setHealthProfile({ ...healthProfile, medication_duration: e.target.value })}
                className="h-11 sm:h-12"
              />
              <TextInput
                id="provider"
                placeholder="Prescribing provider (e.g., Dr. Smith, Psychiatrist)"
                value={healthProfile.diagnosing_provider || ""}
                onChangeText={(e) => setHealthProfile({ ...healthProfile, diagnosing_provider: e.target.value })}
                className="h-11 sm:h-12"
              />
            </View>

            {/* Primary Symptoms */}
            <View>
              <Text className="text-sm font-medium text-[#172334] mb-3 block">
                What are your primary challenges? (Select all that apply)
              </Text>
              <View className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {[
                  "Difficulty focusing",
                  "Restlessness/Hyperactivity",
                  "Impulsivity",
                  "Forgetfulness",
                  "Time management",
                  "Emotional regulation",
                  "Sleep issues",
                  "Low energy",
                ].map((symptom) => (
                  <TouchableOpacity
                    key={symptom}
                    onPress={() => {
                      const symptoms = healthProfile.symptoms.includes(symptom)
                        ? healthProfile.symptoms.filter((s) => s !== symptom)
                        : [...healthProfile.symptoms, symptom]
                      setHealthProfile({ ...healthProfile, symptoms })
                    }}
                    className={`text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center hover:scale-105 shadow-md hover:shadow-xl text-sm font-normal ${
                      healthProfile.symptoms.includes(symptom)
                        ? "border-[#f38660] bg-[#fff8f2] shadow-xl scale-105"
                        : "border-[#e5e7eb] hover:border-[#f38660] bg-white"
                    }`}
                  >
                    {symptom}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Goals */}
            <View>
              <Text className="text-sm font-medium text-[#172334] mb-3 block">
                What are your main goals? (Select all that apply)
              </Text>
              <View className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {[
                  "Track medication effectiveness",
                  "Improve focus and productivity",
                  "Better sleep quality",
                  "Reduce stress and anxiety",
                  "Data for doctor visits",
                  "Lifestyle optimization",
                ].map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    onPress={() => {
                      const goals = healthProfile.goals.includes(goal)
                        ? healthProfile.goals.filter((g) => g !== goal)
                        : [...healthProfile.goals, goal]
                      setHealthProfile({ ...healthProfile, goals })
                    }}
                    className={`text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center hover:scale-105 shadow-md hover:shadow-xl text-sm font-normal ${
                      healthProfile.goals.includes(goal)
                        ? "border-[#f38660] bg-[#fff8f2] shadow-xl scale-105"
                        : "border-[#e5e7eb] hover:border-[#f38660] bg-white"
                    }`}
                  >
                    {goal}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Medical History (Optional) */}
            <View className="border-t border-slate-200 pt-5 sm:pt-6">
              <Text className="text-sm font-medium text-[#172334] mb-3 block">
                Medical History (Optional)
              </Text>
              
              <View className="space-y-3">
                <View>
                  <Text // htmlFor="allergies" className="text-xs text-[#6b7280] mb-1 block">
                    Known Allergies
                  </Text>
                  <TextInput
                    id="allergies"
                    placeholder="e.g., Penicillin, Shellfish (comma separated)"
                    value={healthProfile.allergies?.join(', ') || ""}
                    onChangeText={(e) => {
                      const allergiesArray = e.target.value 
                        ? e.target.value.split(',').map(a => a.trim()).filter(a => a.length > 0)
                        : [];
                      setHealthProfile({ ...healthProfile, allergies: allergiesArray });
                    }}
                    className="h-11 sm:h-12"
                  />
                </View>

                <View>
                  <Text // htmlFor="chronic-conditions" className="text-xs text-[#6b7280] mb-1 block">
                    Other Chronic Conditions
                  </Text>
                  <TextInput
                    id="chronic-conditions"
                    placeholder="e.g., Anxiety, Depression, Diabetes (comma separated)"
                    value={healthProfile.chronicConditions?.join(', ') || ""}
                    onChangeText={(e) => {
                      const conditionsArray = e.target.value 
                        ? e.target.value.split(',').map(c => c.trim()).filter(c => c.length > 0)
                        : [];
                      setHealthProfile({ ...healthProfile, chronicConditions: conditionsArray });
                    }}
                    className="h-11 sm:h-12"
                  />
                </View>

                <View>
                  <Text // htmlFor="family-history" className="text-xs text-[#6b7280] mb-1 block">
                    Family History (Mental Health)
                  </Text>
                  <TextInput
                    id="family-history"
                    placeholder="e.g., Mother has ADHD, Father has depression (comma separated)"
                    value={healthProfile.familyHistory?.join(', ') || ""}
                    onChangeText={(e) => {
                      const historyArray = e.target.value 
                        ? e.target.value.split(',').map(h => h.trim()).filter(h => h.length > 0)
                        : [];
                      setHealthProfile({ ...healthProfile, familyHistory: historyArray });
                    }}
                    className="h-11 sm:h-12"
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="flex gap-3 mt-6 sm:mt-8">
            <TouchableOpacity
              variant="outline"
              onPress={() => setCurrentStep("create-account")} // Changed from "checkout" to "create-account"
              className="flex-1 rounded-full border-[#e5e7eb] text-[#172334] hover:bg-slate-50"
            >
              Back
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentStep("disclaimer")}
              disabled={healthProfile.symptoms.length === 0 || healthProfile.goals.length === 0}
              className="flex-1 bg-[#f38660] hover:bg-[#e57550] text-white rounded-full"
            >
              Continue
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    )
  }

  // Disclaimer
  if (currentStep === "disclaimer") {
    console.log(`[v0] Rendering disclaimer screen`)
    return (
      <View className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-3xl w-full p-6 sm:p-8 lg:p-12 shadow-sm bg-white rounded-2xl border-0">
          <View className="mb-6 sm:mb-8">
            <View className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#FFF0E6] flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF8C00]"
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
            <Text className="text-[11px] uppercase tracking-[0.08em] text-[#5B6B82] mb-3 sm:mb-4 font-semibold text-center">
              IMPORTANT NOTICE
            </Text>
            <Text className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1A2332] text-center mb-2 sm:mb-3 tracking-tight">
              Clinical Services & Important Information
            </Text>
            <Text className="text-[#5B6B82] text-center text-sm sm:text-base">Please read carefully before continuing</Text>
          </View>

          <View className="bg-[#FDFCFB] border border-[#E8ECF0] rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 max-h-96 overflow-y-auto">
            <View className="space-y-4 sm:space-5 text-sm sm:text-base text-[#5B6B82]">
              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">What Attunio Provides</Text>
                <Text className="leading-relaxed mb-3">Attunio is a clinical-grade wellness platform that provides:</Text>
                <View className="space-y-2 ml-4">
                  <View className="flex items-start gap-2">
                    <Text className="text-[#f38660] mt-0.5">✓</Text>
                    <Text>
                      <strong>Lab Testing Services:</strong> At-home and in-person blood biomarker testing (ferritin,
                      vitamin D, thyroid, cortisol, etc.) performed by certified phlebotomists and CLIA-certified labs
                    </Text>
                  </View>
                  <View className="flex items-start gap-2">
                    <Text className="text-[#f38660] mt-0.5">✓</Text>
                    <Text>
                      <strong>Wearable Biomarker Tracking:</strong> FDA-cleared devices monitoring HRV, sleep quality,
                      heart rate, and activity patterns correlated with ADHD symptoms
                    </Text>
                  </View>
                  <View className="flex items-start gap-2">
                    <Text className="text-[#f38660] mt-0.5">✓</Text>
                    <Text>
                      <strong>Clinical Consultations:</strong> Licensed healthcare professionals review your data and
                      provide personalized recommendations
                    </Text>
                  </View>
                  <View className="flex items-start gap-2">
                    <Text className="text-[#f38660] mt-0.5">✓</Text>
                    <Text>
                      <strong>Medication Tracking:</strong> Tools to track ADHD medication effectiveness, dosage,
                      timing, and side effects
                    </Text>
                  </View>
                  <View className="flex items-start gap-2">
                    <Text className="text-[#f38660] mt-0.5">✓</Text>
                    <Text>
                      <strong>Comprehensive Reporting:</strong> Clinical-grade reports you can share with your
                      healthcare provider
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Not a Replacement for Your Doctor</Text>
                <Text className="leading-relaxed">
                  While Attunio provides clinical services and licensed healthcare consultations, we are{" "}
                  <strong>NOT a replacement for your primary care physician or psychiatrist</strong>. We do not diagnose
                  ADHD, prescribe medication, or provide emergency medical care. Our clinicians work <em>alongside</em>{" "}
                  your existing healthcare team to provide data-driven insights.
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">ADHD Diagnosis & Prescriptions</Text>
                <Text className="leading-relaxed">
                  Attunio does NOT diagnose ADHD or any medical condition. ADHD diagnosis requires comprehensive
                  evaluation by a qualified psychiatrist or psychologist. We do NOT prescribe ADHD medications - you
                  must work with your prescribing physician for medication management. Our platform helps you track and
                  understand your symptoms to have more informed conversations with your doctor.
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Research-Backed, Not Diagnostic</Text>
                <Text className="leading-relaxed">
                  Our biomarkers are based on peer-reviewed research showing strong correlations between wearable data
                  and ADHD symptoms (85-95% accuracy in clinical studies). However, correlation does not equal
                  causation. These metrics provide insights and patterns, not medical diagnoses.
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Always Consult Your Healthcare Provider</Text>
                <Text className="leading-relaxed">
                  <strong>Never stop, start, or change medication based on Attunio data alone.</strong> Always consult
                  with your prescribing physician before making any changes to your treatment plan. Use Attunio as a
                  data collection and tracking tool to enhance - not replace - your medical care.
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Not for Medical Emergencies</Text>
                <Text className="leading-relaxed">
                  Attunio is not for emergency use. If you are experiencing a medical emergency, call 911 or go to your
                  nearest emergency room. For mental health crises, call the 988 Suicide & Crisis Lifeline (988) or text
                  HOME to 741741 (Crisis Text Line).
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Lab Testing & Results</Text>
                <Text className="leading-relaxed">
                  All lab testing is performed by CLIA-certified laboratories with certified phlebotomists. Lab results
                  are reviewed by licensed healthcare professionals. Abnormal results will be flagged and you will be
                  advised to consult with your primary care physician for follow-up care.
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Data Privacy & Security</Text>
                <Text className="leading-relaxed">
                  Your health data is encrypted, HIPAA-compliant, and private. We never sell your data to third parties.
                  You maintain full ownership of your data and can request deletion at any time. Lab results are
                  securely stored and accessible only to you and authorized healthcare professionals involved in your
                  care.
                </Text>
              </View>

              <View>
                <Text className="font-semibold text-[#1A2332] mb-2">Intended Use</Text>
                <Text className="leading-relaxed">
                  Attunio is designed to help you track biomarkers, understand patterns in your health data, monitor
                  medication effectiveness, and have more informed conversations with your healthcare provider. Think of
                  us as a data-driven support system that works <em>with</em> your doctor, not instead of them.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8 p-4 sm:p-5 bg-[#fff8f2] border border-[#f4d4c5] rounded-xl">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              className="mt-1 border-[#f38660]"
            />
            <Text // htmlFor="terms" className="text-xs sm:text-sm text-[#5B6B82] cursor-pointer leading-relaxed">
              I understand that Attunio provides clinical services including lab testing and consultations, but is not a
              replacement for my primary care physician or psychiatrist. I will not make medical decisions based solely
              on Attunio data and will consult my healthcare provider for diagnosis, prescriptions, and treatment
              changes. I agree to the Terms of Service and Privacy Policy.
            </Text>
          </View>

          <View className="flex flex-col sm:flex-row gap-3">
            <TouchableOpacity
              variant="outline"
              onPress={() => setCurrentStep("health-profile")}
              className="flex-1 rounded-xl border-[#E8ECF0] text-[#1A2332] hover:bg-slate-50"
            >
              Back
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentStep("connect-device")}
              disabled={!acceptedTerms}
              className="flex-1 bg-[#f38660] hover:bg-[#e57550] text-white rounded-xl"
            >
              I Understand, Continue
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    )
  }

  // Connect Device
  if (currentStep === "connect-device") {
    console.log(`[v0] Rendering connect-device screen`)
    const devices = [
      {
        name: "Apple Watch",
        provider: "APPLE",
        description: "Series 6 or newer (FDA cleared)",
        icon: (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
            <Textath d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
        ),
        accuracy: "99% HRV accuracy",
        badge: "FDA Cleared",
      },
      {
        name: "Oura Ring",
        provider: "OURA",
        description: "Gen 3 (Clinically validated)",
        icon: (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        ),
        accuracy: "Best-in-class sleep & HRV",
        badge: "Clinical Grade",
      },
      {
        name: "Whoop",
        provider: "WHOOP",
        description: "4.0 (Medical grade)",
        icon: (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        accuracy: "Professional athlete grade",
        badge: "Clinical Grade",
      },
      {
        name: "Fitbit",
        provider: "FITBIT",
        description: "Sense, Charge 5+ (Research validated)",
        icon: (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
            <Textath d="M13.5 1.5c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8V2.3c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8V6.1c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8V9.9c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8v-1.5c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8v-1.5c0-.5-.3-.8-.8-.8zM10.5 3c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8V3.8c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8V7.6c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8v-1.5c0-.5-.3-.8-.8-.8zm0 3.8c-.5 0-.8.3-.8.8v1.5c0 .4.3.8.8.8s.8-.4.8-.8v-1.5c0-.5-.3-.8-.8-.8z" />
          </svg>
        ),
        accuracy: "89% ADHD prediction accuracy",
        badge: "Research Validated",
      },
    ]

    return (
      <View className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-4xl w-full p-6 sm:p-8 lg:p-12 shadow-md border-0 bg-white rounded-2xl">
          <Text className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2 sm:mb-3 text-center tracking-tight">
            Connect Your Primary Wearable
          </Text>
          <Text className="text-[#5B6B82] mb-2 text-center text-sm sm:text-base">
            Required for Focus Score calculation (HRV, sleep, heart rate tracking)
          </Text>
          <View className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <svg className="w-4 h-4 text-[#f38660]" fill="currentColor" viewBox="0 0 20 20">
              <Textath
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 01-1.745.723 3.066 3.066 0 00-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 01.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <Text className="text-xs sm:text-sm text-[#5B6B82] font-medium">
              FDA-cleared & clinically validated for biomarker accuracy
            </Text>
          </View>

          <View className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {devices.map((device) => (
              <TouchableOpacity
                key={device.name}
                onPress={async () => {
                  setSelectedDevice(device.name)

                  try {
                    console.log(`[v0] Connecting to ${device.name} (${device.provider})...`)

                    const tempUserId = `onboarding-${Date.now()}`
                    console.log(`[v0] Generated user ID: ${tempUserId}`)

                    const response = await fetch("/api/terra/widget-session", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: tempUserId,
                        providers: [device.provider],
                      }),
                    })

                    console.log(`[v0] Widget session response status: ${response.status}`)

                    if (!response.ok) {
                      const errorText = await response.text()
                      console.error(`[v0] Widget session error:`, errorText)
                      throw new Error(`Failed to generate widget session: ${errorText}`)
                    }

                    const data = await response.json()
                    console.log(`[v0] Widget session data:`, data)

                    const widgetUrl = data.url || data.widget_url

                    if (!widgetUrl) {
                      console.error(`[v0] No widget URL in response:`, data)
                      throw new Error("No widget URL returned from Terra API")
                    }

                    console.log(`[v0] Redirecting to Terra widget (full page): ${widgetUrl}`)

                    // Save onboarding progress before redirecting to Terra widget
                    const progressData = {
                      step: 'connect-device',
                      userJourney,
                      selectedMembership,
                      healthProfile,
                      checkoutData,
                      deviceConnections, // Save existing connections
                      selectedDevice: device.name,
                      selectedProvider: device.provider,
                      timestamp: Date.now()
                    }
                    localStorage.setItem("attunio_onboarding_progress", JSON.stringify(progressData))
                    localStorage.setItem("attunio_temp_user_id", tempUserId)

                    // Use full-page redirect instead of popup (cleaner UX, no popup blockers)
                    // Terra will redirect back to our success URL after connection
                    window.location.href = widgetUrl
                  } catch (error) {
                    console.error("[v0] Error connecting device:", error)
                    alert(
                      `Failed to connect device: ${error instanceof Error ? error.message : "Unknown error"}. Please check console for details.`,
                    )
                    setSelectedDevice(null)
                  }
                }}
                className={`group relative w-full text-left p-6 rounded-xl border transition-all duration-200 ${
                  selectedDevice === device.name
                    ? "border-[#f38660] bg-[#fff8f2] shadow-md"
                    : "border-[#E8ECF0] hover:border-[#f38660] bg-white hover:bg-[#fff8f2]/30"
                }`}
              >
                <View className="absolute top-3 right-3">
                  <Text className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#f38660]/10 text-[#f38660]">
                    {device.badge}
                  </Text>
                </View>
                <View className="mb-3 flex justify-center">{device.icon}</View>
                <Text className="text-sm font-semibold text-[#1A2332] block mb-1">{device.name}</Text>
                <Text className="text-xs text-[#5B6B82] block mb-2">{device.description}</Text>
                <Text className="text-[11px] text-[#f38660] font-medium">{device.accuracy}</Text>
                {selectedDevice === device.name && (
                  <View className="absolute top-3 left-3 w-5 h-5 rounded-full bg-[#f38660] flex items-center justify-center shadow-md">
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-[#fff8f2] border border-[#f4d4c5] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <Text className="font-semibold text-[#1A2332] mb-3 text-sm sm:text-base">
              Clinical-grade biomarkers we track:
            </Text>
            <View className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <View className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#f38660] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <Textath
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <Text className="text-xs sm:text-sm text-[#5B6B82]">
                  <strong>HRV (Heart Rate Variability)</strong> - 85-95% ADHD correlation
                </Text>
              </View>
              <View className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#f38660] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <Textath
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <Text className="text-xs sm:text-sm text-[#5B6B82]">
                  <strong>Sleep Quality</strong> - Deep, REM, light stages
                </Text>
              </View>
              <View className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#f38660] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <Textath
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <Text className="text-xs sm:text-sm text-[#5B6B82]">
                  <strong>Resting Heart Rate</strong> - Elevated in ADHD
                </Text>
              </View>
              <View className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#f38660] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <Textath
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <Text className="text-xs sm:text-sm text-[#5B6B82]">
                  <strong>Activity Patterns</strong> - Movement & consistency
                </Text>
              </View>
            </View>
            <Text className="text-[10px] sm:text-xs text-[#5B6B82] mt-4 pt-4 border-t border-[#f4d4c5]">
              <strong>Privacy:</strong> We only read data - we never write to your device or share with third parties.
              Powered by Terra API with bank-level encryption.
            </Text>
          </View>

          <View className="bg-[#FFF0E6] border border-[#FFD9CC] rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <Text className="text-xs sm:text-sm text-[#5B6B82]">
              <strong>Demo Mode:</strong> Terra widget will open in a popup. For demo purposes, closing the popup will
              simulate a successful connection. In production, the widget handles actual device authentication with
              OAuth.
            </Text>
          </View>

          <TouchableOpacity
            variant="outline"
            onPress={() => setCurrentStep("disclaimer")}
            className="w-full rounded-xl border-[#E8ECF0] text-[#1A2332] hover:bg-slate-50"
          >
            Back
          </TouchableOpacity>
        </Card>
      </View>
    )
  }

  if (currentStep === "connect-cgm") {
    console.log(`[v0] Rendering connect-cgm screen`)
    return (
      <View className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-3xl w-full p-6 sm:p-8 lg:p-12 shadow-md border-0 bg-white rounded-2xl">
          <View className="text-center mb-8">
            <View className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f38660]/10 mb-4">
              <svg className="w-8 h-8 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </View>
            <Text className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2 sm:mb-3 tracking-tight">
              Add Glucose Monitoring?
            </Text>
            <Text className="text-[#5B6B82] text-sm sm:text-base max-w-2xl mx-auto">
              Optional: Connect a continuous glucose monitor to track how blood sugar affects your focus and energy
              levels
            </Text>
          </View>

          <View className="bg-[#fff8f2] border border-[#f4d4c5] rounded-xl p-6 mb-8">
            <Text className="font-semibold text-[#1A2332] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Why track glucose for ADHD?
            </Text>
            <View className="space-y-2 text-sm text-[#5B6B82]">
              <View className="flex items-start gap-2">
                <Text className="text-[#f38660] mt-0.5">•</Text>
                <Text>Blood sugar spikes and crashes can worsen ADHD symptoms like brain fog and irritability</Text>
              </View>
              <View className="flex items-start gap-2">
                <Text className="text-[#f38660] mt-0.5">•</Text>
                <Text>Many ADHD adults experience reactive hypoglycemia after high-carb meals</Text>
              </View>
              <View className="flex items-start gap-2">
                <Text className="text-[#f38660] mt-0.5">•</Text>
                <Text>Stable glucose levels correlate with better focus, mood, and medication effectiveness</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={async () => {
              setSelectedDevice("Dexcom Stelo")
              try {
                console.log(`[v0] Connecting to Dexcom Stelo (DEXCOM)...`)

                const tempUserId = localStorage.getItem("attunio_temp_user_id") || `onboarding-${Date.now()}`

                const response = await fetch("/api/terra/widget-session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: tempUserId,
                    providers: ["DEXCOM"],
                  }),
                })

                if (!response.ok) {
                  const errorText = await response.text()
                  console.error(`[v0] Widget session error:`, errorText)
                  throw new Error(`Failed to generate widget session: ${errorText}`)
                }

                const data = await response.json()
                const widgetUrl = data.url || data.widget_url

                if (!widgetUrl) {
                  throw new Error("No widget URL returned from Terra API")
                }

                console.log(`[v0] Opening Dexcom Stelo widget URL: ${widgetUrl}`)

                const widgetWindow = window.open(widgetUrl, "_blank", "width=500,height=700")

                if (!widgetWindow) {
                  alert("Please allow popups to connect your CGM device. Click OK and try again.")
                  setSelectedDevice(null)
                  return
                }

                const pollTimer = setInterval(() => {
                  if (widgetWindow.closed) {
                    clearInterval(pollTimer)
                    console.log(`[v0] CGM widget closed, saving CGM metadata and proceeding to sync`)
                    
                    // Save CGM device metadata
                    setDeviceConnections(prev => ({
                      ...prev,
                      cgm: {
                        type: "Dexcom Stelo",
                        provider: "DEXCOM",
                        connectedAt: new Date().toISOString(),
                        dataQuality: 'excellent' // Default to excellent
                      }
                    }));
                    
                    handleDeviceConnect()
                  }
                }, 1000)
              } catch (error) {
                console.error("[v0] Error connecting CGM:", error)
                alert(`Failed to connect CGM: ${error instanceof Error ? error.message : "Unknown error"}`)
                setSelectedDevice(null)
              }
            }}
            className="group relative w-full text-left p-8 rounded-xl border-2 border-[#E8ECF0] hover:border-[#f38660] bg-white hover:bg-[#fff8f2]/30 transition-all duration-200 mb-4"
          >
            <View className="flex items-start gap-6">
              <View className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#F5f5f5] flex items-center justify-center border border-[#E8ECF0] group-hover:border-[#f38660] transition-colors">
                <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </View>
              <View className="flex-1">
                <View className="flex items-center gap-2 mb-2">
                  <Text className="text-lg font-bold text-[#1A2332]">Dexcom Stelo</Text>
                  <Text className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#f38660]/10 text-[#f38660]">
                    FDA Cleared CGM
                  </Text>
                </View>
                <Text className="text-sm text-[#5B6B82] mb-3">
                  First over-the-counter continuous glucose monitor - no prescription needed
                </Text>
                <View className="flex items-center gap-2 text-xs text-[#f38660] font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <Textath
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Text>Continuous glucose tracking every 15 minutes</Text>
                </View>
              </View>
              <View className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[#5B6B82] group-hover:text-[#f38660] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </View>
            </View>
            {selectedDevice === "Dexcom Stelo" && (
              <View className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#f38660] flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("[v0] User skipped CGM connection")
              handleDeviceConnect()
            }}
            variant="outline"
            className="w-full rounded-xl border-[#E8ECF0] text-[#5B6B82] hover:bg-slate-50"
          >
            Skip for Now
          </TouchableOpacity>

          <Text className="text-xs text-center text-[#5B6B82]">
            You can always add glucose monitoring later from your profile settings
          </Text>
        </Card>
      </View>
    )
  }

  // Syncing Data
  if (currentStep === "sync") {
    console.log(`[v0] Rendering sync screen`)
    return (
      <View className="min-h-screen bg-[#fff8f2] flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-12 text-center border border-[#e5e7eb] shadow-lg bg-white rounded-2xl">
          <View className="relative mb-8">
            <View className="w-32 h-32 mx-auto relative">
              <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f38660"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - syncProgress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <View className="absolute inset-0 flex items-center justify-center">
                <View className="w-20 h-20 rounded-xl bg-[#fff8f2] flex items-center justify-center border border-[#f38660]">
                  <svg className="w-10 h-10 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <Textath
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-3xl font-bold text-[#172334] mb-3 tracking-tight">Analyzing...</Text>
          <Text className="text-lg text-[#6b7280] mb-8">Matching you with your personalized treatment plan</Text>

          <View className="space-y-3 mb-8">
            <View
              className={`flex items-center gap-3 text-sm ${syncProgress >= 30 ? "text-[#f38660]" : "text-[#9ca3af]"}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <Textath
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <Text className="font-medium">Evaluating symptoms & goals</Text>
            </View>
            <View
              className={`flex items-center gap-3 text-sm ${syncProgress >= 60 ? "text-[#f38660]" : "text-[#9ca3af]"}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <Textath
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <Text className="font-medium">Reviewing timeline & severity</Text>
            </View>
            <View
              className={`flex items-center gap-3 text-sm ${syncProgress >= 90 ? "text-[#f38660]" : "text-[#9ca3af]"}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <Textath
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <Text className="font-medium">Personalizing recommendations</Text>
            </View>
          </View>

          <Text className="text-3xl font-bold text-[#f38660]">{syncProgress}%</Text>
        </Card>
      </View>
    )
  }

  // Complete
  if (currentStep === "complete") {
    console.log(`[v0] Rendering complete screen`)
    return (
      <View className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {showConfetti && (
          {/* Confetti removed */}
        )}

        <Card className="max-w-2xl w-full p-8 sm:p-10 lg:p-14 text-center shadow-md bg-white rounded-2xl border-0 relative z-10">
          <View className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f38660] flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </View>

          <Text className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2332] mb-3 sm:mb-4 tracking-tight">
            You're All Set!
          </Text>
          <Text className="text-lg sm:text-xl text-[#5B6B82] mb-10 sm:mb-12 leading-relaxed max-w-xl mx-auto">
            Your personalized ADHD care platform is ready. Here's what happens next.
          </Text>

          <View className="space-y-6 mb-10 text-left">
            <View className="flex items-start gap-4">
              <View className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f38660] text-white flex items-center justify-center font-bold text-lg shadow-md">
                1
              </View>
              <View className="flex-1 pt-2">
                <Text className="text-lg font-bold text-[#1A2332] mb-2">Start Tracking Immediately</Text>
                <Text className="text-sm text-[#5B6B82] leading-relaxed">
                  Your wearable is synced and collecting data. Check your Focus Score and biomarker dashboard daily for
                  real-time insights.
                </Text>
              </View>
            </View>

            <View className="flex items-start gap-4">
              <View className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f38660] text-white flex items-center justify-center font-bold text-lg shadow-md">
                2
              </View>
              <View className="flex-1 pt-2">
                <Text className="text-lg font-bold text-[#1A2332] mb-2">Build Your Baseline (2-4 Weeks)</Text>
                <Text className="text-sm text-[#5B6B82] leading-relaxed">
                  Consistent tracking over time reveals patterns. The more data collected, the more accurate your
                  insights become.
                </Text>
              </View>
            </View>

            {selectedMembership !== "essential" && (
              <View className="flex items-start gap-4">
                <View className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f38660] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  3
                </View>
                <View className="flex-1 pt-2">
                  <Text className="text-lg font-bold text-[#1A2332] mb-2">Lab Kit Arrives (3-5 Days)</Text>
                  <Text className="text-sm text-[#5B6B82] leading-relaxed">
                    Your CLIA-certified at-home blood biomarker test kit ships within 3-5 business days. Test key
                    markers like ferritin, vitamin D, thyroid, cortisol, and more with certified phlebotomist support
                    available.
                  </Text>
                </View>
              </View>
            )}

            {(selectedMembership === "pro" || selectedMembership === "complete") && (
              <View className="flex items-start gap-4">
                <View className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f38660] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  4
                </View>
                <View className="flex-1 pt-2">
                  <Text className="text-lg font-bold text-[#1A2332] mb-2">
                    {selectedMembership === "complete" ? "Weekly" : "Monthly"} Clinical Consultations
                  </Text>
                  <Text className="text-sm text-[#5B6B82] leading-relaxed">
                    Schedule your first consultation with a licensed healthcare professional to review your biomarker
                    data, medication tracking, and lab results. Get personalized recommendations based on your complete
                    health picture.
                  </Text>
                </View>
              </View>
            )}

            {selectedMembership === "complete" && (
              <View className="flex items-start gap-4">
                <View className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f38660] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  5
                </View>
                <View className="flex-1 pt-2">
                  <Text className="text-lg font-bold text-[#1A2332] mb-2">Track Medication Effectiveness</Text>
                  <Text className="text-sm text-[#5B6B82] leading-relaxed">
                    Use our comprehensive medication tracking to monitor dosage timing, side effects, and effectiveness
                    correlated with your biomarker data. Share insights with your prescribing physician.
                  </Text>
                </View>
              </View>
            )}

            <View className="flex items-start gap-4">
              <View className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f38660] text-white flex items-center justify-center font-bold text-lg shadow-md">
                {selectedMembership === "complete" ? "6" : selectedMembership === "pro" ? "5" : "4"}
              </View>
              <View className="flex-1 pt-2">
                <Text className="text-lg font-bold text-[#1A2332] mb-2">Share with Your Doctor</Text>
                <Text className="text-sm text-[#5B6B82] leading-relaxed">
                  Export comprehensive clinical-grade PDF reports combining wearable data, lab results, and medication
                  tracking. Use your data to have informed conversations with your healthcare provider about diagnosis
                  and treatment optimization.
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-[#fff8f2] border border-[#f4d4c5] rounded-2xl p-6 mb-8 text-left">
            <Text className="font-semibold text-[#1A2332] mb-3 text-base">Resources & Support</Text>
            <View className="space-y-2 text-sm text-[#5B6B82]">
              <View className="flex items-start gap-2">
                <Text className="text-[#f38660] flex-shrink-0">📚</Text>
                <Text>
                  Access the Library for peer-reviewed ADHD research articles and evidence-based educational content
                </Text>
              </View>
              <View className="flex items-start gap-2">
                <View className="w-5 h-5 relative flex-shrink-0 mt-0.5">
                  <Image source={require("/images/icon-10.svg")} alt="" width={20} height={20} className="object-contain" />
                </View>
                <Text>
                  Schedule consultations with licensed clinicians who specialize in ADHD and understand your complete
                  data picture
                </Text>
              </View>
              <View className="flex items-start gap-2">
                <View className="w-5 h-5 relative flex-shrink-0 mt-0.5">
                  <Image source={require("/images/icon-10.svg")} alt="" width={20} height={20} className="object-contain" />
                </View>
                <Text>
                  Track medication timing, dosage, and effectiveness alongside biomarker changes for optimization
                </Text>
              </View>
              <View className="flex items-start gap-2">
                <View className="w-5 h-5 relative flex-shrink-0 mt-0.5">
                  <Image source={require("/images/icon-02.svg")} alt="" width={20} height={20} className="object-contain" />
                </View>
                <Text>Join our community for peer support, shared experiences, and success stories</Text>
              </View>
              <View className="flex items-start gap-2">
                <View className="w-5 h-5 relative flex-shrink-0 mt-0.5">
                  <Image source={require("/images/icon-02.svg")} alt="" width={20} height={20} className="object-contain" />
                </View>
                <Text>Email support@attunio.com for technical help or questions about your clinical services</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleComplete}
            className="w-full bg-[#f38660] hover:bg-[#e57550] text-white py-6 sm:py-7 text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all font-medium hover:scale-105"
          >
            View My Dashboard →
          </TouchableOpacity>

          <Text className="text-sm text-[#5B6B82] mt-4">Ready to see your ADHD insights in high definition</Text>
        </Card>
      </View>
    )
  }

  console.log(`[v0] No matching step found for: ${currentStep}`)
  return null
}
