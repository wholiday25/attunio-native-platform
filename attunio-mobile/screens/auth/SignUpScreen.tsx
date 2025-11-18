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
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';

interface SignUpScreenProps {
  navigation: any;
  onSignUpSuccess?: () => void;
}

export default function SignUpScreen({ navigation, onSignUpSuccess }: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp({
        username: email.toLowerCase().trim(),
        password,
        options: {
          userAttributes: {
            email: email.toLowerCase().trim(),
            name,
          },
        },
      });

      console.log('Sign up result:', result);
      setShowConfirmation(true);
    } catch (error: any) {
      console.error('Sign up error:', error);
      Alert.alert('Sign Up Failed', error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async () => {
    if (!confirmationCode) {
      Alert.alert('Error', 'Please enter the confirmation code');
      return;
    }

    setIsLoading(true);
    try {
      await confirmSignUp({
        username: email.toLowerCase().trim(),
        confirmationCode,
      });

      // Auto sign in after confirmation
      await signIn({
        username: email.toLowerCase().trim(),
        password,
      });

      onSignUpSuccess?.();
    } catch (error: any) {
      console.error('Confirmation error:', error);
      Alert.alert('Confirmation Failed', error.message || 'Invalid confirmation code');
    } finally {
      setIsLoading(false);
    }
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

            <TouchableOpacity onPress={() => setShowConfirmation(false)}>
              <Text className="text-center text-primary">
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
            <View className="items-center mb-8">
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
            </View>

            {/* Sign Up Form */}
            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2">Full Name</Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>

            <View className="mb-4">
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

            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2">Password</Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Create a password (min 8 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Confirm Password
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
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
