# Attunio Mobile - React Native App

React Native mobile app for Attunio ADHD health tracking platform.

## 📱 Features

- **Authentication**: AWS Cognito integration
- **Dashboard**: Real-time biomarker tracking
- **Wearable Integration**: Connect Fitbit, Oura, Garmin, Apple Health, etc.
- **AI Insights**: Personalized ADHD insights powered by AWS Bedrock
- **Cross-platform**: iOS & Android support

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- Watchman (installed ✅)
- For iOS: Xcode, CocoaPods
- For Android: Android Studio, JDK 17

### Installation

```bash
# Navigate to project
cd attunio-mobile

# Install dependencies
npm install

# Start development server
npx expo start
```

### Run on Device

```bash
# iOS Simulator
npx expo run:ios

# Android Emulator  
npx expo run:android

# Expo Go app (scan QR code)
npx expo start
```

## 📂 Project Structure

```
attunio-mobile/
├── app/                 # Expo Router screens
├── components/          # Reusable UI components
├── lib/                 # Business logic & utilities
│   ├── aws/            # AWS Cognito & API
│   ├── terra/          # Terra wearable integration
│   └── utils/          # Helper functions
├── types/              # TypeScript types
└── assets/             # Images & fonts
```

## 🔐 Environment Variables

Create `.env.local`:

```env
EXPO_PUBLIC_AWS_REGION=us-east-1
EXPO_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_W9XnR7pSv
EXPO_PUBLIC_COGNITO_CLIENT_ID=4b8b3aa6aht0mpedsogng48ac
EXPO_PUBLIC_API_URL=https://np6sumrzmj.execute-api.us-east-1.amazonaws.com/dev
EXPO_PUBLIC_GENAI_API_URL=https://wsjjcq40q7.execute-api.us-east-1.amazonaws.com/prod
EXPO_PUBLIC_GENAI_API_KEY=your_key_here
```

## 🔄 Code Sharing with Web App

Shared code between web and mobile is located in:
- `/shared/types` - TypeScript interfaces
- `/shared/utils` - Helper functions
- `/shared/api` - API client functions

## 📚 Documentation

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AWS Amplify React Native](https://docs.amplify.aws/react-native/)
- [Full Setup Guide](../REACT_NATIVE_SETUP.md)

## 🐛 Troubleshooting

### Clear cache
```bash
npx expo start --clear
```

### iOS build issues
```bash
cd ios && pod install && cd ..
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
```

## 📝 Next Steps

1. ✅ Project created
2. ✅ AWS Amplify configured
3. ⏳ Build authentication screens
4. ⏳ Create dashboard UI
5. ⏳ Integrate Terra SDK
6. ⏳ Add native health data integration

---

Built with ❤️ using Expo & React Native
