# Screen Structure Documentation

## Overview
All screens have been organized into a logical folder structure for better maintainability.

## Directory Structure

```
screens/
├── index.ts                      # Centralized exports
├── SplashScreen.tsx              # Initial app splash
├── LibraryScreen.tsx             # Content library
├── MoreScreen.tsx                # Additional options
├── ProfileScreen.tsx             # User profile
│
├── auth/                         # Authentication screens
│   ├── LoginScreen.tsx
│   └── SignUpScreen.tsx
│
├── dashboard/                    # Main dashboard
│   └── DashboardScreen.tsx
│
├── onboarding/                   # User onboarding
│   ├── OnboardingFlow.tsx
│   └── WelcomeScreen.tsx
│
├── health/                       # Health & biomarker screens
│   ├── ADHDDashboardScreen.tsx   # ADHD-specific dashboard
│   ├── BiomarkerDetailScreen.tsx # Detailed biomarker view
│   ├── GlucoseTrackingScreen.tsx # Glucose monitoring
│   ├── LabResultsScreen.tsx      # Lab results display
│   ├── MedicationTrackingScreen.tsx # Medication logging
│   ├── MyDataScreen.tsx          # Personal data overview
│   ├── ProgressTrackerScreen.tsx # Progress visualization
│   └── TreatmentPlanScreen.tsx   # Treatment plan details
│
├── content/                      # Content & information screens
│   ├── ArticleDetailScreen.tsx   # Article reader
│   └── TransparencyScreen.tsx    # App transparency info
│
└── settings/                     # Settings & configuration
    └── CheckoutScreen.tsx        # Subscription checkout
```

## Usage

### Import Single Screen
```typescript
import LoginScreen from './screens/auth/LoginScreen';
```

### Import Multiple Screens
```typescript
import {
  LoginScreen,
  SignUpScreen,
  DashboardScreen,
  GlucoseTrackingScreen
} from './screens';
```

### Navigation Types
```typescript
import { RootStackParamList, ScreenRoutes } from './navigation/types';

// Use with React Navigation
const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigate to screens
navigation.navigate(ScreenRoutes.GLUCOSE_TRACKING);
```

## Screen Categories

### 🔐 Authentication (2 screens)
- **LoginScreen**: User authentication
- **SignUpScreen**: New user registration

### 🎯 Onboarding (2 screens)
- **OnboardingFlow**: Multi-step onboarding
- **WelcomeScreen**: Initial welcome

### 📊 Dashboard (1 screen)
- **DashboardScreen**: Main app dashboard

### 🏥 Health Tracking (8 screens)
- **ADHDDashboardScreen**: ADHD-specific biomarkers
- **BiomarkerDetailScreen**: Detailed biomarker analysis
- **GlucoseTrackingScreen**: Glucose level monitoring
- **LabResultsScreen**: Laboratory test results
- **MedicationTrackingScreen**: Medication logging and history
- **MyDataScreen**: Personal health data overview
- **ProgressTrackerScreen**: Progress visualization
- **TreatmentPlanScreen**: Treatment plan management

### 📚 Content (2 screens)
- **ArticleDetailScreen**: Educational content
- **TransparencyScreen**: App transparency information

### ⚙️ Settings (1 screen)
- **CheckoutScreen**: Subscription and billing

### 📱 Main Navigation (4 screens)
- **LibraryScreen**: Content library
- **MoreScreen**: Additional options
- **ProfileScreen**: User profile
- **SplashScreen**: App initialization

## Navigation Flow

```
App Launch
    ↓
SplashScreen → Check Auth Status
    ↓
    ├─→ Not Authenticated → LoginScreen / SignUpScreen
    │                           ↓
    │                      OnboardingFlow
    │                           ↓
    └─→ Authenticated → DashboardScreen
                            ↓
                    Bottom Navigation:
                    - Dashboard
                    - Library
                    - Profile
                    - More
                            ↓
                    Health Screens (accessible from Dashboard)
                    - ADHD Dashboard
                    - Glucose Tracking
                    - Medication Tracking
                    - Lab Results
                    - etc.
```

## Best Practices

### 1. **Screen Naming Convention**
- Use PascalCase
- Suffix with "Screen"
- Be descriptive: `GlucoseTrackingScreen` not `Glucose`

### 2. **File Organization**
- Group related screens in folders
- Keep screen logic in the screen file
- Extract reusable components to `/components`

### 3. **Navigation**
- Use TypeScript types for type-safe navigation
- Define all screen params in `RootStackParamList`
- Use `ScreenRoutes` constants for navigation

### 4. **Screen Props**
```typescript
type GlucoseTrackingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GlucoseTracking'
>;

export default function GlucoseTrackingScreen({ 
  navigation, 
  route 
}: GlucoseTrackingScreenProps) {
  // Screen implementation
}
```

## Adding New Screens

1. **Create the screen file** in the appropriate folder:
   ```
   screens/health/NewHealthScreen.tsx
   ```

2. **Add to `screens/index.ts`**:
   ```typescript
   export { default as NewHealthScreen } from './health/NewHealthScreen';
   ```

3. **Update `navigation/types.ts`**:
   ```typescript
   export type RootStackParamList = {
     // ... existing screens
     NewHealth: { param?: string };
   };
   
   export const ScreenRoutes = {
     // ... existing routes
     NEW_HEALTH: 'NewHealth',
   };
   ```

4. **Add to navigation stack** in `App.tsx`:
   ```typescript
   <Stack.Screen name="NewHealth" component={NewHealthScreen} />
   ```

## Next Steps

- [ ] Update App.tsx to use new screen structure
- [ ] Implement bottom tab navigation
- [ ] Add screen transition animations
- [ ] Implement deep linking for screens
- [ ] Add analytics tracking per screen
- [ ] Create screen-specific error boundaries

---

**Created**: November 18, 2025  
**Screens**: 18 total  
**Categories**: 6 (Auth, Onboarding, Dashboard, Health, Content, Settings)
