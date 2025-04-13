import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const PopularCafeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#E3F7F7", paddingHorizontal: 16 }}>
      {/* 헤더 */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          현재 인기 카페 이벤트
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FontAwesome name="bell" size={22} color="black" />
          <MaterialIcons name="menu" size={26} color="black" />
        </View>
      </View>

      {/* 로고 */}
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Image source={require("./assets/logo.png")} style={{ width: 120, height: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 인기 스타 TOP 3 */}
        <CategorySection title="인기 스타 TOP 3" itemCount={3} />

        {/* 인기 이벤트 카페 TOP 3 */}
        <CategorySection title="인기 이벤트 카페 TOP 3" itemCount={2} />

        {/* 이벤트 카페 개수 TOP 3 */}
        <CategorySection title="이벤트 카페 개수 TOP 3" itemCount={3} />
      </ScrollView>
    </View>
  );
};

const CategorySection = ({ title, itemCount }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
        <FontAwesome name="trophy" size={16} color="black" /> {title}
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              height: 100,
              backgroundColor: "#D9D9D9",
              borderRadius: 10,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default PopularCafeScreen;