// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
  onExit?: () => void
}

export function OnboardingProgress({ currentStep, totalSteps, onExit }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <View className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <View className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        <View className="flex items-center gap-3">
          <Image source={require("/attunio-logo.png")} width={32} height={32} alt="Attunio" className="w-8 h-8" />
          <Text className="text-sm text-[#5B6B82] font-medium">
            Step {currentStep} of {totalSteps}
          </Text>
        </View>
        {onExit && (
          <TouchableOpacity variant="ghost" size="sm" onPress={onExit} className="text-[#5B6B82] hover:text-[#1A2332]">
            Exit
          </TouchableOpacity>
        )}
      </View>
      <Textrogress value={progress} className="h-1 rounded-none" />
    </View>
  )
}
