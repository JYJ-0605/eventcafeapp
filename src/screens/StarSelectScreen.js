import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const StarSelectionScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#E3F7F7", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>스타 선택</Text>
      <TouchableOpacity
        style={{ backgroundColor: "#FFB6C1", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
        onPress={() => navigation.navigate("StarSearch")}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>스타 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StarSelectionScreen;