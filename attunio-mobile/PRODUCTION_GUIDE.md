# Attunio Native Platform - Production Setup Guide

## 🚀 Production-Ready Features

This React Native/Expo application is now configured for production deployment with:

- ✅ **Secure Credential Management**: Environment variables for all sensitive data
- ✅ **Error Boundaries**: Comprehensive error handling and graceful failures
- ✅ **Loading States**: Professional loading indicators throughout the app
- ✅ **Input Validation**: Client-side validation utilities for forms
- ✅ **Production App Configuration**: Proper bundle IDs and metadata
- ✅ **TypeScript**: Full type safety
- ✅ **AWS Amplify Integration**: Authentication with AWS Cognito

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Xcode (for iOS builds)
- Android Studio (for Android builds)

## 🔧 Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure your environment variables in `.env`:**
   ```
   EXPO_PUBLIC_AWS_REGION=us-east-1
   EXPO_PUBLIC_COGNITO_USER_POOL_ID=your_user_pool_id
   EXPO_PUBLIC_COGNITO_CLIENT_ID=your_client_id
   EXPO_PUBLIC_API_URL=https://your-api-url.amazonaws.com/stage
   EXPO_PUBLIC_GENAI_API_URL=https://your-genai-url.amazonaws.com/prod
   EXPO_PUBLIC_GENAI_API_KEY=your_genai_api_key
   EXPO_PUBLIC_TERRA_DEV_ID=your_terra_dev_id
   ```

   **⚠️ IMPORTANT**: Never commit the `.env` file to version control!

## 📦 Installation

```bash
# Install dependencies
npm install

# For iOS (Mac only)
cd ios && pod install && cd ..
```

## 🏃 Development

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## 🏗️ Production Build

### iOS Production Build

1. **Update app.json** with your Apple Developer Team ID:
   ```json
   "ios": {
     "bundleIdentifier": "com.attunio.native",
     "buildNumber": "1.0.0"
   }
   ```

2. **Build for App Store:**
   ```bash
   expo build:ios -t archive
   ```

3. **Or use EAS Build (recommended):**
   ```bash
   npm install -g eas-cli
   eas build --platform ios
   ```

### Android Production Build

1. **Generate upload keystore:**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore attunio-upload-key.keystore -alias attunio-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Build for Play Store:**
   ```bash
   expo build:android -t app-bundle
   ```

3. **Or use EAS Build (recommended):**
   ```bash
   eas build --platform android
   ```

## 🔐 Security Checklist

- [x] Environment variables for all credentials
- [x] `.env` added to `.gitignore`
- [x] Error boundaries implemented
- [x] Input validation on all forms
- [x] HTTPS endpoints only
- [x] No hardcoded secrets in code
- [ ] Enable rate limiting on API
- [ ] Set up error tracking (Sentry/Bugsnag)
- [ ] Configure analytics (optional)
- [ ] Add app security certificates

## 📱 App Store Preparation

### Required Assets

1. **App Icons**: 
   - iOS: 1024x1024px
   - Android: 512x512px

2. **Screenshots**:
   - iPhone: 6.5" and 5.5" displays
   - Android: Various device sizes

3. **Privacy Policy**: Required for App Store/Play Store
4. **Terms of Service**: Recommended

### App Store Connect Setup

1. Create app listing in App Store Connect
2. Configure pricing and availability
3. Add app description and keywords
4. Upload screenshots and preview videos
5. Configure in-app purchases (if applicable)
6. Set up TestFlight for beta testing

### Google Play Console Setup

1. Create app listing in Google Play Console
2. Complete store listing (description, screenshots)
3. Configure content rating
4. Set up pricing and distribution
5. Configure app releases (internal/alpha/beta)

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📊 Performance Optimization

- Use React.memo() for expensive components
- Implement lazy loading for large screens
- Optimize images (compress, use appropriate formats)
- Enable Hermes engine for Android
- Use FlatList for long lists
- Implement code splitting where possible

## 🐛 Error Tracking

To enable production error tracking, integrate a service like:

1. **Sentry**:
   ```bash
   npm install @sentry/react-native
   ```

2. **Bugsnag**:
   ```bash
   npm install @bugsnag/react-native
   ```

## 📈 Analytics

Consider integrating:
- Firebase Analytics
- Amplitude
- Mixpanel

## 🔄 CI/CD

Set up automated builds with:
- GitHub Actions
- Bitrise
- CircleCI
- EAS Build

## 📞 Support

For issues or questions:
- Check documentation: [Expo Docs](https://docs.expo.dev)
- React Native: [React Native Docs](https://reactnative.dev)
- AWS Amplify: [Amplify Docs](https://docs.amplify.aws)

## 📝 License

Private - All rights reserved

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Version**: 1.0.0  
**Last Updated**: November 2025
