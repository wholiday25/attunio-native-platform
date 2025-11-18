import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
"use client"

import * as React from "react"




import { motion } from "framer-motion"
import {
  BellIcon,
  ActivityIcon,
  BookOpenIcon,
  HeartPulseIcon,
  MenuIcon,
  XIcon,
  PillIcon,
  FlaskConicalIcon,
  UserIcon,
} from "lucide-react"

interface Navbar05Props {
  activeTab?: "home" | "library" | "data" | "medications" | "labs" | "profile"
  onTabChange?: (tab: "home" | "library" | "data" | "medications" | "labs" | "profile") => void
  userName?: string
  isDemoMode?: boolean
}

export function Navbar05({ activeTab = "home", onTabChange, userName = "Alex", isDemoMode = true }: Navbar05Props) {
  const [syncTimeText, setSyncTimeText] = React.useState("2s ago")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const times = ["2s ago", "5s ago", "8s ago", "3s ago"]
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % times.length
      setSyncTimeText(times[index])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { id: "home" as const, label: "Today", icon: ActivityIcon },
    { id: "library" as const, label: "Library", icon: BookOpenIcon },
    { id: "data" as const, label: "My Data", icon: HeartPulseIcon },
    { id: "medications" as const, label: "Medications", icon: PillIcon },
    { id: "labs" as const, label: "Labs", icon: FlaskConicalIcon },
    { id: "profile" as const, label: "Profile", icon: UserIcon },
  ]

  return (
    <View className="bg-white border-b border-border sticky top-0 z-50">
      <View className="container mx-auto px-4 sm:px-6">
        <View className="flex items-center justify-between h-16">
          {/* Logo */}
          <View className="flex items-center">
            <Image source={require("/attunio-logo.png")} alt="Attunio" width={120} height={32} className="h-8 w-auto" priority />
          </View>

          {/* Navigation Tabs - Desktop Center */}
          <View className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onTabChange?.(item.id)}
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    activeTab === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Right Side Actions */}
          <View className="flex items-center gap-2 sm:gap-4">
            {/* Live Sync Indicator - Hidden on small screens */}
            <motion.div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <View className="relative">
                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                <motion.div
                  className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </View>
              <Text className="text-xs font-medium text-emerald-700">Live • {syncTimeText}</Text>
            </motion.div>

            {/* Notifications */}
            <TouchableOpacity variant="ghost" size="icon" className="relative hidden sm:flex">
              <BellIcon className="w-5 h-5" />
              <Text className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </TouchableOpacity>

            {/* Demo Badge - Hidden on mobile */}
            {isDemoMode && (
              <Badge variant="secondary" className="hidden sm:flex gap-1.5">
                <Text className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                DEMO
              </Badge>
            )}

            {/* User Profile - Desktop */}
            <View className="hidden lg:flex items-center gap-3 pl-3 border-l border-border">
              <View className="text-right">
                <View className="text-sm font-semibold">{userName}</View>
                <View className="text-xs text-muted-foreground">Complete Plan</View>
              </View>
              <View className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold cursor-pointer">
                {userName.charAt(0)}
              </View>
            </View>

            {/* Mobile Menu Button */}
            <TouchableOpacity
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden border-t border-border py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <View className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      onTabChange?.(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </TouchableOpacity>
                )
              })}
            </View>

            {/* Mobile User Profile */}
            <View className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-border">
              <View className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                {userName.charAt(0)}
              </View>
              <View>
                <View className="text-sm font-semibold">{userName}</View>
                <View className="text-xs text-muted-foreground">Complete Plan</View>
              </View>
            </View>
          </motion.div>
        )}
      </View>
    </View>
  )
}
