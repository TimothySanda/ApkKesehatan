import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import RegisterScreen from './RegisterScreen.js';
import LoginScreen from './LoginScreen.js';
import Entypo from '@expo/vector-icons/Entypo';
import ProfileScreen from './ProfileScreen.js'; 
import SplashScreen from './SplashScreen.js';
import WelcomeScreen from './WelcomeScreen.js'; 

ExpoSplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di Aplikasi Donor Darah</Text>
      <Image
        source={require('./assets/darah.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

function TanggalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tanggal Donor</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Tanggal') iconName = 'calendar';
          else if (route.name === 'Profil') iconName = 'person';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'red',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tanggal" component={TanggalScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Kanit-SemiBoldItalic': require('./assets/Gaya_Tulisan/Kanit-SemiBoldItalic.ttf'),
    'RobotoMono': require('./assets/Gaya_Tulisan/RobotoMono-VariableFont_wght.ttf'),
  });

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    let timer;
    if (fontsLoaded) {
      timer = setTimeout(() => {
        setShowLoadingScreen(false);
        ExpoSplashScreen.hideAsync();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (showLoadingScreen) {
    return (
      <View style={styles.loadingContainer}>
        <Entypo name="aircraft-take-off" size={40} color="white" />
        <Text style={styles.loadingText}>MEMUAT ....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FF6347',
    fontFamily: 'Kanit-SemiBoldItalic',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'RobotoMono',
  },
});
