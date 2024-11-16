import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/darah.png')} 
        style={styles.image} 
      />
      <Text style={styles.welcomeText}>Selamat datang di <Text style={styles.appName}>BloodBridge</Text></Text>
      <Text style={styles.subtitle}>Apakah anda mempunyai akun <Text style={styles.appName}>BloodBridge?</Text></Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Dah ada aku luu?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Belum punya akun kan luu!!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#e30d1d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appName: {
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
button: {
  backgroundColor: '#e30d1d',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 5,
  marginTop: 20,
  justifyContent: 'center',  
  alignItems: 'center',      
  height: 50,                
},
buttonText: {
  color: '#000',
  fontSize: 18,
  fontFamily: 'RobotoMono',
  textAlign: 'center',  
  alignSelf: 'center',  
},
registerText: {
  color: '#000',
  fontSize: 18,
  fontFamily: 'RobotoMono',
  textAlign: 'center',  
  alignSelf: 'center', 
},
  image: {
    width: 100,
    height: 100,
  },
});
