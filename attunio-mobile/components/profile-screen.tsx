// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item"

import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"

import { useState } from "react"

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { signOut: authSignOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      setIsSigningOut(true)
      try {
        // Clear all localStorage data
        localStorage.removeItem("attunio_user_id")
        localStorage.removeItem("attunio_onboarded")
        localStorage.removeItem("attunio_seen_landing")
        localStorage.removeItem("attunio_checkout_data")
        localStorage.removeItem("attunio_onboarding_progress")
        localStorage.removeItem("terra_connected")
        localStorage.removeItem("terra_reference_id")
        localStorage.removeItem("terra_user_id")
        localStorage.removeItem("attunio_temp_user_id")
        localStorage.removeItem("attunio_selected_device")
        
        // Sign out with new auth system
        await authSignOut()
        
        // Redirect to signin
        window.location.href = '/auth/signin'
      } catch (error) {
        console.error("Error signing out:", error)
        setIsSigningOut(false)
      }
    }
  }

  const handleResetOnboarding = () => {
    if (confirm("Are you sure you want to reset onboarding? This will clear all your data and log you out.")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <View className="pb-24 max-w-3xl mx-auto px-4">
      <View className="bg-gradient-to-br from-primary/5 via-background to-background rounded-2xl p-6 mb-6 border border-border">
        <View className="flex items-center gap-4">
          <Avatar className="w-16 h-16 ring-2 ring-primary/20">
            <TouchableOpacityvatarImage source={require("/placeholder.svg?height=64&width=64")} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-xl font-semibold">
              AL
            </AvatarFallback>
          </Avatar>
          <View className="flex-1 min-w-0">
            <Text className="text-xl font-semibold text-foreground mb-0.5">Alex</Text>
            <Text className="text-sm text-muted-foreground truncate">demo@attunio.app</Text>
          </View>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 hover:bg-primary/20">
            Complete Plan
          </Badge>
        </View>
      </View>

      <View className="mb-6">
        <View className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-6 text-white shadow-lg">
          <View className="flex items-start justify-between mb-3">
            <View className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </View>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">Current Plan</Badge>
          </View>

          <Text className="text-xl font-bold mb-1">Complete Plan</Text>
          <Text className="text-white/90 text-sm mb-3 leading-relaxed">
            CGM monitoring, quarterly labs, weekly consultations
          </Text>

          <View className="flex items-baseline gap-1.5 mb-4">
            <Text className="text-3xl font-bold">$199</Text>
            <Text className="text-white/80 text-sm">/month</Text>
          </View>

          <TouchableOpacity variant="secondary" className="w-full rounded-full h-10 font-medium">
            Manage Plan
          </TouchableOpacity>
        </View>
      </View>

      <View className="space-y-6">
        <View>
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Account</Text>
          <ItemGroup className="bg-card rounded-xl border border-border overflow-hidden">
            <Item variant="default" asChild>
              <TouchableOpacity className="w-full">
                <ItemMedia variant="icon">
                  <User className="w-4 h-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Account Settings</ItemTitle>
                  <ItemDescription>Manage your profile and preferences</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </ItemActions>
              </TouchableOpacity>
            </Item>

            <ItemSeparator />

            <Item variant="default" asChild>
              <TouchableOpacity className="w-full">
                <ItemMedia variant="icon">
                  <Viewnk2 className="w-4 h-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Connected Devices</ItemTitle>
                  <ItemDescription>Fitbit, Oura, Garmin, CGM</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </ItemActions>
              </TouchableOpacity>
            </Item>

            <ItemSeparator />

            <Item variant="default" asChild>
              <TouchableOpacity className="w-full">
                <ItemMedia variant="icon">
                  <Shield className="w-4 h-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Data & Privacy</ItemTitle>
                  <ItemDescription>Control your health data</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </ItemActions>
              </TouchableOpacity>
            </Item>
          </ItemGroup>
        </View>

        <View>
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Information
          </Text>
          <ItemGroup className="bg-card rounded-xl border border-border overflow-hidden">
            <Item variant="default" asChild>
              <TouchableOpacity className="w-full" onPress={() => onNavigate?.("transparency")}>
                <ItemMedia variant="icon">
                  <Info className="w-4 h-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>How Attunio Works</ItemTitle>
                  <ItemDescription>Methodology & limitations</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </ItemActions>
              </TouchableOpacity>
            </Item>

            <ItemSeparator />

            <Item variant="default" asChild>
              <TouchableOpacity className="w-full">
                <ItemMedia variant="icon">
                  <MessageCircle className="w-4 h-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Support & Feedback</ItemTitle>
                  <ItemDescription>Get help or share feedback</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </ItemActions>
              </TouchableOpacity>
            </Item>

            <ItemSeparator />

            <Item variant="default" asChild>
              <TouchableOpacity className="w-full">
                <ItemMedia variant="icon">
                  <BookOpen className="w-4 h-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>About Attunio</ItemTitle>
                  <ItemDescription>Learn about our mission</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </ItemActions>
              </TouchableOpacity>
            </Item>
          </ItemGroup>
        </View>

        <View className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/20">
          <View className="flex items-start gap-3 mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5 text-primary" />
            </View>
            <View className="flex-1 min-w-0">
              <Text className="text-base font-semibold text-foreground mb-1">Invite Friends</Text>
              <Text className="text-sm text-muted-foreground">Share Attunio with friends managing ADHD</Text>
            </View>
          </View>
          <TouchableOpacity className="w-full rounded-full h-10 bg-primary text-white hover:bg-primary/90">
            Share Invite Link
          </TouchableOpacity>
        </View>

        <Separator className="my-2" />

        <View className="flex justify-center">
          <TouchableOpacity 
            variant="ghost" 
            className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
            onPress={handleSignOut}
            disabled={isSigningOut}
          >
            <LogOut className="w-4 h-4" />
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </TouchableOpacity>
        </View>

        <View className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
          <View className="flex items-start gap-3 mb-3">
            <View className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </View>
            <View>
              <Text className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">Developer Tools</Text>
              <Text className="text-xs text-amber-700 dark:text-amber-400 mb-3">
                Reset onboarding to test the new flow. This will clear all data.
              </Text>
              <TouchableOpacity
                onPress={handleResetOnboarding}
                variant="outline"
                size="sm"
                className="rounded-full border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 h-9 bg-transparent"
              >
                Reset Onboarding
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="text-center text-xs text-muted-foreground pt-2 space-y-1">
          <Text>Version 1.0.0</Text>
          <Text>© 2025 Attunio. All rights reserved.</Text>
        </View>
      </View>
    </View>
  )
}
