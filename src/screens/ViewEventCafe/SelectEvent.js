// 이벤트 카페 확인 - 이벤트 선택

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const SelectArtist = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#E3F7F7", alignItems: "center", justifyContent: "center" }}>
      {/* 헤더 */}
      <View style={{ position: "absolute", top: 40, left: 16, right: 16, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require("./assets/logo.png")} style={{ width: 120, height: 40 }} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FontAwesome name="bell" size={22} color="black" />
          <MaterialIcons name="menu" size={26} color="black" />
        </View>
      </View>

      {/* 메인 컨텐츠 */}
      <Image source={require("./assets/star.png")} style={{ width: 120, height: 120, marginBottom: 16 }} />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>스타를 선택해 주세요</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFB6C1",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("StarSearch")}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>스타 선택</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectArtist;