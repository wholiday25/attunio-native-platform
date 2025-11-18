// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
interface BottomNavigationProps {
  activeTab: "home" | "library" | "data" | "more"
  onTabChange: (tab: "home" | "library" | "data" | "more") => void
  onAddClick?: () => void
}

export function BottomNavigation({ activeTab, onTabChange, onAddClick }: BottomNavigationProps) {
  return (
    <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe shadow-lg">
      <View className="container mx-auto px-4 max-w-md">
        <View className="flex items-center justify-between h-20 gap-1">
          {/* Today Tab */}
          <TouchableOpacity
            onPress={() => onTabChange("home")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all duration-200 ${
              activeTab === "home" ? "text-[#f38660]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <Viewne x1="12" y1="1" x2="12" y2="3" />
              <Viewne x1="12" y1="21" x2="12" y2="23" />
              <Viewne x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <Viewne x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <Viewne x1="1" y1="12" x2="3" y2="12" />
              <Viewne x1="21" y1="12" x2="23" y2="12" />
              <Viewne x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <Viewne x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <Text className="text-xs font-medium">Today</Text>
          </TouchableOpacity>

          {/* Library Tab */}
          <TouchableOpacity
            onPress={() => onTabChange("library")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all duration-200 ${
              activeTab === "library" ? "text-[#f38660]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <Textath d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <Textath d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <Text className="text-xs font-medium">Library</Text>
          </TouchableOpacity>

          {/* Center Add Button */}
          <TouchableOpacity
            onPress={onAddClick}
            className="flex items-center justify-center w-14 h-14 -mt-2 rounded-full bg-[#f38660] hover:bg-[#e57550] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <Viewne x1="12" y1="5" x2="12" y2="19" />
              <Viewne x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </TouchableOpacity>

          {/* My Data Tab */}
          <TouchableOpacity
            onPress={() => onTabChange("data")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all duration-200 ${
              activeTab === "data" ? "text-[#f38660]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <Textolyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <Text className="text-xs font-medium">My Data</Text>
          </TouchableOpacity>

          {/* More Tab */}
          <TouchableOpacity
            onPress={() => onTabChange("more")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all duration-200 ${
              activeTab === "more" ? "text-[#f38660]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="19" cy="12" r="1" fill="currentColor" />
              <circle cx="5" cy="12" r="1" fill="currentColor" />
            </svg>
            <Text className="text-xs font-medium">More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
