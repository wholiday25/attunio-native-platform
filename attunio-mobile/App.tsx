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

const Stack = createNativeStackNavigator();

type AppState = 'splash' | 'loading' | 'auth' | 'onboarding' | 'dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');

  useEffect(() => {
    // Only check auth after splash is done
    if (appState === 'loading') {
      checkAuthStatus();
    }
  }, [appState]);

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
      
      // Check if user has completed onboarding
      const onboardingComplete = await AsyncStorage.getItem('onboarding_complete');
      
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

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('onboarding_complete', 'true');
    setAppState('dashboard');
  };

  const handleLoginSuccess = () => {
    setAppState('onboarding');
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
                {(props) => <SignUpScreen {...props} onSignUpSuccess={handleLoginSuccess} />}
              </Stack.Screen>
            </>
          ) : appState === 'onboarding' ? (
            <Stack.Screen name="Onboarding">
              {(props) => <OnboardingFlow {...props} onComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
