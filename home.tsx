// app/(tabs)/home.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 로고/아이콘 */}
      <Ionicons name="sparkles-outline" size={42} color="#3b82f6" />

      {/* 제목 */}
      <Text style={styles.title}>TripHelper</Text>
      <Text style={styles.subtitle}>
        AI와 함께 1분 만에 여행 계획을 완성하세요.
      </Text>

      {/* 입력폼 */}
      <View style={styles.inputContainer}>
        <Ionicons name="airplane-outline" size={18} color="#6b7280" style={styles.inputIcon} />
        <TextInput
          placeholder="어디로 떠나시나요? (도시, 국가)"
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="calendar-outline" size={18} color="#6b7280" style={styles.inputIcon} />
        <TextInput
          placeholder="여행 기간 (예: 3박 4일, 7/15~7/19)"
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="wallet-outline" size={18} color="#6b7280" style={styles.inputIcon} />
        <TextInput
          placeholder="총 예산 (1인 기준)"
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="sparkles-outline" size={18} color="#9ca3af" />
        <Text style={styles.buttonText}>AI로 일정 자동 생성</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    width: "100%",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
});
