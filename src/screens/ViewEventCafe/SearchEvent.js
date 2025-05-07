// 이벤트 카페 검색

import React from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const StarSearchScreen = ({ navigation }) => {
  const data = [
    { id: "1", name: "멤버 이름", birthday: "해당 멤버 생일" },
    { id: "2", name: "멤버 이름", birthday: "해당 멤버 생일" },
    { id: "3", name: "멤버 이름", birthday: "해당 멤버 생일" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F7F7", paddingHorizontal: 16, paddingTop: 40 }}>
      {/* 헤더 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>선택된 스타</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={26} color="black" />
        </TouchableOpacity>
      </View>

      {/* 선택된 스타 없음 */}
      <View style={{ backgroundColor: "#D9D9D9", padding: 16, marginVertical: 10, borderRadius: 8 }}>
        <Text style={{ fontSize: 16, color: "#555" }}>선택된 스타가 없습니다</Text>
      </View>

      {/* 검색 바 */}
      <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 8, padding: 10, alignItems: "center", marginBottom: 10 }}>
        <TextInput style={{ flex: 1, fontSize: 16 }} placeholder="스타의 이름이나 그룹명을 검색해 주세요" />
        <FontAwesome name="search" size={20} color="#888" />
      </View>

      {/* 현재 인기 이벤트 */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>현재 인기 이벤트</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#D9D9D9", padding: 16, borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.birthday}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default StarSearchScreen;