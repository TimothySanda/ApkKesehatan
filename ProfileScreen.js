import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { auth, db, storage } from './Firebase Config.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          RobotoMono: require('./assets/Gaya_Tulisan/RobotoMono-VariableFont_wght.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading fonts: ', error);
        setFontLoaded(true);
      }
    };

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setBirthDate(data.birthDate || '');
            setMedicalHistory(data.medicalHistory || '');
            setBloodType(data.bloodType || '');
            setProfileImage(data.profileImage || null);
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      }
    };

    loadFonts();
    fetchUserData();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        uploadImage(imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadImage = async (uri) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setProfileImage(downloadURL);
        await setDoc(doc(db, 'users', user.uid), { profileImage: downloadURL }, { merge: true });
        alert('Foto profil berhasil diunggah!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Terjadi kesalahan saat mengunggah foto profil.');
      }
    }
  };

  const saveProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          { birthDate, medicalHistory, bloodType },
          { merge: true }
        );
        alert('Profil berhasil diperbarui!');
      } catch (error) {
        console.error('Error updating profile: ', error);
        alert('Terjadi kesalahan saat menyimpan profil!');
      }
    }
  };

  if (!fontLoaded) {
    return <Text>Memuat font...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" translucent />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>Profil Pengguna</Text>
          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require('./assets/profile_laki.png')
                }
                style={styles.photo}
              />
            </TouchableOpacity>
            <Text style={styles.photoHint}>Ketuk foto untuk mengunggah</Text>
          </View>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} value={firstName} editable={false} />
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} value={lastName} editable={false} />
          <Text style={styles.label}>Tanggal Lahir</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="Contoh: 30/08/1990"
          />
          <Text style={styles.label}>Riwayat Penyakit</Text>
          <TextInput
            style={styles.input}
            value={medicalHistory}
            onChangeText={setMedicalHistory}
            placeholder="Masukkan riwayat penyakit Anda"
          />
          <Text style={styles.label}>Golongan Darah (contoh: A, B, AB, O)</Text>
          <TextInput
            style={styles.input}
            value={bloodType}
            onChangeText={setBloodType}
            placeholder="Masukkan golongan darah Anda"
          />
          <View style={styles.buttonContainer}>
            <Button title="Simpan" onPress={saveProfile} />
            <Button
              title="Keluar"
              color="red"
              onPress={() => navigation.navigate('Auth', { screen: 'Welcome' })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight || 20 },
  scrollContainer: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  photoContainer: { alignItems: 'center', marginBottom: 20 },
  photo: { width: 100, height: 100, borderRadius: 50 },
  photoHint: { marginTop: 5, fontSize: 12, color: '#555' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { backgroundColor: '#f2f2f2', marginBottom: 10, padding: 10, borderRadius: 5, fontSize: 14 },
  buttonContainer: { marginTop: 20 },
});
