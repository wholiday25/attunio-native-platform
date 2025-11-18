# React Native Mobile App - Quick Start Guide 📱

## 🚀 App is Running!

Your Expo development server is currently running at:
- **Local**: http://localhost:8081
- **Network**: exp://172.20.3.185:8081

## 📱 Test on Your Phone NOW

### iOS (iPhone/iPad)
1. Open **Camera** app
2. Point at the QR code in your terminal
3. Tap the notification that appears
4. App will load in Expo Go

### Android
1. Open **Expo Go** app
2. Tap "Scan QR Code"
3. Point at the QR code in your terminal
4. App will load automatically

### Web Browser
Press `w` in the terminal to open in browser

## 🎯 What You Can Test Right Now

### ✅ Login Flow
- Open app → See Login screen
- Try logging in with your existing credentials
- Form validation works
- Error messages show properly

### ✅ Sign Up Flow
- Tap "Sign Up" on login screen
- Fill in name, email, password
- Submit to create account
- Receive confirmation code via email
- Enter code to activate account

### ✅ Dashboard
- After logging in → Dashboard appears
- See placeholder metrics (Focus, HRV, Sleep, Activity)
- Pull down to refresh
- Tap "Sign Out" to return to login

## 🎨 Current Screens

```
┌─────────────────────────┐
│     LOGIN SCREEN        │
│                         │
│   ┌─────────────────┐   │
│   │     Attunio     │   │
│   │ Your ADHD Health│   │
│   │   Companion     │   │
│   └─────────────────┘   │
│                         │
│   Email                 │
│   [_______________]     │
│                         │
│   Password              │
│   [_______________]     │
│                         │
│   Forgot Password?      │
│                         │
│   [    SIGN IN     ]    │
│                         │
│   Don't have account?   │
│   Sign Up               │
│                         │
└─────────────────────────┘
```

```
┌─────────────────────────┐
│    DASHBOARD SCREEN     │
│                         │
│  Dashboard    [Sign Out]│
│  Welcome back!          │
│                         │
│  ┌──────┐  ┌──────┐    │
│  │Focus │  │ HRV  │    │
│  │  --  │  │  --  │    │
│  └──────┘  └──────┘    │
│  ┌──────┐  ┌──────┐    │
│  │Sleep │  │Active│    │
│  │  --  │  │  --  │    │
│  └──────┘  └──────┘    │
│                         │
│  ┌─────────────────┐    │
│  │ Connect Your    │    │
│  │ Wearable        │    │
│  │                 │    │
│  │ [Get Started]   │    │
│  └─────────────────┘    │
│                         │
└─────────────────────────┘
```

## 🛠️ Development Commands

### In the Terminal (where Expo is running)
- `i` - Open iOS simulator
- `a` - Open Android emulator
- `w` - Open in web browser
- `r` - Reload app
- `j` - Open debugger
- `m` - Toggle developer menu
- `Ctrl+C` - Stop server

## 🔧 Troubleshooting

### "Can't connect to Expo"
- Make sure phone and computer are on **same WiFi**
- Try pressing `r` to reload
- Restart Expo: `Ctrl+C` then `npx expo start`

### "Module not found"
- Clear cache: `npx expo start --clear`
- Reinstall: `rm -rf node_modules && npm install`

### App crashes on startup
- Check terminal for error messages
- Make sure all dependencies installed correctly
- Try restarting the development server

## 📊 Current Features

### ✅ Working Features
- AWS Cognito authentication
- Login with email/password
- Sign up with email confirmation
- Auto-redirect when authenticated
- Sign out functionality
- Pull-to-refresh on dashboard
- Responsive mobile layout
- Tailwind CSS styling

### 🚧 Not Yet Implemented
- Real biomarker data (showing placeholders)
- Terra wearable integration
- Charts and graphs
- AI insights
- Medication tracking
- Push notifications
- Profile settings
- Additional screens

## 🎯 Next Steps

1. **Test the current app** on your device
2. **Verify authentication** works correctly
3. **Check UI/UX** feels good on mobile
4. **Report any issues** you find

Then we can:
- Add real biomarker data fetching
- Integrate Terra for wearables
- Add charts and visualizations
- Build out remaining screens

## 📝 Notes

- **Environment**: Development mode
- **API**: Points to production AWS
- **Data**: Will be real user data when logged in
- **Authentication**: Uses same Cognito as web app
- **Credentials**: Same as web app login

---

**Ready to test!** 🎉

Scan the QR code in your terminal and start exploring the app!
