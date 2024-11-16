import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase Config.js';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('CAKEPPP, DAH MASUK!');
      navigation.replace('Main');
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert('YANG BENER AJEE!!', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/darah.png')} 
          style={styles.image}
        />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        value={email}
        onChangeText={setEmail}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <MaterialCommunityIcons
            name={secureText ? "eye-off" : "eye-check-outline"}
            size={25}
            color="#e30d1d"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{loading ? '.....' : 'Masuk'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={styles.registerText}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e30d1d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#000', 
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'Kanit-SemiBoldItalic',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    marginVertical: 10,
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 15,
    color: '#000',
    fontSize: 16,
    fontFamily: 'Kanit-SemiBoldItalic',
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Kanit-SemiBoldItalic',
    textDecorationLine: 'underline',
  },
  registerText: {
    color: '#fff',
    marginTop: 20,
    fontFamily: 'RobotoMono',
    textDecorationLine: 'underline',
  },
});
