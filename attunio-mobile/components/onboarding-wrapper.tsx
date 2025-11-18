// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from "react"
import { OnboardingFlow } from "./onboarding-flow"

interface OnboardingWrapperProps {
  onComplete: (data: any) => void
}

export function OnboardingWrapper({ onComplete }: OnboardingWrapperProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = (data: any) => {
    console.log("[OnboardingWrapper] Received completion, auto-advancing to dashboard...")
    setIsCompleting(true)
    
    // Small delay for smooth transition (optional)
    setTimeout(() => {
      onComplete(data)
    }, 500)
  }

  if (isCompleting) {
    return (
      <View className="min-h-screen bg-[#fff8f2] flex items-center justify-center">
        <View className="text-center">
          <View className="w-16 h-16 border-4 border-orange-200 border-t-[#f38660] rounded-full animate-spin mx-auto mb-4"></View>
          <Text className="text-[#172334] text-lg">Setting up your dashboard...</Text>
        </View>
      </View>
    )
  }

  return <OnboardingFlow onComplete={handleComplete} />
}
