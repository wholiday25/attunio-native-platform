// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import * as React from "react"

// Motion animations removed - use react-native-reanimated for animations
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"

interface TopNavbarProps {
  isConnected?: boolean
  userName?: string
  isDemoMode?: boolean
  activeTab?: "home" | "library" | "data" | "more"
  onTabChange?: (tab: "home" | "library" | "data" | "more") => void
  onAddClick?: () => void
}

export function TopNavbar({
  isConnected = false,
  userName = "Alex",
  isDemoMode = true,
  activeTab = "home",
  onTabChange,
  onAddClick,
}: TopNavbarProps) {
  const [syncTimeText, setSyncTimeText] = React.useState("2s ago")

  React.useEffect(() => {
    if (!isConnected) return
    const times = ["2s ago", "5s ago", "8s ago", "3s ago"]
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % times.length
      setSyncTimeText(times[index])
    }, 3000)
    return () => clearInterval(interval)
  }, [isConnected])

  return (
    <View className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <View className="container mx-auto px-6 py-4">
        <View className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <View className="flex items-center gap-8">
            <Image source={require("/attunio-logo.png")} alt="Attunio" width={140} height={40} className="h-9 w-auto" priority />

            {isConnected && onTabChange && (
              <View className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                <TouchableOpacity
                  onPress={() => onTabChange("home")}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "home"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Today
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onTabChange("library")}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "library"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Library
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onTabChange("data")}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "data"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  My Data
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onTabChange("more")}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "more"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  More
                </TouchableOpacity>
              </View>
            )}

            {isConnected && (
              <View
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <View className="relative">
                  <View className="w-2 h-2 rounded-full bg-emerald-500" />
                  <View
                    className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </View>
                <Text className="text-xs font-medium text-emerald-700">Live • {syncTimeText}</Text>
              </View>
            )}
          </View>

          {/* Right Side Actions */}
          {isConnected && (
            <View className="flex items-center gap-4">
              {/* Quick Action Button */}
              {onAddClick && (
                <TouchableOpacity
                  onPress={onAddClick}
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full h-9 w-9 p-0 shadow-md hover:shadow-lg transition-all"
                >
                  <TextlusIcon className="w-5 h-5" />
                </TouchableOpacity>
              )}

              {/* Status Indicators - Desktop */}
              <View className="hidden lg:flex items-center gap-4">
                <TouchableOpacity variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                  <CalendarIcon className="w-4 h-4" />
                  <View className="text-left">
                    <View className="text-xs text-slate-500">Next Consult</View>
                    <View className="text-sm font-semibold">Feb 15</View>
                  </View>
                </TouchableOpacity>

                <View className="w-px h-10 bg-slate-200" />

                <TouchableOpacity variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                  <RefreshCwIcon className="w-4 h-4" />
                  <View className="text-left">
                    <View className="text-xs text-slate-500">Last Sync</View>
                    <View className="text-sm font-semibold">2h ago</View>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-px h-10 bg-slate-200 hidden lg:block" />

              {/* Action Buttons */}
              <TouchableOpacity variant="ghost" size="icon" className="relative">
                <BellIcon className="w-5 h-5 text-slate-600" />
                <Text className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
              </TouchableOpacity>

              {isDemoMode && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200/50 hover:bg-blue-100">
                  <Text className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                  DEMO
                </Badge>
              )}

              {/* User Menu */}
              <View className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <View className="hidden sm:block text-right">
                  <View className="text-sm font-semibold text-slate-900">{userName}</View>
                  <View className="text-xs text-slate-500">Complete Plan</View>
                </View>
                <View className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                  {userName.charAt(0)}
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <View>
        <NavigationMenuLink asChild>
          <TouchableOpacity
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <View className="text-sm font-medium leading-none">{title}</View>
            <Text className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</Text>
          </TouchableOpacity>
        </NavigationMenuLink>
      </View>
    )
  },
)
ListItem.displayName = "ListItem"
