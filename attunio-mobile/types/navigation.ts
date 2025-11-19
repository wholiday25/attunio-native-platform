/**
 * Navigation Types
 * Define all screen names and their parameters
 */

export type RootStackParamList = {
  // Auth Flow
  Login: undefined;
  SignUp: undefined;
  
  // Onboarding Flow
  Onboarding: undefined;
  
  // Main App
  Dashboard: undefined;
  Library: undefined;
  More: undefined;
  Profile: undefined;
  
  // Health Screens
  ADHDDashboard: undefined;
  BiomarkerDetail: { biomarkerId?: string };
  GlucoseTracking: undefined;
  LabResults: undefined;
  MedicationTracking: undefined;
  MyData: undefined;
  ProgressTracker: undefined;
  TreatmentPlan: undefined;
  
  // Content Screens
  ArticleDetail: { articleId?: string };
  Transparency: undefined;
  
  // Settings Screens
  Checkout: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
