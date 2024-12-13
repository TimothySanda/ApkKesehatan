import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 
import { auth, db } from './Firebase Config.js';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen() {
  const [firstName, setFirstName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFirstName(data.firstName || '');
            setBloodType(data.bloodType || '*belum isi data diri!');
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is signed in.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" translucent />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('./assets/darah.png')} style={styles.logo} />
            <Text style={styles.logoText}>BLOODBRIDGE</Text>
          </View>
          <Entypo name="bell" size={30} color="black" />
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Halo, {firstName || 'Pengguna'}!</Text>

        {/* Informasi Pengguna */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{bloodType}</Text>
            <Text style={styles.infoLabel}>My Blood Type</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>...</Text>
            <Text style={styles.infoLabel}>Times I donate blood this year</Text>
          </View>
        </View>

        {/* Aksi */}
        <Text style={styles.actionTitle}>What do you want?</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFFFFF' }]}>
            <Text style={styles.actionButtonText}>Donate Blood</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonText}>Request for Blood</Text>
          </TouchableOpacity>
        </View>

        {/* Jadwal Donasi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Jadwal Donasi</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Auth' , { screen: 'JadwalDonasi' })}>
            <Entypo name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </View>

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

        {/* Blood Needed */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Blood Needed</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Auth' , { screen: 'BloodNeeded' })}>
            <Entypo name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.card, { backgroundColor: '#FFC0CB' }]}>
          <Text style={[styles.cardTitle, { fontWeight: 'bold' }]}>
            Citra Husada Hospital <Text style={{ color: 'red' }}>Urgent</Text>
          </Text>
          <Text style={styles.cardSubtitle}>Blood Type Needed: A-, AB+, AB-</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight || 20 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20, 
    paddingTop: 10,  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  logoText: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#FF6347' },
  greeting: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  infoBox: { flex: 1, backgroundColor: '#FFCCCC', padding: 15, marginHorizontal: 5, borderRadius: 8, alignItems: 'center' },
  infoText: { fontSize: 24, fontWeight: 'bold' },
  infoLabel: { fontSize: 14, color: '#555' },
  actionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  actionButton: { flex: 1, backgroundColor: '#FF6347', padding: 15, borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
  actionButtonSecondary: { flex: 1, backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, marginHorizontal: 5, alignItems: 'center', borderColor: '#FF6347', borderWidth: 1 },
  actionButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FF6347' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#FFEEEE', padding: 15, borderRadius: 8, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  cardSubtitle: { fontSize: 14, color: '#555', marginBottom: 10 },
  cardInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  cardInfoText: { fontSize: 14, marginLeft: 5 },
});
