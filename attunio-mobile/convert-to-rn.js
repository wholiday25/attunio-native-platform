#!/usr/bin/env node

/**
 * Convert Next.js/React Web components to React Native
 * Usage: node convert-to-rn.js <input-file> <output-file>
 */

const fs = require('fs');
const path = require('path');

// HTML to React Native component mappings
const componentMap = {
  'div': 'View',
  'span': 'Text',
  'p': 'Text',
  'h1': 'Text',
  'h2': 'Text',
  'h3': 'Text',
  'h4': 'Text',
  'h5': 'Text',
  'h6': 'Text',
  'button': 'TouchableOpacity',
  'input': 'TextInput',
  'img': 'Image',
  'a': 'TouchableOpacity',
  'section': 'View',
  'article': 'View',
  'header': 'View',
  'footer': 'View',
  'main': 'View',
  'nav': 'View',
  'ul': 'View',
  'ol': 'View',
  'li': 'View',
  'form': 'View',
  'label': 'Text',
  'textarea': 'TextInput',
  'select': 'View',
};

// Next.js specific imports to remove/replace
const nextJsImports = [
  /import\s+.*\s+from\s+['"]next\/.*['"]/g,
  /import\s+.*\s+from\s+['"]@\/.*['"]/g,
];

// Web-specific attributes to remove
const webAttributes = [
  'className',
  'onClick',
  'onChange',
  'onSubmit',
  'htmlFor',
  'href',
  'src',
  'alt',
  'type',
  'placeholder',
  'value',
  'disabled',
  'readOnly',
  'autoFocus',
  'autoComplete',
];

function convertComponent(content) {
  let converted = content;

  // Remove Next.js specific imports
  nextJsImports.forEach(pattern => {
    converted = converted.replace(pattern, '');
  });

  // Add React Native imports if not present
  if (!converted.includes('react-native')) {
    const imports = ['View', 'Text', 'TouchableOpacity', 'TextInput', 'Image', 'ScrollView', 'StyleSheet'];
    const uniqueImports = [...new Set(imports)];
    converted = `import { ${uniqueImports.join(', ')} } from 'react-native';\n${converted}`;
  }

  // Convert HTML elements to React Native components
  Object.entries(componentMap).forEach(([html, rn]) => {
    // Opening tags
    const openRegex = new RegExp(`<${html}([\\s>])`, 'gi');
    converted = converted.replace(openRegex, `<${rn}$1`);
    
    // Closing tags
    const closeRegex = new RegExp(`</${html}>`, 'gi');
    converted = converted.replace(closeRegex, `</${rn}>`);
    
    // Self-closing tags
    const selfCloseRegex = new RegExp(`<${html}([^>]*)/>`, 'gi');
    converted = converted.replace(selfCloseRegex, `<${rn}$1/>`);
  });

  // Convert className to style with NativeWind className
  // Keep className for NativeWind but add comments
  converted = converted.replace(/className=/g, 'className=');

  // Convert onClick to onPress
  converted = converted.replace(/onClick=/g, 'onPress=');

  // Convert onChange to onChangeText for TextInput
  converted = converted.replace(/onChange={(e) => ([^}]+)\(e\.target\.value\)}/g, 'onChangeText={$2}');
  converted = converted.replace(/onChange={([^}]+)}/g, 'onChangeText={$1}');

  // Convert img src to Image source
  converted = converted.replace(/src={([^}]+)}/g, 'source={$1}');
  converted = converted.replace(/src="([^"]+)"/g, 'source={require("$1")}');

  // Remove web-specific props
  converted = converted.replace(/htmlFor=/g, '// htmlFor=');
  converted = converted.replace(/autoComplete=/g, 'autoCompleteType=');

  // Convert style objects (basic conversion)
  converted = converted.replace(/style={{([^}]+)}}/g, (match, styles) => {
    // Basic style conversion - this is simplified
    let rnStyles = styles
      .replace(/backgroundColor/g, 'backgroundColor')
      .replace(/fontSize/g, 'fontSize')
      .replace(/fontWeight/g, 'fontWeight');
    return `style={{${rnStyles}}}`;
  });

  // Add ScrollView wrapper suggestion as comment at top
  const hasScrollView = converted.includes('<ScrollView');
  if (!hasScrollView && converted.includes('export default')) {
    converted = `// Consider wrapping main content in <ScrollView> for scrollable content\n${converted}`;
  }

  return converted;
}

function convertFile(inputPath, outputPath) {
  try {
    // Read input file
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Convert content
    const converted = convertComponent(content);
    
    // Write output file
    fs.writeFileSync(outputPath, converted, 'utf8');
    
    console.log(`✅ Converted: ${inputPath} -> ${outputPath}`);
    console.log('\n⚠️  Manual review needed for:');
    console.log('   - Navigation (replace Next.js router with React Navigation)');
    console.log('   - Images (use require() or remote URLs)');
    console.log('   - Styling (verify NativeWind/Tailwind classes work)');
    console.log('   - Forms (replace HTML forms with React Native inputs)');
    console.log('   - API calls (update paths if needed)');
    console.log('   - Links (replace <a> with navigation or Linking)');
  } catch (error) {
    console.error(`❌ Error converting file: ${error.message}`);
    process.exit(1);
  }
}

function convertDirectory(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);
  
  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    const stat = fs.statSync(inputPath);
    
    if (stat.isDirectory()) {
      convertDirectory(inputPath, outputPath);
    } else if (file.match(/\.(tsx|jsx|ts|js)$/)) {
      convertFile(inputPath, outputPath);
    }
  });
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node convert-to-rn.js <input-path> <output-path>');
  console.log('');
  console.log('Examples:');
  console.log('  node convert-to-rn.js ./components/button.tsx ./mobile-components/button.tsx');
  console.log('  node convert-to-rn.js ./components ./mobile-components');
  process.exit(1);
}

const [inputPath, outputPath] = args;

const stat = fs.statSync(inputPath);

if (stat.isDirectory()) {
  console.log(`Converting directory: ${inputPath} -> ${outputPath}`);
  convertDirectory(inputPath, outputPath);
  console.log('\n✅ Directory conversion complete!');
} else {
  convertFile(inputPath, outputPath);
}

console.log('\n📝 Next steps:');
console.log('   1. Review converted files for accuracy');
console.log('   2. Update imports to use React Native components');
console.log('   3. Replace navigation with React Navigation');
console.log('   4. Test styling with NativeWind');
console.log('   5. Handle platform-specific code with Platform.OS if needed');
