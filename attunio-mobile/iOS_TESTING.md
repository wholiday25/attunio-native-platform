# iOS Setup & Testing Guide 📱

## ✅ CocoaPods Installed!

CocoaPods version **1.16.2** is now installed via Homebrew.

## 🎯 How to Test on iOS

### Option 1: Physical iPhone/iPad (Recommended - No Xcode Needed)

#### Using Expo Go App (Easiest)
1. **Download Expo Go** from the App Store on your iPhone/iPad
2. **Open the Camera app** on your iPhone
3. **Point at the QR code** shown in your terminal (above)
4. **Tap the notification** that appears
5. App will load in Expo Go!

✅ **This works immediately** - no additional setup needed!

---

### Option 2: iOS Simulator (Requires Full Xcode)

#### Current Status
- ✅ CocoaPods: Installed (1.16.2)
- ✅ Xcode Command Line Tools: Installed
- ❌ **Xcode App: Not detected**

#### To Use iOS Simulator:

1. **Install Xcode** (if not already installed):
   ```bash
   # Download from Mac App Store
   # Or install via Homebrew:
   brew install --cask xcode
   ```

2. **Open Xcode** and accept license:
   ```bash
   sudo xcodebuild -license accept
   ```

3. **Install iOS Simulator**:
   - Open Xcode
   - Go to: Xcode → Settings → Platforms
   - Download iOS 18 Simulator (or latest)

4. **Then run**:
   ```bash
   cd attunio-mobile
   npx expo run:ios
   ```

---

## 🚀 Quick Start (Physical Device)

**Right now, you can test on your iPhone:**

1. Open **App Store**
2. Search for **"Expo Go"**
3. Install the app
4. Open **Camera** app
5. Scan the QR code from your terminal

**The app will load in about 10 seconds!**

---

## 📱 What You Can Test

### Authentication
- ✅ Login with email/password
- ✅ Sign up new users
- ✅ Email confirmation codes
- ✅ Sign out

### Dashboard
- ✅ View key metrics
- ✅ Pull-to-refresh
- ✅ Smooth navigation
- ✅ Native iOS feel

### UI/UX
- ✅ Touch interactions
- ✅ Keyboard handling
- ✅ Scroll performance
- ✅ iOS native components

---

## 🔧 Development Commands

**In the terminal where Expo is running:**
- `i` - Open iOS simulator (requires Xcode)
- `r` - Reload app on device
- `m` - Toggle developer menu
- `j` - Open debugger

---

## 📊 iOS vs Expo Go

### Expo Go (Current Setup)
✅ **Pros:**
- No Xcode required
- Works on any iOS device
- Instant testing
- Easy sharing with team
- Fast refresh

❌ **Cons:**
- Limited native modules
- Can't test push notifications
- No custom native code

### Native iOS Build (Requires Xcode)
✅ **Pros:**
- Full native capabilities
- Custom native modules
- Push notifications
- Production-ready builds

❌ **Cons:**
- Requires Xcode (large download ~15GB)
- Longer build times
- More complex setup

---

## 🎯 Recommendation

**For now:** Use **Expo Go** on your physical iPhone/iPad
- ✅ Instant testing
- ✅ No Xcode needed
- ✅ Works perfectly for development

**Later (before production):** Build native iOS app
- Install full Xcode
- Create production build
- Submit to App Store

---

## 🔗 Current Server Info

**QR Code:** Scan with Camera app on iPhone
**Network URL:** exp://172.20.3.185:8081
**Web URL:** http://localhost:8081

**Status:** ✅ Running and ready!

---

## 📝 Next Steps

1. **Install Expo Go** on your iPhone from App Store
2. **Scan the QR code** in your terminal
3. **Test the app** - login, sign up, dashboard
4. **Report any issues** you find

Once you're happy with Expo Go testing, we can set up the full native iOS build with Xcode.

---

**The app is ready to test on iOS right now!** 🎉

Just download Expo Go and scan the QR code.
