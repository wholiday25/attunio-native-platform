import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import type React from "react"


export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <View className={cn("animate-pulse rounded-md bg-slate-200", className)} {...props} />
}
