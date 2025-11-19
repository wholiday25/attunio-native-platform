import { useState } from 'react';
import { View } from 'react-native';
import { OnboardingFlow as OnboardingFlowComponent } from '../../components/onboarding-flow';

interface OnboardingFlowProps {
  userEmail?: string;
  onComplete: (userData: any) => void;
}

export default function OnboardingFlow({ userEmail = '', onComplete }: OnboardingFlowProps) {
  const handleOnboardingComplete = (userData: any) => {
    // Pass email data throughout the flow
    const completeData = {
      ...userData,
      userData: {
        ...userData.userData,
        email: userEmail || userData.userData?.email,
      },
    };
    onComplete(completeData);
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingFlowComponent onComplete={handleOnboardingComplete} />
    </View>
  );
}
