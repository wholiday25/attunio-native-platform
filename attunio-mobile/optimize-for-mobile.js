#!/usr/bin/env node

/**
 * Optimize converted React Native components by removing web dependencies
 * and replacing them with mobile-friendly alternatives
 */

const fs = require('fs');
const path = require('path');

// Web libraries to remove
const webLibraries = [
  'framer-motion',
  'react-confetti',
  'lucide-react',
  'next/link',
  'next/router',
  'next/image',
  'next/navigation',
  '@radix-ui',
  'recharts',
  'react-day-picker',
];

// Replacements for common patterns
const optimizations = [
  // Remove framer-motion
  {
    pattern: /import\s+{\s*motion\s*}\s+from\s+['"]framer-motion['"]/g,
    replacement: '// Motion animations removed - use react-native-reanimated for animations'
  },
  {
    pattern: /<motion\.([\w]+)/g,
    replacement: '<View'
  },
  {
    pattern: /<\/motion\.([\w]+)>/g,
    replacement: '</View>'
  },
  
  // Remove Confetti
  {
    pattern: /import\s+.*Confetti.*from\s+['"]react-confetti['"]/g,
    replacement: '// Confetti removed - use react-native-confetti-cannon if needed'
  },
  {
    pattern: /<Confetti[^>]*>/g,
    replacement: '{/* Confetti removed */}'
  },
  
  // Replace lucide-react icons with @expo/vector-icons
  {
    pattern: /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g,
    replacement: 'import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"'
  },
  
  // Remove recharts
  {
    pattern: /import\s+{[^}]+}\s+from\s+['"]recharts['"]/g,
    replacement: '// Recharts removed - use react-native-chart-kit or victory-native for charts'
  },
  {
    pattern: /<(?:LineChart|BarChart|PieChart|AreaChart|ResponsiveContainer|Line|Bar|XAxis|YAxis|Tooltip|Legend|CartesianGrid)[^>]*>/g,
    replacement: '{/* Chart component removed - implement with react-native-chart-kit */}'
  },
  {
    pattern: /<\/(?:LineChart|BarChart|PieChart|AreaChart|ResponsiveContainer)>/g,
    replacement: ''
  },
  
  // Replace Next.js Link with TouchableOpacity
  {
    pattern: /import\s+Link\s+from\s+['"]next\/link['"]/g,
    replacement: '// Use TouchableOpacity with navigation instead of Link'
  },
  {
    pattern: /<Link\s+href=['"]([^'"]+)['"][^>]*>/g,
    replacement: '<TouchableOpacity onPress={() => navigation.navigate("$1")}>',
  },
  {
    pattern: /<\/Link>/g,
    replacement: '</TouchableOpacity>'
  },
  
  // Replace Next.js router
  {
    pattern: /import\s+{\s*useRouter\s*}\s+from\s+['"]next\/router['"]/g,
    replacement: 'import { useNavigation } from "@react-navigation/native"'
  },
  {
    pattern: /const\s+router\s*=\s*useRouter\(\)/g,
    replacement: 'const navigation = useNavigation()'
  },
  {
    pattern: /router\.push\(/g,
    replacement: 'navigation.navigate('
  },
  {
    pattern: /router\.back\(\)/g,
    replacement: 'navigation.goBack()'
  },
  
  // Replace Next.js Image
  {
    pattern: /import\s+Image\s+from\s+['"]next\/image['"]/g,
    replacement: 'import { Image } from "react-native"'
  },
  
  // Remove Radix UI
  {
    pattern: /import\s+\*\s+as\s+\w+\s+from\s+['"]@radix-ui[^'"]+['"]/g,
    replacement: '// Radix UI removed - use React Native components'
  },
  
  // Remove "use client" directive
  {
    pattern: /["']use client["']\s*/g,
    replacement: ''
  },
  
  // Remove cn() utility if present
  {
    pattern: /import\s+{\s*cn\s*}\s+from\s+['"][^'"]*utils['"]/g,
    replacement: '// cn utility removed - use className directly with NativeWind'
  },
  {
    pattern: /className={cn\((.*?)\)}/g,
    replacement: 'className={$1}'
  },
  
  // Fix common icon replacements
  {
    pattern: /<TrendingUp\s*\/>/g,
    replacement: '<Feather name="trending-up" size={16} />'
  },
  {
    pattern: /<TrendingDown\s*\/>/g,
    replacement: '<Feather name="trending-down" size={16} />'
  },
  {
    pattern: /<Clock\s*\/>/g,
    replacement: '<Feather name="clock" size={16} />'
  },
  {
    pattern: /<RefreshCw\s*\/>/g,
    replacement: '<Feather name="refresh-cw" size={16} />'
  },
  {
    pattern: /<CheckIcon\s*\/>/g,
    replacement: '<Ionicons name="checkmark" size={16} />'
  },
  {
    pattern: /<CopyIcon\s*\/>/g,
    replacement: '<Ionicons name="copy-outline" size={16} />'
  },
  {
    pattern: /<Wifi\s*\/>/g,
    replacement: '<Feather name="wifi" size={16} />'
  },
  {
    pattern: /<WifiOff\s*\/>/g,
    replacement: '<Feather name="wifi-off" size={16} />'
  },
  
  // Add ScrollView import if not present
  {
    pattern: /(import\s+{[^}]+}\s+from\s+['"]react-native['"])/,
    replacement: (match) => {
      if (!match.includes('ScrollView')) {
        return match.replace('}', ', ScrollView }');
      }
      return match;
    }
  },
];

function optimizeComponent(content) {
  let optimized = content;
  
  // Apply all optimizations
  optimizations.forEach(({ pattern, replacement }) => {
    if (typeof replacement === 'function') {
      optimized = optimized.replace(pattern, replacement);
    } else {
      optimized = optimized.replace(pattern, replacement);
    }
  });
  
  // Ensure React Native imports are present
  if (!optimized.includes('from \'react-native\'') && !optimized.includes('from "react-native"')) {
    optimized = `import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';\n${optimized}`;
  }
  
  // Add navigation import if navigation is used
  if (optimized.includes('navigation.') && !optimized.includes('@react-navigation/native')) {
    optimized = `import { useNavigation } from '@react-navigation/native';\n${optimized}`;
  }
  
  // Add icons import if icons are used
  if ((optimized.includes('<Ionicons') || optimized.includes('<Feather') || optimized.includes('<MaterialCommunityIcons')) 
      && !optimized.includes('@expo/vector-icons')) {
    optimized = `import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';\n${optimized}`;
  }
  
  // Remove any remaining web library imports
  webLibraries.forEach(lib => {
    const importRegex = new RegExp(`import\\s+.*from\\s+['"]${lib}[^'"]*['"]\\s*;?`, 'g');
    optimized = optimized.replace(importRegex, `// ${lib} removed - not compatible with React Native`);
  });
  
  // Clean up multiple newlines
  optimized = optimized.replace(/\n{3,}/g, '\n\n');
  
  // Add helpful comment at top
  if (!optimized.includes('// Optimized for React Native')) {
    optimized = `// Optimized for React Native from web component\n// Some features may need manual implementation\n\n${optimized}`;
  }
  
  return optimized;
}

function optimizeFile(inputPath, outputPath) {
  try {
    const content = fs.readFileSync(inputPath, 'utf8');
    const optimized = optimizeComponent(content);
    
    fs.writeFileSync(outputPath, optimized, 'utf8');
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
    
    // Check for remaining issues
    const issues = [];
    if (optimized.includes('framer-motion')) issues.push('framer-motion still present');
    if (optimized.includes('recharts')) issues.push('recharts still present');
    if (optimized.includes('lucide-react')) issues.push('lucide-react still present');
    if (optimized.includes('<motion.')) issues.push('motion components still present');
    
    if (issues.length > 0) {
      console.log(`   ⚠️  Manual review needed: ${issues.join(', ')}`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}: ${error.message}`);
  }
}

function optimizeDirectory(inputDir, outputDir = null) {
  const targetDir = outputDir || inputDir;
  
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Directory not found: ${inputDir}`);
    return;
  }
  
  const files = fs.readdirSync(inputDir);
  let processedCount = 0;
  
  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(targetDir, file);
    
    const stat = fs.statSync(inputPath);
    
    if (stat.isDirectory() && file !== 'ui' && file !== 'node_modules') {
      optimizeDirectory(inputPath, outputPath);
    } else if (file.match(/\.(tsx|jsx)$/) && !file.includes('.backup')) {
      // Create backup
      const backupPath = inputPath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
      }
      
      optimizeFile(inputPath, outputPath);
      processedCount++;
    }
  });
  
  return processedCount;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('🔧 Optimizing all components in ./components directory...\n');
  const count = optimizeDirectory('./components');
  console.log(`\n✅ Optimized ${count} components!`);
  console.log('\n📋 Next steps:');
  console.log('   1. Review optimized components for accuracy');
  console.log('   2. Install required packages:');
  console.log('      npm install @expo/vector-icons react-native-chart-kit');
  console.log('   3. Replace chart components with react-native-chart-kit');
  console.log('   4. Test each component on device');
  console.log('   5. Backups saved as .backup files');
} else if (args[0] === '--help') {
  console.log('Usage: node optimize-for-mobile.js [component-path]');
  console.log('');
  console.log('Examples:');
  console.log('  node optimize-for-mobile.js                              # Optimize all components');
  console.log('  node optimize-for-mobile.js ./components/dashboard.tsx   # Optimize single file');
} else {
  const inputPath = args[0];
  if (fs.statSync(inputPath).isDirectory()) {
    const count = optimizeDirectory(inputPath);
    console.log(`\n✅ Optimized ${count} files`);
  } else {
    optimizeFile(inputPath, inputPath);
  }
}
