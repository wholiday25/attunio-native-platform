import './global.css';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from './lib/aws/amplify';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RootStackParamList } from './types/navigation';

// Configure AWS Amplify
try {
  Amplify.configure(amplifyConfig);
} catch (error) {
  console.error('Amplify configuration error:', error);
  // In production, you might want to show an error screen or use a fallback config
}

// Screens
import SplashScreen from './screens/SplashScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
import LibraryScreen from './screens/LibraryScreen';
import MoreScreen from './screens/MoreScreen';
import ProfileScreen from './screens/ProfileScreen';

// Health Screens
import ADHDDashboardScreen from './screens/health/ADHDDashboardScreen';
import BiomarkerDetailScreen from './screens/health/BiomarkerDetailScreen';
import GlucoseTrackingScreen from './screens/health/GlucoseTrackingScreen';
import LabResultsScreen from './screens/health/LabResultsScreen';
import MedicationTrackingScreen from './screens/health/MedicationTrackingScreen';
import MyDataScreen from './screens/health/MyDataScreen';
import ProgressTrackerScreen from './screens/health/ProgressTrackerScreen';
import TreatmentPlanScreen from './screens/health/TreatmentPlanScreen';

// Content Screens
import ArticleDetailScreen from './screens/content/ArticleDetailScreen';
import TransparencyScreen from './screens/content/TransparencyScreen';

// Settings Screens
import CheckoutScreen from './screens/settings/CheckoutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppState = 'splash' | 'loading' | 'auth' | 'onboarding' | 'dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Only check auth after splash is done
    if (appState === 'loading') {
      checkAuthStatus();
    }
  }, [appState]);

  const checkAuthStatus = async () => {
    try {
      const user = await getCurrentUser();
      
      // Check if user has completed onboarding
      const onboardingComplete = await AsyncStorage.getItem('onboarding_complete');
      const savedEmail = await AsyncStorage.getItem('user_email');
      
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
      
      if (onboardingComplete === 'true') {
        setAppState('dashboard');
      } else {
        setAppState('onboarding');
      }
    } catch (error) {
      console.log('Not authenticated:', error);
      setAppState('auth');
    }
  };

  const handleSplashFinish = () => {
    setAppState('loading');
  };

  const handleOnboardingComplete = async (userData: any) => {
    await AsyncStorage.setItem('onboarding_complete', 'true');
    if (userData?.userData?.email) {
      await AsyncStorage.setItem('user_email', userData.userData.email);
    }
    setAppState('dashboard');
  };

  const handleSignUpSuccess = async (email: string) => {
    // After email verification via magic link, store email and go to onboarding
    setUserEmail(email);
    await AsyncStorage.setItem('user_email', email);
    setAppState('onboarding');
  };

  const handleLoginSuccess = async (email: string) => {
    // Check if they've completed onboarding
    const onboardingComplete = await AsyncStorage.getItem('onboarding_complete');
    setUserEmail(email);
    await AsyncStorage.setItem('user_email', email);
    
    if (onboardingComplete === 'true') {
      setAppState('dashboard');
    } else {
      setAppState('onboarding');
    }
  };

  // Show splash screen
  if (appState === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Show loading spinner during authentication check
  if (appState === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          {appState === 'auth' ? (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {(props) => <SignUpScreen {...props} onSignUpSuccess={handleSignUpSuccess} />}
              </Stack.Screen>
            </>
          ) : appState === 'onboarding' ? (
            <Stack.Screen name="Onboarding">
              {(props) => <OnboardingFlow {...props} userEmail={userEmail} onComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Library" component={LibraryScreen} />
              <Stack.Screen name="More" component={MoreScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              
              {/* Health Screens */}
              <Stack.Screen name="ADHDDashboard" component={ADHDDashboardScreen} />
              <Stack.Screen name="BiomarkerDetail" component={BiomarkerDetailScreen} />
              <Stack.Screen name="GlucoseTracking" component={GlucoseTrackingScreen} />
              <Stack.Screen name="LabResults" component={LabResultsScreen} />
              <Stack.Screen name="MedicationTracking" component={MedicationTrackingScreen} />
              <Stack.Screen name="MyData" component={MyDataScreen} />
              <Stack.Screen name="ProgressTracker" component={ProgressTrackerScreen} />
              <Stack.Screen name="TreatmentPlan" component={TreatmentPlanScreen} />
              
              {/* Content Screens */}
              <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
              <Stack.Screen name="Transparency" component={TransparencyScreen} />
              
              {/* Settings Screens */}
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
