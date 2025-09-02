import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TripHelper</Text>
      <Text style={styles.subtitle}>
        AI와 함께 여행 계획을 세워보세요 🚀
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 18,
    color: "#6b7280",
  },
});
