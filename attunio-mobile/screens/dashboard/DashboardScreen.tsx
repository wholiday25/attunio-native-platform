import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useDashboardData, formatBiomarkerValue } from '../../../shared';

export default function DashboardScreen() {
  const [userId, setUserId] = useState<string>('');
  const { biomarkers, focusScore, isLoading, isSyncing, refetch } = useDashboardData({
    userId,
    useMockData: !userId, // Use mock data until we have a user ID
  });

  useEffect(() => {
    // Get current user ID
    getCurrentUser()
      .then((user) => {
        setUserId(user.userId);
      })
      .catch((error) => {
        console.error('Error getting user:', error);
      });
  }, []);

  const onRefresh = async () => {
    await refetch();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by App.tsx auth state change
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isSyncing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-3xl font-bold text-gray-900">Dashboard</Text>
              <Text className="text-gray-600 mt-1">Welcome back!</Text>
            </View>
            <TouchableOpacity
              onPress={handleSignOut}
              className="bg-gray-100 px-4 py-2 rounded-lg"
            >
              <Text className="text-gray-700 font-semibold">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Key Metrics */}
        <View className="px-6 py-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Key Metrics
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {/* Focus Score */}
            <View className="w-1/2 px-2 mb-4">
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-gray-600 text-sm mb-2">Focus Score</Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {focusScore.overall || '--'}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {focusScore.overall ? 'Good' : 'No data'}
                </Text>
              </View>
            </View>

            {/* HRV */}
            <View className="w-1/2 px-2 mb-4">
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-gray-600 text-sm mb-2">HRV</Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {biomarkers ? Math.round(biomarkers.hrv) : '--'}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {biomarkers ? 'ms' : 'No data'}
                </Text>
              </View>
            </View>

            {/* Sleep Quality */}
            <View className="w-1/2 px-2 mb-4">
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-gray-600 text-sm mb-2">Sleep</Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {biomarkers ? Math.round(biomarkers.sleepEfficiency) : '--'}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {biomarkers ? '%' : 'No data'}
                </Text>
              </View>
            </View>

            {/* Activity */}
            <View className="w-1/2 px-2 mb-4">
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-gray-600 text-sm mb-2">Activity</Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {biomarkers ? Math.round(biomarkers.activeMinutes) : '--'}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {biomarkers ? 'min' : 'No data'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Connect Device CTA */}
        <View className="px-6 pb-6">
          <View className="bg-primary rounded-xl p-6">
            <Text className="text-white text-xl font-bold mb-2">
              Connect Your Wearable
            </Text>
            <Text className="text-white/90 mb-4">
              Start tracking your health metrics by connecting a wearable device
            </Text>
            <TouchableOpacity className="bg-white rounded-lg py-3 px-6 items-center">
              <Text className="text-primary font-bold">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
