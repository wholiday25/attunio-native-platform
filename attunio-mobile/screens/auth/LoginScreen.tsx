import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { signIn, SignInInput, confirmSignIn } from 'aws-amplify/auth';
import { validateEmail } from '../../lib/utils/validation';

interface LoginScreenProps {
  navigation: any;
  onLoginSuccess?: (email: string) => void;
}

export default function LoginScreen({ navigation, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleMagicLinkLogin = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // For now, show password option
      // TODO: Implement true magic link with AWS SES
      setShowPasswordLogin(true);
      Alert.alert(
        'Welcome Back',
        'Please enter your password to continue',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to send login link');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    try {
      const signInInput: SignInInput = {
        username: email.toLowerCase().trim(),
        password,
      };

      const result = await signIn(signInInput);
      
      if (result.isSignedIn) {
        onLoginSuccess?.(email.toLowerCase().trim());
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-center">
            {/* Logo/Header */}
            <View className="items-center mb-12">
              <Image
                source={require('../../assets/attunio-logo.png')}
                className="w-32 h-32 mb-4"
                resizeMode="contain"
              />
              <Text className="text-4xl font-bold text-gray-900 mb-2">
                Attunio
              </Text>
              <Text className="text-gray-600 text-lg">
                See Your ADHD in High Definition
              </Text>
            </View>

            {/* Login Form */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Email</Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {showPasswordLogin && (
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2">Password</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            )}

            {/* Forgot Password */}
            {showPasswordLogin && (
              <TouchableOpacity className="mb-6">
                <Text className="text-primary text-right">Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {/* Login Button */}
            <TouchableOpacity
              className={`rounded-lg py-4 items-center mb-4 ${
                isLoading ? 'bg-gray-400' : 'bg-primary'
              }`}
              onPress={showPasswordLogin ? handlePasswordLogin : handleMagicLinkLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  {showPasswordLogin ? 'Sign In' : 'Continue with Email'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                disabled={isLoading}
              >
                <Text className="text-primary font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
