import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'complete'>('welcome');

  const handleWelcomeContinue = () => {
    // For now, just complete onboarding after welcome
    // In future, add more steps (assessment, health profile, device connection)
    onComplete();
  };

  if (currentStep === 'welcome') {
    return <WelcomeScreen onContinue={handleWelcomeContinue} />;
  }

  // Completion screen (shown briefly before redirecting to dashboard)
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-4xl mb-4">🎉</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Welcome to Attunio!
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Your personalized ADHD health journey starts now
        </Text>
        <TouchableOpacity
          className="bg-primary rounded-lg py-4 px-8"
          onPress={onComplete}
        >
          <Text className="text-white font-bold text-lg">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
