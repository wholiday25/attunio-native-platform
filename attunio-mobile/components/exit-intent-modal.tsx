// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"

interface ExitIntentModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  currentStep: number
  totalSteps: number
}

export function ExitIntentModal({ isOpen, onClose, onContinue, currentStep, totalSteps }: ExitIntentModalProps) {
  const percentComplete = Math.round((currentStep / totalSteps) * 100)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <View className="text-center p-4">
          <View className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
            <TouchableOpacitylertCircle className="w-8 h-8 text-teal-600" />
          </View>

          <Text className="text-2xl font-bold text-slate-900 mb-2">Wait! Don't Leave Yet</Text>

          <Text className="text-slate-600 mb-6">
            You're <strong>{percentComplete}% done</strong> setting up your personalized ADHD tracking. Finish now and
            start seeing insights tomorrow.
          </Text>

          <View className="space-y-3">
            <TouchableOpacity onPress={onContinue} className="w-full bg-teal-600 hover:bg-teal-700">
              Continue Setup ({totalSteps - currentStep + 1} steps left)
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} variant="ghost" className="w-full">
              I'll come back later
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-slate-500 mt-4">💾 Your progress is saved</Text>
        </View>
      </DialogContent>
    </Dialog>
  )
}
