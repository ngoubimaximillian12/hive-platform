# 📱 HIVE MOBILE APP - React Native

## Quick Start

### Prerequisites
```bash
# Install Node.js (if not installed)
# Install Expo CLI
npm install -g expo-cli

# For iOS (Mac only)
# Install Xcode from App Store

# For Android
# Install Android Studio
```

### Create New React Native App
```bash
cd ~/Desktop/hive-platform
npx create-expo-app hive-mobile --template blank-typescript

cd hive-mobile
```

### Install Dependencies
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install axios
npm install @react-native-async-storage/async-storage
npm install react-native-gesture-handler react-native-reanimated
```

### App Structure
```
hive-mobile/
├── App.tsx
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SkillsScreen.tsx
│   │   ├── DealsScreen.tsx
│   │   ├── EventsScreen.tsx
│   │   ├── MessagesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/
│   │   ├── SkillCard.tsx
│   │   ├── DealCard.tsx
│   │   └── EventCard.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── services/
│   │   └── api.ts
│   └── utils/
│       └── storage.ts
```

### Example App.tsx
```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SkillsScreen from './src/screens/SkillsScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### API Service (src/services/api.ts)
```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:4001/api'; // Change for production

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
  getProfile: () => 
    api.get('/auth/me'),
};

export const skillsAPI = {
  getAll: () => api.get('/skills'),
  create: (data: any) => api.post('/skills', data),
  getMySkills: () => api.get('/skills/my-skills'),
};

export const messagesAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (userId: number) => api.get(`/messages/with/${userId}`),
  send: (data: any) => api.post('/messages/send', data),
};

export default api;
```

### Run the App
```bash
# Start development server
npx expo start

# Run on iOS simulator (Mac only)
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on physical device
# Scan QR code with Expo Go app
```

## Features to Implement

### 1. Authentication
- [ ] Login screen
- [ ] Signup screen
- [ ] Token storage
- [ ] Auto-login

### 2. Home Dashboard
- [ ] Stats cards
- [ ] Quick actions
- [ ] Recent activity

### 3. Skills Marketplace
- [ ] Browse skills
- [ ] Add skill
- [ ] Filter/search
- [ ] Skill details

### 4. Messaging
- [ ] Conversations list
- [ ] Chat interface
- [ ] Real-time updates
- [ ] Push notifications

### 5. Profile
- [ ] View profile
- [ ] Edit profile
- [ ] Upload photo
- [ ] Settings

## Push Notifications

### Setup Expo Notifications
```bash
npm install expo-notifications
```
```typescript
import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Get push token
async function registerForPushNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Push notification permissions required!');
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}
```

## Build for Production

### iOS (Requires Mac + Apple Developer Account)
```bash
# Build for App Store
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android
```bash
# Build APK/AAB
eas build --platform android

# Submit to Play Store
eas submit --platform android
```

## Testing
```bash
# Run tests
npm test

# Type checking
npx tsc --noEmit
```

## Deployment

### Expo EAS Build
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure

# Build
eas build --platform all
```

## Additional Resources
- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
