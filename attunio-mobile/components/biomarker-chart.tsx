// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
// Recharts removed - use react-native-chart-kit or victory-native for charts

interface BiomarkerChartProps {
  title: string
  description: string
  data: Array<{ date: string; value: number }>
  unit: string
  color: string
  targetRange?: { min: number; max: number }
}

export function BiomarkerChart({ title, description, data, unit, color, targetRange }: BiomarkerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: title,
              color: `hsl(var(--${color}))`,
            },
          }}
          className="h-[200px]"
        >
          {/* Chart component removed - implement with react-native-chart-kit */}
            {/* Chart component removed - implement with react-native-chart-kit */}
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`hsl(var(--${color}))`} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={`hsl(var(--${color}))`} stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Chart component removed - implement with react-native-chart-kit */}
              {/* Chart component removed - implement with react-native-chart-kit */} `${value}${unit}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <TouchableOpacityrea
                type="monotone"
                dataKey="value"
                stroke={`hsl(var(--${color}))`}
                strokeWidth={2}
                fill={`url(#gradient-${color})`}
              />
            
          
        </ChartContainer>
        {targetRange && (
          <Text className="text-xs text-muted-foreground mt-2">
            Target range: {targetRange.min}-{targetRange.max}
            {unit}
          </Text>
        )}
      </CardContent>
    </Card>
  )
}
