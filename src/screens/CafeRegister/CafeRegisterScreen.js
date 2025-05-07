// 장소 등록
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const categories = ["카페", "음식점", "전시회", "포토부스", "파티룸"];

const CafeRegisterScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>장소 등록</Text>

      <TextInput style={styles.input} placeholder="장소명 *" />
      <TextInput style={styles.input} placeholder="지역 *" />
      <View style={styles.addressRow}>
        <TextInput
          style={styles.addressInput}
          placeholder="주소 *"
        />
        <TouchableOpacity style={styles.findAddressButton}>
          <Text style={styles.findAddressText}>주소 찾기</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.sectionTitle}>장소의 타입을 선택해 주세요 (필수)</Text>
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.categorySelected,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>가게 메인 이미지 (필수)</Text>
      <TouchableOpacity style={styles.uploadBtn}>
        <Text>파일 선택</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="대관료 (₩) *" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="예약금 (₩) *" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="운영 정보" multiline />
      <TextInput style={styles.input} placeholder="운영 시간 *" />

      <Text style={styles.sectionTitle}>특전 배치 혹은 예시 이미지</Text>
      <TouchableOpacity style={styles.uploadBtn}>
        <Text>파일 선택</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="소개글"
        multiline
      />

      <Text style={styles.sectionTitle}>SNS 아이디</Text>
      <TextInput style={styles.input} placeholder="예: @instagram" />

      <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.registerText}>등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F7F7",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  addressInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
  },
  findAddressButton: {
    backgroundColor: "#cce5ff",
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  findAddressText: {
    color: "#333",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#aaa",
    borderWidth: 1,
  },
  categorySelected: {
    backgroundColor: "#FFB6C1",
  },
  uploadBtn: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  registerBtn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CafeRegisterScreen;
