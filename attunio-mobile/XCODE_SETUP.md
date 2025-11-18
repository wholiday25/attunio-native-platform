# iOS Native Build Setup - Post Xcode Installation

## 📥 Xcode Download in Progress...

Once Xcode finishes downloading and installing, follow these steps:

## 🚀 Step-by-Step Setup

### 1. Accept Xcode License
```bash
sudo xcodebuild -license accept
```

### 2. Install Xcode Command Line Tools (Switch to Xcode)
```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### 3. Install iOS Simulator
1. Open Xcode
2. Go to: **Xcode** → **Settings** (or Preferences)
3. Click on **Platforms** tab
4. Download **iOS 18** (or latest available)
   - This adds the iPhone/iPad simulators

### 4. Verify Installation
```bash
# Check Xcode version
xcodebuild -version

# List available simulators
xcrun simctl list devices available
```

### 5. Build the iOS App
```bash
cd /Users/wholid861/Attunio-Platform/Attunio-Platform/attunio-mobile

# Build and run on iOS simulator
npx expo run:ios
```

This will:
- Create the native iOS project in `/ios` folder
- Install CocoaPods dependencies (already have v1.16.2)
- Build the Xcode project
- Launch the iOS simulator
- Install and run the app

---

## ⏱️ Build Time Expectations

**First Build:**
- CocoaPods install: ~2-5 minutes
- Xcode build: ~3-7 minutes
- **Total: ~5-12 minutes**

**Subsequent Builds:**
- ~30 seconds - 2 minutes (incremental)

---

## 🎯 What Happens During Build

```
npx expo run:ios
    ↓
Generate iOS project (prebuild)
    ↓
Install CocoaPods (pod install)
    ↓
Open Xcode project
    ↓
Build with xcodebuild
    ↓
Launch iOS Simulator
    ↓
Install & Run App
    ↓
✅ App Running!
```

---

## 📱 Simulator Options

After installation, you can choose which device to simulate:

```bash
# iPhone 16 Pro
npx expo run:ios --device "iPhone 16 Pro"

# iPhone SE (smaller screen)
npx expo run:ios --device "iPhone SE"

# iPad
npx expo run:ios --device "iPad Pro (12.9-inch)"

# List all available devices
xcrun simctl list devices available
```

---

## 🔧 Troubleshooting

### If build fails with "Unable to boot simulator"
```bash
# Kill all simulators
killall Simulator

# Restart build
npx expo run:ios
```

### If CocoaPods fails
```bash
cd ios
pod deintegrate
pod install
cd ..
npx expo run:ios
```

### Clear build cache
```bash
cd attunio-mobile
rm -rf ios/build
npx expo run:ios --clean
```

---

## 🎨 Development Workflow

Once the simulator is running:

1. **Make code changes** in your editor
2. **Fast Refresh** automatically updates the app
3. **Reload**: Shake simulator (Cmd+Ctrl+Z) → Reload
4. **Debug**: Shake → Debug Remote JS
5. **Stop**: Close simulator or Ctrl+C in terminal

---

## 🚀 Quick Commands Reference

```bash
# Start Expo (for Expo Go testing)
npx expo start

# Build & run iOS simulator
npx expo run:ios

# Build for specific device
npx expo run:ios --device "iPhone 16 Pro"

# Build with clean cache
npx expo run:ios --clean

# Build without launching
npx expo run:ios --no-install --no-bundler
```

---

## ✅ What to Run After Xcode Installs

**Copy and paste these commands:**

```bash
# 1. Accept license
sudo xcodebuild -license accept

# 2. Switch to Xcode
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

# 3. Navigate to project
cd /Users/wholid861/Attunio-Platform/Attunio-Platform/attunio-mobile

# 4. Build iOS app
npx expo run:ios
```

That's it! The app will build and launch in the simulator.

---

## 📊 Expected Terminal Output

```
› Building iOS app...
› Bundling JavaScript...
› Installing CocoaPods...
› Building with xcodebuild...
› Launching simulator...
› Installing app...
✅ Successfully installed app on iPhone 16 Pro
```

---

## 🎯 Next Steps After First Build

1. **Test the app** in simulator
2. **Make changes** - see fast refresh in action
3. **Debug** using React DevTools
4. **Test iOS-specific features**:
   - Touch gestures
   - Keyboard handling
   - Native animations
   - iOS design patterns

---

**Let me know when Xcode finishes installing and I'll help you build the iOS app!** 🚀
