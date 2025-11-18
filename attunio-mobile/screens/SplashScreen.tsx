import { useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    // Show splash for 2 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image
        source={require('../assets/attunio-logo.png')}
        className="w-48 h-48 mb-8"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-gray-900 mb-2">Attunio</Text>
      <Text className="text-lg text-gray-600 mb-12">
        See Your ADHD in High Definition
      </Text>
      <ActivityIndicator size="large" color="#10b981" />
    </View>
  );
}
