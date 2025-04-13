import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploadScreen = ({ navigation }: { navigation: any }) => {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#E3F7F7" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>이벤트 이미지 업로드</Text>
      <TouchableOpacity onPress={pickImage} style={{ padding: 12, backgroundColor: "white", borderRadius: 8, marginBottom: 20 }}>
        <Text>사진 선택</Text>
      </TouchableOpacity>

      {images.map((img, index) => (
        <Image key={index} source={{ uri: img }} style={{ width: 100, height: 100, marginBottom: 10 }} />
      ))}

      <TouchableOpacity onPress={() => navigation.navigate("FinalStep")} style={{ padding: 12, backgroundColor: "#FFB6C1", borderRadius: 8 }}>
        <Text style={{ color: "white", fontSize: 16 }}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploadScreen;
