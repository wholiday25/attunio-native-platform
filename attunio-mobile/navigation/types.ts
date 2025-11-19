/**
 * Screen Navigation Configuration
 * Maps all available screens for navigation
 */

export type RootStackParamList = {
  // Auth Flow
  Login: undefined;
  SignUp: undefined;
  
  // Onboarding Flow
  Onboarding: undefined;
  Welcome: undefined;
  
  // Main App
  Dashboard: undefined;
  Library: undefined;
  More: undefined;
  Profile: undefined;
  
  // Health Screens
  ADHDDashboard: undefined;
  BiomarkerDetail: { biomarkerId: string };
  GlucoseTracking: undefined;
  LabResults: undefined;
  MedicationTracking: undefined;
  MyData: undefined;
  ProgressTracker: undefined;
  TreatmentPlan: undefined;
  
  // Content Screens
  ArticleDetail: { articleId: string };
  Transparency: undefined;
  
  // Settings
  Checkout: undefined;
};

export const ScreenRoutes = {
  // Auth
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
  
  // Onboarding
  ONBOARDING: 'Onboarding',
  WELCOME: 'Welcome',
  
  // Main
  DASHBOARD: 'Dashboard',
  LIBRARY: 'Library',
  MORE: 'More',
  PROFILE: 'Profile',
  
  // Health
  ADHD_DASHBOARD: 'ADHDDashboard',
  BIOMARKER_DETAIL: 'BiomarkerDetail',
  GLUCOSE_TRACKING: 'GlucoseTracking',
  LAB_RESULTS: 'LabResults',
  MEDICATION_TRACKING: 'MedicationTracking',
  MY_DATA: 'MyData',
  PROGRESS_TRACKER: 'ProgressTracker',
  TREATMENT_PLAN: 'TreatmentPlan',
  
  // Content
  ARTICLE_DETAIL: 'ArticleDetail',
  TRANSPARENCY: 'Transparency',
  
  // Settings
  CHECKOUT: 'Checkout',
} as const;
