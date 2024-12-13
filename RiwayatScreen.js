import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const riwayatData = [
  {
    id: '1',
    tanggal: '14 November 2024',
    type: 'Urgent',
    tempat: 'Unej Medical Center',
    alamat: 'Jl. Kalimantan 4 No.9, RT.01/RW.01\nSumbersari, Kec. Sumbersari',
    tanggalDonor: 'Senin, 02 Desember 2024',
    waktuDonor: '10.00 WIB',
    status: 'On Going',
  },
  {
    id: '2',
    tanggal: '13 Juli 2024',
    type: 'Regular',
    tempat: 'Unej Medical Center',
    alamat: 'Jl. Kalimantan 4 No.9, RT.01/RW.01\nSumbersari, Kec. Sumbersari',
    tanggalDonor: 'Senin, 02 Desember 2024',
    waktuDonor: '10.00 WIB',
    status: 'On Going',
  },
];

export default function RiwayatScreen() {
  const renderRiwayatItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.tanggal}</Text>
      <View style={styles.cardContent}>
        <Image
          source={require('./assets/darah.png')} 
          style={styles.icon}
        />
        <View style={styles.details}>
          <View style={styles.badgeContainer}>
            <Text
              style={[
                styles.badge,
                item.type === 'Urgent' ? styles.urgentBadge : styles.regularBadge,
              ]}
            >
              Type: {item.type}
            </Text>
          </View>
          <Text style={styles.title}>{item.tempat}</Text>
          <Text style={styles.address}>{item.alamat}</Text>
          <View style={styles.row}>
            <Entypo name="calendar" size={16} color="gray" />
            <Text style={styles.infoText}>{item.tanggalDonor}</Text>
          </View>
          <View style={styles.row}>
            <Entypo name="clock" size={16} color="gray" />
            <Text style={styles.infoText}>{item.waktuDonor}</Text>
          </View>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" translucent />
      <FlatList
        data={riwayatData}
        keyExtractor={(item) => item.id}
        renderItem={renderRiwayatItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: StatusBar.currentHeight || 20, 
    paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
    padding: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  badgeContainer: {
    marginBottom: 5,
  },
  badge: {
    fontSize: 12,
    color: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  urgentBadge: {
    backgroundColor: '#dc3545',
  },
  regularBadge: {
    backgroundColor: '#17a2b8',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  address: {
    fontSize: 14,
    color: '#6c757d',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 5,
  },
  status: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
