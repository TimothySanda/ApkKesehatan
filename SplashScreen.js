import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 6000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BLOOD BRIDGE</Text>
      <Image 
        source={require('./assets/darah.png')} 
        style={styles.image} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e30d1d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});
