# Converting Next.js Components to React Native

## Automatic Conversion Script

Use the `convert-to-rn.js` script to automatically convert web components to React Native.

### Usage

```bash
# Convert a single file
node convert-to-rn.js ../Attunio-Platform/components/adhd-dashboard.tsx ./components/adhd-dashboard.tsx

# Convert entire directory
node convert-to-rn.js ../Attunio-Platform/components ./components
```

## What the Script Does

### ✅ Automatic Conversions

1. **HTML → React Native Components**
   - `<div>` → `<View>`
   - `<span>`, `<p>`, `<h1-h6>` → `<Text>`
   - `<button>` → `<TouchableOpacity>`
   - `<input>` → `<TextInput>`
   - `<img>` → `<Image>`

2. **Props & Events**
   - `className=` → `className=` (kept for NativeWind)
   - `onClick=` → `onPress=`
   - `onChange=` → `onChangeText=`
   - `src=` → `source=`

3. **Imports**
   - Adds React Native imports
   - Removes Next.js specific imports

### ⚠️ Manual Review Needed

After conversion, you MUST manually update:

1. **Navigation**
   ```tsx
   // Before (Next.js)
   import { useRouter } from 'next/router';
   router.push('/dashboard');
   
   // After (React Native)
   import { useNavigation } from '@react-navigation/native';
   navigation.navigate('Dashboard');
   ```

2. **Images**
   ```tsx
   // Before
   <img src="/logo.png" />
   
   // After
   <Image source={require('../assets/logo.png')} />
   // OR for remote images
   <Image source={{ uri: 'https://...' }} />
   ```

3. **Styling**
   - Verify NativeWind classes work
   - Some CSS properties need conversion (e.g., `flex-direction` → `flexDirection`)
   - Use `StyleSheet.create()` for complex styles

4. **Forms**
   ```tsx
   // Before
   <form onSubmit={handleSubmit}>
     <input onChange={e => setValue(e.target.value)} />
   </form>
   
   // After
   <View>
     <TextInput onChangeText={setValue} />
     <TouchableOpacity onPress={handleSubmit}>
       <Text>Submit</Text>
     </TouchableOpacity>
   </View>
   ```

5. **Links**
   ```tsx
   // Before
   <a href="/about">About</a>
   
   // After
   import { Linking } from 'react-native';
   <TouchableOpacity onPress={() => navigation.navigate('About')}>
     <Text>About</Text>
   </TouchableOpacity>
   ```

6. **Scrollable Content**
   ```tsx
   // Wrap in ScrollView
   <ScrollView>
     {/* Your content */}
   </ScrollView>
   ```

## Example Conversion

### Before (Next.js)
```tsx
import { useRouter } from 'next/router';

export default function Button({ label }) {
  const router = useRouter();
  
  return (
    <button 
      className="bg-blue-500 text-white px-4 py-2"
      onClick={() => router.push('/dashboard')}
    >
      {label}
    </button>
  );
}
```

### After (React Native)
```tsx
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Button({ label }) {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      className="bg-blue-500 px-4 py-2"
      onPress={() => navigation.navigate('Dashboard')}
    >
      <Text className="text-white">{label}</Text>
    </TouchableOpacity>
  );
}
```

## Common Patterns

### Data Fetching
```tsx
// Works the same in both!
const [data, setData] = useState(null);

useEffect(() => {
  fetch('https://api.attunio.co/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

### Platform-Specific Code
```tsx
import { Platform } from 'react-native';

const styles = {
  padding: Platform.OS === 'ios' ? 20 : 16,
};
```

### Safe Area
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView className="flex-1">
  {/* Content */}
</SafeAreaView>
```

## Components to Convert First

Priority order:
1. `adhd-dashboard.tsx` - Main dashboard
2. `insights-panel.tsx` - AI insights
3. `biomarker-chart.tsx` - Charts
4. `onboarding-flow.tsx` - Already exists, may need updates
5. `profile-screen.tsx` - User profile

## Testing After Conversion

1. Check imports are correct
2. Verify all images load
3. Test navigation flows
4. Validate form inputs
5. Check styling on both iOS and Android
6. Test scrolling behavior
