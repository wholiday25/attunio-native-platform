import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useOnboardingFlow } from '../../../shared/hooks/useOnboardingFlow';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mobile storage adapter for AsyncStorage
const mobileStorage = {
  getItem: async (key: string) => await AsyncStorage.getItem(key),
  setItem: async (key: string, value: string) => await AsyncStorage.setItem(key, value),
  removeItem: async (key: string) => await AsyncStorage.removeItem(key),
};

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const { setUserJourney, setCurrentStep } = useOnboardingFlow(mobileStorage);

  const handleJourneySelect = (journey: 'diagnosed' | 'exploring' | 'monitoring') => {
    setUserJourney(journey);
    setCurrentStep('assessment');
    onContinue();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Attunio
            </Text>
            <Text className="text-gray-600 text-lg text-center">
              Your personalized ADHD health companion
            </Text>
          </View>

          {/* Journey Selection */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-6">
              Which best describes you?
            </Text>

            {/* Diagnosed Card */}
            <TouchableOpacity
              className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-4"
              onPress={() => handleJourneySelect('diagnosed')}
            >
              <Text className="text-lg font-bold text-gray-900 mb-2">
                I've been diagnosed with ADHD
              </Text>
              <Text className="text-gray-600">
                Track your medication, monitor biomarkers, and optimize your treatment
              </Text>
            </TouchableOpacity>

            {/* Exploring Card */}
            <TouchableOpacity
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-4"
              onPress={() => handleJourneySelect('exploring')}
            >
              <Text className="text-lg font-bold text-gray-900 mb-2">
                I'm exploring if I have ADHD
              </Text>
              <Text className="text-gray-600">
                Use science-backed biomarkers to understand your symptoms better
              </Text>
            </TouchableOpacity>

            {/* Monitoring Card */}
            <TouchableOpacity
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6"
              onPress={() => handleJourneySelect('monitoring')}
            >
              <Text className="text-lg font-bold text-gray-900 mb-2">
                I want to monitor my cognitive health
              </Text>
              <Text className="text-gray-600">
                Track biomarkers and optimize your focus, sleep, and well-being
              </Text>
            </TouchableOpacity>
          </View>

          {/* Trust Indicators */}
          <View className="mt-8 items-center">
            <Text className="text-gray-500 text-sm text-center mb-3">
              Trusted by thousands of ADHD patients
            </Text>
            <View className="flex-row items-center">
              <Text className="text-gray-400 text-xs mx-2">HIPAA Compliant</Text>
              <Text className="text-gray-400 text-xs mx-2">•</Text>
              <Text className="text-gray-400 text-xs mx-2">Science-Backed</Text>
              <Text className="text-gray-400 text-xs mx-2">•</Text>
              <Text className="text-gray-400 text-xs mx-2">FDA Cleared</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
