{/* 스타 확인 */}
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SelectedStarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const SelectedStar = route.params?.selectedStar;

  const handleCancelSelection = () => {
    navigation.goBack(); // 선택 해제시 뒤로 가기
  };

  const handleNext = () => {
    navigation.navigate("SelectedDate");
  };

  return (
    <View style={styles.container}>
      {/* 회색 박스 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>스타 확인</Text>

        {/* 스타 정보 */}
        {SelectedStar ? (
          <View style={styles.starBox}>
            {SelectedStar.image && (
              <Image source={SelectedStar.image} style={styles.starImage} />
            )}
            <View style={styles.starInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.starName}>{SelectedStar.name}</Text>
                <Text style={styles.groupName}>그룹명</Text>
              </View>
              <Text style={styles.birthday}>{SelectedStar.birthday}</Text>
            </View>
            <TouchableOpacity onPress={handleCancelSelection}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text>선택된 스타가 없습니다.</Text>
          </View>
        )}

        {/* 버튼 영역 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => navigation.goBack()}
          >
            <Text>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={{ color: "white" }}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectedStarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: "#ddd",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  starBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  emptyBox: {
    // ✅ 스타 없을 때 따로
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  starImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  starInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  groupName: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  birthday: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prevButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#FFB6B6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
});
