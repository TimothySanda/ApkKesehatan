import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function JadwalDonasiScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        {/* Judul */}
        <Text style={styles.headerText}>JADWAL DONASI</Text>
      </View>

      {/* Konten */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unej Medical Center</Text>
          <Text style={styles.cardSubtitle}>
            Jl. Kalimantan 4 No.9, RT.01/RW.01 Sumbersari, Kec.Sumbersari
          </Text>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="calendar-month" size={20} color="black" />
            <Text style={styles.cardInfoText}>Senin, 02 Desember 2024</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="black" />
            <Text style={styles.cardInfoText}>10.00 WIB</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unej Medical Center</Text>
          <Text style={styles.cardSubtitle}>
            Jl. Kalimantan 4 No.9, RT.01/RW.01 Sumbersari, Kec.Sumbersari
          </Text>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="calendar-month" size={20} color="black" />
            <Text style={styles.cardInfoText}>Senin, 10 Desember 2024</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="black" />
            <Text style={styles.cardInfoText}>10.00 WIB</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unej Medical Center</Text>
          <Text style={styles.cardSubtitle}>
            Jl. Kalimantan 4 No.9, RT.01/RW.01 Sumbersari, Kec.Sumbersari
          </Text>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="calendar-month" size={20} color="black" />
            <Text style={styles.cardInfoText}>Senin, 20 Desember 2024</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="black" />
            <Text style={styles.cardInfoText}>10.00 WIB</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  header: {
    flexDirection: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    paddingTop: 50, 
    
  },
  headerText: {
    color: 'white', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight || 20 
  },
  card: {
    backgroundColor: '#FFEEEE',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginVertical: 5,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  cardInfoText: {
    marginLeft: 10,
  },
});
