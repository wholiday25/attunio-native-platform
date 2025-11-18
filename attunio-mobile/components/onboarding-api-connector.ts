import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
export async function createUserAfterOnboarding(data: {
  userJourney: string;
  membership: string;
  healthProfile: any;
  email?: string;
  name?: string;
}) {
  try {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email || `user-${Date.now()}@attunio.app`,
        name: data.name || 'Attunio User',
        userJourney: data.userJourney,
        membership: data.membership,
        healthProfile: data.healthProfile
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function fetchDashboardData(userId: string) {
  try {
    const [biomarkers, focusScore, medications] = await Promise.all([
      fetch(`/api/biomarkers/latest?days=7`).then(r => r.json()),
      fetch(`/api/focus-score/today`).then(r => r.json()),
      fetch(`/api/medication/history?days=30`).then(r => r.json())
    ]);

    return {
      biomarkers: biomarkers.data || [],
      focusScore: focusScore.data,
      medications: medications.data || []
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      biomarkers: [],
      focusScore: null,
      medications: []
    };
  }
}
