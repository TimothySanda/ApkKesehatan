import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './Firebase Config.js';  
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase Config.js';  
import WelcomeScreen from './WelcomeScreen.js'; 

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('A');
  const [birthDate, setBirthDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
      setFormattedDate(moment(selectedDate).format('DD-MM-YYYY'));
    }
  };

  const saveProfileToFirebase = async () => {
    try {
      const userRef = doc(db, 'users', 'user_id');
      await setDoc(userRef, {
        name,
        bloodType,
        birthDate: birthDate.toISOString(),
        medicalHistory,
      });
      alert('Data berhasil disimpan ke Firebase!');
    } catch (error) {
      console.error("Error menyimpan data: ", error);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>

      <View style={styles.photoContainer}>
        <Image source={require('./assets/profile_laki.png')} style={styles.photo} />
      </View>

      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.inputLabel}>Golongan Darah</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={bloodType}
          onValueChange={(itemValue) => setBloodType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="AB" value="AB" />
          <Picker.Item label="O" value="O" />
        </Picker>
      </View>

      <Text style={styles.inputLabel}>Tanggal Lahir</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{formattedDate || "Pilih Tanggal Lahir"}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        placeholder="Riwayat Penyakit"
        value={medicalHistory}
        onChangeText={setMedicalHistory}
        style={styles.input}
      />

      <Button title="Simpan" onPress={saveProfileToFirebase} />
      <Button
        title="Log Out"
        onPress={async () => {
          try {
            await signOut(auth);
            navigation.navigate('Welcome');
          } catch (error) {
            console.error('Error saat logout:', error.message);
            alert('Error saat logout: ' + error.message);
          }
        }}
      />
    </View>
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
    padding: 20,
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: '80%',
    marginVertical: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: '80%',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    color: '#000',
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: 10,
  },
});
