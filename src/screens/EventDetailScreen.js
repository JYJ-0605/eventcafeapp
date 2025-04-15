import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const EventDetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#E3F7F7" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>이벤트 상세 정보 입력</Text>
      <TextInput 
        placeholder="이벤트 내용" 
        style={{ backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 20, height: 100 }} 
        multiline 
      />

      <TouchableOpacity 
        onPress={() => navigation.navigate("ImageUpload")} 
        style={{ padding: 12, backgroundColor: "#FFB6C1", borderRadius: 8 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetailsScreen;