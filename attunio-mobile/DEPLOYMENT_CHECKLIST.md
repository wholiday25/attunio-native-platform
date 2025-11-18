# Production Deployment Checklist

## Pre-Release Checklist

### Security
- [ ] All sensitive credentials moved to environment variables
- [ ] `.env` file is in `.gitignore`
- [ ] No API keys or secrets in source code
- [ ] HTTPS endpoints only
- [ ] Authentication properly implemented
- [ ] Input validation on all user inputs
- [ ] Error messages don't expose sensitive information

### Configuration
- [ ] App version number updated in `app.json`
- [ ] Build number incremented
- [ ] Bundle identifier matches your organization
- [ ] App name is production-ready
- [ ] Privacy policy URL added (if applicable)
- [ ] Terms of service URL added (if applicable)
- [ ] App icon and splash screen are final versions

### Code Quality
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] No console.log statements in production code
- [ ] Error boundaries implemented
- [ ] Loading states for all async operations
- [ ] Proper error handling throughout
- [ ] Code is properly documented

### Testing
- [ ] All critical user flows tested
- [ ] Authentication flow works correctly
- [ ] App works on various device sizes
- [ ] App works on iOS (if targeting)
- [ ] App works on Android (if targeting)
- [ ] Offline behavior tested
- [ ] Push notifications work (if implemented)
- [ ] Deep linking works (if implemented)

### Performance
- [ ] App loads in under 3 seconds
- [ ] No memory leaks detected
- [ ] Images optimized
- [ ] Bundle size is reasonable
- [ ] Long lists use FlatList/SectionList
- [ ] No unnecessary re-renders

### App Store Requirements
- [ ] Screenshots prepared (all required sizes)
- [ ] App description written
- [ ] Keywords optimized for SEO
- [ ] Privacy policy published
- [ ] Support URL provided
- [ ] Marketing URL provided (optional)
- [ ] App category selected
- [ ] Age rating determined
- [ ] Pricing configured

### iOS Specific
- [ ] TestFlight beta testing completed
- [ ] App Store Connect metadata complete
- [ ] In-app purchases configured (if applicable)
- [ ] Push notification certificates configured
- [ ] Apple Developer account active
- [ ] Bundle ID registered

### Android Specific
- [ ] Google Play Console setup complete
- [ ] Upload keystore generated and backed up
- [ ] Content rating completed
- [ ] Closed beta testing completed
- [ ] Play Console metadata complete
- [ ] Google Developer account active

### Post-Launch
- [ ] Error tracking configured (Sentry/Bugsnag)
- [ ] Analytics configured
- [ ] Crash reporting tested
- [ ] Update mechanism planned
- [ ] Customer support channel established
- [ ] Marketing materials ready
- [ ] Social media announcements scheduled

### Documentation
- [ ] README.md updated
- [ ] PRODUCTION_GUIDE.md reviewed
- [ ] API documentation current
- [ ] Architecture documented
- [ ] Deployment process documented

## Build Commands

### Development Build
```bash
npm start
```

### iOS Production Build
```bash
eas build --platform ios --profile production
```

### Android Production Build
```bash
eas build --platform android --profile production
```

### Submit to App Store
```bash
eas submit --platform ios
```

### Submit to Play Store
```bash
eas submit --platform android
```

## Emergency Rollback Plan

If issues are discovered post-release:

1. **Immediate**: Release a new version with the fix
2. **iOS**: Request expedited review if critical
3. **Android**: Use staged rollout to limit impact
4. **Communication**: Notify users via in-app message or social media
5. **Monitoring**: Watch error rates and user feedback closely

## Support Contacts

- **Technical Issues**: [Your support email]
- **App Store Issues**: [Your App Store Connect contact]
- **Play Store Issues**: [Your Play Console contact]
- **AWS Issues**: [Your AWS support]

---

**Last Updated**: November 18, 2025
