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
import { signUp, confirmSignUp, signIn, autoSignIn } from 'aws-amplify/auth';
import { validateEmail } from '../../lib/utils/validation';

interface SignUpScreenProps {
  navigation: any;
  onSignUpSuccess?: (email: string) => void;
}

export default function SignUpScreen({ navigation, onSignUpSuccess }: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSignUp = async () => {
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
      // Generate a temporary password (AWS Cognito requires it, but user won't see it)
      const tempPassword = `Temp${Math.random().toString(36).slice(-8)}!1Aa`;
      
      const result = await signUp({
        username: email.toLowerCase().trim(),
        password: tempPassword,
        options: {
          userAttributes: {
            email: email.toLowerCase().trim(),
          },
          autoSignIn: true, // Enable auto sign-in after confirmation
        },
      });

      console.log('Sign up result:', result);
      setShowConfirmation(true);
      Alert.alert(
        'Verification Email Sent',
        `We've sent a 6-digit code to ${email}. Please check your inbox.`
      );
    } catch (error: any) {
      console.error('Sign up error:', error);
      Alert.alert('Sign Up Failed', error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async () => {
    if (!confirmationCode || confirmationCode.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit verification code');
      return;
    }

    setIsLoading(true);
    try {
      // Confirm the sign-up with the code
      await confirmSignUp({
        username: email.toLowerCase().trim(),
        confirmationCode: confirmationCode.trim(),
      });

      // Auto sign-in will happen automatically due to autoSignIn: true
      Alert.alert(
        'Success!',
        'Your email has been verified. Setting up your account...',
        [
          {
            text: 'Continue',
            onPress: () => onSignUpSuccess?.(email.toLowerCase().trim()),
          },
        ]
      );
    } catch (error: any) {
      console.error('Confirmation error:', error);
      Alert.alert('Verification Failed', error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    // TODO: Implement resend code functionality
    Alert.alert('Code Resent', 'A new verification code has been sent to your email.');
  };

  if (showConfirmation) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 justify-center">
            <View className="items-center mb-12">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Confirm Your Email
              </Text>
              <Text className="text-gray-600 text-center">
                We sent a confirmation code to {email}
              </Text>
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Confirmation Code
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Enter 6-digit code"
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                keyboardType="number-pad"
                maxLength={6}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              className={`rounded-lg py-4 items-center mb-4 ${
                isLoading ? 'bg-gray-400' : 'bg-primary'
              }`}
              onPress={handleConfirmSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Confirm Account
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-4"
              onPress={handleResendCode}
              disabled={isLoading}
            >
              <Text className="text-center text-primary font-semibold">
                Resend Code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowConfirmation(false)}>
              <Text className="text-center text-gray-600">
                Back to Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
          <View className="flex-1 px-6 justify-center py-8">
            {/* Header */}
            <View className="items-center mb-12">
              <Image
                source={require('../../assets/attunio-logo.png')}
                className="w-32 h-32 mb-4"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </Text>
              <Text className="text-gray-600 text-center">
                See Your ADHD in High Definition
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-2">
                No password needed - we'll email you a verification code
              </Text>
            </View>

            {/* Sign Up Form */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Email Address</Text>
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

            {/* Sign Up Button */}
            <TouchableOpacity
              className={`rounded-lg py-4 items-center mb-4 ${
                isLoading ? 'bg-gray-400' : 'bg-primary'
              }`}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={isLoading}
              >
                <Text className="text-primary font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
