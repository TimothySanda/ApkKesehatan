import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";

export default function BloodNDScreen( navigation) {
  const bloodRequests = [
    { hospital: "Citra Husada Hospital", type: "A-", urgency: "Urgent" },
    { hospital: "Citra Husada Hospital", type: "AB+", urgency: "Regular" },
    { hospital: "Citra Husada Hospital", type: "AB-", urgency: "Urgent" },
    { hospital: "Siloam Hospital", type: "A-", urgency: "Regular" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>BLOOD NEEDED</Text>
      </View>
      <ScrollView>
        {bloodRequests.map((request, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.hospital}>{request.hospital}</Text>
              <Text style={styles.urgency}>{request.urgency}</Text>
            </View>
            <Text style={styles.bloodType}>
              Blood Type Needed: {request.type}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#FF0000",
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#FF9999",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  hospital: {
    fontSize: 16,
    fontWeight: "bold",
  },
  urgency: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  bloodType: {
    fontSize: 14,
    color: "#333",
  },
});
