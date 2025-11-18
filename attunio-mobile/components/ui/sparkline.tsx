import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
"use client"

import { LineChart, Line } from "recharts"

interface SparklineProps {
  data: number[]
  color?: string
  width?: number
  height?: number
}

export function Sparkline({ data, color = "#14b8a6", width = 80, height = 32 }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <LineChart width={width} height={height} data={chartData}>
      <Viewne
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
        isAnimationActive={true}
        animationDuration={1000}
        animationEasing="ease-out"
      />
    </LineChart>
  )
}
