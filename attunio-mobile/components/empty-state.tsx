// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"

interface EmptyStateProps {
  type: "biomarker" | "data" | "report"
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const config = {
    biomarker: {
      icon: Activity,
      title: "No biomarker data yet",
      description:
        "Connect your wearable device to start tracking your ADHD biomarkers. You'll see personalized insights within 24 hours of syncing.",
      actionText: "Connect Device",
    },
    data: {
      icon: Database,
      title: "No historical data available",
      description: "Your data history will appear here once we collect enough information from your wearable device.",
      actionText: "Back to Dashboard",
    },
    report: {
      icon: FileText,
      title: "No reports generated yet",
      description: "Generate your first health report to share with your doctor or track your progress over time.",
      actionText: "Generate Report",
    },
  }

  const { icon: Icon, title, description, actionText } = config[type]

  return (
    <View className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <View className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center mb-6 border-2 border-teal-100">
        <Icon className="w-12 h-12 text-teal-600" />
      </View>
      <Text className="text-2xl font-bold text-slate-900 mb-3">{title}</Text>
      <Text className="text-base text-slate-600 max-w-md mb-8 leading-relaxed">{description}</Text>
      {onAction && (
        <TouchableOpacity 
          onPress={onAction} 
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg"
        >
          {actionText}
        </TouchableOpacity>
      )}
    </View>
  )
}
