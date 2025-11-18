import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
"use client"






interface MoreScreenProps {
  onNavigate?: (screen: string) => void
  userData?: {
    firstName?: string
    email?: string
    userJourney?: string
    membership?: string
  } | null
}

export function MoreScreen({ onNavigate, userData }: MoreScreenProps) {
  const { signOut: authSignOut } = useAuth()
  
  const menuItems = [
    {
      icon: "/images/icon-10.svg",
      title: "Medications & Treatments",
      description: "Track your ADHD medications",
      screen: "medications",
    },
    {
      icon: "/images/icon-17.svg",
      title: "Glucose & Focus",
      description: "Blood sugar impact on ADHD",
      screen: "glucose",
      badge: "New",
    },
    { icon: "/images/icon-10.svg", title: "Lab Results", description: "Blood tests & clinical biomarkers", screen: "labs" },
    { icon: "/images/icon-43.svg", title: "Account Settings", description: "Manage your profile and preferences" },
    { icon: "/images/icon-52.svg", title: "Connected Devices", description: "Fitbit, Oura, Garmin, CGM" },
    { icon: "/images/dashboard-01.svg", title: "Data & Privacy", description: "Control your health data" },
    { icon: "/images/icon-43.svg", title: "How Attunio Works", description: "Methodology & limitations", screen: "transparency" },
    { icon: "/images/icon-02.svg", title: "Support & Feedback", description: "Get help or share feedback" },
    { icon: "/images/icon-43.svg", title: "About Attunio", description: "Learn about our mission" },
  ]

  const handleResetOnboarding = () => {
    if (confirm("Are you sure you want to reset onboarding? This will clear all your data and log you out.")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      // Clear local storage
      localStorage.removeItem("attunio_user_id");
      localStorage.removeItem("attunio_onboarded");
      
      // Sign out from auth system
      await authSignOut();
      
      // Redirect to home
      window.location.href = "/";
    }
  }

  return (
    <View className="pb-24">
      <View className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 mb-6">
        <View className="flex items-center gap-4 mb-4">
          <View className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">👤</View>
          <View>
            <Text className="text-xl font-bold text-foreground">
              {userData?.firstName || "User"}
            </Text>
            <Text className="text-sm text-muted-foreground">{userData?.email || "user@attunio.app"}</Text>
          </View>
        </View>
        <Badge className="bg-primary/10 text-primary border-0">
          <View className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
          {userData?.membership 
            ? `${userData.membership.charAt(0).toUpperCase() + userData.membership.slice(1)} Plan`
            : "Essential Plan"
          }
        </Badge>
      </View>

      <View className="px-4 mb-6">
        <View className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl">
          <View className="flex items-start justify-between mb-4">
            <View className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </View>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">Limited Time</Badge>
          </View>

          <Text className="text-2xl font-bold mb-2">Upgrade to Complete</Text>
          <Text className="text-teal-50 text-sm mb-4 leading-relaxed">
            Get 2x lab panels, continuous glucose monitoring, and dedicated ADHD coaching
          </Text>

          <View className="flex items-baseline gap-2 mb-4">
            <Text className="text-4xl font-bold">$99</Text>
            <Text className="text-teal-100">/month</Text>
          </View>

          <TouchableOpacity
            onPress={() => onNavigate?.("membership")}
            className="w-full rounded-full bg-white text-teal-600 hover:bg-teal-50 h-12 font-semibold"
          >
            View Plans
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4 space-y-6">
        <View>
          <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Health Tracking
          </Text>
          <View className="space-y-2">
            {menuItems.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => item.screen && onNavigate?.(item.screen)}
                className="w-full bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow text-left"
              >
                <View className="flex items-center justify-between">
                  <View className="flex items-center gap-4">
                    <View className="w-10 h-10 relative flex-shrink-0">
                      <Image source={item.icon} alt="" width={40} height={40} className="object-contain" />
                    </View>
                    <View>
                      <View className="flex items-center gap-2">
                        <Text className="font-semibold text-foreground">{item.title}</Text>
                        {item.badge && (
                          <Badge className="bg-orange-500/10 text-orange-600 border-0 text-xs">{item.badge}</Badge>
                        )}
                      </View>
                      <Text className="text-sm text-muted-foreground">{item.description}</Text>
                    </View>
                  </View>
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Settings</Text>
          <View className="space-y-2">
            {menuItems.slice(3).map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => item.screen && onNavigate?.(item.screen)}
                className="w-full bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow text-left"
              >
                <View className="flex items-center justify-between">
                  <View className="flex items-center gap-4">
                    <View className="w-10 h-10 relative flex-shrink-0">
                      <Image source={item.icon} alt="" width={40} height={40} className="object-contain" />
                    </View>
                    <View>
                      <Text className="font-semibold text-foreground">{item.title}</Text>
                      <Text className="text-sm text-muted-foreground">{item.description}</Text>
                    </View>
                  </View>
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <Text className="text-lg font-bold text-foreground mb-2">Invite Friends</Text>
          <Text className="text-sm text-muted-foreground mb-4">Share Attunio with friends managing ADHD</Text>
          <TouchableOpacity className="rounded-full bg-primary text-white">Share Invite Link</TouchableOpacity>
        </View>

        <View className="text-center pt-4">
          <TouchableOpacity 
            onPress={handleSignOut}
            variant="ghost" 
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Sign Out
          </TouchableOpacity>
        </View>

        <View className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <Text className="text-lg font-bold text-amber-900 mb-2">⚠️ Developer Tools</Text>
          <Text className="text-sm text-amber-700 mb-4">
            Reset onboarding to test the new flow. This will clear all data.
          </Text>
          <TouchableOpacity
            onPress={handleResetOnboarding}
            variant="outline"
            className="rounded-full border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
          >
            Reset Onboarding
          </TouchableOpacity>
        </View>

        <View className="text-center text-xs text-muted-foreground pt-2">
          <Text>Version 1.0.0</Text>
          <Text className="mt-1">© 2025 Attunio. All rights reserved.</Text>
        </View>
      </View>
    </View>
  )
}
