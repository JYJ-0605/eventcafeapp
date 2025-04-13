// 장소 선택 화면
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const PlaceSelectionScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#E3F7F7" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>장소 선택</Text>
      <TextInput placeholder="장소 검색" style={{ backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 20 }} />

      <TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ padding: 12, backgroundColor: "#FFB6C1", borderRadius: 8 }}>
        <Text style={{ color: "white", fontSize: 16 }}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceSelectionScreen;